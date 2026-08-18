import React, { useState } from 'react';
import { Calendar, Maximize2, X, Trophy, Microscope, GraduationCap, Image as ImageIcon } from 'lucide-react';
import { useData, DEFAULT_ALBUMS, type GalleryPhotoItem } from '../context/DataContext';
import { EmptyState } from '../components/common/EmptyState';
import { useSEO } from '../hooks/useSEO';

export const EventsPage: React.FC = () => {
  useSEO({
    title: "Campus Events & Photo Gallery | SRI VIDYA VIKAS JUNIOR COLLEGE",
    description: "Explore photo galleries of annual day celebrations, science expos, sports week, and orientation ceremonies at SRI VIDYA VIKAS JUNIOR COLLEGE, Prasanth Nagar, Madanapalle."
  });

  const { events, galleryPhotos } = useData();
  const [activeAlbumId, setActiveAlbumId] = useState<string>('alb-sports');
  const [selectedPhoto, setSelectedPhoto] = useState<{ url: string; title: string } | null>(null);

  const activeAlbum = DEFAULT_ALBUMS.find(a => a.id === activeAlbumId) || DEFAULT_ALBUMS[0];
  const albumPhotos = galleryPhotos.filter(p => p.albumId === activeAlbumId);

  const getAlbumIcon = (id: string) => {
    switch (id) {
      case 'alb-sports': return <Trophy className="w-4 h-4 text-amber-500" />;
      case 'alb-science': return <Microscope className="w-4 h-4 text-blue-500" />;
      case 'alb-farewell': return <GraduationCap className="w-4 h-4 text-emerald-500" />;
      default: return <ImageIcon className="w-4 h-4 text-maroon-800" />;
    }
  };

  return (
    <div className="space-y-10">
      
      {/* Header Banner */}
      <section className="bg-navy-900 text-white rounded-2xl p-8 shadow-md space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-900 text-xs font-bold text-amber-400">
          <Calendar className="w-4 h-4" />
          <span>CAMPUS LIFE & PHOTO GALLERY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Events, Celebrations & Photo Albums
        </h2>
        <p className="text-slate-300 text-sm max-w-3xl">
          Visual highlights of annual sports week, science expos, farewell orientation ceremonies, and campus celebrations at SRI VIDYA VIKAS JUNIOR COLLEGE.
        </p>
      </section>

      {/* Events Schedule Grid */}
      <section className="space-y-4">
        <h3 className="text-xl font-extrabold text-navy-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-maroon-800" />
          <span>Campus Events Schedule</span>
        </h3>

        {events.length === 0 ? (
          <EmptyState 
            title="No Campus Events Listed Yet"
            description="Upcoming campus events and celebrations posted via the Staff Control Panel will instantly appear here."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((evt) => (
              <div key={evt.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  {evt.posterUrl && (
                    <div 
                      onClick={() => setSelectedPhoto({ url: evt.posterUrl, title: evt.title })}
                      className="relative w-full h-64 sm:h-72 bg-slate-100 flex items-center justify-center p-1 border-b cursor-pointer group overflow-hidden"
                    >
                      <img 
                        src={evt.posterUrl} 
                        alt="" 
                        className="absolute inset-0 w-full h-full object-cover filter blur-2xl scale-125 opacity-50 select-none pointer-events-none"
                      />
                      <img 
                        src={evt.posterUrl} 
                        alt={evt.title} 
                        className="relative z-10 w-full h-full object-contain rounded group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                      />
                      <div className="absolute bottom-2 right-2 z-20 p-1.5 rounded bg-navy-900/80 text-white text-[10px] font-bold flex items-center gap-1 shadow">
                        <Maximize2 className="w-3 h-3 text-amber-400" />
                        <span>Zoom</span>
                      </div>
                    </div>
                  )}

                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded ${
                        evt.isUpcoming ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {evt.isUpcoming ? 'Upcoming Event' : 'Past Event'}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{evt.eventDate}</span>
                    </div>
                    <h4 className="font-bold text-navy-900 text-base">{evt.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{evt.description}</p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                  Venue: {evt.venue}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Album Selector Categories */}
      <div className="space-y-4">
        <h3 className="text-xl font-extrabold text-navy-900">Official College Photo Albums</h3>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 border-b border-slate-200">
          {DEFAULT_ALBUMS.map((alb) => (
            <button
              key={alb.id}
              onClick={() => setActiveAlbumId(alb.id)}
              className={`px-5 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all whitespace-nowrap shadow-sm ${
                activeAlbumId === alb.id
                  ? 'bg-navy-900 text-white shadow-md ring-2 ring-amber-400'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {getAlbumIcon(alb.id)}
              <span>{alb.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Album Grid */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <h3 className="text-2xl font-extrabold text-navy-900 flex items-center gap-2">
            {getAlbumIcon(activeAlbum.id)}
            <span>{activeAlbum.title}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">{activeAlbum.description}</p>
        </div>

        {albumPhotos.length === 0 ? (
          <EmptyState 
            title="Official Album Photos Coming Soon"
            description={`Staff can upload high-resolution photos for '${activeAlbum.title}' via the Staff Control Panel.`}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {albumPhotos.map((photo: GalleryPhotoItem) => (
              <div 
                key={photo.id} 
                onClick={() => setSelectedPhoto({ url: photo.imageUrl, title: photo.caption || activeAlbum.title })}
                className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm group cursor-pointer bg-slate-100 flex flex-col items-center justify-center"
              >
                <img 
                  src={photo.imageUrl} 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover filter blur-2xl scale-125 opacity-50 select-none pointer-events-none"
                />
                <img 
                  src={photo.imageUrl} 
                  alt={photo.caption || "Campus Event Photo"}
                  className="relative z-10 w-full h-64 object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                />
                {photo.caption && (
                  <div className="relative z-20 w-full p-2.5 bg-navy-900 text-white text-[11px] font-semibold text-center border-t border-navy-800">
                    {photo.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-navy-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-amber-400 font-bold flex items-center gap-1 text-xs"
            >
              <X className="w-6 h-6" />
              <span>Close</span>
            </button>
            <img 
              src={selectedPhoto.url} 
              alt={selectedPhoto.title}
              className="max-h-[80vh] w-auto object-contain rounded-2xl border-2 border-white/20 shadow-2xl"
            />
            <p className="text-white text-sm font-bold mt-3 text-center">{selectedPhoto.title}</p>
          </div>
        </div>
      )}

    </div>
  );
};
