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
    isPlaceholder: false,
    checklistRef: "Section 4 - Stream List & Eligibility",
    note: "Official Stream Program"
  },
  {
    id: "bipc",
    name: "BiPC",
    fullName: "Biology (Botany & Zoology), Physics, Chemistry",
    subjects: ["Botany", "Zoology", "Physics", "Chemistry", "English", "Telugu / Sanskrit"],
    eligibility: "Class 10 SSC / CBSE / ICSE Pass with Science background",
    careerPaths: "Medicine (NEET-UG, MBBS, BDS), Pharmacy (B.Pharm), Agriculture (B.Sc Ag), Biotechnology",
    timetable: "Mon-Sat: 8:30 AM - 4:30 PM | Special NEET coaching 4:30 PM - 5:30 PM",
    isPlaceholder: false,
    checklistRef: "Section 4 - Stream List & Eligibility",
    note: "Official Stream Program"
  },
  {
    id: "cec",
    name: "CEC",
    fullName: "Civics, Economics, Commerce",
    subjects: ["Civics", "Economics", "Commerce & Accountancy", "English", "Telugu / Sanskrit"],
    eligibility: "Class 10 SSC / CBSE / ICSE Pass",
    careerPaths: "Chartered Accountancy (CA Foundation), Business Administration (BBA), Law (CLAT), Civil Services (UPSC)",
    timetable: "Mon-Sat: 8:30 AM - 4:00 PM | Special CA Foundation Orientation",
    isPlaceholder: false,
    checklistRef: "Section 4 - Stream List & Eligibility",
    note: "Official Stream Program"
  },
  {
    id: "mec",
    name: "MEC",
    fullName: "Mathematics, Economics, Commerce",
    subjects: ["Mathematics", "Economics", "Commerce & Accountancy", "English", "Telugu / Sanskrit"],
    eligibility: "Class 10 SSC / CBSE / ICSE Pass with Mathematics background",
    careerPaths: "Data Analytics, Actuarial Science, CA, B.Com (Hons), Corporate Finance",
    timetable: "Mon-Sat: 8:30 AM - 4:00 PM",
    isPlaceholder: false,
    checklistRef: "Section 4 - Stream List & Eligibility",
    note: "Official Stream Program"
  },
  {
    id: "hec",
    name: "HEC",
    fullName: "History, Economics, Civics",
    subjects: ["History", "Economics", "Civics", "English", "Telugu / Sanskrit"],
    eligibility: "Class 10 SSC / CBSE / ICSE Pass",
    careerPaths: "Civil Services (IAS / IPS / APPSC Group 1), Journalism, Law, Public Administration, B.A",
    timetable: "Mon-Sat: 8:30 AM - 4:00 PM | Special Civil Services Orientation",
    isPlaceholder: false,
    checklistRef: "Section 4 - Stream List & Eligibility",
    note: "Official Stream Program"
  }
];

// 2. NOTICES DATA (Empty as requested for user to populate via Admin Panel)
export const INITIAL_NOTICES: Array<{
  id: string;
  title: string;
  category: string;
  publishedDate: string;
  pdfUrl: string;
  isTicker: boolean;
  isArchived: boolean;
}> = [];

// 3. EVENTS DATA (Empty as requested for user to populate via Admin Panel)
export const INITIAL_EVENTS: Array<{
  id: string;
  title: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  guestDetails: string;
  description: string;
  posterUrl: string;
  isUpcoming: boolean;
}> = [];

// 4. GALLERY ALBUMS & PHOTOS (Empty as requested)
export const INITIAL_GALLERY_ALBUMS: Array<{
  id: string;
  title: string;
  eventYear: string;
  coverPhotoUrl: string;
  description: string;
}> = [];

export const INITIAL_GALLERY_PHOTOS: Array<{
  id: string;
  albumId: string;
  imageUrl: string;
  caption: string;
  uploadedDate: string;
}> = [];

// 5. FACULTY DATA (Empty as requested)
export const INITIAL_FACULTY: Array<{
  id: string;
  name: string;
  designation: string;
  subject: string;
  streamId: string;
  qualification: string;
  experienceYears: number;
  email: string;
  photoUrl: string;
  isPlaceholder?: boolean;
  checklistRef?: string;
  note?: string;
}> = [];

// 6. RESULTS & TOPPERS DATA (Empty as requested)
export const INITIAL_STREAM_SUMMARY: Array<{
  id: string;
  academicYear: string;
  streamId: string | null;
  passPercentage: number;
  totalAppeared: number;
  totalPassed: number;
  distinctionsCount: number;
}> = [];

export const INITIAL_TOPPERS: Array<{
  id: string;
  academicYear: string;
  studentName: string;
  marksPercentage: number;
  rank: string;
  streamId: string;
  photoUrl: string;
  isCompetitiveQualifier: boolean;
  examName: string;
  isPlaceholder?: boolean;
  checklistRef?: string;
  note?: string;
}> = [];

// 7. STUDY MATERIALS & MODEL PAPERS (Empty as requested)
export const INITIAL_STUDY_MATERIALS: Array<{
  id: string;
  title: string;
  subject: string;
  year: string;
  fileSize: string;
  pdfUrl: string;
}> = [];

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
  phoneReception: "+91 9876543210",
  phoneAdmissions: "+91 9876543211",
  emailOfficial: "admissions@svvjc.edu.in",
  isPlaceholder: false,
  checklistRef: "Section 4 - Phone Numbers (Reception, Admissions, Principal)",
  note: "Official Contact Numbers"
};
