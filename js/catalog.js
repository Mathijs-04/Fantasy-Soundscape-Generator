// Sound catalog.
// `e` = eeriness of the sound: 0 = very cozy, 1 = very eerie/horror. Tune freely after listening.
// `w` = relative base probability (rare sounds get a low value).
// `dur` flag-free: durations are read from the decoded buffer.

const N = 'Sound/Nature/AMB_Nature Pack Vol 1_';

// ---------- Looping ambient beds (loop perfectly) ----------
export const LOOPS = {
  forestDay:    { file: N + 'Forest Enviroments_Forest Day.mp3',       e: 0.08 },
  clearing:     { file: N + 'Forest Enviroments_Forest Clearing.mp3',  e: 0.12 },
  pine:         { file: N + 'Forest Enviroments_Pine Forest .mp3',     e: 0.25 },
  autumn:       { file: N + 'Forest Enviroments_Autumn Forest.mp3',    e: 0.30 },
  rainforest:   { file: N + 'Forest Enviroments_Rainforest Canopy.mp3',e: 0.30 },
  enchanted:    { file: N + 'Forest Enviroments_Enchanted Forest.mp3', e: 0.35 },
  forestNight:  { file: N + 'Forest Enviroments_Forest Night.mp3',     e: 0.55 },
  spooky:       { file: N + 'Forest Enviroments_Spooky Forest.mp3',    e: 0.88 },

  undergroundRiver: { file: N + 'Water Enviroments_ Underground River .mp3', e: 0.55 },
  stream:       { file: N + 'Water Enviroments_Mountain Stream.mp3',   e: 0.10 },
  ocean:        { file: N + 'Water Enviroments_Ocean Waves.mp3',       e: 0.35 },
  lake:         { file: N + 'Water Enviroments_Peaceful Lake .mp3',    e: 0.08 },
  swamp:        { file: N + 'Water Enviroments_Swamp.mp3',             e: 0.62 },
  waterfall:    { file: N + 'Water Enviroments_Waterfall.mp3',         e: 0.20 },

  desertWind:   { file: N + 'Weather_Desert Wind.mp3',                 e: 0.45 },
  fog:          { file: N + 'Weather_Fog.mp3',                         e: 0.65 },
  thunder:      { file: N + 'Weather_Heavy Thunderstorm.mp3',          e: 0.82 },
  rain:         { file: N + 'Weather_Light Rain.mp3',                  e: 0.30 },
  mist:         { file: N + 'Weather_Morning Mist.mp3',                e: 0.30 },
  peak:         { file: N + 'Weather_Mountain Peak.mp3',               e: 0.40 },
  evening:      { file: N + 'Weather_Summer Evening.mp3',              e: 0.12 },
  winterWind:   { file: N + 'Weather_Winter Wind.mp3',                 e: 0.60 },

  campfire:     { file: N + ' Fire & Elemental_Campfire Crackling.mp3', e: 0.08 },
  bonfire:      { file: N + ' Fire & Elemental_Large Bonfire.mp3',      e: 0.20 },
  torch:        { file: N + ' Fire & Elemental_Torch Flame.mp3',        e: 0.35 },
  embers:       { file: N + ' Fire & Elemental_Dying Embers.mp3',       e: 0.45 },

  cavern:       { file: 'Sound/Dungeon/dark_cavern_ambient_002.ogg',   e: 0.85 },
  dungeon:      { file: 'Sound/Dungeon/dungeon_ambient_1.ogg',         e: 0.68 },
};

// ---------- One-shot effects ----------
const V = 'Sound/Various SFX/dragon-studio-';
export const ONESHOTS = {
  // animals
  bat:      { file: 'Sound/Animals/bat-screech-bat-screech-01.mp3',    e: 0.55, w: 0.8, gain: 0.6 },
  cat:      { file: 'Sound/Animals/cat-meow-animal-cat-meow-34.mp3',   e: 0.10, w: 0.6, gain: 0.6 },
  dog:      { file: 'Sound/Animals/dog-bark-animal-dog-bark-25.mp3',   e: 0.15, w: 0.6, gain: 0.6 },
  frog:     { file: 'Sound/Animals/frog-croak-animal-frog-14.mp3',     e: 0.30, w: 1.0, gain: 0.6 },
  owl:      { file: 'Sound/Animals/owl-hoot-animal-owl-01.mp3',        e: 0.50, w: 1.0, gain: 0.6 },
  rooster:  { file: 'Sound/Animals/rooster-crow-rooster-crow-02.mp3',  e: 0.10, w: 0.5, gain: 0.6 },
  songbird: { file: 'Sound/Animals/songbird-chirp-animal-bird-24.mp3', e: 0.05, w: 1.2, gain: 0.6 },
  wolf:     { file: 'Sound/Animals/wolf-howl-wolf-howl-02.mp3',        e: 0.60, w: 0.8, gain: 0.7 },

  // dragons (rare, always eerie, no pitch variation)
  dragon:    { file: 'Sound/Dragons/Dragon-Roar.mp3',     e: 0.95, w: 0.25, gain: 0.8, noPitch: true },
  seaDragon: { file: 'Sound/Dragons/Sea-Dragon-Roar.mp3', e: 0.95, w: 0.25, gain: 0.8, noPitch: true },

  // various sfx
  birds:     { file: V + 'bird-nature-sounds-487657.mp3',           e: 0.05, w: 1.2, gain: 0.6 },
  footsteps: { file: V + 'creepy-distant-footsteps-482883.mp3',     e: 0.80, w: 0.8, gain: 0.6 },
  abyss:     { file: V + 'deep-sea-alien-sound-487681.mp3',         e: 0.90, w: 0.7, gain: 0.6 },
  flies:     { file: V + 'flies-buzzing-494311.mp3',                e: 0.70, w: 0.7, gain: 0.5 },
  creak:     { file: V + 'floorboard-creak-03-499651.mp3',          e: 0.72, w: 0.8, gain: 0.6 },
  shore:     { file: V + 'gentle-ocean-shore-waves-499665.mp3',    e: 0.15, w: 1.0, gain: 0.5 },
  wail:      { file: V + 'ghostly-wail-511318.mp3',                 e: 0.95, w: 0.7, gain: 0.6 },
  spider:    { file: V + 'giant-spider-walking-511319.mp3',         e: 0.85, w: 0.6, gain: 0.6 },
  growl:     { file: V + 'growl-of-the-beast-504021.mp3',           e: 0.85, w: 0.6, gain: 0.7 },
  windGust:  { file: V + 'halloween-creepy-wind-gust-511327.mp3',   e: 0.80, w: 0.8, gain: 0.5 },
  whale:     { file: V + 'haunting-whale-song-515260.mp3',          e: 0.60, w: 0.8, gain: 0.6 },
  hauntWind: { file: V + 'haunting-wind-sound-515274.mp3',          e: 0.80, w: 0.8, gain: 0.5 },
  chains:    { file: V + 'heavy-chains-dragging-515264.mp3',        e: 0.90, w: 0.7, gain: 0.6 },
  cows:      { file: V + 'herd-of-cows-mooing-515267.mp3',          e: 0.05, w: 0.6, gain: 0.5 },
  distantHowl:{ file: V + 'howling-in-the-distance-515982.mp3',     e: 0.65, w: 0.8, gain: 0.6 },
};

// ---------- Consistency rules ----------
// Hard danger window [min, max] in which each one-shot may play at all. The gaussian weighting in the
// engine only chooses *among* allowed sounds, so nothing out of mood can slip through by chance.
// `day` / `night`: time-of-day sounds; they never play over a bed of the opposite time (see BED_TIME).
const RULES = {
  songbird: { min: 0,   max: 0.40, day: true },
  birds:    { min: 0,   max: 0.40, day: true },
  rooster:  { min: 0,   max: 0.30, day: true },
  cows:     { min: 0,   max: 0.30, day: true },
  cat:      { min: 0,   max: 0.40 },
  dog:      { min: 0,   max: 0.45 },
  shore:    { min: 0,   max: 0.50, day: true },
  frog:     { min: 0,   max: 0.85, night: true },
  owl:      { min: 0.25, max: 1, night: true },
  bat:      { min: 0.35, max: 1, night: true },
  wolf:     { min: 0.35, max: 1, night: true },
  distantHowl: { min: 0.40, max: 1, night: true },
  whale:    { min: 0.25, max: 0.90 },
  flies:    { min: 0.45, max: 1 },
  creak:    { min: 0.45, max: 1 },
  windGust: { min: 0.50, max: 1 },
  hauntWind:{ min: 0.50, max: 1 },
  footsteps:{ min: 0.50, max: 1 },
  abyss:    { min: 0.60, max: 1 },
  spider:   { min: 0.55, max: 1 },
  growl:    { min: 0.60, max: 1 },
  chains:   { min: 0.60, max: 1 },
  wail:     { min: 0.65, max: 1 },
  dragon:   { min: 0.80, max: 1 },
  seaDragon:{ min: 0.80, max: 1 },
};
for (const [id, def] of Object.entries(ONESHOTS)) {
  Object.assign(def, RULES[id] ?? RULES[id.replace(/\d+$/, '')] ?? { min: 0, max: 1 });
}

// Time of day / weather of the beds, used to keep one-shots plausible over them.
export const BED_TIME = {
  day:   ['forestDay', 'clearing', 'evening', 'lake', 'stream'],
  night: ['forestNight', 'spooky', 'swamp', 'cavern', 'dungeon', 'embers'],
  storm: ['thunder', 'rain', 'fog', 'winterWind', 'desertWind', 'peak'], // no birdsong in bad weather
};

// ---------- Locations ----------
// vibe: [min, max] eeriness range the location supports (the UI slider is clamped to it).
// loops: ids usable as beds. `base` = may be the main bed; others only as quieter layers.
// sfx: one-shot ids that make sense here.
export const LOCATIONS = {
  forest: {
    label: 'Forest', vibe: [0.0, 1.0], ends: ['Peaceful Glade', 'Haunted Woods'],
    base: ['forestDay','clearing','evening','pine','autumn','rainforest','enchanted','forestNight','spooky'],
    layers: ['stream','rain','mist','fog','winterWind','thunder','waterfall'],
    sfx: ['songbird','birds','owl','frog','wolf','distantHowl','bat','spider','growl','footsteps','windGust','wail','dragon'],
  },
  ocean: {
    label: 'Ocean', vibe: [0.0, 1.0], ends: ['Safe Shallows', 'The Abyss'],
    base: ['lake','evening','ocean','mist','fog','thunder'],
    layers: ['ocean','rain','winterWind','fog','mist'],
    sfx: ['shore','birds','whale','abyss','hauntWind','windGust','wail','seaDragon'],
  },
  dungeon: {
    label: 'Dungeon', vibe: [0.45, 1.0], ends: ['Damp Cellar', 'Crypts of Doom'],
    base: ['dungeon','cavern'],
    layers: ['torch','embers','undergroundRiver','fog','winterWind','swamp'],
    sfx: ['bat','creak','footsteps','chains','spider','flies','growl','wail','hauntWind','dragon'],
  },
  swamp: {
    label: 'Swamp', vibe: [0.3, 1.0], ends: ['Wetlands', 'The Dreadfull Marshes'],
    base: ['swamp','rainforest','forestNight','spooky'],
    layers: ['fog','rain','mist','thunder'],
    sfx: ['frog','owl','flies','bat','spider','growl','footsteps','windGust','wail'],
  },
  mountain: {
    label: 'Mountains', vibe: [0.1, 1.0], ends: ['The High Pass', 'The Howling Peaks'],
    base: ['evening','pine','peak','desertWind','winterWind'],
    layers: ['stream','waterfall','fog','mist','thunder','rain'],
    sfx: ['birds','songbird','wolf','distantHowl','owl','hauntWind','windGust','wail','growl','dragon'],
  },
  camp: {
    label: 'Campfire', vibe: [0.0, 0.8], ends: ['Cozy Camp', 'Whispers in the Woods'],
    base: ['campfire','bonfire','torch','embers'],
    layers: ['forestNight','evening','clearing','pine','rain','spooky','mist'],
    sfx: ['owl','frog','cat','dog','cows','wolf','distantHowl','bat','footsteps','growl'],
  },
};
