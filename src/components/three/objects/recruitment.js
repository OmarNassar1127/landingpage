// Recruitment-screening: CV cards pass through a ceramic gate with three criteria lights, each
// comes out with a strip of ticks per criterion, the best ones lift and slide into a calendar.
import * as THREE from "three";
import { HEX, INDIGO, CSS, rbox, extrude, put, group, memo, G, seg, range, lerp, bump, backOut, tick, canvasTexture, faceMat, tintable } from "../kit.js";
import { BEATS } from "../beats.js";

const [B1, B2, B3] = BEATS;
const FLOOR = -1.2;
const CROWN = 1.42; // height where the arch's legs turn into its round crown
const PASS_Y = FLOOR + 0.66; // card centre while it passes through the gate
const SCORES = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 0],
  [0, 1, 0],
];
const BEST = [0, 2]; // cards that get an interview
const SLOTS = [
  [1, 0],
  [2, 1],
]; // calendar slot (col, row) per best card

// An arch outline (straight legs, round crown) as a shape, centred on x = 0, standing on y = 0.
function archPath(target, hw, y0, legTop) {
  target.moveTo(-hw, y0);
  target.lineTo(hw, y0);
  target.lineTo(hw, legTop);
  target.absarc(0, legTop, hw, 0, Math.PI, false);
  target.lineTo(-hw, y0);
  return target;
}

const cvTexture = () =>
  canvasTexture(256, 352, (g) => {
    g.fillStyle = CSS.paper;
    g.fillRect(0, 0, 256, 352);
    // the person: a soft disc with a head and shoulders
    g.fillStyle = "#e6e4fb";
    g.beginPath();
    g.arc(78, 78, 48, 0, Math.PI * 2);
    g.fill();
    g.save();
    g.beginPath();
    g.arc(78, 78, 48, 0, Math.PI * 2);
    g.clip();
    g.fillStyle = CSS.indigo;
    g.beginPath();
    g.arc(78, 66, 18, 0, Math.PI * 2);
    g.fill();
    g.beginPath();
    g.ellipse(78, 122, 34, 30, 0, Math.PI, 0);
    g.fill();
    g.restore();
    g.fillStyle = CSS.ink;
    g.fillRect(142, 58, 82, 16);
    g.fillStyle = CSS.line;
    g.fillRect(142, 88, 60, 14);
    [0.82, 0.64, 0.74, 0.5].forEach((r, i) => g.fillRect(30, 158 + i * 30, 196 * r, 14));
  });

const stripTexture = (score) =>
  canvasTexture(256, 72, (g) => {
    score.forEach((s, i) => {
      const x = 30 + i * 70;
      g.fillStyle = s ? CSS.indigo : CSS.soft;
      g.beginPath();
      g.roundRect(x, 8, 56, 56, 14);
      g.fill();
      if (s) tick(g, x + 13, 38, 30, "#ffffff", 8);
      else {
        g.fillStyle = CSS.line;
        g.fillRect(x + 16, 33, 24, 7);
      }
    });
  });

const slotTick = () =>
  canvasTexture(128, 96, (g) => {
    tick(g, 38, 50, 52, "#ffffff", 12);
  });

export async function build({ M }) {
  const root = new THREE.Group();
  const spin = group(root, 0, 0, 0);

  // ------------------------------------------------ the gate: a thick ceramic arch with three criteria lights
  const gate = group(spin, 0, FLOOR, 0);
  const outer = archPath(new THREE.Shape(), 0.82, 0, CROWN);
  outer.holes.push(archPath(new THREE.Path(), 0.46, 0.13, CROWN - 0.04));
  put(gate, memo("rs:arch", () => extrude(outer, 0.52, 0.12, 28)), M.ceramic);
  for (const x of [-0.62, 0.62]) put(gate, rbox(0.42, 0.08, 0.66, 0.035), M.warm, x, 0.04, 0);
  const lights = [0.78, 0.5, 0.22].map((a) => {
    const ang = Math.PI * a;
    const x = Math.cos(ang) * 0.64;
    const y = CROWN + Math.sin(ang) * 0.64;
    put(gate, G(THREE.CylinderGeometry, 0.13, 0.13, 0.05, 40), M.warm, x, y, 0.255).rotation.x = Math.PI / 2;
    const mat = new THREE.MeshBasicMaterial({ color: HEX.indigoSoft, toneMapped: false });
    const lamp = put(gate, G(THREE.SphereGeometry, 0.1, 32, 16), mat, x, y, 0.27);
    lamp.scale.z = 0.55;
    const halo = put(
      gate,
      G(THREE.SphereGeometry, 0.2, 24, 12),
      new THREE.MeshBasicMaterial({ color: HEX.indigo, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false }),
      x,
      y,
      0.3,
    );
    return { mat, lamp, halo };
  });

  // ------------------------------------------------ the calendar block: indigo header, a grid of slots
  const cal = group(spin, 1.62, FLOOR, -0.15);
  cal.rotation.y = -0.32;
  const board = group(cal, 0, 0.84, 0);
  board.rotation.x = -0.1;
  put(board, rbox(1.02, 1.08, 0.16, 0.09), M.ceramic);
  put(board, rbox(1.02, 0.24, 0.18, 0.08), M.indigo, 0, 0.47, 0.005);
  for (const x of [-0.26, 0.26]) put(board, G(THREE.TorusGeometry, 0.07, 0.022, 12, 28), M.steel, x, 0.6, 0);
  const tickMat = faceMat(slotTick());
  const slots = [];
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 3; c++) {
      const target = SLOTS.findIndex(([sc, sr]) => sc === c && sr === r);
      const mat = target >= 0 ? tintable(HEX.warm) : M.warm;
      const s = put(board, rbox(0.25, 0.2, 0.05, 0.035), mat, -0.3 + c * 0.3, 0.17 - r * 0.25, 0.085);
      if (target >= 0) {
        const t = put(board, G(THREE.PlaneGeometry, 0.2, 0.15), tickMat.clone(), s.position.x, s.position.y, 0.115);
        t.material.opacity = 0;
        slots[target] = { s, mat, t };
      }
    }
  for (const x of [-0.32, 0.32]) {
    put(cal, rbox(0.3, 0.08, 0.5, 0.035), M.warm, x, 0.04, 0.02);
    put(cal, rbox(0.1, 0.3, 0.1, 0.04), M.warm, x, 0.2, 0.02);
  }

  // ------------------------------------------------ the CV cards
  const face = faceMat(cvTexture());
  const PILE = (i) => new THREE.Vector3(-1.66 + i * 0.07, FLOOR + 0.46 + i * 0.015, 0.2 - i * 0.2);
  const ROW = [-0.4, -1.2, 0.4, 1.2].map((x) => new THREE.Vector3(x, FLOOR + 0.4, 1.45));
  const DRAFT = (j) => new THREE.Vector3(-1.66 + j * 0.07, FLOOR + 0.46 + j * 0.015, 0.2 - j * 0.2);
  const cards = SCORES.map((score, i) => {
    const g = group(spin);
    const body = tintable(HEX.paper);
    put(g, rbox(0.64, 0.87, 0.05, 0.045), body);
    const f = put(g, G(THREE.PlaneGeometry, 0.6, 0.82), face.clone(), 0, 0.02, 0.027);
    const strip = put(g, G(THREE.PlaneGeometry, 0.48, 0.135), faceMat(stripTexture(score), { opacity: 0 }), 0, -0.3, 0.03);
    strip.renderOrder = 2;
    const pile = PILE(i);
    const path = new THREE.CatmullRomCurve3([
      pile,
      new THREE.Vector3(-0.95, PASS_Y + 0.08, 0.02),
      new THREE.Vector3(0, PASS_Y, 0),
      new THREE.Vector3(0.95, PASS_Y + 0.05, 0.25),
      new THREE.Vector3(lerp(0.9, ROW[i].x, 0.6), lerp(PASS_Y, ROW[i].y, 0.5) + 0.2, 1.0),
      ROW[i],
    ]);
    return { g, body, f, strip, path, best: BEST.indexOf(i) };
  });

  const tmp = new THREE.Vector3();
  const slotPos = new THREE.Vector3();
  const paper = new THREE.Color(HEX.paper);
  const warm = new THREE.Color(HEX.warm);
  const soft = new THREE.Color(HEX.indigoSoft);

  function apply(p, time) {
    const f = (i, a) => Math.sin(time * 1.2 + i * 1.9) * a;
    spin.rotation.set(0, 0.12 - p * 0.14 + f(0, 0.015), 0);
    spin.updateMatrixWorld(true);

    // B1: the gate lights its criteria, one after another
    let pulse = 0;
    cards.forEach((c, i) => {
      const t0 = B2[0] + i * 0.058;
      const u = seg(p, t0, t0 + 0.11);
      pulse = Math.max(pulse, bump(range(u, 0.38, 0.62)));
    });
    lights.forEach((l, i) => {
      const k = seg(p, B1[0] + 0.03 + i * 0.06, B1[0] + 0.12 + i * 0.06);
      l.mat.color.copy(soft).lerp(INDIGO, k);
      l.lamp.scale.setScalar(1 + 0.35 * bump(k) + 0.12 * pulse);
      l.lamp.scale.z = 0.55;
      l.halo.material.opacity = 0.12 * k + 0.1 * pulse + f(i, 0.02) * k;
      l.halo.scale.setScalar(0.6 + 0.3 * k + 0.3 * pulse);
    });

    // B2: each card passes through the gate, gets its strip of ticks and lands in a row; the best lift
    // B3: the best slide into calendar slots, the rest stack aside as drafts
    let draftN = 0;
    cards.forEach((c, i) => {
      const t0 = B2[0] + i * 0.058;
      const u = seg(p, t0, t0 + 0.11);
      c.path.getPoint(u, tmp);
      c.g.position.copy(tmp);
      c.g.rotation.set(lerp(-0.06, -0.12, u), lerp(0.35 - i * 0.04, 0, u) + (u > 0 && u < 1 ? -0.25 * bump(u) : 0), lerp(0.05 - i * 0.03, 0, u));
      c.g.scale.setScalar(lerp(1, 0.86, range(u, 0.6, 1)));
      c.strip.material.opacity = range(u, 0.46, 0.58);
      c.strip.scale.x = backOut(range(u, 0.46, 0.62)) || 0.001;
      c.g.visible = true;

      if (c.best >= 0) {
        const lift = backOut(range(p, t0 + 0.1, t0 + 0.15));
        c.g.position.y += 0.62 * Math.min(1.1, lift) + f(i + 2, 0.03) * lift;
        c.g.position.z += 0.15 * lift;
        c.body.color.copy(paper).lerp(soft, 0.7 * Math.min(1, lift));
        const k = seg(p, B3[0] + 0.02 + c.best * 0.06, B3[0] + 0.15 + c.best * 0.06);
        const slot = slots[c.best];
        slot.s.getWorldPosition(slotPos);
        spin.worldToLocal(slotPos);
        slotPos.z += 0.12;
        c.g.position.lerp(slotPos, k);
        c.g.position.y += bump(k) * 0.35;
        c.g.rotation.y = lerp(c.g.rotation.y, -0.42, k);
        c.g.scale.setScalar(lerp(c.g.scale.x, 0.26, k));
        c.g.visible = k < 0.97;
        const fill = range(k, 0.82, 1);
        slot.mat.color.copy(warm).lerp(INDIGO, fill);
        slot.t.material.opacity = fill;
        slot.s.scale.setScalar(1 + 0.25 * bump(fill));
      } else {
        const j = draftN++;
        const k = seg(p, B3[0] + 0.1 + j * 0.05, B3[0] + 0.22 + j * 0.05);
        const d = DRAFT(j);
        c.g.position.lerp(d, k);
        c.g.position.y += bump(k) * 0.3;
        c.g.rotation.set(lerp(c.g.rotation.x, -0.08, k), lerp(c.g.rotation.y, 0.35 - j * 0.04, k), lerp(c.g.rotation.z, 0.05 - j * 0.03, k));
        c.g.scale.setScalar(lerp(c.g.scale.x, 1, k));
        c.body.color.copy(paper).lerp(warm, 0.55 * k);
        c.f.material.opacity = 1 - 0.45 * k;
      }
    });
  }

  for (const c of cards) c.g.traverse((m) => (m.userData.noShadow = true));
  apply(0, 0);
  return { group: root, radius: 2.3, floorY: FLOOR, lift: -0.12, elev: 0.34, fill: 0.95, apply };
}
