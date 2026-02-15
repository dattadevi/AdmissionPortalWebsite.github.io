// components/ar/AREntry.tsx
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import {
  Smartphone,
  Monitor,
  QrCode,
  ArrowLeft,
  Glasses,
  Hand,
  RotateCcw,
  ZoomIn,
  Move,
  Sparkles,
} from 'lucide-react';

type ARMode = 'marker' | 'markerless' | null;

type AREntryProps = {
  onStartAR: (mode: ARMode) => void;
};

export function AREntry({ onStartAR }: AREntryProps) {
  const [selectedMode, setSelectedMode] = useState<ARMode>(null);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-purple-500/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-purple-500/10 rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-2xl shadow-purple-500/30">
            <Glasses className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            AR Department Tour
          </h1>
          <p className="text-purple-200 text-lg">
            Choose how you want to explore our campus
          </p>
        </div>

        {/* Mode Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Marker-based AR */}
          <Card
            className={`cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-2 bg-white/5 backdrop-blur-sm ${
              selectedMode === 'marker'
                ? 'border-purple-400 shadow-2xl shadow-purple-500/20 bg-purple-500/10'
                : 'border-white/10 hover:border-purple-400/50'
            }`}
            onClick={() => setSelectedMode('marker')}
          >
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl mb-4">
                <QrCode className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Marker-Based AR</h3>
              <p className="text-purple-200 text-sm mb-4">
                Scan QR codes or markers placed around campus to view 3D models and information
              </p>
              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2 text-purple-300 text-xs">
                  <Smartphone className="h-3 w-3" />
                  <span>Requires camera access</span>
                </div>
                <div className="flex items-center gap-2 text-purple-300 text-xs">
                  <QrCode className="h-3 w-3" />
                  <span>Scan printed markers</span>
                </div>
                <div className="flex items-center gap-2 text-purple-300 text-xs">
                  <Sparkles className="h-3 w-3" />
                  <span>Interactive 3D models</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Markerless AR */}
          <Card
            className={`cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-2 bg-white/5 backdrop-blur-sm ${
              selectedMode === 'markerless'
                ? 'border-pink-400 shadow-2xl shadow-pink-500/20 bg-pink-500/10'
                : 'border-white/10 hover:border-pink-400/50'
            }`}
            onClick={() => setSelectedMode('markerless')}
          >
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-4">
                <Monitor className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">3D Model Viewer</h3>
              <p className="text-purple-200 text-sm mb-4">
                Explore interactive 3D models of campus facilities directly in your browser
              </p>
              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2 text-purple-300 text-xs">
                  <RotateCcw className="h-3 w-3" />
                  <span>360° rotation</span>
                </div>
                <div className="flex items-center gap-2 text-purple-300 text-xs">
                  <ZoomIn className="h-3 w-3" />
                  <span>Zoom in/out</span>
                </div>
                <div className="flex items-center gap-2 text-purple-300 text-xs">
                  <Hand className="h-3 w-3" />
                  <span>Click hotspots for info</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl shadow-purple-500/25 px-8"
            disabled={!selectedMode}
            onClick={() => selectedMode && onStartAR(selectedMode)}
          >
            <Sparkles className="h-5 w-5 mr-2" />
            {selectedMode
              ? `Start ${selectedMode === 'marker' ? 'Marker AR' : '3D Viewer'}`
              : 'Select a Mode'}
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="w-full sm:w-auto text-purple-200 hover:text-white hover:bg-white/10"
            onClick={() => onStartAR(null)}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center">
          <p className="text-purple-400 text-xs">
            For the best experience, use a modern browser with WebGL support.
            <br />
            Mobile devices support touch gestures for 3D interaction.
          </p>
        </div>
      </div>
    </div>
  );
}