// src/components/ar/ARViewer.tsx
import { useState } from 'react';
import { Button } from '../ui/button';
import { QRCodeCanvas } from 'qrcode.react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Info,
  RotateCcw,
  Eye,
  MapPin,
  Map,
  ExternalLink
} from 'lucide-react';
import { SketchfabViewer } from './SketchfabViewer';

type ARMode = 'marker' | 'markerless';

type ARViewerProps = {
  mode: ARMode;
  onExit: () => void;
  onHotspotClick: (hotspot: { id: string; name: string }) => void;
};

type SceneData = {
  id: string;
  name: string;
  description: string;
  modelUrl: string;
  mapUrl: string;
  hotspots: { id: string; name: string; x: string; y: string }[];
};

export function ARViewer({ mode, onExit, onHotspotClick }: ARViewerProps) {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [showQR, setShowQR] = useState(false); 

  const scenes: SceneData[] = [
    {
      id: 'lab1',
      name: 'Computer Lab',
      description: 'Advanced computing facility.',
      modelUrl: 'https://sketchfab.com/models/3c8f1c2e09cd401ca7d1e033f5ed3b48/embed',
      mapUrl: 'https://www.google.com/maps?q=13.069249686959706,80.17780336490287',
      hotspots: [
        { id: '1', name: 'Workstations', x: '20%', y: '60%' },
        { id: '2', name: 'Network Rack', x: '70%', y: '40%' },
      ],
    },
    {
      id: 'innovation',
      name: 'Innovation Hub (Server Room)',
      description: 'Hidden server room powering our cloud infrastructure.',
      modelUrl: 'https://sketchfab.com/models/389287fd60214578a8b330fcee85b483/embed',
      mapUrl: 'https://www.google.com/maps?q=13.06948780446161,80.17795950668388',
      hotspots: [
        { id: '4', name: 'Main Server Rack', x: '35%', y: '50%' },
        { id: '5', name: 'Cooling System', x: '65%', y: '45%' },
        { id: '6', name: 'Control Console', x: '50%', y: '70%' },
      ],
    },
    {
      id: 'library',
      name: 'Central Library',
      description: 'A cozy environment for study and research.',
      modelUrl: 'https://sketchfab.com/models/270abad26be246dd85e0b56dfbef7aa9/embed',
      mapUrl: 'https://www.google.com/maps?q=13.070239716106993,80.17842201348843',
      hotspots: [
        { id: '7', name: 'Reading Desk', x: '45%', y: '65%' },
        { id: '8', name: 'Book Archives', x: '20%', y: '40%' },
        { id: '9', name: 'Search Terminal', x: '75%', y: '55%' },
      ],
    },
    {
      id: 'cafeteria',
      name: 'Campus Cafe',
      description: 'Relax with coffee and snacks.',
      modelUrl: 'https://sketchfab.com/models/850452848b2d4e9289c341a4198951ed/embed',
      mapUrl: 'https://www.google.com/maps?q=13.070705775897615,80.17822106225464',
      hotspots: [
        { id: '10', name: 'Coffee Bar', x: '30%', y: '50%' },
        { id: '11', name: 'Window Seating', x: '60%', y: '60%' },
        { id: '12', name: 'Menu Board', x: '80%', y: '30%' },
      ],
    },
    {
      id: 'placement',
      name: 'Placement Conference Room',
      description: 'Professional setting for interviews and group discussions.',
      modelUrl: 'https://sketchfab.com/models/bdaa8e9990884bba9a0b0a9479e83612/embed',
      mapUrl: 'https://www.google.com/maps?q=13.069487804465362,80.17810623297957',
      hotspots: [
        { id: '13', name: 'Meeting Table', x: '50%', y: '60%' },
        { id: '14', name: 'Presentation Screen', x: '25%', y: '40%' },
        { id: '15', name: 'Panel Seats', x: '75%', y: '55%' },
      ],
    },
  ];

  const currentScene = scenes[currentSceneIndex];

  const goToNextScene = () => {
    setCurrentSceneIndex((prev) => (prev + 1) % scenes.length);
    setShowInfo(false);
    setShowQR(false);
  };

  const goToPrevScene = () => {
    setCurrentSceneIndex((prev) => (prev - 1 + scenes.length) % scenes.length);
    setShowInfo(false);
    setShowQR(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/90 to-transparent p-4 flex justify-between items-start">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-full bg-black/40 backdrop-blur-md" onClick={onExit}>
            <X className="h-5 w-5" />
          </Button>
          <div className="text-white bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full">
             <h2 className="font-semibold text-sm md:text-base">{currentScene.name}</h2>
             <p className="text-[10px] md:text-xs text-purple-300">Scene {currentSceneIndex + 1} of {scenes.length}</p>
          </div>
        </div>
        
        {/* Top Right Controls */}
        <div className="flex flex-col gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`rounded-full backdrop-blur-md transition-colors ${showQR ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-black/40 text-white hover:bg-white/20'}`} 
            onClick={() => {
              setShowQR(!showQR);
              setShowInfo(false);
            }}
          >
            <Map className="h-5 w-5 mr-2" />
            <span className="hidden md:inline text-sm">GPS Location</span>
          </Button>

          <Button 
            variant="ghost" 
            size="sm" 
            className={`rounded-full backdrop-blur-md transition-colors ${showInfo ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-black/40 text-white hover:bg-white/20'}`} 
            onClick={() => {
              setShowInfo(!showInfo);
              setShowQR(false);
            }}
          >
            <Info className="h-5 w-5 mr-2" />
            <span className="hidden md:inline text-sm">Details</span>
          </Button>
        </div>
      </div>

      {/* 3D Viewer */}
      <div className="flex-1 relative bg-slate-900">
        <SketchfabViewer
            key={currentScene.id}
            modelUrl={currentScene.modelUrl}
            title={currentScene.name}
            className="w-full h-full"
            showControls={false}
        />
        
        {/* Hotspots */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {currentScene.hotspots.map((hotspot) => (
            <button
              key={hotspot.id}
              className="absolute pointer-events-auto group"
              style={{ left: hotspot.x, top: hotspot.y }}
              onClick={() => onHotspotClick(hotspot)}
            >
              <div className="relative">
                <div className="absolute -inset-3 bg-purple-500/20 rounded-full animate-ping" />
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div className="absolute left-10 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap backdrop-blur-sm border border-white/10 transition-opacity">
                   {hotspot.name}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* OVERLAY: Google Maps QR Code */}
      {showQR && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in zoom-in duration-200 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 md:p-8 shadow-2xl max-w-sm w-full text-center relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full"
              onClick={() => setShowQR(false)}
            >
              <X className="h-5 w-5" />
            </Button>
            
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-full mb-4">
              <MapPin className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{currentScene.name} Location</h3>
            <p className="text-sm text-slate-400 mb-6">Scan this QR code with your phone to navigate to this facility via Google Maps.</p>
            
            <div className="bg-white p-4 rounded-xl shadow-inner inline-block mx-auto mb-6">
              <QRCodeCanvas
                value={currentScene.mapUrl}
                size={180}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
                includeMargin={false}
              />
            </div>
            
            <a href={currentScene.mapUrl} target="_blank" rel="noopener noreferrer" className="block w-full">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-12">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Map Link Directly
              </Button>
            </a>
          </div>
        </div>
      )}

      {/* Info Panel */}
      {showInfo && (
        <div className="absolute right-0 top-20 bottom-20 w-80 bg-black/80 backdrop-blur-xl border-l border-white/10 p-6 z-30 text-white animate-in slide-in-from-right rounded-l-2xl shadow-2xl overflow-y-auto">
           <h3 className="font-bold text-lg mb-2 text-purple-300">{currentScene.name}</h3>
           <p className="text-sm text-slate-300 mb-6 leading-relaxed">{currentScene.description}</p>
           
           <h4 className="font-semibold text-white/50 uppercase tracking-wider text-xs mb-3 border-b border-white/10 pb-2">Points of Interest</h4>
           <div className="space-y-2">
             {currentScene.hotspots.map(h => (
               <div 
                 key={h.id} 
                 className="flex items-center gap-3 text-sm bg-white/5 p-3 rounded-lg cursor-pointer hover:bg-purple-500/20 hover:border-purple-500/30 border border-transparent transition-all" 
                 onClick={() => onHotspotClick(h)}
               >
                 <div className="bg-purple-500/20 p-1.5 rounded-md">
                   <Eye className="h-4 w-4 text-purple-400" />
                 </div>
                 <span className="font-medium text-slate-200">{h.name}</span>
               </div>
             ))}
           </div>
        </div>
      )}

      {/* Bottom Nav */}
      <div className="absolute bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-black/90 to-transparent">
         <div className="flex justify-between items-center max-w-3xl mx-auto bg-black/40 backdrop-blur-md px-2 py-2 rounded-full border border-white/10">
           <Button variant="ghost" className="text-white hover:bg-white/20 rounded-full" onClick={goToPrevScene}>
              <ChevronLeft className="mr-2 h-5 w-5" /> Previous
           </Button>
           
           <div className="flex gap-2">
             {scenes.map((_, i) => (
               <div key={i} className={`h-2 rounded-full transition-all ${i === currentSceneIndex ? 'w-8 bg-purple-500' : 'w-2 bg-white/30'}`} />
             ))}
           </div>

           <Button variant="ghost" className="text-white hover:bg-white/20 rounded-full" onClick={goToNextScene}>
              Next <ChevronRight className="ml-2 h-5 w-5" />
           </Button>
         </div>
      </div>
    </div>
  );
}