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

interface DataContextType {
  notices: NoticeItem[];
  events: EventItem[];
  faculty: FacultyItem[];
  toppers: TopperItem[];
  leads: LeadItem[];
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
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  NOTICES: 'svvjc_notices_data_v1',
  EVENTS: 'svvjc_events_data_v1',
  FACULTY: 'svvjc_faculty_data_v1',
  TOPPERS: 'svvjc_toppers_data_v1',
  LEADS: 'svvjc_leads_data_v1',
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from LocalStorage if available, fallback to constants
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

  // Sync to LocalStorage whenever state updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(notices));
    } catch (e) { console.error('LocalStorage sync error', e); }
  }, [notices]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    } catch (e) { console.error('LocalStorage sync error', e); }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FACULTY, JSON.stringify(faculty));
    } catch (e) { console.error('LocalStorage sync error', e); }
  }, [faculty]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TOPPERS, JSON.stringify(toppers));
    } catch (e) { console.error('LocalStorage sync error', e); }
  }, [toppers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
    } catch (e) { console.error('LocalStorage sync error', e); }
  }, [leads]);

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

  return (
    <DataContext.Provider value={{
      notices,
      events,
      faculty,
      toppers,
      leads,
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
