// Inbox-agent: a messy pile of envelopes is read by an indigo eye, sorts itself into three labelled
// trays (lead, complaint, invoice) that each get a colleague assigned, and a reply draft rises, unsent.
import * as THREE from "three";
import { HEX, CSS, rrect, extrude, rbox, put, group, memo, G, seg, range, lerp, clamp, bump, backOut, canvasTexture, faceMat, tintable } from "../kit.js";
import { BEATS } from "../beats.js";

const [B1, B2, B3] = BEATS;
const FLOOR = 0;
const TRAY_Z = -0.25;
const TRAY_X = [-1.08, 0, 1.08];
const PILE = new THREE.Vector3(0, 0, 1.05);
const CAT = [
  { hex: HEX.ink, css: CSS.ink }, // invoice
  { hex: HEX.amber, css: CSS.amber }, // complaint
  { hex: HEX.indigo, css: CSS.indigo }, // lead
];

// ------------------------------------------------------------------ icon faces
const starTexture = () =>
  canvasTexture(256, 256, (g) => {
    g.fillStyle = "#ffffff";
    g.beginPath();
    for (let i = 0; i < 10; i++) {
      const r = i % 2 ? 44 : 100;
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      g.lineTo(128 + Math.cos(a) * r, 136 + Math.sin(a) * r);
    }
    g.closePath();
    g.lineJoin = "round";
    g.lineWidth = 16;
    g.strokeStyle = "#ffffff";
    g.fill();
    g.stroke();
  });

const warnTexture = () =>
  canvasTexture(256, 256, (g) => {
    g.fillStyle = "#ffffff";
    g.strokeStyle = "#ffffff";
    g.lineJoin = "round";
    g.lineWidth = 26;
    g.beginPath();
    g.moveTo(128, 40);
    g.lineTo(222, 206);
    g.lineTo(34, 206);
    g.closePath();
    g.fill();
    g.stroke();
    g.fillStyle = CSS.amber;
    g.fillRect(116, 92, 24, 66);
    g.beginPath();
    g.arc(128, 182, 14, 0, Math.PI * 2);
    g.fill();
  });

const euroTexture = () =>
  canvasTexture(256, 256, (g) => {
    // drawn, not typed: an open ring with two bars, so it reads the same in every font
    g.strokeStyle = "#ffffff";
    g.lineCap = "round";
    g.lineWidth = 30;
    g.beginPath();
    g.arc(140, 128, 70, Math.PI * 0.27, Math.PI * 1.73);
    g.stroke();
    g.lineWidth = 22;
    for (const y of [108, 150]) {
      g.beginPath();
      g.moveTo(44, y);
      g.lineTo(150, y);
      g.stroke();
    }
  });

const personTexture = () =>
  canvasTexture(256, 256, (g) => {
    g.fillStyle = CSS.indigo;
    g.beginPath();
    g.arc(128, 98, 44, 0, Math.PI * 2);
    g.fill();
    g.beginPath();
    g.ellipse(128, 214, 78, 62, 0, Math.PI, 0);
    g.fill();
  });

const pencilTexture = () =>
  canvasTexture(256, 256, (g) => {
    g.translate(128, 128);
    g.rotate(-Math.PI / 4);
    g.fillStyle = "#ffffff";
    g.fillRect(-22, -86, 44, 128);
    g.beginPath();
    g.moveTo(-22, 50);
    g.lineTo(22, 50);
    g.lineTo(0, 96);
    g.closePath();
    g.fill();
  });

// one painted line of the draft, revealed by scaling
const barTexture = (color) => canvasTexture(64, 16, (g) => ((g.fillStyle = color), g.fillRect(0, 0, 64, 16)));

// ------------------------------------------------------------------ parts
function makeTray(M, iconMat, tabMat) {
  const g = new THREE.Group();
  const W = 1.0;
  const D = 0.8;
  const H = 0.36;
  const t = 0.07;
  put(g, rbox(W, 0.08, D, 0.035), M.ceramic, 0, 0.04, 0);
  put(g, rbox(W, H, t, 0.03), M.ceramic, 0, H / 2, -D / 2 + t / 2);
  put(g, rbox(W, H * 0.62, t, 0.03), M.ceramic, 0, (H * 0.62) / 2, D / 2 - t / 2);
  for (const s of [-1, 1]) put(g, rbox(t, H, D, 0.03), M.ceramic, s * (W / 2 - t / 2), H / 2, 0);
  // the label tab on the front lip: a coloured rounded tile with a white icon
  const tab = put(g, memo("ib:tab", () => extrude(rrect(new THREE.Shape(), 0.36, 0.3, 0.09), 0.06, 0.02, 10)), tabMat, 0, 0.16, D / 2 + 0.02);
  put(tab, G(THREE.PlaneGeometry, 0.24, 0.24), iconMat, 0, 0, 0.032);
  return g;
}

function makeEnvelope(M, seal) {
  const g = new THREE.Group();
  put(g, rbox(0.6, 0.05, 0.42, 0.02), M.paper);
  const flap = new THREE.Shape();
  flap.moveTo(-0.28, -0.19);
  flap.lineTo(0.28, -0.19);
  flap.lineTo(0, 0.05);
  flap.closePath();
  const f = put(g, memo("ib:flap", () => extrude(flap, 0.02, 0.008, 4)), M.warm, 0, 0.033, 0);
  f.rotation.x = -Math.PI / 2;
  put(g, G(THREE.CylinderGeometry, 0.085, 0.085, 0.03, 28), seal, 0, 0.05, 0.03);
  return g;
}

function makeBadge(M, face) {
  const g = new THREE.Group();
  const disc = put(g, G(THREE.CylinderGeometry, 0.17, 0.17, 0.07, 36), M.ceramic);
  disc.rotation.x = Math.PI / 2;
  put(g, G(THREE.CircleGeometry, 0.13, 32), face, 0, 0, 0.037);
  return g;
}

// envelope k of the pile: fixed offsets so every frame is the same
const PILE_POSE = [
  [0.0, 0.0, 0.0, 0.1],
  [0.24, 0.06, -0.12, -0.5],
  [-0.26, 0.12, 0.12, 0.35],
  [0.18, 0.18, 0.14, -0.2],
  [-0.2, 0.24, -0.1, 0.7],
  [0.2, 0.3, -0.06, -0.45],
  [-0.04, 0.36, 0.06, 0.2],
];
const DEST = [2, 1, 0, 2, 0, 1, 2]; // tray of each envelope (top of the pile last)

export async function build({ M, font }) {
  const root = new THREE.Group();
  const spin = group(root);

  // ------------------------------------------------ three trays with icon tabs
  const icons = [euroTexture(), warnTexture(), starTexture()].map((t) => faceMat(t));
  const tabMats = [M.ink, M.amber, M.indigo];
  const trays = TRAY_X.map((x, i) => {
    const g = group(spin, x, FLOOR, TRAY_Z);
    g.add(makeTray(M, icons[i], tabMats[i]));
    g.rotation.y = -x * 0.12;
    const badge = group(g, 0.36, 0.5, -0.36);
    badge.add(makeBadge(M, faceMat(personTexture())));
    return { g, badge, count: 0 };
  });

  // ------------------------------------------------ the pile of envelopes
  const env = PILE_POSE.map((pp, k) => {
    const seal = tintable(HEX.warmDark);
    const g = group(spin);
    g.add(makeEnvelope(M, seal));
    return { g, seal, pp, dest: DEST[k], slot: DEST.slice(0, k).filter((d) => d === DEST[k]).length };
  });

  // ------------------------------------------------ the reading eye: a floating lens with a soft beam
  const eye = group(spin, PILE.x, 1.3, PILE.z);
  // a ceramic eyeball whose indigo iris looks down at what it reads
  const ball = group(eye);
  put(ball, G(THREE.SphereGeometry, 0.32, 48, 32), M.ceramic);
  const cap = (r, a, mat) => (put(ball, G(THREE.SphereGeometry, r, 40, 12, 0, Math.PI * 2, 0, a), mat).rotation.x = Math.PI / 2);
  put(ball, G(THREE.TorusGeometry, 0.186, 0.03, 12, 48), M.indigo, 0, 0, 0.262);
  cap(0.323, 0.6, M.glow);
  cap(0.326, 0.27, new THREE.MeshBasicMaterial({ color: HEX.indigoDeep, toneMapped: false }));
  put(ball, G(THREE.SphereGeometry, 0.03, 16, 8), M.white, 0.055, 0.06, 0.32);
  const beamMat = new THREE.MeshBasicMaterial({ color: HEX.indigo, transparent: true, opacity: 0.14, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false });
  const beamGeo = memo("ib:beam", () => {
    const c = new THREE.CylinderGeometry(0.16, 0.62, 1.0, 40, 1, true);
    c.translate(0, -0.5, 0);
    return c;
  });
  const beam = put(eye, beamGeo, beamMat, 0, -0.2, 0.1);

  // ------------------------------------------------ the reply draft that rises from the lead tray
  const draft = group(spin);
  put(draft, rbox(1.0, 0.72, 0.06, 0.06), M.paper);
  const bars = [0.78, 0.6, 0.7, 0.42].map((w, i) => {
    const b = put(draft, G(THREE.PlaneGeometry, 1, 0.055), faceMat(barTexture(i ? CSS.line : CSS.indigo)), 0, 0.2 - i * 0.13, 0.032);
    b.userData.w = w * 0.78;
    return b;
  });
  const pen = group(draft, 0.42, 0.3, 0.06);
  const pdisc = put(pen, G(THREE.CylinderGeometry, 0.15, 0.15, 0.07, 36), M.indigo);
  pdisc.rotation.x = Math.PI / 2;
  put(pen, G(THREE.CircleGeometry, 0.11, 32), faceMat(pencilTexture()), 0, 0, 0.037);

  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const col = new THREE.Color();

  function apply(p, time) {
    const f = (i, amp) => Math.sin(time * 1.2 + i * 1.9) * amp;
    spin.rotation.set(0, -0.12 + p * 0.1 + f(0, 0.015), 0);
    // once the pile has gone, the trays come forward into the space it left
    spin.position.z = lerp(0, 0.85, seg(p, B2[0] + 0.1, B2[1]));

    // B1: the eye glides over the pile; seals take their label colour as the beam passes
    const scan = range(p, B1[0], B1[1] - 0.04);
    const sweep = Math.sin(scan * Math.PI * 2) * 0.32;
    const away = seg(p, B2[0], B2[1]);
    const ey = 1.78 + lerp(0, -0.08, away);
    eye.position.set(PILE.x + sweep + lerp(0, -0.95, away), ey + f(1, 0.04), PILE.z + lerp(0, -1.0, away));
    beam.scale.set(1, ey - 0.45, 1);
    eye.rotation.set(0, 0, -sweep * 0.3);
    ball.rotation.set(lerp(0.5, 0.15, away), lerp(0, 0.5, away), 0);
    beamMat.opacity = (0.06 + 0.12 * bump(scan) + 0.04 * (p < B1[0] ? 1 : 0)) * (1 - away);
    beam.visible = beamMat.opacity > 0.005;

    env.forEach((e, k) => {
      const [ox, oy, oz, ry] = e.pp;
      const read = range(p, B1[0] + 0.02 + (6 - k) * 0.028, B1[0] + 0.06 + (6 - k) * 0.028);
      col.setHex(HEX.warmDark).lerp(new THREE.Color(CAT[e.dest].hex), read);
      e.seal.color.copy(col);

      // B2: each envelope arcs into its tray and settles flat on the stack there
      const t0 = B2[0] + 0.01 + (6 - k) * 0.024;
      const fly = seg(p, t0, t0 + 0.08);
      a.set(PILE.x + ox, FLOOR + 0.03 + oy, PILE.z + oz);
      const tr = trays[e.dest].g;
      b.set(tr.position.x, FLOOR + 0.12 + e.slot * 0.06, TRAY_Z + 0.02 - e.slot * 0.04);
      e.g.position.lerpVectors(a, b, fly);
      e.g.position.y += bump(fly) * 0.85;
      e.g.rotation.set(-0.08 * bump(fly), lerp(ry, -tr.position.x * 0.12 + (e.slot - 1) * 0.12, fly), 0.5 * bump(fly) * (e.dest - 1 || 0.6));
    });

    trays.forEach((t, i) => {
      const firstLand = B2[0] + 0.08 + (6 - DEST.lastIndexOf(i)) * 0.024;
      const k = range(p, firstLand, firstLand + 0.06);
      t.badge.scale.setScalar(Math.max(0.001, backOut(k)));
      t.badge.visible = k > 0;
      t.badge.position.y = 0.5 + f(i + 4, 0.02);
    });

    // B3: the draft rises out of the lead tray, writes itself, and waits
    const rise = seg(p, B3[0], B3[0] + 0.12);
    draft.visible = rise > 0.001;
    const lead = trays[2].g.position;
    draft.position.set(lerp(lead.x, 0.68, rise), lerp(FLOOR + 0.2, 1.45, rise) + f(7, 0.03) * rise, lerp(TRAY_Z, 0.1, rise));
    draft.rotation.set(lerp(-1.2, -0.08, rise), lerp(-0.1, -0.22, rise), lerp(0, 0.04, rise));
    draft.scale.setScalar(Math.max(0.001, lerp(0.4, 1, backOut(rise))));
    bars.forEach((bar, i) => {
      const w = range(p, B3[0] + 0.04 + i * 0.03, B3[0] + 0.09 + i * 0.03);
      bar.scale.x = Math.max(0.001, w * bar.userData.w);
      bar.position.x = -0.39 + (w * bar.userData.w) / 2;
      bar.visible = w > 0;
    });
    const pw = range(p, B3[0] + 0.05, B3[0] + 0.11);
    pen.scale.setScalar(Math.max(0.001, backOut(pw)));
    pen.position.set(0.42 + 0.03 * Math.sin(p * 60) * (1 - range(p, B3[0] + 0.24, B3[0] + 0.26)), 0.3, 0.06);
  }

  for (const o of [eye, draft, ...trays.map((t) => t.badge)]) o.traverse((m) => (m.userData.noShadow = true));
  apply(0, 0);
  return { group: root, radius: 1.72, floorY: FLOOR, lift: 0.45, elev: 0.6, fill: 0.95, apply };
}
