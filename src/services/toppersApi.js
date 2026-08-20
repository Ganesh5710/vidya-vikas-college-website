import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { INITIAL_TOPPERS } from '../constants/collegeData';

/**
 * Centralized Backend Service for Student Results & Toppers Data.
 * Manages database API calls (Supabase DB + Realtime Sync) replacing localStorage.
 */

// Helper to normalize database snake_case columns to camelCase object format
const mapDbToTopper = (dbItem) => ({
    id: dbItem.id,
    studentName: dbItem.student_name || dbItem.studentName,
    rollNumber: dbItem.roll_number || dbItem.rollNumber,
    academicYear: dbItem.academic_year || dbItem.academicYear || '1st Year',
    yearSession: dbItem.year_session || dbItem.yearSession || '2024-2025 BIEAP',
    streamId: dbItem.stream_id || dbItem.streamId || 'mpc',
    marksObtained: dbItem.marks_obtained || dbItem.marksObtained,
    maxMarks: dbItem.max_marks || dbItem.maxMarks || '500',
    marksPercentage: dbItem.marks_percentage || dbItem.marksPercentage,
    grade: dbItem.grade,
    rank: dbItem.rank,
    photoUrl: dbItem.photo_url || dbItem.photoUrl || ''
});

// Helper to convert camelCase object to database snake_case columns
const mapTopperToDb = (topper) => ({
    id: topper.id,
    student_name: topper.studentName,
    roll_number: topper.rollNumber || null,
    academic_year: topper.academicYear || '1st Year',
    year_session: topper.yearSession || '2024-2025 BIEAP',
    stream_id: topper.streamId || 'mpc',
    marks_obtained: topper.marksObtained || null,
    max_marks: topper.maxMarks || '500',
    marks_percentage: topper.marksPercentage || null,
    grade: topper.grade || null,
    rank: topper.rank || null,
    photo_url: topper.photoUrl || ''
});

/**
 * Fetch all topper results from Centralized Backend DB.
 * Falls back gracefully to master initial dataset if database table is initializing.
 */
export const fetchToppersFromBackend = async () => {
    if (!isSupabaseConfigured()) {
        console.info('[ToppersAPI] Supabase credentials not set in env. Using master dataset.');
        return INITIAL_TOPPERS;
    }

    try {
        const { data, error } = await supabase
            .from('toppers')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.warn('[ToppersAPI] Database query note:', error.message);
            return INITIAL_TOPPERS;
        }

        if (data && data.length > 0) {
            return data.map(mapDbToTopper);
        }

        return INITIAL_TOPPERS;
    } catch (err) {
        console.error('[ToppersAPI] Fetch error:', err);
        return INITIAL_TOPPERS;
    }
};

/**
 * Add a new result record to Centralized Backend DB.
 */
export const addTopperToBackend = async (topper) => {
    if (!isSupabaseConfigured()) {
        return topper;
    }

    try {
        const dbPayload = mapTopperToDb(topper);
        const { data, error } = await supabase
            .from('toppers')
            .insert([dbPayload])
            .select();

        if (error) {
            console.error('[ToppersAPI] Add record error:', error.message);
        } else if (data && data.length > 0) {
            return mapDbToTopper(data[0]);
        }
    } catch (err) {
        console.error('[ToppersAPI] Network add error:', err);
    }
    return topper;
};

/**
 * Update an existing result record in Centralized Backend DB.
 */
export const updateTopperInBackend = async (id, updatedFields) => {
    if (!isSupabaseConfigured()) {
        return;
    }

    try {
        const dbPayload = {};
        if (updatedFields.studentName !== undefined) dbPayload.student_name = updatedFields.studentName;
        if (updatedFields.rollNumber !== undefined) dbPayload.roll_number = updatedFields.rollNumber;
        if (updatedFields.academicYear !== undefined) dbPayload.academic_year = updatedFields.academicYear;
        if (updatedFields.yearSession !== undefined) dbPayload.year_session = updatedFields.yearSession;
        if (updatedFields.streamId !== undefined) dbPayload.stream_id = updatedFields.streamId;
        if (updatedFields.marksObtained !== undefined) dbPayload.marks_obtained = updatedFields.marksObtained;
        if (updatedFields.maxMarks !== undefined) dbPayload.max_marks = updatedFields.maxMarks;
        if (updatedFields.marksPercentage !== undefined) dbPayload.marks_percentage = updatedFields.marksPercentage;
        if (updatedFields.grade !== undefined) dbPayload.grade = updatedFields.grade;
        if (updatedFields.rank !== undefined) dbPayload.rank = updatedFields.rank;
        if (updatedFields.photoUrl !== undefined) dbPayload.photo_url = updatedFields.photoUrl;

        const { error } = await supabase
            .from('toppers')
            .update(dbPayload)
            .eq('id', id);

        if (error) {
            console.error('[ToppersAPI] Update error:', error.message);
        }
    } catch (err) {
        console.error('[ToppersAPI] Network update error:', err);
    }
};

/**
 * Delete a result record from Centralized Backend DB.
 */
export const deleteTopperFromBackend = async (id) => {
    if (!isSupabaseConfigured()) {
        return;
    }

    try {
        const { error } = await supabase
            .from('toppers')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('[ToppersAPI] Delete error:', error.message);
        }
    } catch (err) {
        console.error('[ToppersAPI] Network delete error:', err);
    }
};

/**
 * Subscribe to Real-Time Backend DB Changes on `toppers` table.
 * Ensures every connected mobile phone/laptop instantly receives live updates!
 */
export const subscribeToToppersBackend = (onDataChanged) => {
    if (!isSupabaseConfigured()) {
        return () => {};
    }

    try {
        const subscription = supabase
            .channel('public:toppers')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'toppers' }, () => {
                // Re-fetch clean list from DB
                fetchToppersFromBackend().then(latestData => {
                    onDataChanged(latestData);
                });
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    } catch (err) {
        console.error('[ToppersAPI] Realtime subscription error:', err);
        return () => {};
    }
};
