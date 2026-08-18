import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_NOTICES, 
  INITIAL_EVENTS, 
  INITIAL_FACULTY, 
  INITIAL_TOPPERS 
} from '../constants/collegeData';

export interface NoticeItem {
  id: string;
  title: string;
  category: string;
  publishedDate: string;
  pdfUrl: string;
  isTicker: boolean;
  isArchived: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  guestDetails: string;
  description: string;
  posterUrl: string;
  isUpcoming: boolean;
}

export interface FacultyItem {
  id: string;
  name: string;
  designation: string;
  subject: string;
  streamId: string;
  qualification: string;
  experienceYears: number;
  email: string;
  photoUrl: string;
}

export interface TopperItem {
  id: string;
  academicYear: string;
  studentName: string;
  marksPercentage: number;
  rank: string;
  streamId: string;
  photoUrl: string;
  isCompetitiveQualifier: boolean;
  examName: string;
}

export interface LeadItem {
  id: string;
  name: string;
  phone: string;
  stream: string;
  marks: string;
  status: string;
  date: string;
}

export interface FacilityItem {
  id: string;
  title: string;
  category: string;
  description: string;
  photoUrl: string;
}

export interface HeroSlideItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  photoUrl: string;
  ctaText: string;
  ctaTab: string;
}

export interface GalleryPhotoItem {
  id: string;
  albumId: string;
  imageUrl: string;
  caption: string;
}

export const DEFAULT_ALBUMS = [
  { id: 'alb-sports', title: 'Annual Sports Week & Prize Distribution', category: 'Sports', eventYear: '2024-2025', description: 'Volleyball tournaments, athletics, shuttle badminton, and sports trophy distributions.' },
  { id: 'alb-science', title: 'Science Exhibition & Practical Workshops', category: 'Academic', eventYear: '2024-2025', description: 'Student working models, optical experiments, chemical titration demonstrations, and bio exhibits.' },
  { id: 'alb-farewell', title: 'Farewell & Orientation Ceremonies', category: 'Cultural', eventYear: '2024-2025', description: 'Freshers orientation program, cultural performances, and senior class farewell celebrations.' }
];

const DEFAULT_FACILITIES: FacilityItem[] = [
  {
    id: "lab-physics",
    title: "Physics & Optics Laboratory",
    category: "Laboratory",
    description: "Equipped with dark room for optical experiments, potentiometers, vernier calipers, and modern electronics kits for BIEAP syllabus.",
    photoUrl: ""
  },
  {
    id: "lab-chem",
    title: "Chemistry & Qualitative Analysis Lab",
    category: "Laboratory",
    description: "Full fume hood safety systems, titration benches, reagent racks, and glass apparatus for organic and inorganic practicals.",
    photoUrl: ""
  },
  {
    id: "lab-bio",
    title: "Botany & Zoology Biology Lab",
    category: "Laboratory",
    description: "High-magnification compound microscopes, preserved plant/animal specimens, anatomical models, and slide preparation setups.",
    photoUrl: ""
  },
  {
    id: "lib-central",
    title: "Central Library & Digital Reading Room",
    category: "Library",
    description: "Quiet study room with reference books for Intermediate Board, EAMCET, NEET, and JEE Main prep, plus digital catalog access.",
    photoUrl: ""
  },
  {
    id: "transport",
    title: "College Bus & Transport Routes",
    category: "Transport",
    description: "Safe, fleet-managed college buses connecting Prasanth Nagar with major surrounding areas in Madanapalle.",
    photoUrl: ""
  },
  {
    id: "sports",
    title: "Sports Grounds & Athletics",
    category: "Sports",
    description: "Outdoor volleyball, shuttle badminton courts, table tennis, chess, and annual sports week competitions.",
    photoUrl: ""
  }
];

const DEFAULT_HERO_SLIDES: HeroSlideItem[] = [
  {
    id: "slide-1",
    tag: "BIEAP CURRICULUM + COMPETITIVE EXAMS",
    title: "Special EAMCET, NEET & JEE Main Orientation",
    subtitle: "Dedicated Coaching for Top Engineering & Medical Entrance Exams",
    photoUrl: "",
    ctaText: "Apply for Admission 2025",
    ctaTab: "admissions"
  },
  {
    id: "slide-2",
    tag: "EXPERT FACULTY & DISCIPLINED CAMPUS",
    title: "Building Strong Academic Foundations",
    subtitle: "Science Labs & Computer Facilities in Prasanth Nagar, Madanapalle",
    photoUrl: "",
    ctaText: "Explore Facilities",
    ctaTab: "facilities"
  },
  {
    id: "slide-3",
    tag: "INTERMEDIATE STREAMS: MPC • BiPC • CEC • MEC • HEC",
    title: "Comprehensive BIEAP Board Preparation",
    subtitle: "Regular Mock Tests, Personal Mentoring & 100% Concept Clarity",
    photoUrl: "",
    ctaText: "View Streams Offered",
    ctaTab: "streams"
  }
];

interface DataContextType {
  notices: NoticeItem[];
  events: EventItem[];
  faculty: FacultyItem[];
  toppers: TopperItem[];
  leads: LeadItem[];
  facilities: FacilityItem[];
  heroSlides: HeroSlideItem[];
  galleryPhotos: GalleryPhotoItem[];
  addNotice: (notice: NoticeItem) => void;
  deleteNotice: (id: string) => void;
  addEvent: (event: EventItem) => void;
  deleteEvent: (id: string) => void;
  addFaculty: (faculty: FacultyItem) => void;
  deleteFaculty: (id: string) => void;
  addTopper: (topper: TopperItem) => void;
  deleteTopper: (id: string) => void;
  addLead: (lead: LeadItem) => void;
  updateLeadStatus: (id: string, status: string) => void;
  addFacility: (facility: FacilityItem) => void;
  deleteFacility: (id: string) => void;
  updateFacilityPhoto: (id: string, photoUrl: string) => void;
  updateHeroSlidePhoto: (id: string, photoUrl: string) => void;
  addGalleryPhoto: (photo: GalleryPhotoItem) => void;
  deleteGalleryPhoto: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  NOTICES: 'svvjc_notices_data_v1',
  EVENTS: 'svvjc_events_data_v1',
  FACULTY: 'svvjc_faculty_data_v1',
  TOPPERS: 'svvjc_toppers_data_v1',
  LEADS: 'svvjc_leads_data_v1',
  FACILITIES: 'svvjc_facilities_data_v1',
  HERO_SLIDES: 'svvjc_hero_slides_data_v1',
  GALLERY_PHOTOS: 'svvjc_gallery_photos_data_v1',
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notices, setNotices] = useState<NoticeItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTICES);
      return saved ? JSON.parse(saved) : INITIAL_NOTICES;
    } catch {
      return INITIAL_NOTICES;
    }
  });

  const [events, setEvents] = useState<EventItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
      return saved ? JSON.parse(saved) : INITIAL_EVENTS;
    } catch {
      return INITIAL_EVENTS;
    }
  });

  const [faculty, setFaculty] = useState<FacultyItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FACULTY);
      return saved ? JSON.parse(saved) : INITIAL_FACULTY;
    } catch {
      return INITIAL_FACULTY;
    }
  });

  const [toppers, setToppers] = useState<TopperItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TOPPERS);
      return saved ? JSON.parse(saved) : INITIAL_TOPPERS;
    } catch {
      return INITIAL_TOPPERS;
    }
  });

  const [leads, setLeads] = useState<LeadItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LEADS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [facilities, setFacilities] = useState<FacilityItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FACILITIES);
      return saved ? JSON.parse(saved) : DEFAULT_FACILITIES;
    } catch {
      return DEFAULT_FACILITIES;
    }
  });

  const [heroSlides, setHeroSlides] = useState<HeroSlideItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HERO_SLIDES);
      return saved ? JSON.parse(saved) : DEFAULT_HERO_SLIDES;
    } catch {
      return DEFAULT_HERO_SLIDES;
    }
  });

  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhotoItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GALLERY_PHOTOS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync to LocalStorage
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(notices)); } catch {}
  }, [notices]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events)); } catch {}
  }, [events]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.FACULTY, JSON.stringify(faculty)); } catch {}
  }, [faculty]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.TOPPERS, JSON.stringify(toppers)); } catch {}
  }, [toppers]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads)); } catch {}
  }, [leads]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.FACILITIES, JSON.stringify(facilities)); } catch {}
  }, [facilities]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.HERO_SLIDES, JSON.stringify(heroSlides)); } catch {}
  }, [heroSlides]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.GALLERY_PHOTOS, JSON.stringify(galleryPhotos)); } catch {}
  }, [galleryPhotos]);

  // Actions
  const addNotice = (notice: NoticeItem) => setNotices(prev => [notice, ...prev]);
  const deleteNotice = (id: string) => setNotices(prev => prev.filter(item => item.id !== id));

  const addEvent = (event: EventItem) => setEvents(prev => [event, ...prev]);
  const deleteEvent = (id: string) => setEvents(prev => prev.filter(item => item.id !== id));

  const addFaculty = (fac: FacultyItem) => setFaculty(prev => [fac, ...prev]);
  const deleteFaculty = (id: string) => setFaculty(prev => prev.filter(item => item.id !== id));

  const addTopper = (topper: TopperItem) => setToppers(prev => [topper, ...prev]);
  const deleteTopper = (id: string) => setToppers(prev => prev.filter(item => item.id !== id));

  const addLead = (lead: LeadItem) => setLeads(prev => [lead, ...prev]);
  const updateLeadStatus = (id: string, status: string) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const addFacility = (item: FacilityItem) => setFacilities(prev => [item, ...prev]);
  const deleteFacility = (id: string) => setFacilities(prev => prev.filter(item => item.id !== id));

  const updateFacilityPhoto = (id: string, photoUrl: string) => {
    setFacilities(prev => prev.map(item => item.id === id ? { ...item, photoUrl } : item));
  };

  const updateHeroSlidePhoto = (id: string, photoUrl: string) => {
    setHeroSlides(prev => prev.map(item => item.id === id ? { ...item, photoUrl } : item));
  };

  const addGalleryPhoto = (photo: GalleryPhotoItem) => setGalleryPhotos(prev => [photo, ...prev]);
  const deleteGalleryPhoto = (id: string) => setGalleryPhotos(prev => prev.filter(p => p.id !== id));

  return (
    <DataContext.Provider value={{
      notices,
      events,
      faculty,
      toppers,
      leads,
      facilities,
      heroSlides,
      galleryPhotos,
      addNotice,
      deleteNotice,
      addEvent,
      deleteEvent,
      addFaculty,
      deleteFaculty,
      addTopper,
      deleteTopper,
      addLead,
      updateLeadStatus,
      addFacility,
      deleteFacility,
      updateFacilityPhoto,
      updateHeroSlidePhoto,
      addGalleryPhoto,
      deleteGalleryPhoto
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
