"use client";

import HeroDirect from "../components/HeroDirect";
import TrustBar from "../components/TrustBar";
import ProblemsSection from "../components/ProblemsSection";
import RealCases from "../components/RealCases";
import HowWeWork from "../components/HowWeWork";
import Solutions from "../components/Solutions";
import AboutFounder from "../components/AboutFounder";
import FAQSection from "../components/FAQSection";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main id="top" className="bg-[#090B0B]/40 text-[#F3F5F4] min-h-screen font-sans selection:bg-[#16D39A] selection:text-[#090B0B]">
      <HeroDirect />
      <TrustBar />
      <ProblemsSection />
      <RealCases />
      <HowWeWork />
      <Solutions />
      <AboutFounder />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
