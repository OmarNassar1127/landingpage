/**
 * Virelio agent HQ: the six agents at their stations on one round platform.
 * A client request lands on Nova, splits into five tasks, each agent does its
 * part (Scout scans, Pixel charts, Forge builds, Pulse monitors) and Bolt
 * launches it live. Framework-free; three is passed in. renderAt(t) draws time t.
 */
type Three = typeof import("three");
type Obj = InstanceType<Three["Object3D"]>;
type Mat = InstanceType<Three["Material"]>;
type Geo = ConstructorParameters<Three["Mesh"]>[0];

export type HQLabel = { x: number; y: number; alpha: number; done: boolean };
export type HQOptions = {
  language: "nl" | "en";
  onLabels?: (labels: HQLabel[]) => void;
  still?: boolean;
  dpr?: number;
};

export const HQ_AGENTS = [
  { name: "Scout", color: 0x3b82f6, nl: "analyseert", en: "analyses" },
  { name: "Pixel", color: 0x8b5cf6, nl: "rekent", en: "calculates" },
  { name: "Forge", color: 0xf59e0b, nl: "bouwt", en: "builds" },
  { name: "Pulse", color: 0x10b981, nl: "monitort", en: "monitors" },
  { name: "Bolt", color: 0xf43f5e, nl: "lanceert", en: "launches" },
  { name: "Nova", color: 0x4637d2, nl: "plant", en: "plans" },
];

export function createAgentHQ(THREE: Three, canvas: HTMLCanvasElement, opts: HQOptions) {
  const INDIGO = 0x4637d2;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: !!opts.still });
  renderer.setPixelRatio(Math.min(2, opts.dpr || window.devicePixelRatio || 1));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 80);

  (function env() {
    const s = new THREE.Scene();
    s.add(new THREE.Mesh(new THREE.SphereGeometry(30, 32, 16), new THREE.MeshBasicMaterial({ color: 0xc4c4cc, side: THREE.BackSide })));
    const panel = (w: number, h: number, c: number, x: number, y: number, z: number) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide }));
      m.position.set(x, y, z); m.lookAt(0, 0, 0); s.add(m);
    };
    panel(16, 10, 0xffffff, -6, 10, 10); panel(10, 8, 0xeef0ff, 12, 4, 6); panel(6, 14, 0xd9d5ff, 0, 4, -14);
    scene.environment = new THREE.PMREMGenerator(renderer).fromScene(s, 0.04).texture;
  })();
  scene.add(new THREE.HemisphereLight(0xffffff, 0xd5d7e2, 0.8));
  const key = new THREE.DirectionalLight(0xffffff, 2.0);
  key.position.set(-4, 9, 6); key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024); key.shadow.radius = 6; key.shadow.bias = -0.0005;
  Object.assign(key.shadow.camera, { left: -5, right: 5, top: 5, bottom: -5, near: 1, far: 30 });
  scene.add(key);

  const M = (color: number, o: Record<string, unknown> = {}) => new THREE.MeshPhysicalMaterial({ color, roughness: 0.45, ...o });
  const white = M(0xf7f7fa, { clearcoat: 0.5, clearcoatRoughness: 0.2 });
  const ink = M(0x17171c, { roughness: 0.35, clearcoat: 0.6 });
  const put = (geo: Geo, m: Mat, parent: Obj, x = 0, y = 0, z = 0) => {
    const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; parent.add(o); return o;
  };
  const canvasTex = (w: number, h: number, draw: (g: CanvasRenderingContext2D) => void) => {
    const c = document.createElement("canvas"); c.width = w; c.height = h;
    const g = c.getContext("2d")!; draw(g);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
  };
  const hex = (n: number) => "#" + n.toString(16).padStart(6, "0");

  // platform
  put(new THREE.CylinderGeometry(3.0, 3.1, 0.18, 96), white, scene, 0, -0.09, 0);
  const rim = put(new THREE.TorusGeometry(3.02, 0.03, 8, 128), new THREE.MeshBasicMaterial({ color: INDIGO }), scene, 0, 0.0, 0);
  rim.rotation.x = Math.PI / 2;
  const grid = new THREE.Mesh(new THREE.CircleGeometry(2.96, 96), new THREE.MeshBasicMaterial({
    transparent: true, depthWrite: false,
    map: canvasTex(1024, 1024, (g) => {
      g.strokeStyle = "rgba(70,55,210,0.10)"; g.lineWidth = 2;
      for (let i = 0; i <= 1024; i += 64) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, 1024); g.stroke(); g.beginPath(); g.moveTo(0, i); g.lineTo(1024, i); g.stroke(); }
    }),
  }));
  grid.rotation.x = -Math.PI / 2; grid.position.y = 0.002; scene.add(grid);

  // bots
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  function bot(color: number, scale: number) {
    const g = new THREE.Group(); g.scale.setScalar(scale);
    const body = M(color, { roughness: 0.3, clearcoat: 0.9, clearcoatRoughness: 0.1 });
    put(new THREE.CapsuleGeometry(0.2, 0.18, 10, 32), body, g, 0, 0.29, 0);
    const face = put(new THREE.SphereGeometry(0.16, 32, 16), ink, g, 0, 0.34, 0.11); face.scale.set(1, 0.66, 0.6);
    const eyes = [-1, 1].map((s) => { const e = put(new THREE.SphereGeometry(0.03, 12, 8), eyeMat, g, s * 0.06, 0.35, 0.205); e.scale.set(1, 1.3, 0.5); e.castShadow = false; return e; });
    put(new THREE.CylinderGeometry(0.013, 0.013, 0.14, 8), ink, g, 0, 0.66, 0);
    put(new THREE.SphereGeometry(0.04, 12, 8), new THREE.MeshBasicMaterial({ color }), g, 0, 0.75, 0);
    for (const s of [-1, 1]) { const arm = put(new THREE.CapsuleGeometry(0.045, 0.14, 6, 12), body, g, s * 0.24, 0.27, 0.02); arm.rotation.z = s * 0.35; }
    scene.add(g);
    return { g, eyes };
  }

  const ST = [
    { pos: new THREE.Vector3(-2.25, 0, -1.0) }, // Scout
    { pos: new THREE.Vector3(1.65, 0, -1.45) },  // Pixel
    { pos: new THREE.Vector3(-1.6, 0, 1.45) },   // Forge
    { pos: new THREE.Vector3(1.95, 0, 1.15) },   // Pulse
    { pos: new THREE.Vector3(-0.7, 0, -2.25) },  // Bolt
  ];
  const NOVA = new THREE.Vector3(0, 0.22, 0.35);
  const bots = HQ_AGENTS.map((a, i) => bot(a.color, i === 5 ? 1.6 : 1.3));
  bots.forEach((b, i) => b.g.position.copy(i === 5 ? NOVA : ST[i].pos));
  // Nova's podium and halo
  put(new THREE.CylinderGeometry(0.5, 0.56, 0.22, 48), white, scene, NOVA.x, 0.11, NOVA.z);
  const halo = put(new THREE.TorusGeometry(0.2, 0.018, 8, 48), new THREE.MeshBasicMaterial({ color: 0xa5a0ff }), bots[5].g, 0, 0.9, 0);
  halo.rotation.x = Math.PI / 2;

  // Scout: desk, papers, magnifier and scan beam
  const scout = new THREE.Group(); scout.position.copy(ST[0].pos).add(new THREE.Vector3(0.5, 0, 0.15)); scene.add(scout);
  put(new THREE.BoxGeometry(0.62, 0.3, 0.42), white, scout, 0, 0.15, 0);
  for (let i = 0; i < 4; i++) { const p = put(new THREE.BoxGeometry(0.34, 0.012, 0.24), M(0xffffff), scout, 0.02 * i, 0.31 + i * 0.014, 0); p.rotation.y = i * 0.12; }
  const glass = new THREE.Group(); scout.add(glass);
  put(new THREE.TorusGeometry(0.1, 0.018, 8, 32), ink, glass, 0, 0, 0).rotation.x = Math.PI / 2;
  put(new THREE.CylinderGeometry(0.014, 0.014, 0.16, 8), ink, glass, 0.15, 0, 0).rotation.z = Math.PI / 2;
  const beamMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0, depthWrite: false });
  const beam = put(new THREE.ConeGeometry(0.13, 0.32, 24, 1, true), beamMat, glass, 0, -0.17, 0); beam.castShadow = false;

  // Pixel: hologram bar chart
  const pixel = new THREE.Group(); pixel.position.copy(ST[1].pos).add(new THREE.Vector3(-0.55, 0, 0.15)); scene.add(pixel);
  put(new THREE.CylinderGeometry(0.32, 0.36, 0.06, 40), ink, pixel, 0, 0.03, 0);
  const barMat = new THREE.MeshPhysicalMaterial({ color: 0x8b5cf6, emissive: 0x8b5cf6, emissiveIntensity: 0.25, roughness: 0.3, clearcoat: 0.8 });
  const BARS = [0.3, 0.5, 0.42, 0.72];
  const bars = BARS.map((_, j) => put(new THREE.BoxGeometry(0.09, 1, 0.09), barMat, pixel, -0.18 + j * 0.12, 0.06, 0));

  // Forge: anvil, hammer, a chat bubble assembled cube by cube, sparks
  const forge = new THREE.Group(); forge.position.copy(ST[2].pos).add(new THREE.Vector3(0.55, 0, -0.05)); scene.add(forge);
  put(new THREE.BoxGeometry(0.42, 0.16, 0.24), ink, forge, 0, 0.08, 0);
  put(new THREE.BoxGeometry(0.5, 0.06, 0.28), ink, forge, 0, 0.19, 0);
  const cubeMat = M(0xfbbf24, { roughness: 0.3, clearcoat: 0.8 });
  const CUBES = [[-0.1, 0, 0], [0, 0, 0], [0.1, 0, 0], [-0.1, 0.1, 0], [0, 0.1, 0], [0.1, 0.1, 0], [-0.1, -0.08, 0]];
  const cubes = CUBES.map((c) => { const m = put(new THREE.BoxGeometry(0.095, 0.095, 0.095), cubeMat, forge, c[0], 0.3 + c[1], c[2]); return { m, home: new THREE.Vector3(c[0], 0.3 + c[1], c[2]) }; });
  const hammer = new THREE.Group(); hammer.position.set(-0.3, 0.45, 0.05); bots[2].g.add(hammer);
  put(new THREE.CylinderGeometry(0.015, 0.015, 0.22, 8), ink, hammer, 0, 0.1, 0);
  put(new THREE.BoxGeometry(0.12, 0.06, 0.06), ink, hammer, 0, 0.22, 0);
  const sparkMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
  const sparks = Array.from({ length: 10 }, () => { const m = new THREE.Mesh(new THREE.SphereGeometry(0.018, 6, 4), sparkMat); forge.add(m); return m; });

  // Pulse: a monitor with a live heartbeat line
  const pulse = new THREE.Group(); pulse.position.copy(ST[3].pos).add(new THREE.Vector3(-0.55, 0, -0.1)); pulse.rotation.y = -0.5; scene.add(pulse);
  put(new THREE.CylinderGeometry(0.02, 0.02, 0.32, 8), ink, pulse, 0, 0.16, 0);
  put(new THREE.BoxGeometry(0.62, 0.42, 0.04), ink, pulse, 0, 0.5, 0);
  const ecgCanvas = document.createElement("canvas"); ecgCanvas.width = 256; ecgCanvas.height = 160;
  const ecg = ecgCanvas.getContext("2d")!;
  const ecgTex = new THREE.CanvasTexture(ecgCanvas); ecgTex.colorSpace = THREE.SRGBColorSpace;
  put(new THREE.PlaneGeometry(0.56, 0.36), new THREE.MeshBasicMaterial({ map: ecgTex, toneMapped: false }), pulse, 0, 0.5, 0.021).castShadow = false;
  const drawEcg = (T: number, ok: number) => {
    ecg.fillStyle = "#0b1410"; ecg.fillRect(0, 0, 256, 160);
    ecg.strokeStyle = ok > 0.5 ? "#34d399" : "#10b981"; ecg.lineWidth = 5; ecg.lineJoin = "round"; ecg.beginPath();
    for (let x = 0; x <= 256; x += 4) {
      const ph = ((x / 256) * 2.2 + T * 1.2) % 1;
      const spike = ph > 0.42 && ph < 0.5 ? Math.sin(((ph - 0.42) / 0.08) * Math.PI * 2) * 52 : 0;
      const y = 92 - spike - Math.sin(ph * Math.PI * 2) * 4;
      if (x === 0) ecg.moveTo(x, y); else ecg.lineTo(x, y);
    }
    ecg.stroke();
    ecg.fillStyle = "#34d399"; ecg.font = "600 22px ui-monospace, Menlo, monospace"; ecg.fillText(ok > 0.5 ? "OK  99.9%" : "...", 14, 30);
    ecgTex.needsUpdate = true;
  };

  // Bolt: launch pad and rocket
  const pad = new THREE.Group(); pad.position.copy(ST[4].pos).add(new THREE.Vector3(0.62, 0, 0.1)); scene.add(pad);
  put(new THREE.CylinderGeometry(0.3, 0.34, 0.08, 40), ink, pad, 0, 0.04, 0);
  const rocket = new THREE.Group(); pad.add(rocket);
  put(new THREE.CylinderGeometry(0.09, 0.1, 0.42, 24), white, rocket, 0, 0.29, 0);
  put(new THREE.ConeGeometry(0.09, 0.18, 24), M(0xf43f5e, { clearcoat: 0.8 }), rocket, 0, 0.59, 0);
  for (let i = 0; i < 3; i++) { const f = put(new THREE.BoxGeometry(0.02, 0.12, 0.1), M(0xf43f5e), rocket, Math.cos((i / 3) * 6.283) * 0.1, 0.13, Math.sin((i / 3) * 6.283) * 0.1); f.rotation.y = -(i / 3) * 6.283; }
  const trailMat = new THREE.MeshBasicMaterial({ color: 0xe5e7eb, transparent: true, opacity: 0.8, depthWrite: false });
  const trail = Array.from({ length: 12 }, () => { const m = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 8), trailMat.clone()); pad.add(m); return m; });
  const flameMat = new THREE.MeshBasicMaterial({ color: 0xfb923c });
  const flame = put(new THREE.ConeGeometry(0.07, 0.22, 16), flameMat, rocket, 0, -0.02, 0); flame.rotation.x = Math.PI; flame.castShadow = false;
  const liveTex = canvasTex(256, 96, (g) => {
    g.fillStyle = "#16a34a"; g.beginPath(); g.roundRect(4, 4, 248, 88, 44); g.fill();
    g.fillStyle = "#ffffff"; g.beginPath(); g.arc(50, 48, 12, 0, 6.283); g.fill();
    g.font = "800 46px system-ui, sans-serif"; g.fillText("LIVE", 80, 64);
  });
  const live = new THREE.Sprite(new THREE.SpriteMaterial({ map: liveTex, depthTest: false })); live.scale.set(0.8, 0.3, 1); live.renderOrder = 10; scene.add(live);

  // cards: the client request, then one task per agent
  const isNL = opts.language === "nl";
  const reqTex = canvasTex(640, 300, (g) => {
    g.fillStyle = "#ffffff"; g.beginPath(); g.roundRect(4, 4, 632, 292, 36); g.fill();
    g.strokeStyle = "rgba(23,23,28,0.10)"; g.lineWidth = 4; g.stroke();
    g.fillStyle = hex(INDIGO); g.beginPath(); g.roundRect(28, 32, 12, 236, 6); g.fill();
    g.fillStyle = "#6b7280"; g.font = "600 30px system-ui, sans-serif"; g.fillText(isNL ? "NIEUWE AANVRAAG" : "NEW REQUEST", 66, 82);
    g.fillStyle = "#17171c"; g.font = "700 44px system-ui, sans-serif";
    g.fillText(isNL ? "Klantenservice" : "Automate customer", 66, 150); g.fillText(isNL ? "automatiseren" : "support", 66, 206);
    g.fillStyle = hex(INDIGO); g.font = "600 30px system-ui, sans-serif"; g.fillText("E-commerce", 66, 256);
  });
  const request = new THREE.Sprite(new THREE.SpriteMaterial({ map: reqTex, depthTest: false })); request.scale.set(1.25, 0.59, 1); request.renderOrder = 9; scene.add(request);
  const taskTex = (color: number, done: boolean) => canvasTex(256, 128, (g) => {
    g.fillStyle = done ? "#16a34a" : "#ffffff"; g.beginPath(); g.roundRect(4, 4, 248, 120, 28); g.fill();
    if (!done) { g.fillStyle = hex(color); g.beginPath(); g.roundRect(20, 24, 10, 80, 5); g.fill(); for (const [y, w] of [[44, 170], [72, 130], [96, 150]]) { g.fillStyle = "#e5e7eb"; g.beginPath(); g.roundRect(46, y - 8, w, 12, 6); g.fill(); } }
    else { g.strokeStyle = "#ffffff"; g.lineWidth = 16; g.lineCap = "round"; g.lineJoin = "round"; g.beginPath(); g.moveTo(92, 66); g.lineTo(118, 92); g.lineTo(166, 38); g.stroke(); }
  });
  const tasks = ST.map((_, i) => {
    const todo = taskTex(HQ_AGENTS[i].color, false), done = taskTex(HQ_AGENTS[i].color, true);
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: todo, depthTest: false })); s.renderOrder = 9; scene.add(s);
    return { s, todo, done };
  });

  // timeline (seconds in a 10 s loop)
  const CYCLE = 10, ARRIVE = [0.25, 1.0], SPLIT = [1.55, 2.35], LAUNCH = 6.5, RESET = [8.8, 9.6];
  const WORK = [[2.4, 4.6], [2.6, 4.9], [2.8, 5.3], [3.0, 5.6], [5.6, 6.4]];
  const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
  const eio = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
  const eob = (k: number) => { const c = 1.7; return 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2); };
  const v = new THREE.Vector3(), above = new THREE.Vector3();
  const ptr = { x: 0, y: 0, sx: 0, sy: 0 };
  let W = 1, H = 1, lastDone: boolean[] = [];

  function size(w: number, h: number) { W = w; H = h; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }

  function renderAt(T: number) {
    const t = ((T % CYCLE) + CYCLE) % CYCLE;
    ptr.sx += (ptr.x - ptr.sx) * 0.08; ptr.sy += (ptr.y - ptr.sy) * 0.08;
    const az = ptr.sx * 0.18 + Math.sin((T / CYCLE) * Math.PI * 2) * 0.05;
    const dist = camera.aspect < 0.9 ? 11.6 : 9.9;
    camera.position.set(Math.sin(az) * dist, 6.6 + ptr.sy * 0.6, Math.cos(az) * dist);
    camera.lookAt(0, 0.35, 0.2);
    const fade = 1 - seg(t, RESET[0], RESET[1]);
    const cheer = Math.sin(Math.PI * seg(t, LAUNCH + 0.25, LAUNCH + 0.8));

    // request card drops onto Nova, then splits
    const ka = eob(seg(t, ARRIVE[0], ARRIVE[1])), ks = eio(seg(t, SPLIT[0], SPLIT[1]));
    request.position.set(-2.4 + 2.4 * ka, 4.2 - 2.15 * ka + Math.sin(T * 2) * 0.03, 0.4 + NOVA.z * ka);
    request.material.opacity = Math.min(1, seg(t, ARRIVE[0], ARRIVE[0] + 0.2) * 1.0) * (1 - ks);
    request.scale.set(1.25 * (1 - ks * 0.6), 0.59 * (1 - ks * 0.6), 1);
    request.visible = t < SPLIT[1];

    const done: boolean[] = [];
    tasks.forEach((tk, i) => {
      const [w0, w1] = WORK[i];
      const fly = eob(seg(t, SPLIT[0] + i * 0.06, SPLIT[1] + i * 0.06));
      above.copy(ST[i].pos).setY(1.3);
      v.set(NOVA.x, 1.6, NOVA.z).lerp(above, fly);
      v.y += Math.sin(Math.PI * fly) * 0.6 + Math.sin(T * 2.4 + i) * 0.025;
      const isDone = t > w1;
      done.push(isDone && t < RESET[1]);
      tk.s.material.map = isDone ? tk.done : tk.todo;
      const pop = isDone ? 1 + Math.sin(Math.PI * seg(t, w1, w1 + 0.3)) * 0.35 : 1;
      tk.s.position.copy(v);
      tk.s.scale.set(0.5 * pop, 0.25 * pop, 1);
      tk.s.material.opacity = seg(t, SPLIT[0], SPLIT[0] + 0.15) * fade;
      tk.s.visible = t > SPLIT[0];
    });

    // Scout: magnifier sweeps the papers, beam on while working
    const wS = t > WORK[0][0] && t < WORK[0][1] ? 1 : 0;
    glass.position.set(Math.sin(T * 3) * 0.12 * (wS || 0.3), 0.55 + Math.sin(T * 6) * 0.015, Math.cos(T * 2.3) * 0.06);
    beamMat.opacity = wS * (0.28 + Math.sin(T * 14) * 0.05);
    // Pixel: bars grow while working, hold, shrink on reset
    bars.forEach((b, j) => {
      const h = 0.04 + BARS[j] * eob(seg(t, WORK[1][0] + j * 0.25, WORK[1][0] + 0.6 + j * 0.25)) * fade;
      b.scale.y = Math.max(0.01, h); b.position.y = 0.06 + h / 2;
    });
    barMat.emissiveIntensity = 0.5 + 0.3 * Math.sin(T * 3);
    // Forge: hammer strikes, cubes land one by one, sparks fly on each strike
    const wF = t > WORK[2][0] && t < WORK[2][1];
    const strike = wF ? Math.pow(Math.abs(Math.sin(T * 7)), 6) : 0;
    hammer.rotation.z = wF ? -0.2 - (1 - Math.abs(Math.sin(T * 7))) * 1.1 : -0.2;
    cubes.forEach((c, j) => {
      const k = eob(seg(t, WORK[2][0] + 0.2 + j * 0.28, WORK[2][0] + 0.45 + j * 0.28));
      c.m.position.copy(c.home).add(new THREE.Vector3(0, (1 - k) * 0.9, 0));
      c.m.scale.setScalar(Math.max(0.001, Math.min(1, k * 1.2)) * (t > RESET[0] ? fade : 1));
      c.m.visible = k > 0.001;
    });
    sparks.forEach((s, j) => {
      const a = (j / sparks.length) * 6.283 + T;
      const r = strike * 0.35 * ((j % 3) + 1) / 3;
      s.position.set(Math.cos(a) * r, 0.32 + strike * 0.2 * ((j * 7) % 5) / 5, Math.sin(a) * r * 0.5);
      s.visible = strike > 0.15;
    });
    // Pulse: heartbeat, then OK
    drawEcg(T, t > WORK[3][1] && t < RESET[1] ? 1 : 0);
    // Bolt: rocket launches, LIVE badge, everyone cheers
    const up = seg(t, LAUNCH, LAUNCH + 1.6);
    rocket.position.y = up * up * 4.5;
    rocket.visible = t < LAUNCH + 1.6 || t > RESET[1];
    if (t > RESET[1]) rocket.scale.setScalar(eob(seg(t, RESET[1], CYCLE)));
    else rocket.scale.setScalar(1);
    flame.visible = t > LAUNCH - 0.3 && t < LAUNCH + 1.6;
    flame.scale.set(1, 0.8 + Math.abs(Math.sin(T * 30)) * 0.6, 1);
    trail.forEach((m, j) => {
      const k = seg(t, LAUNCH + j * 0.07, LAUNCH + 1.5 + j * 0.07);
      m.position.set(Math.sin(j * 2.1) * 0.05, rocket.position.y * (1 - j / trail.length) * k, Math.cos(j * 1.7) * 0.05);
      m.scale.setScalar(0.5 + k * 1.6);
      (m.material as InstanceType<Three["MeshBasicMaterial"]>).opacity = 0.7 * Math.sin(Math.PI * k);
      m.visible = k > 0 && k < 1;
    });
    const lk = eob(seg(t, LAUNCH + 0.3, LAUNCH + 0.8)) * fade;
    live.position.set(pad.position.x, 1.45 + Math.sin(T * 2) * 0.03, pad.position.z);
    live.scale.set(0.8 * lk, 0.3 * lk, 1);
    live.visible = lk > 0.01;

    // bots: idle bob, work wiggle, cheer hop, look at the camera
    bots.forEach((b, i) => {
      const base = i === 5 ? NOVA : ST[i].pos;
      const working = i < 5 && t > WORK[i][0] && t < WORK[i][1];
      const reading = i === 5 && t > ARRIVE[1] && t < SPLIT[1];
      b.g.position.set(base.x, base.y + Math.abs(Math.sin(T * (working ? 9 : 2) + i)) * (working ? 0.05 : 0.025) + cheer * 0.35 + (reading ? Math.sin(T * 8) * 0.02 : 0), base.z);
      const toward = i < 5 ? [scout, pixel, forge, pulse, pad][i].position : camera.position;
      const look = working ? toward : camera.position;
      b.g.rotation.y = Math.atan2(look.x - b.g.position.x, look.z - b.g.position.z) * (working ? 1 : 0.85);
      const blink = ((T + i * 0.6) % 3.3) < 0.09;
      b.eyes.forEach((e) => (e.scale.y = blink ? 0.2 : 1.3));
    });
    halo.rotation.z = T * 1.5;

    // name tags under each bot
    const labels: HQLabel[] = bots.map((b, i) => {
      const p = b.g.position.clone().add(new THREE.Vector3(0, -0.12, 0.25)).project(camera);
      return { x: (p.x * 0.5 + 0.5) * W, y: (-p.y * 0.5 + 0.5) * H, alpha: 1, done: i < 5 ? done[i] : t > LAUNCH + 0.3 && t < RESET[1] };
    });
    lastDone = done;
    opts.onLabels?.(labels);
    renderer.render(scene, camera);
  }

  return {
    size, renderAt,
    pointer(x: number, y: number) { ptr.x = clamp(x, -1, 1); ptr.y = clamp(y, -1, 1); },
    done: () => lastDone,
    dispose() { renderer.dispose(); },
  };
}
