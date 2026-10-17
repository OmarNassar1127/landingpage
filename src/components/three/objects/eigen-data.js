// AI op je eigen data: a rack of spreadsheet slabs fans out and connects read-only to a chart base;
// a question arrives, rows lift out of the sheets and condense into bars; the chart and its answer
// settle as a weekly report with a calendar badge.
import * as THREE from "three";
import { HEX, CSS, rbox, put, group, G, seg, range, lerp, clamp, bump, backOut, tick, canvasTexture, faceMat, linesTexture } from "../kit.js";
import { BEATS } from "../beats.js";

const [B1, B2, B3] = BEATS;
const FLOOR = -1.1;
const SW = 1.25; // slab width
const SH = 1.2; // slab height
const CX = 0.78;
const CZ = -0.3; // chart base centre x
const HEIGHTS = [1.15, 1.5, 0.6, 1.0]; // final bar heights; the short amber one is the answer
const BAR_X = [-0.51, -0.17, 0.17, 0.51];

const gridTexture = () =>
  canvasTexture(384, 276, (g, w, h) => {
    g.fillStyle = CSS.paper;
    g.fillRect(0, 0, w, h);
    const cols = 4;
    const rows = 6;
    const cw = w / cols;
    const rh = h / rows;
    g.fillStyle = "#c7c4f7";
    g.fillRect(0, 0, w, rh);
    g.fillStyle = CSS.soft;
    for (let r = 1; r < rows; r++) g.fillRect(0, r * rh, cw, rh);
    g.strokeStyle = CSS.line;
    g.lineWidth = 4;
    for (let c = 1; c < cols; c++) {
      g.beginPath();
      g.moveTo(c * cw, 0);
      g.lineTo(c * cw, h);
      g.stroke();
    }
    for (let r = 1; r < rows; r++) {
      g.beginPath();
      g.moveTo(0, r * rh);
      g.lineTo(w, r * rh);
      g.stroke();
    }
    // a few filled cells as values, fixed pattern
    g.fillStyle = CSS.line;
    [[1, 1, 0.6], [2, 1, 0.4], [3, 1, 0.7], [1, 2, 0.5], [2, 2, 0.7], [3, 2, 0.3], [1, 3, 0.7], [2, 3, 0.5], [3, 3, 0.6], [1, 4, 0.4], [2, 4, 0.6], [3, 4, 0.5], [1, 5, 0.6], [2, 5, 0.3], [3, 5, 0.7]].forEach(([c, r, f]) =>
      g.fillRect(c * cw + 14, r * rh + rh / 2 - 6, (cw - 28) * f, 12),
    );
  });

const eyeTexture = () =>
  canvasTexture(256, 256, (g) => {
    g.translate(128, 128);
    g.fillStyle = "#ffffff";
    g.beginPath();
    g.moveTo(-86, 0);
    g.quadraticCurveTo(0, -78, 86, 0);
    g.quadraticCurveTo(0, 78, -86, 0);
    g.fill();
    g.fillStyle = CSS.indigo;
    g.beginPath();
    g.arc(0, 0, 30, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = "#ffffff";
    g.beginPath();
    g.arc(10, -10, 9, 0, Math.PI * 2);
    g.fill();
  });

const questionTexture = (font) =>
  canvasTexture(512, 280, (g) => {
    g.fillStyle = CSS.soft;
    g.beginPath();
    g.arc(100, 140, 62, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = CSS.indigo;
    g.font = `800 92px ${font}`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText("?", 100, 146);
    g.fillStyle = CSS.line;
    g.fillRect(196, 96, 270, 24);
    g.fillRect(196, 160, 190, 24);
  });

const answerTexture = () =>
  canvasTexture(512, 280, (g) => {
    g.fillStyle = CSS.indigo;
    g.beginPath();
    g.arc(100, 140, 62, 0, Math.PI * 2);
    g.fill();
    tick(g, 70, 142, 60, "#ffffff", 16);
    g.fillStyle = CSS.line;
    g.fillRect(196, 96, 270, 24);
    g.fillRect(196, 160, 190, 24);
  });

const calendarTexture = () =>
  canvasTexture(256, 256, (g) => {
    g.fillStyle = CSS.paper;
    g.fillRect(0, 0, 256, 256);
    g.fillStyle = CSS.indigo;
    g.fillRect(0, 0, 256, 70);
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 4; c++) {
        g.fillStyle = r === 1 && c === 2 ? CSS.indigo : CSS.line;
        g.fillRect(26 + c * 54, 92 + r * 52, 36, 34);
      }
  });

export async function build({ M, font }) {
  const root = new THREE.Group();
  const spin = group(root, -0.02, 0, 0);

  // ------------------------------------------------ the data: spreadsheet slabs in a tray
  const rack = group(spin, -1.0, FLOOR, 0.4);
  put(rack, rbox(1.44, 0.14, 0.82, 0.06), M.warm, 0, 0.07, 0);
  const grid = faceMat(gridTexture());
  const slabs = [0, 1, 2].map((i) => {
    const pivot = group(rack, 0, 0.12, 0.22 - i * 0.2);
    const s = group(pivot);
    put(s, rbox(SW, SH, 0.08, 0.04), M.paper, 0, SH / 2, 0);
    put(s, G(THREE.PlaneGeometry, SW - 0.08, SH - 0.08), grid, 0, SH / 2, 0.042);
    return { pivot, s, i };
  });

  // read-only: an eye badge on the front sheet
  const eye = group(rack, 0.5, 0.12 + SH, 0.32);
  const eyeDisc = put(eye, G(THREE.CylinderGeometry, 0.2, 0.2, 0.08, 40), M.indigo);
  eyeDisc.rotation.x = Math.PI / 2;
  put(eye, G(THREE.CircleGeometry, 0.17, 32), faceMat(eyeTexture()), 0, 0, 0.042);

  // the one-way link from the data to the chart
  const link = group(spin, -0.24, FLOOR + 0.1, 0.42);
  link.rotation.y = 0.5;
  const linkBar = put(link, rbox(0.62, 0.1, 0.1, 0.045), M.indigo, 0.31, 0, 0);
  const arrow = put(link, G(THREE.ConeGeometry, 0.11, 0.2, 24), M.indigo, 0.66, 0, 0);
  arrow.rotation.z = -Math.PI / 2;

  // ------------------------------------------------ the chart: indigo bars on a ceramic base
  const chart = group(spin, CX, FLOOR, CZ);
  put(chart, rbox(1.5, 0.2, 0.92, 0.08), M.ceramic, 0, 0.1, 0);
  const bars = HEIGHTS.map((h, k) => {
    const b = group(chart, BAR_X[k], 0.2, 0);
    put(b, rbox(0.26, h, 0.3, 0.06), k === 2 ? M.amber : M.indigo, 0, h / 2, 0);
    return b;
  });

  // rows that lift out of the sheets and fly into the bars
  const rows = HEIGHTS.map((h, k) => {
    const r = group(spin);
    put(r, rbox(0.5, 0.13, 0.08, 0.04), k === 2 ? M.amber : M.indigo);
    return r;
  });

  // ------------------------------------------------ the question card that turns into the answer
  const card = group(spin);
  put(card, rbox(1.0, 0.56, 0.08, 0.07), M.paper);
  const qFace = put(card, G(THREE.PlaneGeometry, 0.94, 0.51), faceMat(questionTexture(font)), 0, 0, 0.042);
  const aFace = put(card, G(THREE.PlaneGeometry, 0.94, 0.51), faceMat(answerTexture(), { opacity: 0 }), 0, 0, 0.043);

  // ------------------------------------------------ the weekly report board that folds up behind the chart
  const hinge = group(chart, 0, 0.02, -0.52);
  const board = group(hinge);
  put(board, rbox(1.74, 2.3, 0.06, 0.06), M.paper, 0, 1.15, 0);
  put(board, G(THREE.PlaneGeometry, 1.62, 0.3), faceMat(linesTexture({ w: 512, h: 96, rows: [], head: CSS.indigo, bg: null, pad: 30, thick: 22 })), 0, 2.06, 0.032);
  const cal = group(chart, 0.62, 2.36, -0.42);
  put(cal, rbox(0.46, 0.46, 0.1, 0.06), M.ceramic);
  put(cal, G(THREE.PlaneGeometry, 0.38, 0.38), faceMat(calendarTexture()), 0, 0, 0.052);

  const tmp = new THREE.Vector3();
  const from = new THREE.Vector3();
  const to = new THREE.Vector3();
  const askAt = new THREE.Vector3(-0.2, 1.15, 0.7);
  const dockAt = new THREE.Vector3(CX - 0.28, 0.86, CZ - 0.22);

  function apply(p, time) {
    const f = (i, a) => Math.sin(time * 1.2 + i * 1.9) * a;
    spin.rotation.set(0, -0.22 + p * 0.12 + f(0, 0.02), 0);

    // B1: the sheets fan out, the eye badge pops on, the link grows to the chart
    const fan = seg(p, B1[0], B1[0] + 0.16);
    slabs.forEach(({ pivot, s, i }) => {
      pivot.position.x = lerp(i * 0.06, i * 0.1, fan);
      pivot.position.y = 0.12 + i * 0.06;
      s.rotation.x = -lerp(0.04, 0.1, fan) * i;
      s.rotation.z = -lerp(0.03, 0.2, fan) * i;
    });
    const e = backOut(range(p, B1[0] + 0.1, B1[0] + 0.2));
    eye.scale.setScalar(Math.max(0.0001, e));
    eye.position.y = 0.12 + SH - 0.02 + f(2, 0.03);
    const l = seg(p, B1[0] + 0.14, B1[1] - 0.02);
    link.visible = l > 0.001;
    linkBar.scale.x = Math.max(0.001, l);
    linkBar.position.x = 0.31 * l;
    arrow.position.x = 0.62 * l + 0.04;
    arrow.scale.setScalar(range(l, 0.2, 0.6));

    // B2: a question card grows in; rows lift out of the front sheet and condense into bars
    const q = backOut(range(p, B2[0], B2[0] + 0.07));
    const settle = seg(p, B3[0] + 0.02, B3[0] + 0.16);
    card.visible = q > 0.001;
    card.position.lerpVectors(askAt, dockAt, settle);
    card.position.y += f(4, 0.04) * (1 - settle);
    card.rotation.set(lerp(-0.1, 0, settle), lerp(0.35, 0.12, settle), lerp(0.04, 0, settle));
    card.scale.setScalar(Math.max(0.0001, q) * lerp(1, 0.86, settle));
    const flip = range(p, B3[0], B3[0] + 0.06);
    qFace.material.opacity = 1 - flip;
    aFace.material.opacity = flip;

    rows.forEach((r, k) => {
      const t0 = B2[0] + 0.06 + k * 0.045;
      const u = range(p, t0, t0 + 0.12);
      const grow = range(p, t0 + 0.08, t0 + 0.15);
      bars[k].scale.y = lerp(0.34, 1, seg(grow, 0, 1));
      r.visible = u > 0.001 && u < 0.999;
      if (!r.visible) return;
      // start: a row on the front sheet; end: the top of its bar
      from.set(-1.0, FLOOR + 0.12 + 0.95 - k * 0.17, 0.67);
      to.set(CX + BAR_X[k], FLOOR + 0.2 + HEIGHTS[k] * 0.6, CZ);
      const k1 = seg(u, 0, 1);
      tmp.lerpVectors(from, to, k1);
      tmp.y += bump(u) * 0.95;
      tmp.z += bump(u) * 0.45;
      r.position.copy(tmp);
      const grown = range(u, 0, 0.15);
      const shrink = range(u, 0.75, 1);
      r.scale.set(lerp(1, 0.38, k1) * grown * (1 - 0.6 * shrink), grown * (1 - 0.6 * shrink), grown);
      r.rotation.set(0, lerp(0.15, -0.1, k1), lerp(0, -0.4 + k * 0.15, bump(u)));
    });

    // B3: the report board folds up behind the chart, the calendar badge pops on
    const fold = seg(p, B3[0] + 0.04, B3[0] + 0.2);
    hinge.visible = fold > 0.001;
    hinge.rotation.x = lerp(-Math.PI / 2, 0, fold);
    hinge.scale.setScalar(Math.max(0.0001, lerp(0.4, 1, fold)));
    const c = backOut(range(p, B3[0] + 0.16, B3[0] + 0.24));
    cal.visible = c > 0.001;
    cal.scale.setScalar(Math.max(0.0001, c));
    cal.rotation.set(0, -0.1, lerp(0.3, 0.06, clamp(c)));
    cal.position.y = 2.36 + f(6, 0.02);
  }

  for (const o of [eye, card, cal, board, ...rows]) o.traverse((m) => (m.userData.noShadow = true));
  apply(0, 0);
  return { group: root, radius: 1.95, floorY: FLOOR, lift: -0.3, elev: 0.22, fill: 0.95, apply };
}
