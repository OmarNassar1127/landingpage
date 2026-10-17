// Sales-opvolging: a ceramic track with lead pucks. Leads drop in from site, mail and form; each gets an
// indigo follow-up flag as it passes the calendar marker (the one that waited gets an amber flag and a
// clock); then they hop into the CRM card-file, which shows a tick and a next-step arrow.
import * as THREE from "three";
import { HEX, CSS, rrect, extrude, rbox, put, group, memo, G, seg, range, lerp, clamp, bump, backOut, tick, canvasTexture, faceMat, linesTexture } from "../kit.js";
import { BEATS } from "../beats.js";

const [B1, B2, B3] = BEATS;
const FLOOR = -1.0;
const TY = -0.35; // top of the track and of the CRM block
const PR = 0.24; // puck radius
const PH = 0.14; // puck thickness
const MARK = -0.45; // follow-up marker on the track
const CX = 1.62; // CRM block centre

// ------------------------------------------------------------------ painted faces
const personTexture = () =>
  canvasTexture(256, 256, (g) => {
    g.fillStyle = CSS.indigo;
    g.beginPath();
    g.arc(128, 96, 40, 0, Math.PI * 2);
    g.fill();
    g.beginPath();
    g.ellipse(128, 206, 72, 58, 0, Math.PI, 0);
    g.fill();
  });

const siteTexture = () =>
  canvasTexture(320, 240, (g) => {
    g.fillStyle = CSS.paper;
    g.fillRect(0, 0, 320, 240);
    g.fillStyle = CSS.indigo;
    g.fillRect(0, 0, 320, 56);
    g.fillStyle = "#ffffff";
    [36, 70, 104].forEach((x) => {
      g.beginPath();
      g.arc(x, 28, 10, 0, Math.PI * 2);
      g.fill();
    });
    g.fillStyle = CSS.line;
    g.fillRect(34, 90, 252, 22);
    g.fillRect(34, 132, 180, 22);
    g.fillStyle = CSS.indigo;
    g.fillRect(34, 180, 110, 30);
  });

const formTexture = () =>
  canvasTexture(256, 320, (g) => {
    g.fillStyle = CSS.paper;
    g.fillRect(0, 0, 256, 320);
    [56, 140, 224].forEach((y, i) => {
      g.strokeStyle = CSS.indigo;
      g.lineWidth = 8;
      g.strokeRect(30, y - 20, 40, 40);
      if (i < 2) tick(g, 36, y + 2, 28, CSS.indigo, 8);
      g.fillStyle = CSS.line;
      g.fillRect(90, y - 10, 130, 20);
    });
  });

const calendarTexture = () =>
  canvasTexture(256, 256, (g) => {
    g.fillStyle = CSS.paper;
    g.fillRect(0, 0, 256, 256);
    g.fillStyle = CSS.indigo;
    g.fillRect(0, 0, 256, 62);
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 4; c++) {
        g.fillStyle = r === 1 && c === 2 ? CSS.indigo : CSS.soft;
        g.fillRect(26 + c * 54, 84 + r * 54, 42, 40);
      }
  });

const clockTexture = () =>
  canvasTexture(256, 256, (g) => {
    g.strokeStyle = "#ffffff";
    g.lineCap = "round";
    g.lineWidth = 22;
    g.beginPath();
    g.moveTo(128, 128);
    g.lineTo(128, 62);
    g.moveTo(128, 128);
    g.lineTo(178, 150);
    g.stroke();
  });

const tickTexture = () => canvasTexture(256, 256, (g) => tick(g, 64, 132, 128, "#ffffff", 30));

function makeEnvelope(M) {
  const g = new THREE.Group();
  put(g, rbox(0.62, 0.42, 0.1, 0.05), M.paper);
  const flap = new THREE.Shape();
  flap.moveTo(-0.28, 0.19);
  flap.lineTo(0.28, 0.19);
  flap.lineTo(0, -0.04);
  flap.closePath();
  put(g, memo("so:flap", () => extrude(flap, 0.03, 0.01, 6)), M.warm, 0, 0, 0.055);
  put(g, G(THREE.CylinderGeometry, 0.06, 0.06, 0.03, 24), M.indigo, 0, -0.02, 0.08).rotation.x = Math.PI / 2;
  return g;
}

function makeCard(M, tex, w, h) {
  const g = new THREE.Group();
  put(g, rbox(w, h, 0.06, 0.04), M.paper);
  put(g, G(THREE.PlaneGeometry, w - 0.05, h - 0.05), tex, 0, 0, 0.031);
  return g;
}

/** keyframes [[p, v], ...] with eased segments */
function kf(p, keys) {
  if (p <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [p1, v1] = keys[i];
    const [p0, v0] = keys[i - 1];
    if (p <= p1) return lerp(v0, v1, seg(p, p0, p1));
  }
  return keys[keys.length - 1][1];
}

export async function build({ M }) {
  const root = new THREE.Group();
  const spin = group(root, -0.22, 0, 0);
  const noShadow = [];

  // ------------------------------------------------ the track: a chunky ceramic rail on two feet, with ticks
  const X0 = -2.4;
  const X1 = 1.0;
  const TL = X1 - X0;
  const TD = 0.78;
  const track = group(spin, (X0 + X1) / 2, 0, 0);
  put(track, rbox(TL, 0.26, TD, 0.11, 4), M.ceramic, 0, TY - 0.13, 0);
  put(track, rbox(TL - 0.16, 0.04, 0.22, 0.02), M.warm, 0, TY - 0.005, 0); // a shallow lane down the middle
  for (const x of [-TL / 2 + 0.4, TL / 2 - 0.4]) put(track, rbox(0.3, TY - 0.2 - FLOOR, 0.5, 0.05), M.warm, x, (FLOOR + TY - 0.26) / 2, 0);
  const tickGeo = rbox(0.04, 0.12, 0.03, 0.015);
  for (let x = X0 + 0.25; x < X1 - 0.1; x += 0.3) {
    if (Math.abs(x - MARK) < 0.12) continue;
    put(spin, tickGeo, M.warmDark, x, TY - 0.13, TD / 2 + 0.005);
  }
  // the follow-up marker: an indigo stripe across the track and a calendar standing at its back edge
  const markMat = new THREE.MeshBasicMaterial({ color: HEX.indigoSoft, toneMapped: false });
  put(spin, rbox(0.07, 0.03, TD - 0.06, 0.012), markMat, MARK, TY + 0.005, 0);
  put(spin, rbox(0.07, 0.2, 0.03, 0.02), markMat, MARK, TY - 0.13, TD / 2 + 0.01);
  const cal = group(spin, MARK, TY + 0.3, -TD / 2 + 0.04);
  put(cal, rbox(0.56, 0.56, 0.1, 0.06), M.ceramic);
  put(cal, G(THREE.PlaneGeometry, 0.46, 0.46), faceMat(calendarTexture()), 0, 0, 0.052);
  put(cal, rbox(0.14, 0.12, 0.12, 0.03), M.warm, 0, -0.32, 0);

  // ------------------------------------------------ the CRM: a card-file block with a rimmed top and a drawer
  const crm = group(spin, CX, 0, 0);
  const CW = 1.18;
  put(crm, rbox(CW, TY - FLOOR, CW, 0.1, 4), M.ceramic, 0, (TY + FLOOR) / 2, 0);
  const rim = new THREE.Shape();
  rrect(rim, CW, CW, 0.1);
  rim.holes.push(rrect(new THREE.Path(), CW - 0.12, CW - 0.12, 0.06));
  put(crm, memo("so:rim", () => extrude(rim, 0.08, 0.02, 10)), M.warm, 0, TY + 0.03, 0).rotation.x = -Math.PI / 2;
  put(crm, rbox(CW - 0.2, 0.36, 0.06, 0.05), M.paper, 0, (TY + FLOOR) / 2, CW / 2 + 0.01);
  put(crm, rbox(0.34, 0.07, 0.06, 0.03), M.indigo, -0.17, (TY + FLOOR) / 2 + 0.07, CW / 2 + 0.05);
  // index cards standing at the back of the tray make it read as a card file
  [0, 1].forEach((k) => {
    const c = put(crm, rbox(CW - 0.22, 0.34, 0.03, 0.02), M.paper, 0, TY + 0.12 + k * 0.04, -CW / 2 + 0.1 + k * 0.06);
    c.rotation.x = -0.12;
    put(crm, rbox(0.22, 0.1, 0.03, 0.02), k ? M.indigo : M.warm, -0.24 + k * 0.4, TY + 0.31 + k * 0.04, -CW / 2 + 0.08 + k * 0.06).rotation.x = -0.12;
  });
  // the tick that pops on the drawer and the next-step arrow above
  const tickG = group(crm, 0.3, (TY + FLOOR) / 2 - 0.02, CW / 2 + 0.1);
  const disc = put(tickG, G(THREE.CylinderGeometry, 0.2, 0.2, 0.08, 40), M.indigo);
  disc.rotation.x = Math.PI / 2;
  put(tickG, G(THREE.PlaneGeometry, 0.3, 0.3), faceMat(tickTexture()), 0, 0, 0.042);
  const arrow = new THREE.Shape();
  arrow.moveTo(-0.34, -0.07);
  arrow.lineTo(0.08, -0.07);
  arrow.lineTo(0.08, -0.19);
  arrow.lineTo(0.36, 0);
  arrow.lineTo(0.08, 0.19);
  arrow.lineTo(0.08, 0.07);
  arrow.lineTo(-0.34, 0.07);
  arrow.closePath();
  const arrowG = group(crm, 0.05, 0.95, 0.1);
  put(arrowG, memo("so:arrow", () => extrude(arrow, 0.12, 0.03, 4)), M.indigo);
  noShadow.push(arrowG);

  // ------------------------------------------------ sources: site, mail, form, floating above the track start
  const SRC = [
    [-2.05, 0.78, 0.0],
    [-1.43, 1.02, -0.12],
    [-0.83, 0.78, 0.0],
  ];
  const sources = [makeCard(M, faceMat(siteTexture()), 0.64, 0.48), makeEnvelope(M), makeCard(M, faceMat(formTexture()), 0.42, 0.52)].map((s, i) => {
    const g = group(spin, ...SRC[i]);
    g.add(s);
    noShadow.push(g);
    return g;
  });

  // ------------------------------------------------ lead pucks with their follow-up flags
  const disk = new THREE.Shape();
  disk.absarc(0, 0, PR, 0, Math.PI * 2, false);
  const puckGeo = memo("so:puck", () => extrude(disk, PH, 0.045, 40));
  const person = faceMat(personTexture());
  const clockTex = faceMat(clockTexture());
  const pucks = [0, 1, 2].map((i) => {
    const g = group(spin);
    put(g, puckGeo, M.ceramic).rotation.x = -Math.PI / 2;
    put(g, G(THREE.CylinderGeometry, PR - 0.01, PR - 0.01, 0.03, 40), M.indigo, 0, -PH / 2 + 0.02, 0);
    const icon = put(g, G(THREE.CircleGeometry, 0.17, 32), person, 0, PH / 2 + 0.002, 0);
    icon.rotation.x = -Math.PI / 2;
    const flag = group(g, -0.1, PH / 2, -0.12);
    put(flag, G(THREE.CylinderGeometry, 0.02, 0.02, 0.56, 12), M.warmDark, 0, 0.28, 0);
    put(flag, rbox(0.3, 0.2, 0.04, 0.03), i === 0 ? M.amber : M.indigo, 0.16, 0.45, 0);
    noShadow.push(g);
    return { g, flag };
  });
  // the clock that appears over the lead that has waited too long
  const clock = group(spin);
  const face = put(clock, G(THREE.CylinderGeometry, 0.2, 0.2, 0.08, 40), M.amber);
  face.rotation.x = Math.PI / 2;
  put(clock, G(THREE.PlaneGeometry, 0.3, 0.3), clockTex, 0, 0, 0.042);
  noShadow.push(clock);

  // track x per puck; puck 0 was first in and waits longest, so it gets the amber flag
  const XS = [
    [[0, -2.05], [B2[0] + 0.05, -2.05], [B2[0] + 0.11, -0.95], [B2[0] + 0.18, -0.95], [B2[0] + 0.25, -0.32]],
    [[0, -1.43], [B2[0] + 0.05, -1.43], [B2[0] + 0.14, 0.2]],
    [[0, -0.83], [B2[0] + 0.01, -0.83], [B2[0] + 0.1, 0.76]],
  ];
  // when each puck drops in (puck 0 is already on the track at the start)
  const DROP = [null, [B1[0] + 0.03, B1[0] + 0.12], [B1[0] + 0.13, B1[0] + 0.22]];
  // CRM slots and the transfer windows
  const SLOT = [
    [CX, 0.27],
    [CX - 0.27, -0.26],
    [CX + 0.27, -0.26],
  ];
  const XFER = [
    [B3[0] + 0.12, B3[0] + 0.2],
    [B3[0] + 0.07, B3[0] + 0.15],
    [B3[0] + 0.02, B3[0] + 0.1],
  ];
  const PY = TY + PH / 2;

  function apply(p, time) {
    const f = (i, a) => Math.sin(time * 1.2 + i * 1.9) * a;
    spin.rotation.set(0, -0.82 + p * 0.1 + f(0, 0.015), 0);

    let pulse = 0;
    pucks.forEach((pk, i) => {
      let x = kf(p, XS[i]);
      let y = PY;
      let z = 0;
      let s = 1;
      if (DROP[i]) {
        const k = range(p, DROP[i][0], DROP[i][1]);
        const [sx, sy, sz] = SRC[i];
        s = backOut(range(k, 0, 0.35));
        const fall = range(k, 0.25, 0.85);
        y = lerp(sy - 0.3, PY, fall * fall) + bump(range(k, 0.85, 1)) * 0.06;
        z = lerp(sz + 0.12, 0, fall);
      }
      const t = seg(p, XFER[i][0], XFER[i][1]);
      if (t > 0) {
        x = lerp(x, SLOT[i][0], t);
        z = lerp(z, SLOT[i][1], t);
        y += bump(t) * 0.36;
      }
      pk.g.visible = s > 0.01;
      pk.g.position.set(x, y + f(i + 2, 0.008), z);
      pk.g.scale.setScalar(Math.max(0.001, s));
      pk.g.rotation.set(0, (1 - s) * 0.8 + bump(t) * 0.3, bump(t) * -0.15);
      // the flag pops as the puck passes the follow-up marker
      const fk = range(x, MARK - 0.12, MARK + 0.14);
      pk.flag.visible = fk > 0.001;
      pk.flag.scale.setScalar(Math.max(0.001, backOut(fk)));
      pk.flag.rotation.z = f(i + 4, 0.03);
      pulse = Math.max(pulse, bump(range(x, MARK - 0.3, MARK + 0.3)) * (t > 0 ? 0 : 1));
    });
    markMat.color.setHex(HEX.indigoSoft).lerp(new THREE.Color(HEX.indigo), pulse);

    // the waiting lead: a clock grows over it while it sits before the marker, then goes once flagged
    const c = range(p, B2[0] + 0.1, B2[0] + 0.15) * (1 - range(p, B2[0] + 0.23, B2[0] + 0.28));
    clock.visible = c > 0.001;
    const lead = pucks[0].g.position;
    clock.position.set(lead.x + 0.05, lead.y + 0.62 + f(7, 0.02), lead.z + 0.1);
    clock.scale.setScalar(Math.max(0.001, backOut(c)));
    clock.rotation.set(0, 0.8, Math.sin(p * 90) * 0.06 * c);

    // sources bob a little and settle back once all leads are in
    sources.forEach((s, i) => {
      const [sx, sy, sz] = SRC[i];
      const hit = bump(range(p, ...(DROP[i] || [B1[0] - 0.1, B1[0] - 0.05])) * 2);
      s.position.set(sx, sy + f(i + 3, 0.04) + hit * 0.05, sz);
      s.rotation.set(-0.12, 0.75 + (i - 1) * 0.12, (1 - i) * 0.08 + f(i, 0.03));
    });

    // CRM: tick on the drawer, then the next-step arrow
    const tk = range(p, B3[0] + 0.19, B3[0] + 0.25);
    tickG.visible = tk > 0.001;
    tickG.scale.setScalar(Math.max(0.001, backOut(tk)));
    const ar = range(p, B3[0] + 0.22, B3[0] + 0.29);
    arrowG.visible = ar > 0.001;
    arrowG.scale.setScalar(Math.max(0.001, backOut(ar)));
    arrowG.position.set(0.05 + 0.12 * Math.min(1, ar) + f(8, 0.02), 0.95, 0.1);
    arrowG.rotation.set(0, 0.8, 0.3);
  }

  for (const o of noShadow) o.traverse((m) => (m.userData.noShadow = true));
  apply(0, 0);
  return { group: root, radius: 2.05, floorY: FLOOR, lift: -0.15, elev: 0.42, fill: 0.95, apply };
}
