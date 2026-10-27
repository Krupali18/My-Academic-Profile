/**
 * Generate all favicon and PWA icons from the source brand logo.
 * Source: public/assets/title-logo.png (500×500 "KD" monogram)
 *
 * Run: node scripts/generate-icons.mjs
 */

import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SOURCE = path.resolve(__dirname, '../public/assets/title-logo.png');
const PUBLIC = path.resolve(__dirname, '../public');

async function generateIcons() {
  // PWA manifest icons
  await sharp(SOURCE).resize(192, 192).png().toFile(path.join(PUBLIC, 'icon-192.png'));
  await sharp(SOURCE).resize(512, 512).png().toFile(path.join(PUBLIC, 'icon-512.png'));

  // Favicon PNGs
  await sharp(SOURCE).resize(96, 96).png().toFile(path.join(PUBLIC, 'favicon-96x96.png'));
  await sharp(SOURCE).resize(32, 32).png().toFile(path.join(PUBLIC, 'favicon-32x32.png'));
  await sharp(SOURCE).resize(16, 16).png().toFile(path.join(PUBLIC, 'favicon-16x16.png'));

  // Apple touch icon
  await sharp(SOURCE).resize(180, 180).png().toFile(path.join(PUBLIC, 'apple-touch-icon.png'));

  // favicon.ico (ICO container with 32×32 PNG)
  const png32 = await sharp(SOURCE).resize(32, 32).png().toBuffer();
  const headerSize = 6;
  const entrySize = 16;
  const dataOffset = headerSize + entrySize;
  const buf = Buffer.alloc(dataOffset + png32.length);
  buf.writeUInt16LE(0, 0);     // Reserved
  buf.writeUInt16LE(1, 2);     // ICO type
  buf.writeUInt16LE(1, 4);     // 1 image
  buf.writeUInt8(32, 6);       // width
  buf.writeUInt8(32, 7);       // height
  buf.writeUInt8(0, 8);        // color palette
  buf.writeUInt8(0, 9);        // reserved
  buf.writeUInt16LE(1, 10);    // color planes
  buf.writeUInt16LE(32, 12);   // bits per pixel
  buf.writeUInt32LE(png32.length, 14); // image size
  buf.writeUInt32LE(dataOffset, 18);   // offset
  png32.copy(buf, dataOffset);
  fs.writeFileSync(path.join(PUBLIC, 'favicon.ico'), buf);

  console.log('✅ All icons generated from title-logo.png');
}

generateIcons().catch((e) => {
  console.error('Error generating icons:', e.message);
  process.exit(1);
});
