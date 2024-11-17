// pages/register.js
"use client"
import { useState } from "react";
import { Configuration, FrontendApi } from "@ory/client";

const ory = new FrontendApi(
  new Configuration({
    basePath: process.env.NEXT_PUBLIC_ORY_SDK_URL,
    baseOptions: {
      withCredentials: true,
    },
  })
);

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Create a new registration flow
      const { data: registrationFlow } = await ory.createBrowserRegistrationFlow();
  
      console.log("Registration Flow:", registrationFlow);
  
      // Step 2: Submit the registration data
      const response = await ory.updateRegistrationFlow({
        flow: registrationFlow.id, // Use the flow ID from the previous step
        updateRegistrationFlowBody: {
          method: "password", // Specify the registration method
          traits: { email }, // User's email (trait in identity schema)
          password, // User's password
        },
      });
  
      console.log("Registration Successful:", response.data);
      alert("Registration successful! Please check your email for confirmation.");
    } catch (error: any) {
      console.error("Registration Error:", error.response?.data || error.message);
      alert(error.response?.data?.error?.message || "An error occurred during registration.");
    }
  };
  

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
