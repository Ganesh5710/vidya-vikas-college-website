-- ====================================================================
-- SRI VIDYA VIKAS JUNIOR COLLEGE - CENTRALIZED DATABASE SCHEMA
-- Table: toppers (Student Board Exam Results & Rankers)
-- ====================================================================

-- 1. Create toppers table
CREATE TABLE IF NOT EXISTS toppers (
    id TEXT PRIMARY KEY,
    student_name TEXT NOT NULL,
    roll_number TEXT,
    academic_year TEXT DEFAULT '1st Year',
    year_session TEXT DEFAULT '2024-2025 BIEAP',
    stream_id TEXT DEFAULT 'mpc',
    marks_obtained TEXT,
    max_marks TEXT DEFAULT '500',
    marks_percentage TEXT,
    grade TEXT,
    rank TEXT,
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE toppers ENABLE ROW LEVEL SECURITY;

-- 3. Create Public Read & Full Write Access Policies
CREATE POLICY "Public Read Access for Toppers" ON toppers FOR SELECT USING (true);
CREATE POLICY "Public Insert Access for Toppers" ON toppers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Access for Toppers" ON toppers FOR UPDATE USING (true);
CREATE POLICY "Public Delete Access for Toppers" ON toppers FOR DELETE USING (true);

-- 4. Enable Realtime Replication for instant multi-device synchronization
ALTER PUBLICATION supabase_realtime ADD TABLE toppers;

-- 5. Seed Initial Real Student Results
INSERT INTO toppers (id, student_name, roll_number, academic_year, year_session, stream_id, marks_obtained, max_marks, marks_percentage, grade, rank, photo_url)
VALUES 
    ('res-1st-srivalli', 'A. SRIVALLI', '2623112099', '1st Year', '2024-2025 BIEAP Junior Inter', 'mpc', '466', '470', '466 / 470', 'Grade A1', '#1 College Topper', '/posters/a_srivalli.png'),
    ('res-1st-trivikram', 'K. TRIVIKRAM', '2623110362', '1st Year', '2024-2025 BIEAP Junior Inter', 'mpc', '464', '470', '464 / 470', 'Grade A1', '#2 College Topper', '/posters/k_trivikram.png')
ON CONFLICT (id) DO NOTHING;
