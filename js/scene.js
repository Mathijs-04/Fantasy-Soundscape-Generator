
const W = 1600, H = 900;

function rng(seed) {
  let s = seed % 2147483647; if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}


function ridge(rnd, base, amp, rough = 0.55, steps = 7) {
  let pts = [base + (rnd() - 0.5) * amp, base + (rnd() - 0.5) * amp];
  let disp = amp;
  for (let i = 0; i < steps; i++) {
    const next = [];
    for (let j = 0; j < pts.length - 1; j++) {
      next.push(pts[j], (pts[j] + pts[j + 1]) / 2 + (rnd() - 0.5) * disp);
    }
    next.push(pts[pts.length - 1]);
    pts = next; disp *= rough;
  }
  const dx = W / (pts.length - 1);
  let d = `M0 ${H}`;
  pts.forEach((y, i) => { d += `L${(i * dx).toFixed(1)} ${y.toFixed(1)}`; });
  return d + `L${W} ${H}Z`;
}


function pines(rnd, base, minH, maxH, minW, maxW) {
  let d = `M-20 ${H}L-20 ${base}`;
  const trees = [];
  for (let x = -20; x < W + 30; x += minW * 0.55 + rnd() * (maxW - minW) * 0.6) {
    const h = minH + rnd() * (maxH - minH), w = minW + rnd() * (maxW - minW);
    trees.push([x, h, w]);
  }
  d = `M-30 ${H}L-30 ${base}L${W + 30} ${base}L${W + 30} ${H}Z`;
  for (const [x, h, w] of trees) {
    for (let t = 0; t < 4; t++) {
      const top = base - h + t * h * 0.22, bot = base - h + h * 0.38 + t * h * 0.22;
      const hw = (w / 2) * (0.4 + t * 0.2);
      d += `M${x.toFixed(1)} ${top.toFixed(1)}L${(x + hw).toFixed(1)} ${bot.toFixed(1)}L${(x - hw).toFixed(1)} ${bot.toFixed(1)}Z`;
    }
  }
  return d;
}

function castle(x, y) {
  let d = '', wins = '';
  const rect = (rx, ry, w, h) => { d += `M${x + rx} ${y + ry}h${w}v${h}h${-w}z`; };
  const roof = (rx, ry, w, h) => { d += `M${x + rx - 4} ${y + ry}L${x + rx + w / 2} ${y + ry - h}L${x + rx + w + 4} ${y + ry}z`; };
  const win = (rx, ry) => { wins += `<rect class="win" x="${x + rx}" y="${y + ry}" width="3" height="6"/>`; };
  rect(-70, -40, 140, 60);
  for (let i = -70; i < 70; i += 14) rect(i, -46, 8, 6);
  rect(-30, -110, 60, 70); roof(-30, -110, 60, 50);
  rect(-95, -90, 26, 110); roof(-95, -90, 26, 46);
  rect(69, -80, 24, 100); roof(69, -80, 24, 42);
  rect(-8, -170, 16, 62); roof(-8, -170, 16, 34);
  rect(100, -50, 20, 70); roof(100, -50, 20, 30);
  rect(-120, -40, 20, 60); roof(-120, -40, 20, 26);
  d += `M${x - 130} ${y + 20}h260v400h-260z`;
  [[-85, -70], [-85, -40], [78, -60], [78, -30], [-4, -150], [-12, -90], [8, -90], [-12, -65], [8, -65], [108, -30], [-112, -20]]
    .forEach(([a, b]) => win(a, b));
  return `<path class="castle" d="${d}"/><g>${wins}</g>`;
}

function seaWave(rnd, base, amp, wl) {
  let d = `M-120 ${H}L-120 ${base}`;
  const ph = rnd() * 6;
  for (let x = -120; x <= W + 120; x += 20) d += `L${x} ${(base + Math.sin(x / wl + ph) * amp + Math.sin(x / (wl * 0.43) + ph) * amp * 0.4).toFixed(1)}`;
  return d + `L${W + 120} ${H}Z`;
}


function corridor(ctx) {
  const VY = 430, FAR = 620, TOP = -30, BOT = 930;
  const rnd = rng(777), f = n => n.toFixed(1);
  const k = x => 1 - x / 800;
  const Y = (x, y0) => VY + (y0 - VY) * k(x);
  const X = (x, side) => (side < 0 ? x : W - x);
  const P = (x, y0, side) => `${f(X(x, side))} ${f(Y(x, y0))}`;
  const yTopFar = Y(FAR, TOP), yBotFar = Y(FAR, BOT);

  const xs = [];
  for (let i = 1; ; i++) { const x = 800 * (1 - 0.78 ** i); if (x > FAR - 2) break; xs.push(x); }
  const rows = []; for (let y = TOP; y < BOT; y += 90) rows.push(y); rows.push(BOT);


  let lines = '';
  for (const side of [-1, 1]) {
    rows.forEach((y0, j) => {
      lines += `M${P(0, y0, side)}L${P(FAR, y0, side)}`;
      if (j < rows.length - 1) xs.forEach((x, i) => { if ((i + j) % 2) lines += `M${P(x, y0, side)}L${P(x, rows[j + 1], side)}`; });
    });
  }
  const t = (BOT - yBotFar) / (BOT - VY);
  for (let x0 = -800; x0 <= 2400; x0 += 200) {
    lines += `M${x0} ${BOT}L${f(x0 + (800 - x0) * t)} ${f(yBotFar)}M${x0} ${TOP}L${f(x0 + (800 - x0) * t)} ${f(yTopFar)}`;
  }
  xs.forEach(x => { const yb = Y(x, BOT), yt = Y(x, TOP); lines += `M${f(x)} ${f(yb)}L${f(W - x)} ${f(yb)}M${f(x)} ${f(yt)}L${f(W - x)} ${f(yt)}`; });


  let beams = '';
  [xs[0], xs[3]].forEach(x => {
    beams += `M${f(x)} ${f(Y(x, TOP))}L${f(W - x)} ${f(Y(x, TOP))}`;
    for (const side of [-1, 1]) beams += `M${P(x, TOP, side)}L${P(x, BOT, side)}`;
  });


  const outside = id => `<rect width="${W}" height="${H}" fill="url(#corSky)"/>${ctx.stars}
      <circle class="moonhalo" cx="300" cy="190" r="230" fill="url(#halo)"/>
      ${ctx.moonSvg.replaceAll('moonclip', id + '-m')}
      <path class="mtn-far" d="${ctx.farPath}"/>${ctx.castleSvg}<path class="mtn-mid" d="${ctx.midPath}"/>
      <path class="pines-far" d="${ctx.pinesFar}"/><path class="pines" d="${ctx.pinesNear}"/>`;

  const windowAt = (id, side, xa, xb, yBot, ySpring, yApex) => {
    const pts = [], xm = (xa + xb) / 2;
    const add = (x, y0) => pts.push([X(x, side), Y(x, y0)]);
    const sm = u => u * u * (3 - 2 * u);
    add(xa, yBot); add(xa, ySpring);
    for (let q = 1; q <= 8; q++) { const u = q / 8; add(xa + (xm - xa) * sm(u), ySpring + (yApex - ySpring) * (1 - (1 - u) ** 2)); }
    for (let q = 7; q >= 0; q--) { const u = q / 8; add(xb - (xb - xm) * sm(u), ySpring + (yApex - ySpring) * (1 - (1 - u) ** 2)); }
    add(xb, ySpring); add(xb, yBot);
    const d = 'M' + pts.map(([x, y]) => `${f(x)} ${f(y)}`).join('L') + 'Z';
    const yBar = ySpring + (yBot - ySpring) * 0.45;
    const mull = `M${P(xm, yBar, side)}L${P(xm, yBot, side)}M${P(xa, yBar, side)}L${P(xb, yBar, side)}`;

    const dir = side < 0 ? 1 : -1, ka = k(xa), kb = k(xb);
    const beam = `M${P(xa, BOT - 40, side)}L${P(xb, BOT - 40, side)}L${f(X(xb, side) + dir * 330 * kb)} ${f(Y(xb, BOT - 40) - 6)}L${f(X(xa, side) + dir * 380 * ka)} ${f(Y(xa, BOT - 40) - 6)}Z`;
    return `<path class="moonbeam" d="${beam}"/>
      <clipPath id="${id}"><path d="${d}"/></clipPath>
      <g clip-path="url(#${id})">${outside(id)}</g>
      <path class="cor-mull" d="${mull}"/>
      <path class="cor-frame" d="${d}"/>`;
  };

  const torch = (x, side) => {
    const px = X(x, side), py = Y(x, 300), s = k(x) * 2;
    return `<circle class="torch-glow" cx="${f(px)}" cy="${f(py - 14 * s)}" r="${f(280 * k(x) + 50)}" fill="url(#corGlow)"/>
      <g transform="translate(${f(px)} ${f(py)}) scale(${f(s)})">
        <path class="cor-iron" d="M-9 0h18l-3 11h-12zM-2 11h4v22h-4zM-8 33h16v4h-16z"/>
        <path class="torch-flame" d="M0 0c-10-9-4-21 0-31 2 9 10 17 0 31z"/>
        <path class="torch-core" d="M0-1c-4.5-5-2-11.5 0-17 1.2 5 4.8 9.5 0 17z"/>
      </g>`;
  };

  return `<defs>
      <linearGradient id="corWallL" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${FAR}" y2="0"><stop offset="0" stop-color="#2b231b"/><stop offset=".6" stop-color="#171310"/><stop offset="1" stop-color="#090706"/></linearGradient>
      <linearGradient id="corWallR" gradientUnits="userSpaceOnUse" x1="${W}" y1="0" x2="${W - FAR}" y2="0"><stop offset="0" stop-color="#2b231b"/><stop offset=".6" stop-color="#171310"/><stop offset="1" stop-color="#090706"/></linearGradient>
      <linearGradient id="corCeil" gradientUnits="userSpaceOnUse" x1="0" y1="${TOP}" x2="0" y2="${f(yTopFar)}"><stop offset="0" stop-color="#050403"/><stop offset="1" stop-color="#15110d"/></linearGradient>
      <linearGradient id="corFloor" gradientUnits="userSpaceOnUse" x1="0" y1="${BOT}" x2="0" y2="${f(yBotFar)}"><stop offset="0" stop-color="#201a14"/><stop offset="1" stop-color="#0b0907"/></linearGradient>
      <linearGradient id="corSky" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="${H}"><stop offset="0" stop-color="#070a0f"/><stop offset=".5" stop-color="#1d2735"/><stop offset="1" stop-color="#121820"/></linearGradient>
      <radialGradient id="corGlow"><stop offset="0" stop-color="#ffb35c" stop-opacity=".55"/><stop offset=".35" stop-color="#e8782c" stop-opacity=".2"/><stop offset="1" stop-color="#e8782c" stop-opacity="0"/></radialGradient>
      <radialGradient id="corDoor" cx=".5" cy="1" r="1"><stop offset="0" style="stop-color: color-mix(in srgb, #8a5424, #d0201a calc(var(--danger) * 100%))" stop-opacity=".95"/><stop offset="1" style="stop-color: color-mix(in srgb, #3a2412, #50080a calc(var(--danger) * 100%))" stop-opacity=".15"/></radialGradient>
    </defs>
    <rect x="${W - FAR - (W - 2 * FAR) }" y="${f(yTopFar)}" width="${W - 2 * FAR}" height="${f(yBotFar - yTopFar)}" fill="#050403"/>
    <path class="door-glow" d="M708 ${f(yBotFar)}V440Q708 380 800 366Q892 380 892 440V${f(yBotFar)}Z" fill="url(#corDoor)"/>
    <path d="M0 ${TOP}H${W}L${W - FAR} ${f(yTopFar)}H${FAR}Z" fill="url(#corCeil)"/>
    <path d="M0 ${BOT}H${W}L${W - FAR} ${f(yBotFar)}H${FAR}Z" fill="url(#corFloor)"/>
    <path d="M${P(0, TOP, -1)}L${P(FAR, TOP, -1)}L${P(FAR, BOT, -1)}L${P(0, BOT, -1)}Z" fill="url(#corWallL)"/>
    <path d="M${P(0, TOP, 1)}L${P(FAR, TOP, 1)}L${P(FAR, BOT, 1)}L${P(0, BOT, 1)}Z" fill="url(#corWallR)"/>
    <path class="cor-line" d="${lines}"/>
    <path class="cor-beam" d="${beams}"/>
    ${windowAt('winL', -1, 200, 436, 760, 120, -20)}
    ${windowAt('winR', 1, 200, 436, 760, 120, -20)}
    ${[xs[0], xs[3]].map(x => torch(x, -1) + torch(x, 1)).join('')}`;
}

function moon(cx, cy, r, rnd, id = 'moonclip') {
  const N = 90, ph = [rnd() * 6, rnd() * 6, rnd() * 6];
  let d = '';
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    let k = 1 + 0.035 * Math.sin(a * 3 + ph[0]) + 0.025 * Math.sin(a * 5 + ph[1]) + 0.012 * Math.sin(a * 11 + ph[2])
      + (rnd() - 0.5) * 0.03;
    const bite = Math.abs(Math.atan2(Math.sin(a - 2.4), Math.cos(a - 2.4)));
    if (bite < 0.22) k -= 0.075 * (1 - bite / 0.22);
    d += `${i ? 'L' : 'M'}${(cx + Math.cos(a) * r * k).toFixed(1)} ${(cy + Math.sin(a) * r * k).toFixed(1)}`;
  }
  d += 'Z';
  let stains = '';
  for (let i = 0; i < 9; i++) {
    const a = rnd() * 6.28, rad = Math.sqrt(rnd()) * r * 0.85;
    stains += `<ellipse cx="${(cx + Math.cos(a) * rad).toFixed(1)}" cy="${(cy + Math.sin(a) * rad).toFixed(1)}" rx="${(3 + rnd() * 9).toFixed(1)}" ry="${(2 + rnd() * 6).toFixed(1)}" transform="rotate(${(rnd() * 180).toFixed(0)} ${cx} ${cy})" opacity="${(0.12 + rnd() * 0.22).toFixed(2)}"/>`;
  }
  return `<clipPath id="${id}"><path d="${d}"/></clipPath>
    <g filter="url(#moonrough)"><path class="moon" d="${d}"/>
    <g clip-path="url(#${id})"><g class="moon-stain">${stains}</g>
      <circle cx="${cx + r * 0.42}" cy="${cy - r * 0.18}" r="${r * 1.05}" class="moon-shade"/>
      <path class="moon-rim" d="${d}"/></g></g>`;
}

function buildScene(root) {
  const rnd = rng(20240921);
  let stars = '';
  for (let i = 0; i < 110; i++) {
    stars += `<circle class="star" cx="${(rnd() * W).toFixed(0)}" cy="${(rnd() * H * 0.5).toFixed(0)}" r="${(0.4 + rnd() * 1.1).toFixed(2)}" opacity="${(0.25 + rnd() * 0.6).toFixed(2)}"/>`;
  }

  const moonSvg = moon(300, 190, 46, rnd);
  const farPath = ridge(rnd, 470, 300, 0.58);
  const midPath = ridge(rnd, 600, 190, 0.55);
  const castleSvg = castle(1250, 470);
  const pinesFar = pines(rnd, 700, 90, 170, 40, 80);
  const pinesNear = pines(rnd, 820, 120, 260, 55, 110);
  root.innerHTML = `
  <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="moonrough" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="3" seed="5" result="n"/>
        <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
      <radialGradient id="halo"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".25" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    </defs>
    <g data-for="forest swamp camp mountain ocean">${stars}</g>
    <g data-for="forest swamp camp mountain ocean">
      <circle class="moonhalo" cx="300" cy="190" r="230" fill="url(#halo)"/>
      ${moonSvg}
    </g>
    <g class="mtn-wrap" data-for="forest swamp camp mountain ocean">
      <path class="mtn-far" d="${farPath}"/>
      ${castleSvg}
      <path class="mtn-mid" d="${midPath}"/>
    </g>
    <g class="pines-wrap" data-for="forest swamp camp mountain">
      <path class="pines-far" d="${pinesFar}"/>
      <path class="pines" d="${pinesNear}"/>
    </g>
    <g data-for="ocean">
      <path class="sea-1" d="${seaWave(rnd, 600, 14, 70)}"/>
      <path class="sea-2" d="${seaWave(rnd, 700, 18, 90)}"/>
      <path class="sea-3" d="${seaWave(rnd, 800, 22, 110)}"/>
    </g>
  </svg>
  <div class="dungeon-layer">
    <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">${corridor({ stars, moonSvg, farPath, midPath, castleSvg, pinesFar, pinesNear })}</svg>
  </div>`;
}


const TYPES = {
  forest:   { n: 55,  color: [205, 235, 110], size: [1.4, 3.2], vx: [-8, 8],    vy: [-7, 7],    glow: 5, pulse: 1.2 },
  swamp:    { n: 26,  color: [110, 235, 175], size: [2.5, 5],   vx: [-6, 6],    vy: [-8, 4],    glow: 7, pulse: 0.7 },
  dungeon:  { n: 48,  color: [255, 145, 65],  size: [1, 2.4],   vx: [-6, 6],    vy: [-26, -8],  glow: 4, pulse: 2.5 },
  camp:     { n: 70,  color: [255, 155, 55],  size: [1.2, 3],   vx: [-14, 14],  vy: [-95, -35], glow: 4, pulse: 4, rise: true },
  mountain: { n: 130, color: [235, 245, 255], size: [1, 2.8],   vx: [-48, -18], vy: [22, 62],   glow: 0, pulse: 0 },
  ocean:    { n: 50,  color: [165, 235, 240], size: [1.5, 4],   vx: [-6, 6],    vy: [-26, -8],  glow: 3, pulse: 0.9, wobble: true },
};
const CRIMSON = [205, 28, 40];

export class Backdrop {
  constructor(canvas) {
    this.cv = canvas; this.ctx = canvas.getContext('2d');
    this.type = null; this.parts = []; this.fade = 0; this.danger = 0.2; this.last = 0; this.spriteKey = '';
    this.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    addEventListener('resize', () => this.resize());
    this.resize();
    requestAnimationFrame(t => this.frame(t));
  }

  resize() {
    const dpr = Math.min(2, devicePixelRatio || 1);
    this.w = innerWidth; this.h = innerHeight;
    this.cv.width = this.w * dpr; this.cv.height = this.h * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  setType(loc) {
    if (this.type === loc || !TYPES[loc]) return;
    this.type = loc; this.cfg = TYPES[loc]; this.fade = 0;
    const n = this.reduced ? Math.round(this.cfg.n / 3) : this.cfg.n;
    this.parts = Array.from({ length: n }, () => this.spawn(true));
    this.spriteKey = '';
  }

  setDanger(d) { this.danger = d; }

  rand(a, b) { return a + Math.random() * (b - a); }

  spawn(initial = false) {
    const c = this.cfg;
    const p = {
      x: Math.random() * this.w, y: Math.random() * this.h,
      vx: this.rand(...c.vx), vy: this.rand(...c.vy),
      r: this.rand(...c.size), ph: Math.random() * 6.28, life: 0, max: this.rand(2.5, 6),
    };
    if (c.rise) {
      p.x = this.w / 2 + this.rand(-this.w * 0.18, this.w * 0.18);
      if (!initial) p.y = this.h + 10; else p.life = Math.random() * p.max;
    } else if (!initial) {

      if (c.vy[0] > 0) p.y = -10; else if (c.vy[1] < 0) p.y = this.h + 10;
      if (c.vx[1] < -10) p.x = this.w + 10;
    }
    return p;
  }

  sprite() {
    const mix = Math.min(1, this.danger * 0.75);
    const grey = this.cfg.color.reduce((a, b) => a + b, 0) / 3;
    const c = this.cfg.color.map((v, i) => {
      const dull = v * 0.7 + grey * 0.3;
      return Math.round(dull + (CRIMSON[i] * 0.7 - dull) * mix * 0.6);
    });
    const key = c.join(',');
    if (key === this.spriteKey) return;
    this.spriteKey = key;
    const s = this.spr = document.createElement('canvas'); s.width = s.height = 64;
    const g = s.getContext('2d'), grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, `rgba(${key},1)`); grad.addColorStop(0.25, `rgba(${key},.55)`); grad.addColorStop(1, `rgba(${key},0)`);
    g.fillStyle = grad; g.fillRect(0, 0, 64, 64);
  }

  frame(t) {
    requestAnimationFrame(tt => this.frame(tt));
    const dt = Math.min(0.05, (t - this.last) / 1000 || 0); this.last = t;
    if (!this.cfg) return;
    const c = this.cfg, ctx = this.ctx, speed = this.reduced ? 0 : 1 + this.danger * 0.9;
    this.fade = Math.min(1, this.fade + dt / 1.4);
    this.sprite();
    ctx.clearRect(0, 0, this.w, this.h);
    ctx.globalCompositeOperation = 'lighter';
    for (const p of this.parts) {
      p.ph += dt * (c.pulse || 1); p.life += dt;
      p.x += (p.vx + (c.wobble ? Math.sin(p.ph * 2) * 10 : 0)) * dt * speed;
      p.y += p.vy * dt * speed;

      if (c.glow >= 5) { p.vx += (Math.random() - 0.5) * 14 * dt; p.vy += (Math.random() - 0.5) * 14 * dt; p.vx = Math.max(-14, Math.min(14, p.vx)); p.vy = Math.max(-12, Math.min(12, p.vy)); }
      let a = 1;
      if (c.rise) { if (p.life > p.max || p.y < -10) { Object.assign(p, this.spawn()); } a = 1 - p.life / p.max; }
      else if (p.x < -20 || p.x > this.w + 20 || p.y < -20 || p.y > this.h + 20) Object.assign(p, this.spawn());
      if (c.pulse) a *= c.glow >= 5 ? Math.max(0, Math.sin(p.ph)) ** 2 : 0.55 + 0.45 * Math.sin(p.ph * 2.3);
      else a *= 0.75;
      a *= this.fade;
      if (a <= 0.01) continue;
      ctx.globalAlpha = Math.min(1, a);
      if (c.glow) { const s = p.r * (c.glow + 2) * 2; ctx.drawImage(this.spr, p.x - s / 2, p.y - s / 2, s, s); }
      else { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fillStyle = `rgb(${this.spriteKey})`; ctx.fill(); }
    }
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  }
}

export function initBackdrop() {
  buildScene(document.getElementById('scene'));
  return new Backdrop(document.getElementById('fx'));
}
