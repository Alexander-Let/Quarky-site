import HeroSection from "./sections/HeroSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import TeamSection from "./sections/TeamSection";
import ContactSection from "./sections/ContactSection";

export default function App() {
  return (
    <div
      style={{
        background: "var(--bg-primary)",
        color: "var(--text-primary)",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <HeroSection />
      <HowItWorksSection />
      <TeamSection />
      <ContactSection />
    </div>
  );
}
