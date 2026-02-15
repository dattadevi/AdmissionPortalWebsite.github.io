// components/ar/SketchfabViewer.tsx
import { useState } from 'react';
import { Loader2, Maximize2, Minimize2, RotateCcw } from 'lucide-react';
import { Button } from '../ui/button';

type SketchfabViewerProps = {
  modelUrl: string;
  title: string;
  className?: string;
  allowFullscreen?: boolean;
  autostart?: boolean;
  showControls?: boolean;
};

export function SketchfabViewer({
  modelUrl,
  title,
  className = '',
  allowFullscreen = true,
  autostart = true,
  showControls = true,
}: SketchfabViewerProps) {
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Build embed URL with parameters
  const embedUrl = new URL(modelUrl);
  if (autostart) embedUrl.searchParams.set('autostart', '1');
  embedUrl.searchParams.set('ui_theme', 'dark');
  embedUrl.searchParams.set('ui_infos', '0');
  embedUrl.searchParams.set('ui_watermark', '0');
  embedUrl.searchParams.set('ui_help', '0');

  const handleFullscreen = () => {
    const container = document.getElementById(`sketchfab-${title.replace(/\s/g, '-')}`);
    if (container) {
      if (!document.fullscreenElement) {
        container.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div
      id={`sketchfab-${title.replace(/\s/g, '-')}`}
      className={`relative rounded-xl overflow-hidden bg-slate-900 group ${className}`}
    >
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900">
          <Loader2 className="h-10 w-10 text-white animate-spin mb-3" />
          <p className="text-white text-sm font-medium">Loading 3D Model...</p>
          <p className="text-purple-200 text-xs mt-1">{title}</p>
        </div>
      )}

      {/* Sketchfab iframe */}
      <iframe
        title={title}
        src={embedUrl.toString()}
        className="w-full h-full border-0"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        allowFullScreen
        onLoad={() => setLoading(false)}
        style={{ minHeight: '100%' }}
      />

      {/* Controls Overlay */}
      {showControls && !loading && (
        <div className="absolute top-3 right-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {allowFullscreen && (
            <Button
              size="sm"
              variant="secondary"
              className="bg-black/60 hover:bg-black/80 text-white border-0 backdrop-blur-sm"
              onClick={handleFullscreen}
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      )}

      {/* Title Bar */}
      {!loading && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-sm font-medium">{title}</p>
          <p className="text-white/60 text-xs">Drag to rotate • Scroll to zoom • Right-click to pan</p>
        </div>
      )}
    </div>
  );
}