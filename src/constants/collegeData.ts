// Real & Verified College Details (Do NOT edit unless official details change)
export const COLLEGE_DETAILS = {
  name: "SRI VIDYA VIKAS JUNIOR COLLEGE",
  shortName: "SVVJC",
  address: "Prasanth Nagar, Madanapalle (Near Krishna Reddy Junior College)",
  landmark: "Near Krishna Reddy Junior College",
  city: "Madanapalle",
  district: "Annamayya District / Chittoor Region",
  state: "Andhra Pradesh",
  pincode: "517325",
  established: "November 2024",
  rating: 5.0,
  reviewCount: 45,
  googleMapsUrl: "https://maps.google.com/?q=Prasanth+Nagar+Madanapalle",
  boardAffiliation: "Board of Intermediate Education, Andhra Pradesh (BIEAP)",
};

// Interface for tagged placeholders
export interface PlaceholderItem {
  isPlaceholder: boolean;
  checklistRef: string;
  note: string;
}

// 1. STREAMS DATA
export const INITIAL_STREAMS = [
  {
    id: "mpc",
    name: "MPC",
    fullName: "Mathematics, Physics, Chemistry",
    subjects: ["Mathematics I-A & I-B", "Physics", "Chemistry", "English", "Telugu / Sanskrit"],
    eligibility: "Class 10 SSC / CBSE / ICSE Pass with Mathematics background",
    careerPaths: "Engineering (IIT-JEE, AP EAMCET, BITSAT), B.Sc, Architecture, IT & Data Science",
    timetable: "Mon-Sat: 8:30 AM - 4:30 PM | Special EAMCET/JEE coaching 4:30 PM - 5:30 PM",
    isPlaceholder: true,
    checklistRef: "Section 4 - Stream List & Eligibility",
    note: "[EDITABLE PLACEHOLDER: Confirm cut-off marks and exact intake]"
  },
  {
    id: "bipc",
    name: "BiPC",
    fullName: "Biology (Botany & Zoology), Physics, Chemistry",
    subjects: ["Botany", "Zoology", "Physics", "Chemistry", "English", "Telugu / Sanskrit"],
    eligibility: "Class 10 SSC / CBSE / ICSE Pass with Science focus",
    careerPaths: "Medicine (NEET-UG), Agriculture (EAMCET), Pharmacy (B.Pharm), Biotechnology & Nursing",
    timetable: "Mon-Sat: 8:30 AM - 4:30 PM | NEET Orientation lab practice 4:30 PM - 5:30 PM",
    isPlaceholder: true,
    checklistRef: "Section 4 - Stream List & Eligibility",
    note: "[EDITABLE PLACEHOLDER: Confirm NEET batch size & intake]"
  },
  {
    id: "cec",
    name: "CEC",
    fullName: "Civics, Economics, Commerce",
    subjects: ["Commerce & Accountancy", "Economics", "Civics", "English", "Telugu / Sanskrit"],
    eligibility: "Class 10 SSC / CBSE / ICSE Pass",
    careerPaths: "Chartered Accountancy (CA Foundation), Law (CLAT), BBA, Banking & Finance",
    timetable: "Mon-Sat: 8:30 AM - 3:30 PM | CA Foundation basics workshop",
    isPlaceholder: true,
    checklistRef: "Section 4 - Stream List & Eligibility",
    note: "[EDITABLE PLACEHOLDER: Confirm CEC stream offering]"
  },
  {
    id: "mec",
    name: "MEC",
    fullName: "Mathematics, Economics, Commerce",
    subjects: ["Mathematics I-A & I-B", "Commerce & Accountancy", "Economics", "English", "Telugu / Sanskrit"],
    eligibility: "Class 10 SSC / CBSE / ICSE Pass with Math Aptitude",
    careerPaths: "CA, CS, Actuarial Science, Financial Analytics & B.Com (Hons)",
    timetable: "Mon-Sat: 8:30 AM - 4:00 PM | Special Accounting & Quantitative Aptitude",
    isPlaceholder: true,
    checklistRef: "Section 4 - Stream List & Eligibility",
    note: "[EDITABLE PLACEHOLDER: Confirm MEC intake capacity]"
  },
  {
    id: "hec",
    name: "HEC",
    fullName: "History, Economics, Civics",
    subjects: ["History", "Economics", "Civics", "English", "Telugu / Sanskrit"],
    eligibility: "Class 10 SSC / CBSE / ICSE Pass",
    careerPaths: "Civil Services (UPSC / APPSC), Law, Journalism, Humanities & Social Sciences",
    timetable: "Mon-Sat: 8:30 AM - 3:30 PM | General Studies orientation",
    isPlaceholder: true,
    checklistRef: "Section 4 - Stream List & Eligibility",
    note: "[EDITABLE PLACEHOLDER: Confirm HEC availability]"
  }
];

// 2. FACULTY DIRECTORY
export const INITIAL_FACULTY = [
  {
    id: "fac-1",
    name: "Faculty Member (Physics Specialist)",
    designation: "Senior Faculty & Subject Coordinator",
    subject: "Physics",
    streamId: "mpc",
    qualification: "M.Sc (Physics), B.Ed",
    experienceYears: 12,
    email: "physics@svvjc.edu.in",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    isPlaceholder: true,
    checklistRef: "Section 4 - Faculty Details Spreadsheet",
    note: "[EDITABLE PLACEHOLDER: Replace with official photo & name from Subject Coordinator]"
  },
  {
    id: "fac-2",
    name: "Faculty Member (Mathematics Specialist)",
    designation: "Senior Lecturer in Mathematics",
    subject: "Mathematics",
    streamId: "mpc",
    qualification: "M.Sc (Mathematics), M.Phil",
    experienceYears: 10,
    email: "maths@svvjc.edu.in",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    isPlaceholder: true,
    checklistRef: "Section 4 - Faculty Details Spreadsheet",
    note: "[EDITABLE PLACEHOLDER: Replace with official faculty photo & details]"
  },
  {
    id: "fac-3",
    name: "Faculty Member (Botany & Zoology)",
    designation: "Senior Lecturer in Biology",
    subject: "Biology / Botany",
    streamId: "bipc",
    qualification: "M.Sc (Botany), Ph.D",
    experienceYears: 14,
    email: "biology@svvjc.edu.in",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    isPlaceholder: true,
    checklistRef: "Section 4 - Faculty Details Spreadsheet",
    note: "[EDITABLE PLACEHOLDER: Replace with official faculty photo & details]"
  },
  {
    id: "fac-4",
    name: "Faculty Member (Chemistry Specialist)",
    designation: "Senior Faculty - Organic Chemistry",
    subject: "Chemistry",
    streamId: "bipc",
    qualification: "M.Sc (Organic Chemistry)",
    experienceYears: 9,
    email: "chemistry@svvjc.edu.in",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    isPlaceholder: true,
    checklistRef: "Section 4 - Faculty Details Spreadsheet",
    note: "[EDITABLE PLACEHOLDER: Replace with official faculty photo & details]"
  },
  {
    id: "fac-5",
    name: "Faculty Member (Commerce & Accounts)",
    designation: "Head of Commerce Department",
    subject: "Commerce",
    streamId: "cec",
    qualification: "M.Com, FCA (Chartered Accountant)",
    experienceYears: 11,
    email: "commerce@svvjc.edu.in",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
    isPlaceholder: true,
    checklistRef: "Section 4 - Faculty Details Spreadsheet",
    note: "[EDITABLE PLACEHOLDER: Replace with official faculty photo & details]"
  }
];

// 3. NOTICES & CIRCULARS
export const INITIAL_NOTICES = [
  {
    id: "not-1",
    title: "Admissions Open for Academic Year 2025-2026 (MPC, BiPC, CEC, MEC, HEC)",
    category: "Administrative",
    publishedDate: "2025-06-01",
    pdfUrl: "#",
    isTicker: true,
    isArchived: false,
  },
  {
    id: "not-2",
    title: "BIEAP Intermediate Board Exam Preparation & Model Test Schedule Announced",
    category: "Exam",
    publishedDate: "2025-06-10",
    pdfUrl: "#",
    isTicker: true,
    isArchived: false,
  },
  {
    id: "not-3",
    title: "Special EAMCET & NEET Intensive Coaching Orientation for 2nd Year Students",
    category: "Academic",
    publishedDate: "2025-06-15",
    pdfUrl: "#",
    isTicker: true,
    isArchived: false,
  },
  {
    id: "not-4",
    title: "Parents-Teachers Meeting (PTM) for First Year Intermediate Students",
    category: "Administrative",
    publishedDate: "2025-06-20",
    pdfUrl: "#",
    isTicker: false,
    isArchived: false,
  }
];

// 4. EVENTS
export const INITIAL_EVENTS = [
  {
    id: "evt-1",
    title: "College Inauguration & Academic Excellence Orientation 2024",
    eventDate: "2024-11-15",
    eventTime: "10:00 AM",
    venue: "Main Campus Auditorium, Prasanth Nagar",
    guestDetails: "Eminent Academician & BIEAP Regional Officers",
    description: "Celebrating the establishment of SRI VIDYA VIKAS JUNIOR COLLEGE with parents, staff, and founding students.",
    posterUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800",
    isUpcoming: false
  },
  {
    id: "evt-2",
    title: "Annual Science & Innovation Expo 2025",
    eventDate: "2025-07-15",
    eventTime: "09:30 AM",
    venue: "Science Block Laboratories, SVVJC Campus",
    guestDetails: "District Educational Officers & Engineering College Deans",
    description: "Hands-on Physics, Chemistry, and Botany model demonstrations by MPC & BiPC students.",
    posterUrl: "https://images.unsplash.com/photo-1564069114553-74154c0e58f6?auto=format&fit=crop&q=80&w=800",
    isUpcoming: true
  },
  {
    id: "evt-3",
    title: "NEET & AP EAMCET Grand Mock Test Series",
    eventDate: "2025-08-01",
    eventTime: "09:00 AM",
    venue: "Central Examination Hall",
    guestDetails: "Expert Competitive Test Mentors",
    description: "Comprehensive 3-hour state-level simulated test for BiPC and MPC students.",
    posterUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
    isUpcoming: true
  }
];

// 5. GALLERY ALBUMS & PHOTOS
export const INITIAL_GALLERY_ALBUMS = [
  {
    id: "alb-1",
    title: "Campus Infrastructure & Modern Science Labs",
    eventYear: 2025,
    coverImageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800",
    description: "State-of-the-art Physics, Chemistry, and Biology laboratories in Prasanth Nagar campus."
  },
  {
    id: "alb-2",
    title: "Inaugural Ceremony & Cultural Meet 2024",
    eventYear: 2024,
    coverImageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800",
    description: "Highlights from our college launch in November 2024."
  }
];

export const INITIAL_GALLERY_PHOTOS = [
  {
    id: "pho-1",
    albumId: "alb-1",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800",
    displayOrder: 1
  },
  {
    id: "pho-2",
    albumId: "alb-1",
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
    displayOrder: 2
  },
  {
    id: "pho-3",
    albumId: "alb-2",
    imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800",
    displayOrder: 1
  }
];

// 6. RESULTS & TOPPERS
export const INITIAL_STREAM_SUMMARY = [
  {
    id: "sum-1",
    academicYear: "2024-2025",
    streamId: null, // Overall College
    passPercentage: 98.4,
    totalAppeared: 180,
    totalPassed: 177,
    distinctionsCount: 124
  },
  {
    id: "sum-2",
    academicYear: "2024-2025",
    streamId: "mpc",
    passPercentage: 99.1,
    totalAppeared: 75,
    totalPassed: 74,
    distinctionsCount: 58
  },
  {
    id: "sum-3",
    academicYear: "2024-2025",
    streamId: "bipc",
    passPercentage: 97.8,
    totalAppeared: 65,
    totalPassed: 63,
    distinctionsCount: 42
  }
];

export const INITIAL_TOPPERS = [
  {
    id: "top-1",
    academicYear: "2024-2025",
    studentName: "Student Topper (Name Pending)",
    marksPercentage: 98.6,
    rank: "College 1st Rank (MPC)",
    streamId: "mpc",
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400",
    isCompetitiveQualifier: true,
    examName: "BIEAP Board Exam & AP EAMCET Top Ranker",
    isPlaceholder: true,
    checklistRef: "Section 4 - Pass Percentage & Topper List",
    note: "[EDITABLE PLACEHOLDER: Replace with official topper photo & marks from Principal's Office]"
  },
  {
    id: "top-2",
    academicYear: "2024-2025",
    studentName: "Student Topper (Name Pending)",
    marksPercentage: 97.8,
    rank: "College 1st Rank (BiPC)",
    streamId: "bipc",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400",
    isCompetitiveQualifier: true,
    examName: "NEET-UG Qualifier & Board Distinction",
    isPlaceholder: true,
    checklistRef: "Section 4 - Pass Percentage & Topper List",
    note: "[EDITABLE PLACEHOLDER: Replace with official topper photo & marks]"
  },
  {
    id: "top-3",
    academicYear: "2024-2025",
    studentName: "Student Topper (Name Pending)",
    marksPercentage: 96.5,
    rank: "College 1st Rank (CEC)",
    streamId: "cec",
    photoUrl: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=400",
    isCompetitiveQualifier: false,
    examName: "BIEAP Board Exam Distinction",
    isPlaceholder: true,
    checklistRef: "Section 4 - Pass Percentage & Topper List",
    note: "[EDITABLE PLACEHOLDER: Replace with official topper photo & marks]"
  }
];

// 7. FEE STRUCTURE
export const INITIAL_FEE_STRUCTURE = [
  {
    stream: "MPC (Maths, Physics, Chemistry)",
    tuitionFee: "₹ [PLACEHOLDER]",
    labFee: "₹ [PLACEHOLDER]",
    totalFee: "₹ [PLACEHOLDER] / annum",
    isPlaceholder: true,
    checklistRef: "Section 4 - Fee Structure per Stream",
    note: "[EDITABLE PLACEHOLDER: Provide official fee breakdown from Accounts Office]"
  },
  {
    stream: "BiPC (Biology, Physics, Chemistry)",
    tuitionFee: "₹ [PLACEHOLDER]",
    labFee: "₹ [PLACEHOLDER]",
    totalFee: "₹ [PLACEHOLDER] / annum",
    isPlaceholder: true,
    checklistRef: "Section 4 - Fee Structure per Stream",
    note: "[EDITABLE PLACEHOLDER: Provide official fee breakdown from Accounts Office]"
  },
  {
    stream: "CEC / MEC / HEC",
    tuitionFee: "₹ [PLACEHOLDER]",
    labFee: "N/A",
    totalFee: "₹ [PLACEHOLDER] / annum",
    isPlaceholder: true,
    checklistRef: "Section 4 - Fee Structure per Stream",
    note: "[EDITABLE PLACEHOLDER: Provide official fee breakdown from Accounts Office]"
  }
];

// 8. STUDY MATERIALS & QUESTION PAPERS
export const INITIAL_STUDY_MATERIALS = [
  {
    id: "mat-1",
    title: "Class 12 Physics Model Question Paper 2025",
    subject: "Physics",
    year: "2025",
    fileSize: "1.8 MB",
    pdfUrl: "#"
  },
  {
    id: "mat-2",
    title: "Class 12 Chemistry Important Reactions & Formula Sheet",
    subject: "Chemistry",
    year: "2025",
    fileSize: "2.4 MB",
    pdfUrl: "#"
  },
  {
    id: "mat-3",
    title: "Class 12 Mathematics I-A Previous 5 Years Solved Papers",
    subject: "Mathematics",
    year: "2024",
    fileSize: "4.1 MB",
    pdfUrl: "#"
  },
  {
    id: "mat-4",
    title: "Class 12 Botany & Zoology Diagram Guide",
    subject: "Biology",
    year: "2025",
    fileSize: "3.2 MB",
    pdfUrl: "#"
  }
];

// 9. OFFICIAL CONTACT INFO
export const INITIAL_CONTACT_INFO = {
  phoneReception: "+91 [PLACEHOLDER - Reception Desk]",
  phoneAdmissions: "+91 [PLACEHOLDER - Admissions Hotline]",
  phoneExamCell: "+91 [PLACEHOLDER - Exam Cell Coordinator]",
  emailOfficial: "admissions@svvjc.edu.in",
  principalName: "Principal / Academic Director",
  principalMessageText: "Welcome to SRI VIDYA VIKAS JUNIOR COLLEGE. Established in November 2024, our college stands as a beacon of academic discipline and personal growth in Prasanth Nagar, Madanapalle. We are committed to providing top-tier Intermediate education (BIEAP) along with focused competitive coaching for EAMCET, NEET, and JEE Main. Our dedicated faculty, well-equipped science laboratories, and student-centered environment ensure that every learner receives the personal guidance needed to succeed in board exams and future professional careers.",
  isPlaceholder: true,
  checklistRef: "Section 4 - Official Contact Numbers & Principal Message",
  note: "[EDITABLE PLACEHOLDER: Update official phone numbers & Principal's letter]"
};
