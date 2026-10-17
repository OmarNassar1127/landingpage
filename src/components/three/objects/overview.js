// Overview: all eleven solution objects, each in its finished pose, orbit as a ring and then
// assemble into the grid of tiles below the hero (three columns, read left to right).
import * as THREE from "three";
import { seg, lerp, clamp } from "../kit.js";
import * as klantenservice from "./klantenservice.js";
import * as eigenData from "./eigen-data.js";
import * as offerte from "./offerte.js";
import * as factuur from "./factuur.js";
import * as inbox from "./inbox.js";
import * as sales from "./sales.js";
import * as kennisbank from "./kennisbank.js";
import * as recruitment from "./recruitment.js";
import * as contract from "./contract.js";
import * as productteksten from "./productteksten.js";
import * as planning from "./planning.js";

// Same order as the tiles on the page.
const MODULES = [klantenservice, eigenData, offerte, factuur, inbox, sales, kennisbank, recruitment, contract, productteksten, planning];
const SIZE = 0.7; // radius of each object in the scene
const RING = 2.0;
const COLS = 3;

const pause = () => new Promise((r) => setTimeout(r, 0));

export async function build(ctx) {
  const root = new THREE.Group();
  const items = [];
  for (const [i, mod] of MODULES.entries()) {
    const o = await mod.build(ctx);
    o.apply(1, 0);
    const holder = new THREE.Group();
    const inner = new THREE.Group();
    // centre the object on its framing point, then scale it to a common size
    inner.add(o.group);
    o.group.position.y = -(o.lift ?? 0);
    inner.scale.setScalar(SIZE / o.radius);
    holder.add(inner);
    root.add(holder);
    holder.traverse((m) => (m.userData.noShadow = true));
    items.push({ holder, i });
    await pause();
  }
  const n = items.length;
  const rows = Math.ceil(n / COLS);
  const gridPos = (i) => {
    const r = Math.floor(i / COLS);
    const c = i % COLS;
    const inRow = Math.min(COLS, n - r * COLS);
    return new THREE.Vector3((c - (inRow - 1) / 2) * 1.5, ((rows - 1) / 2 - r) * 1.36, 0);
  };
  const ringPos = new THREE.Vector3();
  const grid = new THREE.Vector3();

  const ELEV = 0.62; // camera elevation: the ring reads as a circle seen from above
  const tilt = new THREE.Euler(-ELEV, 0, 0);

  function apply(p, time) {
    const orbit = seg(p, 0, 0.62) * Math.PI * 0.9 + 0.25;
    const k = seg(p, 0.5, 0.95);
    items.forEach(({ holder, i }) => {
      const a = orbit + (i / n) * Math.PI * 2;
      ringPos.set(Math.sin(a) * RING, 0, Math.cos(a) * RING);
      // the grid stands in a plane that faces the camera
      grid.copy(gridPos(i)).applyEuler(tilt);
      // stagger the assembly so the tiles land one after another
      const ki = clamp(k * 1.6 - (i / n) * 0.6);
      holder.position.lerpVectors(ringPos, grid, ki);
      holder.position.y += Math.sin(time * 1.1 + i * 1.7) * 0.03;
      // on the turntable each object faces outward a little; in the grid it faces the camera
      holder.rotation.set(lerp(0, -ELEV * 0.6, ki), -0.2 + Math.sin(a) * 0.25 * (1 - ki), 0);
    });
  }

  apply(0, 0);
  return { group: root, radius: 2.95, floorY: null, lift: 0, elev: ELEV, fill: 0.97, apply };
}
