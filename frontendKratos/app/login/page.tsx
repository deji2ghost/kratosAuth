"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState(''); // email or username
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Handle login form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Fetch the login flow ID from Kratos
      const flowResponse = await fetch('http://localhost:4434/self-service/login/browser', {
        credentials: 'include',
      });
      const flow = await flowResponse.json();

      // Submit the login request to Kratos
      const loginResponse = await fetch(`http://localhost:4434/self-service/login?flow=${flow.id}`, {
        method: 'POST',
        credentials: 'include', // include credentials for session handling
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'password', // method can vary depending on your Kratos setup
          password_identifier: identifier,
          password: password,
        }),
      });

      if (loginResponse.ok) {
        router.push('/'); // Redirect on successful login
      } else {
        const errData = await loginResponse.json();
        console.error('Login error:', errData);
      }
    } catch (err) {
      console.error('Error during login:', err);
    }
  };

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
