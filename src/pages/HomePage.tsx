import React, { useState } from 'react';
import { 
  GraduationCap, 
  Award, 
  Star, 
  ChevronRight, 
  Calendar, 
  Bell, 
  ChevronLeft, 
  CheckCircle, 
  ArrowRight,
  BookOpen,
  Sparkles,
  Calculator,
  Compass,
  Download
} from 'lucide-react';
import { INITIAL_STREAMS } from '../constants/collegeData';
import { useData } from '../context/DataContext';
import { StreamPredictorModal } from '../components/common/StreamPredictorModal';
import { VirtualCampusTourModal } from '../components/common/VirtualCampusTourModal';
import { useSEO } from '../hooks/useSEO';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActiveTab }) => {
  useSEO({
    title: "SRI VIDYA VIKAS JUNIOR COLLEGE | Prasanth Nagar, Madanapalle",
    description: "Welcome to SRI VIDYA VIKAS JUNIOR COLLEGE, Prasanth Nagar, Madanapalle. Offering MPC, BiPC, CEC, MEC, HEC intermediate education and EAMCET, NEET, JEE coaching."
  });

  const { notices, events } = useData();

  // Hero carousel slides
  const heroSlides = [
    {
      id: 1,
      tag: "BIEAP CURRICULUM + COMPETITIVE EXAMS",
      title: "Special EAMCET, NEET & JEE Main Orientation",
      subtitle: "Dedicated Coaching for Top Engineering & Medical Entrance Exams",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1600",
      ctaText: "Apply for Admission 2025",
      ctaTab: "admissions"
    },
    {
      id: 2,
      tag: "EXPERT FACULTY & DISCIPLINED CAMPUS",
      title: "Building Strong Academic Foundations Since Nov 2024",
      subtitle: "State-of-the-Art Science Labs & Computer Facilities in Prasanth Nagar",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1600",
      ctaText: "Explore Facilities",
      ctaTab: "facilities"
    },
    {
      id: 3,
      tag: "INTERMEDIATE STREAMS: MPC • BiPC • CEC • MEC • HEC",
      title: "Comprehensive BIEAP Board Preparation",
      subtitle: "Regular Mock Tests, Personal Mentoring & 100% Concept Clarity",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1600",
      ctaText: "View Streams Offered",
      ctaTab: "streams"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Modal triggers
  const [isPredictorOpen, setIsPredictorOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="space-y-12">
      
      {/* 1. HERO SLIDER SECTION */}
      <section className="relative rounded-3xl overflow-hidden shadow-2xl bg-navy-950 min-h-[460px] sm:min-h-[520px] flex items-center">
        
        {/* Background Image Carousel */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroSlides[currentSlide].image} 
            alt={heroSlides[currentSlide].title}
            className="w-full h-full object-cover opacity-35 transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-transparent"></div>
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 max-w-3xl p-6 sm:p-12 space-y-5 text-white">
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-maroon-900 text-amber-400 text-xs font-black tracking-wider uppercase shadow">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{heroSlides[currentSlide].tag}</span>
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {heroSlides[currentSlide].title}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-medium max-w-xl">
            {heroSlides[currentSlide].subtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab(heroSlides[currentSlide].ctaTab)}
              className="px-6 py-3.5 rounded-xl bg-maroon-900 hover:bg-maroon-800 text-white font-extrabold text-xs tracking-wider uppercase shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
            >
              <span>{heroSlides[currentSlide].ctaText}</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>

            <button
              onClick={() => setIsPredictorOpen(true)}
              className="px-5 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-extrabold text-xs tracking-wider uppercase shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Class 10 Stream Predictor</span>
            </button>

            <button
              onClick={() => setIsTourOpen(true)}
              className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs tracking-wider uppercase backdrop-blur transition-transform hover:scale-105 flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>360° Virtual Tour</span>
            </button>
          </div>

        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
          <button 
            onClick={prevSlide}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur border border-white/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1 px-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === idx ? 'w-6 bg-amber-400' : 'w-2 bg-white/40'
                }`}
              />
            ))}
          </div>

          <button 
            onClick={nextSlide}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur border border-white/20 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </section>

      {/* 2. ADMISSIONS ALERT BANNER */}
      <section className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-2xl p-6 sm:p-8 shadow-md flex flex-wrap items-center justify-between gap-4 border border-amber-300">
        <div className="flex items-center gap-4">
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

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/SVVJC_Application_Form.pdf"
            download="SVVJC_Application_Form.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-navy-900 hover:bg-navy-950 text-white font-bold text-xs shadow transition-transform hover:scale-105 flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Download Application Form PDF</span>
          </a>

          <button
            onClick={() => setActiveTab('admissions')}
            className="px-5 py-2 rounded-lg bg-maroon-900 hover:bg-maroon-950 text-white font-bold text-xs uppercase tracking-wider shadow transition-transform hover:scale-105"
          >
            Submit Online Application
          </button>
        </div>
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
          <p className="text-xs font-semibold text-slate-500">AP State Recognized</p>
        </div>
      </section>

      {/* 4. PRINCIPAL WELCOME MESSAGE */}
      <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        <div className="space-y-4 lg:col-span-2">
          <span className="text-xs font-extrabold text-maroon-900 uppercase tracking-widest bg-maroon-50 px-3 py-1 rounded-full border border-maroon-100">
            PRINCIPAL'S WELCOME DESK
          </span>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-900 leading-tight">
            Nurturing Academic Excellence & Career Ambitions
          </h3>

          <blockquote className="text-slate-600 text-xs sm:text-sm leading-relaxed border-l-4 border-maroon-800 pl-4 italic">
            "Welcome to SRI VIDYA VIKAS JUNIOR COLLEGE. Founded in November 2024, our mission is to deliver rigorous BIEAP intermediate education integrated with focused competitive entrance coaching for EAMCET, NEET, and JEE Main. We combine disciplined learning with personal student mentoring in Prasanth Nagar, Madanapalle."
          </blockquote>

          <div className="pt-2">
            <button
              onClick={() => setActiveTab('about')}
              className="inline-flex items-center gap-2 text-xs font-bold text-maroon-800 hover:text-navy-900"
            >
              <span>Read Full Institution Vision & History</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 text-center">
          <div className="w-24 h-24 rounded-full bg-navy-900 text-amber-400 flex items-center justify-center font-bold text-3xl mx-auto shadow-md border-4 border-white">
            <GraduationCap className="w-12 h-12" />
          </div>

          <div className="space-y-0.5">
            <h4 className="font-extrabold text-navy-900 text-base">Principal's Office Desk</h4>
            <p className="text-xs text-maroon-900 font-bold">SRI VIDYA VIKAS JUNIOR COLLEGE</p>
            <p className="text-[11px] text-slate-500">Prasanth Nagar, Madanapalle</p>
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
            <button onClick={() => setActiveTab('events')} className="text-xs font-bold text-maroon-800 hover:underline">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {notices.length > 0 ? (
              notices.slice(0, 4).map((notice) => (
                <div key={notice.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-maroon-900 bg-maroon-100 px-2 py-0.5 rounded">
                      {notice.category}
                    </span>
                    <span className="text-slate-400">{notice.publishedDate}</span>
                  </div>
                  <h4 className="font-semibold text-navy-900 text-xs">{notice.title}</h4>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic p-4 text-center">No circulars or notices posted yet.</p>
            )}
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
            {events.length > 0 ? (
              events.slice(0, 3).map((evt) => (
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
              ))
            ) : (
              <p className="text-xs text-slate-500 italic p-4 text-center">No campus events scheduled yet.</p>
            )}
          </div>
        </div>

      </section>

      {/* Modals */}
      <StreamPredictorModal 
        isOpen={isPredictorOpen}
        onClose={() => setIsPredictorOpen(false)}
        onSelectStream={setActiveTab}
      />

      <VirtualCampusTourModal 
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
      />

    </div>
  );
};
