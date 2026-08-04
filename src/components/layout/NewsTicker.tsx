import React from 'react';
import { INITIAL_NOTICES } from '../../constants/collegeData';

interface NewsTickerProps {
  setActiveTab: (tab: string) => void;
}

export const NewsTicker: React.FC<NewsTickerProps> = ({ setActiveTab }) => {
  const tickerNotices = INITIAL_NOTICES.filter(n => n.isTicker);

  return (
    <div className="bg-navy-900 text-white text-xs border-b border-navy-800">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        
        {/* Left Announcements Strip */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <span className="font-extrabold text-[11px] text-amber-400 uppercase tracking-wider shrink-0 bg-navy-800 px-2.5 py-0.5 rounded border border-navy-700">
            LATEST UPDATES ::
          </span>

          <div className="overflow-hidden whitespace-nowrap min-w-0">
            <div className="inline-block animate-marquee space-x-8 font-medium text-slate-200">
              {tickerNotices.map((notice) => (
                <span key={notice.id} className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>{notice.title}</span>
                  <span className="text-[10px] font-bold text-amber-300 bg-maroon-900 px-1.5 py-0.5 rounded ml-1">
                    {notice.category}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Action Button */}
        <button
          onClick={() => {
            setActiveTab('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="shrink-0 px-4 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-sm transition-transform hover:scale-105"
        >
          Contact Us
        </button>

      </div>
    </div>
  );
};
