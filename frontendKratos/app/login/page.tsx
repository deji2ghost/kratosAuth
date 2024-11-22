"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { submitLogin } from '../api/login';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState(''); // email or username
  const [password, setPassword] = useState('');
  const [flowId, setFlowId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch the login flow from the server-side API
    const fetchLoginFlow = async () => {
      try {
        const response = await fetch('/api/getLoginFlow'); // Calls the server-side API
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch login flow');
        }

        setFlowId(data.id); // Save flow ID for login
        setIdentifier(data.email)
        setPassword(data.password)
      } catch (err) {
        console.error('Error initializing login flow:', err);
        setError('Failed to initialize login flow. Please try again.');
      }
    };

    fetchLoginFlow();
  }, []);

  // Handle login form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!flowId) {
      setError('Login flow not initialized. Please refresh the page.');
      return;
    }

    try {
      const baseUrl = process.env.NEXT_PUBLIC_KRATOS_BASE_URL;

      if (!baseUrl) {
        throw new Error('NEXT_PUBLIC_KRATOS_BASE_URL is not defined.');
      }

      // Use the submitLogin utility function
      await submitLogin(baseUrl, flowId, identifier, password);

      router.push('/'); // Redirect on successful login
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'An unexpected error occurred. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email or Username:
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
