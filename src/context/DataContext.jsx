import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_NOTICES, INITIAL_EVENTS, INITIAL_FACULTY, INITIAL_TOPPERS } from '../constants/collegeData';
import {
    fetchToppersFromBackend,
    addTopperToBackend,
    updateTopperInBackend,
    deleteTopperFromBackend,
    subscribeToToppersBackend
} from '../services/toppersApi';

export const DEFAULT_ALBUMS = [
    { id: 'alb-sports', title: 'Annual Sports Week & Prize Distribution', category: 'Sports', eventYear: '2024-2025', description: 'Volleyball tournaments, athletics, shuttle badminton, and sports trophy distributions.' },
    { id: 'alb-science', title: 'Science Exhibition & Practical Workshops', category: 'Academic', eventYear: '2024-2025', description: 'Student working models, optical experiments, chemical titration demonstrations, and bio exhibits.' },
    { id: 'alb-farewell', title: 'Farewell & Orientation Ceremonies', category: 'Cultural', eventYear: '2024-2025', description: 'Freshers orientation program, cultural performances, and senior class farewell celebrations.' }
];

const DEFAULT_FACILITIES = [
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

const DEFAULT_HERO_SLIDES = [
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

const DataContext = createContext(undefined);

const STORAGE_KEYS = {
    NOTICES: 'svvjc_notices_data_v1',
    EVENTS: 'svvjc_events_data_v1',
    FACULTY: 'svvjc_faculty_data_v1',
    LEADS: 'svvjc_leads_data_v1',
    FACILITIES: 'svvjc_facilities_data_v1',
    HERO_SLIDES: 'svvjc_hero_slides_data_v1',
    GALLERY_PHOTOS: 'svvjc_gallery_photos_data_v1',
};

export const DataProvider = ({ children }) => {
    const [notices, setNotices] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.NOTICES);
            return saved ? JSON.parse(saved) : INITIAL_NOTICES;
        }
        catch {
            return INITIAL_NOTICES;
        }
    });

    const [events, setEvents] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
            return saved ? JSON.parse(saved) : INITIAL_EVENTS;
        }
        catch {
            return INITIAL_EVENTS;
        }
    });

    const [faculty, setFaculty] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.FACULTY);
            return saved ? JSON.parse(saved) : INITIAL_FACULTY;
        }
        catch {
            return INITIAL_FACULTY;
        }
    });

    // Centralized Backend State for Toppers/Results (No localStorage dependency)
    const [toppers, setToppers] = useState(INITIAL_TOPPERS);

    const [leads, setLeads] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.LEADS);
            return saved ? JSON.parse(saved) : [];
        }
        catch {
            return [];
        }
    });

    const [facilities, setFacilities] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.FACILITIES);
            if (saved) {
                const parsed = JSON.parse(saved);
                return parsed.filter(item => item.id !== 'lib-central' && !item.title.toLowerCase().includes('central library'));
            }
            return DEFAULT_FACILITIES;
        }
        catch {
            return DEFAULT_FACILITIES;
        }
    });

    const [heroSlides, setHeroSlides] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.HERO_SLIDES);
            return saved ? JSON.parse(saved) : DEFAULT_HERO_SLIDES;
        }
        catch {
            return DEFAULT_HERO_SLIDES;
        }
    });

    const [galleryPhotos, setGalleryPhotos] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.GALLERY_PHOTOS);
            return saved ? JSON.parse(saved) : [];
        }
        catch {
            return [];
        }
    });

    // Load Toppers from Centralized Database API & Listen to Realtime Sync
    useEffect(() => {
        // Purge legacy device-specific localStorage key if present
        try {
            localStorage.removeItem('svvjc_toppers_data_v1');
        } catch { }

        let isMounted = true;

        // Fetch live database records from backend
        fetchToppersFromBackend().then(backendData => {
            if (isMounted && backendData && backendData.length > 0) {
                setToppers(backendData);
            }
        });

        // Realtime Subscription across all connected devices
        const unsubscribe = subscribeToToppersBackend((updatedList) => {
            if (isMounted && updatedList) {
                setToppers(updatedList);
            }
        });

        return () => {
            isMounted = false;
            unsubscribe();
        };
    }, []);

    // Sync non-results local state
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(notices));
        }
        catch { }
    }, [notices]);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
        }
        catch { }
    }, [events]);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEYS.FACULTY, JSON.stringify(faculty));
        }
        catch { }
    }, [faculty]);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
        }
        catch { }
    }, [leads]);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEYS.FACILITIES, JSON.stringify(facilities));
        }
        catch { }
    }, [facilities]);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEYS.HERO_SLIDES, JSON.stringify(heroSlides));
        }
        catch { }
    }, [heroSlides]);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEYS.GALLERY_PHOTOS, JSON.stringify(galleryPhotos));
        }
        catch { }
    }, [galleryPhotos]);

    // Centralized Backend Actions for Toppers/Results
    const addTopper = (topper) => {
        setToppers(prev => [topper, ...prev]);
        addTopperToBackend(topper);
    };

    const updateTopper = (id, updatedFields) => {
        setToppers(prev => prev.map(item => item.id === id ? { ...item, ...updatedFields } : item));
        updateTopperInBackend(id, updatedFields);
    };

    const deleteTopper = (id) => {
        setToppers(prev => prev.filter(item => item.id !== id));
        deleteTopperFromBackend(id);
    };

    // Other actions
    const addNotice = (notice) => setNotices(prev => [notice, ...prev]);
    const deleteNotice = (id) => setNotices(prev => prev.filter(item => item.id !== id));
    const addEvent = (event) => setEvents(prev => [event, ...prev]);
    const deleteEvent = (id) => setEvents(prev => prev.filter(item => item.id !== id));
    const addFaculty = (fac) => setFaculty(prev => [fac, ...prev]);
    const deleteFaculty = (id) => setFaculty(prev => prev.filter(item => item.id !== id));

    const addLead = (lead) => setLeads(prev => [lead, ...prev]);
    const updateLeadStatus = (id, status) => {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    };

    const addFacility = (item) => setFacilities(prev => [item, ...prev]);
    const deleteFacility = (id) => setFacilities(prev => prev.filter(item => item.id !== id));
    const updateFacilityPhoto = (id, photoUrl) => {
        setFacilities(prev => prev.map(item => item.id === id ? { ...item, photoUrl } : item));
    };

    const updateHeroSlidePhoto = (id, photoUrl) => {
        setHeroSlides(prev => prev.map(item => item.id === id ? { ...item, photoUrl } : item));
    };

    const addGalleryPhoto = (photo) => setGalleryPhotos(prev => [photo, ...prev]);
    const deleteGalleryPhoto = (id) => setGalleryPhotos(prev => prev.filter(p => p.id !== id));

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
            updateTopper,
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
