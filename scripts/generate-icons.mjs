import sharp from 'sharp';

// BUG-05 FIX: Generate real PNG icons for PWA manifest
// data: URI icons are ignored by browsers — real file URLs are required.

const svg192 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192">
  <rect width="192" height="192" rx="40" fill="#0c223f"/>
  <text x="50%" y="57%" text-anchor="middle" dominant-baseline="middle"
    font-family="Arial,sans-serif" font-size="86" font-weight="700" fill="white">KD</text>
</svg>`;

const svg512 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="100" fill="#0c223f"/>
  <text x="50%" y="57%" text-anchor="middle" dominant-baseline="middle"
    font-family="Arial,sans-serif" font-size="224" font-weight="700" fill="white">KD</text>
</svg>`;

await Promise.all([
  sharp(Buffer.from(svg192)).resize(192, 192).png().toFile('./public/icon-192.png'),
  sharp(Buffer.from(svg512)).resize(512, 512).png().toFile('./public/icon-512.png'),
]).then(([r192, r512]) => {
  console.log(`✅ icon-192.png: ${r192.size} bytes`);
  console.log(`✅ icon-512.png: ${r512.size} bytes`);
}).catch(e => {
  console.error('Error generating icons:', e.message);
  process.exit(1);
});
