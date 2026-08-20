import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileQuickActionsFAB } from './components/layout/MobileQuickActionsFAB';
// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { StreamsPage } from './pages/StreamsPage';
import { FacultyPage } from './pages/FacultyPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { ResultsPage } from './pages/ResultsPage';
import { EventsPage } from './pages/EventsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
export function App() {
    const [activeTab, setActiveTab] = useState('home');
    const renderActivePage = () => {
        switch (activeTab) {
            case 'home':
                return <HomePage setActiveTab={setActiveTab}/>;
            case 'about':
                return <AboutPage />;
            case 'streams':
                return <StreamsPage setActiveTab={setActiveTab}/>;
            case 'faculty':
                return <FacultyPage />;
            case 'admissions':
                return <AdmissionsPage />;
            case 'facilities':
                return <FacilitiesPage />;
            case 'results':
                return <ResultsPage />;
            case 'events':
                return <EventsPage />;
            case 'contact':
                return <ContactPage />;
            case 'admin':
                return <AdminDashboardPage />;
            default:
                return <HomePage setActiveTab={setActiveTab}/>;
        }
    };
    return (<AuthProvider>
      <LanguageProvider>
        <DataProvider>
          <div className="min-h-screen flex flex-col bg-slate-50">

            {/* Institutional Header & Sticky Navigation Header */}
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab}/>

            {/* Main Page Container */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
              {renderActivePage()}
            </main>

            {/* Mobile & Desktop Quick Actions FABs */}
            <MobileQuickActionsFAB />

            {/* Footer */}
            <Footer setActiveTab={setActiveTab}/>

          </div>
        </DataProvider>
      </LanguageProvider>
    </AuthProvider>);
}
export default App;
