import fs from "fs";
import path from "path";
import sharp from "sharp";

const CDRAGON_BASE =
  "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem";

const TIERS = [
  "iron",
  "bronze",
  "silver",
  "gold",
  "platinum",
  "emerald",
  "diamond",
  "master",
  "grandmaster",
  "challenger",
];

const OUT_DIR = path.join(process.cwd(), "public/ranks");
const NORMALIZED_WIDTH = 1280;
const NORMALIZED_HEIGHT = 720;

interface EmblemData {
  tier: string;
  normalized: Buffer;
  bounds: { left: number; top: number; right: number; bottom: number };
  contentWidth: number;
  contentHeight: number;
}

async function getContentBounds(buffer: Buffer): Promise<{ left: number; top: number; right: number; bottom: number }> {
  const image = sharp(buffer);
  const { width, height } = await image.metadata();

  if (!width || !height) throw new Error("Could not get image dimensions");

  const { data } = await image.raw().ensureAlpha().toBuffer({ resolveWithObject: true });

  let left = width;
  let top = height;
  let right = 0;
  let bottom = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const alpha = data[idx + 3];
      if (alpha > 10) {
        if (x < left) left = x;
        if (x > right) right = x;
        if (y < top) top = y;
        if (y > bottom) bottom = y;
      }
    }
  }

  return { left, top, right, bottom };
}

async function main() {
  console.log("Fetching rank emblems...\n");

  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const emblems: EmblemData[] = [];

  // Step 1: Download and normalize all to same canvas size
  for (const tier of TIERS) {
    const url = `${CDRAGON_BASE}/emblem-${tier}.png`;
    console.log(`Downloading ${tier}...`);

    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed to fetch ${tier}: ${res.status}`);
      continue;
    }

    const buffer = Buffer.from(await res.arrayBuffer());

    // Normalize to 1280x720 (smallest original canvas size)
    const centered = await sharp(buffer)
      .resize(NORMALIZED_WIDTH, NORMALIZED_HEIGHT, { fit: "fill" })
      .toBuffer();

    const bounds = await getContentBounds(centered);
    const contentWidth = bounds.right - bounds.left + 1;
    const contentHeight = bounds.bottom - bounds.top + 1;

    emblems.push({ tier, normalized: centered, bounds, contentWidth, contentHeight });
    console.log(`  Normalized, content: ${contentWidth}x${contentHeight}`);
  }

  // Step 2: Find largest content bounds
  const maxWidth = Math.max(...emblems.map((e) => e.contentWidth));
  const maxHeight = Math.max(...emblems.map((e) => e.contentHeight));
  console.log(`\nLargest content: ${maxWidth}x${maxHeight}`);

  // Step 3: Crop all using largest bounds as reference
  for (const { tier, normalized, bounds, contentWidth, contentHeight } of emblems) {
    // Extract content
    const cropped = await sharp(normalized)
      .extract({
        left: bounds.left,
        top: bounds.top,
        width: contentWidth,
        height: contentHeight,
      })
      .toBuffer();

    // Pad to match largest
    const padLeft = Math.floor((maxWidth - contentWidth) / 2);
    const padTop = Math.floor((maxHeight - contentHeight) / 2);

    const final = await sharp(cropped)
      .extend({
        top: padTop,
        bottom: maxHeight - contentHeight - padTop,
        left: padLeft,
        right: maxWidth - contentWidth - padLeft,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .webp({ quality: 90 })
      .toBuffer();

    const outPath = path.join(OUT_DIR, `${tier}.webp`);
    fs.writeFileSync(outPath, final);

    const sizeKb = (final.length / 1024).toFixed(1);
    console.log(`${tier}: ${contentWidth}x${contentHeight} -> ${maxWidth}x${maxHeight}, wrote ${sizeKb} KB`);
  }

  console.log("\nDone!");
}

main().catch(console.error);
