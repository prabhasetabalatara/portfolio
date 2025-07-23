import fs from 'fs';
import path from 'path';

const galleryDirectory = path.join(process.cwd(), 'content/gallery');

export function getGalleryImages() {
  const fullPath = path.join(galleryDirectory, 'images.json');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const images = JSON.parse(fileContents);
  return images;
}
