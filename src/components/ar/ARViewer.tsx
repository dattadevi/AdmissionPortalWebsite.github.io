// components/ar/ARViewer.tsx
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Info,
  Maximize2,
  RotateCcw,
  Eye,
  MapPin,
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
  hotspots: { id: string; name: string; x: string; y: string }[];
};

export function ARViewer({ mode, onExit, onHotspotClick }: ARViewerProps) {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const scenes: SceneData[] = [
    {
      id: 'lab1',
      name: 'Computer Lab',
      description: 'Advanced computing facility.',
      modelUrl: 'https://sketchfab.com/models/3c8f1c2e09cd401ca7d1e033f5ed3b48/embed',
      hotspots: [
        { id: '1', name: 'Workstations', x: '20%', y: '60%' },
        { id: '2', name: 'Network Rack', x: '70%', y: '40%' },
      ],
    },
    {
      id: 'innovation',
      name: 'Innovation Hub (Server Room)',
      description: 'Hidden server room powering our cloud infrastructure.',
      // Hidden Server Room
      modelUrl: 'https://sketchfab.com/models/389287fd60214578a8b330fcee85b483/embed',
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
      // Cartoon Library Interior
      modelUrl: 'https://sketchfab.com/models/270abad26be246dd85e0b56dfbef7aa9/embed',
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
      // Cozy Coffee Shop
      modelUrl: 'https://sketchfab.com/models/850452848b2d4e9289c341a4198951ed/embed',
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
      // Conference Room
      modelUrl: 'https://sketchfab.com/models/bdaa8e9990884bba9a0b0a9479e83612/embed',
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
  };

  const goToPrevScene = () => {
    setCurrentSceneIndex((prev) => (prev - 1 + scenes.length) % scenes.length);
    setShowInfo(false);
  };

  const toggleFullscreen = () => {
    const el = document.getElementById('ar-viewer-container');
    if (el) {
      if (!document.fullscreenElement) {
        el.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div
      id="ar-viewer-container"
      className="fixed inset-0 z-50 bg-black flex flex-col"
    >
      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20 rounded-full"
              onClick={onExit}
            >
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="text-white font-semibold text-sm md:text-base">
                {currentScene.name}
              </h2>
              <p className="text-white/60 text-xs">
                {mode === 'marker' ? 'Marker AR Mode' : '3D Viewer Mode'} •
                Scene {currentSceneIndex + 1}/{scenes.length}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20 rounded-full"
              onClick={() => setShowInfo(!showInfo)}
            >
              <Info className="h-5 w-5" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20 rounded-full"
              onClick={toggleFullscreen}
            >
              <Maximize2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main 3D Viewer */}
      <div className="flex-1 relative">
        <SketchfabViewer
          modelUrl={currentScene.modelUrl}
          title={currentScene.name}
          className="w-full h-full"
          showControls={false}
          autostart={true}
        />

        {/* Hotspot Buttons Overlay */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {currentScene.hotspots.map((hotspot) => (
            <button
              key={hotspot.id}
              className="absolute pointer-events-auto group"
              style={{ left: hotspot.x, top: hotspot.y }}
              onClick={() => onHotspotClick(hotspot)}
            >
              <div className="relative">
                {/* Pulse ring */}
                <div className="absolute -inset-3 bg-purple-500/20 rounded-full animate-ping" />
                <div className="absolute -inset-2 bg-purple-500/30 rounded-full animate-pulse" />
                {/* Hotspot dot */}
                <div className="relative w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50 border-2 border-white/80 cursor-pointer hover:scale-125 transition-transform">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                {/* Label */}
                <div className="absolute left-10 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                  {hotspot.name}
                  <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-black/80 rotate-45" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Info Panel (Slide-in) */}
      {showInfo && (
        <div className="absolute right-0 top-16 bottom-20 w-80 z-30 bg-black/90 backdrop-blur-xl border-l border-white/10 p-6 overflow-y-auto animate-in slide-in-from-right">
          <h3 className="text-white font-bold text-lg mb-2">
            {currentScene.name}
          </h3>
          <p className="text-white/70 text-sm mb-4">
            {currentScene.description}
          </p>

          <h4 className="text-purple-400 font-semibold text-sm mb-2 uppercase tracking-wider">
            Interactive Points
          </h4>
          <div className="space-y-2 mb-6">
            {currentScene.hotspots.map((hotspot) => (
              <button
                key={hotspot.id}
                className="w-full flex items-center gap-3 bg-white/5 hover:bg-white/10 p-3 rounded-lg transition-colors text-left"
                onClick={() => onHotspotClick(hotspot)}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Eye className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">
                    {hotspot.name}
                  </p>
                  <p className="text-white/50 text-xs">Tap to explore</p>
                </div>
              </button>
            ))}
          </div>

          <div className="border-t border-white/10 pt-4">
            <h4 className="text-purple-400 font-semibold text-sm mb-2 uppercase tracking-wider">
              Controls
            </h4>
            <div className="space-y-2 text-white/60 text-xs">
              <div className="flex items-center gap-2">
                <RotateCcw className="h-3 w-3" />
                <span>Click & drag to rotate</span>
              </div>
              <div className="flex items-center gap-2">
                <Maximize2 className="h-3 w-3" />
                <span>Scroll to zoom in/out</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                <span>Click hotspots for details</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={goToPrevScene}
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Previous
          </Button>

          {/* Scene Indicators */}
          <div className="flex items-center gap-2">
            {scenes.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentSceneIndex
                    ? 'bg-purple-500 w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                onClick={() => {
                  setCurrentSceneIndex(index);
                  setShowInfo(false);
                }}
              />
            ))}
          </div>

          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={goToNextScene}
          >
            Next
            <ChevronRight className="h-5 w-5 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}