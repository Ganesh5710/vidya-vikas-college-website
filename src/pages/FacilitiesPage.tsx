import React from 'react';
import { Building2 } from 'lucide-react';
import { PlaceholderBadge } from '../components/common/PlaceholderBadge';

export const FacilitiesPage: React.FC = () => {
  const facilitiesList = [
    {
      id: "lab-physics",
      title: "Physics & Optics Laboratory",
      category: "Laboratory",
      description: "Equipped with dark room for optical experiments, potentiometers, vernier calipers, and modern electronics kits for BIEAP syllabus.",
      imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
      checklistRef: "Section 4 - Campus Photos & Lab Descriptions"
    },
    {
      id: "lab-chem",
      title: "Chemistry & Qualitative Analysis Lab",
      category: "Laboratory",
      description: "Full fume hood safety systems, titration benches, reagent racks, and glass apparatus for organic and inorganic practicals.",
      imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800",
      checklistRef: "Section 4 - Campus Photos & Lab Descriptions"
    },
    {
      id: "lab-bio",
      title: "Botany & Zoology Biology Lab",
      category: "Laboratory",
      description: "High-magnification compound microscopes, preserved plant/animal specimens, anatomical models, and slide preparation setups.",
      imageUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800",
      checklistRef: "Section 4 - Campus Photos & Lab Descriptions"
    },
    {
      id: "lib-central",
      title: "Central Library & Digital Reading Room",
      category: "Library",
      description: "Quiet study room with reference books for Intermediate Board, EAMCET, NEET, and JEE Main prep, plus digital catalog access.",
      imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800",
      checklistRef: "Section 4 - Library Book Count & Facilities"
    },
    {
      id: "transport",
      title: "College Bus & Transport Routes",
      category: "Transport",
      description: "Safe, fleet-managed college buses connecting Prasanth Nagar with major surrounding areas in Madanapalle.",
      imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800",
      checklistRef: "Section 4 - Transport Routes & Bus Coverage"
    },
    {
      id: "sports",
      title: "Sports Grounds & Athletics",
      category: "Sports",
      description: "Outdoor volleyball, shuttle badminton courts, table tennis, chess, and annual sports week competitions.",
      imageUrl: "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=800",
      checklistRef: "Section 4 - Sports Facilities & Achievements"
    }
  ];

  return (
    <div className="space-y-10">
      
      {/* Header Banner */}
      <section className="bg-navy-900 text-white rounded-2xl p-8 shadow-md space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-900 text-xs font-bold text-amber-400">
          <Building2 className="w-4 h-4" />
          <span>CAMPUS INFRASTRUCTURE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Facilities & Learning Environment
        </h2>
        <p className="text-slate-300 text-sm max-w-3xl">
          SRI VIDYA VIKAS JUNIOR COLLEGE provides state-of-the-art science laboratories, digital library, and sports amenities in Prasanth Nagar, Madanapalle.
        </p>
      </section>

      {/* Facilities Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilitiesList.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="relative h-48 bg-slate-100">
              <img 
                src={item.imageUrl} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 bg-navy-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded backdrop-blur">
                {item.category}
              </span>
            </div>

            <div className="p-5 space-y-3">
              <h3 className="font-bold text-navy-900 text-lg">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              
              <div className="pt-2 border-t border-slate-100">
                <PlaceholderBadge checklistRef={item.checklistRef} note="Facility Photo & Description Flagged for Update" />
              </div>
            </div>
          </div>
        ))}
      </section>

    </div>
  );
};
