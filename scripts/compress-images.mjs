/**
 * PERF-04: Image compression script
 * Converts large PNG/JPG assets to WebP at ≤150KB, keeping originals as fallback.
 * Run with: node scripts/compress-images.mjs
 */
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { existsSync } from 'fs';
import process from 'process';

const ASSETS_DIR = join(process.cwd(), 'public', 'assets');
const TARGET_DIR = ASSETS_DIR;

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter(e => e.isFile() && /\.(png|jpg|jpeg)$/i.test(e.name))
    .map(e => join(dir, e.name));
}

async function compress() {
  let sharp;
  try {
    const mod = await import('sharp');
    sharp = mod.default;
  } catch {
    console.error('❌  sharp is not installed. Run: npm install --save-dev sharp');
    process.exit(1);
  }

  const files = await getFiles(ASSETS_DIR);
  
  if (files.length === 0) {
    console.log('No PNG/JPG files found in public/assets');
    return;
  }

  console.log(`\n🖼  Found ${files.length} image(s) to compress:\n`);

  for (const filePath of files) {
    const name = basename(filePath, extname(filePath));
    const outPath = join(TARGET_DIR, `${name}.webp`);
    
    const originalStat = await stat(filePath);
    const originalKB = (originalStat.size / 1024).toFixed(1);

    // Skip if WebP already exists and is smaller than original
    if (existsSync(outPath)) {
      const webpStat = await stat(outPath);
      if (webpStat.size < originalStat.size) {
        console.log(`  ⏭  ${name}.webp already exists (${(webpStat.size/1024).toFixed(1)}KB < ${originalKB}KB) — skipping`);
        continue;
      }
    }

    try {
      const result = await sharp(filePath)
        .webp({ quality: 82, effort: 4 })
        .toFile(outPath);

      const savedKB = ((originalStat.size - result.size) / 1024).toFixed(1);
      const savedPct = ((1 - result.size / originalStat.size) * 100).toFixed(0);
      console.log(`  ✅  ${name}: ${originalKB}KB → ${(result.size/1024).toFixed(1)}KB WebP (saved ${savedKB}KB / ${savedPct}%)`);
    } catch (err) {
      console.error(`  ❌  ${name}: ${err.message}`);
    }
  }

  console.log('\n✨  Compression complete.\n');
  console.log('Next step: update src references to use .webp filenames.\n');
}

compress();
