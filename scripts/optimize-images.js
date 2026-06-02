import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const images = [
  { src: './public/portfolio.png', dest: './public/portfolio.webp' },
  { src: './public/projects/sslc-percentage-calculator.png', dest: './public/projects/sslc-percentage-calculator.webp' },
  { src: './public/projects/thaibhavan.png', dest: './public/projects/thaibhavan.webp' },
  { src: './public/projects/user-management.png', dest: './public/projects/user-management.webp' },
];

async function convertImage(src, dest) {
  try {
    if (!fs.existsSync(src)) {
      console.warn(`Source file not found: ${src}`);
      return;
    }
    const startSize = fs.statSync(src).size;
    await sharp(src)
      .webp({ quality: 80, effort: 6 })
      .toFile(dest);
    const endSize = fs.statSync(dest).size;
    console.log(`Converted: ${src} (${(startSize / 1024).toFixed(1)} KB) -> ${dest} (${(endSize / 1024).toFixed(1)} KB)`);
  } catch (error) {
    console.error(`Error converting ${src}:`, error);
  }
}

async function main() {
  console.log('Starting image compression...');
  for (const img of images) {
    await convertImage(img.src, img.dest);
  }
  console.log('Image compression finished.');
}

main();
