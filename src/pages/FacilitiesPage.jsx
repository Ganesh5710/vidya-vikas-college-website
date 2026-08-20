import React, { useState } from 'react';
import { Building2, Upload, ImageIcon, Maximize2, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useSEO } from '../hooks/useSEO';
export const FacilitiesPage = () => {
    useSEO({
        title: "Facilities & Infrastructure | SRI VIDYA VIKAS JUNIOR COLLEGE",
        description: "Explore campus science labs, sports grounds, and transport facilities at SRI VIDYA VIKAS JUNIOR COLLEGE in Prasanth Nagar, Madanapalle."
    });
    const { facilities, updateFacilityPhoto } = useData();
    const { isAuthenticated } = useAuth();
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const handleFacilityPhotoUpload = (e, facilityId) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const resultUrl = reader.result;
                updateFacilityPhoto(facilityId, resultUrl);
                alert('Facility photo updated live across the website!');
            };
            reader.readAsDataURL(file);
        }
    };
    return (<div className="space-y-10">
      
      {/* Header Banner */}
      <section className="bg-navy-900 text-white rounded-2xl p-8 shadow-md space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-900 text-xs font-bold text-amber-400">
          <Building2 className="w-4 h-4"/>
          <span>CAMPUS INFRASTRUCTURE & LABS</span>
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
        {facilities.map((item) => (<div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              {/* Photo Area or Institutional Placeholder */}
              {item.photoUrl ? (<div onClick={() => setSelectedPhoto({ url: item.photoUrl, title: item.title })} className="relative h-56 bg-slate-950 flex items-center justify-center p-1 border-b cursor-pointer group">
                  <img src={item.photoUrl} alt={item.title} className="w-full h-full object-contain rounded group-hover:scale-105 transition-transform duration-300"/>
                  <span className="absolute top-3 left-3 bg-navy-900/90 text-white text-[10px] font-bold px-2.5 py-1 rounded backdrop-blur">
                    {item.category}
                  </span>
                  <div className="absolute bottom-2 right-2 p-1.5 rounded bg-navy-900/80 text-white text-[10px] font-bold flex items-center gap-1">
                    <Maximize2 className="w-3 h-3 text-amber-400"/>
                    <span>Zoom</span>
                  </div>
                </div>) : (<div className="relative h-56 bg-gradient-to-br from-slate-900 via-navy-950 to-slate-900 text-slate-300 flex flex-col items-center justify-center p-6 text-center space-y-2 border-b">
                  <span className="absolute top-3 left-3 bg-maroon-900 text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded">
                    {item.category}
                  </span>
                  
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-amber-400 mb-1">
                    <ImageIcon className="w-6 h-6"/>
                  </div>

                  <p className="text-xs font-bold text-white">{item.title}</p>
                  <p className="text-[11px] text-slate-400">Official Campus Photo Pending Upload</p>

                  {/* Staff Upload Button if logged in */}
                  {isAuthenticated && (<label className="mt-2 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-navy-950 text-xs font-black flex items-center gap-1.5 cursor-pointer shadow">
                      <Upload className="w-3.5 h-3.5"/>
                      <span>Upload Real Photo</span>
                      <input type="file" accept="image/*" onChange={(e) => handleFacilityPhotoUpload(e, item.id)} className="hidden"/>
                    </label>)}
                </div>)}

              <div className="p-5 space-y-2">
                <h3 className="font-extrabold text-navy-900 text-lg">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            </div>

            {/* Bottom Admin Upload Bar */}
            <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">Sri Vidya Vikas Junior College</span>
              
              <label className="text-xs text-maroon-900 font-bold hover:underline flex items-center gap-1 cursor-pointer">
                <Upload className="w-3.5 h-3.5"/>
                <span>Upload Photo</span>
                <input type="file" accept="image/*" onChange={(e) => handleFacilityPhotoUpload(e, item.id)} className="hidden"/>
              </label>
            </div>
          </div>))}
      </section>

      {/* LIGHTBOX MODAL */}
      {selectedPhoto && (<div className="fixed inset-0 z-50 bg-navy-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <button onClick={() => setSelectedPhoto(null)} className="absolute -top-12 right-0 p-2 text-white hover:text-amber-400 font-bold flex items-center gap-1 text-xs">
              <X className="w-6 h-6"/>
              <span>Close</span>
            </button>
            <img src={selectedPhoto.url} alt={selectedPhoto.title} className="max-h-[80vh] w-auto object-contain rounded-2xl border-2 border-white/20 shadow-2xl"/>
            <p className="text-white text-sm font-bold mt-3 text-center">{selectedPhoto.title}</p>
          </div>
        </div>)}

    </div>);
};
