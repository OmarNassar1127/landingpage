// Productteksten: a product box with a tag. Sample texts tune an indigo tone block, spec chips slide
// from the box into a first text plate, and the plate fans out into language plates that settle in a
// webshop tray with an approval tick.
import * as THREE from "three";
import { HEX, INDIGO, CSS, rbox, put, group, G, seg, range, lerp, clamp, bump, backOut, tick, canvasTexture, faceMat, tintable, linesTexture } from "../kit.js";
import { BEATS } from "../beats.js";

const [B1, B2, B3] = BEATS;
const FLOOR = -1.2;

// language plates: code, body tint, pill colour, text colour on the pill
const LANGS = [
  { code: "NL", tint: HEX.paper, pill: CSS.indigo, ink: "#ffffff" },
  { code: "EN", tint: HEX.indigoSoft, pill: CSS.indigo, ink: "#ffffff" },
  { code: "DE", tint: HEX.warm, pill: "#8f877d", ink: "#ffffff" },
  { code: "FR", tint: HEX.amber, pill: CSS.amber, ink: "#ffffff" },
];

const plateTexture = (lang, font) =>
  canvasTexture(512, 340, (g) => {
    g.fillStyle = CSS.paper;
    g.beginPath();
    g.roundRect(0, 0, 512, 340, 34);
    g.fill();
    g.fillStyle = lang.pill;
    g.beginPath();
    g.roundRect(34, 30, 150, 84, 42);
    g.fill();
    g.fillStyle = lang.ink;
    g.font = `800 54px ${font}`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText(lang.code, 109, 75);
    g.fillStyle = CSS.line;
    [0.86, 0.68, 0.78].forEach((r, i) => g.fillRect(34, 156 + i * 56, 444 * r, 26));
  });

const iconTexture = (kind) =>
  canvasTexture(256, 256, (g) => {
    g.fillStyle = CSS.paper;
    g.fillRect(0, 0, 256, 256);
    g.fillStyle = CSS.indigo;
    g.strokeStyle = CSS.indigo;
    g.lineCap = "round";
    g.lineJoin = "round";
    if (kind === 0) {
      // ruler: a slanted bar with ticks
      g.translate(128, 128);
      g.rotate(-0.6);
      g.lineWidth = 14;
      g.strokeRect(-92, -32, 184, 64);
      g.lineWidth = 10;
      for (let i = 0; i < 6; i++) {
        const x = -64 + i * 26;
        g.beginPath();
        g.moveTo(x, -32);
        g.lineTo(x, i % 2 ? -8 : 2);
        g.stroke();
      }
    } else if (kind === 1) {
      // weight: a kettlebell
      g.lineWidth = 16;
      g.beginPath();
      g.arc(128, 92, 34, Math.PI * 1.05, Math.PI * 1.95);
      g.stroke();
      g.beginPath();
      g.moveTo(78, 92);
      g.lineTo(178, 92);
      g.lineTo(206, 200);
      g.lineTo(50, 200);
      g.closePath();
      g.fill();
    } else {
      // colour: a dot with a soft ring
      g.fillStyle = CSS.soft;
      g.beginPath();
      g.arc(128, 128, 84, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = CSS.indigo;
      g.beginPath();
      g.arc(128, 128, 58, 0, Math.PI * 2);
      g.fill();
    }
  });

const bagTexture = () =>
  canvasTexture(128, 128, (g) => {
    // a shopping bag: the webshop
    g.fillStyle = CSS.indigo;
    g.beginPath();
    g.roundRect(22, 44, 84, 70, 12);
    g.fill();
    g.strokeStyle = CSS.indigo;
    g.lineWidth = 10;
    g.beginPath();
    g.arc(64, 46, 22, Math.PI, 0);
    g.stroke();
  });

const tickTexture = () =>
  canvasTexture(256, 256, (g) => {
    tick(g, 70, 132, 120, "#ffffff", 26);
  });

const holeTexture = () =>
  canvasTexture(256, 160, (g) => {
    g.fillStyle = CSS.line;
    [0.8, 0.55].forEach((r, i) => g.fillRect(86, 52 + i * 40, 140 * r, 18));
    g.fillStyle = "#8f877d";
    g.beginPath();
    g.arc(44, 80, 16, 0, Math.PI * 2);
    g.fill();
  });

export async function build({ M, font }) {
  const root = new THREE.Group();
  const spin = group(root, 0, 0, 0);

  // ------------------------------------------------ the product box with its lid and tag
  const BX = -0.3;
  const BZ = -0.7;
  const box = group(spin, BX, FLOOR, BZ);
  put(box, rbox(1.4, 1.0, 1.15, 0.16, 4), M.ceramic, 0, 0.5, 0);
  put(box, rbox(1.5, 0.28, 1.25, 0.11, 4), M.warm, 0, 1.08, 0);
  const tag = group(box, -0.3, 0.92, 0.64);
  put(tag, G(THREE.CylinderGeometry, 0.014, 0.014, 0.24, 8), M.warmDark, 0, -0.07, 0).rotation.z = 0.5;
  const tagBody = group(tag, -0.12, -0.34, 0.02);
  put(tagBody, rbox(0.52, 0.32, 0.05, 0.06), M.paper);
  put(tagBody, G(THREE.PlaneGeometry, 0.5, 0.31), faceMat(holeTexture()), 0, 0, 0.027);
  tagBody.rotation.z = -0.3;

  // ------------------------------------------------ the tone block: a slot on top and a dial on the front
  const TX = -1.0;
  const TZ = 0.95;
  const tone = group(spin, TX, FLOOR, TZ);
  put(tone, rbox(0.8, 0.56, 0.6, 0.12, 4), M.ceramic, 0, 0.28, 0);
  put(tone, rbox(0.48, 0.04, 0.09, 0.02), M.ink, 0, 0.56, -0.02);
  const ringMat = new THREE.MeshBasicMaterial({ color: HEX.indigoSoft, toneMapped: false });
  const ringM = put(tone, G(THREE.TorusGeometry, 0.17, 0.03, 12, 40), ringMat, 0, 0.27, 0.305);
  const knob = group(tone, 0, 0.27, 0.31);
  put(knob, G(THREE.CylinderGeometry, 0.13, 0.13, 0.08, 32), M.warm).rotation.x = Math.PI / 2;
  put(knob, rbox(0.035, 0.1, 0.03, 0.012), M.indigo, 0, 0.06, 0.045);

  // sample texts: three cards above the block
  const cardFace = faceMat(linesTexture({ w: 256, h: 320, rows: [0.8, 0.6, 0.72, 0.5, 0.66], head: CSS.indigo, pad: 34, thick: 18 }));
  const cards = [-1, 0, 1].map((k) => {
    const c = group(spin);
    put(c, rbox(0.42, 0.54, 0.03, 0.03), M.paper);
    put(c, G(THREE.PlaneGeometry, 0.39, 0.5), cardFace, 0, 0, 0.017);
    return { g: c, k };
  });

  // ------------------------------------------------ spec chips that sit on the lid
  const chips = [0, 1, 2].map((i) => {
    const c = group(spin);
    put(c, rbox(0.4, 0.4, 0.14, 0.08), M.paper);
    put(c, G(THREE.PlaneGeometry, 0.29, 0.29), new THREE.MeshBasicMaterial({ map: iconTexture(i), toneMapped: false }), 0, 0, 0.072);
    return c;
  });
  const CHIP_REST = [-0.46, 0, 0.46];

  // ------------------------------------------------ language plates
  const plates = LANGS.map((lang, i) => {
    const g = group(spin);
    const mat = tintable(lang.tint);
    put(g, rbox(0.92, 0.64, 0.1, 0.08), mat);
    put(g, G(THREE.PlaneGeometry, 0.78, 0.5), faceMat(plateTexture(lang, font)), 0, 0, 0.052);
    let mask = null;
    if (i === 0) {
      // a paper mask over the lines that shrinks to the right, so the text appears as it is written
      mask = put(g, G(THREE.PlaneGeometry, 1, 1), new THREE.MeshBasicMaterial({ color: HEX.paper, toneMapped: false }), 0, 0, 0.056);
    }
    return { g, mask };
  });
  const WRITE = new THREE.Vector3(0.75, 0.75, 0.1); // where the first plate is written
  const FAN = [
    [0.3, 1.0, 0.0, 0.16],
    [1.12, 1.05, -0.1, -0.14],
    [0.35, 0.42, 0.4, 0.1],
    [1.17, 0.47, 0.3, -0.12],
  ];

  // ------------------------------------------------ the webshop shelf: two tiers, and the approval tick
  const SX = 0.8;
  const SZ = 0.55;
  const shelf = group(spin, SX, FLOOR, SZ);
  for (const x of [-0.6, 0.6]) put(shelf, rbox(0.1, 1.1, 0.5, 0.04), M.ceramic, x, 0.55, 0);
  for (const y of [0.05, 0.55, 1.07]) put(shelf, rbox(1.3, 0.1, 0.54, 0.04), y === 0.55 ? M.warm : M.ceramic, 0, y, 0);
  put(shelf, rbox(1.14, 0.98, 0.04, 0.02), M.warm, 0, 0.55, -0.24);
  put(shelf, G(THREE.PlaneGeometry, 0.2, 0.2), faceMat(bagTexture()), -0.4, 1.24, 0.05);
  const SLOT = (i) => new THREE.Vector3(SX + (i % 2 ? 0.28 : -0.28), FLOOR + (i < 2 ? 0.8 : 0.3), SZ + 0.02);
  const badge = group(spin, SX + 0.5, FLOOR + 1.12, SZ + 0.3);
  put(badge, G(THREE.CylinderGeometry, 0.2, 0.2, 0.08, 40), M.indigo).rotation.x = Math.PI / 2;
  put(badge, G(THREE.PlaneGeometry, 0.26, 0.26), faceMat(tickTexture()), 0, 0, 0.042);

  const v = new THREE.Vector3();
  const w = new THREE.Vector3();

  function apply(p, time) {
    const f = (i, a) => Math.sin(time * 1.2 + i * 1.9) * a;
    spin.rotation.set(0, -0.1 + p * 0.08 + f(0, 0.015), 0);

    // B1: the sample texts drop into the tone block, the dial turns and the ring lights indigo
    let tuned = 0;
    cards.forEach((c, i) => {
      const k = seg(p, B1[0] + i * 0.06, B1[0] + 0.12 + i * 0.06);
      tuned += k;
      c.g.visible = k < 0.995;
      c.g.position.set(TX + 0.05 + lerp(c.k * 0.36, -0.05, k), lerp(0.9 + (1 - Math.abs(c.k)) * 0.12, FLOOR + 0.62, k) + f(i + 1, 0.04) * (1 - k), lerp(TZ - 0.4 - Math.abs(c.k) * 0.08, TZ - 0.02, k));
      c.g.rotation.set(lerp(-0.15, 0, k), lerp(c.k * 0.3, 0, k), lerp(-c.k * 0.2, 0, k));
      c.g.scale.set(1, 1 - 0.8 * range(k, 0.65, 1), 1);
    });
    tuned /= 3;
    ringMat.color.setHex(HEX.indigoSoft).lerp(INDIGO, tuned);
    knob.rotation.z = lerp(0.9, -0.9, tuned);
    ringM.scale.setScalar(1 + 0.14 * bump(range(p, B1[1] - 0.08, B1[1])));

    // B2: the spec chips hop from the lid into the first plate, and its lines get written
    const p0 = plates[0];
    let written = 0;
    let pulse = 0;
    chips.forEach((c, i) => {
      const a = B2[0] + 0.02 + i * 0.065;
      const k = seg(p, a, a + 0.11);
      written += range(p, a + 0.07, a + 0.13);
      pulse = Math.max(pulse, bump(range(p, a + 0.08, a + 0.14)));
      v.set(BX + CHIP_REST[i], FLOOR + 1.43, BZ + 0.1);
      w.copy(WRITE).add(new THREE.Vector3(-0.2 + i * 0.2, -0.05, 0.05));
      c.position.lerpVectors(v, w, k);
      c.position.y += bump(k) * 0.45 + f(i + 4, 0.03) * (1 - k);
      c.rotation.set(lerp(-0.3, 0, k), lerp(0.2 - i * 0.2, 0, k), lerp(0.1 * (i - 1), 0, k) + k * 1.2);
      c.scale.setScalar(1 - range(k, 0.75, 1));
      c.visible = k < 0.999;
    });
    written /= 3;
    if (p0.mask) {
      const m = 1 - written;
      p0.mask.visible = m > 0.001;
      p0.mask.scale.set(0.72 * m, 0.3, 1);
      p0.mask.position.set(0.36 - 0.36 * m, -0.09, 0.056);
    }

    // B3: the plate multiplies and fans out, then every plate settles on the shelf and the tick lands
    const fan = seg(p, B3[0], B3[0] + 0.1);
    const settle = seg(p, B3[0] + 0.14, B3[1] - 0.09);
    plates.forEach((pl, i) => {
      const g = pl.g;
      let s;
      if (i === 0) s = 1 + 0.06 * pulse;
      else s = backOut(range(p, B3[0] + 0.012 * i, B3[0] + 0.06 + 0.012 * i));
      const F = FAN[i];
      v.copy(WRITE);
      w.set(F[0], F[1], F[2]);
      v.lerp(w, fan);
      v.lerp(SLOT(i), settle);
      v.y += bump(settle) * 0.15;
      g.position.copy(v);
      g.position.y += f(i + 6, 0.03) * (1 - settle);
      g.rotation.set(lerp(lerp(0, -0.05, fan), -0.1, settle), lerp(lerp(-0.2, F[3] - 0.15, fan), 0, settle), lerp(F[3] * fan, 0, settle));
      g.scale.setScalar(s * lerp(lerp(1, 0.82, fan), 0.58, settle));
      g.visible = s > 0.001;
    });
    const t = backOut(range(p, B3[1] - 0.11, B3[1] - 0.04));
    badge.scale.setScalar(t);
    badge.visible = t > 0.001;
    badge.rotation.set(-0.1, -0.2, 0);
  }

  for (const o of [...cards.map((c) => c.g), ...chips, ...plates.map((x) => x.g), badge]) o.traverse((m) => (m.userData.noShadow = true));
  apply(0, 0);
  return { group: root, radius: 1.85, floorY: FLOOR, lift: -0.05, elev: 0.3, fill: 0.95, apply };
}
