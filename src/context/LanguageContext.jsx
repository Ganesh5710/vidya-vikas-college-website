import React, { createContext, useContext, useState } from 'react';
const translations = {
    en: {
        'nav.home': 'Home',
        'nav.about': 'About Us',
        'nav.streams': 'Streams Offered',
        'nav.faculty': 'Faculty Directory',
        'nav.admissions': 'Admissions',
        'nav.facilities': 'Facilities',
        'nav.results': 'Results & Toppers',
        'nav.events': 'Campus Life',
        'nav.studentCorner': 'Student Corner',
        'nav.contact': 'Contact Us',
        'nav.admin': 'Staff Admin Portal',
        'hero.badge': 'ESTABLISHED NOVEMBER 2024 • RATED 5.0 STARS',
        'hero.title': 'SRI VIDYA VIKAS JUNIOR COLLEGE',
        'hero.subtitle': 'Empowering Students with Academic Excellence & Competitive Coaching in Prasanth Nagar, Madanapalle',
        'hero.applyBtn': 'Apply for Admission',
        'hero.exploreBtn': 'Explore Streams',
        'stats.rating': '5.0 Star Rating (45 Reviews)',
        'stats.streams': 'MPC, BiPC, CEC, MEC, HEC',
        'stats.location': 'Prasanth Nagar, Madanapalle',
        'stats.affiliation': 'BIEAP Affiliated',
        'footer.rights': 'All rights reserved.',
    },
    te: {
        'nav.home': 'హోమ్ (Home)',
        'nav.about': 'మా గురించి (About Us)',
        'nav.streams': 'కోర్సులు / స్ట్రీమ్‌లు (Streams)',
        'nav.faculty': 'అధ్యాపకులు (Faculty)',
        'nav.admissions': 'అడ్మిషన్లు (Admissions)',
        'nav.facilities': 'వసతులు (Facilities)',
        'nav.results': 'ఫలితాలు & టాపర్లు (Results)',
        'nav.events': 'క్యాంపస్ ఈవెంట్స్ (Events)',
        'nav.studentCorner': 'స్టూడెంట్ కార్నర్ (Student Corner)',
        'nav.contact': 'సంప్రదించండి (Contact)',
        'nav.admin': 'స్టాఫ్ అడ్మిన్ పోర్టల్ (Admin)',
        'hero.badge': 'స్థాపన నవంబర్ 2024 • రేటింగ్ 5.0 స్టార్స్',
        'hero.title': 'శ్రీ విద్యా వికాస్ జూనియర్ కాలేజ్',
        'hero.subtitle': 'ప్రశాంత్ నగర్, మదనపల్లె లో నాణ్యమైన ఇంటర్మీడియట్ మరియు పోటీ పరీక్షల శిక్షణ',
        'hero.applyBtn': 'అడ్మిషన్ కోసం దరఖాస్తు చేసుకోండి',
        'hero.exploreBtn': 'కోర్సులను చూడండి',
        'stats.rating': '5.0 స్టార్ రేటింగ్ (45 రివ్యూలు)',
        'stats.streams': 'MPC, BiPC, CEC, MEC, HEC',
        'stats.location': 'ప్రశాంత్ నగర్, మదనపల్లె',
        'stats.affiliation': 'BIEAP గుర్తింపు పొందిన సంస్థ',
        'footer.rights': 'అన్ని హక్కులు ప్రత్యేకించబడ్డాయి.',
    }
};
const LanguageContext = createContext(undefined);
export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    const t = (key) => {
        return translations[language][key] || translations['en'][key] || key;
    };
    return (<LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>);
};
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
