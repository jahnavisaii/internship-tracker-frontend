'use client';
import { useState } from 'react';
import { login } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';
 
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --blue: #1A56DB; --blue-dark: #1040B0; --blue-bg: #EFF6FF;
    --gold: #F59E0B; --text: #0F172A; --muted: #64748B;
    --border: #E2E8F0; --surface: #F8FAFC; --white: #FFFFFF;
    --error: #EF4444;
  }
  body { font-family: 'DM Sans', sans-serif; }
 
  .login-wrapper {
    min-height: 100vh;
    display: flex;
    background: var(--white);
  }
 
  /* LEFT PANEL */
  .login-left {
    flex: 1;
    background: linear-gradient(135deg, #1A56DB 0%, #1040B0 60%, #0a2a7a 100%);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 3rem; color: white;
    position: relative; overflow: hidden;
  }
  .login-left::before {
    content: '';
    position: absolute; top: -100px; right: -100px;
    width: 400px; height: 400px; border-radius: 50%;
    background: rgba(255,255,255,0.05);
  }
  .login-left::after {
    content: '';
    position: absolute; bottom: -80px; left: -80px;
    width: 300px; height: 300px; border-radius: 50%;
    background: rgba(245,158,11,0.1);
  }
  .left-logo {
    font-family: 'Syne', sans-serif;
    font-size: 22px; font-weight: 800;
    display: flex; align-items: center; gap: 8px;
    margin-bottom: 3rem; position: relative; z-index: 1;
  }
  .left-logo .dot { width: 10px; height: 10px; border-radius: 50%; background: var(--gold); }
  .left-tagline {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 800; line-height: 1.2;
    margin-bottom: 1rem; position: relative; z-index: 1;
    max-width: 340px;
  }
  .left-tagline span { color: var(--gold); }
  .left-sub {
    font-size: 15px; color: rgba(255,255,255,0.7);
    line-height: 1.7; max-width: 320px;
    margin-bottom: 2.5rem; position: relative; z-index: 1;
  }
  .left-stats {
    display: flex; gap: 2rem;
    position: relative; z-index: 1;
  }
  .left-stat .num {
    font-family: 'Syne', sans-serif;
    font-size: 1.8rem; font-weight: 800; color: var(--gold);
  }
  .left-stat .lbl { font-size: 12px; color: rgba(255,255,255,0.6); }
 
  /* RIGHT PANEL */
  .login-right {
    flex: 1; display: flex;
    align-items: center; justify-content: center;
    padding: 2rem; background: var(--surface);
  }
  .login-card {
    background: var(--white);
    border-radius: 20px;
    border: 1px solid var(--border);
    padding: 2.5rem;
    width: 100%; max-width: 420px;
    box-shadow: 0 4px 32px rgba(0,0,0,0.06);
  }
  .card-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--blue-bg); color: var(--blue);
    font-size: 11px; font-weight: 600; letter-spacing: .06em;
    text-transform: uppercase; padding: 4px 12px;
    border-radius: 999px; margin-bottom: 1.2rem;
  }
  .card-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.8rem; font-weight: 800;
    color: var(--text); margin-bottom: 0.4rem;
    letter-spacing: -0.5px;
  }
  .card-sub { font-size: 14px; color: var(--muted); margin-bottom: 2rem; }
 
  .input-group { margin-bottom: 1.2rem; }
  .input-label {
    display: block; font-size: 13px;
    font-weight: 500; color: var(--text);
    margin-bottom: 6px;
  }
  .input-field {
    width: 100%; padding: 12px 16px;
    border: 1.5px solid var(--border);
    border-radius: 10px; font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    color: var(--text); background: var(--surface);
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
  }
  .input-field:focus {
    border-color: var(--blue);
    box-shadow: 0 0 0 3px rgba(26,86,219,0.1);
    background: var(--white);
  }
  .error-msg {
    background: #FEF2F2; border: 1px solid #FECACA;
    color: var(--error); border-radius: 8px;
    padding: 10px 14px; font-size: 13px;
    margin-bottom: 1.2rem;
  }
  .btn-login {
    width: 100%; padding: 13px;
    background: var(--blue); color: white;
    border: none; border-radius: 10px;
    font-size: 15px; font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer; transition: all 0.2s;
    margin-bottom: 1.2rem;
  }
  .btn-login:hover { background: var(--blue-dark); transform: translateY(-1px); }
  .btn-login:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
 
  .divider {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 1.2rem; color: var(--muted); font-size: 12px;
  }
  .divider::before, .divider::after {
    content: ''; flex: 1; height: 1px; background: var(--border);
  }
 
  .register-link {
    text-align: center; font-size: 14px; color: var(--muted);
  }
  .register-link a {
    color: var(--blue); font-weight: 500; text-decoration: none;
  }
  .register-link a:hover { text-decoration: underline; }
 
  @media (max-width: 768px) {
    .login-left { display: none; }
    .login-right { background: var(--white); }
  }
`;
 
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
 
  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await login({ email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('name', data.name);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
 
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin();
  };
 
  return (
    <>
      <style>{css}</style>
      <div className="login-wrapper">
 
        {/* LEFT PANEL */}
        <div className="login-left">
          <div className="left-logo">
            <span className="dot" />
            Internship Tracker
          </div>
          <h2 className="left-tagline">
            Land Your <span>Dream</span> Internship Faster
          </h2>
          <p className="left-sub">
            Track every application, manage deadlines, and visualise your pipeline — all in one smart dashboard built for VIT-AP students.
          </p>
          <div className="left-stats">
            <div className="left-stat">
              <div className="num">500+</div>
              <div className="lbl">Students</div>
            </div>
            <div className="left-stat">
              <div className="num">12k+</div>
              <div className="lbl">Applications</div>
            </div>
            <div className="left-stat">
              <div className="num">3x</div>
              <div className="lbl">More Offers</div>
            </div>
          </div>
        </div>
 
        {/* RIGHT PANEL */}
        <div className="login-right">
          <div className="login-card">
            <div className="card-badge">✦ VIT-AP University</div>
            <h1 className="card-title">Welcome back</h1>
            <p className="card-sub">Sign in to your account to continue tracking</p>
 
            {error && <div className="error-msg">⚠️ {error}</div>}
 
            <div className="input-group">
              <label className="input-label">Email address</label>
              <input
                className="input-field"
                type="email"
                placeholder="you@vitap.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
 
            <div className="input-group">
              <label className="input-label">Password</label>
              <input
                className="input-field"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
 
            <button
              className="btn-login"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in →'}
            </button>
 
            <div className="divider">or</div>
 
            <p className="register-link">
              Don't have an account? <a href="/register">Create one free</a>
            </p>
          </div>
        </div>
 
      </div>
    </>
  );
}
 