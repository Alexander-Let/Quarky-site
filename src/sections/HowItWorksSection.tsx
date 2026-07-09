import { useRef, useEffect } from "react";
import {
  MessageSquare,
  ScanLine,
  Gauge,
  ShieldCheck,
  Zap,
  Brain,
  Settings,
  Plug,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Приём запроса",
    description:
      "Все входящие промпты перехватываются на уровне API-шлюза перед попаданием в LLM",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "Анализ паттернов",
    description:
      "Многоуровневый анализ входных данных с выявлением атак по стандартам OWASP Top 10",
    icon: ScanLine,
  },
  {
    number: "03",
    title: "Оценка риска",
    description:
      "ML-модель оценки рисков присваивает каждому запросу степень угрозы от 0 до 100",
    icon: Gauge,
  },
  {
    number: "04",
    title: "Блокировка + отчёт",
    description:
      "Подозрительные запросы блокируются, безопасные — пропускаются. Полная аналитика в дашборде",
    icon: ShieldCheck,
  },
];

const features = [
  {
    title: "Реальное время",
    description:
      "Задержка анализа менее 250 мс — не замедляет работу вашего приложения",
    icon: Zap,
  },
  {
    title: "Универсальность",
    description:
      "Совместим с любой LLM — включая кастомные решения",
    icon: Brain,
  },
  {
    title: "Гибкие правила",
    description:
      "Настраивайте пороги чувствительности и создавайте собственные паттерны детекции",
    icon: Settings,
  },
  {
    title: "API-интеграция",
    description:
      "REST API и SDK для Python, Go, C++ и Rust. Документация в Swagger",
    icon: Plug,
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animation
      gsap.fromTo(
        ".hiw-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".hiw-header",
            start: "top 80%",
            once: true,
          },
        }
      );

      // Steps stagger animation
      gsap.fromTo(
        ".step-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      // Timeline line fill animation
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 70%",
              once: true,
            },
          }
        );
      }

      // Features animation
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".features-grid",
            start: "top 80%",
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
      id="how-it-works"
      style={{
        background: "var(--bg-secondary)",
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0, 255, 136, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 136, 0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div className="container-main" style={{ position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div className="hiw-header" style={{ textAlign: "center", marginBottom: "80px", opacity: 0 }}>
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
            Технология защиты
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
            Промпт-инъекции — это атаки, при которых злоумышленник встраивает
            вредоносные инструкции во входной текст, заставляя LLM игнорировать
            системные ограничения. Наш анализатор обнаруживает и блокирует такие
            попытки в реальном времени.
          </p>
        </div>

        {/* Timeline Steps */}
        <div ref={timelineRef} style={{ marginBottom: "100px", position: "relative" }}>
          {/* Connecting Line (desktop) */}
          <div
            style={{
              position: "absolute",
              top: "50px",
              left: "12.5%",
              right: "12.5%",
              height: "2px",
              background: "rgba(0, 255, 136, 0.1)",
              display: "none",
            }}
            className="timeline-line-bg"
          />
          <div
            ref={lineRef}
            style={{
              position: "absolute",
              top: "50px",
              left: "12.5%",
              right: "12.5%",
              height: "2px",
              background: "linear-gradient(90deg, #00ff88, #00ccaa)",
              transformOrigin: "left",
              display: "none",
            }}
            className="timeline-line-fill"
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "32px",
            }}
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="step-card"
                  style={{
                    opacity: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    position: "relative",
                  }}
                >
                  {/* Icon circle */}
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      background: "rgba(0, 255, 136, 0.08)",
                      border: "1px solid rgba(0, 255, 136, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "20px",
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    <Icon size={32} color="#00ff88" />
                  </div>

                  {/* Step number */}
                  <span
                    style={{
                      fontFamily: '"JetBrains Mono Variable", monospace',
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      color: "var(--text-muted)",
                      marginBottom: "12px",
                    }}
                  >
                    {step.number}
                  </span>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: '"Space Grotesk Variable", sans-serif',
                      fontSize: "1.25rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginBottom: "12px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: '"Inter Variable", sans-serif',
                      fontSize: "0.875rem",
                      lineHeight: 1.6,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {step.description}
                  </p>

                  {/* Connector dot */}
                  {index < steps.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        right: "-16px",
                        top: "40px",
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "var(--accent-green)",
                        display: "none",
                      }}
                      className="step-connector"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Features Grid */}
        <div
          className="features-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
          }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="feature-card card-glass"
                style={{
                  opacity: 0,
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <Icon size={32} color="var(--accent-blue)" />
                <h3
                  style={{
                    fontFamily: '"Space Grotesk Variable", sans-serif',
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontFamily: '"Inter Variable", sans-serif',
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                    color: "var(--text-secondary)",
                  }}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
