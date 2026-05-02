import { LanguageProvider } from './LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Services from './components/Services';
import Automation from './components/Automation';
import HowItWorks from './components/HowItWorks';
import QualitySection from './components/QualitySection';
import BrandMission from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

export default function App() {
  return (
    <LanguageProvider>
      <div className="bg-black min-h-screen text-zinc-100 selection:bg-brand-sage selection:text-white">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <QualitySection />
          <Automation />
          <Gallery />
          <HowItWorks />
          <BrandMission />
          <Contact />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </LanguageProvider>
  );
}
