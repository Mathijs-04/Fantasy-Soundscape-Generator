


const L = 'Sound/loops/';
const S = 'Sound/oneshots/';


export const LOOPS = {

  forestDay:    { file: L + 'forest/day.mp3',         e: 0.08 },
  clearing:     { file: L + 'forest/clearing.mp3',    e: 0.12 },
  pine:         { file: L + 'forest/pine.mp3',        e: 0.25 },
  autumn:       { file: L + 'forest/autumn.mp3',      e: 0.30 },
  rainforest:   { file: L + 'forest/rainforest.mp3',  e: 0.30 },
  enchanted:    { file: L + 'forest/enchanted.mp3',   e: 0.35 },
  forestNight:  { file: L + 'forest/night.mp3',       e: 0.55 },
  spooky:       { file: L + 'forest/spooky.mp3',      e: 0.88 },


  undergroundRiver: { file: L + 'water/underground-river.mp3', e: 0.55 },
  stream:       { file: L + 'water/stream.mp3',       e: 0.10 },
  lake:         { file: L + 'water/lake.mp3',         e: 0.08 },
  swamp:        { file: L + 'water/swamp.mp3',        e: 0.62 },
  waterfall:    { file: L + 'water/waterfall.mp3',    e: 0.20 },


  ocean:        { file: L + 'ocean/waves-1.mp3',      e: 0.35 },
  ocean2:       { file: L + 'ocean/waves-2.wav',      e: 0.30, loopEnd: 11.6 },
  ocean3:       { file: L + 'ocean/waves-3.wav',      e: 0.20 },
  ocean4:       { file: L + 'ocean/waves-4.wav',      e: 0.40 },
  underwaterHum:{ file: L + 'ocean/underwater-hum.ogg', e: 0.75, gain: 0.17 },


  desertWind:   { file: L + 'weather/desert-wind.mp3',    e: 0.45 },
  fog:          { file: L + 'weather/fog.mp3',            e: 0.65 },
  thunder:      { file: L + 'weather/thunderstorm.mp3',   e: 0.82 },
  rain:         { file: L + 'weather/light-rain.mp3',     e: 0.30 },
  mist:         { file: L + 'weather/morning-mist.mp3',   e: 0.30 },
  peak:         { file: L + 'weather/mountain-peak.mp3',  e: 0.40 },
  evening:      { file: L + 'weather/summer-evening.mp3', e: 0.12 },
  winterWind:   { file: L + 'weather/winter-wind.mp3',    e: 0.60 },

  strongWind:   { file: L + 'weather/strong-wind.wav',    e: 0.68, gain: 0.25, loopStart: 0.2596, loopEnd: 8.336 },


  campfire:     { file: L + 'fire/campfire.mp3',      e: 0.08 },
  bonfire:      { file: L + 'fire/bonfire.mp3',       e: 0.20 },
  torch:        { file: L + 'fire/torch.mp3',         e: 0.35 },
  embers:       { file: L + 'fire/embers.mp3',        e: 0.45 },


  cellarDrip:   { file: L + 'dungeon/cellar-drip.flac', e: 0.45 },
  dungeon:      { file: L + 'dungeon/dungeon.ogg',    e: 0.68 },
  cavern:       { file: L + 'dungeon/cavern.ogg',     e: 0.85 },
};


export const ONESHOTS = {

  bat:      { file: S + 'animals/bat-screech.mp3',       e: 0.55, w: 0.8, gain: 0.6 },
  cat:      { file: S + 'animals/cat-meow.mp3',          e: 0.10, w: 0.6, gain: 0.6 },
  dog:      { file: S + 'animals/dog-bark.mp3',          e: 0.15, w: 0.6, gain: 0.6 },
  frog:     { file: S + 'animals/frog-croak.mp3',        e: 0.30, w: 1.0, gain: 0.6 },
  owl:      { file: S + 'animals/owl-hoot.mp3',          e: 0.50, w: 1.0, gain: 0.6 },
  rooster:  { file: S + 'animals/rooster-crow.mp3',      e: 0.10, w: 0.5, gain: 0.6 },
  wolf:     { file: S + 'animals/wolf-howl.mp3',         e: 0.60, w: 0.8, gain: 0.7 },
  distantHowl: { file: S + 'animals/wolf-howl-distant.mp3', e: 0.65, w: 0.8, gain: 0.6 },
  cows:     { file: S + 'animals/cows-mooing.mp3',       e: 0.05, w: 0.6, gain: 0.5 },
  flies:    { file: S + 'animals/flies-buzzing.mp3',     e: 0.70, w: 0.7, gain: 0.5 },
  whale:    { file: S + 'animals/whale-song.mp3',        e: 0.60, w: 0.8, gain: 0.6 },


  songbird: { file: S + 'birds/songbird.mp3',            e: 0.05, w: 1.2, gain: 0.6 },
  birds:    { file: S + 'birds/bird-chirps.mp3',         e: 0.05, w: 1.2, gain: 0.6 },
  killdeer: { file: S + 'birds/killdeer.flac',           e: 0.10, w: 0.8, gain: 0.45 },
  woodpecker:{ file: S + 'birds/woodpecker.mp3',         e: 0.15, w: 0.8, gain: 2.35 },
  peacock:  { file: S + 'birds/peacock.ogg',             e: 0.20, w: 0.6, gain: 0.45 },
  quail:    { file: S + 'birds/quail.ogg',               e: 0.08, w: 0.8, gain: 0.55 },

  seagull1: { file: S + 'birds/seagull-1.wav',           e: 0.12, w: 0.25, gain: 0.45 },
  seagull2: { file: S + 'birds/seagull-2.wav',           e: 0.12, w: 0.25, gain: 1.55 },
  seagull3: { file: S + 'birds/seagull-3.wav',           e: 0.12, w: 0.25, gain: 1.35 },
  seagull4: { file: S + 'birds/seagull-4.wav',           e: 0.12, w: 0.25, gain: 0.80 },
  seagull5: { file: S + 'birds/seagull-5.wav',           e: 0.12, w: 0.25, gain: 0.80 },
  seagull6: { file: S + 'birds/seagull-6.wav',           e: 0.12, w: 0.25, gain: 0.95 },
  seagull7: { file: S + 'birds/seagull-7.wav',           e: 0.12, w: 0.25, gain: 1.85 },


  dragon:    { file: S + 'creatures/dragon-roar.mp3',     e: 0.95, w: 0.25, gain: 0.8, noPitch: true },
  seaDragon: { file: S + 'creatures/sea-dragon-roar.mp3', e: 0.95, w: 0.25, gain: 0.8, noPitch: true },
  growl:     { file: S + 'creatures/beast-growl.mp3',     e: 0.85, w: 0.6,  gain: 0.7 },
  spider:    { file: S + 'creatures/giant-spider.mp3',    e: 0.85, w: 0.6,  gain: 0.6 },


  footsteps: { file: S + 'spooky/distant-footsteps.mp3',  e: 0.80, w: 0.8, gain: 0.6 },
  chains:    { file: S + 'spooky/chains-dragging.mp3',    e: 0.90, w: 0.7, gain: 0.6 },
  creak:     { file: S + 'spooky/floorboard-creak.mp3',   e: 0.72, w: 0.8, gain: 0.6 },
  wail:      { file: S + 'spooky/ghostly-wail.mp3',       e: 0.95, w: 0.7, gain: 0.6 },
  abyss:     { file: S + 'spooky/deep-sea-alien.mp3',     e: 0.90, w: 0.7, gain: 0.6 },


  windGust:  { file: S + 'weather/wind-gust.mp3',         e: 0.80, w: 0.8, gain: 0.5 },
  hauntWind: { file: S + 'weather/haunting-wind.mp3',     e: 0.80, w: 0.8, gain: 0.5 },
  distantThunder: { file: S + 'weather/distant-thunder.mp3', e: 0.55, w: 0.8, gain: 0.7 },


  shore:     { file: S + 'water/shore-waves.mp3',         e: 0.15, w: 1.0, gain: 0.5 },
  wave1:     { file: S + 'water/wave-1.flac',             e: 0.20, w: 0.3, gain: 0.90 },
  wave2:     { file: S + 'water/wave-2.flac',             e: 0.20, w: 0.3, gain: 0.80 },
  wave3:     { file: S + 'water/wave-3.flac',             e: 0.20, w: 0.3, gain: 0.85 },
  wave4:     { file: S + 'water/wave-4.flac',             e: 0.25, w: 0.3, gain: 0.70 },
};


const RULES = {
  songbird: { min: 0,   max: 0.40, day: true },
  birds:    { min: 0,   max: 0.40, day: true, surface: true },
  killdeer: { min: 0,   max: 0.40, day: true, surface: true },
  quail:    { min: 0,   max: 0.40, day: true },
  woodpecker:{ min: 0,  max: 0.45, day: true },
  peacock:  { min: 0,   max: 0.50, day: true },
  seagull:  { min: 0,   max: 0.50, day: true, surface: true },
  rooster:  { min: 0,   max: 0.30, day: true },
  cows:     { min: 0,   max: 0.30, day: true },
  cat:      { min: 0,   max: 0.40 },
  dog:      { min: 0,   max: 0.45 },
  shore:    { min: 0,   max: 0.50, day: true, surface: true },
  wave:     { min: 0,   max: 0.80, surface: true },
  frog:     { min: 0,   max: 0.85, night: true },
  owl:      { min: 0.25, max: 1, night: true },
  bat:      { min: 0.35, max: 1, night: true },
  wolf:     { min: 0.35, max: 1, night: true },
  distantHowl: { min: 0.40, max: 1, night: true },
  distantThunder: { min: 0.30, max: 1, stormy: true },
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
  const rule = RULES[id] ?? RULES[id.replace(/\d+$/, '')] ?? { min: 0, max: 1 };
  const { day, night, surface, stormy, ...range } = rule;
  const avoid = [];
  if (day) avoid.push('night', 'storm');
  if (night) avoid.push('day');
  if (surface) avoid.push('deep');
  Object.assign(def, range, { avoid, needs: stormy ? ['storm'] : null });
}


export const BED_TIME = {
  day:   ['forestDay', 'clearing', 'evening', 'lake', 'stream'],
  night: ['forestNight', 'spooky', 'swamp', 'cavern', 'dungeon', 'cellarDrip', 'embers'],
  storm: ['thunder', 'rain', 'fog', 'winterWind', 'desertWind', 'peak', 'strongWind'],
  deep:  ['underwaterHum'],
};


export const LOCATIONS = {
  forest: {
    label: 'Forest', vibe: [0.0, 1.0], ends: ['Peaceful Glade', 'Haunted Woods'],
    base: ['forestDay','clearing','evening','pine','autumn','rainforest','enchanted','forestNight','spooky'],
    layers: ['stream','rain','mist','fog','winterWind','thunder','waterfall'],
    sfx: ['songbird','birds','woodpecker','quail','peacock','distantThunder','owl','frog','wolf','distantHowl','bat','spider','growl','footsteps','windGust','wail','dragon'],
  },
  ocean: {
    label: 'Ocean', vibe: [0.0, 1.0], ends: ['Safe Shallows', 'The Abyss'],
    base: ['lake','evening','ocean','ocean2','ocean3','ocean4','mist','fog','thunder','underwaterHum'],
    layers: ['ocean','ocean2','ocean3','ocean4','rain','winterWind','strongWind','fog','mist'],
    sfx: ['shore','birds','seagull1','seagull2','seagull3','seagull4','seagull5','seagull6','seagull7','killdeer',
          'wave1','wave2','wave3','wave4','distantThunder','whale','abyss','hauntWind','windGust','wail','seaDragon'],
  },
  dungeon: {
    label: 'Dungeon', vibe: [0.45, 1.0], ends: ['Damp Cellar', 'Crypts of Doom'],
    base: ['cellarDrip','dungeon','cavern'],
    layers: ['cellarDrip','torch','embers','undergroundRiver','fog','winterWind','swamp'],
    sfx: ['bat','creak','footsteps','chains','spider','flies','growl','wail','hauntWind','dragon'],
  },
  swamp: {
    label: 'Swamp', vibe: [0.3, 1.0], ends: ['Wetlands', 'The Dreadfull Marshes'],
    base: ['swamp','rainforest','forestNight','spooky'],
    layers: ['fog','rain','mist','thunder'],
    sfx: ['killdeer','distantThunder','frog','owl','flies','bat','spider','growl','footsteps','windGust','wail'],
  },
  mountain: {
    label: 'Mountains', vibe: [0.1, 1.0], ends: ['The High Pass', 'The Howling Peaks'],
    base: ['evening','pine','peak','desertWind','winterWind','strongWind'],
    layers: ['stream','waterfall','fog','mist','thunder','rain','strongWind'],
    sfx: ['birds','songbird','killdeer','quail','distantThunder','wolf','distantHowl','owl','hauntWind','windGust','wail','growl','dragon'],
  },
  camp: {
    label: 'Campfire', vibe: [0.0, 0.8], ends: ['Cozy Camp', 'Whispers in the Woods'],
    base: ['campfire','bonfire','torch','embers'],
    layers: ['forestNight','evening','clearing','pine','rain','spooky','mist','strongWind'],
    sfx: ['woodpecker','quail','peacock','rooster','distantThunder','owl','frog','cat','dog','cows','wolf','distantHowl','bat','footsteps','growl'],
  },
};
