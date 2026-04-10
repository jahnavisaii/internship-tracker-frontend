'use client';
import { useState } from 'react';
import { register } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [regNo, setRegNo] = useState('');   // ← ADDED regNo
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      await register({ name, email, password, regNo }); // ← sends regNo
      router.push('/login');                             // ← go to login after register
    } catch (err) {
      setError('Registration failed');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem' }}
      />
      <input
        type="text"
        placeholder="Registration Number (e.g. 21BCE1234)"
        value={regNo}
        onChange={(e) => setRegNo(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem' }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem' }}
      />
      <button onClick={handleRegister} style={{ padding: '0.5rem 1rem' }}>
        Register
      </button>
      <p>Have account? <a href="/login">Login here</a></p>
    </div>
  );
}