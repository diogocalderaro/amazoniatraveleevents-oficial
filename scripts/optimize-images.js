import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dirs = [
  './src/assets',
  './src/assets/galeria',
  './src/assets/destinos'
];

async function optimizeImages() {
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      if (!fs.statSync(filePath).isFile()) continue;
      
      const ext = path.extname(file).toLowerCase();
      if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;
      
      const tempPath = filePath + '.tmp';
      try {
        if (ext === '.jpg' || ext === '.jpeg') {
          await sharp(filePath).jpeg({ quality: 80, mozjpeg: true }).toFile(tempPath);
        } else if (ext === '.png') {
          await sharp(filePath).png({ quality: 80, compressionLevel: 8 }).toFile(tempPath);
        }
        
        fs.renameSync(tempPath, filePath);
        console.log(`Optimized: ${filePath}`);
      } catch (err) {
        console.error(`Error optimizing ${filePath}:`, err);
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
    }
  }
}

optimizeImages();
