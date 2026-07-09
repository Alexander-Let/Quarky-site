import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "3+", label: "года в AI-безопасности" },
  { value: "8", label: "реализованных проектов" },
  { value: "98.2%", label: "точность детекции" },
  { value: "<250мс", label: "время отклика" },
];

const teamMembers = [
  {
    name: "Александр Летута",
    role: "CEO & Founder",
    badge: "AI Strategy",
    image: "team-1.jpg",
  },
  {
    name: "Максим Корсаков",
    role: "Lead DE & DS",
    badge: "Data Architecture",
    image: "team-2.jpg",
  },
  {
    name: "Булат Мамбетов",
    role: "Lead ML Engineer",
    badge: "NLP Research",
    image: "team-3.jpg",
  },
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".team-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".team-header",
            start: "top 80%",
            once: true,
          },
        }
      );

      // Stats animation with count-up effect
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Team cards animation
      gsap.fromTo(
        ".team-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".team-grid",
            start: "top 75%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="team"
      style={{
        background: "var(--bg-primary)",
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial glow */}
      <div
        style={{
          position: "absolute",
          top: "-200px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "800px",
          background:
            "radial-gradient(circle, rgba(0, 255, 136, 0.03) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container-main" style={{ position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div
          className="team-header"
          style={{ textAlign: "center", marginBottom: "60px", opacity: 0 }}
        >
          <h2
            style={{
              fontFamily: '"Space Grotesk Variable", sans-serif',
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              marginBottom: "20px",
            }}
          >
            Наша команда
          </h2>
          <p
            style={{
              fontFamily: '"Inter Variable", sans-serif',
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Мы — группа инженеров и исследователей в области AI-безопасности с
            общей миссией: сделать внедрение LLM безопасным для каждой компании
          </p>
        </div>

        {/* Stats Bar */}
        <div
          ref={statsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "24px",
            marginBottom: "80px",
            padding: "32px",
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-lg)",
          }}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-item"
              style={{
                opacity: 0,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: '"Space Grotesk Variable", sans-serif',
                  fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                  fontWeight: 700,
                  color: "var(--accent-green)",
                  marginBottom: "8px",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: '"JetBrains Mono Variable", monospace',
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Team Grid */}
        <div
          className="team-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "24px",
          }}
        >
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="team-card card-glass"
              style={{
                opacity: 0,
                padding: "24px",
                textAlign: "center",
                cursor: "default",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Photo */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  marginBottom: "16px",
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 1%",
                    transition: "transform 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
              </div>

              {/* Name */}
              <h3
                style={{
                  fontFamily: '"Space Grotesk Variable", sans-serif',
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "6px",
                  letterSpacing: "-0.01em",
                }}
              >
                {member.name}
              </h3>

              {/* Role */}
              <div
                style={{
                  fontFamily: '"JetBrains Mono Variable", monospace',
                  fontSize: "0.8rem",
                  color: "var(--accent-blue)",
                  marginBottom: "12px",
                }}
              >
                {member.role}
              </div>

              {/* Badge */}
              <span
                style={{
                  display: "inline-block",
                  background: "rgba(0, 255, 136, 0.08)",
                  color: "var(--accent-green)",
                  border: "1px solid rgba(0, 255, 136, 0.2)",
                  borderRadius: "var(--radius-full)",
                  padding: "4px 14px",
                  fontFamily: '"JetBrains Mono Variable", monospace',
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                }}
              >
                {member.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
