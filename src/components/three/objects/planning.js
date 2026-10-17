// Planning-agent: a ceramic roster board with a recessed grid. Rule tiles (time, person, skill, car)
// line up beside it, roster blocks drop and click into the grid, then one block turns amber, lifts out,
// and its neighbours shift over; a tick badge shows the new plan is ready for approval.
import * as THREE from "three";
import { HEX, AMBER, CSS, rrect, extrude, rbox, put, group, memo, G, seg, range, lerp, bump, backOut, tick, canvasTexture, faceMat, tintable } from "../kit.js";
import { BEATS } from "../beats.js";

const [B1, B2, B3] = BEATS;
const FLOOR = -1.25;
const COLS = 5;
const ROWS = 4;
const PX = 0.52; // cell pitch
const PY = 0.5;
const CW = 0.46; // recess size
const CH = 0.44;
const GX = 0.12; // grid centre on the board face
const GY = -0.16;
const BW = 3.1; // board size
const BH = 2.62;
const BD = 0.22;
const FZ = BD / 2; // board face z

const cellX = (c) => GX + (c - (COLS - 1) / 2) * PX;
const cellY = (r) => GY + ((ROWS - 1) / 2 - r) * PY;

// The roster: 0 empty, 1 indigo, 2 light indigo, 3 warm grey. Row 1, col 1 is the block that drops out;
// the two to its right shift left to close the gap.
const PLAN = [
  [1, 2, 1, 3, 1],
  [3, 1, 2, 1, 0],
  [2, 3, 1, 2, 3],
  [1, 0, 3, 1, 2],
];
const SICK = [1, 1];

function boardShape() {
  const s = rrect(new THREE.Shape(), BW, BH, 0.3);
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    // a rounded hole at the cell centre (rrect only draws around the origin)
    const x = cellX(c) - CW / 2;
    const y = cellY(r) - CH / 2;
    const q = 0.08;
    const h = new THREE.Path();
    h.moveTo(x + q, y);
    h.lineTo(x + CW - q, y);
    h.absarc(x + CW - q, y + q, q, -Math.PI / 2, 0, false);
    h.lineTo(x + CW, y + CH - q);
    h.absarc(x + CW - q, y + CH - q, q, 0, Math.PI / 2, false);
    h.lineTo(x + q, y + CH);
    h.absarc(x + q, y + CH - q, q, Math.PI / 2, Math.PI, false);
    h.lineTo(x, y + q);
    h.absarc(x + q, y + q, q, Math.PI, Math.PI * 1.5, false);
    s.holes.push(h);
  }
  return s;
}

// Header pips over the columns and a person mark at each row: a roster without words.
const faceTexture = () =>
  canvasTexture(1024, 780, (g, w, h) => {
    const sx = w / BW;
    const sy = h / BH;
    const X = (x) => (x + BW / 2) * sx;
    const Y = (y) => (BH / 2 - y) * sy;
    for (let c = 0; c < COLS; c++) {
      const x = X(cellX(c));
      const y = Y(GY + (ROWS / 2) * PY + 0.17);
      g.fillStyle = CSS.soft;
      g.beginPath();
      g.roundRect(x - 62, y - 26, 124, 52, 26);
      g.fill();
      g.fillStyle = CSS.indigo;
      for (let k = 0; k <= c; k++) {
        g.beginPath();
        g.arc(x - c * 10 + k * 20, y, 6.5, 0, Math.PI * 2);
        g.fill();
      }
    }
    for (let r = 0; r < ROWS; r++) {
      const x = X(GX - (COLS / 2) * PX - 0.14);
      const y = Y(cellY(r));
      g.fillStyle = CSS.line;
      g.beginPath();
      g.arc(x, y - 12, 11, 0, Math.PI * 2);
      g.fill();
      g.beginPath();
      g.ellipse(x, y + 16, 18, 13, 0, Math.PI, 0);
      g.fill();
    }
  });

function icon(kind) {
  return canvasTexture(256, 256, (g) => {
    g.strokeStyle = CSS.indigo;
    g.fillStyle = CSS.indigo;
    g.lineCap = "round";
    g.lineJoin = "round";
    g.translate(128, 128);
    if (kind === 0) {
      // clock
      g.lineWidth = 20;
      g.beginPath();
      g.arc(0, 0, 74, 0, Math.PI * 2);
      g.stroke();
      g.lineWidth = 18;
      g.beginPath();
      g.moveTo(0, 6);
      g.lineTo(0, -44);
      g.moveTo(0, 6);
      g.lineTo(34, 26);
      g.stroke();
    } else if (kind === 1) {
      // person
      g.beginPath();
      g.arc(0, -36, 36, 0, Math.PI * 2);
      g.fill();
      g.beginPath();
      g.ellipse(0, 62, 66, 48, 0, Math.PI, 0);
      g.fill();
    } else if (kind === 2) {
      // wrench
      g.rotate(-Math.PI / 4);
      g.lineWidth = 34;
      g.beginPath();
      g.moveTo(0, -20);
      g.lineTo(0, 78);
      g.stroke();
      g.beginPath();
      g.arc(0, -48, 44, 0, Math.PI * 2);
      g.fill();
      g.globalCompositeOperation = "destination-out";
      g.fillRect(-16, -100, 32, 54);
    } else {
      // car
      g.beginPath();
      g.roundRect(-92, -14, 184, 58, 22);
      g.fill();
      g.beginPath();
      g.moveTo(-54, -10);
      g.lineTo(-32, -60);
      g.lineTo(34, -60);
      g.lineTo(58, -10);
      g.closePath();
      g.fill();
      g.fillStyle = "#ffffff";
      g.beginPath();
      g.moveTo(-34, -18);
      g.lineTo(-20, -46);
      g.lineTo(22, -46);
      g.lineTo(36, -18);
      g.closePath();
      g.fill();
      for (const x of [-50, 50]) {
        g.fillStyle = CSS.indigo;
        g.beginPath();
        g.arc(x, 46, 26, 0, Math.PI * 2);
        g.fill();
        g.fillStyle = "#ffffff";
        g.beginPath();
        g.arc(x, 46, 10, 0, Math.PI * 2);
        g.fill();
      }
    }
  });
}

const badgeTexture = () =>
  canvasTexture(256, 256, (g) => {
    tick(g, 70, 132, 116, "#ffffff", 30);
  });

export async function build({ M }) {
  const root = new THREE.Group();
  const spin = group(root, 0, 0, 0);

  // ------------------------------------------------ the board, leaning back on two feet
  const stand = group(spin, 0.32, FLOOR, 0);
  put(stand, rbox(0.5, 0.1, 0.62, 0.045), M.warm, -0.95, 0.05, 0);
  put(stand, rbox(0.5, 0.1, 0.62, 0.045), M.warm, 0.95, 0.05, 0);
  const board = group(stand, 0, 0.1 + BH / 2 - 0.02, -0.02);
  board.rotation.x = -0.12;
  put(board, memo("pl:board", () => extrude(boardShape(), BD, 0.04, 10)), M.ceramic);
  // a flat cap over the front: the extrusion smooths its normals into the bevel, which shades the face unevenly
  put(board, memo("pl:cap", () => new THREE.ShapeGeometry(boardShape(), 10)), M.ceramic, 0, 0, FZ + 0.0015);
  put(board, rbox(BW - 0.2, BH - 0.2, 0.06, 0.03), M.warmDark, 0, 0, -0.06); // recess floor seen through the holes
  put(board, G(THREE.PlaneGeometry, BW, BH), faceMat(faceTexture()), 0, 0, FZ + 0.004);

  // ------------------------------------------------ the roster blocks
  const mats = { 1: M.indigo, 2: new THREE.MeshPhysicalMaterial({ color: HEX.indigoSoft, roughness: 0.32, clearcoat: 1, clearcoatRoughness: 0.06 }), 3: M.warm };
  const sickMat = tintable(HEX.indigoSoft);
  const blockGeo = rbox(CW - 0.04, CH - 0.04, 0.2, 0.08, 4);
  const blocks = [];
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    const v = PLAN[r][c];
    if (!v) continue;
    const sick = r === SICK[0] && c === SICK[1];
    const g = group(board);
    const mesh = put(g, blockGeo, sick ? sickMat : mats[v]);
    // a seeded, fixed drop order so the fill looks scattered rather than row by row
    blocks.push({ g, mesh, r, c, sick, k: ((r * 7 + c * 3) % 17) / 17 });
  }
  const rankd = [...blocks].sort((a, b) => a.k - b.k);
  rankd.forEach((b, i) => (b.i = i / (rankd.length - 1)));

  // ------------------------------------------------ the rule tiles
  const tiles = [0, 1, 2, 3].map((k) => {
    const g = group(spin);
    put(g, rbox(0.5, 0.5, 0.14, 0.11, 4), M.ceramic);
    put(g, G(THREE.PlaneGeometry, 0.34, 0.34), faceMat(icon(k)), 0, 0, 0.072);
    const dot = put(g, G(THREE.SphereGeometry, 0.045, 16, 12), M.indigo, 0.19, 0.19, 0.06);
    return { g, dot };
  });
  // loose start scatter and the neat column they line up into
  const LOOSE = [
    [-1.95, 0.95, 0.35, 0.3, -0.35, 0.18],
    [-1.55, 0.25, 0.6, -0.2, 0.4, -0.22],
    [-2.0, -0.35, 0.45, 0.25, -0.3, 0.3],
    [-1.6, -0.95, 0.75, -0.15, 0.35, -0.12],
  ];

  // ------------------------------------------------ the approval badge
  const badge = group(board, BW / 2 - 0.14, BH / 2 - 0.14, FZ + 0.08);
  const disc = put(badge, G(THREE.CylinderGeometry, 0.22, 0.22, 0.1, 40), M.indigo);
  disc.rotation.x = Math.PI / 2;
  put(badge, G(THREE.CircleGeometry, 0.17, 32), faceMat(badgeTexture()), 0, 0, 0.052);

  const base = new THREE.Color(HEX.indigoSoft);

  function apply(p, time) {
    const f = (i, a) => Math.sin(time * 1.2 + i * 1.9) * a;
    spin.rotation.set(0, 0.22 - p * 0.14 + f(0, 0.015), 0);

    // B1: the rules line up beside the board, one after another
    tiles.forEach((t, i) => {
      const k = seg(p, B1[0] + i * 0.05, B1[0] + 0.13 + i * 0.05);
      const L = LOOSE[i];
      // aligned to the board's rows, in board space mapped to world (board leans back slightly)
      const tx = -1.68;
      const ty = FLOOR + 0.1 + BH / 2 + cellY(i) - 0.02;
      t.g.position.set(lerp(L[0], tx, k), lerp(L[1], ty, k) + f(i + 1, 0.035) * (1 - k), lerp(L[2], 0.32, k));
      t.g.rotation.set(lerp(L[3], -0.1, k), lerp(L[4], 0.1, k), lerp(L[5], 0, k));
      t.dot.scale.setScalar(backOut(range(p, B1[0] + 0.1 + i * 0.05, B1[0] + 0.16 + i * 0.05)));
    });

    // B2: blocks drop from just above their cell and click into the recess
    const sickLift = seg(p, B3[0] + 0.05, B3[0] + 0.17);
    const shift = seg(p, B3[0] + 0.13, B3[0] + 0.22);
    blocks.forEach((b) => {
      const a = B2[0] + b.i * 0.2;
      const d = range(p, a, a + 0.08);
      b.g.visible = d > 0.001;
      if (!b.g.visible) return;
      const fall = backOut(d);
      const click = bump(range(p, a + 0.07, a + 0.1));
      let x = cellX(b.c);
      let y = cellY(b.r) + (1 - Math.min(1, fall)) * 0.55;
      let z = lerp(0.5, 0.1, range(d, 0.55, 1)) - click * 0.04;
      let s = Math.min(1, range(d, 0, 0.45) * 1.0);
      b.mesh.scale.set(1 + click * 0.06, 1 - click * 0.08, 1);
      if (b.sick) {
        // B3: turns amber, lifts out of its cell and settles on the floor beside the board
        const am = range(p, B3[0] + 0.01, B3[0] + 0.06);
        sickMat.color.copy(base).lerp(AMBER, am);
        const pop = bump(range(p, B3[0] + 0.02, B3[0] + 0.06)) * 0.05;
        // first straight out of the cell towards you, then over to the floor
        const out = range(sickLift, 0, 0.35);
        const go = range(sickLift, 0.25, 1);
        z += pop + lerp(0, 0.6, out) + lerp(0, 0.15, go);
        x = lerp(x, cellX(COLS - 1) + 0.18, go);
        y = lerp(y, -BH / 2 - 0.02, go) + out * 0.08 + bump(go) * 0.3;
        b.g.rotation.set(lerp(0, 0.25, sickLift), lerp(0, -0.45, sickLift), lerp(0, -0.18, sickLift));
        s *= lerp(1, 0.92, sickLift);
      } else if (b.r === SICK[0] && b.c > SICK[1]) {
        // the neighbours to its right slide one cell over to fill the gap
        x -= PX * shift;
        z += bump(shift) * 0.12;
      }
      b.g.position.set(x, y, z);
      b.g.scale.setScalar(s);
    });

    // the tick badge: the change is ready for approval
    const bk = range(p, B3[0] + 0.21, B3[0] + 0.27);
    badge.scale.setScalar(backOut(bk));
    badge.visible = bk > 0.001;
  }

  for (const t of tiles) t.g.traverse((m) => (m.userData.noShadow = true));
  badge.traverse((m) => (m.userData.noShadow = true));
  apply(0, 0);
  return { group: root, radius: 2.3, floorY: FLOOR, lift: 0.0, elev: 0.2, fill: 0.95, apply };
}
