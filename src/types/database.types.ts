export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Stream {
  id: string;
  name: string;
  full_name: string;
  subjects: string[];
  eligibility: string;
  career_note: string;
  created_at?: string;
}

export interface AdminRole {
  id: string;
  user_id: string;
  role: 'super_admin' | 'office_admin' | 'exam_cell' | 'stream_coordinator';
  stream_id?: string | null;
  created_at?: string;
}

export interface PageContent {
  id: string;
  page_key: string;
  lang: 'en' | 'te';
  content: Record<string, any>;
  updated_at?: string;
}

export interface Notice {
  id: string;
  title: string;
  category: 'Academic' | 'Administrative' | 'Exam' | 'Holiday';
  pdf_url?: string | null;
  is_ticker: boolean;
  is_archived: boolean;
  published_date: string;
  created_at?: string;
}

export interface CollegeEvent {
  id: string;
  title: string;
  event_date: string;
  event_time?: string | null;
  venue: string;
  guest_details?: string | null;
  description?: string | null;
  poster_url?: string | null;
  is_upcoming: boolean;
  created_at?: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  event_year: number;
  cover_image_url?: string | null;
  description?: string | null;
  created_at?: string;
}

export interface GalleryPhoto {
  id: string;
  album_id: string;
  image_url?: string | null;
  youtube_url?: string | null;
  display_order: number;
  created_at?: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  subject: string;
  stream_id?: string | null;
  qualification: string;
  experience_years: number;
  email?: string | null;
  photo_url?: string | null;
  display_order: number;
  created_at?: string;
}

export interface StreamResultsSummary {
  id: string;
  academic_year: string;
  stream_id?: string | null;
  total_appeared?: number | null;
  total_passed?: number | null;
  pass_percentage: number;
  distinctions_count?: number | null;
  created_at?: string;
}

export interface ResultTopper {
  id: string;
  academic_year: string;
  student_name: string;
  marks_percentage: number;
  rank?: string | null;
  stream_id: string;
  photo_url?: string | null;
  is_competitive_qualifier: boolean;
  exam_name: string;
  created_at?: string;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  message: string;
  status: 'pending' | 'contacted' | 'resolved';
  created_at?: string;
}

export interface AdmissionInquiry {
  id: string;
  student_name: string;
  parent_name: string;
  phone: string;
  email?: string | null;
  class_10_marks: string;
  stream_id: string;
  status: 'new' | 'under_review' | 'contacted' | 'enrolled';
  created_at?: string;
}
