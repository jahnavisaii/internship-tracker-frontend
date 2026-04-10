'use client';
 
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
 
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
 
  * { box-sizing: border-box; margin: 0; padding: 0; }
 
  :root {
    --blue:      #1A56DB;
    --blue-dark: #1040B0;
    --blue-bg:   #EFF6FF;
    --gold:      #F59E0B;
    --gold-bg:   #FFFBEB;
    --text:      #0F172A;
    --muted:     #64748B;
    --border:    #E2E8F0;
    --surface:   #F8FAFC;
    --white:     #FFFFFF;
  }
 
  body { font-family: 'DM Sans', sans-serif; color: var(--text); }
 
  .nav {
    position: sticky; top: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 5vw; height: 64px;
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800; font-size: 18px;
    color: var(--blue); letter-spacing: -0.5px;
    display: flex; align-items: center; gap: 8px;
    text-decoration: none; cursor: pointer;
  }
  .nav-logo .dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--gold); display: inline-block;
  }
  .nav-links { display: flex; align-items: center; gap: 28px; }
  .nav-links a {
    font-size: 14px; color: var(--muted);
    text-decoration: none; font-weight: 500;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--blue); }
  .btn-primary {
    background: var(--blue); color: white;
    padding: 8px 20px; border-radius: 8px;
    border: none; font-size: 14px; font-weight: 500;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: background 0.2s, transform 0.15s;
  }
  .btn-primary:hover { background: var(--blue-dark); transform: translateY(-1px); }
  .btn-outline {
    background: transparent; color: var(--blue);
    padding: 8px 20px; border-radius: 8px;
    border: 1.5px solid var(--blue); font-size: 14px;
    font-weight: 500; cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }
  .btn-outline:hover { background: var(--blue-bg); }
 
  .hero {
    min-height: 88vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center; padding: 5rem 5vw 4rem;
    background: var(--white);
    position: relative; overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; top: -120px; left: 50%;
    transform: translateX(-50%);
    width: 700px; height: 700px; border-radius: 50%;
    background: radial-gradient(circle, #DBEAFE 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--gold-bg); color: #92400E;
    border: 1px solid #FDE68A; border-radius: 999px;
    padding: 5px 14px; font-size: 12px; font-weight: 500;
    margin-bottom: 1.5rem; position: relative;
  }
  .hero-badge .pulse {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--gold); display: inline-block;
    animation: pulse 1.5s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }
  .hero h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.4rem, 6vw, 4rem);
    font-weight: 800; line-height: 1.1;
    letter-spacing: -1.5px; color: var(--text);
    max-width: 760px; margin-bottom: 1.25rem;
    position: relative;
  }
  .hero h1 .highlight {
    color: var(--blue);
    border-bottom: 3px solid var(--gold);
    padding-bottom: 2px;
  }
  .hero p {
    font-size: 1.1rem; color: var(--muted);
    max-width: 520px; line-height: 1.7;
    margin-bottom: 2.5rem; position: relative;
  }
  .hero-actions {
    display: flex; gap: 12px; flex-wrap: wrap;
    justify-content: center; position: relative;
  }
  .btn-hero {
    background: var(--blue); color: white;
    padding: 14px 32px; border-radius: 10px;
    border: none; font-size: 15px; font-weight: 500;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }
  .btn-hero:hover { background: var(--blue-dark); transform: translateY(-2px); }
  .btn-hero-ghost {
    background: transparent; color: var(--text);
    padding: 14px 32px; border-radius: 10px;
    border: 1.5px solid var(--border); font-size: 15px;
    font-weight: 500; cursor: pointer;
    font-family: 'DM Sans', sans-serif; transition: all 0.2s;
  }
  .btn-hero-ghost:hover { border-color: var(--blue); color: var(--blue); }
 
  .stats-bar {
    display: flex; justify-content: center;
    gap: 3rem; flex-wrap: wrap;
    padding: 2rem 5vw;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    background: var(--surface);
  }
  .stat-item { text-align: center; }
  .stat-item .num {
    font-family: 'Syne', sans-serif;
    font-size: 2rem; font-weight: 800; color: var(--blue);
  }
  .stat-item .lbl { font-size: 13px; color: var(--muted); margin-top: 2px; }
 
  .features { padding: 5rem 5vw; background: var(--white); }
  .section-tag {
    display: inline-block;
    background: var(--blue-bg); color: var(--blue);
    font-size: 12px; font-weight: 600; letter-spacing: .08em;
    text-transform: uppercase; padding: 4px 12px;
    border-radius: 999px; margin-bottom: 1rem;
  }
  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.6rem, 4vw, 2.4rem);
    font-weight: 800; letter-spacing: -0.5px;
    color: var(--text); margin-bottom: 0.75rem;
  }
  .section-sub {
    font-size: 1rem; color: var(--muted);
    max-width: 480px; line-height: 1.7;
    margin-bottom: 3rem;
  }
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }
  .feature-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 14px; padding: 1.5rem;
    transition: border-color 0.2s, transform 0.2s;
  }
  .feature-card:hover { border-color: var(--blue); transform: translateY(-3px); }
  .feature-icon {
    width: 44px; height: 44px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; margin-bottom: 1rem;
  }
  .feature-card h3 {
    font-family: 'Syne', sans-serif;
    font-size: 16px; font-weight: 700; margin-bottom: 6px;
  }
  .feature-card p { font-size: 13px; color: var(--muted); line-height: 1.6; }
 
  .how { padding: 5rem 5vw; background: var(--blue); color: white; }
  .how .section-title { color: white; }
  .how .section-sub { color: rgba(255,255,255,0.7); }
  .steps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 24px; margin-top: 3rem;
  }
  .step-card {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 14px; padding: 1.5rem;
  }
  .step-num {
    font-family: 'Syne', sans-serif;
    font-size: 2.5rem; font-weight: 800;
    color: rgba(255,255,255,0.2); margin-bottom: 0.5rem;
  }
  .step-card h3 { font-size: 16px; font-weight: 600; margin-bottom: 6px; }
  .step-card p { font-size: 13px; color: rgba(255,255,255,0.65); line-height: 1.6; }
 
  .cta {
    padding: 5rem 5vw; text-align: center;
    background: var(--surface);
    border-top: 1px solid var(--border);
  }
  .cta .section-title { margin-bottom: 0.75rem; }
  .cta p { color: var(--muted); font-size: 1rem; margin-bottom: 2rem; }
 
  .footer {
    padding: 1.5rem 5vw;
    border-top: 1px solid var(--border);
    display: flex; align-items: center;
    justify-content: space-between; flex-wrap: wrap; gap: 12px;
    font-size: 13px; color: var(--muted);
    background: var(--white);
  }
  .footer a { color: var(--blue); text-decoration: none; }
  .footer a:hover { text-decoration: underline; }
 
  @media (max-width: 640px) {
    .nav-links a { display: none; }
    .stats-bar { gap: 1.5rem; }
    .hero { padding: 3rem 5vw; }
  }
 
  .fade-in { opacity: 0; transform: translateY(24px); transition: opacity 0.55s ease, transform 0.55s ease; }
  .fade-in.visible { opacity: 1; transform: translateY(0); }
`;
 
const features = [
  { icon: "📋", bg: "#EFF6FF", title: "Application Tracker", desc: "Log every application with company, role, deadline, and status in seconds." },
  { icon: "📊", bg: "#F0FDF4", title: "Kanban Status Board", desc: "Visualize your pipeline — Applied → OA → Interview → Offer — at a glance." },
  { icon: "⏰", bg: "#FFFBEB", title: "Deadline Reminders", desc: "Color-coded urgency alerts so you never miss an application deadline again." },
  { icon: "📝", bg: "#FDF4FF", title: "Interview Notes", desc: "Store recruiter contacts, interview prep notes, and links per application." },
  { icon: "📤", bg: "#FFF1F2", title: "Export to CSV", desc: "Download all your applications as a spreadsheet for reporting or sharing." },
  { icon: "🔒", bg: "#F0FDF4", title: "Secure & Personal", desc: "Your data stays private with secure login — only you can see your applications." },
];
 
const steps = [
  { n: "01", title: "Sign up free", desc: "Create your account with your VIT-AP email in under a minute." },
  { n: "02", title: "Add applications", desc: "Log each internship you apply to with role, company, and deadline." },
  { n: "03", title: "Track your status", desc: "Move cards across the Kanban board as you progress through rounds." },
  { n: "04", title: "Land the offer", desc: "Stay organised, follow up on time, and convert applications to offers." },
];
 
export default function Home() {
  const router = useRouter();
  const fadeRefs = useRef<HTMLElement[]>([]);
 
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.15 }
    );
    fadeRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);
 
  const addRef = (el: HTMLElement | null) => {
    if (el && !fadeRefs.current.includes(el)) fadeRefs.current.push(el);
  };
 
  return (
    <>
      <style>{css}</style>
 
      {/* NAVBAR */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => router.push('/')}>
          <span className="dot" />
          Internship Tracker
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <button className="btn-outline" onClick={() => router.push('/login')}>Log in</button>
          <button className="btn-primary" onClick={() => router.push('/register')}>Sign up free</button>
        </div>
      </nav>
 
      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">
          <span className="pulse" />
          Built for VIT-AP University students
        </div>
        <h1>
          Track, Manage &amp; Land Your{" "}
          <span className="highlight">Dream Internship</span>
        </h1>
        <p>
          Stop losing track of applications in spreadsheets.
          One smart dashboard to manage every opportunity from first click to final offer.
        </p>
        <div className="hero-actions">
          <button className="btn-hero" onClick={() => router.push('/register')}>
            Get started free →
          </button>
          <button className="btn-hero-ghost" onClick={() => router.push('/dashboard')}>
            View dashboard
          </button>
        </div>
      </section>
 
      {/* STATS BAR */}
      <div className="stats-bar">
        {[
          { num: "500+", lbl: "Students using it" },
          { num: "12k+", lbl: "Applications tracked" },
          { num: "3x",   lbl: "More offers landed" },
          { num: "100%", lbl: "Free to use" },
        ].map((s) => (
          <div className="stat-item" key={s.lbl}>
            <div className="num">{s.num}</div>
            <div className="lbl">{s.lbl}</div>
          </div>
        ))}
      </div>
 
      {/* FEATURES */}
      <section className="features" id="features">
        <div ref={addRef as any} className="fade-in">
          <span className="section-tag">Features</span>
          <h2 className="section-title">Everything you need to stay on top</h2>
          <p className="section-sub">
            All the tools to manage your internship hunt — from first application to offer letter.
          </p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div
              className="feature-card fade-in"
              key={f.title}
              ref={addRef as any}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="feature-icon" style={{ background: f.bg }}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
 
      {/* HOW IT WORKS */}
      <section className="how" id="how">
        <div ref={addRef as any} className="fade-in">
          <span className="section-tag" style={{ background: "rgba(255,255,255,0.15)", color: "white" }}>
            How it works
          </span>
          <h2 className="section-title">From zero to offer in 4 steps</h2>
          <p className="section-sub">Simple enough to start in 2 minutes, powerful enough to manage 50+ applications.</p>
        </div>
        <div className="steps-grid">
          {steps.map((s, i) => (
            <div className="step-card fade-in" key={s.n} ref={addRef as any} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="step-num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
 
      {/* CTA */}
      <section className="cta">
        <div ref={addRef as any} className="fade-in">
          <span className="section-tag">Get started</span>
          <h2 className="section-title">Ready to land your dream internship?</h2>
          <p>Join hundreds of VIT-AP students already tracking smarter.</p>
          <button className="btn-hero" onClick={() => router.push('/register')}>
            Create free account →
          </button>
        </div>
      </section>
 
      {/* FOOTER */}
      <footer className="footer">
        <span>Built by <strong>Jahnavi</strong> · VIT-AP University · 2025</span>
        <div style={{ display: "flex", gap: "20px" }}>
          <a href="https://github.com/yourusername" target="_blank" rel="noreferrer">GitHub</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/login">Login</a>
        </div>
      </footer>
    </>
  );
}
 