// components/ARTour.tsx
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
  Eye,
} from 'lucide-react';
import instituteLogo from 'figma:asset/1f57e15346f74a19d63050e6a1cef9565c21df02.png';
import { AREntry } from './ar/AREntry';
import { ARViewer } from './ar/ARViewer';
import { ARHotspot } from './ar/ARHotspot';
import { SketchfabViewer } from './ar/SketchfabViewer';

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

// Sketchfab model mapping for each location
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
    // Cartoon Library Interior
    url: 'https://sketchfab.com/models/270abad26be246dd85e0b56dfbef7aa9/embed', 
    title: 'Digital Library Center',
  },
  innovation: {
    // Hidden Server Room (used for Innovation/Tech Lab)
    url: 'https://sketchfab.com/models/389287fd60214578a8b330fcee85b483/embed', 
    title: 'Innovation & Server Hub',
  },
  cafeteria: {
    // Cozy Coffee Shop
    url: 'https://sketchfab.com/models/850452848b2d4e9289c341a4198951ed/embed', 
    title: 'Campus Cafeteria',
  },
  placement: {
    // Conference Room
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
  const [showModelGallery, setShowModelGallery] = useState(false);

  // Expanded Hotspot Data
  const hotspotDataMap: Record<string, HotspotData> = {
    '1': {
      id: '1',
      name: 'Computer Lab 1',
      description: 'Advanced computing facility with latest hardware.',
      equipment: ['Intel Core i7 Workstations', 'Dual Monitor'],
      subjects: ['Data Structures', 'DBMS'],
      faculty: 'Dr. Rajesh Kumar',
      projects: ['Student Mgmt System'],
      capacity: 60,
      features: ['AC', 'Smart Board'],
    },
    '2': {
      id: '2',
      name: 'Network Lab',
      description: 'Specialized lab for networking.',
      equipment: ['Cisco Routers', 'Switches'],
      subjects: ['Networks', 'Security'],
      faculty: 'Prof. Anita Sharma',
      projects: ['Network Design'],
      capacity: 40,
      features: ['Server Room'],
    },
    // Innovation (Server Room)
    '4': {
      id: '4',
      name: 'High-Performance Servers',
      description: 'Central data processing unit for campus research.',
      equipment: ['Blade Servers', 'Cooling Units'],
      subjects: ['Cloud Computing', 'Big Data'],
      faculty: 'Dr. Sarah Lee',
      projects: ['Campus Cloud', 'AI Processing'],
      capacity: 5,
      features: ['Climate Control', 'Biometric Lock'],
    },
    // Library
    '7': {
      id: '7',
      name: 'Reading Section',
      description: 'Quiet area for focused study and research.',
      equipment: ['Kindle Oasis', 'Study Pods'],
      subjects: ['Research', 'Literature'],
      faculty: 'Mrs. Geetha',
      projects: ['Research Papers'],
      capacity: 100,
      features: ['Silent Zone', 'IEEE Access'],
    },
    // Cafeteria
    '10': {
      id: '10',
      name: 'Coffee Station',
      description: 'Freshly brewed coffee and snacks.',
      equipment: ['Espresso Machines', 'Vending'],
      subjects: ['Socializing'],
      faculty: 'N/A',
      projects: ['N/A'],
      capacity: 50,
      features: ['Wifi', 'Lounge Seating'],
    },
    // Placement
    '13': {
      id: '13',
      name: 'Main Conference Table',
      description: 'Where executive decisions and group discussions happen.',
      equipment: ['Video Conf Unit', 'Projector'],
      subjects: ['Soft Skills', 'Leadership'],
      faculty: 'Placement Officer',
      projects: ['Mock Interviews'],
      capacity: 12,
      features: ['Sound Proof', 'Video Link'],
    },
  };

  const handleStartAR = (mode: ARMode) => {
    if (mode === null) {
      setShowAREntry(false);
      return;
    }
    setArMode(mode);
    setShowAREntry(false);
  };

  const handleExitAR = () => {
    setArMode(null);
  };

  const handleHotspotClick = (hotspot: { id: string; name: string }) => {
    const data = hotspotDataMap[hotspot.id];
    if (data) {
      setSelectedHotspot(data);
      setHotspotOpen(true);
    }
  };

  const handleApply = () => {
    setHotspotOpen(false);
    setArMode(null);
    navigate('/register');
  };

  const handleCheckSeats = () => {
    setHotspotOpen(false);
    setArMode(null);
    navigate('/admission');
  };

  const handleSaveForLater = () => {
    alert('Saved to your favorites!');
    setHotspotOpen(false);
  };

  // AR Entry screen
  if (showAREntry) {
    return <AREntry onStartAR={handleStartAR} />;
  }

  // AR mode active
  if (arMode) {
    return (
      <>
        <ARViewer
          mode={arMode}
          onExit={handleExitAR}
          onHotspotClick={handleHotspotClick}
        />
        <ARHotspot
          isOpen={hotspotOpen}
          onClose={() => setHotspotOpen(false)}
          hotspotData={selectedHotspot}
          onApply={handleApply}
          onCheckSeats={handleCheckSeats}
          onSaveForLater={handleSaveForLater}
        />
      </>
    );
  }

  const locations = [
    {
      id: 'labs',
      name: 'Computer Labs',
      icon: Monitor,
      description:
        'State-of-the-art computer laboratories equipped with latest hardware and software',
      details: [
        '200+ high-performance workstations',
        'Latest software: Visual Studio, PyCharm, Android Studio',
        'High-speed internet connectivity (1 Gbps)',
        'Cloud computing access (AWS, Azure, GCP)',
        'Specialized labs for AI/ML, IoT, and Cybersecurity',
      ],
      color: 'from-blue-600 to-cyan-600',
    },
    {
      id: 'classrooms',
      name: 'Smart Classrooms',
      icon: Users,
      description:
        'Modern classrooms with interactive learning technology',
      details: [
        'Smart boards and digital projectors',
        'Air-conditioned spacious rooms',
        'Capacity: 60-80 students per classroom',
        'Audio-visual equipment for presentations',
        'Recording facilities for online lectures',
      ],
      color: 'from-purple-600 to-pink-600',
    },
    {
      id: 'library',
      name: 'Digital Library',
      icon: BookOpen,
      description:
        'Extensive collection of books, journals, and digital resources',
      details: [
        '50,000+ books and journals',
        'Access to IEEE, ACM digital libraries',
        'E-learning resources and video tutorials',
        'Quiet study areas and discussion rooms',
        '24/7 online resource access',
      ],
      color: 'from-green-600 to-emerald-600',
    },
    {
      id: 'innovation',
      name: 'Innovation Lab',
      icon: Lightbulb,
      description:
        'Dedicated space for research, innovation, and project development',
      details: [
        '3D printers and prototyping equipment',
        'IoT devices and sensor kits',
        'VR/AR development tools',
        'Robotics and automation kits',
        'Mentorship from industry experts',
      ],
      color: 'from-orange-600 to-red-600',
    },
    {
      id: 'cafeteria',
      name: 'Cafeteria & Recreation',
      icon: Coffee,
      description:
        'Comfortable spaces for relaxation and informal discussions',
      details: [
        'Hygienic food court with variety of cuisines',
        'Indoor games and recreation areas',
        'Student lounge with comfortable seating',
        'Outdoor sports facilities',
        'Coffee shop and snack corners',
      ],
      color: 'from-amber-600 to-yellow-600',
    },
    {
      id: 'placement',
      name: 'Placement Cell',
      icon: Award,
      description:
        'Dedicated team working for student career development',
      details: [
        'Training for technical and soft skills',
        'Mock interviews and group discussions',
        'Resume building workshops',
        'Career counseling services',
        'Industry connect programs',
      ],
      color: 'from-teal-600 to-cyan-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-4">
              <img
                src={instituteLogo}
                alt="Institute Logo"
                className="h-12 w-12"
              />
              <div>
                <h1 className="text-lg text-purple-900">
                  Dr. M.G.R. Educational and Research Institute
                </h1>
                <p className="text-slate-600 text-sm">
                  B. Tech - Information Technology
                </p>
              </div>
            </Link>
            <Link to="/">
              <Button variant="ghost">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <Maximize2 className="h-10 w-10" />
          </div>
          <h1 className="text-4xl md:text-5xl mb-4">
            Virtual AR Department Tour
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-6">
            Explore our world-class IT department facilities with interactive 3D
            models
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-purple-900 hover:bg-purple-50"
              onClick={() => setShowAREntry(true)}
            >
              <Play className="h-5 w-5 mr-2" />
              Launch AR Experience
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
              onClick={() => setShowModelGallery(!showModelGallery)}
            >
              <Eye className="h-5 w-5 mr-2" />
              View 3D Models
            </Button>
          </div>
        </div>
      </section>

      {/* 3D Model Gallery Section */}
      {showModelGallery && (
        <section className="bg-slate-900 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                Interactive 3D Model Gallery
              </h2>
              <p className="text-slate-400">
                Drag to rotate • Scroll to zoom • Right-click to pan
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div>
                <SketchfabViewer
                  modelUrl="https://sketchfab.com/models/3c8f1c2e09cd401ca7d1e033f5ed3b48/embed"
                  title="Computer Lab Room"
                  className="aspect-video rounded-xl shadow-2xl"
                />
                <div className="mt-3 text-center">
                  <h3 className="text-white font-semibold">
                    Computer Lab 1 — Advanced Computing
                  </h3>
                  <p className="text-slate-400 text-sm">
                    60+ workstations • Dual monitors • Latest software
                  </p>
                </div>
              </div>
              <div>
                <SketchfabViewer
                  modelUrl="https://sketchfab.com/models/0d70428288df47a3a7f2098c3d7a3a2b/embed"
                  title="Computer Lab"
                  className="aspect-video rounded-xl shadow-2xl"
                />
                <div className="mt-3 text-center">
                  <h3 className="text-white font-semibold">
                    Computer Lab 2 — Research & Development
                  </h3>
                  <p className="text-slate-400 text-sm">
                    GPU workstations • AI/ML tools • Project spaces
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 py-12">
        {/* Facility Cards */}
        <section className="max-w-6xl mx-auto mb-12">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-purple-900">
                Explore Our Facilities
              </CardTitle>
              <p className="text-slate-600">
                Click on any facility to learn more — some include interactive
                3D models
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {locations.map((location) => {
                  const has3D = !!sketchfabModels[location.id];
                  return (
                    <Card
                      key={location.id}
                      className={`cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 relative ${
                        selectedLocation === location.id
                          ? 'ring-2 ring-purple-600 shadow-xl'
                          : ''
                      }`}
                      onClick={() => setSelectedLocation(location.id)}
                    >
                      {has3D && (
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 z-10">
                          <RotateCcw className="h-2.5 w-2.5" />
                          3D
                        </div>
                      )}
                      <CardContent className="p-6">
                        <div
                          className={`bg-gradient-to-br ${location.color} rounded-lg p-4 mb-4`}
                        >
                          <location.icon className="h-10 w-10 text-white mx-auto" />
                        </div>
                        <h3 className="text-lg text-center text-purple-900 mb-2">
                          {location.name}
                        </h3>
                        <p className="text-sm text-slate-600 text-center">
                          {location.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Selected Location Details with Sketchfab */}
        {selectedLocation && (
          <section className="max-w-6xl mx-auto mb-12">
            {locations
              .filter((loc) => loc.id === selectedLocation)
              .map((location) => {
                const model = sketchfabModels[location.id];
                return (
                  <Card
                    key={location.id}
                    className="shadow-xl border-2 border-purple-600"
                  >
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div
                          className={`bg-gradient-to-br ${location.color} rounded-lg p-4`}
                        >
                          <location.icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-2xl text-purple-900">
                            {location.name}
                          </CardTitle>
                          <p className="text-slate-600">
                            {location.description}
                          </p>
                        </div>
                        {model && (
                          <div className="hidden md:flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full text-xs font-medium">
                            <RotateCcw className="h-3 w-3" />
                            Interactive 3D Model Available
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* 3D Model or Placeholder */}
                        <div className="relative">
                          {model ? (
                            <div>
                              <SketchfabViewer
                                modelUrl={model.url}
                                title={model.title}
                                className="aspect-video rounded-xl shadow-lg"
                              />
                              <p className="text-xs text-slate-500 mt-2 text-center">
                                Drag to rotate • Scroll to zoom •
                                Right-click to pan
                              </p>
                            </div>
                          ) : (
                            <div
                              className={`bg-gradient-to-br ${location.color} rounded-xl aspect-video flex items-center justify-center text-white relative overflow-hidden`}
                            >
                              <div className="absolute inset-0 bg-black/20" />
                              <div className="relative z-10 text-center">
                                <Maximize2 className="h-16 w-16 mx-auto mb-4" />
                                <p className="text-lg font-semibold">
                                  360° Virtual Tour
                                </p>
                                <p className="text-sm opacity-80 mt-2">
                                  3D Model Coming Soon
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Features List */}
                        <div className="space-y-3">
                          <h3 className="text-lg text-purple-900 mb-4 font-semibold">
                            Key Features
                          </h3>
                          {location.details.map((detail, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg"
                            >
                              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                              <p className="text-slate-700">{detail}</p>
                            </div>
                          ))}

                          {model && (
                            <Button
                              className="w-full mt-4 bg-gradient-to-r from-purple-700 to-pink-700 hover:from-purple-800 hover:to-pink-800"
                              onClick={() => setShowAREntry(true)}
                            >
                              <Play className="h-4 w-4 mr-2" />
                              Launch Full AR Experience
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </section>
        )}

        {/* Tabs Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
              <TabsTrigger value="facilities">Facilities</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-purple-900">
                    Department Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-700">
                    The IT Department at Dr. M.G.R. Educational and Research
                    Institute spans across a state-of-the-art campus with modern
                    facilities designed to provide the best learning experience.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="text-purple-900 mb-2">Campus Area</h4>
                      <p className="text-2xl text-purple-700 font-bold">
                        50,000 sq.ft
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="text-purple-900 mb-2">Computer Labs</h4>
                      <p className="text-2xl text-purple-700 font-bold">
                        8 Labs
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="text-purple-900 mb-2">Faculty Members</h4>
                      <p className="text-2xl text-purple-700 font-bold">50+</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="text-purple-900 mb-2">Total Capacity</h4>
                      <p className="text-2xl text-purple-700 font-bold">
                        1000+ Students
                      </p>
                    </div>
                  </div>

                  {/* Embedded 3D preview in overview */}
                  <div className="mt-6">
                    <h4 className="text-purple-900 font-semibold mb-3">
                      Quick 3D Preview
                    </h4>
                    <SketchfabViewer
                      modelUrl="https://sketchfab.com/models/3c8f1c2e09cd401ca7d1e033f5ed3b48/embed"
                      title="Computer Lab Room Preview"
                      className="aspect-video rounded-xl shadow-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="infrastructure">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-purple-900">
                    Technical Infrastructure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-purple-600 pl-4 py-2">
                      <h4 className="text-lg text-purple-900 mb-2">
                        Computing Resources
                      </h4>
                      <p className="text-slate-700">
                        200+ high-performance workstations with Intel Core
                        i7/i9 processors, 16GB+ RAM, and dedicated GPUs for
                        AI/ML workloads.
                      </p>
                    </div>
                    <div className="border-l-4 border-purple-600 pl-4 py-2">
                      <h4 className="text-lg text-purple-900 mb-2">
                        Network Infrastructure
                      </h4>
                      <p className="text-slate-700">
                        1 Gbps fiber optic internet connectivity with Wi-Fi 6
                        coverage across the entire department. Dedicated
                        servers for hosting student projects.
                      </p>
                    </div>
                    <div className="border-l-4 border-purple-600 pl-4 py-2">
                      <h4 className="text-lg text-purple-900 mb-2">
                        Software Resources
                      </h4>
                      <p className="text-slate-700">
                        Licensed software including MATLAB, AutoCAD, Oracle,
                        Microsoft Visual Studio, and access to cloud platforms
                        (AWS, Azure, Google Cloud).
                      </p>
                    </div>
                    <div className="border-l-4 border-purple-600 pl-4 py-2">
                      <h4 className="text-lg text-purple-900 mb-2">
                        Research Equipment
                      </h4>
                      <p className="text-slate-700">
                        IoT development kits, robotics platforms, VR/AR
                        headsets, 3D printers, and specialized hardware for
                        research projects.
                      </p>
                    </div>
                  </div>

                  {/* 3D model of the lab infrastructure */}
                  <div className="mt-6">
                    <h4 className="text-purple-900 font-semibold mb-3">
                      Lab Infrastructure — 3D View
                    </h4>
                    <SketchfabViewer
                      modelUrl="https://sketchfab.com/models/0d70428288df47a3a7f2098c3d7a3a2b/embed"
                      title="Lab Infrastructure 3D View"
                      className="aspect-video rounded-xl shadow-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="facilities">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-purple-900">
                    Student Facilities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="text-lg text-purple-900">
                        Academic Support
                      </h4>
                      <ul className="space-y-2 text-slate-700">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mt-2" />
                          <span>24/7 library access with digital resources</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mt-2" />
                          <span>Mentorship programs with faculty</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mt-2" />
                          <span>Study rooms and collaborative spaces</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mt-2" />
                          <span>Online learning management system</span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-lg text-purple-900">
                        Extra-Curricular
                      </h4>
                      <ul className="space-y-2 text-slate-700">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mt-2" />
                          <span>Technical clubs and coding communities</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mt-2" />
                          <span>Hackathon and competition spaces</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mt-2" />
                          <span>Sports and recreation facilities</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mt-2" />
                          <span>Cultural and social events</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Info Card */}
        <section className="max-w-4xl mx-auto">
          <Card className="shadow-xl bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 rounded-full p-3">
                  <Info className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg text-purple-900 mb-2">
                    Visit Us in Person
                  </h3>
                  <p className="text-slate-700 mb-4">
                    While our virtual tour gives you a glimpse of our
                    facilities, we encourage you to visit our campus in person
                    to experience the vibrant learning environment. Schedule a
                    campus tour to meet our faculty, interact with current
                    students, and see our facilities firsthand.
                  </p>
                  <div className="flex gap-4 flex-wrap">
                    <Link to="/register">
                      <Button className="bg-purple-700 hover:bg-purple-800">
                        Apply Now
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="border-purple-600 text-purple-700 hover:bg-purple-50"
                    >
                      Schedule Campus Visit
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-purple-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-purple-200">
            &copy; 2025 Dr. M.G.R. Educational and Research Institute. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}