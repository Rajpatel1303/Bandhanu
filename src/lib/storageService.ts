import { supabase, isSupabaseConfigured } from './supabaseClient';
import { optimizeImage, formatBytes } from '../utils/imageOptimizer';

export const MEDIA_BUCKET = 'bandhanu-media';
const STORAGE_MEDIA_LIBRARY_KEY = 'bandhanu_media_library';

export interface UploadProgress {
  stage: 'optimizing' | 'uploading' | 'completed' | 'error';
  message: string;
  originalSize?: number;
  optimizedSize?: number;
}

/**
 * Retrieves the local media library cache
 */
export function getMediaLibrary(): string[] {
  try {
    const saved = localStorage.getItem(STORAGE_MEDIA_LIBRARY_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Saves a URL to the media library cache
 */
export function addToMediaLibrary(url: string): void {
  try {
    if (!url || typeof url !== 'string') return;
    const current = getMediaLibrary();
    const isData = url.startsWith('data:');
    const filtered = current.filter(u => u !== url);
    // Limit base64 data URLs to prevent filling up localStorage quota
    let updated: string[];
    if (isData) {
      const nonData = filtered.filter(u => !u.startsWith('data:'));
      const recentData = filtered.filter(u => u.startsWith('data:')).slice(0, 2);
      updated = [url, ...recentData, ...nonData].slice(0, 30);
    } else {
      updated = [url, ...filtered].slice(0, 40);
    }
    localStorage.setItem(STORAGE_MEDIA_LIBRARY_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Could not update media library in localStorage, clearing large items:', err);
    try {
      localStorage.removeItem(STORAGE_MEDIA_LIBRARY_KEY);
    } catch {}
  }
}

/**
 * Removes a URL from the media library cache
 */
export function removeFromMediaLibrary(url: string): void {
  try {
    const current = getMediaLibrary();
    const updated = current.filter(u => u !== url);
    localStorage.setItem(STORAGE_MEDIA_LIBRARY_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Could not remove from media library:', err);
  }
}

/**
 * Uploads an image file with automatic client-side compression and cloud storage upload.
 * Falls back safely to high-compression WebP data URL if Supabase is offline.
 */
export async function uploadMediaFile(
  file: File,
  folder: 'products' | 'categories' | 'banners' | 'cms' = 'products',
  onProgress?: (progress: UploadProgress) => void
): Promise<string> {
  // 1. Optimize image client-side first
  onProgress?.({
    stage: 'optimizing',
    message: `Compressing ${file.name} (${formatBytes(file.size)})...`
  });

  const maxDim = folder === 'banners' ? 1600 : folder === 'cms' ? 1000 : 1200;
  const optimization = await optimizeImage(file, {
    maxWidth: maxDim,
    maxHeight: maxDim,
    quality: folder === 'cms' ? 0.78 : 0.80,
    format: 'image/webp'
  });

  const { blob, dataUrl, originalSize, optimizedSize } = optimization;

  onProgress?.({
    stage: 'optimizing',
    message: `Reduced by ${Math.round(((originalSize - optimizedSize) / originalSize) * 100)}% (${formatBytes(originalSize)} → ${formatBytes(optimizedSize)})`,
    originalSize,
    optimizedSize
  });

  // 2. If Supabase is configured, upload to Supabase Storage
  if (isSupabaseConfigured) {
    try {
      onProgress?.({
        stage: 'uploading',
        message: 'Uploading to Cloud Media Storage...',
        originalSize,
        optimizedSize
      });

      const cleanName = file.name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .substring(0, 30);
      const uniqueFilename = `${folder}/${Date.now()}-${cleanName || 'image'}.webp`;

      const { error: uploadError } = await supabase.storage
        .from(MEDIA_BUCKET)
        .upload(uniqueFilename, blob, {
          contentType: 'image/webp',
          cacheControl: '31536000',
          upsert: true
        });

      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage
          .from(MEDIA_BUCKET)
          .getPublicUrl(uniqueFilename);

        if (publicUrlData?.publicUrl) {
          const finalUrl = publicUrlData.publicUrl;
          addToMediaLibrary(finalUrl);
          onProgress?.({
            stage: 'completed',
            message: 'Uploaded to cloud successfully!',
            originalSize,
            optimizedSize
          });
          return finalUrl;
        }
      } else {
        console.warn('Supabase storage upload error, falling back to local compressed image:', uploadError.message);
      }
    } catch (err: any) {
      console.warn('Supabase storage exception, falling back to local compressed image:', err?.message || err);
    }
  }

  // 3. Fallback: Return the high-compression WebP data URL
  addToMediaLibrary(dataUrl);
  onProgress?.({
    stage: 'completed',
    message: 'Saved locally as optimized WebP!',
    originalSize,
    optimizedSize
  });

  return dataUrl;
}
