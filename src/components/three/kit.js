// Shared materials, geometry helpers and painted textures for the solution objects.
// Adapted from the harness-site stage kit (same approach, Virelio palette).
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { toCreasedNormals } from "three/examples/jsm/utils/BufferGeometryUtils.js";

export const HEX = {
  indigo: 0x4f46e5,
  indigoDeep: 0x3b34c4,
  indigoSoft: 0xc7c4f7,
  amber: 0xf59e0b,
  ink: 0x1d1d24,
  ceramic: 0xf4f3f0,
  paper: 0xfbfaf7,
  warm: 0xdcd7d0,
  warmDark: 0xb8b1a8,
  steel: 0xc9ccd1,
};
export const INDIGO = new THREE.Color(HEX.indigo);
export const AMBER = new THREE.Color(HEX.amber);
export const WARM = new THREE.Color(HEX.warm);
export const CERAMIC = new THREE.Color(HEX.ceramic);

export function materials() {
  const phys = (o) => new THREE.MeshPhysicalMaterial(o);
  return {
    ceramic: phys({ color: HEX.ceramic, roughness: 0.34, clearcoat: 1, clearcoatRoughness: 0.06 }),
    paper: phys({ color: HEX.paper, roughness: 0.7 }),
    warm: phys({ color: HEX.warm, roughness: 0.5, clearcoat: 0.6, clearcoatRoughness: 0.2 }),
    warmDark: phys({ color: HEX.warmDark, roughness: 0.5, clearcoat: 0.5, clearcoatRoughness: 0.2 }),
    steel: phys({ color: HEX.steel, metalness: 1, roughness: 0.22 }),
    ink: phys({ color: HEX.ink, roughness: 0.4, clearcoat: 0.6 }),
    indigo: phys({ color: HEX.indigo, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.05 }),
    amber: phys({ color: HEX.amber, roughness: 0.32, clearcoat: 1, clearcoatRoughness: 0.05 }),
    glass: phys({ color: 0xffffff, roughness: 0.08, transmission: 0, transparent: true, opacity: 0.35, clearcoat: 1 }),
    glow: new THREE.MeshBasicMaterial({ color: HEX.indigo, toneMapped: false }),
    amberGlow: new THREE.MeshBasicMaterial({ color: HEX.amber, toneMapped: false }),
    white: new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }),
  };
}

/** A fresh physical material whose colour an object can change per frame. */
export const tintable = (hex = HEX.ceramic) => new THREE.MeshPhysicalMaterial({ color: hex, roughness: 0.34, clearcoat: 1, clearcoatRoughness: 0.06 });

/** Rounded rectangle path centred on the origin, into a Shape or Path. */
export function rrect(target, w, h, r) {
  const x = -w / 2;
  const y = -h / 2;
  target.moveTo(x + r, y);
  target.lineTo(x + w - r, y);
  target.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  target.lineTo(x + w, y + h - r);
  target.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  target.lineTo(x + r, y + h);
  target.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  target.lineTo(x, y + r);
  target.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
  return target;
}

/** A shape extruded along z with soft bevels, centred on z = 0, smooth-shaded. */
export function extrude(shape, depth, bevel, curve = 14) {
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: Math.max(0.001, depth - 2 * bevel),
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 3,
    curveSegments: curve,
  });
  geo.translate(0, 0, -(depth - 2 * bevel) / 2);
  return toCreasedNormals(geo, Math.PI / 3);
}

// Geometry is cached by its arguments: the same part built twice shares one buffer.
const cache = new Map();
export function memo(key, make) {
  let g = cache.get(key);
  if (!g) cache.set(key, (g = make()));
  return g;
}
/** A cached three.js geometry: G(THREE.SphereGeometry, 0.2, 32, 16). Never mutate the result. */
export const G = (Ctor, ...args) => memo(`${Ctor.name}:${args.join(",")}`, () => new Ctor(...args));
export const rbox = (w, h, d, r = 0.04, seg = 3) =>
  memo(`rb:${w}:${h}:${d}:${r}:${seg}`, () => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2, h / 2, d / 2) * 0.999));

/** Add a mesh to a parent at a position; returns the mesh. */
export function put(parent, geo, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  parent.add(m);
  return m;
}

export function group(parent, x = 0, y = 0, z = 0) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  if (parent) parent.add(g);
  return g;
}

// ------------------------------------------------------------------ motion helpers
export const TAU = Math.PI * 2;
export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, k) => a + (b - a) * k;
/** 0..1 progress of p between a and b. */
export const range = (p, a, b) => clamp((p - a) / (b - a));
export const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
export const easeOut = (x) => 1 - Math.pow(1 - x, 3);
/** Eased progress of p between a and b. */
export const seg = (p, a, b) => ease(range(p, a, b));
export const backOut = (k) => {
  const c = 1.6;
  return k <= 0 ? 0 : 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2);
};
export const bump = (k) => Math.sin(Math.PI * clamp(k));

// ------------------------------------------------------------------ painted textures
export function canvasTexture(w, h, draw) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  draw(c.getContext("2d"), w, h);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** A face material from a painted texture (unlit, so it reads the same under any light). */
export const faceMat = (tex, opts = {}) => new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false, ...opts });

export const CSS = { indigo: "#4f46e5", amber: "#f59e0b", ink: "#1d1d24", line: "#d6d2cb", soft: "#ebe8e3", paper: "#fbfaf7" };

export function tick(g, x, y, s, color, width) {
  g.strokeStyle = color;
  g.lineWidth = width;
  g.lineCap = "round";
  g.lineJoin = "round";
  g.beginPath();
  g.moveTo(x, y);
  g.lineTo(x + s * 0.36, y + s * 0.36);
  g.lineTo(x + s, y - s * 0.42);
  g.stroke();
}

/** Text label: bold ink (or given colour) on transparent, left aligned with optional dot. */
export function labelTexture(text, { font, color = CSS.ink, dot = null, w = 512, h = 128, size = 64, weight = 650, align = "left" } = {}) {
  return canvasTexture(w, h, (g) => {
    let x = align === "center" ? w / 2 : 24;
    if (dot) {
      g.fillStyle = dot;
      g.beginPath();
      g.arc(x + 14, h / 2, 14, 0, TAU);
      g.fill();
      x += 46;
    }
    g.fillStyle = color;
    g.font = `${weight} ${size}px ${font}`;
    g.textAlign = align;
    g.textBaseline = "middle";
    g.fillText(text, x, h / 2 + 2);
  });
}

/** Grey text lines, like a document face. widths are fractions of the width. */
export function linesTexture({ w = 512, h = 320, rows = [0.8, 0.62, 0.72, 0.5], head = null, bg = CSS.paper, color = CSS.line, pad = 40, thick = 16, gap = null } = {}) {
  return canvasTexture(w, h, (g) => {
    if (bg) {
      g.fillStyle = bg;
      g.fillRect(0, 0, w, h);
    }
    let y = pad;
    if (head) {
      g.fillStyle = head;
      g.fillRect(pad, y, w * 0.32, thick + 4);
      y += thick * 2.6;
    }
    const step = gap ?? (h - y - pad) / Math.max(1, rows.length);
    rows.forEach((r) => {
      g.fillStyle = color;
      g.fillRect(pad, y, (w - pad * 2) * r, thick);
      y += step;
    });
  });
}

/** Soft round shadow, for contact under objects that sit on the floor. */
export const blobTexture = () =>
  canvasTexture(128, 128, (g) => {
    const r = g.createRadialGradient(64, 64, 2, 64, 64, 62);
    r.addColorStop(0, "rgba(40,34,30,0.55)");
    r.addColorStop(1, "rgba(40,34,30,0)");
    g.fillStyle = r;
    g.fillRect(0, 0, 128, 128);
  });
