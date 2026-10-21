import fs from 'fs';
import path from 'path';

// Minimal 16x16 / 32x32 valid Windows ICO generator
// An ICO contains a 6-byte header, 16-byte directory entry per image, followed by PNG or BMP data.
// Since modern browsers (and Next.js) accept PNG-encoded ICOs, we can embed a valid PNG or minimal BMP.

function createMinimalIco() {
  // A clean 32x32 32bpp BMP inside an ICO
  const width = 32;
  const height = 32;
  const bpp = 32;
  const imageSize = 40 + (width * height * 4) + (width * height / 8); // BITMAPINFOHEADER + pixel data + mask
  
  const buffer = Buffer.alloc(6 + 16 + imageSize);
  
  // ICONDIR (6 bytes)
  buffer.writeUInt16LE(0, 0); // Reserved
  buffer.writeUInt16LE(1, 2); // Type: 1 for ICO
  buffer.writeUInt16LE(1, 4); // Count: 1 image
  
  // ICONDIRENTRY (16 bytes)
  buffer.writeUInt8(width, 6);        // Width
  buffer.writeUInt8(height, 7);       // Height
  buffer.writeUInt8(0, 8);            // Color count (0 for 256+)
  buffer.writeUInt8(0, 9);            // Reserved
  buffer.writeUInt16LE(1, 10);        // Color planes
  buffer.writeUInt16LE(bpp, 12);      // Bits per pixel
  buffer.writeUInt32LE(imageSize, 14);// Size of image data
  buffer.writeUInt32LE(22, 18);       // Offset of image data (6 + 16 = 22)
  
  // BITMAPINFOHEADER (40 bytes)
  const headerOffset = 22;
  buffer.writeUInt32LE(40, headerOffset + 0);         // biSize
  buffer.writeInt32LE(width, headerOffset + 4);       // biWidth
  buffer.writeInt32LE(height * 2, headerOffset + 8);  // biHeight (doubled for mask in ICO)
  buffer.writeUInt16LE(1, headerOffset + 12);         // biPlanes
  buffer.writeUInt16LE(bpp, headerOffset + 14);       // biBitCount
  buffer.writeUInt32LE(0, headerOffset + 16);         // biCompression (BI_RGB)
  buffer.writeUInt32LE(imageSize - 40, headerOffset + 20); // biSizeImage
  buffer.writeInt32LE(0, headerOffset + 24);         // biXPelsPerMeter
  buffer.writeInt32LE(0, headerOffset + 28);         // biYPelsPerMeter
  buffer.writeUInt32LE(0, headerOffset + 32);        // biClrUsed
  buffer.writeUInt32LE(0, headerOffset + 36);        // biClrImportant

  // Warm coral rose color: RGBA(224, 122, 95, 255) -> BGRA in BMP: 95, 122, 224, 255
  const pixelOffset = headerOffset + 40;
  for (let i = 0; i < width * height; i++) {
    const idx = pixelOffset + (i * 4);
    // Draw a neat filled circular badge
    const x = i % width;
    const y = Math.floor(i / width);
    const dx = x - 15.5;
    const dy = y - 15.5;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist <= 14) {
      buffer.writeUInt8(95, idx);     // B
      buffer.writeUInt8(122, idx + 1); // G
      buffer.writeUInt8(224, idx + 2); // R
      buffer.writeUInt8(255, idx + 3); // A
    } else {
      buffer.writeUInt8(0, idx);
      buffer.writeUInt8(0, idx + 1);
      buffer.writeUInt8(0, idx + 2);
      buffer.writeUInt8(0, idx + 3);
    }
  }

  // AND mask (all 0 for transparent or 32bpp)
  // already zeroes in Buffer.alloc
  
  return buffer;
}

const icoBuf = createMinimalIco();
fs.writeFileSync(path.join(process.cwd(), 'public', 'favicon.ico'), icoBuf);
console.log('Successfully wrote clean valid favicon.ico, size:', icoBuf.length);
