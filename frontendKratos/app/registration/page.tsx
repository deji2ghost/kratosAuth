"use client";

import { useEffect, useState } from "react";
import { initRegistrationFlow, submitRegistration } from "../api/register";
import { DataProps } from "./pageTypes";

const RegistrationPage: React.FC = () => {
  const [flowId, setFlowId] = useState<string | null>(null);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const registrationFlow = async () => {
      try {
        const data = await initRegistrationFlow();
        setFlowId(data.id);
        // Extract CSRF token from UI nodes
        const csrfNode = data.ui?.nodes?.find(
          (n: { attributes: { name: string; value?: string } }) => n.attributes.name === "csrf_token"
        );
        setCsrfToken(csrfNode?.attributes.value || "");
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(`Failed to initialize registration flow: ${error.message}`);
        } else {
          setError("Failed to initialize registration flow due to an unknown error.");
        }
      } finally {
        setLoading(false); // End loading state
      }
    };

    registrationFlow();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!flowId) {
      setError("Registration flow is not properly initialized.");
      return;
    }

    const registrationData: DataProps = {
      csrf_token: csrfToken || "", // CSRF token is optional in some cases
      traits: { email: formData.email },
      password: formData.password,
    };

    try {
      const result = await submitRegistration(flowId, registrationData);
      alert("Registration successful! User ID: " + result.identity.id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || "Failed to register. Please try again.");
      } else {
        setError("An unknown error occurred. Please try again.");
      }
    }
  };

  if (loading) {
    return <p>Loading registration flow...</p>;
  }

  return (
    <div>
      <h1>Register</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {flowId ? (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
      ) : (
        <p>Error: Could not load the registration flow.</p>
      )}
    </div>
  );
};

export default RegistrationPage