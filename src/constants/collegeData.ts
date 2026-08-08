// Real & Verified College Details (Do NOT edit unless official details change)
export const COLLEGE_DETAILS = {
  name: "SRI VIDYA VIKAS JUNIOR COLLEGE",
  shortName: "SVVJC",
  tagline: "A Place to build a career ...",
  logoUrl: "/logo.jpg",
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
    eligibility: "Class 10 SSC / CBSE / ICSE Pass with Science background",
    careerPaths: "Medicine (NEET-UG, MBBS, BDS), Pharmacy (B.Pharm), Agriculture (B.Sc Ag), Biotechnology",
    timetable: "Mon-Sat: 8:30 AM - 4:30 PM | Special NEET coaching 4:30 PM - 5:30 PM",
    isPlaceholder: true,
    checklistRef: "Section 4 - Stream List & Eligibility",
    note: "[EDITABLE PLACEHOLDER: Confirm cut-off marks and exact intake]"
  },
  {
    id: "cec",
    name: "CEC",
    fullName: "Civics, Economics, Commerce",
    subjects: ["Civics", "Economics", "Commerce & Accountancy", "English", "Telugu / Sanskrit"],
    eligibility: "Class 10 SSC / CBSE / ICSE Pass",
    careerPaths: "Chartered Accountancy (CA Foundation), Business Administration (BBA), Law (CLAT), Civil Services (UPSC)",
    timetable: "Mon-Sat: 8:30 AM - 4:00 PM | Special CA Foundation Orientation",
    isPlaceholder: true,
    checklistRef: "Section 4 - Stream List & Eligibility",
    note: "[EDITABLE PLACEHOLDER: Confirm cut-off marks and exact intake]"
  },
  {
    id: "mec",
    name: "MEC",
    fullName: "Mathematics, Economics, Commerce",
    subjects: ["Mathematics", "Economics", "Commerce & Accountancy", "English", "Telugu / Sanskrit"],
    eligibility: "Class 10 SSC / CBSE / ICSE Pass with Mathematics background",
    careerPaths: "Data Analytics, Actuarial Science, CA, B.Com (Hons), Corporate Finance",
    timetable: "Mon-Sat: 8:30 AM - 4:00 PM",
    isPlaceholder: true,
    checklistRef: "Section 4 - Stream List & Eligibility",
    note: "[EDITABLE PLACEHOLDER: Confirm cut-off marks and exact intake]"
  },
  {
    id: "hec",
    name: "HEC",
    fullName: "History, Economics, Civics",
    subjects: ["History", "Economics", "Civics", "English", "Telugu / Sanskrit"],
    eligibility: "Class 10 SSC / CBSE / ICSE Pass",
    careerPaths: "Civil Services (IAS / IPS / APPSC Group 1), Journalism, Law, Public Administration, B.A",
    timetable: "Mon-Sat: 8:30 AM - 4:00 PM | Special Civil Services Orientation",
    isPlaceholder: true,
    checklistRef: "Section 4 - Stream List & Eligibility",
    note: "[EDITABLE PLACEHOLDER: Confirm cut-off marks and exact intake]"
  }
];

// 2. NOTICES DATA
export const INITIAL_NOTICES = [
  {
    id: "not-1",
    title: "Admissions Open for Academic Year 2025-2026 (MPC, BiPC, CEC, MEC, HEC)",
    category: "Administrative",
    publishedDate: "2025-06-01",
    pdfUrl: "#",
    isTicker: true,
    isArchived: false
  },
  {
    id: "not-2",
    title: "BIEAP Intermediate Board Exam Preparation & Model Test Schedule Announced",
    category: "Exam",
    publishedDate: "2025-06-10",
    pdfUrl: "#",
    isTicker: true,
    isArchived: false
  },
  {
    id: "not-3",
    title: "Special EAMCET & NEET Intensive Orientation Classes Commencement Notice",
    category: "Academic",
    publishedDate: "2025-06-15",
    pdfUrl: "#",
    isTicker: true,
    isArchived: false
  },
  {
    id: "not-4",
    title: "Parent-Teacher Meeting for Class 11 & Class 12 Intermediate Students",
    category: "Administrative",
    publishedDate: "2025-06-20",
    pdfUrl: "#",
    isTicker: false,
    isArchived: false
  }
];

// 3. EVENTS DATA
export const INITIAL_EVENTS = [
  {
    id: "evt-1",
    title: "Annual Science Expo & Model Demonstration 2025",
    eventDate: "2025-07-15",
    eventTime: "10:00 AM - 4:00 PM",
    venue: "Main Science Laboratory Wing, SVVJC Campus",
    guestDetails: "Senior Educational Officers & BIEAP Representatives",
    description: "Interactive Physics, Chemistry, and Biology project demonstrations by intermediate students.",
    posterUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
    isUpcoming: true
  },
  {
    id: "evt-2",
    title: "EAMCET & NEET Career Guidance Seminar",
    eventDate: "2025-08-05",
    eventTime: "11:00 AM - 1:00 PM",
    venue: "College Auditorium",
    guestDetails: "Expert Competitive Exam Mentors",
    description: "Guidance on exam strategy, time management, and seat matrix for engineering and medical aspirants.",
    posterUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800",
    isUpcoming: true
  },
  {
    id: "evt-3",
    title: "Independence Day Celebrations & Sports Week",
    eventDate: "2025-08-15",
    eventTime: "8:30 AM Onwards",
    venue: "College Grounds, Prasanth Nagar",
    guestDetails: "College Principal & Management Committee",
    description: "Flag hoisting ceremony, cultural events, and prize distribution for sports events.",
    posterUrl: "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=800",
    isUpcoming: true
  }
];

// 4. GALLERY ALBUMS DATA
export const INITIAL_GALLERY_ALBUMS = [
  {
    id: "alb-1",
    title: "Campus Infrastructure & Laboratories",
    eventYear: "2024-2025",
    coverPhotoUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800",
    description: "High-resolution photos of Physics, Chemistry, Biology labs, and Central Library."
  },
  {
    id: "alb-2",
    title: "Annual Day & Cultural Celebrations",
    eventYear: "2024-2025",
    coverPhotoUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800",
    description: "Highlights of student performances, speeches, and award distributions."
  },
  {
    id: "alb-3",
    title: "Sports Meet & Outdoor Activities",
    eventYear: "2024-2025",
    coverPhotoUrl: "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=800",
    description: "Volleyball, badminton, athletics, and indoor games competitions."
  }
];

export const INITIAL_GALLERY_PHOTOS = [
  {
    id: "pho-1",
    albumId: "alb-1",
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
    caption: "Physics & Optics Laboratory Setup",
    uploadedDate: "2025-01-10"
  },
  {
    id: "pho-2",
    albumId: "alb-1",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800",
    caption: "Chemistry Practical Workstation",
    uploadedDate: "2025-01-10"
  },
  {
    id: "pho-3",
    albumId: "alb-1",
    imageUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800",
    caption: "Botany & Zoology Microscope Station",
    uploadedDate: "2025-01-10"
  },
  {
    id: "pho-4",
    albumId: "alb-2",
    imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800",
    caption: "College Foundation Day Event",
    uploadedDate: "2025-02-14"
  },
  {
    id: "pho-5",
    albumId: "alb-3",
    imageUrl: "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=800",
    caption: "Volleyball Tournament Matches",
    uploadedDate: "2025-02-20"
  }
];

// 5. FACULTY DATA
export const INITIAL_FACULTY = [
  {
    id: "fac-1",
    name: "Senior Mathematics Lecturer",
    designation: "Head of Mathematics Department",
    subject: "Mathematics (MPC / MEC)",
    streamId: "mpc",
    qualification: "M.Sc Mathematics, B.Ed (15+ Yrs Experience)",
    experienceYears: 15,
    email: "maths@svvjc.edu.in",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    isPlaceholder: true,
    checklistRef: "Section 4 - Faculty Details Spreadsheet",
    note: "[EDITABLE PLACEHOLDER: Replace with verified faculty name and official photo]"
  },
  {
    id: "fac-2",
    name: "Senior Physics Educator",
    designation: "Senior Physics Lecturer & EAMCET Mentor",
    subject: "Physics (MPC / BiPC)",
    streamId: "mpc",
    qualification: "M.Sc Physics, M.Phil (12+ Yrs Experience)",
    experienceYears: 12,
    email: "physics@svvjc.edu.in",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    isPlaceholder: true,
    checklistRef: "Section 4 - Faculty Details Spreadsheet",
    note: "[EDITABLE PLACEHOLDER: Replace with verified faculty name and official photo]"
  },
  {
    id: "fac-3",
    name: "Chemistry Subject Expert",
    designation: "Lecturer in Organic & Inorganic Chemistry",
    subject: "Chemistry (MPC / BiPC)",
    streamId: "bipc",
    qualification: "M.Sc Organic Chemistry (10+ Yrs Experience)",
    experienceYears: 10,
    email: "chemistry@svvjc.edu.in",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    isPlaceholder: true,
    checklistRef: "Section 4 - Faculty Details Spreadsheet",
    note: "[EDITABLE PLACEHOLDER: Replace with verified faculty name and official photo]"
  },
  {
    id: "fac-4",
    name: "Botany & Zoology Specialist",
    designation: "Senior Biology Lecturer & NEET Mentor",
    subject: "Botany & Zoology (BiPC)",
    streamId: "bipc",
    qualification: "M.Sc Zoology, B.Ed (14+ Yrs Experience)",
    experienceYears: 14,
    email: "biology@svvjc.edu.in",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
    isPlaceholder: true,
    checklistRef: "Section 4 - Faculty Details Spreadsheet",
    note: "[EDITABLE PLACEHOLDER: Replace with verified faculty name and official photo]"
  },
  {
    id: "fac-5",
    name: "Commerce & Accountancy Educator",
    designation: "Head of Commerce Department",
    subject: "Commerce & Accountancy (CEC / MEC)",
    streamId: "cec",
    qualification: "M.Com, FCA (11+ Yrs Experience)",
    experienceYears: 11,
    email: "commerce@svvjc.edu.in",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    isPlaceholder: true,
    checklistRef: "Section 4 - Faculty Details Spreadsheet",
    note: "[EDITABLE PLACEHOLDER: Replace with verified faculty name and official photo]"
  }
];

// 6. RESULTS & TOPPERS DATA
export const INITIAL_STREAM_SUMMARY = [
  { id: "sum-1", academicYear: "2024-2025", streamId: null, passPercentage: 96.5, totalAppeared: 180, totalPassed: 174, distinctionsCount: 120 },
  { id: "sum-2", academicYear: "2024-2025", streamId: "mpc", passPercentage: 98.2, totalAppeared: 75, totalPassed: 74, distinctionsCount: 60 },
  { id: "sum-3", academicYear: "2024-2025", streamId: "bipc", passPercentage: 95.8, totalAppeared: 65, totalPassed: 62, distinctionsCount: 42 },
  { id: "sum-4", academicYear: "2024-2025", streamId: "cec", passPercentage: 94.5, totalAppeared: 40, totalPassed: 38, distinctionsCount: 18 }
];

export const INITIAL_TOPPERS = [
  {
    id: "top-1",
    academicYear: "2024-2025",
    studentName: "IPE Board Top Ranker (MPC)",
    marksPercentage: 98.6,
    rank: "State Distinction & College 1st Rank",
    streamId: "mpc",
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400",
    isCompetitiveQualifier: true,
    examName: "AP EAMCET Qualified - Top 1000 Rank",
    isPlaceholder: true,
    checklistRef: "Section 4 - Pass Percentage & Topper List",
    note: "[EDITABLE PLACEHOLDER: Replace with verified student name, hall ticket #, and photo]"
  },
  {
    id: "top-2",
    academicYear: "2024-2025",
    studentName: "IPE Board Top Ranker (BiPC)",
    marksPercentage: 97.8,
    rank: "College 1st Rank (BiPC)",
    streamId: "bipc",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400",
    isCompetitiveQualifier: true,
    examName: "NEET-UG Qualified (MBBS Seat Secured)",
    isPlaceholder: true,
    checklistRef: "Section 4 - Pass Percentage & Topper List",
    note: "[EDITABLE PLACEHOLDER: Replace with verified student name, hall ticket #, and photo]"
  },
  {
    id: "top-3",
    academicYear: "2024-2025",
    studentName: "IPE Board Top Ranker (CEC/MEC)",
    marksPercentage: 96.4,
    rank: "College 1st Rank (Commerce)",
    streamId: "cec",
    photoUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=400",
    isCompetitiveQualifier: true,
    examName: "CA Foundation Cleared in 1st Attempt",
    isPlaceholder: true,
    checklistRef: "Section 4 - Pass Percentage & Topper List",
    note: "[EDITABLE PLACEHOLDER: Replace with verified student name, hall ticket #, and photo]"
  }
];

// 7. STUDY MATERIALS & MODEL PAPERS
export const INITIAL_STUDY_MATERIALS = [
  { id: "mat-1", title: "BIEAP Mathematics 1A Model Paper 2025", subject: "Mathematics", year: "2025", fileSize: "2.4 MB", pdfUrl: "#" },
  { id: "mat-2", title: "BIEAP Physics Practical Manual & Viva Questions", subject: "Physics", year: "2025", fileSize: "3.1 MB", pdfUrl: "#" },
  { id: "mat-3", title: "BIEAP Chemistry Important Organic Equations", subject: "Chemistry", year: "2025", fileSize: "1.8 MB", pdfUrl: "#" },
  { id: "mat-4", title: "NEET Biology Chapter-wise MCQ Practice Sheet", subject: "Biology", year: "2025", fileSize: "4.0 MB", pdfUrl: "#" },
  { id: "mat-5", title: "BIEAP Accountancy & Commerce Model Paper", subject: "Commerce", year: "2025", fileSize: "2.1 MB", pdfUrl: "#" }
];

// 8. FEE STRUCTURE PER STREAM
export const INITIAL_FEE_STRUCTURE = [
  { stream: "MPC (Maths, Physics, Chemistry)", tuitionFee: "₹ 28,000 / year", labFee: "₹ 6,000", totalFee: "₹ 34,000" },
  { stream: "BiPC (Biology, Physics, Chemistry)", tuitionFee: "₹ 28,000 / year", labFee: "₹ 6,000", totalFee: "₹ 34,000" },
  { stream: "CEC (Civics, Economics, Commerce)", tuitionFee: "₹ 24,000 / year", labFee: "₹ 3,000", totalFee: "₹ 27,000" },
  { stream: "MEC (Maths, Economics, Commerce)", tuitionFee: "₹ 25,000 / year", labFee: "₹ 3,000", totalFee: "₹ 28,000" },
  { stream: "HEC (History, Economics, Civics)", tuitionFee: "₹ 22,000 / year", labFee: "₹ 2,000", totalFee: "₹ 24,000" }
];

// 9. CONTACT & PRINCIPAL DETAILS
export const INITIAL_CONTACT_INFO = {
  principalName: "Principal's Office Desk",
  principalMessageText: "Welcome to SRI VIDYA VIKAS JUNIOR COLLEGE. Established in November 2024, our institution is founded on the principles of academic discipline, conceptual clarity, and dedicated student mentoring. We provide top-quality BIEAP intermediate education along with integrated competitive exam preparation for EAMCET, NEET, and JEE Main in Prasanth Nagar, Madanapalle.",
  phoneReception: "+91 [PLACEHOLDER - Reception Desk]",
  phoneAdmissions: "+91 [PLACEHOLDER - Admissions Desk]",
  emailOfficial: "admissions@svvjc.edu.in",
  isPlaceholder: true,
  checklistRef: "Section 4 - Phone Numbers (Reception, Admissions, Principal)",
  note: "[EDITABLE PLACEHOLDER: Replace with verified contact phone numbers]"
};
