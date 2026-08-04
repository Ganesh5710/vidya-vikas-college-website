import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { TopBanner } from './components/layout/TopBanner';
import { NewsTicker } from './components/layout/NewsTicker';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WhatsAppFAB } from './components/layout/WhatsAppFAB';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { StreamsPage } from './pages/StreamsPage';
import { FacultyPage } from './pages/FacultyPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { ResultsPage } from './pages/ResultsPage';
import { EventsPage } from './pages/EventsPage';
import { StudentCornerPage } from './pages/StudentCornerPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage setActiveTab={setActiveTab} />;
      case 'about':
        return <AboutPage />;
      case 'streams':
        return <StreamsPage setActiveTab={setActiveTab} />;
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
      case 'studentCorner':
        return <StudentCornerPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <AdminDashboardPage />;
      default:
        return <HomePage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col bg-slate-50">
          
          {/* Top Banner & News Ticker */}
          <TopBanner />
          <NewsTicker />

          {/* Sticky Navigation Header */}
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Main Page Container */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
            {renderActivePage()}
          </main>

          {/* Floating WhatsApp Action Button */}
          <WhatsAppFAB />

          {/* Footer */}
          <Footer setActiveTab={setActiveTab} />

        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
