import { useRef, useEffect } from "react";
import { Shield, ChevronDown } from "lucide-react";
import gsap from "gsap";
import ParticleField from "./ParticleField";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const shieldRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate content in
      gsap.fromTo(
        ".hero-title",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-buttons",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.7, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-nav",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" }
      );

      // Shield animation
      if (shieldRef.current) {
        const shieldPath = shieldRef.current.querySelector("path");
        if (shieldPath) {
          const length = (shieldPath as SVGPathElement).getTotalLength?.() || 300;
          gsap.set(shieldPath, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
          gsap.to(shieldPath, {
            strokeDashoffset: 0,
            duration: 2,
            delay: 0.5,
            ease: "power2.inOut",
          });
        }

        // Pulse animation
        gsap.to(shieldRef.current, {
          scale: 1.05,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Scroll indicator
      gsap.fromTo(
        ".scroll-indicator",
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 1.2 }
      );
      gsap.to(".scroll-indicator", {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "600px",
        overflow: "hidden",
        background: "radial-gradient(ellipse at center, rgba(0,255,136,0.05) 0%, #06060a 70%)",
      }}
    >
      {/* Particle Background */}
      <ParticleField />

      {/* Radial glow overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 0%, #06060a 80%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Navigation */}
      <nav
        className="hero-nav"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "20px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(6, 6, 10, 0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0, 255, 136, 0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontFamily: '"JetBrains Mono Variable", monospace',
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: "var(--accent-green)",
          }}
        >
          <Shield size={20} />
          <span>Quarky</span>
        </div>

        <div
          style={{
            display: "flex",
            gap: "24px",
            fontFamily: '"Inter Variable", sans-serif',
            fontSize: "0.875rem",
          }}
        >
          <button
            onClick={() => scrollToSection("how-it-works")}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              cursor: "pointer",
              transition: "color 0.3s",
              padding: "4px 0",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-secondary)")
            }
          >
            Как работает
          </button>
          <button
            onClick={() => scrollToSection("team")}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              cursor: "pointer",
              transition: "color 0.3s",
              padding: "4px 0",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-secondary)")
            }
          >
            Команда
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div
        ref={contentRef}
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "80px 24px 40px",
          textAlign: "center",
        }}
      >
        {/* Animated Shield SVG */}
        <div style={{ marginBottom: "32px" }}>
          <svg
            ref={shieldRef}
            width="120"
            height="140"
            viewBox="0 0 120 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M60 5L10 30V70C10 105 60 135 60 135C60 135 110 105 110 70V30L60 5Z"
              stroke="#00ff88"
              strokeWidth="2"
              fill="rgba(0, 255, 136, 0.05)"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M40 70L52 82L80 54"
              stroke="#00ff88"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* H1 */}
        <h1
          className="hero-title"
          style={{
            fontFamily: '"Space Grotesk Variable", sans-serif',
            fontSize: "clamp(2rem, 6vw, 4rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            maxWidth: "800px",
            lineHeight: 1.1,
            marginBottom: "24px",
            opacity: 0,
          }}
        >
          Защитите свои{" "}
          <span style={{ color: "var(--accent-green)" }}>AI-системы</span> от
          промпт-атак
        </h1>

        {/* Subtitle */}
        <p
          className="hero-subtitle"
          style={{
            fontFamily: '"Inter Variable", sans-serif',
            fontSize: "1.125rem",
            lineHeight: 1.6,
            color: "var(--text-secondary)",
            maxWidth: "600px",
            marginBottom: "40px",
            opacity: 0,
          }}
        >
          Анализатор промпт-инъекций — держите контроль над своей LLM: никакие скрытые инструкции и обходы больше не пройдут
        </p>

        {/* CTA Buttons */}
        <div
          className="hero-buttons"
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
            opacity: 0,
          }}
        >
          <button
            className="btn-primary"
            onClick={() => scrollToSection("how-it-works")}
          >
            Ознакомиться с решением
          </button>
          <button
            className="btn-secondary"
            onClick={() => scrollToSection("contact")}
          >
            Связаться с нами
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="scroll-indicator"
        style={{
          position: "absolute",
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          opacity: 0,
          cursor: "pointer",
        }}
        onClick={() => scrollToSection("how-it-works")}
      >
        <span
          style={{
            fontFamily: '"JetBrains Mono Variable", monospace',
            fontSize: "0.7rem",
            letterSpacing: "0.08em",
            color: "var(--text-muted)",
            textTransform: "uppercase",
          }}
        >
          Листайте вниз
        </span>
        <ChevronDown size={20} color="var(--text-muted)" />
      </div>
    </section>
  );
}
