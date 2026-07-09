import { useRef, useEffect, useState } from "react";
import { Mail, Phone, Shield } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function TelegramIcon({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21.5 3.5L2.5 11.5L8.5 13.5L16.5 8L11.5 14.5L18.5 20.5L21.5 3.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function LinkedInIcon({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M6 9H2V21H6V9Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-header",
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".contact-form-container",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form-container",
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".contact-info-container",
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-info-container",
            start: "top 75%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) newErrors.name = "Имя обязательно";
    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Некорректный формат email";
    }
    if (!formData.message.trim()) newErrors.message = "Сообщение обязательно";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      const mailBody = `Имя: ${formData.name}\nПочта: ${formData.email}\nСообщение: ${formData.message}`;

      const mailtoUrl = `mailto:Security.AI.Team@yandex.com?subject=Заявка с сайта PromptGuard&body=${encodeURIComponent(mailBody)}`;

      window.location.href = mailtoUrl;

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    background: "var(--bg-primary)",
    border: "1px solid var(--border-subtle)",
    borderRadius: "var(--radius-sm)",
    color: "var(--text-primary)",
    fontFamily: '"Inter Variable", sans-serif',
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.3s",
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        background: "var(--bg-secondary)",
        padding: "120px 0 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container-main" style={{ position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div
          className="contact-header"
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
            Свяжитесь с нами
          </h2>
          <p
            style={{
              fontFamily: '"Inter Variable", sans-serif',
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Защитите свои LLM от угроз — оставьте заявку, и наша команда свяжется с вами в течение суток
          </p>
        </div>

        {/* Two Column Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
            gap: "48px",
            marginBottom: "80px",
          }}
        >
          {/* Contact Form */}
          <div
            className="contact-form-container"
            style={{
              opacity: 0,
              background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-lg)",
              padding: "32px",
            }}
          >
            {submitted ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  minHeight: "300px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "rgba(0, 255, 136, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="#00ff88"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: '"Space Grotesk Variable", sans-serif',
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    marginBottom: "8px",
                  }}
                >
                  Заявка отправлена!
                </h3>
                <p
                  style={{
                    fontFamily: '"Inter Variable", sans-serif',
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  Мы свяжемся с вами в ближайшее время
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: '"JetBrains Mono Variable", monospace',
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      color: "var(--text-muted)",
                      marginBottom: "8px",
                      textTransform: "uppercase",
                    }}
                  >
                    Имя
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ваше имя"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent-green)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-subtle)")}
                  />
                  {errors.name && (
                    <span
                      style={{
                        fontFamily: '"Inter Variable", sans-serif',
                        fontSize: "0.8rem",
                        color: "var(--accent-red)",
                        marginTop: "4px",
                        display: "block",
                      }}
                    >
                      {errors.name}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: '"JetBrains Mono Variable", monospace',
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      color: "var(--text-muted)",
                      marginBottom: "8px",
                      textTransform: "uppercase",
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent-green)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-subtle)")}
                  />
                  {errors.email && (
                    <span
                      style={{
                        fontFamily: '"Inter Variable", sans-serif',
                        fontSize: "0.8rem",
                        color: "var(--accent-red)",
                        marginTop: "4px",
                        display: "block",
                      }}
                    >
                      {errors.email}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: '"JetBrains Mono Variable", monospace',
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      color: "var(--text-muted)",
                      marginBottom: "8px",
                      textTransform: "uppercase",
                    }}
                  >
                    Сообщение
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Расскажите о вашем проекте..."
                    rows={4}
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      minHeight: "100px",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent-green)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-subtle)")}
                  />
                  {errors.message && (
                    <span
                      style={{
                        fontFamily: '"Inter Variable", sans-serif',
                        fontSize: "0.8rem",
                        color: "var(--accent-red)",
                        marginTop: "4px",
                        display: "block",
                      }}
                    >
                      {errors.message}
                    </span>
                  )}
                </div>

                <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "8px" }}>
                  Отправить
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div
            className="contact-info-container"
            style={{
              opacity: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "32px",
            }}
          >
            <ContactItem
              icon={<Mail size={24} color="#00ff88" />}
              label="Email"
              value="Security.AI.Team@yandex.com"
              href="mailto:Security.AI.Team@yandex.com"
            />
            <ContactItem
              icon={<Phone size={24} color="#00ff88" />}
              label="Телефон"
              value="+7 (922) 892-27-87"
              href="tel:+79228922787"
            />
            <ContactItem
              icon={<TelegramIcon size={24} color="#00ccff" />}
              label="Telegram"
              value="@Sec_AI_Team"
              href="https://t.me/sec_ai_team"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          background: "var(--bg-primary)",
          borderTop: "1px solid var(--border-subtle)",
          padding: "40px 0",
        }}
      >
        <div className="container-main">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "24px",
              marginBottom: "24px",
            }}
          >
            {/* Logo */}
            <div>
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
                  marginBottom: "8px",
                }}
              >
                <Shield size={18} />
                <span>Quarky</span>
              </div>
              <p
                style={{
                  fontFamily: '"Inter Variable", sans-serif',
                  fontSize: "0.8rem",
                  color: "var(--text-muted)",
                }}
              >
                Защита LLM-приложений от промпт-инъекций
              </p>
            </div>

            {/* Links */}
            <div
              style={{
                display: "flex",
                gap: "24px",
                fontFamily: '"Inter Variable", sans-serif',
                fontSize: "0.8rem",
              }}
            >
              <a
                href="#"
                style={{ color: "var(--text-secondary)", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              >
                Политика конфиденциальности
              </a>
              <a
                href="#"
                style={{ color: "var(--text-secondary)", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              >
                Условия использования
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div
            style={{
              textAlign: "center",
              fontFamily: '"JetBrains Mono Variable", monospace',
              fontSize: "0.7rem",
              fontWeight: 500,
              letterSpacing: "0.08em",
              color: "var(--text-muted)",
              paddingTop: "24px",
              borderTop: "1px solid var(--border-subtle)",
              textTransform: "uppercase",
            }}
          >
            © 2026 PromptGuard. Все права защищены.
          </div>
        </div>
      </footer>
    </section>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "16px",
        borderRadius: "var(--radius-md)",
        transition: "all 0.3s ease",
        border: "1px solid transparent",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--bg-card)";
        e.currentTarget.style.borderColor = "var(--border-subtle)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.borderColor = "transparent";
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "var(--radius-sm)",
          background: "rgba(0, 255, 136, 0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontFamily: '"JetBrains Mono Variable", monospace',
            fontSize: "0.7rem",
            fontWeight: 500,
            letterSpacing: "0.08em",
            color: "var(--text-muted)",
            textTransform: "uppercase",
            marginBottom: "4px",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: '"Inter Variable", sans-serif',
            fontSize: "1rem",
            color: "var(--text-primary)",
            transition: "color 0.3s",
          }}
          className="contact-value"
        >
          {value}
        </div>
      </div>
    </a>
  );
}
