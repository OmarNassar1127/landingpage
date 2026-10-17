// Offerte-agent: loose request cards (a mail, a form, a handwritten note, a phone call) are read,
// priced from your own price list (one item stays an amber question), then fold into one sealed
// quote document that waits for approval.
import * as THREE from "three";
import { HEX, CSS, rbox, put, group, memo, G, seg, range, lerp, clamp, bump, backOut, tick, canvasTexture, faceMat } from "../kit.js";
import { BEATS } from "../beats.js";

const [B1, B2, B3] = BEATS;
const FLOOR = -1.3;
const CW = 0.84; // card size
const CH = 0.6;

// ------------------------------------------------------------------ painted faces
const bar = (g, x, y, w, h, c) => {
  g.fillStyle = c;
  g.beginPath();
  g.roundRect(x, y, w, h, h / 2);
  g.fill();
};

const formTexture = () =>
  canvasTexture(336, 240, (g) => {
    g.strokeStyle = CSS.line;
    g.lineWidth = 7;
    [36, 100].forEach((y) => {
      g.beginPath();
      g.roundRect(28, y, 280, 44, 10);
      g.stroke();
    });
    g.beginPath();
    g.roundRect(28, 168, 44, 44, 10);
    g.stroke();
    tick(g, 36, 192, 28, CSS.indigo, 8);
    bar(g, 92, 180, 150, 18, CSS.line);
  });

const noteTexture = () =>
  canvasTexture(336, 240, (g) => {
    g.strokeStyle = "#8f877d";
    g.lineWidth = 8;
    g.lineCap = "round";
    [[54, 0.86], [112, 0.7], [170, 0.52]].forEach(([y, w], r) => {
      g.beginPath();
      for (let x = 34; x < 34 + 268 * w; x += 6) {
        const yy = y + Math.sin(x * 0.11 + r * 2) * 7 + Math.sin(x * 0.037 + r) * 4;
        x === 34 ? g.moveTo(x, yy) : g.lineTo(x, yy);
      }
      g.stroke();
    });
  });

const callTexture = () =>
  canvasTexture(336, 240, (g) => {
    g.fillStyle = CSS.indigo;
    g.beginPath();
    g.arc(78, 120, 52, 0, Math.PI * 2);
    g.fill();
    // a handset: a thick arc with two round caps
    g.save();
    g.translate(78, 120);
    g.rotate(Math.PI * 0.75);
    g.strokeStyle = "#ffffff";
    g.fillStyle = "#ffffff";
    g.lineCap = "round";
    g.lineWidth = 12;
    g.beginPath();
    g.arc(0, 0, 26, -0.95, 0.95);
    g.stroke();
    for (const a of [-0.95, 0.95]) {
      g.beginPath();
      g.ellipse(Math.cos(a) * 26, Math.sin(a) * 26, 12, 8, a, 0, Math.PI * 2);
      g.fill();
    }
    g.restore();
    bar(g, 152, 86, 150, 20, CSS.line);
    bar(g, 152, 136, 110, 20, CSS.line);
  });

const mailTexture = () =>
  canvasTexture(336, 240, (g) => {
    g.strokeStyle = CSS.line;
    g.lineWidth = 8;
    g.lineJoin = "round";
    g.beginPath();
    g.moveTo(20, 22);
    g.lineTo(168, 128);
    g.lineTo(316, 22);
    g.stroke();
  });

// the key line of each card, glowing once it has been read
const keyTexture = () => canvasTexture(256, 32, (g) => bar(g, 4, 4, 248, 24, CSS.indigo));

const euroTexture = (font, bg = CSS.indigo, fg = "#ffffff") =>
  canvasTexture(128, 128, (g) => {
    g.fillStyle = bg;
    g.beginPath();
    g.arc(64, 64, 62, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = fg;
    g.font = `800 78px ${font}`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText("€", 62, 68);
  });

const questionTexture = (font) =>
  canvasTexture(128, 128, (g) => {
    g.fillStyle = "#ffffff";
    g.font = `800 84px ${font}`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText("?", 64, 70);
  });

const priceTexture = (font) =>
  canvasTexture(256, 320, (g) => {
    g.fillStyle = CSS.indigo;
    g.font = `800 64px ${font}`;
    g.textBaseline = "middle";
    g.fillText("€", 28, 54);
    [118, 170, 222, 274].forEach((y, i) => {
      bar(g, 28, y - 9, 120 - (i % 2) * 30, 18, CSS.line);
      bar(g, 178, y - 9, 50, 18, i === 2 ? CSS.indigo : "#b8b1a8");
    });
  });

// the quote body below the indigo header: blank template, then the filled quote
const docTexture = (font, filled) =>
  canvasTexture(512, 560, (g) => {
    const soft = filled ? CSS.line : "#efece7";
    bar(g, 44, 34, 190, 22, soft);
    bar(g, 44, 74, 130, 22, soft);
    [150, 206, 262, 318].forEach((y, i) => {
      bar(g, 44, y, 250 - (i % 3) * 40, 20, soft);
      if (!filled) return;
      if (i === 2) {
        bar(g, 372, y - 14, 96, 48, CSS.amber);
        g.fillStyle = "#ffffff";
        g.font = `800 40px ${font}`;
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.fillText("?", 420, y + 12);
        g.textAlign = "left";
      } else bar(g, 370, y, 92, 20, "#b8b1a8");
    });
    if (!filled) return;
    g.fillStyle = CSS.ink;
    g.fillRect(44, 378, 424, 5);
    g.fillStyle = CSS.indigo;
    g.font = `800 72px ${font}`;
    g.textBaseline = "middle";
    g.fillText("€", 44, 446);
    bar(g, 130, 430, 150, 32, CSS.indigo);
  });

const badgeTexture = () =>
  canvasTexture(128, 128, (g) => {
    tick(g, 30, 66, 70, CSS.indigo, 16);
  });

// ------------------------------------------------------------------ parts
function card(parent, M, mat, face, { env = false } = {}) {
  const g = group(parent);
  put(g, rbox(CW, CH, 0.08, 0.05), mat);
  put(g, G(THREE.PlaneGeometry, CW - 0.04, CH - 0.04), face, 0, 0, 0.042);
  if (env) put(g, G(THREE.CylinderGeometry, 0.07, 0.07, 0.03, 24), M.indigo, 0, -0.02, 0.05).rotation.x = Math.PI / 2;
  return g;
}

export async function build({ M, font }) {
  const root = new THREE.Group();
  const spin = group(root);

  // ------------------------------------------------ the plinth and the quote document standing on it
  const plinth = group(spin, 0, FLOOR, -0.35);
  put(plinth, G(THREE.CylinderGeometry, 1.58, 1.63, 0.14, 72), M.warm, 0, 0.07, -0.5);
  put(plinth, rbox(1.3, 0.12, 0.3, 0.05), M.warmDark, 0, 0.2, 0.2);

  const DW = 1.5;
  const DH = 2.12;
  const doc = group(spin, 0, FLOOR + 0.14 + DH / 2, -0.35);
  const sheetGroup = group(doc);
  put(sheetGroup, rbox(DW, DH, 0.2, 0.07), M.paper);
  // two sheets peeking behind make it a thick document
  put(sheetGroup, rbox(DW - 0.04, DH - 0.04, 0.05, 0.03), M.ceramic, 0.04, -0.03, -0.1);
  put(sheetGroup, rbox(DW - 0.08, DH - 0.08, 0.05, 0.03), M.warm, 0.08, -0.06, -0.15);
  put(sheetGroup, rbox(DW - 0.12, 0.38, 0.06, 0.04), M.indigo, 0, DH / 2 - 0.3, 0.11);
  const blank = faceMat(docTexture(font, false));
  const filled = faceMat(docTexture(font, true), { opacity: 0 });
  const FH = DH - 0.62;
  put(sheetGroup, G(THREE.PlaneGeometry, DW - 0.16, FH), blank, 0, -0.26, 0.102);
  put(sheetGroup, G(THREE.PlaneGeometry, DW - 0.16, FH), filled, 0, -0.26, 0.103);

  // the wax seal, pressed onto the lower right corner
  const seal = group(doc, DW / 2 - 0.26, -DH / 2 + 0.3, 0.14);
  const disc = put(seal, G(THREE.CylinderGeometry, 0.25, 0.27, 0.08, 40), M.indigo);
  disc.rotation.x = Math.PI / 2;
  put(seal, G(THREE.TorusGeometry, 0.17, 0.025, 12, 40), M.indigo, 0, 0, 0.045);
  const boss = put(seal, G(THREE.CylinderGeometry, 0.09, 0.09, 0.04, 32), M.indigo, 0, 0, 0.05);
  boss.rotation.x = Math.PI / 2;

  // the approval badge: a concept waiting for a tick, not sent
  const badge = group(doc, DW / 2 - 0.05, DH / 2 - 0.02, 0.25);
  const bd = put(badge, G(THREE.CylinderGeometry, 0.26, 0.26, 0.1, 40), M.ceramic);
  bd.rotation.x = Math.PI / 2;
  put(badge, G(THREE.TorusGeometry, 0.24, 0.025, 12, 40), M.indigo, 0, 0, 0.04);
  put(badge, G(THREE.CircleGeometry, 0.2, 32), faceMat(badgeTexture()), 0, 0, 0.052);

  // ------------------------------------------------ the loose request cards
  const keyMat = faceMat(keyTexture());
  const specs = [
    { mat: M.paper, face: faceMat(mailTexture()), env: true, start: [-1.0, 1.12, 0.5, -0.35, 0.2, 0.22], key: [-0.08, -0.2, 0.5] },
    { mat: M.ceramic, face: faceMat(formTexture()), start: [1.08, 0.95, 0.35, 0.28, -0.3, -0.16], key: [0.04, -0.1, 0.48] },
    { mat: M.warm, face: faceMat(noteTexture()), start: [-1.1, -0.3, 0.75, 0.2, 0.35, 0.14], key: [0, 0.07, 0.62] },
    { mat: M.ceramic, face: faceMat(callTexture()), start: [1.05, -0.42, 0.8, -0.2, -0.25, -0.2], key: [0.15, 0.13, 0.42] },
  ];
  const GRID = [
    [-0.98, 0.78, 0.55],
    [0.98, 0.78, 0.55],
    [-0.98, -0.2, 0.75],
    [0.98, -0.2, 0.75],
  ];
  const cards = specs.map((s, i) => {
    const g = card(spin, M, s.mat, s.face, { env: s.env });
    const key = put(g, G(THREE.PlaneGeometry, 0.5, 0.06), keyMat, s.key[0], s.key[1], 0.046);
    key.geometry = G(THREE.PlaneGeometry, CW * s.key[2], 0.065);
    return { g, s, key, home: new THREE.Vector3(...GRID[i]) };
  });
  // the scan beam that reads them
  const beam = put(
    spin,
    G(THREE.PlaneGeometry, 3.0, 0.05),
    new THREE.MeshBasicMaterial({ color: HEX.indigo, transparent: true, opacity: 0, depthWrite: false, toneMapped: false }),
  );
  const beamGlow = put(
    spin,
    G(THREE.PlaneGeometry, 3.0, 0.3),
    new THREE.MeshBasicMaterial({ color: HEX.indigoSoft, transparent: true, opacity: 0, depthWrite: false, toneMapped: false }),
  );

  // ------------------------------------------------ your price list, and the € tokens it hands out
  const price = group(spin, 0, 0.16, 0.95);
  put(price, rbox(0.72, 0.92, 0.16, 0.08), M.ceramic);
  put(price, rbox(0.72, 0.1, 0.17, 0.05), M.indigo, 0, 0.44, 0);
  put(price, G(THREE.PlaneGeometry, 0.62, 0.78), faceMat(priceTexture(font)), 0, -0.03, 0.082);
  const euro = faceMat(euroTexture(font));
  const coins = [0, 1, 3].map((ci) => {
    const g = group(spin);
    const c = put(g, G(THREE.CylinderGeometry, 0.15, 0.15, 0.07, 36), M.indigo);
    c.rotation.x = Math.PI / 2;
    put(g, G(THREE.CircleGeometry, 0.13, 32), euro, 0, 0, 0.037);
    return { g, ci };
  });
  const ask = group(spin);
  const askDisc = put(ask, G(THREE.CylinderGeometry, 0.17, 0.17, 0.08, 36), M.amber);
  askDisc.rotation.x = Math.PI / 2;
  put(ask, G(THREE.PlaneGeometry, 0.26, 0.26), faceMat(questionTexture(font)), 0, 0, 0.042);

  const tmp = new THREE.Vector3();
  const slot = (i) => tmp.set(cards[i].home.x + CW / 2 - 0.12, cards[i].home.y + CH / 2 - 0.1, cards[i].home.z + 0.09);

  function apply(p, time) {
    const f = (i, a) => Math.sin(time * 1.1 + i * 1.7) * a;
    spin.rotation.set(0, -0.14 + p * 0.1 + 0.3 * seg(p, B3[0] + 0.1, B3[1] - 0.04) + f(0, 0.015), 0);

    // B1: the loose cards straighten into a tidy spread; a beam reads them and their key lines light up
    const align = seg(p, B1[0], B1[0] + 0.12);
    const scanY = lerp(1.3, -0.65, range(p, B1[0] + 0.1, B1[1] - 0.04));
    const scanning = range(p, B1[0] + 0.08, B1[0] + 0.12) * (1 - range(p, B1[1] - 0.06, B1[1] - 0.02));
    beam.position.set(0, scanY, 0.95);
    beamGlow.position.set(0, scanY + 0.1, 0.94);
    beam.material.opacity = 0.9 * scanning;
    beamGlow.material.opacity = 0.35 * scanning;

    // B3: everything folds into the document
    const fold = (i) => seg(p, B3[0] + i * 0.035, B3[0] + 0.14 + i * 0.035);
    const docIn = seg(p, B3[0] + 0.04, B3[0] + 0.2);

    cards.forEach((c, i) => {
      const [sx, sy, sz, rx, ry, rz] = c.s.start;
      const k = fold(i);
      const hx = lerp(sx, c.home.x, align);
      const hy = lerp(sy, c.home.y, align) + f(i + 1, 0.04) * (1 - align);
      const hz = lerp(sz, c.home.z, align);
      c.g.position.set(lerp(hx, 0, k), lerp(hy, -0.2, k), lerp(hz, 0.1, k));
      c.g.rotation.set(lerp(rx, 0, align), lerp(ry, 0, align) * (1 - k), lerp(rz, 0, align) + k * (i % 2 ? -0.4 : 0.4));
      const s = 1 - range(k, 0.55, 1);
      c.g.scale.setScalar(s);
      c.g.visible = s > 0.001;
      const read = range(scanY, c.home.y + c.s.key[1] + 0.05, c.home.y + c.s.key[1] - 0.15);
      c.key.scale.set(Math.max(0.001, read), 1, 1);
      c.key.position.x = c.s.key[0] - CW * c.s.key[2] * (1 - read) * 0.5;
      c.key.visible = read > 0.01;
    });

    // B2: the price list grows in at the centre and hands out € tokens; one card stays a question
    const pIn = backOut(range(p, B2[0], B2[0] + 0.07)) * (1 - seg(p, B3[0], B3[0] + 0.12));
    price.scale.setScalar(Math.max(0.001, pIn));
    price.visible = pIn > 0.002;
    price.position.set(0, lerp(0.05, -0.2, seg(p, B3[0], B3[0] + 0.12)) + f(7, 0.03), 0.95);
    price.rotation.set(0, 0, f(8, 0.03));
    coins.forEach((co, j) => {
      const t = range(p, B2[0] + 0.07 + j * 0.05, B2[0] + 0.15 + j * 0.05);
      const k = fold(co.ci);
      co.g.visible = t > 0.001 && k < 0.6;
      if (!co.g.visible) return;
      slot(co.ci);
      const e = seg(t, 0, 1);
      co.g.position.set(lerp(0, tmp.x, e), lerp(0.3, tmp.y, e) + bump(t) * 0.35, lerp(1.05, tmp.z, e));
      co.g.position.lerp(cards[co.ci].g.position, range(k, 0, 0.6));
      co.g.scale.setScalar(Math.min(1, t * 4) * (1 - range(k, 0, 0.6)) * (1 + 0.25 * bump(range(t, 0.8, 1))));
      co.g.rotation.set(0, (1 - e) * Math.PI, 0);
    });
    {
      const t = range(p, B2[0] + 0.22, B2[0] + 0.27);
      const k = fold(2);
      const s = backOut(t) * (1 - range(k, 0, 0.6));
      ask.visible = s > 0.002;
      slot(2);
      ask.position.copy(tmp).lerp(cards[2].g.position, range(k, 0, 0.6));
      ask.position.y += f(9, 0.02);
      ask.scale.setScalar(Math.max(0.001, s * (1 + 0.15 * bump(range(p, B2[0] + 0.24, B2[1] - 0.04)))));
    }

    // B3: the document comes forward, fills in, gets sealed and waits for approval
    doc.position.z = lerp(-0.35, 0.05, docIn);
    plinth.position.z = doc.position.z;
    doc.scale.setScalar(lerp(0.9, 1, docIn));
    doc.position.y = FLOOR + 0.14 + (DH / 2) * lerp(0.9, 1, docIn) + f(4, 0.01);
    filled.opacity = range(p, B3[0] + 0.1, B3[0] + 0.18);
    blank.opacity = 1 - filled.opacity;
    const st = range(p, B3[0] + 0.17, B3[0] + 0.24);
    seal.visible = st > 0.001;
    seal.scale.setScalar(Math.max(0.001, st < 1 ? lerp(1.4, 1, seg(st, 0, 1)) * Math.min(1, st * 3) : 1 + 0.08 * bump(range(p, B3[0] + 0.24, B3[0] + 0.28))));
    seal.position.z = lerp(0.6, 0.14, seg(st, 0, 1));
    seal.rotation.z = lerp(0.6, -0.15, seg(st, 0, 1));
    const bt = range(p, B3[0] + 0.24, B3[0] + 0.29);
    badge.visible = bt > 0.001;
    badge.scale.setScalar(Math.max(0.001, backOut(bt)));
    badge.position.y = DH / 2 - 0.02 + f(5, 0.03);
  }

  for (const o of [...cards.map((c) => c.g), ...coins.map((c) => c.g), ask, price, beam, beamGlow, badge]) o.traverse((m) => (m.userData.noShadow = true));
  apply(0, 0);
  return { group: root, radius: 1.9, floorY: FLOOR, lift: -0.1, elev: 0.2, fill: 0.95, apply };
}
