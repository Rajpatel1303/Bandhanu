export interface OptimizationResult {
  blob: Blob;
  dataUrl: string;
  originalSize: number;
  optimizedSize: number;
  width: number;
  height: number;
}

interface OptimizeOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0 to 1
  format?: 'image/webp' | 'image/jpeg';
}

/**
 * Optimizes, resizes and compresses an image in-browser before upload.
 * Can shrink a 12MB phone camera photo down to ~150KB-300KB without visible quality loss.
 */
export async function optimizeImage(
  file: File | Blob,
  options: OptimizeOptions = {}
): Promise<OptimizationResult> {
  const {
    maxWidth = 1600,
    maxHeight = 1600,
    quality = 0.82,
    format = 'image/webp'
  } = options;

  return new Promise((resolve, reject) => {
    const originalSize = file.size;
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let { width, height } = img;

      // Calculate constrained dimensions preserving aspect ratio
      if (width > maxWidth || height > maxHeight) {
        if (width / height > maxWidth / maxHeight) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas 2D context could not be created'));
        return;
      }

      // Smooth resizing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      // Try webp first, fallback to jpeg if browser doesn't support webp canvas export
      let chosenFormat = format;
      let dataUrl = canvas.toDataURL(chosenFormat, quality);
      if (!dataUrl.startsWith(`data:${chosenFormat}`)) {
        chosenFormat = 'image/jpeg';
        dataUrl = canvas.toDataURL(chosenFormat, quality);
      }

      canvas.toBlob(
        blob => {
          if (!blob) {
            reject(new Error('Canvas toBlob failed'));
            return;
          }

          resolve({
            blob,
            dataUrl,
            originalSize,
            optimizedSize: blob.size,
            width,
            height
          });
        },
        chosenFormat,
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image for optimization'));
    };

    img.src = objectUrl;
  });
}

/**
 * Format bytes into human readable format (KB, MB)
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
