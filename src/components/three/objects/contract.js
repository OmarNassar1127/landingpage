// Contract-check: a thick contract slab next to a checklist card. A reading light passes over it,
// clauses lift out one by one, the risky ones turn amber and one missing clause shows as a dashed slot.
// The amber ones gather into a short summary card in front, ready for the jurist.
import * as THREE from "three";
import { HEX, AMBER, CSS, rbox, put, group, memo, G, seg, range, lerp, clamp, bump, backOut, tick, canvasTexture, faceMat, tintable } from "../kit.js";
import { BEATS } from "../beats.js";

const [B1, B2, B3] = BEATS;
const FLOOR = -1.2;
const SW = 1.66; // slab width
const SH = 2.16; // slab height
const SD = 0.46; // slab depth
const ROWS = [0.48, 0.16, -0.16, -0.48, -0.8]; // clause rows on the slab face, slab-local y
const KIND = ["ok", "risk", "ok", "risk", "missing"];
const LEAN = -0.09;
const PIVOT = new THREE.Vector3(0.38, FLOOR, -0.2);

// ------------------------------------------------------------------ painted faces
const faceTexture = () =>
  canvasTexture(512, 666, (g, w, h) => {
    g.fillStyle = CSS.paper;
    g.fillRect(0, 0, w, h);
    g.fillStyle = CSS.indigo;
    g.fillRect(48, 50, 150, 22);
    g.fillStyle = CSS.line;
    g.fillRect(48, 92, 300, 14);
    // slots where clauses sit
    const toY = (y) => ((SH / 2 - 0.05 - y) / (SH - 0.1)) * h;
    g.fillStyle = CSS.soft;
    ROWS.forEach((y) => {
      const cy = toY(y);
      roundRect(g, 32, cy - 44, w - 64, 88, 16);
      g.fill();
    });
    // signature line
    g.fillStyle = CSS.line;
    g.fillRect(300, h - 40, 170, 8);
  });

function roundRect(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

const stripLines = () =>
  canvasTexture(512, 96, (g) => {
    g.fillStyle = CSS.line;
    g.fillRect(28, 26, 330, 14);
    g.fillRect(28, 56, 240, 14);
  });

const badgeTexture = (kind) =>
  canvasTexture(128, 128, (g) => {
    g.fillStyle = kind === "ok" ? CSS.indigo : "#ffffff";
    g.beginPath();
    g.arc(64, 64, 60, 0, Math.PI * 2);
    g.fill();
    if (kind === "ok") tick(g, 36, 66, 54, "#ffffff", 14);
    else {
      g.fillStyle = CSS.amber;
      roundRect(g, 55, 26, 18, 50, 9);
      g.fill();
      g.beginPath();
      g.arc(64, 96, 10, 0, Math.PI * 2);
      g.fill();
    }
  });

const dashedTexture = () =>
  canvasTexture(512, 96, (g) => {
    g.fillStyle = "rgba(245,158,11,0.14)";
    roundRect(g, 8, 8, 496, 80, 22);
    g.fill();
    g.strokeStyle = CSS.amber;
    g.lineWidth = 12;
    g.setLineDash([26, 18]);
    roundRect(g, 8, 8, 496, 80, 22);
    g.stroke();
  });

const cardTexture = (rows) =>
  canvasTexture(256, 320, (g, w, h) => {
    g.fillStyle = CSS.paper;
    g.fillRect(0, 0, w, h);
    g.fillStyle = CSS.indigo;
    g.fillRect(28, 26, 80, 14);
    g.fillStyle = CSS.line;
    rows.forEach((y, i) => g.fillRect(96, y - 7, i % 2 ? 110 : 132, 14));
  });

const markTexture = (kind) =>
  canvasTexture(128, 128, (g) => {
    if (kind === "ok") tick(g, 30, 68, 64, "#ffffff", 16);
    else {
      g.fillStyle = "#ffffff";
      roundRect(g, 55, 22, 18, 56, 9);
      g.fill();
      g.beginPath();
      g.arc(64, 100, 11, 0, Math.PI * 2);
      g.fill();
    }
  });

// slab-local point to spin-space
const tmpE = new THREE.Euler(LEAN, 0, 0);
function slabToSpin(x, y, z, out) {
  return out.set(x, y + SH / 2, z).applyEuler(tmpE).add(PIVOT);
}

export async function build({ M }) {
  const root = new THREE.Group();
  const spin = group(root, 0.08, 0, 0);

  // ------------------------------------------------ the contract slab: a thick block of pages
  const pivot = group(spin, PIVOT.x, PIVOT.y, PIVOT.z);
  pivot.rotation.x = LEAN;
  const slab = group(pivot, 0, SH / 2, 0);
  // a stack of pages: thick layers with thin gaps, so the slab reads as a document from the side
  const LAYERS = 5;
  for (let i = 0; i < LAYERS; i++) {
    const z = -SD / 2 + 0.045 + i * ((SD - 0.09) / (LAYERS - 1));
    put(slab, rbox(SW - (LAYERS - 1 - i) * 0.012, SH - (LAYERS - 1 - i) * 0.012, 0.085, 0.03), i === LAYERS - 1 ? M.ceramic : M.paper, 0, 0, z);
  }
  put(slab, rbox(SW - 0.06, SH - 0.06, SD - 0.06, 0.03), M.warm);
  put(slab, G(THREE.PlaneGeometry, SW - 0.1, SH - 0.1), faceMat(faceTexture()), 0, 0, SD / 2 + 0.004);
  // a little back stand keeps it upright
  put(pivot, rbox(0.9, 0.1, 0.5, 0.04), M.warm, 0, 0.05, -0.12);

  // ------------------------------------------------ clause strips
  const linesMat = faceMat(stripLines());
  const okBadge = faceMat(badgeTexture("ok"));
  const riskBadge = faceMat(badgeTexture("risk"));
  const clauses = KIND.map((kind, i) => {
    const g = group(spin);
    if (kind === "missing") {
      const dash = put(g, G(THREE.PlaneGeometry, 1.4, 0.26), faceMat(dashedTexture(), { opacity: 0 }));
      dash.renderOrder = 3;
      return { g, kind, i, dash };
    }
    const mat = tintable(HEX.paper);
    put(g, rbox(1.38, 0.24, 0.08, 0.05), mat);
    const lines = put(g, G(THREE.PlaneGeometry, 1.34, 0.24), linesMat, 0, 0, 0.042);
    const badge = put(g, G(THREE.CircleGeometry, 0.085, 32), kind === "ok" ? okBadge : riskBadge, 0.52, 0, 0.045);
    return { g, kind, i, mat, lines, badge };
  });

  // ------------------------------------------------ the reading light
  const light = group(spin);
  put(light, rbox(1.9, 0.05, 0.05, 0.02), M.glow);
  const beam = put(
    light,
    G(THREE.PlaneGeometry, 1.9, 0.42),
    new THREE.MeshBasicMaterial({ color: HEX.indigo, transparent: true, opacity: 0.18, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false }),
    0,
    0,
    -0.02,
  );

  // ------------------------------------------------ the checklist card with four boxes
  const CROWS = [92, 150, 208, 266];
  const card = group(spin, -1.28, -0.1, 0.45);
  put(card, rbox(0.92, 1.15, 0.1, 0.07), M.ceramic);
  put(card, G(THREE.PlaneGeometry, 0.84, 1.07), faceMat(cardTexture(CROWS)), 0, 0, 0.052);
  const markOk = faceMat(markTexture("ok"));
  const markRisk = faceMat(markTexture("risk"));
  const boxes = CROWS.map((cy, k) => {
    const y = 0.535 - (cy / 320) * 1.07;
    const g = group(card, -0.26, y, 0.07);
    const mat = tintable(HEX.warm);
    put(g, rbox(0.15, 0.15, 0.05, 0.03), mat);
    const risk = k % 2 === 1;
    const mark = put(g, G(THREE.PlaneGeometry, 0.12, 0.12), risk ? markRisk : markOk, 0, 0, 0.027);
    return { g, mat, mark, risk };
  });

  // ------------------------------------------------ the summary card for the jurist
  const sum = group(spin, 0.15, -0.55, 1.3);
  put(sum, rbox(1.25, 0.98, 0.12, 0.08), M.ceramic);
  const sumFace = faceMat(
    canvasTexture(256, 200, (g) => {
      g.fillStyle = CSS.paper;
      g.fillRect(0, 0, 256, 200);
      g.fillStyle = CSS.indigo;
      g.fillRect(22, 18, 70, 12);
    }),
  );
  put(sum, G(THREE.PlaneGeometry, 1.17, 0.9), sumFace, 0, 0, 0.062);
  const SUMROW = [0.17, -0.07, -0.31];

  const slot = new THREE.Vector3();
  const lifted = new THREE.Vector3();
  const target = new THREE.Vector3();
  const sumPos = new THREE.Vector3();
  const base = new THREE.Color(HEX.paper);
  const warm = new THREE.Color(HEX.warm);
  const indigo = new THREE.Color(HEX.indigo);

  function apply(p, time) {
    const f = (i, a) => Math.sin(time * 1.2 + i * 1.9) * a;
    spin.rotation.set(0, 0.42 - p * 0.22 + f(0, 0.015), 0);

    // B1: the checklist card turns to face you and its four boxes pop in
    const c1 = seg(p, B1[0], B1[0] + 0.1);
    card.rotation.set(0, lerp(0.5, 0.22, c1), lerp(0.06, 0, c1));
    card.position.y = -0.12 + f(1, 0.03);
    boxes.forEach((b, k) => {
      const s = backOut(range(p, B1[0] + 0.06 + k * 0.045, B1[0] + 0.12 + k * 0.045));
      b.g.scale.setScalar(Math.max(0.001, s));
      b.g.visible = s > 0.001;
    });

    // B2: the light sweeps down; each clause lifts out as it passes
    const sweep = range(p, B2[0], B2[1] - 0.03);
    const lv = bump(range(p, B2[0] - 0.01, B2[1] - 0.01));
    const ly = lerp(ROWS[0] + 0.3, ROWS[4] - 0.3, sweep);
    slabToSpin(0, ly, SD / 2 + 0.12, light.position);
    light.rotation.x = LEAN;
    light.scale.set(1, 1, 1).multiplyScalar(Math.max(0.001, lv));
    light.visible = lv > 0.01;
    beam.material.opacity = 0.2 * lv;

    // checklist marks follow the reading
    boxes.forEach((b, k) => {
      const m = range(p, B2[0] + 0.04 + k * 0.06, B2[0] + 0.08 + k * 0.06);
      b.mat.color.copy(warm).lerp(b.risk ? AMBER : indigo, m);
      b.mark.material.opacity = 1;
      b.mark.scale.setScalar(Math.max(0.001, m));
    });

    // B3: the summary card grows in front
    const sc = backOut(range(p, B3[0] - 0.02, B3[0] + 0.06));
    sum.scale.setScalar(Math.max(0.001, sc));
    sum.visible = sc > 0.001;
    sum.position.y = -0.55 + f(2, 0.025);
    sum.rotation.set(-0.08, lerp(-0.6, -0.3, clamp(sc)), 0);

    let gather = 0;
    clauses.forEach((c) => {
      const y = ROWS[c.i];
      slabToSpin(0, y, SD / 2 + 0.045, slot);
      const t0 = B2[0] + 0.02 + c.i * 0.045; // when the light reaches this row
      const k = range(p, t0, t0 + 0.06);
      const risky = c.kind !== "ok";
      // fine clauses lift out and settle back with a tick; risky ones stay out
      const out = risky ? backOut(k) : bump(k) * 1.0 + 0;
      slabToSpin(risky ? 0.12 : 0, y, SD / 2 + 0.045 + 0.32 * out, lifted);
      if (!risky && k >= 1) lifted.copy(slot);

      let pos = lifted;
      let s = 1;
      let rotY = risky ? 0.1 * clamp(k) : 0;
      if (risky) {
        const order = gather++;
        const h = seg(p, B3[0] + 0.02 + order * 0.04, B3[0] + 0.12 + order * 0.04);
        sumPos.set(-0.04, SUMROW[order], 0.1).applyEuler(sum.rotation).add(sum.position);
        target.lerpVectors(lifted, sumPos, h);
        target.y += bump(h) * 0.2;
        target.z += bump(h) * 0.7; // arc out in front, never through the card
        pos = target;
        s = lerp(1, 0.76, h);
        rotY = lerp(rotY, sum.rotation.y, h);
      }
      c.g.position.copy(pos);
      c.g.rotation.set(LEAN * (1 - (risky ? seg(p, B3[0] + 0.05, B3[0] + 0.25) : 0)) + (risky ? -0.08 * seg(p, B3[0] + 0.05, B3[0] + 0.25) : 0), rotY, 0);
      c.g.scale.setScalar(s);

      if (c.kind === "missing") {
        c.dash.material.opacity = clamp(k * 1.4);
        return;
      }
      if (c.kind === "risk") {
        c.mat.color.copy(base).lerp(AMBER, k);
        c.mat.emissive.copy(AMBER).multiplyScalar(0.25 * k);
      }
      c.badge.scale.setScalar(Math.max(0.001, backOut(range(k, 0.4, 1))));
    });
  }

  for (const o of [card, sum, light, ...clauses.map((c) => c.g)]) o.traverse((m) => (m.userData.noShadow = true));
  apply(0, 0);
  return { group: root, radius: 1.85, floorY: FLOOR, lift: -0.15, elev: 0.2, fill: 0.95, apply };
}
