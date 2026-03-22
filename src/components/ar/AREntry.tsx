import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Button } from '../ui/button';
import {
  Smartphone,
  Monitor,
  ArrowLeft,
  Glasses,
  Hand,
  RotateCcw,
  ZoomIn,
  Sparkles,
} from 'lucide-react';

type ARMode = 'marker' | 'markerless' | null;

type AREntryProps = {
  onStartAR: (mode: ARMode) => void;
};

export function AREntry({ onStartAR }: AREntryProps) {
  const [selectedMode, setSelectedMode] = useState<ARMode>('markerless');
  const mobileUrl = 'https://dattadevi.github.io/AdmissionPortalWebsite.github.io/#/ar-tour';

  return (
    // FORCED DARK BACKGROUND WITH INLINE STYLE
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto"
      style={{ backgroundColor: '#0f172a' }} // Strict Slate-900
    >
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[100px] animate-pulse" 
          style={{ backgroundColor: 'rgba(147, 51, 234, 0.2)' }} 
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[100px] animate-pulse delay-1000" 
          style={{ backgroundColor: 'rgba(236, 72, 153, 0.2)' }} 
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-6 shadow-lg">
            <Glasses className="h-10 w-10 text-white" />
          </div>
          <h1 
            className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
            style={{ color: '#ffffff' }}
          >
            AR Department Tour
          </h1>
          <p 
            className="text-lg"
            style={{ color: '#cbd5e1' }}
          >
            Choose how you want to explore our campus
          </p>
        </div>

        {/* The Two Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          
          {/* LEFT CARD: MOBILE QR SCANNER */}
          <div 
            className="rounded-2xl p-8 text-center flex flex-col items-center justify-center shadow-xl backdrop-blur-md"
            style={{ 
              backgroundColor: 'rgba(30, 41, 59, 0.8)', 
              border: '1px solid #334155' 
            }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl mb-6 shadow-md">
              <Smartphone className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3" style={{ color: '#ffffff' }}>Experience on Mobile</h3>
            <p className="text-sm mb-8 px-4" style={{ color: '#94a3b8' }}>
              Scan this QR code with your phone's camera to open the AR Tour directly on your mobile device.
            </p>
            
            {/* QR Code */}
            <div className="p-4 rounded-2xl shadow-xl inline-block" style={{ backgroundColor: '#ffffff' }}>
              <QRCodeCanvas 
                value={mobileUrl} 
                size={160} 
                bgColor="#ffffff" 
                fgColor="#000000" 
                level="H" 
                includeMargin={false} 
              />
            </div>
          </div>

          {/* RIGHT CARD: DESKTOP 3D VIEWER */}
          <div
            className={`cursor-pointer transition-all duration-300 rounded-2xl p-8 text-center flex flex-col items-center justify-center backdrop-blur-md ${
              selectedMode === 'markerless' ? 'scale-[1.02] shadow-2xl' : ''
            }`}
            style={{ 
              backgroundColor: selectedMode === 'markerless' ? 'rgba(30, 41, 59, 0.95)' : 'rgba(30, 41, 59, 0.5)',
              border: selectedMode === 'markerless' ? '2px solid #ec4899' : '1px solid #334155',
              boxShadow: selectedMode === 'markerless' ? '0 0 20px rgba(236, 72, 153, 0.2)' : 'none'
            }}
            onClick={() => setSelectedMode('markerless')}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-6 shadow-md">
              <Monitor className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3" style={{ color: '#ffffff' }}>Desktop 3D Viewer</h3>
            <p className="text-sm mb-8 px-4" style={{ color: '#94a3b8' }}>
              Explore interactive 3D models of campus facilities right here in your computer browser.
            </p>
            
            <div 
              className="space-y-4 text-left w-full max-w-[220px] mx-auto p-5 rounded-xl"
              style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', border: '1px solid #334155' }}
            >
              <div className="flex items-center gap-3">
                <RotateCcw className="h-5 w-5" style={{ color: '#f472b6' }} />
                <span className="font-medium" style={{ color: '#e2e8f0' }}>360° rotation</span>
              </div>
              <div className="flex items-center gap-3">
                <ZoomIn className="h-5 w-5" style={{ color: '#f472b6' }} />
                <span className="font-medium" style={{ color: '#e2e8f0' }}>Scroll to zoom</span>
              </div>
              <div className="flex items-center gap-3">
                <Hand className="h-5 w-5" style={{ color: '#f472b6' }} />
                <span className="font-medium" style={{ color: '#e2e8f0' }}>Click hotspots</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="w-full sm:w-auto min-w-[260px] h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-xl border-0 rounded-xl"
            disabled={!selectedMode}
            onClick={() => selectedMode && onStartAR(selectedMode)}
          >
            <Sparkles className="h-6 w-6 mr-2" />
            Start 3D Viewer
          </Button>

          <Button
            size="lg"
            variant="ghost"
            className="w-full sm:w-auto h-14 text-lg rounded-xl hover:bg-slate-800"
            style={{ color: '#cbd5e1' }}
            onClick={() => onStartAR(null)}
          >
            <ArrowLeft className="h-6 w-6 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}