import React from 'react';
import { Star } from 'lucide-react';
import { COLLEGE_DETAILS } from '../../constants/collegeData';

export const Footer = ({ setActiveTab }) => {
  const handleNavClick = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Col 1: Official Logo Branding & Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img 
              src={COLLEGE_DETAILS.logoUrl || '/logo.jpg'} 
              alt={`${COLLEGE_DETAILS.name} Official Logo`} 
              onError={(e) => { e.target.src = '/logo.jpg'; }} 
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
            <Star className="w-4 h-4 fill-amber-400"/>
            <span>5.0 Star Rating (45 Reviews)</span>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-sm border-b border-navy-800 pb-2">Quick Navigation</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><button onClick={() => handleNavClick('home')} className="hover:text-amber-400 transition-colors">Home Page</button></li>
            <li><button onClick={() => handleNavClick('about')} className="hover:text-amber-400 transition-colors">About Us & Vision</button></li>
            <li><button onClick={() => handleNavClick('streams')} className="hover:text-amber-400 transition-colors">Streams (MPC, BiPC, CEC, MEC, HEC)</button></li>
            <li><button onClick={() => handleNavClick('faculty')} className="hover:text-amber-400 transition-colors">Faculty Directory</button></li>
            <li><button onClick={() => handleNavClick('admissions')} className="hover:text-amber-400 transition-colors">Online Admissions 2025</button></li>
            <li><button onClick={() => handleNavClick('results')} className="hover:text-amber-400 transition-colors">Results & Top Rankers</button></li>
          </ul>
        </div>

        {/* Col 3: Student & Campus Life */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-sm border-b border-navy-800 pb-2">Student & Campus Life</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><button onClick={() => handleNavClick('facilities')} className="hover:text-amber-400 transition-colors">Laboratories & Transport</button></li>
            <li><button onClick={() => handleNavClick('events')} className="hover:text-amber-400 transition-colors">Campus Events & Celebrations</button></li>
            <li><button onClick={() => handleNavClick('events')} className="hover:text-amber-400 transition-colors">Event Photo Gallery</button></li>
            <li><button onClick={() => handleNavClick('contact')} className="hover:text-amber-400 transition-colors">Campus Location & Enquiries</button></li>
            <li><button onClick={() => handleNavClick('admin')} className="hover:text-amber-400 transition-colors font-semibold text-slate-300">Staff Admin Dashboard</button></li>
          </ul>
        </div>

        {/* Col 4: Official Contact & Address */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-sm border-b border-navy-800 pb-2">Campus Address</h4>
          <div className="space-y-2 text-xs text-slate-400">
            <p className="font-semibold text-slate-200">{COLLEGE_DETAILS.name}</p>
            <p>{COLLEGE_DETAILS.address}</p>
            <p className="pt-2"><strong className="text-amber-400">Email:</strong> srividyavikasjuniorcollegempl@gmail.com</p>
            <p><strong className="text-amber-400">Website:</strong> <a href="https://vidya-vikas-college.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:underline text-amber-300 font-medium">www.srividyavikasjrcollege.com</a></p>
            <p><strong className="text-amber-400">Timings:</strong> 8:00 AM - 8:00 PM (Sunday Closed)</p>
          </div>
        </div>

      </div>

      {/* Bottom Legal Sub-Footer */}
      <div className="border-t border-navy-900 bg-navy-950 py-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          <p>© 2025 SRI VIDYA VIKAS JUNIOR COLLEGE, Madanapalle. All Rights Reserved.</p>
          <p className="text-[11px] font-medium text-slate-400">Recognized by BIEAP • College Code: SVVJC</p>
        </div>
      </div>
    </footer>
  );
};
