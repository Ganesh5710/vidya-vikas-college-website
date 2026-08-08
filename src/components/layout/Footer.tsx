import React from 'react';
import { Star } from 'lucide-react';
import { COLLEGE_DETAILS } from '../../constants/collegeData';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Col 1: Official Logo Branding & Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img 
              src={COLLEGE_DETAILS.logoUrl} 
              alt={`${COLLEGE_DETAILS.name} Official Logo`}
              className="w-12 h-12 object-contain bg-white rounded-full p-0.5 border border-slate-300 shadow"
            />
            <div>
              <h3 className="font-extrabold text-white text-base leading-tight">{COLLEGE_DETAILS.name}</h3>
              <p className="text-xs text-amber-400 font-semibold italic">"{COLLEGE_DETAILS.tagline}"</p>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Established November 2024 in Prasanth Nagar, Madanapalle. Providing top-tier Intermediate education (MPC, BiPC, CEC, MEC, HEC) along with intensive EAMCET, NEET, and JEE Main orientation.
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-950/60 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <Star className="w-4 h-4 fill-amber-400" />
            <span>5.0 Star Rating (45 Reviews)</span>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-sm border-b border-navy-800 pb-2">Quick Navigation</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><button onClick={() => setActiveTab('home')} className="hover:text-amber-400 transition-colors">Home Page</button></li>
            <li><button onClick={() => setActiveTab('about')} className="hover:text-amber-400 transition-colors">About Us & Vision</button></li>
            <li><button onClick={() => setActiveTab('streams')} className="hover:text-amber-400 transition-colors">Streams (MPC, BiPC, CEC, MEC, HEC)</button></li>
            <li><button onClick={() => setActiveTab('faculty')} className="hover:text-amber-400 transition-colors">Faculty Directory</button></li>
            <li><button onClick={() => setActiveTab('admissions')} className="hover:text-amber-400 transition-colors">Online Admissions 2025</button></li>
            <li><button onClick={() => setActiveTab('results')} className="hover:text-amber-400 transition-colors">Results & Top Rankers</button></li>
          </ul>
        </div>

        {/* Col 3: Student & Campus Life */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-sm border-b border-navy-800 pb-2">Student & Campus Life</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><button onClick={() => setActiveTab('facilities')} className="hover:text-amber-400 transition-colors">Laboratories & Library</button></li>
            <li><button onClick={() => setActiveTab('events')} className="hover:text-amber-400 transition-colors">Campus Events & Celebrations</button></li>
            <li><button onClick={() => setActiveTab('events')} className="hover:text-amber-400 transition-colors">Event Photo Gallery</button></li>
            <li><button onClick={() => setActiveTab('contact')} className="hover:text-amber-400 transition-colors">Campus Location & Enquiries</button></li>
            <li><button onClick={() => setActiveTab('admin')} className="hover:text-amber-400 transition-colors font-semibold text-slate-300">Staff Admin Dashboard</button></li>
          </ul>
        </div>

        {/* Col 4: Official Contact & Address */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-sm border-b border-navy-800 pb-2">Campus Address</h4>
          <div className="space-y-2 text-xs text-slate-400">
            <p className="font-semibold text-slate-200">SRI VIDYA VIKAS JUNIOR COLLEGE</p>
            <p>{COLLEGE_DETAILS.address}</p>
            <p className="pt-2"><strong className="text-amber-400">Email:</strong> office@svvjc.edu.in</p>
            <p><strong className="text-amber-400">Location:</strong> Prasanth Nagar, Madanapalle</p>
          </div>
        </div>

      </div>

      <div className="bg-navy-900 py-4 text-center text-xs text-slate-400 border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-2">
          <p>© 2025 SRI VIDYA VIKAS JUNIOR COLLEGE, Madanapalle. All Rights Reserved.</p>
          <p className="text-[11px] text-slate-500">Recognized by BIEAP • College Code: SVVJC</p>
        </div>
      </div>
    </footer>
  );
};
