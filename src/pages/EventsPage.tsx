import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { INITIAL_GALLERY_ALBUMS, INITIAL_GALLERY_PHOTOS, INITIAL_EVENTS } from '../constants/collegeData';
import { PlaceholderBadge } from '../components/common/PlaceholderBadge';
import { EmptyState } from '../components/common/EmptyState';
import { useSEO } from '../hooks/useSEO';

export const EventsPage: React.FC = () => {
  useSEO({
    title: "Campus Events & Gallery | SRI VIDYA VIKAS JUNIOR COLLEGE",
    description: "Explore photo & video galleries of annual day celebrations, science expos, and sports events at SRI VIDYA VIKAS JUNIOR COLLEGE, Prasanth Nagar, Madanapalle."
  });

  const [activeAlbumId, setActiveAlbumId] = useState<string>(INITIAL_GALLERY_ALBUMS[0]?.id || 'alb-1');

  const activeAlbum = INITIAL_GALLERY_ALBUMS.find(a => a.id === activeAlbumId) || INITIAL_GALLERY_ALBUMS[0];
  const albumPhotos = INITIAL_GALLERY_PHOTOS.filter(p => p.albumId === activeAlbumId);

  return (
    <div className="space-y-10">
      
      {/* Header Banner */}
      <section className="bg-navy-900 text-white rounded-2xl p-8 shadow-md space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-900 text-xs font-bold text-amber-400">
          <Calendar className="w-4 h-4" />
          <span>CAMPUS LIFE & PHOTO GALLERY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Events, Celebrations & Gallery
        </h2>
        <p className="text-slate-300 text-sm max-w-3xl">
          Visual highlights of annual day celebrations, science expos, sports competitions, and student club activities at SRI VIDYA VIKAS JUNIOR COLLEGE.
        </p>
      </section>

      {/* Album Selector Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-xl font-bold text-navy-900">Photo Albums</h3>
          <PlaceholderBadge checklistRef="Section 4 - Campus Photos" note="Album Photos Flagged for Update" />
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 border-b border-slate-200">
          {INITIAL_GALLERY_ALBUMS.map((alb) => (
            <button
              key={alb.id}
              onClick={() => setActiveAlbumId(alb.id)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                activeAlbumId === alb.id
                  ? 'bg-maroon-900 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {alb.title} ({alb.eventYear})
            </button>
          ))}
        </div>
      </div>

      {/* Active Album Grid or Empty State */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <h3 className="text-2xl font-extrabold text-navy-900">{activeAlbum ? activeAlbum.title : 'Photo Album'}</h3>
          <p className="text-xs text-slate-500 mt-1">{activeAlbum ? activeAlbum.description : 'High-resolution campus photos'}</p>
        </div>

        {albumPhotos.length === 0 ? (
          <EmptyState 
            title="High-Resolution Photos Coming Soon"
            description="Per Section 4 Content Checklist, 5-8 high-resolution campus and event photos (min 1920x1080px) are currently being curated by the Admin Office."
            checklistRef="Section 4 - Campus Photos (5-8, high-res)"
            responsibleStaff="Admin Office"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {albumPhotos.map((photo) => (
              <div key={photo.id} className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm group">
                <img 
                  src={photo.imageUrl || "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=600"} 
                  alt="Campus Event Photo"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Events Schedule Grid */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-navy-900">College Events Schedule</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_EVENTS.map((evt) => (
            <div key={evt.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded ${
                  evt.isUpcoming ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                }`}>
                  {evt.isUpcoming ? 'Upcoming Event' : 'Past Event'}
                </span>
                <span className="text-xs text-slate-400 font-mono">{evt.eventDate}</span>
              </div>
              <h4 className="font-bold text-navy-900 text-base">{evt.title}</h4>
              <p className="text-xs text-slate-600">{evt.description}</p>
              <p className="text-[11px] text-slate-500 font-medium">Venue: {evt.venue}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
