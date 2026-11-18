import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  Camera,
  Loader2,
  CheckCircle2,
  Trash2,
  Plus,
  Sparkles
} from 'lucide-react';
import {
  uploadMediaFile,
  getMediaLibrary,
  addToMediaLibrary,
  removeFromMediaLibrary,
  UploadProgress
} from '../../lib/storageService';

interface MediaUploaderProps {
  onImagesSelected: (urls: string[]) => void;
  multiple?: boolean;
  folder?: 'products' | 'categories' | 'banners' | 'cms';
  title?: string;
  className?: string;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({
  onImagesSelected,
  multiple = false,
  folder = 'products',
  title,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'library'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressState, setProgressState] = useState<UploadProgress | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [mediaLibrary, setMediaLibrary] = useState<string[]>([]);
  const [selectedLibraryUrls, setSelectedLibraryUrls] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Load media library
  useEffect(() => {
    setMediaLibrary(getMediaLibrary());
  }, [activeTab]);

  const handleFiles = async (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    if (validFiles.length === 0) return;

    setIsProcessing(true);
    const uploadedUrls: string[] = [];

    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      try {
        const url = await uploadMediaFile(file, folder, progress => {
          setProgressState(progress);
        });
        uploadedUrls.push(url);
      } catch (err: any) {
        console.error('Error uploading file:', file.name, err);
      }
    }

    setIsProcessing(false);
    setProgressState(null);

    if (uploadedUrls.length > 0) {
      onImagesSelected(uploadedUrls);
      setMediaLibrary(getMediaLibrary());
    }

    // Reset inputs
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleAddUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    addToMediaLibrary(trimmed);
    onImagesSelected([trimmed]);
    setUrlInput('');
    setMediaLibrary(getMediaLibrary());
  };

  const toggleSelectLibraryItem = (url: string) => {
    if (multiple) {
      setSelectedLibraryUrls(prev =>
        prev.includes(url) ? prev.filter(u => u !== url) : [...prev, url]
      );
    } else {
      onImagesSelected([url]);
    }
  };

  const handleConfirmLibrarySelection = () => {
    if (selectedLibraryUrls.length > 0) {
      onImagesSelected(selectedLibraryUrls);
      setSelectedLibraryUrls([]);
    }
  };

  const handleDeleteFromLibrary = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    removeFromMediaLibrary(url);
    setMediaLibrary(getMediaLibrary());
    setSelectedLibraryUrls(prev => prev.filter(u => u !== url));
  };

  return (
    <div className={`p-3 sm:p-4 rounded-2xl bg-heritage-sand/20 dark:bg-heritage-darkCard border border-heritage-gold/30 shadow-xs w-full overflow-hidden ${className}`}>
      {/* Header Info */}
      <div className="space-y-2 pb-2.5 border-b border-heritage-gold/20 mb-3">
        <div className="flex items-center justify-between gap-2">
          <span className="font-serif font-bold text-xs uppercase tracking-wider text-heritage-crimson dark:text-heritage-gold flex items-center gap-1.5 truncate">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{title || (multiple ? 'Upload & Manage Photos' : 'Select Photo')}</span>
          </span>
          <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium shrink-0">
            {multiple ? 'Multi-select' : 'Single photo'}
          </span>
        </div>

        {/* Full-width Responsive Tabs (Always 3 equal columns, never wraps awkwardly) */}
        <div className="grid grid-cols-3 gap-1 bg-white/70 dark:bg-heritage-darkSurface/70 p-1 rounded-xl border border-heritage-gold/25 text-[11px] sm:text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`py-1.5 px-1 sm:px-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-1 sm:gap-1.5 text-center truncate cursor-pointer ${
              activeTab === 'upload'
                ? 'bg-heritage-crimson text-white shadow-xs'
                : 'text-heritage-charcoal dark:text-gray-300 hover:text-heritage-crimson hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <Upload className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="truncate">Gallery / Files</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`py-1.5 px-1 sm:px-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-1 sm:gap-1.5 text-center truncate cursor-pointer ${
              activeTab === 'url'
                ? 'bg-heritage-crimson text-white shadow-xs'
                : 'text-heritage-charcoal dark:text-gray-300 hover:text-heritage-crimson hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <LinkIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="truncate">Web Link</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('library')}
            className={`py-1.5 px-1 sm:px-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-1 sm:gap-1.5 text-center truncate cursor-pointer ${
              activeTab === 'library'
                ? 'bg-heritage-crimson text-white shadow-xs'
                : 'text-heritage-charcoal dark:text-gray-300 hover:text-heritage-crimson hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <ImageIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="truncate">Library {mediaLibrary.length > 0 && `(${mediaLibrary.length})`}</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Upload from Device / Gallery / Camera */}
      {activeTab === 'upload' && (
        <div className="space-y-3">
          <div
            onDragOver={e => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`relative p-4 sm:p-5 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center ${
              isDragging
                ? 'border-heritage-crimson bg-heritage-crimson/5 scale-[1.01]'
                : 'border-heritage-gold/40 hover:border-heritage-crimson/60 bg-white/40 dark:bg-heritage-darkSurface/40'
            }`}
          >
            {isProcessing ? (
              <div className="py-4 space-y-2 flex flex-col items-center">
                <Loader2 className="w-8 h-8 text-heritage-crimson animate-spin" />
                <p className="font-semibold text-xs text-heritage-charcoal dark:text-white">
                  {progressState?.message || 'Processing photo...'}
                </p>
                <span className="text-[10px] text-gray-500">
                  Auto-optimizing dimensions & converting to fast WebP
                </span>
              </div>
            ) : (
              <>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-heritage-gold/15 text-heritage-crimson dark:text-heritage-gold flex items-center justify-center mb-1.5 shadow-xs shrink-0">
                  <Upload className="w-5 h-5" />
                </div>

                <p className="font-semibold text-xs text-heritage-charcoal dark:text-white">
                  Drag & drop your photo(s) here, or browse
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5 mb-3 max-w-xs">
                  JPG, PNG, WEBP, HEIC supported • Auto-compressed for fast loading
                </p>

                {/* Responsive Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full max-w-xs sm:max-w-none">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-heritage-crimson text-white hover:bg-heritage-ruby font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <ImageIcon className="w-3.5 h-3.5 shrink-0" />
                    <span>Browse Gallery / Files</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => cameraInputRef.current?.click()}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl border border-heritage-gold/50 bg-white dark:bg-heritage-darkSurface hover:bg-heritage-sand text-heritage-charcoal dark:text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5 text-heritage-crimson shrink-0" />
                    <span>Take Photo</span>
                  </button>
                </div>
              </>
            )}

            {/* Hidden Inputs */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple={multiple}
              onChange={e => e.target.files && handleFiles(e.target.files)}
              className="hidden"
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={e => e.target.files && handleFiles(e.target.files)}
              className="hidden"
            />
          </div>
        </div>
      )}

      {/* Tab 2: Paste URL */}
      {activeTab === 'url' && (
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="url"
            placeholder="Paste image link (https://...)"
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddUrl();
              }
            }}
            className="flex-1 p-2.5 rounded-xl border border-heritage-gold/30 bg-white dark:bg-heritage-darkSurface text-heritage-charcoal dark:text-white text-xs focus:outline-none focus:border-heritage-crimson"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            disabled={!urlInput.trim()}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-heritage-crimson hover:bg-heritage-ruby text-white font-semibold text-xs flex items-center justify-center gap-1.5 disabled:opacity-40 transition-all shrink-0 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 shrink-0" />
            <span>Add URL</span>
          </button>
        </div>
      )}

      {/* Tab 3: Media Library */}
      {activeTab === 'library' && (
        <div className="space-y-3">
          {mediaLibrary.length === 0 ? (
            <div className="py-6 text-center text-gray-400 text-xs">
              <ImageIcon className="w-7 h-7 mx-auto mb-1 text-gray-300 dark:text-gray-600" />
              <span>No photos in your media library yet. Upload some via "Gallery / Files".</span>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1">
                {mediaLibrary.map((url, idx) => {
                  const isSelected = selectedLibraryUrls.includes(url);
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleSelectLibraryItem(url)}
                      className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all group ${
                        isSelected
                          ? 'border-heritage-crimson ring-2 ring-heritage-crimson/30 scale-95'
                          : 'border-heritage-gold/25 hover:border-heritage-gold'
                      }`}
                    >
                      <img src={url} alt="" className="w-full h-full object-cover" />

                      {isSelected && (
                        <div className="absolute inset-0 bg-heritage-crimson/30 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-white drop-shadow-md" />
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={e => handleDeleteFromLibrary(e, url)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-black/60 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove from library"
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {multiple && selectedLibraryUrls.length > 0 && (
                <div className="flex items-center justify-between pt-2 border-t border-heritage-gold/20">
                  <span className="text-xs text-heritage-charcoal dark:text-gray-300 font-semibold">
                    {selectedLibraryUrls.length} photo(s) selected
                  </span>
                  <button
                    type="button"
                    onClick={handleConfirmLibrarySelection}
                    className="px-4 py-1.5 rounded-xl bg-heritage-crimson text-white font-semibold text-xs hover:bg-heritage-ruby cursor-pointer"
                  >
                    Add Selected to Product
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
