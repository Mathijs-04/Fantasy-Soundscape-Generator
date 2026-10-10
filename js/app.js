import { LOCATIONS } from './catalog.js';
import { Engine } from './engine.js';

const $ = id => document.getElementById(id);
const logEl = $('log');
const engine = new Engine(msg => {
  logEl.textContent = `${new Date().toLocaleTimeString()}  ${msg}\n` + logEl.textContent.slice(0, 4000);
});

// Effects density follows danger: ~60% when Safe, 100% when Lethal.
const effectsFor = danger => 0.6 + 0.4 * danger;

const state = { loc: 'forest', vibe: 0.2, effects: effectsFor(0.2) };

// Slider order: underground -> wooded -> open -> water.
const LOC_IDS = ['dungeon', 'swamp', 'forest', 'camp', 'mountain', 'ocean'].filter(id => id in LOCATIONS);

function renderLocs() {
  const scale = $('locScale'); scale.innerHTML = '';
  for (const id of LOC_IDS) {
    const s = document.createElement('span');
    s.textContent = LOCATIONS[id].label;
    scale.appendChild(s);
  }
  $('loc').max = LOC_IDS.length - 1;
  $('loc').value = LOC_IDS.indexOf(state.loc);
  $('locVal').textContent = LOCATIONS[state.loc].label;
}

function clampVibe() {
  const [lo, hi] = LOCATIONS[state.loc].vibe;
  state.vibe = Math.min(hi, Math.max(lo, state.vibe));
  state.effects = effectsFor(state.vibe);
  $('vibe').value = state.vibe;
}

// Grey out the part of the slider that this location can't produce,
// and label each end with the location's own names.
function renderVibe() {
  const L = LOCATIONS[state.loc];
  const [lo, hi] = L.vibe;
  const p = x => (x * 100).toFixed(1) + '%';
  $('vibeTrack').style.background =
    `linear-gradient(to right, #e4e7ec ${p(lo)}, #60a5fa ${p(lo)}, #f87171 ${p(hi)}, #e4e7ec ${p(hi)})`;
  $('vibeVal').textContent = state.vibe.toFixed(2);
  $('vibeNote').textContent = (lo > 0 || hi < 1)
    ? `${L.label} supports ${lo.toFixed(2)} – ${hi.toFixed(2)}` : '';
  $('endLo').textContent = L.ends[0];
  $('endLo').style.left = p(lo);
  $('endHi').textContent = L.ends[1];
  $('endHi').style.left = p(hi);
  $('fxVal').textContent = `Effects: ${Math.round(state.effects * 100)}%`;
}

// ----- option B: keep relative position on location change -----
let tweenId = 0;

// Animate the slider from `from` to `to`, clamping each frame to the current location's range.
function tweenVibe(from, to, ms = 350) {
  const id = ++tweenId;
  const t0 = performance.now();
  const step = now => {
    if (id !== tweenId) return; // user grabbed the slider or started another tween
    const k = Math.min(1, (now - t0) / ms);
    const eased = 1 - (1 - k) ** 3;
    state.vibe = from + (to - from) * eased;
    clampVibe(); renderVibe(); push();
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

let msgTimer;
function flash(text) {
  const el = $('vibeMsg');
  el.textContent = text;
  el.classList.add('show');
  clearTimeout(msgTimer);
  msgTimer = setTimeout(() => el.classList.remove('show'), 4000);
}

let timer;
function push() { clearTimeout(timer); timer = setTimeout(() => engine.set({ ...state }), 400); }

$('vibe').oninput = e => {
  tweenId++; // cancel any running animation
  state.vibe = +e.target.value; clampVibe(); renderVibe(); push();
};

$('loc').oninput = e => {
  const [oldLo, oldHi] = LOCATIONS[state.loc].vibe;
  const rel = (state.vibe - oldLo) / (oldHi - oldLo); // 0..1 position in the old range
  const from = state.vibe;

  state.loc = LOC_IDS[+e.target.value];
  const [lo, hi] = LOCATIONS[state.loc].vibe;
  const target = lo + Math.min(1, Math.max(0, rel)) * (hi - lo);

  renderLocs();
  tweenVibe(from, target);
  flash(`${LOCATIONS[state.loc].label}: danger ${target.toFixed(2)} (${LOCATIONS[state.loc].ends.join(' to ')})`);
};

$('volume').oninput = e => engine.setVolume(+e.target.value);

$('play').onclick = async () => {
  if (engine.playing) { engine.stop(); }
  else { engine.params = { ...state }; await engine.start(); }
  $('play').textContent = engine.playing ? 'Stop' : 'Play';
  $('play').classList.toggle('playing', engine.playing);
};

engine.onChange = () => {
  $('beds').textContent = engine.playing
    ? 'Beds: ' + engine.loops.map(l => `${l.id}${l.role === 'base' ? ' (base)' : ''}`).join(', ') : '';
};

renderLocs(); clampVibe(); renderVibe();
