import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Award, 
  BookOpen, 
  GraduationCap, 
  ChevronRight, 
  Sparkles, 
  Quote, 
  Calendar, 
  Bell, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { COLLEGE_DETAILS, INITIAL_STREAMS, INITIAL_NOTICES, INITIAL_EVENTS, INITIAL_CONTACT_INFO } from '../constants/collegeData';
import { PlaceholderBadge } from '../components/common/PlaceholderBadge';
import { useSEO } from '../hooks/useSEO';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActiveTab }) => {
  useSEO({
    title: "SRI VIDYA VIKAS JUNIOR COLLEGE | Prasanth Nagar, Madanapalle",
    description: "SRI VIDYA VIKAS JUNIOR COLLEGE in Prasanth Nagar, Madanapalle (Near Krishna Reddy Junior College). Established Nov 2024, rated 5.0 stars (45 reviews). Offering MPC, BiPC, CEC, MEC, HEC streams."
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1920",
      title: "Empowering Students for Academic & Career Excellence",
      subtitle: `${COLLEGE_DETAILS.name}, ${COLLEGE_DETAILS.address}`,
      badge: "ESTABLISHED NOVEMBER 2024 • RATED 5.0 STARS"
    },
    {
      url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1920",
      title: "State-of-the-Art Science & Computer Laboratories",
      subtitle: "Hands-on Physics, Chemistry, Biology & Computer Science Labs",
      badge: "MODERN CAMPUS INFRASTRUCTURE"
    },
    {
      url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1920",
      title: "Special EAMCET, NEET & JEE Main Orientation",
      subtitle: "Dedicated Coaching for Top Engineering & Medical Entrance Exams",
      badge: "BIEAP CURRICULUM + COMPETITIVE EXAMS"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-12">
      
      {/* 1. HERO SLIDER CAROUSEL */}
      <section className="relative h-[480px] sm:h-[540px] rounded-2xl overflow-hidden shadow-xl border border-slate-200">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 bg-cover bg-center ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{ backgroundImage: `url(${slide.url})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-transparent"></div>
            
            <div className="relative z-20 h-full max-w-5xl mx-auto px-6 flex flex-col justify-end pb-12 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-900/90 text-white text-xs font-bold w-fit border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{slide.badge}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {slide.title}
              </h2>

              <p className="text-slate-200 text-sm sm:text-base max-w-2xl font-medium">
                {slide.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setActiveTab('admissions')}
                  className="px-6 py-3 rounded-xl bg-maroon-900 hover:bg-maroon-800 text-white font-bold text-sm shadow-lg shadow-maroon-950/50 flex items-center gap-2 transition-transform hover:scale-105"
                >
                  <span>Apply for Admission 2025</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveTab('streams')}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur text-white border border-white/30 font-bold text-sm flex items-center gap-2 transition-colors"
                >
                  <span>Explore Streams (MPC, BiPC...)</span>
                  <ChevronRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 right-6 z-30 flex items-center gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentSlide ? 'bg-amber-400 w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. ADMISSIONS OPEN ALERT BANNER */}
      <section className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 rounded-xl p-4 sm:p-6 text-navy-950 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-navy-950 text-amber-400 flex items-center justify-center font-bold text-xl shrink-0 border-2 border-white">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-navy-950 uppercase tracking-wide">
              Admissions Open for Academic Year 2025-2026
            </h3>
            <p className="text-xs font-semibold text-navy-900">
              Streams: MPC, BiPC, CEC, MEC, HEC • Entrance Coaching for EAMCET, NEET & JEE
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('admissions')}
          className="px-5 py-2.5 rounded-lg bg-navy-900 hover:bg-navy-950 text-white font-bold text-xs uppercase tracking-wider shadow transition-transform hover:scale-105"
        >
          Submit Online Application
        </button>
      </section>

      {/* 3. QUICK STATS HIGHLIGHTS */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center space-y-1">
          <div className="inline-flex p-2 rounded-lg bg-amber-50 text-amber-600 mb-1">
            <Star className="w-6 h-6 fill-amber-500" />
          </div>
          <h4 className="text-2xl font-extrabold text-navy-900">5.0 / 5.0</h4>
          <p className="text-xs font-semibold text-slate-500">45 Reviews Rating</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center space-y-1">
          <div className="inline-flex p-2 rounded-lg bg-maroon-50 text-maroon-800 mb-1">
            <Award className="w-6 h-6" />
          </div>
          <h4 className="text-2xl font-extrabold text-navy-900">Nov 2024</h4>
          <p className="text-xs font-semibold text-slate-500">Established Date</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center space-y-1">
          <div className="inline-flex p-2 rounded-lg bg-blue-50 text-blue-800 mb-1">
            <BookOpen className="w-6 h-6" />
          </div>
          <h4 className="text-2xl font-extrabold text-navy-900">5 Streams</h4>
          <p className="text-xs font-semibold text-slate-500">MPC, BiPC, CEC, MEC, HEC</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center space-y-1">
          <div className="inline-flex p-2 rounded-lg bg-emerald-50 text-emerald-800 mb-1">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h4 className="text-2xl font-extrabold text-navy-900">BIEAP</h4>
          <p className="text-xs font-semibold text-slate-500">Board Affiliated</p>
        </div>
      </section>

      {/* 4. PRINCIPAL'S OFFICIAL MESSAGE */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="space-y-3">
          <div className="relative rounded-xl overflow-hidden border-4 border-maroon-900/20 shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600" 
              alt={`Principal ${COLLEGE_DETAILS.name}`}
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-navy-950/90 text-white p-3 text-center">
              <p className="font-bold text-sm">{INITIAL_CONTACT_INFO.principalName}</p>
              <p className="text-[11px] text-amber-400">{COLLEGE_DETAILS.name}</p>
            </div>
          </div>
          <PlaceholderBadge checklistRef="Section 4 - Principal Message & Photo" note="Official Photo Flagged for Update" />
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="inline-flex items-center gap-2 text-maroon-900 font-bold text-xs uppercase tracking-wider bg-maroon-50 px-3 py-1 rounded-full">
            <Quote className="w-3.5 h-3.5 text-maroon-800" />
            <span>Principal's Official Message</span>
          </div>

          <h3 className="text-2xl font-extrabold text-navy-900">
            Welcome to {COLLEGE_DETAILS.name}
          </h3>

          <p className="text-slate-600 text-sm leading-relaxed italic border-l-4 border-maroon-800 pl-4 py-1">
            "{INITIAL_CONTACT_INFO.principalMessageText}"
          </p>

          <div className="pt-2 flex items-center justify-between">
            <div>
              <p className="font-bold text-navy-900 text-sm">Administration Desk</p>
              <p className="text-xs text-slate-500">{COLLEGE_DETAILS.address}</p>
            </div>
            <button
              onClick={() => setActiveTab('about')}
              className="text-xs font-bold text-maroon-800 hover:text-navy-900 flex items-center gap-1"
            >
              <span>Read Full History & Vision</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. STREAMS OFFERED BANNER */}
      <section className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-2xl font-extrabold text-navy-900">Streams Offered</h3>
            <p className="text-xs text-slate-500">Pick the right academic stream for Class 11 & Class 12</p>
          </div>
          <button
            onClick={() => setActiveTab('streams')}
            className="text-xs font-bold text-maroon-800 hover:underline flex items-center gap-1"
          >
            <span>View Syllabus & Weekly Timetable</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_STREAMS.slice(0, 3).map((stream) => (
            <div key={stream.id} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 rounded bg-navy-900 text-white">
                  {stream.name} Stream
                </span>
                <span className="text-[11px] text-slate-400 font-mono">BIEAP Syllabus</span>
              </div>

              <h4 className="font-bold text-navy-900 text-lg">{stream.fullName}</h4>
              
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong className="text-navy-900">Career Note:</strong> {stream.careerPaths}
              </p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Class 10 Cut-off: {stream.eligibility.split(' ')[0]}</span>
                <button
                  onClick={() => setActiveTab('streams')}
                  className="font-bold text-maroon-800 hover:text-navy-900"
                >
                  Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. LATEST NOTICES & UPCOMING EVENTS GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Notices */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-maroon-800" />
              <h3 className="font-bold text-navy-900 text-lg">Circulars & Notices</h3>
            </div>
            <button onClick={() => setActiveTab('studentCorner')} className="text-xs font-bold text-maroon-800 hover:underline">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {INITIAL_NOTICES.map((notice) => (
              <div key={notice.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-maroon-900 bg-maroon-100 px-2 py-0.5 rounded">
                    {notice.category}
                  </span>
                  <span className="text-slate-400">{notice.publishedDate}</span>
                </div>
                <h4 className="font-semibold text-navy-900 text-xs">{notice.title}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Events */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-navy-900" />
              <h3 className="font-bold text-navy-900 text-lg">Campus Events</h3>
            </div>
            <button onClick={() => setActiveTab('events')} className="text-xs font-bold text-maroon-800 hover:underline">
              Gallery & Events
            </button>
          </div>

          <div className="space-y-3">
            {INITIAL_EVENTS.map((evt) => (
              <div key={evt.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-3">
                <img 
                  src={evt.posterUrl || "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=400"} 
                  alt={evt.title}
                  className="w-16 h-16 rounded-lg object-cover border shrink-0"
                />
                <div className="space-y-1 min-w-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    evt.isUpcoming ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {evt.isUpcoming ? 'Upcoming Event' : 'Past Event'}
                  </span>
                  <h4 className="font-bold text-navy-900 text-xs truncate">{evt.title}</h4>
                  <p className="text-[11px] text-slate-500">{evt.eventDate} • {evt.venue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

    </div>
  );
};
