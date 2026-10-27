// Eigen bedrijfs-AI: a ceramic server plinth whose status lights come on while three document stacks
// settle on it and a work badge signs in; glass shields with locks rise in front of the salary and the
// board stack; a question sends two beams: one reaches the open stack, the other stops at a shield with
// a pink flash, and a log card records both.
import * as THREE from "three";
import { HEX, INDIGO, CSS, rbox, put, group, G, range, lerp, seg, bump, backOut, canvasTexture, faceMat, tintable, linesTexture } from "../kit.js";
import { BEATS } from "../beats.js";

const [B1, B2, B3] = BEATS;
const FLOOR = -1.15;
const SH = FLOOR + 0.4; // plinth top
const UP = new THREE.Vector3(0, 1, 0);
const PINK = new THREE.Color(0xec4899);
const PINK_CSS = "#ec4899";

const questionTexture = (font) =>
  canvasTexture(256, 192, (g) => {
    g.fillStyle = "#ffffff";
    g.font = `800 150px ${font}`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText("?", 128, 104);
  });

const badgeTexture = () =>
  canvasTexture(256, 360, (g) => {
    g.fillStyle = CSS.paper;
    g.fillRect(0, 0, 256, 360);
    g.fillStyle = CSS.indigo;
    g.fillRect(0, 0, 256, 54);
    g.beginPath();
    g.arc(128, 150, 54, 0, Math.PI * 2);
    g.fillStyle = "#c7c4f7";
    g.fill();
    g.fillStyle = CSS.line;
    g.fillRect(54, 238, 148, 20);
    g.fillRect(80, 276, 96, 16);
  });

const logTexture = () =>
  canvasTexture(512, 320, (g) => {
    g.fillStyle = CSS.indigo;
    g.fillRect(40, 40, 120, 22);
    [
      ["#10b981", 0.74],
      [PINK_CSS, 0.6],
      ["#10b981", 0.68],
    ].forEach(([c, r], i) => {
      const y = 112 + i * 64;
      g.beginPath();
      g.arc(54, y + 10, 13, 0, Math.PI * 2);
      g.fillStyle = c;
      g.fill();
      g.fillStyle = CSS.line;
      g.fillRect(84, y, 388 * r, 20);
    });
  });

// The stacks: the open handbook, the salary files, the board notes.
const STACKS = [
  { x: -0.82, n: 7, hex: HEX.paper, tab: HEX.indigo },
  { x: 0.02, n: 6, hex: HEX.paper, tab: HEX.warmDark },
  { x: 0.86, n: 5, hex: HEX.paper, tab: HEX.ink },
];
const SHIELDED = [1, 2];
const SHEET = { w: 0.62, h: 0.07, d: 0.78, gap: 0.088 };

const tmpDir = new THREE.Vector3();
function span(mesh, a, b, k = 1) {
  tmpDir.subVectors(b, a);
  const len = tmpDir.length();
  mesh.position.copy(a).addScaledVector(tmpDir, k / 2);
  mesh.quaternion.setFromUnitVectors(UP, tmpDir.normalize());
  mesh.scale.set(1, Math.max(1e-4, len * k), 1);
}

export async function build({ M, font }) {
  const root = new THREE.Group();
  const spin = group(root, 0.1, 0, 0);

  // ------------------------------------------------ the plinth: the office's own server, with status lights
  put(spin, rbox(2.86, 0.34, 1.16, 0.1), M.ceramic, 0, FLOOR + 0.23, 0);
  put(spin, rbox(2.66, 0.08, 1.02, 0.03), M.warm, 0, FLOOR + 0.04, 0);
  put(spin, rbox(1.0, 0.1, 0.02, 0.02), M.warm, -0.8, FLOOR + 0.23, 0.581);
  const leds = [0, 1, 2].map((i) => {
    const mat = new THREE.MeshBasicMaterial({ color: HEX.warmDark, toneMapped: false });
    const m = put(spin, G(THREE.CylinderGeometry, 0.04, 0.04, 0.03, 20), mat, 0.7 + i * 0.16, FLOOR + 0.23, 0.58);
    m.rotation.x = Math.PI / 2;
    return mat;
  });

  // ------------------------------------------------ the document stacks
  const topMat = faceMat(linesTexture({ w: 320, h: 400, rows: [0.8, 0.6, 0.74, 0.52, 0.66], head: CSS.ink, pad: 34, thick: 18 }));
  const stacks = STACKS.map((s, i) => {
    const g = group(spin, s.x, SH, -0.12);
    const mat = tintable(s.hex);
    const sheets = [];
    for (let k = 0; k < s.n; k++) {
      const sh = put(g, rbox(SHEET.w, SHEET.h, SHEET.d, 0.015), mat, 0, SHEET.gap * k + SHEET.h / 2, 0);
      sh.rotation.y = (k % 2 ? 1 : -1) * 0.035 * (k + 1);
      sheets.push(sh);
    }
    const topY = SHEET.gap * (s.n - 1) + SHEET.h + 0.002;
    // the top page and a coloured tab that marks whose stack it is ride on the top sheet
    const cap = group(g);
    const face = put(cap, G(THREE.PlaneGeometry, SHEET.w * 0.84, SHEET.d * 0.84), topMat, 0, topY, 0);
    face.rotation.x = -Math.PI / 2;
    put(cap, rbox(0.2, 0.03, 0.12, 0.012), new THREE.MeshPhysicalMaterial({ color: s.tab, roughness: 0.35, clearcoat: 1 }), -0.16, topY - 0.02, SHEET.d / 2 + 0.03);
    return { ...s, i, g, mat, sheets, cap, topY, base: new THREE.Color(s.hex) };
  });

  // ------------------------------------------------ the shields: glass panels with a lock, one per closed stack
  const shields = SHIELDED.map((si) => {
    const s = stacks[si];
    const g = group(spin, s.x, SH, 0.4);
    const inner = group(g);
    put(inner, rbox(0.76, 0.96, 0.04, 0.03), M.glass, 0, 0.48, 0);
    put(inner, rbox(0.76, 0.05, 0.06, 0.02), M.indigo, 0, 0.96, 0);
    const lock = group(inner, 0, 0.7, 0.05);
    const body = tintable(HEX.indigo);
    put(lock, rbox(0.2, 0.16, 0.07, 0.03), body, 0, 0, 0);
    const shackle = put(lock, G(THREE.TorusGeometry, 0.058, 0.017, 12, 24, Math.PI), M.steel, 0, 0.075, 0);
    shackle.scale.y = 1.25;
    put(lock, G(THREE.CylinderGeometry, 0.02, 0.02, 0.02, 16), M.white, 0, -0.01, 0.036).rotation.x = Math.PI / 2;
    return { g, inner, lock, body, si };
  });

  // ------------------------------------------------ the badge: someone signs in with a work account
  const badge = group(spin, -1.72, FLOOR + 0.02, 0.62);
  const badgeIn = group(badge);
  put(badgeIn, rbox(0.46, 0.64, 0.05, 0.05), M.ceramic, 0, 0.32, 0);
  put(badgeIn, G(THREE.PlaneGeometry, 0.4, 0.56), faceMat(badgeTexture()), 0, 0.32, 0.027);
  put(badgeIn, rbox(0.12, 0.04, 0.06, 0.02), M.steel, 0, 0.66, 0);
  badge.rotation.y = 0.4;

  // ------------------------------------------------ the question and its two beams
  const bubble = group(spin, -1.22, 1.04, 1.0);
  const bub = group(bubble);
  put(bub, rbox(0.66, 0.48, 0.2, 0.17, 5), M.indigo);
  put(bub, G(THREE.ConeGeometry, 0.09, 0.22, 20), M.indigo, -0.18, -0.28, 0).rotation.z = Math.PI + 0.5;
  put(bub, G(THREE.PlaneGeometry, 0.36, 0.28), faceMat(questionTexture(font)), 0, 0, 0.102);

  const beamGeo = G(THREE.CylinderGeometry, 0.1, 0.022, 1, 28, 1, true);
  const additive = (color) => ({ color, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false });
  const beams = [HEX.indigo, 0xec4899].map((c) => {
    const mat = new THREE.MeshBasicMaterial({ ...additive(c), side: THREE.DoubleSide });
    const mesh = put(spin, beamGeo, mat);
    const spot = put(spin, G(THREE.CircleGeometry, 0.15, 32), new THREE.MeshBasicMaterial(additive(c)));
    return { mesh, mat, spot };
  });

  // ------------------------------------------------ the log card
  const card = group(spin, 0.78, 1.18, 0.9);
  const cardIn = group(card);
  put(cardIn, rbox(1.1, 0.7, 0.1, 0.08), M.ceramic);
  put(cardIn, G(THREE.PlaneGeometry, 1.02, 0.64), faceMat(logTexture()), 0, 0, 0.052);

  const a = new THREE.Vector3();
  const t0 = new THREE.Vector3();
  const t1 = new THREE.Vector3();

  function apply(p, time) {
    const f = (i, amp) => Math.sin(time * 1.2 + i * 1.9) * amp;
    spin.rotation.set(0, 0.26 - p * 0.14 + f(0, 0.015), 0);

    // B1: the sheets drop onto the plinth, the lights come on, the badge signs in
    stacks.forEach((s, i) => {
      s.sheets.forEach((sh, k) => {
        const kk = seg(p, B1[0] + i * 0.03 + k * 0.012, B1[0] + 0.12 + i * 0.03 + k * 0.012);
        sh.position.y = SHEET.gap * k + SHEET.h / 2 + lerp(0.5 + k * 0.06, 0, kk);
      });
      const top = s.sheets[s.n - 1];
      s.cap.position.y = top.position.y - (SHEET.gap * (s.n - 1) + SHEET.h / 2);
      s.cap.rotation.y = top.rotation.y;
    });
    leds.forEach((m, i) => m.color.setHex(HEX.warmDark).lerp(INDIGO, range(p, B1[0] + 0.08 + i * 0.04, B1[0] + 0.12 + i * 0.04)));
    const bk = range(p, B1[0] + 0.12, B1[0] + 0.22);
    badgeIn.scale.setScalar(Math.max(1e-3, backOut(bk)));
    badgeIn.position.y = f(3, 0.02) * bk;
    badge.visible = bk > 0;

    // B2: the shields rise in front of the salary and the board stack; their locks snap shut
    shields.forEach((sd, j) => {
      const k = seg(p, B2[0] + 0.04 + j * 0.05, B2[0] + 0.16 + j * 0.05);
      sd.inner.scale.set(1, Math.max(1e-3, k), 1);
      sd.g.visible = k > 0;
      const snap = range(p, B2[0] + 0.15 + j * 0.05, B2[0] + 0.21 + j * 0.05);
      sd.lock.scale.setScalar(Math.max(1e-3, backOut(snap)));
      sd.lock.position.y = 0.7 + 0.06 * (1 - snap);
    });

    // B3: the question; one beam reaches the open stack, the other stops at the first shield
    const q = range(p, B3[0], B3[0] + 0.06);
    bub.scale.setScalar(Math.max(1e-3, backOut(q)));
    bub.position.y = f(7, 0.035);
    bubble.visible = q > 0;
    a.set(bubble.position.x + 0.22, bubble.position.y - 0.08, bubble.position.z);
    const open = stacks[0];
    t0.set(open.x, SH + open.topY + 0.04, -0.12);
    const sd = shields[0];
    t1.set(stacks[sd.si].x, SH + 0.5, 0.44);
    const beamOn = range(p, B3[0] + 0.04, B3[0] + 0.12);
    const hit = range(p, B3[0] + 0.11, B3[0] + 0.2);
    [t0, t1].forEach((tg, j) => {
      const bm = beams[j];
      span(bm.mesh, a, tg, beamOn);
      bm.mesh.visible = beamOn > 0;
      bm.mat.opacity = 0.3 * beamOn;
      bm.spot.position.copy(tg);
      if (j === 0) bm.spot.rotation.x = -Math.PI / 2;
      else bm.spot.position.z += 0.025;
      bm.spot.visible = beamOn >= 1;
      bm.spot.material.opacity = (j === 0 ? 0.55 : 0.35) * (bm.spot.visible ? 1 : 0);
      bm.spot.scale.setScalar(1 + 0.5 * bump(hit));
    });
    // the open stack lights up; the blocked lock flashes pink and stays shut
    open.mat.color.copy(open.base).lerp(INDIGO, 0.55 * hit);
    shields.forEach((s, j) => {
      const flash = j === 0 ? bump(hit) : 0;
      s.body.color.setHex(HEX.indigo).lerp(PINK, j === 0 ? Math.max(flash, 0.6 * hit) : 0);
      s.lock.rotation.z = 0.12 * Math.sin(hit * Math.PI * 3) * (1 - hit) * (j === 0 ? 1 : 0);
    });

    // the log card records the question
    const c = range(p, B3[0] + 0.18, B3[0] + 0.28);
    cardIn.scale.setScalar(Math.max(1e-3, backOut(c)));
    cardIn.position.y = f(9, 0.03);
    card.visible = c > 0;
    card.rotation.set(-0.05, -0.34, 0.02);
  }

  for (const o of [...stacks.map((s) => s.g), ...shields.map((s) => s.g), badge, bubble, card]) o.traverse((m) => (m.userData.noShadow = true));
  apply(0, 0);
  return { group: root, radius: 2.1, floorY: FLOOR, lift: 0.08, elev: 0.2, fill: 0.95, apply };
}
