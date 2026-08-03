import React from 'react';
import { MapPin, Star, Calendar, ShieldCheck, Globe } from 'lucide-react';
import { COLLEGE_DETAILS } from '../../constants/collegeData';
import { useLanguage } from '../../context/LanguageContext';

export const TopBanner: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="bg-navy-900 text-slate-300 text-xs py-2 px-4 border-b border-navy-800">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5 text-slate-200">
            <MapPin className="w-3.5 h-3.5 text-maroon-400 shrink-0" />
            <span>{COLLEGE_DETAILS.address}</span>
          </span>
          <span className="flex items-center gap-1 text-amber-400 font-semibold bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20">
            <Star className="w-3.5 h-3.5 fill-amber-400 shrink-0" />
            <span>{COLLEGE_DETAILS.rating.toFixed(1)} Stars ({COLLEGE_DETAILS.reviewCount} Reviews)</span>
          </span>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1 text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Est. {COLLEGE_DETAILS.established}</span>
          </span>

          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>BIEAP Recognized</span>
          </span>

          {/* Language Switcher Button */}
          <div className="flex items-center gap-1 bg-navy-800 p-0.5 rounded border border-slate-700">
            <Globe className="w-3 h-3 text-slate-400 ml-1" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-colors ${
                language === 'en' ? 'bg-maroon-900 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('te')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-colors ${
                language === 'te' ? 'bg-maroon-900 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              తెలుగు
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
