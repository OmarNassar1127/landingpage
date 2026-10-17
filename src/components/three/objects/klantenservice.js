// Klantenservice-agent: mail, chat and WhatsApp messages stream into a glowing agent core and come
// out as answered tiles; one tile turns amber and slides to a colleague.
import * as THREE from "three";
import { HEX, INDIGO, AMBER, CSS, rrect, extrude, rbox, put, group, memo, G, seg, range, lerp, clamp, bump, backOut, tick, canvasTexture, faceMat, tintable, linesTexture } from "../kit.js";
import { BEATS } from "../beats.js";

const [B1, B2, B3] = BEATS;
const CY = -0.3; // core centre height; the frame's bottom rests on the floor
const FLOOR = -1.2;

function ring(o, i, ro, ri) {
  const s = rrect(new THREE.Shape(), o, o, ro);
  s.holes.push(rrect(new THREE.Path(), i, i, ri));
  return s;
}

const dotsTexture = (color) =>
  canvasTexture(256, 160, (g) => {
    g.fillStyle = color;
    [78, 128, 178].forEach((x) => {
      g.beginPath();
      g.arc(x, 80, 15, 0, Math.PI * 2);
      g.fill();
    });
  });

const phoneTexture = () =>
  canvasTexture(256, 256, (g) => {
    // a handset: a thick rounded arc with two caps
    g.translate(128, 128);
    g.rotate(Math.PI * 0.75);
    g.strokeStyle = CSS.indigo;
    g.lineCap = "round";
    g.lineWidth = 30;
    g.beginPath();
    g.arc(0, 0, 62, -0.95, 0.95);
    g.stroke();
    g.fillStyle = CSS.indigo;
    for (const a of [-0.95, 0.95]) {
      g.beginPath();
      g.ellipse(Math.cos(a) * 62, Math.sin(a) * 62, 30, 20, a, 0, Math.PI * 2);
      g.fill();
    }
  });

const answeredTexture = () =>
  canvasTexture(512, 240, (g) => {
    g.fillStyle = CSS.indigo;
    g.beginPath();
    g.arc(92, 120, 54, 0, Math.PI * 2);
    g.fill();
    tick(g, 66, 122, 52, "#ffffff", 14);
    g.fillStyle = CSS.line;
    g.fillRect(180, 82, 280, 22);
    g.fillRect(180, 136, 200, 22);
  });

const handoffTexture = () =>
  canvasTexture(512, 240, (g) => {
    g.fillStyle = "#ffffff";
    g.beginPath();
    g.arc(92, 96, 26, 0, Math.PI * 2);
    g.fill();
    g.beginPath();
    g.ellipse(92, 168, 44, 30, 0, Math.PI, 0);
    g.fill();
    g.fillStyle = "rgba(255,255,255,0.75)";
    g.fillRect(180, 82, 280, 22);
    g.fillRect(180, 136, 200, 22);
  });

function makeEnvelope(M) {
  const g = new THREE.Group();
  put(g, rbox(0.66, 0.44, 0.1, 0.05), M.paper);
  const flap = new THREE.Shape();
  flap.moveTo(-0.3, 0.2);
  flap.lineTo(0.3, 0.2);
  flap.lineTo(0, -0.04);
  flap.closePath();
  put(g, memo("ks:flap", () => extrude(flap, 0.03, 0.01, 6)), M.warm, 0, 0, 0.055);
  put(g, G(THREE.CylinderGeometry, 0.06, 0.06, 0.03, 24), M.indigo, 0, -0.02, 0.08).rotation.x = Math.PI / 2;
  return g;
}

function makeChat(M, dots) {
  const g = new THREE.Group();
  put(g, rbox(0.66, 0.44, 0.18, 0.16, 5), M.indigo);
  const tail = put(g, G(THREE.ConeGeometry, 0.1, 0.24, 20), M.indigo, 0.2, -0.27, 0);
  tail.rotation.z = Math.PI - 0.5;
  put(g, G(THREE.PlaneGeometry, 0.42, 0.26), dots, 0, 0, 0.092);
  return g;
}

function makeRound(M, phone) {
  const g = new THREE.Group();
  const disc = put(g, G(THREE.CylinderGeometry, 0.27, 0.27, 0.16, 40), M.ceramic);
  disc.rotation.x = Math.PI / 2;
  const tail = put(g, G(THREE.ConeGeometry, 0.09, 0.2, 20), M.ceramic, -0.2, -0.22, 0);
  tail.rotation.z = Math.PI + 0.7;
  put(g, G(THREE.CircleGeometry, 0.2, 32), phone, 0, 0, 0.082);
  return g;
}

export async function build({ M }) {
  const root = new THREE.Group();
  const spin = group(root, -0.05, 0, 0);

  // ------------------------------------------------ the agent core: a thick ring with a lit lip and an orb
  const core = group(spin, 0, CY, 0);
  put(core, memo("ks:frame", () => extrude(ring(1.8, 1.12, 0.5, 0.26), 0.56, 0.13, 18)), M.ceramic);
  const lip = new THREE.MeshBasicMaterial({ color: HEX.indigoSoft, toneMapped: false });
  put(core, memo("ks:lip", () => extrude(ring(1.3, 1.13, 0.34, 0.27), 0.05, 0.012, 18)), lip, 0, 0, 0.27);
  const orbMat = new THREE.MeshBasicMaterial({ color: HEX.indigo, toneMapped: false });
  const orb = put(core, G(THREE.SphereGeometry, 0.26, 40, 24), orbMat);
  const halo = put(
    core,
    G(THREE.SphereGeometry, 0.5, 32, 16),
    new THREE.MeshBasicMaterial({ color: HEX.indigo, transparent: true, opacity: 0.16, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false }),
  );
  // two feet keep it standing on the floor
  for (const x of [-0.5, 0.5]) put(core, rbox(0.34, 0.08, 0.4, 0.035), M.warm, x, -0.9, 0);

  // ------------------------------------------------ the FAQ cards it learns from
  const lines = faceMat(linesTexture({ w: 256, h: 320, rows: [0.8, 0.6, 0.72, 0.5, 0.66], head: CSS.indigo, pad: 34, thick: 16 }));
  const cards = [-1, 0, 1].map((k) => {
    const c = group(spin);
    put(c, rbox(0.5, 0.64, 0.03, 0.03), M.paper);
    put(c, G(THREE.PlaneGeometry, 0.46, 0.6), lines, 0, 0, 0.017);
    return { g: c, k };
  });

  // ------------------------------------------------ incoming messages: mail, chat, WhatsApp
  const dots = faceMat(dotsTexture("#ffffff"));
  const phone = faceMat(phoneTexture());
  const makers = [() => makeEnvelope(M), () => makeChat(M, dots), () => makeRound(M, phone)];
  const tokens = [0, 1, 2, 3].map((i) => {
    const g = group(spin);
    g.add(makers[i % 3]());
    g.children[0].scale.setScalar(1.25);
    return g;
  });
  const inPath = new THREE.CatmullRomCurve3(
    [[-2.25, 1.15, 0.55], [-1.8, 0.62, 0.7], [-1.45, 0.12, 0.6], [-0.8, -0.16, 0.36], [0, CY, 0.05]].map((v) => new THREE.Vector3(...v)),
  );

  // ------------------------------------------------ answered tiles, and the one that goes to a colleague
  const answered = faceMat(answeredTexture());
  const handoffTex = handoffTexture();
  const tiles = [0, 1, 2, 3].map((i) => {
    const g = group(spin);
    const mat = tintable(HEX.ceramic);
    put(g, rbox(1.0, 0.46, 0.12, 0.09), mat);
    const face = put(g, G(THREE.PlaneGeometry, 0.92, 0.42), i === 3 ? faceMat(answeredTexture()) : answered, 0, 0, 0.062);
    const hand = i === 3 ? put(g, G(THREE.PlaneGeometry, 0.92, 0.42), faceMat(handoffTex, { opacity: 0 }), 0, 0, 0.063) : null;
    return { g, mat, face, hand };
  });
  const COLUMN = (k) => new THREE.Vector3(1.48, 1.2 - k * 0.56, 0.1);

  // ------------------------------------------------ the colleague: a figure on a dock
  const dock = group(spin, 1.3, FLOOR, 1.35);
  put(dock, G(THREE.CylinderGeometry, 0.56, 0.6, 0.12, 48), M.warm, 0, 0.06, 0);
  const person = group(dock, 0.12, 0.12, -0.18);
  const body = put(person, G(THREE.CapsuleGeometry, 0.22, 0.26, 8, 24), M.ceramic, 0, 0.36, 0);
  body.scale.set(1, 1, 0.8);
  put(person, G(THREE.SphereGeometry, 0.17, 32, 20), M.ceramic, 0, 0.86, 0);
  const badge = put(person, G(THREE.SphereGeometry, 0.05, 16, 12), M.amber, 0.12, 0.5, 0.17);

  const tmp = new THREE.Vector3();
  const out = new THREE.Vector3();
  const amber = new THREE.Color();
  const base = new THREE.Color(HEX.ceramic);

  function apply(p, time) {
    const f = (i, a) => Math.sin(time * 1.2 + i * 1.9) * a;
    spin.rotation.set(0, -0.2 + p * 0.16 + f(0, 0.02), 0);

    // B1: the cards drop into the core, one after another
    let learned = 0;
    cards.forEach((c, i) => {
      const k = seg(p, B1[0] + i * 0.06, B1[0] + 0.12 + i * 0.06);
      learned += k;
      c.g.visible = k < 0.995;
      c.g.position.set(lerp(c.k * 0.62, 0, k), lerp(1.55 + Math.abs(c.k) * -0.1, CY + 0.2, k) + f(i + 1, 0.04) * (1 - k), lerp(0.1 - Math.abs(c.k) * 0.1, 0, k));
      c.g.rotation.set(lerp(-0.2, 0, k), lerp(c.k * 0.35, 0, k), lerp(-c.k * 0.22, 0, k));
      c.g.scale.setScalar(1 - 0.85 * range(k, 0.7, 1));
    });
    learned /= 3;

    // B2 + B3: messages flow in; flow counts tokens through the core
    const flow = lerp(0, 0.3, seg(p, 0, B1[1])) + 3.1 * range(p, B2[0], B2[1] - 0.02) + 1.0 * seg(p, B3[0] + 0.02, B3[0] + 0.14);
    let pulse = 0;
    tokens.forEach((t, i) => {
      const u = 0.75 - 0.2 * i + 0.2 * flow;
      const s = range(u, 0.16, 0.34) * (1 - range(u, 0.82, 1)); // grow in inside the frame, never cut by its edge
      t.visible = s > 0.01;
      if (!t.visible) return;
      inPath.getPoint(clamp(u, 0, 1), tmp);
      t.position.copy(tmp);
      t.position.y += f(i + 3, 0.05) * (1 - u);
      t.scale.setScalar(s);
      t.rotation.set(0.06 * Math.sin(i * 2.1), 0.5 * (1 - u) + f(i, 0.06), f(i + 2, 0.05));
      pulse = Math.max(pulse, bump(range(u, 0.9, 1.08)));
    });

    // the core brightens as it learns, and pulses as each message passes
    lip.color.setHex(HEX.indigoSoft).lerp(INDIGO, learned);
    orb.scale.setScalar(0.7 + 0.3 * learned + 0.25 * pulse);
    halo.scale.setScalar(0.8 + 0.4 * learned + 0.5 * pulse);
    halo.material.opacity = 0.08 + 0.12 * learned + 0.12 * pulse;

    tiles.forEach((tile, k) => {
      const born = 1.25 + k; // flow at which message k reaches the core
      const o = clamp((flow - born) / 0.75);
      tile.g.visible = o > 0.001;
      if (!tile.g.visible) return;
      const e = backOut(o);
      if (k < 3) {
        // answered: out of the core, into a neat column on the right
        out.copy(COLUMN(k));
        tile.g.position.set(lerp(0.2, out.x, e), lerp(CY, out.y, o) + f(k + 5, 0.03) * o, lerp(0.35, out.z, o));
        tile.g.rotation.set(0, lerp(0.6, -0.12, o), lerp(0.3, 0, o));
        tile.g.scale.setScalar(lerp(0.35, 1, Math.min(1, e)));
      } else {
        // the one it is not sure about turns amber and slides to the colleague
        const h = seg(p, B3[0] + 0.12, B3[1] - 0.08);
        const a = range(p, B3[0] + 0.1, B3[0] + 0.2);
        const mid = new THREE.Vector3(0.95, 0.15, 0.8);
        const land = new THREE.Vector3(1.05, FLOOR + 0.45, 1.85);
        if (h <= 0) {
          tile.g.position.set(lerp(0.2, mid.x, e), lerp(CY, mid.y, o), lerp(0.35, mid.z, o));
        } else {
          tile.g.position.lerpVectors(mid, land, h);
          tile.g.position.y += bump(h) * 0.25;
        }
        tile.g.rotation.set(lerp(0, -0.35, h), lerp(0.6, -0.25, o) + lerp(0, -0.2, h), lerp(0.3, 0, o));
        tile.g.scale.setScalar(lerp(0.35, 1, Math.min(1, e)) * lerp(1, 0.86, h));
        tile.mat.color.copy(base).lerp(AMBER, a);
        tile.face.material.opacity = 1 - a;
        tile.hand.material.opacity = a;
        badge.scale.setScalar(1 + 0.6 * bump(range(p, B3[1] - 0.14, B3[1] - 0.04)));
      }
    });
    person.rotation.y = lerp(0.3, -0.25, seg(p, B3[0] + 0.1, B3[1] - 0.1));
  }

  for (const o of [...cards.map((c) => c.g), ...tokens, ...tiles.map((t) => t.g)]) o.traverse((m) => (m.userData.noShadow = true));
  apply(0, 0);
  return { group: root, radius: 2.32, floorY: FLOOR, lift: -0.22, elev: 0.2, fill: 0.95, apply };
}
