// src/components/ARTour.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  ArrowLeft,
  Maximize2,
  Info,
  Monitor,
  Users,
  BookOpen,
  Lightbulb,
  Coffee,
  Award,
  Play,
  RotateCcw,
} from 'lucide-react';
import instituteLogo from 'figma:asset/1f57e15346f74a19d63050e6a1cef9565c21df02.png';
import { AREntry } from './ar/AREntry';
import { ARViewer } from './ar/ARViewer';
import { ARHotspot } from './ar/ARHotspot';
import { SketchfabViewer } from './ar/SketchfabViewer';
import { LocationQR } from './ar/LocationQR';

type ARMode = 'marker' | 'markerless' | null;

type HotspotData = {
  id: string;
  name: string;
  description: string;
  equipment: string[];
  subjects: string[];
  faculty: string;
  projects: string[];
  capacity: number;
  features: string[];
};

const sketchfabModels: Record<string, { url: string; title: string } | null> = {
  labs: {
    url: 'https://sketchfab.com/models/3c8f1c2e09cd401ca7d1e033f5ed3b48/embed',
    title: 'Computer Lab Room',
  },
  classrooms: {
    url: 'https://sketchfab.com/models/0d70428288df47a3a7f2098c3d7a3a2b/embed',
    title: 'Smart Classroom',
  },
  library: {
    url: 'https://sketchfab.com/models/270abad26be246dd85e0b56dfbef7aa9/embed',
    title: 'Digital Library Center',
  },
  innovation: {
    url: 'https://sketchfab.com/models/389287fd60214578a8b330fcee85b483/embed',
    title: 'Innovation & Server Hub',
  },
  cafeteria: {
    url: 'https://sketchfab.com/models/850452848b2d4e9289c341a4198951ed/embed',
    title: 'Campus Cafeteria',
  },
  placement: {
    url: 'https://sketchfab.com/models/bdaa8e9990884bba9a0b0a9479e83612/embed',
    title: 'Placement Conference Hall',
  },
};

export function ARTour() {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [arMode, setArMode] = useState<ARMode>(null);
  const [showAREntry, setShowAREntry] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotData | null>(null);
  const [hotspotOpen, setHotspotOpen] = useState(false);

  const handleStartAR = (mode: ARMode) => {
    if (mode === null) {
      setShowAREntry(false);
      return;
    }
    setArMode(mode);
    setShowAREntry(false);
  };

  const handleExitAR = () => setArMode(null);

  if (showAREntry) {
    return <AREntry onStartAR={handleStartAR} />;
  }

  if (arMode) {
    return (
      <>
        <ARViewer mode={arMode} onExit={handleExitAR} onHotspotClick={() => {}} />
        <ARHotspot
          isOpen={hotspotOpen}
          onClose={() => setHotspotOpen(false)}
          hotspotData={selectedHotspot}
          onApply={() => {}}
          onCheckSeats={() => {}}
          onSaveForLater={() => {}}
        />
      </>
    );
  }

  const locations = [
    {
      id: 'labs',
      name: 'Computer Labs',
      icon: Monitor,
      description: 'State-of-the-art computer laboratories equipped with latest hardware and software',
      details: ['200+ high-performance workstations', 'High-speed internet connectivity (1 Gbps)'],
      color: 'from-blue-600 to-cyan-600',
      mapUrl: 'https://www.google.com/maps?q=13.069249686959706,80.17780336490287',
    },
    {
      id: 'classrooms',
      name: 'Smart Classrooms',
      icon: Users,
      description: 'Modern classrooms with interactive learning technology',
      details: ['Smart boards and digital projectors', 'Air-conditioned spacious rooms'],
      color: 'from-purple-600 to-pink-600',
      mapUrl: 'https://www.google.com/maps?q=13.069407450945606,80.17817693091436',
    },
    {
      id: 'library',
      name: 'Digital Library',
      icon: BookOpen,
      description: 'Extensive collection of books, journals, and digital resources',
      details: ['50,000+ books and journals', 'Access to IEEE, ACM digital libraries'],
      color: 'from-green-600 to-emerald-600',
      mapUrl: 'https://www.google.com/maps?q=13.070239716106993,80.17842201348843',
    },
    {
      id: 'innovation',
      name: 'Innovation Lab',
      icon: Lightbulb,
      description: 'Dedicated space for research, innovation, and project development',
      details: ['3D printers and prototyping equipment', 'IoT devices and sensor kits'],
      color: 'from-orange-600 to-red-600',
      mapUrl: 'https://www.google.com/maps?q=13.06948780446161,80.17795950668388',
    },
    {
      id: 'cafeteria',
      name: 'Cafeteria & Recreation',
      icon: Coffee,
      description: 'Comfortable spaces for relaxation and informal discussions',
      details: ['Hygienic food court with variety of cuisines', 'Student lounge with comfortable seating'],
      color: 'from-amber-600 to-yellow-600',
      mapUrl: 'https://www.google.com/maps?q=13.070705775897615,80.17822106225464',
    },
    {
      id: 'placement',
      name: 'Placement Cell',
      icon: Award,
      description: 'Dedicated team working for student career development',
      details: ['Training for technical and soft skills', 'Mock interviews and group discussions'],
      color: 'from-teal-600 to-cyan-600',
      mapUrl: 'https://www.google.com/maps?q=13.069487804465362,80.17810623297957',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-4">
              <img src={instituteLogo} alt="Institute Logo" className="h-12 w-12" />
              <div>
                <h1 className="text-lg text-purple-900">Dr. M.G.R. Educational and Research Institute</h1>
                <p className="text-slate-600 text-sm">B. Tech - Information Technology</p>
              </div>
            </Link>
            <Link to="/">
              <Button variant="ghost"><ArrowLeft className="h-4 w-4 mr-2" /> Back to Home</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <Maximize2 className="h-10 w-10" />
          </div>
          <h1 className="text-4xl md:text-5xl mb-4">Virtual AR Department Tour</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-6">
            Explore our world-class IT department facilities with interactive 3D models
          </p>
          <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-50" onClick={() => setShowAREntry(true)}>
            <Play className="h-5 w-5 mr-2" /> Launch AR Experience
          </Button>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <section className="max-w-6xl mx-auto mb-12">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-purple-900">Explore Our Facilities</CardTitle>
              <p className="text-slate-600">Click on any facility to learn more — some include interactive 3D models</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {locations.map((location) => {
                  const has3D = !!sketchfabModels[location.id];
                  return (
                    <Card
                      key={location.id}
                      className={`cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 relative ${
                        selectedLocation === location.id ? 'ring-2 ring-purple-600 shadow-xl' : ''
                      }`}
                      onClick={() => setSelectedLocation(location.id)}
                    >
                      {has3D && (
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 z-10">
                          <RotateCcw className="h-2.5 w-2.5" /> 3D
                        </div>
                      )}

                      <CardContent className="p-6 flex flex-col h-full">
                        <div className={`bg-gradient-to-br ${location.color} rounded-lg p-4 mb-4`}>
                          <location.icon className="h-10 w-10 text-white mx-auto" />
                        </div>
                        <h3 className="text-lg text-center font-bold text-purple-900 mb-2">{location.name}</h3>
                        <p className="text-sm text-slate-600 text-center mb-4 flex-grow">{location.description}</p>
                        
                        <div className="mt-auto">
                           <LocationQR title={`${location.name} Location`} mapUrl={location.mapUrl} />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        {selectedLocation && (
          <section className="max-w-6xl mx-auto mb-12">
            {locations
              .filter((loc) => loc.id === selectedLocation)
              .map((location) => {
                const model = sketchfabModels[location.id];
                return (
                  <Card key={location.id} className="shadow-xl border-2 border-purple-600">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className={`bg-gradient-to-br ${location.color} rounded-lg p-4`}>
                          <location.icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-2xl text-purple-900">{location.name}</CardTitle>
                          <p className="text-slate-600">{location.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          {model ? (
                            <SketchfabViewer modelUrl={model.url} title={model.title} className="aspect-video rounded-xl shadow-lg" />
                          ) : (
                            <div className={`bg-gradient-to-br ${location.color} rounded-xl aspect-video flex items-center justify-center text-white`}>
                              3D Model Coming Soon
                            </div>
                          )}
                        </div>

                        <div className="space-y-3">
                          <h3 className="text-lg text-purple-900 mb-4 font-semibold">Key Features</h3>
                          {location.details.map((detail, index) => (
                            <div key={index} className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg">
                              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                              <p className="text-slate-700">{detail}</p>
                            </div>
                          ))}
                          
                          <LocationQR title={`${location.name} Location`} mapUrl={location.mapUrl} />

                          <Button className="w-full mt-4 bg-gradient-to-r from-purple-700 to-pink-700 hover:from-purple-800 hover:to-pink-800" onClick={() => setShowAREntry(true)}>
                            <Play className="h-4 w-4 mr-2" /> Launch Full AR Experience
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </section>
        )}
      </div>
    </div>
  );
}