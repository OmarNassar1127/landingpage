// Render the start and end stills of every 3D hero into public/3d/<slug>-<0|1>.webp.
// Run against a served static export:
//   npx next build && python3 -m http.server 3312 -d out &
//   node scripts/posters.mjs [http://localhost:3312] [slug ...]
// Needs cwebp (brew install webp).
import { webkit } from "playwright";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";

const base = process.argv[2] || "http://localhost:3312";
const registry = readFileSync(new URL("../src/components/three/registry.ts", import.meta.url), "utf8");
const all = [...registry.matchAll(/^\s+"?([a-z-]+)"?: \(\) => import/gm)].map((m) => m[1]);
const only = process.argv.slice(3);
const slugs = only.length ? only : all;
const pathOf = (slug) => (slug === "overview" ? "/oplossingen/" : `/oplossingen/${slug}/`);

const out = new URL("../public/3d/", import.meta.url).pathname;
mkdirSync(out, { recursive: true });
const browser = await webkit.launch();
const page = await browser.newPage({ viewport: { width: 1024, height: 1024 } });
for (const slug of slugs) {
  for (const still of [0, 1]) {
    await page.goto(`${base}${pathOf(slug)}?still=${still}`, { waitUntil: "load" });
    await page.waitForFunction(() => window.__still, null, { timeout: 60000 });
    const url = await page.evaluate(() => window.__still);
    const png = join(tmpdir(), `poster-${slug}-${still}.png`);
    writeFileSync(png, Buffer.from(url.split(",")[1], "base64"));
    const webp = join(out, `${slug}-${still}.webp`);
    execFileSync("cwebp", ["-quiet", "-q", "80", "-alpha_q", "85", "-resize", "900", "900", png, "-o", webp]);
    console.log(webp);
  }
}
await browser.close();
