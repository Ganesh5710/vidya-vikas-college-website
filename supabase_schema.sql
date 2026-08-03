-- ============================================================================
-- SRI VIDYA VIKAS JUNIOR COLLEGE - Complete Supabase SQL Schema
-- Location: Prasanth Nagar, Madanapalle (Near Krishna Reddy Junior College)
-- Established: November 2024 | Rating: 5.0 Stars (45 Reviews)
-- ============================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. STREAMS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.streams (
    id TEXT PRIMARY KEY, -- e.g., 'mpc', 'bipc', 'cec', 'mec', 'hec'
    name TEXT NOT NULL, -- e.g., 'MPC'
    full_name TEXT NOT NULL, -- e.g., 'Mathematics, Physics, Chemistry'
    subjects JSONB NOT NULL DEFAULT '[]'::jsonb, -- e.g., ["Mathematics", "Physics", "Chemistry", "English", "Sanskrit/Telugu"]
    eligibility TEXT NOT NULL, -- e.g., 'Minimum 60% aggregate in Class 10 SSC/CBSE'
    career_note TEXT NOT NULL, -- e.g., 'Leads to Engineering (JEE/EAMCET), B.Sc, Architecture, IT'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed Initial Streams Data
INSERT INTO public.streams (id, name, full_name, subjects, eligibility, career_note)
VALUES 
    ('mpc', 'MPC', 'Mathematics, Physics, Chemistry', '["Mathematics I-A & I-B", "Physics", "Chemistry", "English", "Sanskrit/Telugu"]'::jsonb, 'Class 10 Pass (SSC / CBSE / ICSE) with strong Mathematics background', 'Gateway to Engineering (IIT-JEE, AP EAMCET, BITSAT), B.Sc, BCA, Architecture & Data Science'),
    ('bipc', 'BiPC', 'Biology (Botany & Zoology), Physics, Chemistry', '["Botany", "Zoology", "Physics", "Chemistry", "English", "Sanskrit/Telugu"]'::jsonb, 'Class 10 Pass (SSC / CBSE / ICSE) with Science interest', 'Pathway to Medicine (NEET-UG), Agriculture (EAMCET), Pharmacy (B.Pharm), Biotechnology & Nursing'),
    ('cec', 'CEC', 'Civics, Economics, Commerce', '["Commerce & Accountancy", "Economics", "Civics", "English", "Sanskrit/Telugu"]'::jsonb, 'Class 10 Pass (SSC / CBSE / ICSE)', 'Ideal for Chartered Accountancy (CA Foundation), Law (CLAT), Business Administration (BBA) & Finance'),
    ('mec', 'MEC', 'Mathematics, Economics, Commerce', '["Mathematics I-A & I-B", "Commerce & Accountancy", "Economics", "English", "Sanskrit/Telugu"]'::jsonb, 'Class 10 Pass with proficiency in Mathematics', 'Prepares for CA, CS, Actuarial Science, Financial Engineering, B.Com (Hons) & Economics (Hons)'),
    ('hec', 'HEC', 'History, Economics, Civics', '["History", "Economics", "Civics", "English", "Sanskrit/Telugu"]'::jsonb, 'Class 10 Pass (SSC / CBSE / ICSE)', 'Foundation for Civil Services (UPSC), State Services (APPSC), Journalism, Humanities & Law')
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    full_name = EXCLUDED.full_name,
    subjects = EXCLUDED.subjects,
    eligibility = EXCLUDED.eligibility,
    career_note = EXCLUDED.career_note;

-- ----------------------------------------------------------------------------
-- 2. ADMIN ROLES TABLE (Role-Based Access Control)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('super_admin', 'office_admin', 'exam_cell', 'stream_coordinator')),
    stream_id TEXT REFERENCES public.streams(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id)
);

-- ----------------------------------------------------------------------------
-- 3. MULTILINGUAL PAGE CONTENT TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.page_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_key TEXT NOT NULL, -- e.g., 'home', 'about', 'admissions', 'principal_message'
    lang TEXT NOT NULL DEFAULT 'en' CHECK (lang IN ('en', 'te')),
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(page_key, lang)
);

-- ----------------------------------------------------------------------------
-- 4. CIRCULARS & NOTICES TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Academic', 'Administrative', 'Exam', 'Holiday')),
    pdf_url TEXT,
    is_ticker BOOLEAN NOT NULL DEFAULT FALSE,
    is_archived BOOLEAN NOT NULL DEFAULT FALSE,
    published_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 5. COLLEGE EVENTS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    event_date DATE NOT NULL,
    event_time TEXT,
    venue TEXT NOT NULL DEFAULT 'College Campus, Prasanth Nagar',
    guest_details TEXT,
    description TEXT,
    poster_url TEXT,
    is_upcoming BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 6. PHOTO & VIDEO GALLERY TABLES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gallery_albums (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    event_year INTEGER NOT NULL DEFAULT 2025,
    cover_image_url TEXT,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.gallery_photos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    album_id UUID NOT NULL REFERENCES public.gallery_albums(id) ON DELETE CASCADE,
    image_url TEXT,
    youtube_url TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 7. FACULTY DIRECTORY TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.faculty (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    designation TEXT NOT NULL, -- e.g., 'Senior Lecturer in Physics'
    subject TEXT NOT NULL, -- e.g., 'Physics'
    stream_id TEXT REFERENCES public.streams(id) ON DELETE SET NULL,
    qualification TEXT NOT NULL, -- e.g., 'M.Sc (Physics), B.Ed'
    experience_years INTEGER NOT NULL DEFAULT 5,
    email TEXT,
    photo_url TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 8. RESULTS & TOPPERS TABLES
-- ----------------------------------------------------------------------------
-- 8a. Stream-wise & Overall Pass Percentage Statistics
CREATE TABLE IF NOT EXISTS public.stream_results_summary (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    academic_year TEXT NOT NULL, -- e.g., '2024-2025'
    stream_id TEXT REFERENCES public.streams(id) ON DELETE CASCADE, -- NULL represents overall college summary
    total_appeared INTEGER,
    total_passed INTEGER,
    pass_percentage NUMERIC(5, 2) NOT NULL, -- e.g., 98.50
    distinctions_count INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(academic_year, stream_id)
);

-- 8b. Individual Student Toppers & Competitive Qualifiers
CREATE TABLE IF NOT EXISTS public.results_toppers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    academic_year TEXT NOT NULL, -- e.g., '2024-2025'
    student_name TEXT NOT NULL,
    marks_percentage NUMERIC(5, 2) NOT NULL, -- e.g., 98.60 or 986/1000
    rank TEXT, -- e.g., 'College 1st Rank' or 'District 2nd Rank'
    stream_id TEXT NOT NULL REFERENCES public.streams(id) ON DELETE CASCADE,
    photo_url TEXT,
    is_competitive_qualifier BOOLEAN NOT NULL DEFAULT FALSE,
    exam_name TEXT NOT NULL DEFAULT 'Board Exam', -- e.g., 'IPE Board', 'AP EAMCET', 'NEET', 'JEE Main'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 9. ENQUIRIES & APPLICATIONS TABLES
-- ----------------------------------------------------------------------------
-- 9a. General Contact Enquiries
CREATE TABLE IF NOT EXISTS public.contact_enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'resolved')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9b. Student Admission Inquiries
CREATE TABLE IF NOT EXISTS public.admission_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_name TEXT NOT NULL,
    parent_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    class_10_marks TEXT NOT NULL,
    stream_id TEXT NOT NULL REFERENCES public.streams(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'under_review', 'contacted', 'enrolled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.streams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stream_results_summary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results_toppers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admission_inquiries ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- PUBLIC READ POLICIES (Allow public visitors to view published site content)
-- ----------------------------------------------------------------------------
CREATE POLICY "Public streams read" ON public.streams FOR SELECT USING (true);
CREATE POLICY "Public page_content read" ON public.page_content FOR SELECT USING (true);
CREATE POLICY "Public notices read" ON public.notices FOR SELECT USING (is_archived = false);
CREATE POLICY "Public events read" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public gallery_albums read" ON public.gallery_albums FOR SELECT USING (true);
CREATE POLICY "Public gallery_photos read" ON public.gallery_photos FOR SELECT USING (true);
CREATE POLICY "Public faculty read" ON public.faculty FOR SELECT USING (true);
CREATE POLICY "Public stream_results_summary read" ON public.stream_results_summary FOR SELECT USING (true);
CREATE POLICY "Public results_toppers read" ON public.results_toppers FOR SELECT USING (true);

-- ----------------------------------------------------------------------------
-- PUBLIC INSERT POLICIES (Allow public visitors to submit forms)
-- ----------------------------------------------------------------------------
CREATE POLICY "Public submit contact_enquiries" ON public.contact_enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public submit admission_inquiries" ON public.admission_inquiries FOR INSERT WITH CHECK (true);

-- ----------------------------------------------------------------------------
-- AUTHENTICATED STAFF WRITE POLICIES (Allow logged in admin staff full CRUD)
-- ----------------------------------------------------------------------------
CREATE POLICY "Staff all admin_roles" ON public.admin_roles FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff all streams" ON public.streams FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff all page_content" ON public.page_content FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff all notices" ON public.notices FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff all events" ON public.events FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff all gallery_albums" ON public.gallery_albums FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff all gallery_photos" ON public.gallery_photos FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff all faculty" ON public.faculty FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff all stream_results_summary" ON public.stream_results_summary FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff all results_toppers" ON public.results_toppers FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff view & manage contact_enquiries" ON public.contact_enquiries FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff view & manage admission_inquiries" ON public.admission_inquiries FOR ALL TO authenticated USING (true);

-- ============================================================================
-- STORAGE BUCKETS SETUP & POLICIES
-- ============================================================================

-- Create Public Storage Buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('gallery', 'gallery', true),
    ('faculty-photos', 'faculty-photos', true),
    ('topper-photos', 'topper-photos', true),
    ('documents', 'documents', true),
    ('posters', 'posters', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Objects Policies (Public Read, Authenticated Write)
CREATE POLICY "Public Storage Objects Read" ON storage.objects 
    FOR SELECT USING (bucket_id IN ('gallery', 'faculty-photos', 'topper-photos', 'documents', 'posters'));

CREATE POLICY "Authenticated Staff Storage Objects Insert" ON storage.objects 
    FOR INSERT TO authenticated WITH CHECK (bucket_id IN ('gallery', 'faculty-photos', 'topper-photos', 'documents', 'posters'));

CREATE POLICY "Authenticated Staff Storage Objects Update" ON storage.objects 
    FOR UPDATE TO authenticated USING (bucket_id IN ('gallery', 'faculty-photos', 'topper-photos', 'documents', 'posters'));

CREATE POLICY "Authenticated Staff Storage Objects Delete" ON storage.objects 
    FOR DELETE TO authenticated USING (bucket_id IN ('gallery', 'faculty-photos', 'topper-photos', 'documents', 'posters'));
