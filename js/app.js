import { LOCATIONS } from './catalog.js';
import { Engine } from './engine.js';

const $ = id => document.getElementById(id);
const logEl = $('log');
const engine = new Engine(msg => {
  logEl.textContent = `${new Date().toLocaleTimeString()}  ${msg}\n` + logEl.textContent.slice(0, 4000);
});

const state = { loc: 'forest', vibe: 0.2, effects: 0.5 };

function renderLocs() {
  const box = $('locs'); box.innerHTML = '';
  for (const [id, L] of Object.entries(LOCATIONS)) {
    const b = document.createElement('button');
    b.textContent = L.label;
    b.className = id === state.loc ? 'on' : '';
    b.onclick = () => { state.loc = id; clampVibe(); renderLocs(); renderVibe(); push(); };
    box.appendChild(b);
  }
}

function clampVibe() {
  const [lo, hi] = LOCATIONS[state.loc].vibe;
  state.vibe = Math.min(hi, Math.max(lo, state.vibe));
  $('vibe').value = state.vibe;
}

// Grey out the part of the slider that this location can't produce.
function renderVibe() {
  const [lo, hi] = LOCATIONS[state.loc].vibe;
  const p = x => (x * 100).toFixed(1) + '%';
  $('vibeTrack').style.background =
    `linear-gradient(to right, #2a2d36 ${p(lo)}, #4a7bb5 ${p(lo)}, #b5504a ${p(hi)}, #2a2d36 ${p(hi)})`;
  $('vibeVal').textContent = state.vibe.toFixed(2);
  $('vibeNote').textContent = (lo > 0 || hi < 1)
    ? `${LOCATIONS[state.loc].label} supports ${lo.toFixed(2)} – ${hi.toFixed(2)}` : '';
  $('fxVal').textContent = state.effects.toFixed(2);
}

let timer;
function push() { clearTimeout(timer); timer = setTimeout(() => engine.set({ ...state }), 400); }

$('vibe').oninput = e => { state.vibe = +e.target.value; clampVibe(); renderVibe(); push(); };
$('fx').oninput = e => { state.effects = +e.target.value; renderVibe(); push(); };

$('play').onclick = async () => {
  if (engine.playing) { engine.stop(); }
  else { engine.params = { ...state }; await engine.start(); }
  $('play').textContent = engine.playing ? 'Stop' : 'Play';
  $('play').classList.toggle('playing', engine.playing);
};
$('reroll').onclick = () => engine.reroll();

engine.onChange = () => {
  $('beds').textContent = engine.playing
    ? 'Beds: ' + engine.loops.map(l => `${l.id}${l.role === 'base' ? ' (base)' : ''}`).join(', ') : '';
};

renderLocs(); clampVibe(); renderVibe();
