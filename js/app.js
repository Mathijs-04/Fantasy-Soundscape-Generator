import { LOCATIONS } from './catalog.js';
import { Engine } from './engine.js';
import { initBackdrop } from './scene.js';

const $ = id => document.getElementById(id);
const engine = new Engine();
const backdrop = initBackdrop();


const fog = document.querySelector('.fog-video');
const slowFog = () => { fog.playbackRate = 0.4; };
slowFog(); fog.addEventListener('loadedmetadata', slowFog); fog.addEventListener('play', slowFog);


const vibeFor = (loc, danger) => {
  const [lo, hi] = LOCATIONS[loc].vibe;
  return lo + danger * (hi - lo);
};

const effectsFor = vibe => 0.6 + 0.4 * vibe;

const state = { loc: 'dungeon', danger: 0, vibe: 0, effects: 0 };
function sync() {
  state.vibe = vibeFor(state.loc, state.danger);
  state.effects = effectsFor(state.vibe);
}

const params = () => ({ loc: state.loc, vibe: state.vibe, effects: state.effects });


const LOC_IDS = ['dungeon', 'camp', 'forest', 'swamp', 'mountain', 'ocean'].filter(id => id in LOCATIONS);


const RANKS = [[0.15, 'Serene'], [0.3, 'Tranquil'], [0.45, 'Uneasy'], [0.6, 'Ominous'], [0.75, 'Perilous'], [0.9, 'Dire'], [2, 'Dreadful']];
const rankOf = v => RANKS.find(([max]) => v < max)[1];


const sigils = [...document.querySelectorAll('#locIcons button')];
sigils.forEach(btn => {
  if (!LOC_IDS.includes(btn.dataset.id)) { btn.hidden = true; return; }
  btn.onclick = () => selectLoc(btn.dataset.id);
});

const sigilBox = $('locIcons');
LOC_IDS.forEach(id => sigilBox.appendChild(sigils.find(b => b.dataset.id === id)));

LOC_IDS.forEach((_, i) => {
  const n = document.createElement('b');
  n.style.setProperty('--q', LOC_IDS.length > 1 ? i / (LOC_IDS.length - 1) : 0);
  $('locNotches').appendChild(n);
});

function renderLocs() {
  const i = LOC_IDS.indexOf(state.loc);
  $('loc').max = LOC_IDS.length - 1;
  $('loc').value = i;
  $('locRail').style.setProperty('--p', LOC_IDS.length > 1 ? i / (LOC_IDS.length - 1) : 0);
  $('locVal').textContent = LOCATIONS[state.loc].label;
  [...$('locNotches').children].forEach((n, k) => n.classList.toggle('on', k <= i));
  sigils.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.id === state.loc)));

  const prev = document.body.dataset.loc;
  if (prev === 'dungeon' && state.loc !== 'dungeon') {
    document.body.classList.add('exit-dungeon');
    clearTimeout(renderLocs.t);
    renderLocs.t = setTimeout(() => document.body.classList.remove('exit-dungeon'), 1500);
  }
  document.body.dataset.loc = state.loc;
  backdrop.setType(state.loc);
}


function renderVibe() {
  const L = LOCATIONS[state.loc];
  $('vibeRail').style.setProperty('--p', state.danger);
  $('vibeVal').textContent = rankOf(state.danger);
  $('endLo').textContent = L.ends[0];
  $('endHi').textContent = L.ends[1];
  document.body.style.setProperty('--danger', state.danger.toFixed(3));
  document.body.classList.toggle('dire', state.danger >= 0.75);
  backdrop.setDanger(state.danger);
}

let timer;
function push() { clearTimeout(timer); timer = setTimeout(() => engine.set(params()), 400); }

function selectLoc(id) {
  if (id === state.loc) return;
  state.loc = id; sync();
  renderLocs(); renderVibe(); push();
}

$('vibe').oninput = e => { state.danger = +e.target.value; sync(); renderVibe(); push(); };
$('loc').oninput = e => selectLoc(LOC_IDS[+e.target.value]);


let lastVolume = 0.8;
function setVolume(v) {
  v = Math.min(1, Math.max(0, v));
  if (v > 0) lastVolume = v;
  $('volume').value = v;
  engine.setVolume(v);
  $('volRail').style.setProperty('--p', v);
  const muted = v === 0;
  document.querySelector('.volume').classList.toggle('muted', muted);
  $('mute').setAttribute('aria-label', muted ? 'Unmute' : 'Mute');
}
$('volume').oninput = e => setVolume(+e.target.value);
$('mute').onclick = () => setVolume(+$('volume').value > 0 ? 0 : lastVolume);
setVolume(0.8);


const playBtn = $('play');
function renderPlay() {
  const on = engine.playing;
  playBtn.classList.toggle('playing', on);
  playBtn.setAttribute('aria-pressed', String(on));
  playBtn.setAttribute('aria-label', on ? 'Silence the soundscape' : 'Begin the soundscape');
}

playBtn.onclick = async () => {
  if (playBtn.classList.contains('busy')) return;
  if (engine.playing) { engine.stop(); }
  else {
    engine.params = params();
    playBtn.classList.add('busy');
    try { await engine.start(); }
    catch (e) { console.error(e); engine.stop(); }
    playBtn.classList.remove('busy');
  }
  renderPlay();
};

$('vibe').value = state.danger;
sync(); renderLocs(); renderVibe(); renderPlay();
