import React, { useState } from 'react';
import { X, Building2, ChevronRight, CheckCircle2 } from 'lucide-react';
import { COLLEGE_DETAILS } from '../../constants/collegeData';

interface VirtualCampusTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VirtualCampusTourModal: React.FC<VirtualCampusTourModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'physics' | 'chem' | 'bio' | 'library' | 'campus'>('physics');

  if (!isOpen) return null;

  const tourData = {
    physics: {
      title: "Physics & Optics Laboratory",
      description: "Equipped with dark room optical setups, potentiometers, sonometers, and modern circuit boards for Class 11 & 12 practicals.",
      imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200",
      highlights: ["Dark room optical bench", "Digital meters & galvanometers", "BIEAP syllabus compliant"]
    },
    chem: {
      title: "Chemistry & Organic Analysis Lab",
      description: "Complete chemical reagent racks, fume safety ventilation, titration apparatus, and salt analysis setups.",
      imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200",
      highlights: ["Safety fume hood system", "Analytical balances", "Organic & inorganic salt analysis"]
    },
    bio: {
      title: "Botany & Zoology Biology Lab",
      description: "High-magnification compound microscopes, human anatomical models, plant specimens, and slide preparation tables.",
      imageUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1200",
      highlights: ["High-power microscopes", "Preserved biological specimens", "NEET practical demonstration area"]
    },
    library: {
      title: "Central Digital Library",
      description: "Quiet reading environment stocked with Intermediate Board textbooks, EAMCET, NEET, JEE prep guides, and digital study stations.",
      imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1200",
      highlights: ["Silent study cubicles", "Entrance exam reference collection", "Daily newspapers & journals"]
    },
    campus: {
      title: "College Campus & Sports Amenities",
      description: "Spacious classrooms in Prasanth Nagar, Madanapalle with natural light, audio-visual smart board setups, and outdoor volleyball/badminton courts.",
      imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1200",
      highlights: ["Prasanth Nagar campus location", "Badminton & athletics area", "CCTV monitored premises"]
    }
  };

  const currentTour = tourData[activeTab];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full border border-slate-200 shadow-2xl space-y-6 relative max-h-[92vh] overflow-y-auto">
        
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-navy-900 text-amber-400 flex items-center justify-center font-bold shadow">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-navy-900 bg-amber-100 px-2.5 py-0.5 rounded uppercase tracking-wider">
              360° Virtual Campus Tour
            </span>
            <h3 className="text-xl font-extrabold text-navy-900">{COLLEGE_DETAILS.name} Infrastructure</h3>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
          {(['physics', 'chem', 'bio', 'library', 'campus'] as const).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap ${
                activeTab === key
                  ? 'bg-maroon-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {key === 'physics' ? 'Physics Lab' :
               key === 'chem' ? 'Chemistry Lab' :
               key === 'bio' ? 'Biology Lab' :
               key === 'library' ? 'Digital Library' : 'Campus & Sports'}
            </button>
          ))}
        </div>

        {/* Display Active Area Photo & Info */}
        <div className="space-y-4">
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-md border border-slate-200">
            <img 
              src={currentTour.imageUrl} 
              alt={currentTour.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-transparent p-5 text-white">
              <h4 className="text-xl font-extrabold">{currentTour.title}</h4>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {currentTour.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {currentTour.highlights.map((h, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-navy-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Prasanth Nagar, Madanapalle (Near Krishna Reddy Junior College)</span>
          <button onClick={onClose} className="font-bold text-maroon-900 hover:underline flex items-center gap-1">
            <span>Close Tour</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
