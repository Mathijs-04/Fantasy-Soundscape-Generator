import { LOOPS, ONESHOTS, LOCATIONS, BED_TIME } from './catalog.js';

const rand = (a, b) => a + Math.random() * (b - a);
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const gauss = (x, mu, sigma) => Math.exp(-((x - mu) ** 2) / (2 * sigma * sigma));

function pickWeighted(items, weightFn) {
  const ws = items.map(weightFn);
  const total = ws.reduce((a, b) => a + b, 0);
  if (total <= 0) return items[Math.floor(Math.random() * items.length)];
  let r = Math.random() * total;
  for (let i = 0; i < items.length; i++) { r -= ws[i]; if (r <= 0) return items[i]; }
  return items[items.length - 1];
}

const BED_TOLERANCE = 0.35;
const FADE = 8;
const DRIFT = [70, 150];

export class Engine {
  constructor(log = () => {}) {
    this.log = log;
    this.params = { loc: 'forest', vibe: 0.2, effects: 0.5 };
    this.loops = [];
    this.recent = [];
    this.buffers = new Map();
    this.volume = 0.8;
    this.playing = false;
    this.onChange = () => {};
  }


  _init() {
    if (this.ctx) return;
    const ctx = this.ctx = new AudioContext();

    this.output = ctx.createGain();
    this.output.gain.value = this.volume;
    this.output.connect(ctx.destination);

    this.master = ctx.createGain();
    this.master.gain.value = 0;
    this.master.connect(this.output);

    this.bedBus = ctx.createGain();
    this.bedBus.connect(this.master);

    this.sfxBus = ctx.createGain();
    this.sfxBus.connect(this.master);


    this.reverb = ctx.createConvolver();
    this.reverb.buffer = this._impulse(3.2, 2.5);
    this.wet = ctx.createGain();
    this.reverb.connect(this.wet);
    this.wet.connect(this.master);
    this.reverbIn = ctx.createGain();
    this.reverbIn.connect(this.reverb);
  }

  _impulse(seconds, decay) {
    const rate = this.ctx.sampleRate, len = rate * seconds;
    const buf = this.ctx.createBuffer(2, len, rate);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
    }
    return buf;
  }

  async _load(file) {
    if (!this.buffers.has(file)) {
      const p = fetch(encodeURI(file))
        .then(r => { if (!r.ok) throw new Error(r.status + ' ' + file); return r.arrayBuffer(); })
        .then(ab => this.ctx.decodeAudioData(ab));
      this.buffers.set(file, p);
      p.catch(() => this.buffers.delete(file));
    }
    return this.buffers.get(file);
  }


  async start() {
    this._init();
    await this.ctx.resume();
    this.playing = true;
    this.master.gain.cancelScheduledValues(this.ctx.currentTime);
    this.master.gain.setTargetAtTime(0.9, this.ctx.currentTime, 1.0);
    this._applyMood();
    await this.retune(true);
    this._scheduleSfx();
    this._scheduleDrift();
  }

  stop() {
    if (!this.playing) return;
    this.playing = false;
    clearTimeout(this.sfxTimer); clearTimeout(this.driftTimer);
    const t = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(t);
    this.master.gain.setTargetAtTime(0, t, 0.8);
    const old = this.loops; this.loops = [];
    setTimeout(() => old.forEach(l => { try { l.src.stop(); } catch {} }), 4000);
    this.onChange();
  }

  
  set(params) {
    const locChanged = params.loc && params.loc !== this.params.loc;
    Object.assign(this.params, params);
    const [lo, hi] = LOCATIONS[this.params.loc].vibe;
    this.params.vibe = clamp(this.params.vibe, lo, hi);
    if (!this.playing) return;
    this._applyMood();
    this.retune(locChanged);
    this._scheduleSfx();
  }

  reroll() { if (this.playing) this.retune(true); }

  
  setVolume(v) {
    this.volume = clamp(v, 0, 1);
    if (this.output) this.output.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
  }


  _applyMood() {
    const { vibe } = this.params;
    this.wet.gain.setTargetAtTime(0.15 + 0.7 * vibe, this.ctx.currentTime, 2);
  }


  _fit(id) { return gauss(LOOPS[id].e, this.params.vibe, 0.28); }
  _bedOk(id) { return Math.abs(LOOPS[id].e - this.params.vibe) <= BED_TOLERANCE; }

  _pickBed(role, exclude = []) {
    const L = LOCATIONS[this.params.loc];
    const all = (role === 'base' ? L.base : L.layers).filter(id => !exclude.includes(id));

    let pool = all.filter(id => this._bedOk(id));
    if (!pool.length && role === 'base') {

      const d = id => Math.abs(LOOPS[id].e - this.params.vibe);
      pool = [...all].sort((a, b) => d(a) - d(b)).slice(0, 2);
    }
    if (!pool.length) return null;
    return pickWeighted(pool, id => 0.1 + this._fit(id));
  }

  async _startBed(id, role) {
    const buf = await this._load(LOOPS[id].file);
    if (!this.playing) return null;
    const ctx = this.ctx;
    const def = LOOPS[id];
    const level = (role === 'base' ? rand(0.8, 1.0) : rand(0.25, 0.5)) * (def.gain ?? 1);
    const src = ctx.createBufferSource();
    src.buffer = buf; src.loop = true;

    const loopStart = def.loopStart ?? 0;
    const loopEnd = def.loopEnd ?? buf.duration;
    if (def.loopStart != null || def.loopEnd != null) { src.loopStart = loopStart; src.loopEnd = loopEnd; }
    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.gain.setTargetAtTime(level, ctx.currentTime, FADE / 4);
    src.connect(gain); gain.connect(this.bedBus);
    src.start(0, loopStart + Math.random() * (loopEnd - loopStart));
    const rec = { id, role, src, gain, level };
    this.loops.push(rec);
    this.log(`bed + ${id} (${role}, e=${LOOPS[id].e})`);
    this.onChange();
    return rec;
  }

  _stopBed(rec) {
    this.loops = this.loops.filter(l => l !== rec);
    rec.gain.gain.setTargetAtTime(0, this.ctx.currentTime, FADE / 4);
    setTimeout(() => { try { rec.src.stop(); } catch {} }, FADE * 1000);
    this.log(`bed - ${rec.id}`);
    this.onChange();
  }

  
  async retune(force = false) {
    const L = LOCATIONS[this.params.loc];
    if (force) [...this.loops].forEach(l => this._stopBed(l));
    else {
      for (const l of [...this.loops]) {
        const valid = (l.role === 'base' ? L.base : L.layers).includes(l.id);

        const noneFit = l.role === 'base' && !L.base.some(id => this._bedOk(id));
        const keep = noneFit || this._bedOk(l.id);
        if (!valid || !keep) this._stopBed(l);
      }
    }
    const jobs = [];
    if (!this.loops.some(l => l.role === 'base')) {
      const id = this._pickBed('base');
      if (id) jobs.push(this._startBed(id, 'base'));
    }
    const want = this._layerTarget ??= (Math.random() < 0.5 ? 1 : 2);
    if (force) this._layerTarget = Math.random() < 0.5 ? 1 : 2;
    let have = this.loops.filter(l => l.role === 'layer').length;
    const taken = this.loops.map(l => l.id);
    for (; have < (force ? this._layerTarget : want); have++) {
      const id = this._pickBed('layer', taken);
      if (!id) break;
      taken.push(id);
      jobs.push(this._startBed(id, 'layer'));
    }
    await Promise.all(jobs);
  }


  _scheduleDrift() {
    clearTimeout(this.driftTimer);
    this.driftTimer = setTimeout(async () => {
      if (!this.playing) return;
      const layers = this.loops.filter(l => l.role === 'layer');
      const target = (layers.length && Math.random() < 0.8) ? layers[Math.floor(Math.random() * layers.length)]
        : this.loops.find(l => l.role === 'base');
      if (target) {
        const id = this._pickBed(target.role, this.loops.map(l => l.id));
        if (id) { await this._startBed(id, target.role); this._stopBed(target); }
      }
      this._scheduleDrift();
    }, rand(...DRIFT) * 1000);
  }


  _scheduleSfx() {
    clearTimeout(this.sfxTimer);
    if (!this.playing) return;
    const fx = this.params.effects;
    if (fx < 0.03) return;

    const mean = 70 * Math.pow(0.1, fx);
    const gap = Math.max(4, -Math.log(1 - Math.random()) * mean);
    this.sfxTimer = setTimeout(async () => {
      try { await this._playOneShot(); } catch (e) { this.log('sfx error ' + e.message); }
      this._scheduleSfx();
    }, gap * 1000);
  }

  _pickOneShot() {
    const { loc, vibe } = this.params;

    const playing = this.loops.map(l => l.id);
    const over = key => playing.some(id => BED_TIME[key].includes(id));
    const allowed = LOCATIONS[loc].sfx.filter(id => {
      const d = ONESHOTS[id];
      if (vibe < d.min || vibe > d.max) return false;
      if (d.avoid.some(over)) return false;
      if (d.needs && !d.needs.some(over)) return false;
      return true;
    });
    const fresh = allowed.filter(id => !this.recent.includes(id));
    const pool = fresh.length ? fresh : allowed;
    if (!pool.length) return null;
    return pickWeighted(pool, id => ONESHOTS[id].w * (0.05 + gauss(ONESHOTS[id].e, vibe, 0.25)));
  }

  async _playOneShot() {
    const id = this._pickOneShot();
    if (!id) return;
    const def = ONESHOTS[id];
    this.recent.push(id); if (this.recent.length > 5) this.recent.shift();
    const buf = await this._load(def.file);
    if (!this.playing) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const dist = Math.random();
    const src = ctx.createBufferSource();
    src.buffer = buf;
    if (!def.noPitch) src.playbackRate.value = rand(0.93, 1.07);

    const env = ctx.createGain();
    const peak = def.gain * rand(0.6, 1) * (1 - 0.55 * dist);
    const dur = buf.duration / src.playbackRate.value;
    const fadeIn = Math.min(0.4, dur / 4), fadeOut = Math.min(1.5, dur / 3);
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(peak, t + fadeIn);
    env.gain.setValueAtTime(peak, t + dur - fadeOut);
    env.gain.linearRampToValueAtTime(0, t + dur);

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 18000 - 14500 * dist;
    const pan = ctx.createStereoPanner(); pan.pan.value = rand(-0.8, 0.8);

    src.connect(env); env.connect(lp); lp.connect(pan);
    pan.connect(this.sfxBus);
    const send = ctx.createGain(); send.gain.value = 0.3 + 0.7 * dist;
    pan.connect(send); send.connect(this.reverbIn);
    src.start(t);
    src.onended = () => { try { send.disconnect(); pan.disconnect(); } catch {} };
    this.log(`sfx ${id} (e=${def.e}, ${dist < 0.33 ? 'near' : dist < 0.66 ? 'mid' : 'far'})`);
  }
}
