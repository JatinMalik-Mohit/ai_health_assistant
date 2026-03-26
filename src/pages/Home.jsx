import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './Home.module.css'

const FEATURES = [
  {
    icon: 'fa-users',
    title: 'Multi-Patient Support',
    desc: 'Add and manage multiple family members. Each patient has their own separate chat history, just like WhatsApp.',
  },
  {
    icon: 'fa-robot',
    title: 'AI-Powered Diagnosis',
    desc: 'Powered by LLaMA 3.1 via Groq API. Get structured responses covering possible conditions, precautions, and medicines.',
  },
  {
    icon: 'fa-clock-rotate-left',
    title: 'Persistent Chat History',
    desc: 'Your chat history is saved locally. Switch between patients and all previous conversations are preserved.',
  },
  {
    icon: 'fa-microphone',
    title: 'Voice Input',
    desc: 'Speak your symptoms instead of typing. Supports English and Indian English via the Web Speech API in Chrome.',
  },
  {
    icon: 'fa-hospital',
    title: 'Find Nearby Hospitals',
    desc: 'One tap to locate hospitals near you using Google Maps. Useful when symptoms require immediate attention.',
  },
  {
    icon: 'fa-mobile-screen',
    title: 'Fully Responsive',
    desc: 'Works perfectly on mobile phones, tablets, and desktops. Bootstrap 5 layout adapts to any screen size.',
  },
]

const STEPS = [
  { num: 1, title: 'Add a Patient Profile',   desc: "Enter the patient's name and age in the sidebar. Add multiple family members and switch between them anytime." },
  { num: 2, title: 'Describe the Symptoms',   desc: 'Type or speak your symptoms in the chat input. Be as descriptive as possible for the best AI response.' },
  { num: 3, title: 'Get AI Health Insights',  desc: 'AI Health Assistant returns structured advice: possible conditions, precautions, medicines, and when to see a doctor.' },
  { num: 4, title: 'Consult a Real Doctor',   desc: 'Use the insights as a starting point. Always follow up with a qualified healthcare professional.' },
]

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={styles.page}>

      {/* ── NAVBAR ── */}
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className="container">
          <div className={styles.navInner}>
            <Link to="/" className={styles.brand}>
              <div className={styles.brandMark}>
                <i className="fa-solid fa-heart-pulse" />
              </div>
              AI Health Assistant
            </Link>

            <div className={styles.navLinks}>
              <a href="#features"     className={styles.navLink}>Features</a>
              <a href="#how-it-works" className={styles.navLink}>How It Works</a>
              <Link to="/chat" className={styles.navCta}>
                <i className="fa-solid fa-stethoscope" /> Start Consultation
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className={styles.heroBadge}>
                <span className={styles.badgeDot} />
                AI-Powered Health Assistant
              </div>

              <h1 className={styles.heroTitle}>
                Your Personal<br />
                <span>AI Health</span><br />
                Companion
              </h1>

              <p className={styles.heroSub}>
                Describe your symptoms and get instant AI-powered health insights,
                possible conditions, precautions, and dietary advice.
                Available 24/7 for the whole family.
              </p>

              <div className="d-flex flex-wrap gap-3">
                <Link to="/chat" className={styles.btnPrimary}>
                  <i className="fa-solid fa-comment-medical" /> Start Consultation
                </Link>
                <a href="#how-it-works" className={styles.btnSecondary}>
                  <i className="fa-solid fa-circle-play" /> See How It Works
                </a>
              </div>

              <div className={styles.disclaimer}>
                <i className="fa-solid fa-triangle-exclamation me-2" />
                For informational purposes only. Always consult a qualified medical professional.
              </div>
            </div>

            <div className="col-lg-6 d-flex justify-content-center">
              <PreviewCard />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className={styles.stats}>
        <div className="container">
          <div className="row g-4 text-center">
            {[['24/7','Always Available'],['100+','Symptoms Covered'],['AI','Powered by LLaMA 3'],['Free','Always Free to Use']].map(([num, label]) => (
              <div key={label} className="col-6 col-md-3">
                <div className={styles.statCard}>
                  <div className={styles.statNum}>{num}</div>
                  <div className={styles.statLabel}>{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className={styles.features} id="features">
        <div className="container">
          <div className="text-center mb-5">
            <span className={styles.sectionBadge}>Features</span>
            <h2 className={styles.sectionTitle}>Everything You Need</h2>
            <p className="text-muted" style={{ fontSize: 16, maxWidth: 520, margin: '0 auto' }}>
              AI Health Assistant provides comprehensive health insights to help you understand your symptoms better.
            </p>
          </div>
          <div className="row g-4">
            {FEATURES.map(f => (
              <div key={f.title} className="col-md-6 col-lg-4">
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}><i className={`fa-solid ${f.icon}`} /></div>
                  <div className={styles.featureTitle}>{f.title}</div>
                  <div className={styles.featureDesc}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className={styles.howSection} id="how-it-works">
        <div className="container">
          <div className="text-center mb-5">
            <span className={styles.sectionBadge}>Simple Process</span>
            <h2 className={styles.sectionTitle}>How It Works</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8">
              <div className="d-flex flex-column gap-4">
                {STEPS.map(s => (
                  <div key={s.num} className="d-flex gap-4 align-items-start">
                    <div className={styles.stepNum}>{s.num}</div>
                    <div>
                      <div className={styles.stepTitle}>{s.title}</div>
                      <div className={styles.stepDesc}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <div className="container text-center">
          <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
          <p className={styles.ctaSub}>Get instant AI health insights for your whole family, completely free.</p>
          <Link to="/chat" className={styles.ctaBtn}>
            <i className="fa-solid fa-comment-medical" /> Start Your Consultation Now
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className="container">
          <p className="mb-2">
            <strong style={{ color: 'rgba(255,255,255,0.8)' }}>AI Health Assistant</strong>
          </p>
          <p>
            Built with React.js, Bootstrap 5, and LLaMA 3 via Groq API.<br />
            <span style={{ color: '#fbbf24' }}>Disclaimer:</span> This tool is for informational purposes only and is not a substitute for professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  )
}

/* ── Preview card (hero right column) ── */
function PreviewCard() {
  return (
    <div className={styles.previewCard}>
      <div className={styles.previewHeader}>
        <div className={styles.previewDots}>
          <span className={styles.dotRed} />
          <span className={styles.dotYellow} />
          <span className={styles.dotGreen} />
        </div>
        <span className={styles.previewTitle}>AI Health Assistant Chat</span>
        <div />
      </div>
      <div className={styles.previewBody}>
        <div className={`${styles.previewMsg} ${styles.previewBot}`}>
          Hello Rajesh! I am your AI Health Assistant. Please describe your symptoms so I can help you.
        </div>
        <div className={`${styles.previewMsg} ${styles.previewUser}`}>
          I have a bad headache and fever since yesterday.
        </div>
        <div className={styles.previewTyping}>
          <span /><span /><span />
        </div>
      </div>
    </div>
  )
}
