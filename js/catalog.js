// Sound catalog.
// `e` = eeriness of the sound: 0 = very cozy, 1 = very eerie/horror. Tune freely after listening.
// `w` = relative base probability (rare sounds get a low value).
// `dur` flag-free: durations are read from the decoded buffer.


// ---------- Looping ambient beds (loop perfectly) ----------
export const LOOPS = {
  forestDay:    { file: 'Sound/loops/forest/day.mp3',       e: 0.08 },
  clearing:     { file: 'Sound/loops/forest/clearing.mp3',  e: 0.12 },
  pine:         { file: 'Sound/loops/forest/pine.mp3',     e: 0.25 },
  autumn:       { file: 'Sound/loops/forest/autumn.mp3',    e: 0.30 },
  rainforest:   { file: 'Sound/loops/forest/rainforest.mp3',e: 0.30 },
  enchanted:    { file: 'Sound/loops/forest/enchanted.mp3', e: 0.35 },
  forestNight:  { file: 'Sound/loops/forest/night.mp3',     e: 0.55 },
  spooky:       { file: 'Sound/loops/forest/spooky.mp3',    e: 0.88 },

  undergroundRiver: { file: 'Sound/loops/water/underground-river.mp3', e: 0.55 },
  stream:       { file: 'Sound/loops/water/stream.mp3',   e: 0.10 },
  ocean:        { file: 'Sound/loops/ocean/waves-1.mp3',       e: 0.35 },
  lake:         { file: 'Sound/loops/water/lake.mp3',    e: 0.08 },
  swamp:        { file: 'Sound/loops/water/swamp.mp3',             e: 0.62 },
  waterfall:    { file: 'Sound/loops/water/waterfall.mp3',         e: 0.20 },

  desertWind:   { file: 'Sound/loops/weather/desert-wind.mp3',                 e: 0.45 },
  fog:          { file: 'Sound/loops/weather/fog.mp3',                         e: 0.65 },
  thunder:      { file: 'Sound/loops/weather/thunderstorm.mp3',          e: 0.82 },
  rain:         { file: 'Sound/loops/weather/light-rain.mp3',                  e: 0.30 },
  mist:         { file: 'Sound/loops/weather/morning-mist.mp3',                e: 0.30 },
  peak:         { file: 'Sound/loops/weather/mountain-peak.mp3',               e: 0.40 },
  evening:      { file: 'Sound/loops/weather/summer-evening.mp3',              e: 0.12 },
  winterWind:   { file: 'Sound/loops/weather/winter-wind.mp3',                 e: 0.60 },

  campfire:     { file: 'Sound/loops/fire/campfire.mp3', e: 0.08 },
  bonfire:      { file: 'Sound/loops/fire/bonfire.mp3',      e: 0.20 },
  torch:        { file: 'Sound/loops/fire/torch.mp3',        e: 0.35 },
  embers:       { file: 'Sound/loops/fire/embers.mp3',       e: 0.45 },

  cavern:       { file: 'Sound/loops/dungeon/cavern.ogg',   e: 0.85 },
  dungeon:      { file: 'Sound/loops/dungeon/dungeon.ogg',         e: 0.68 },
};

// ---------- One-shot effects ----------
export const ONESHOTS = {
  // animals
  bat:      { file: 'Sound/oneshots/animals/bat-screech.mp3',    e: 0.55, w: 0.8, gain: 0.6 },
  cat:      { file: 'Sound/oneshots/animals/cat-meow.mp3',   e: 0.10, w: 0.6, gain: 0.6 },
  dog:      { file: 'Sound/oneshots/animals/dog-bark.mp3',   e: 0.15, w: 0.6, gain: 0.6 },
  frog:     { file: 'Sound/oneshots/animals/frog-croak.mp3',     e: 0.30, w: 1.0, gain: 0.6 },
  owl:      { file: 'Sound/oneshots/animals/owl-hoot.mp3',        e: 0.50, w: 1.0, gain: 0.6 },
  rooster:  { file: 'Sound/oneshots/animals/rooster-crow.mp3',  e: 0.10, w: 0.5, gain: 0.6 },
  songbird: { file: 'Sound/oneshots/birds/songbird.mp3', e: 0.05, w: 1.2, gain: 0.6 },
  wolf:     { file: 'Sound/oneshots/animals/wolf-howl.mp3',        e: 0.60, w: 0.8, gain: 0.7 },

  // dragons (rare, always eerie, no pitch variation)
  dragon:    { file: 'Sound/oneshots/creatures/dragon-roar.mp3',     e: 0.95, w: 0.25, gain: 0.8, noPitch: true },
  seaDragon: { file: 'Sound/oneshots/creatures/sea-dragon-roar.mp3', e: 0.95, w: 0.25, gain: 0.8, noPitch: true },

  // various sfx
  birds:     { file: 'Sound/oneshots/birds/bird-chirps.mp3',           e: 0.05, w: 1.2, gain: 0.6 },
  footsteps: { file: 'Sound/oneshots/spooky/distant-footsteps.mp3',     e: 0.80, w: 0.8, gain: 0.6 },
  abyss:     { file: 'Sound/oneshots/spooky/deep-sea-alien.mp3',         e: 0.90, w: 0.7, gain: 0.6 },
  flies:     { file: 'Sound/oneshots/animals/flies-buzzing.mp3',                e: 0.70, w: 0.7, gain: 0.5 },
  creak:     { file: 'Sound/oneshots/spooky/floorboard-creak.mp3',          e: 0.72, w: 0.8, gain: 0.6 },
  shore:     { file: 'Sound/oneshots/water/shore-waves.mp3',    e: 0.15, w: 1.0, gain: 0.5 },
  wail:      { file: 'Sound/oneshots/spooky/ghostly-wail.mp3',                 e: 0.95, w: 0.7, gain: 0.6 },
  spider:    { file: 'Sound/oneshots/creatures/giant-spider.mp3',         e: 0.85, w: 0.6, gain: 0.6 },
  growl:     { file: 'Sound/oneshots/creatures/beast-growl.mp3',           e: 0.85, w: 0.6, gain: 0.7 },
  windGust:  { file: 'Sound/oneshots/weather/wind-gust.mp3',   e: 0.80, w: 0.8, gain: 0.5 },
  whale:     { file: 'Sound/oneshots/animals/whale-song.mp3',          e: 0.60, w: 0.8, gain: 0.6 },
  hauntWind: { file: 'Sound/oneshots/weather/haunting-wind.mp3',          e: 0.80, w: 0.8, gain: 0.5 },
  chains:    { file: 'Sound/oneshots/spooky/chains-dragging.mp3',        e: 0.90, w: 0.7, gain: 0.6 },
  cows:      { file: 'Sound/oneshots/animals/cows-mooing.mp3',          e: 0.05, w: 0.6, gain: 0.5 },
  distantHowl:{ file: 'Sound/oneshots/animals/wolf-howl-distant.mp3',     e: 0.65, w: 0.8, gain: 0.6 },
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
