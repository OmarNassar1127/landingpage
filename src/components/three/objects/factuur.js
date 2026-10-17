// Factuurverwerking: invoices and a receipt gather in a tray, one sheet slides under a glowing scanner
// arch and splits into booking blocks (supplier, number, amount, VAT, ledger) that stack as a concept
// booking with a tick; the VAT block turns amber as the warning.
import * as THREE from "three";
import { HEX, AMBER, CSS, rrect, extrude, rbox, put, group, memo, G, seg, range, lerp, clamp, bump, backOut, tick, canvasTexture, faceMat, tintable } from "../kit.js";
import { BEATS } from "../beats.js";

const [B1, B2, B3] = BEATS;
const FLOOR = -1.0;
const BED = FLOOR + 0.16; // top of the scanner bed
const TRAY_X = -1.3;
const TRAY_Y = BED + 0.05; // inside floor of the tray
const STACK_X = 1.45;
const PLATE_Y = FLOOR + 0.12;
const BH = 0.36; // block pitch in the stack

function ring(o, oz, i, iz, ro, ri) {
  const s = rrect(new THREE.Shape(), o, oz, ro);
  s.holes.push(rrect(new THREE.Path(), i, iz, ri));
  return s;
}

const invoiceTexture = (font) =>
  canvasTexture(360, 500, (g) => {
    g.fillStyle = CSS.paper;
    g.fillRect(0, 0, 360, 500);
    g.fillStyle = CSS.indigo;
    g.fillRect(32, 34, 110, 30);
    g.fillStyle = CSS.line;
    g.fillRect(212, 36, 116, 12);
    g.fillRect(242, 58, 86, 12);
    [120, 156].forEach((y, i) => g.fillRect(32, y, i ? 120 : 170, 12));
    g.fillStyle = CSS.soft;
    g.fillRect(32, 206, 296, 26);
    g.fillStyle = CSS.line;
    for (let r = 0; r < 4; r++) {
      const y = 256 + r * 38;
      g.fillRect(32, y, 150 - (r % 2) * 40, 12);
      g.fillRect(262, y, 66, 12);
    }
    g.fillStyle = CSS.ink;
    g.fillRect(180, 418, 148, 4);
    g.fillStyle = CSS.indigo;
    g.font = `800 44px ${font}`;
    g.textBaseline = "middle";
    g.fillText("€", 186, 452);
    g.fillRect(232, 444, 96, 16);
  });

const receiptTexture = () =>
  canvasTexture(180, 380, (g) => {
    g.fillStyle = CSS.paper;
    g.fillRect(0, 0, 180, 380);
    g.fillStyle = CSS.ink;
    g.fillRect(50, 30, 80, 14);
    g.fillStyle = CSS.line;
    for (let r = 0; r < 6; r++) {
      const y = 76 + r * 34;
      g.fillRect(22, y, 70 + ((r * 37) % 30), 10);
      g.fillRect(124, y, 34, 10);
    }
    g.fillStyle = CSS.indigo;
    g.fillRect(22, 300, 136, 18);
  });

// Icons for the five booking blocks, white on a coloured disc, with two grey "value" lines.
function icon(g, kind, font, ink) {
  g.fillStyle = "#ffffff";
  g.strokeStyle = "#ffffff";
  if (kind === 0) {
    // supplier: a building with windows
    g.fillRect(50, 42, 60, 76);
    g.fillStyle = ink;
    for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) g.fillRect(59 + c * 26, 52 + r * 20, 16, 12);
    g.fillRect(72, 102, 16, 16);
  } else if (kind === 4) {
    // ledger: a book with a spine and lines
    g.beginPath();
    g.roundRect(46, 40, 68, 80, 10);
    g.fill();
    g.fillStyle = ink;
    g.fillRect(56, 40, 8, 80);
    [58, 76, 94].forEach((y) => g.fillRect(74, y, 30, 8));
  } else {
    g.font = `800 ${kind === 1 ? 88 : 84}px ${font}`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText(["", "#", "€", "%"][kind], 80, 84);
  }
}

const blockTexture = (kind, font, warn) =>
  canvasTexture(480, 160, (g) => {
    const disc = warn ? "#ffffff" : CSS.indigo;
    g.fillStyle = disc;
    g.beginPath();
    g.arc(80, 80, 70, 0, Math.PI * 2);
    g.fill();
    icon(g, kind, font, warn ? CSS.amber : CSS.indigo);
    if (warn) {
      g.fillStyle = CSS.amber;
      g.font = `800 84px ${font}`;
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillText("%", 80, 84);
    }
    g.fillStyle = warn ? "rgba(255,255,255,0.8)" : CSS.line;
    g.fillRect(176, 52, 230 - kind * 14, 20);
    g.fillRect(176, 92, 140 + ((kind * 29) % 60), 20);
  });

const tickTexture = () =>
  canvasTexture(256, 256, (g) => {
    tick(g, 70, 132, 116, "#ffffff", 26);
  });

const beamTexture = () =>
  canvasTexture(16, 256, (g) => {
    const l = g.createLinearGradient(0, 0, 0, 256);
    l.addColorStop(0, "rgba(79,70,229,0.75)");
    l.addColorStop(1, "rgba(79,70,229,0.08)");
    g.fillStyle = l;
    g.fillRect(0, 0, 16, 256);
  });

export async function build({ M, font = "sans-serif" }) {
  const root = new THREE.Group();
  const spin = group(root, -0.2, 0, 0);

  // ------------------------------------------------ the scanner bed and the inbox tray
  put(spin, rbox(2.75, 0.16, 1.3, 0.07), M.ceramic, -0.62, FLOOR + 0.08, 0);
  const tray = group(spin, TRAY_X, BED, 0);
  put(tray, rbox(1.0, 0.05, 1.18, 0.025), M.warm, 0, 0.025, 0);
  const rim = put(tray, memo("fv:rim", () => extrude(ring(1.0, 1.18, 0.84, 1.02, 0.1, 0.05), 0.16, 0.035, 12)), M.warm, 0, 0.1, 0);
  rim.rotation.x = -Math.PI / 2;

  // ------------------------------------------------ the scanner arch with its indigo light bar
  const arch = group(spin, 0.05, 0, 0);
  for (const z of [-0.6, 0.6]) put(arch, rbox(0.3, 1.26, 0.22, 0.09), M.ceramic, 0, BED + 0.61, z);
  put(arch, rbox(0.46, 0.3, 1.6, 0.14), M.ceramic, 0, BED + 1.32, 0).userData.noShadow = true; // its shadow would land as a smear behind the bed
  const barMat = new THREE.MeshBasicMaterial({ color: HEX.indigoSoft, toneMapped: false });
  put(arch, rbox(0.14, 0.05, 1.0, 0.024), barMat, 0, BED + 1.16, 0);
  const beamMat = new THREE.MeshBasicMaterial({ map: beamTexture(), transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, toneMapped: false });
  const beam = put(arch, G(THREE.PlaneGeometry, 1.0, 1.14), beamMat, 0, BED + 0.58, 0);
  beam.rotation.y = Math.PI / 2;
  const lineMat = new THREE.MeshBasicMaterial({ color: HEX.indigo, transparent: true, opacity: 0, toneMapped: false });
  put(arch, rbox(0.05, 0.012, 1.0, 0.005), lineMat, 0, BED + 0.035, 0);

  // ------------------------------------------------ the concept booking plate on the right
  put(spin, rbox(1.2, 0.12, 0.7, 0.06), M.warm, STACK_X, FLOOR + 0.06, 0.05);

  // ------------------------------------------------ two invoices and a receipt
  const invTex = invoiceTexture(font);
  const invFace = faceMat(invTex);
  const recFace = faceMat(receiptTexture());
  const makeSheet = (w, d, face) => {
    const g = group(spin);
    const body = group(g);
    put(body, rbox(w, 0.024, d, 0.012, 2), M.paper);
    put(body, G(THREE.PlaneGeometry, w * 0.96, d * 0.96), face, 0, 0.013, 0).rotation.x = -Math.PI / 2;
    return { g, body };
  };
  // [start pose: x, y, z, rx, ry, rz] and pile pose [dx, dz, ry]
  const sheets = [
    { ...makeSheet(0.68, 0.94, invFace), from: [-1.9, 0.6, 0.1, 1.0, 0.4, 0.2], pile: [-0.02, 0.02, 0.05] },
    { ...makeSheet(0.36, 0.74, recFace), from: [1.25, 0.75, 0.45, 1.08, -0.5, -0.24], pile: [0.12, -0.04, -0.18] },
    { ...makeSheet(0.68, 0.94, invFace), from: [-0.55, 1.35, -0.2, 1.05, 0.05, -0.08], pile: [0, 0, -0.04] },
  ];
  const SCAN = sheets[2];

  // ------------------------------------------------ booking blocks: supplier, number, amount, VAT, ledger
  const blocks = [0, 1, 2, 3, 4].map((k) => {
    const g = group(spin);
    const mat = k === 3 ? tintable(HEX.ceramic) : M.ceramic;
    put(g, rbox(1.0, 0.32, 0.44, 0.1), mat);
    const face = put(g, G(THREE.PlaneGeometry, 0.94, 0.313), faceMat(blockTexture(k, font, false)), 0, 0, 0.222);
    const warn = k === 3 ? put(g, G(THREE.PlaneGeometry, 0.94, 0.313), faceMat(blockTexture(k, font, true), { opacity: 0 }), 0, 0, 0.223) : null;
    return { g, mat, face, warn };
  });
  // the loose spread they hover in after the scan, and their slot in the stack (supplier on top)
  const HOVER = [
    [0.7, 1.2, 0.2, 0.18, -0.2],
    [1.7, 1.02, 0.0, -0.16, 0.25],
    [0.95, 0.66, 0.5, 0.12, 0.3],
    [1.95, 0.4, 0.3, -0.2, -0.15],
    [1.25, 0.05, 0.7, 0.1, 0.12],
  ];
  const slotY = (k) => PLATE_Y + 0.13 + (4 - k) * BH;

  // ------------------------------------------------ the approval tick
  const badge = group(spin, STACK_X + 0.5, slotY(0) + 0.3, 0.38);
  const disc = put(badge, G(THREE.CylinderGeometry, 0.2, 0.2, 0.09, 40), M.indigo);
  disc.rotation.x = Math.PI / 2;
  put(badge, G(THREE.PlaneGeometry, 0.3, 0.3), faceMat(tickTexture()), 0, 0, 0.047);

  const base = new THREE.Color(HEX.ceramic);
  const sp = new THREE.Vector3();

  function apply(p, time) {
    const f = (i, a) => Math.sin(time * 1.2 + i * 1.9) * a;
    spin.rotation.set(0, -0.7 + p * 0.1 + f(0, 0.015), 0);

    // B1: the sheets drop into the tray, the one to be scanned last
    sheets.forEach((s, i) => {
      const k = seg(p, B1[0] + i * 0.07, B1[0] + 0.12 + i * 0.07);
      const [x, y, z, rx, ry, rz] = s.from;
      const [dx, dz, pry] = s.pile;
      const py = TRAY_Y + i * 0.03 + 0.012;
      s.g.position.set(lerp(x, TRAY_X + dx, k), lerp(y, py, k) + bump(k) * (i === 1 ? 1.0 : 0.12) + f(i + 1, 0.04) * (1 - k), lerp(z, dz, k));
      s.g.rotation.set(lerp(rx, 0, k), lerp(ry, pry, k), lerp(rz, 0, k));
    });

    // B2: the top sheet leaves the tray, slides under the beam and splits into blocks
    const out = seg(p, B2[0], B2[0] + 0.08);
    const slide = seg(p, B2[0] + 0.06, B2[0] + 0.19);
    const split = range(p, B2[0] + 0.17, B2[0] + 0.23);
    if (out > 0) {
      const sx = slide > 0 ? lerp(-0.6, 0.42, slide) : lerp(TRAY_X, -0.6, out);
      const sy = slide > 0 ? BED + 0.014 : lerp(TRAY_Y + 0.072, BED + 0.014, out) + bump(out) * 0.3;
      SCAN.g.position.set(sx, sy, 0);
      SCAN.g.rotation.set(0, lerp(-0.04, 0, out), 0);
    }
    SCAN.g.scale.setScalar(1 - split);
    SCAN.g.visible = split < 0.999;

    // the beam wakes when the sheet arrives and settles to a calm glow
    const lit = seg(p, B2[0] + 0.02, B2[0] + 0.08) * (1 - 0.6 * seg(p, B2[1] - 0.04, B3[0] + 0.06));
    const scan = bump(range(p, B2[0] + 0.08, B2[0] + 0.2));
    beamMat.opacity = 0.15 + 0.85 * Math.max(lit, scan);
    lineMat.opacity = 0.2 + 0.8 * Math.max(lit, scan);
    barMat.color.setHex(HEX.indigoSoft).lerp(new THREE.Color(HEX.indigo), Math.max(lit, scan));

    blocks.forEach((b, k) => {
      const o = range(p, B2[0] + 0.16 + k * 0.022, B2[0] + 0.25 + k * 0.022);
      const slot = 4 - k; // the bottom block lands first
      const s = seg(p, B3[0] + 0.01 + slot * 0.035, B3[0] + 0.1 + slot * 0.035);
      b.g.visible = o > 0.001;
      if (!b.g.visible) return;
      const e = backOut(o);
      const [hx, hy, hz, hrx, hrz] = HOVER[k];
      const hover = sp.set(lerp(0.45, hx, Math.min(1, e)), lerp(BED + 0.1, hy, o) + f(k + 4, 0.035) * (1 - s), lerp(0, hz, o));
      b.g.position.set(lerp(hover.x, STACK_X, s), lerp(hover.y, slotY(k), s) + bump(s) * 0.18, lerp(hover.z, 0.05, s));
      b.g.rotation.set(lerp(hrx * o, 0, s), lerp(0.7, 0.62, s), lerp(hrz * o, 0, s));
      b.g.scale.setScalar(lerp(0.3, 1, Math.min(1, e)));
      if (b.warn) {
        // the VAT rate does not add up: amber, nudged forward
        const a = range(p, B3[0] + 0.2, B3[0] + 0.26);
        b.mat.color.copy(base).lerp(AMBER, a);
        b.face.material.opacity = 1 - a;
        b.warn.material.opacity = a;
        b.g.position.z += 0.18 * seg(p, B3[0] + 0.2, B3[0] + 0.26);
        b.g.position.x += 0.06 * seg(p, B3[0] + 0.2, B3[0] + 0.26);
        b.g.scale.multiplyScalar(1 + 0.08 * bump(range(p, B3[0] + 0.21, B3[0] + 0.29)));
      }
    });

    const t = range(p, B3[0] + 0.15, B3[0] + 0.23);
    badge.visible = t > 0.001;
    badge.scale.setScalar(Math.max(0.001, backOut(t)));
    badge.rotation.set(0, 0.62 + (1 - t) * 0.8, 0);
    badge.position.y = slotY(0) + 0.3 + f(9, 0.02);
  }

  for (const o of [...sheets.map((s) => s.g), ...blocks.map((b) => b.g), badge]) o.traverse((m) => (m.userData.noShadow = true));
  apply(0, 0);
  return { group: root, radius: 2.25, floorY: FLOOR, lift: 0.1, elev: 0.34, fill: 0.99, apply };
}
