#!/usr/bin/env node

/**
 * Image Converter Script
 * ======================
 * Converts an image into an optimized folder structure with multiple
 * WebP variants (different sizes & qualities) for responsive web usage.
 *
 * Usage:
 *   node scripts/convert-image.mjs <image-path> [--output <output-dir>] [--name <folder-name>]
 *
 * Examples:
 *   node scripts/convert-image.mjs ./my-photo.jpg
 *   node scripts/convert-image.mjs ./my-photo.jpg --output public/assets/hero
 *   node scripts/convert-image.mjs ./my-photo.jpg --name hero-banner
 *
 * Output Structure:
 *   public/assets/<name>/
 *   ├── placeholder.webp    (20px wide, quality 20 — for blur placeholder)
 *   ├── sm.webp             (640px wide,  quality 80)
 *   ├── md.webp             (1024px wide, quality 80)
 *   ├── lg.webp             (1536px wide, quality 80)
 *   ├── xl.webp             (1920px wide, quality 80)
 *   ├── original.webp       (original size, quality 90)
 *   └── metadata.json       (image info: sizes, aspect ratio, dominant color)
 */

import sharp from "sharp";
import path from "path";
import fs from "fs";

// ─── Configuration ───────────────────────────────────────────────────────────

const VARIANTS = [
  { name: "placeholder", width: 20, quality: 20 },
  { name: "sm", width: 640, quality: 80 },
  { name: "md", width: 1024, quality: 80 },
  { name: "lg", width: 1536, quality: 80 },
  { name: "xl", width: 1920, quality: 80 },
];

// ─── Argument Parsing ────────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    console.log(`
  📸 Image Converter — Convert images to optimized WebP folder

  Usage:
    node scripts/convert-image.mjs <image-path> [options]

  Options:
    --output, -o  <dir>   Output directory (default: public/assets)
    --name, -n    <name>  Folder name (default: image filename without ext)
    --help, -h            Show this help message

  Examples:
    node scripts/convert-image.mjs ./hero.jpg
    node scripts/convert-image.mjs ./hero.jpg --output public/assets/hero
    node scripts/convert-image.mjs ./hero.jpg --name hero-banner
    `);
    process.exit(0);
  }

  const imagePath = args[0];
  let outputDir = "public/assets";
  let folderName = null;

  for (let i = 1; i < args.length; i++) {
    if ((args[i] === "--output" || args[i] === "-o") && args[i + 1]) {
      outputDir = args[++i];
    }
    if ((args[i] === "--name" || args[i] === "-n") && args[i + 1]) {
      folderName = args[++i];
    }
  }

  return { imagePath, outputDir, folderName };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getFileNameWithoutExt(filePath) {
  return path.basename(filePath, path.extname(filePath));
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function convertImage() {
  const { imagePath, outputDir, folderName } = parseArgs();

  // Validate input file
  const absoluteInput = path.resolve(imagePath);
  if (!fs.existsSync(absoluteInput)) {
    console.error(`\n  ❌ File not found: ${absoluteInput}\n`);
    process.exit(1);
  }

  const name = folderName || getFileNameWithoutExt(imagePath);
  const targetDir = path.resolve(outputDir, name);

  console.log(`\n  📸 Converting: ${path.basename(absoluteInput)}`);
  console.log(`  📁 Output:     ${targetDir}\n`);

  // Create output directory
  fs.mkdirSync(targetDir, { recursive: true });

  // Get original image metadata
  const image = sharp(absoluteInput);
  const metadata = await image.metadata();
  const { width: origWidth, height: origHeight } = metadata;

  console.log(`  📐 Original:   ${origWidth}×${origHeight}`);

  // Extract dominant color
  const { dominant } = await image.stats();
  const dominantColor = rgbToHex(dominant.r, dominant.g, dominant.b);

  // Generate variants
  const results = [];

  for (const variant of VARIANTS) {
    // Skip variants larger than original
    if (variant.width > origWidth && variant.name !== "placeholder") {
      console.log(
        `  ⏭️  ${variant.name.padEnd(12)} skipped (original is smaller)`
      );
      continue;
    }

    const outputPath = path.join(targetDir, `${variant.name}.webp`);

    await sharp(absoluteInput)
      .resize(variant.width, null, {
        withoutEnlargement: true,
        fit: "inside",
      })
      .webp({ quality: variant.quality })
      .toFile(outputPath);

    const stat = fs.statSync(outputPath);
    const resizedMeta = await sharp(outputPath).metadata();

    results.push({
      name: variant.name,
      width: resizedMeta.width,
      height: resizedMeta.height,
      size: stat.size,
      quality: variant.quality,
    });

    console.log(
      `  ✅ ${variant.name.padEnd(12)} ${String(resizedMeta.width).padStart(5)}×${String(resizedMeta.height).padEnd(5)} ${formatBytes(stat.size).padStart(10)}`
    );
  }

  // Generate original quality WebP
  const originalOutputPath = path.join(targetDir, "original.webp");
  await sharp(absoluteInput).webp({ quality: 90 }).toFile(originalOutputPath);

  const originalStat = fs.statSync(originalOutputPath);
  results.push({
    name: "original",
    width: origWidth,
    height: origHeight,
    size: originalStat.size,
    quality: 90,
  });
  console.log(
    `  ✅ ${"original".padEnd(12)} ${String(origWidth).padStart(5)}×${String(origHeight).padEnd(5)} ${formatBytes(originalStat.size).padStart(10)}`
  );

  // Generate metadata.json
  const metadataJson = {
    name,
    originalWidth: origWidth,
    originalHeight: origHeight,
    aspectRatio: parseFloat((origWidth / origHeight).toFixed(4)),
    dominantColor,
    variants: results.map((r) => ({
      name: r.name,
      width: r.width,
      height: r.height,
      file: `${r.name}.webp`,
    })),
    // Path relative to public/ for use in <img src>
    basePath: `/${path.relative("public", targetDir).replace(/\\/g, "/")}`,
    generatedAt: new Date().toISOString(),
  };

  const metadataPath = path.join(targetDir, "metadata.json");
  fs.writeFileSync(metadataPath, JSON.stringify(metadataJson, null, 2));

  // Summary
  const inputStat = fs.statSync(absoluteInput);
  const totalOutputSize = results.reduce((acc, r) => acc + r.size, 0);

  console.log(`\n  ─── Summary ───`);
  console.log(`  📥 Input size:     ${formatBytes(inputStat.size)}`);
  console.log(`  📤 Total output:   ${formatBytes(totalOutputSize)}`);
  console.log(`  📝 Metadata:       ${metadataPath}`);
  console.log(`  🎨 Dominant color: ${dominantColor}`);
  console.log(
    `  🔗 Base path:      ${metadataJson.basePath}`
  );
  console.log(`\n  ✨ Done! Use <OptimizedImage src="${metadataJson.basePath}" /> in your components.\n`);
}

convertImage().catch((err) => {
  console.error("\n  ❌ Error:", err.message, "\n");
  process.exit(1);
});
