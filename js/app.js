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

// Grey out the part of the slider that this location can't produce.
function renderVibe() {
  const [lo, hi] = LOCATIONS[state.loc].vibe;
  const p = x => (x * 100).toFixed(1) + '%';
  $('vibeTrack').style.background =
    `linear-gradient(to right, #e4e7ec ${p(lo)}, #60a5fa ${p(lo)}, #f87171 ${p(hi)}, #e4e7ec ${p(hi)})`;
  $('vibeVal').textContent = state.vibe.toFixed(2);
  $('vibeNote').textContent = (lo > 0 || hi < 1)
    ? `${LOCATIONS[state.loc].label} supports ${lo.toFixed(2)} – ${hi.toFixed(2)}` : '';
  $('fxVal').textContent = `Effects: ${Math.round(state.effects * 100)}%`;
}

let timer;
function push() { clearTimeout(timer); timer = setTimeout(() => engine.set({ ...state }), 400); }

$('vibe').oninput = e => { state.vibe = +e.target.value; clampVibe(); renderVibe(); push(); };
$('loc').oninput = e => {
  state.loc = LOC_IDS[+e.target.value]; clampVibe(); renderLocs(); renderVibe(); push();
};

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
