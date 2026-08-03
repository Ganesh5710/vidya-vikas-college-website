import React from 'react';
import { Bell, ChevronRight } from 'lucide-react';
import { INITIAL_NOTICES } from '../../constants/collegeData';

interface NewsTickerProps {
  notices?: typeof INITIAL_NOTICES;
}

export const NewsTicker: React.FC<NewsTickerProps> = ({ notices = INITIAL_NOTICES }) => {
  const tickerItems = notices.filter(n => n.isTicker);

  return (
    <div className="bg-maroon-900 text-white text-xs py-2 px-4 flex items-center gap-3 border-b border-maroon-800 shadow-inner">
      <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider bg-maroon-950 px-2.5 py-1 rounded text-[11px] shrink-0 border border-maroon-800 shadow-sm">
        <Bell className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>Latest Notices</span>
      </div>

      <div className="overflow-hidden whitespace-nowrap flex-1 relative">
        <div className="inline-block animate-marquee hover:pause flex items-center gap-8">
          {tickerItems.map((item, idx) => (
            <span key={item.id || idx} className="inline-flex items-center gap-2 hover:underline cursor-pointer">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span className="font-medium text-slate-100">{item.title}</span>
              <span className="text-[10px] text-maroon-200 bg-maroon-950/60 px-1.5 py-0.5 rounded font-mono">
                {item.category}
              </span>
            </span>
          ))}
        </div>
      </div>

      <a href="#notices" className="text-[11px] text-amber-300 hover:text-white font-semibold flex items-center gap-0.5 shrink-0 hover:underline">
        View All <ChevronRight className="w-3 h-3" />
      </a>
    </div>
  );
};
