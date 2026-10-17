// Kennisbank-assistent: document blocks drop onto a ceramic shelf and plug in (one locked block stays
// apart); a question bubble sends an indigo beam across the shelf; it lands on two sources that pull
// forward and glow, and an answer card with a source-link chip connects to them.
import * as THREE from "three";
import { HEX, INDIGO, CSS, rbox, put, group, memo, G, seg, range, lerp, clamp, bump, backOut, canvasTexture, faceMat, tintable, linesTexture, extrude } from "../kit.js";
import { BEATS } from "../beats.js";

const [B1, B2, B3] = BEATS;
const FLOOR = -1.15;
const SH = FLOOR + 0.36; // shelf top
const UP = new THREE.Vector3(0, 1, 0);
const SOFT = new THREE.Color(HEX.indigoSoft);

const questionTexture = (font) =>
  canvasTexture(256, 192, (g) => {
    g.fillStyle = "#ffffff";
    g.font = `800 150px ${font}`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText("?", 128, 104);
  });

const linkTexture = () =>
  canvasTexture(256, 96, (g) => {
    // two chain links, then a short line
    g.strokeStyle = "#ffffff";
    g.lineWidth = 12;
    g.lineCap = "round";
    const link = (x, y) => {
      g.beginPath();
      g.roundRect(x - 26, y - 14, 52, 28, 14);
      g.stroke();
    };
    g.save();
    g.translate(58, 48);
    g.rotate(-0.6);
    link(-14, 0);
    link(14, 0);
    g.restore();
    g.fillStyle = "rgba(255,255,255,0.8)";
    g.fillRect(112, 40, 110, 16);
  });

const answerTexture = () =>
  canvasTexture(512, 320, (g) => {
    g.fillStyle = CSS.indigo;
    g.fillRect(40, 44, 150, 22);
    g.fillStyle = CSS.line;
    [0.86, 0.7, 0.8].forEach((r, i) => g.fillRect(40, 104 + i * 46, 432 * r, 20));
  });

// The blocks on the shelf: binders (wide spine, ring hole), books (bands), one PDF slab (face out).
const SHELF = [
  { kind: "binder", w: 0.38, h: 1.3, x: -1.05, hex: HEX.warm },
  { kind: "book", w: 0.24, h: 1.06, x: -0.73, hex: HEX.warmDark },
  { kind: "binder", w: 0.38, h: 1.26, x: -0.41, hex: HEX.ceramic },
  { kind: "pdf", w: 0.64, h: 1.0, x: 0.15, hex: HEX.paper },
  { kind: "binder", w: 0.38, h: 1.24, x: 0.71, hex: HEX.ceramic },
  { kind: "book", w: 0.24, h: 1.04, x: 1.04, hex: HEX.warm },
];
const SOURCES = [3, 4];

function makeBlock(M, b, mats) {
  const g = new THREE.Group();
  const d = b.kind === "pdf" ? 0.14 : 0.62;
  const mat = tintable(b.hex);
  put(g, rbox(b.w, b.h, d, b.kind === "book" ? 0.03 : 0.05), mat, 0, b.h / 2, 0);
  const z = d / 2 + 0.002;
  if (b.kind === "binder") {
    put(g, G(THREE.PlaneGeometry, b.w * 0.62, 0.3), mats.label, 0, b.h * 0.66, z);
    const hole = put(g, G(THREE.CylinderGeometry, 0.055, 0.055, 0.02, 24), M.warmDark, 0, b.h * 0.22, z);
    hole.rotation.x = Math.PI / 2;
  } else if (b.kind === "book") {
    for (const y of [0.16, 0.84]) put(g, rbox(b.w + 0.012, 0.04, d + 0.012, 0.01), M.warmDark, 0, b.h * y, 0);
  } else {
    put(g, G(THREE.PlaneGeometry, b.w * 0.86, b.h * 0.8), mats.page, 0, b.h * 0.47, z);
    put(g, memo("kb:fold", () => {
      const s = new THREE.Shape();
      s.moveTo(0, 0);
      s.lineTo(0.14, 0);
      s.lineTo(0, -0.14);
      s.closePath();
      return extrude(s, 0.02, 0.006, 4);
    }), M.warm, b.w / 2 - 0.15, b.h - 0.01, z);
  }
  return { g, mat, d };
}

/** Stretch a unit-height cylinder from a to b (k = how far it has grown). */
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
  const spin = group(root, 0.22, 0, 0);

  // ------------------------------------------------ the shelf: a thick ceramic plinth on a warm foot
  put(spin, rbox(2.72, 0.3, 0.86, 0.1), M.ceramic, 0, FLOOR + 0.21, 0);
  put(spin, rbox(2.52, 0.08, 0.74, 0.03), M.warm, 0, FLOOR + 0.04, 0);

  // ------------------------------------------------ the document blocks, each with a link dot on the shelf edge
  const mats = {
    label: faceMat(canvasTexture(128, 128, (g) => {
      g.fillStyle = CSS.paper;
      g.fillRect(0, 0, 128, 128);
      g.fillStyle = CSS.line;
      g.fillRect(22, 40, 84, 14);
      g.fillRect(22, 74, 60, 14);
    })),
    page: faceMat(linesTexture({ w: 256, h: 320, rows: [0.8, 0.6, 0.74, 0.52, 0.68], head: CSS.indigo, pad: 30, thick: 16 })),
  };
  const dotGeo = G(THREE.CylinderGeometry, 0.055, 0.055, 0.03, 24);
  const blocks = SHELF.map((b, i) => {
    const blk = makeBlock(M, b, mats);
    spin.add(blk.g);
    const dm = new THREE.MeshBasicMaterial({ color: HEX.warmDark, toneMapped: false });
    const dot = put(spin, dotGeo, dm, b.x, FLOOR + 0.21, 0.435);
    dot.rotation.x = Math.PI / 2;
    return { ...b, ...blk, i, dot, dm, base: new THREE.Color(b.hex) };
  });

  // ------------------------------------------------ the confidential one: apart on the floor, with a lock
  const locked = group(spin, -1.82, FLOOR, 0.5);
  put(locked, rbox(0.58, 0.86, 0.14, 0.05), M.warm, 0, 0.43, 0);
  put(locked, G(THREE.PlaneGeometry, 0.48, 0.66), faceMat(linesTexture({ w: 256, h: 320, rows: [0.8, 0.6, 0.74, 0.52], head: CSS.ink, pad: 30, thick: 16, bg: "#e6e1da" })), 0, 0.45, 0.072);
  const lock = group(locked, 0, 0.36, 0.13);
  put(lock, rbox(0.3, 0.24, 0.1, 0.04), M.amber, 0, 0, 0);
  const shackle = put(lock, G(THREE.TorusGeometry, 0.085, 0.024, 12, 24, Math.PI), M.steel, 0, 0.11, 0);
  shackle.scale.y = 1.25;
  put(lock, G(THREE.CylinderGeometry, 0.028, 0.028, 0.02, 16), M.ink, 0, 0, 0.051).rotation.x = Math.PI / 2;
  locked.rotation.y = 0.35;

  // ------------------------------------------------ the question: a chat bubble in front, with its beams
  const bubble = group(spin, -1.25, 1.02, 1.1);
  const bub = group(bubble);
  put(bub, rbox(0.72, 0.52, 0.2, 0.18, 5), M.indigo);
  put(bub, G(THREE.ConeGeometry, 0.1, 0.24, 20), M.indigo, -0.2, -0.3, 0).rotation.z = Math.PI + 0.5;
  put(bub, G(THREE.PlaneGeometry, 0.4, 0.3), faceMat(questionTexture(font)), 0, 0, 0.102);

  const beamGeo = memo("kb:beam", () => new THREE.CylinderGeometry(0.12, 0.025, 1, 28, 1, true));
  const beams = [0, 1].map(() => {
    const mat = new THREE.MeshBasicMaterial({ color: HEX.indigo, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, toneMapped: false });
    const mesh = put(spin, beamGeo, mat);
    const spot = put(spin, G(THREE.CircleGeometry, 0.16, 32), new THREE.MeshBasicMaterial({ color: HEX.indigo, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false }));
    return { mesh, mat, spot };
  });

  // ------------------------------------------------ the answer card, its source chip and the links back
  const card = group(spin, 0.68, 1.2, 0.95);
  const cardIn = group(card);
  put(cardIn, rbox(1.2, 0.74, 0.1, 0.08), M.ceramic);
  put(cardIn, G(THREE.PlaneGeometry, 1.1, 0.66), faceMat(answerTexture()), 0, 0.06, 0.052);
  const chip = group(cardIn, -0.26, -0.24, 0.07);
  put(chip, rbox(0.46, 0.16, 0.06, 0.07), M.indigo);
  put(chip, G(THREE.PlaneGeometry, 0.4, 0.15), faceMat(linkTexture()), 0, 0, 0.032);
  const wireGeo = G(THREE.CylinderGeometry, 0.014, 0.014, 1, 10);
  const wires = SOURCES.map(() => put(spin, wireGeo, M.glow));

  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const tgt = SOURCES.map(() => new THREE.Vector3());

  function apply(p, time) {
    const f = (i, amp) => Math.sin(time * 1.2 + i * 1.9) * amp;
    spin.rotation.set(0, 0.28 - p * 0.14 + f(0, 0.015), 0);

    // B1: the blocks drop onto the shelf one after another; their dots light as they plug in
    const scan = seg(p, B2[0] + 0.08, B2[1]); // B2 sweep progress
    const sweepX = lerp(-1.1, 1.1, scan);
    const pull = seg(p, B3[0] + 0.02, B3[0] + 0.16);
    blocks.forEach((blk, i) => {
      const k = seg(p, B1[0] + i * 0.022, B1[0] + 0.13 + i * 0.022);
      const sgn = i % 2 ? 1 : -1;
      const src = SOURCES.indexOf(i) >= 0 ? pull : 0;
      blk.g.position.set(blk.x, SH + lerp(0.62 + 0.08 * (i % 3), 0, k) + f(i + 1, 0.04) * (1 - k) + 0.05 * src, lerp(0.3, 0, k) + 0.5 * src);
      blk.g.rotation.set(lerp(-0.12, 0, k), lerp(sgn * 0.18, 0, k) - 0.12 * src * (i === 3 ? 1 : 0.5), lerp(sgn * 0.1, 0, k));
      const lit = range(k, 0.86, 1);
      blk.dm.color.setHex(HEX.warmDark).lerp(INDIGO, lit);
      blk.dot.scale.setScalar(1 + 0.6 * bump(lit) + 0.3 * lit);
      // B2: the beam brightens what it passes; B3: the sources turn indigo
      const near = bump(clamp(0.5 + (blk.x - sweepX) / 0.7)) * (scan > 0 && scan < 1 ? 1 : 0);
      blk.mat.color.copy(blk.base).lerp(SOFT, 0.7 * near).lerp(INDIGO, src);
    });
    // the locked block flinches as the others connect, and stays where it is
    const flinch = bump(range(p, B1[0] + 0.1, B1[0] + 0.24));
    locked.position.x = -1.82 - 0.06 * flinch;
    lock.scale.setScalar(1 + 0.18 * flinch);

    // B2: the question appears in front and sends its beam across the shelf
    const q = range(p, B2[0], B2[0] + 0.08);
    bub.scale.setScalar(Math.max(1e-3, backOut(q)));
    bub.position.y = f(7, 0.04);
    bubble.visible = q > 0;
    a.set(bubble.position.x + 0.2, bubble.position.y - 0.1, bubble.position.z);
    const beamOn = range(p, B2[0] + 0.05, B2[0] + 0.1);
    const split = seg(p, B3[0], B3[0] + 0.12);
    SOURCES.forEach((s, j) => {
      const blk = blocks[s];
      tgt[j].set(blk.x, SH + blk.h * 0.5 + 0.05 * pull, (blk.d / 2 + 0.02) + 0.5 * pull);
    });
    beams.forEach((bm, j) => {
      const sweep = b.set(sweepX, SH + 0.55, 0.33);
      const target = sweep.lerp(tgt[j], split);
      span(bm.mesh, a, target, beamOn);
      bm.mesh.visible = beamOn > 0;
      bm.mat.opacity = (j === 0 ? 0.28 : 0.28 * split) * beamOn;
      bm.spot.position.copy(target).z += 0.01;
      bm.spot.visible = beamOn >= 1;
      bm.spot.material.opacity = (j === 0 ? 0.5 : 0.5 * split) * (bm.spot.visible ? 1 : 0);
      bm.spot.scale.setScalar(1 + 0.3 * pull);
    });

    // B3: the answer card grows in and its source chip links back to the two blocks
    const c = range(p, B3[0] + 0.1, B3[0] + 0.2);
    cardIn.scale.setScalar(Math.max(1e-3, backOut(c)));
    cardIn.position.y = f(9, 0.035);
    card.visible = c > 0;
    card.rotation.set(-0.05, -0.32, 0.02);
    const w = seg(p, B3[0] + 0.18, B3[0] + 0.28);
    root.updateMatrixWorld(true);
    chip.getWorldPosition(a);
    spin.worldToLocal(a);
    a.y -= 0.08;
    wires.forEach((wire, j) => {
      b.copy(tgt[j]);
      b.y = SH + blocks[SOURCES[j]].h + 0.05 * pull;
      b.z -= 0.08;
      span(wire, a, b, w);
      wire.visible = w > 0;
    });
  }

  for (const o of [...blocks.map((x) => x.g), bubble, card, ...wires]) o.traverse((m) => (m.userData.noShadow = true));
  apply(0, 0);
  return { group: root, radius: 2.05, floorY: FLOOR, lift: 0.08, elev: 0.2, fill: 0.95, apply };
}
