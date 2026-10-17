// Renderer, studio light, a camera that frames one object, and a floor that only shows its shadow.
// Adapted from the harness-site stage: same studio and shadow setup, one object per canvas.
import * as THREE from "three";
import { materials } from "./kit.js";

const FOV = 30;
const LIGHT_DIR = new THREE.Vector3(-0.42, 1, 0.5).normalize();

// A studio for reflections: a mid-grey room with bright HDR softboxes, so glossy white
// surfaces show their form (dark falloff, crisp highlights) instead of reading flat.
function studio(renderer) {
  const s = new THREE.Scene();
  s.add(new THREE.Mesh(new THREE.SphereGeometry(30, 32, 16), new THREE.MeshBasicMaterial({ color: 0x7d7976, side: THREE.BackSide })));
  const panel = (w, h, c, k, x, y, z) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z);
    m.lookAt(0, 0, 0);
    s.add(m);
  };
  panel(16, 9, 0xffffff, 3.2, -7, 12, 9); // key softbox, top left
  panel(9, 12, 0xf3f1ff, 1.6, 14, 3, 6); // cool fill, right (a hint of the indigo)
  panel(20, 3, 0xffffff, 2.4, 0, 6, -14); // rim strip behind
  panel(18, 6, 0xf0ece6, 0.9, 0, -13, 5); // floor bounce
  const pm = new THREE.PMREMGenerator(renderer);
  const tex = pm.fromScene(s, 0.03, 0.1, 100, { size: 128 }).texture;
  pm.dispose();
  return tex;
}

/**
 * build({ M, font }) returns { group, radius, floorY, apply(p, time), elev?, fill?, lift? }.
 * radius: the object's bounding radius in its own units. floorY: y of the floor in those units.
 * apply(p, time): pose the object for scroll progress p (0..1) and idle time in seconds.
 */
export async function createStage(canvas, build, { font = "sans-serif", maxDpr = 2, preserve = false } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance", preserveDrawingBuffer: preserve });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.04;
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;

  const scene = new THREE.Scene();
  scene.environment = studio(renderer);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xd9d3cb, 0.4));
  const key = new THREE.DirectionalLight(0xffffff, 2.0);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.radius = 14;
  key.shadow.blurSamples = 20;
  key.shadow.bias = -0.0005;
  key.shadow.normalBias = 0.02;
  scene.add(key, key.target);

  const M = materials();
  const obj = await build({ M, font });
  const R = obj.radius;
  scene.add(obj.group);
  obj.group.traverse((o) => {
    if (o.isMesh) o.castShadow = !o.material.transparent && !o.userData.noShadow;
  });

  // One believable floor: a wide plane that is invisible except for the soft shadow on it.
  if (obj.floorY != null) {
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(R * 8, R * 8), new THREE.ShadowMaterial({ opacity: obj.shadow ?? 0.16, depthWrite: false }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = obj.floorY;
    floor.receiveShadow = true;
    scene.add(floor);
  }
  const lift = obj.lift ?? 0; // where the camera aims, in object units above the origin
  const sr = R * 1.6;
  key.target.position.set(0, lift, 0);
  key.position.copy(key.target.position).addScaledVector(LIGHT_DIR, sr * 4);
  const sc = key.shadow.camera;
  sc.left = sc.bottom = -sr;
  sc.right = sc.top = sr;
  sc.near = 0.1;
  sc.far = sr * 8;
  sc.updateProjectionMatrix();

  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 200);
  const tan = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
  const elev = obj.elev ?? 0.2; // camera elevation in radians: the floor reads as a surface, not an edge
  const fill = obj.fill ?? 0.94; // the object's radius as a fraction of half the short side
  let width = 1;
  let height = 1;

  function setSize(w, h) {
    width = Math.max(1, Math.round(w));
    height = Math.max(1, Math.round(h));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Frame the radius at `fill` of the short side, whatever the aspect.
    const vfit = R / (fill * tan);
    const d = width < height ? vfit / camera.aspect : vfit;
    camera.position.set(0, lift + Math.sin(elev) * d, Math.cos(elev) * d);
    camera.lookAt(0, lift, 0);
    camera.near = Math.max(0.1, d - R * 4);
    camera.far = d + R * 6;
    camera.updateProjectionMatrix();
  }

  function render(p, time = 0) {
    obj.apply(p, time);
    renderer.render(scene, camera);
  }

  if (renderer.compileAsync) await renderer.compileAsync(scene, camera);

  function dispose() {
    renderer.dispose();
    scene.traverse((o) => {
      if (o.isMesh) {
        o.geometry.dispose?.();
      }
    });
  }

  return { renderer, setSize, render, dispose, canvas };
}
