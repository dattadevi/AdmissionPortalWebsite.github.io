// components/ar/ARHotspot.tsx
import { Button } from '../ui/button';
import {
  X,
  Users,
  BookOpen,
  Cpu,
  User,
  Lightbulb,
  CheckCircle2,
  GraduationCap,
  Armchair,
  Bookmark,
} from 'lucide-react';

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

type ARHotspotProps = {
  isOpen: boolean;
  onClose: () => void;
  hotspotData: HotspotData | null;
  onApply: () => void;
  onCheckSeats: () => void;
  onSaveForLater: () => void;
};

export function ARHotspot({
  isOpen,
  onClose,
  hotspotData,
  onApply,
  onCheckSeats,
  onSaveForLater,
}: ARHotspotProps) {
  if (!isOpen || !hotspotData) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg mx-4 mb-4 md:mb-0 bg-white rounded-2xl shadow-2xl max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-700 to-pink-700 p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <h2 className="text-xl font-bold pr-10">{hotspotData.name}</h2>
          <p className="text-purple-100 text-sm mt-1">
            {hotspotData.description}
          </p>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs">
              <Armchair className="h-3 w-3" />
              <span>Capacity: {hotspotData.capacity}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs">
              <User className="h-3 w-3" />
              <span>{hotspotData.faculty}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto max-h-[50vh] space-y-5">
          {/* Equipment */}
          <div>
            <h3 className="flex items-center gap-2 text-purple-900 font-semibold text-sm mb-2">
              <Cpu className="h-4 w-4 text-purple-600" />
              Equipment & Hardware
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {hotspotData.equipment.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-purple-50 p-2 rounded-lg text-xs text-slate-700"
                >
                  <CheckCircle2 className="h-3 w-3 text-purple-600 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Subjects */}
          <div>
            <h3 className="flex items-center gap-2 text-purple-900 font-semibold text-sm mb-2">
              <BookOpen className="h-4 w-4 text-purple-600" />
              Subjects Covered
            </h3>
            <div className="flex flex-wrap gap-2">
              {hotspotData.subjects.map((subject, i) => (
                <span
                  key={i}
                  className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h3 className="flex items-center gap-2 text-purple-900 font-semibold text-sm mb-2">
              <Lightbulb className="h-4 w-4 text-purple-600" />
              Notable Projects
            </h3>
            <div className="space-y-2">
              {hotspotData.projects.map((project, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-amber-50 border border-amber-100 p-2 rounded-lg text-xs text-slate-700"
                >
                  <Lightbulb className="h-3 w-3 text-amber-600 flex-shrink-0" />
                  {project}
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="flex items-center gap-2 text-purple-900 font-semibold text-sm mb-2">
              <CheckCircle2 className="h-4 w-4 text-purple-600" />
              Features & Amenities
            </h3>
            <div className="flex flex-wrap gap-2">
              {hotspotData.features.map((feature, i) => (
                <span
                  key={i}
                  className="bg-green-50 text-green-800 border border-green-200 px-3 py-1 rounded-full text-xs"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row gap-2">
          <Button
            className="flex-1 bg-gradient-to-r from-purple-700 to-pink-700 hover:from-purple-800 hover:to-pink-800"
            onClick={onApply}
          >
            <GraduationCap className="h-4 w-4 mr-2" />
            Apply Now
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-purple-300 text-purple-700 hover:bg-purple-50"
            onClick={onCheckSeats}
          >
            <Users className="h-4 w-4 mr-2" />
            Check Seats
          </Button>
          <Button
            variant="ghost"
            className="text-slate-600 hover:text-purple-700"
            onClick={onSaveForLater}
          >
            <Bookmark className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}