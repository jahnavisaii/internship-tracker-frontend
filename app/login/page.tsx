'use client';
import { useState } from 'react';
import { login } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    console.log('Login clicked!');  // ← we will see this in console
    try {
      const data = await login({ email, password });
      console.log('Login response:', data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('name', data.name);
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem', width: '300px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem', width: '300px' }}
      />
      <button
        onClick={handleLogin}
        style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
      >
        Login
      </button>
      <p>No account? <a href="/register">Register here</a></p>
    </div>
  );
}