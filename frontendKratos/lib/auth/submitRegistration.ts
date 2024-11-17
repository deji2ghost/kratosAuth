import { startRegistrationFlow } from "./registration";

export const submitRegistration = async (formData: { email: string; password: string }) => {
    try {
      const flowId = await startRegistrationFlow(); // Ensure this works and returns a valid flow ID
      console.log(flowId)
  
      const registrationResponse = await fetch(`http://localhost:4434/self-service/registration?flow=${flowId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          method: 'password',
          password: formData.password,
          traits: {
            email: formData.email,
          },
        }),
      });
  
      if (registrationResponse.ok) {
        const result = await registrationResponse.json();
        console.log('Registration successful:', result);
      } else {
        const error = await registrationResponse.json();
        console.error('Registration failed:', error);
        throw new Error('Registration failed with details: ' + JSON.stringify(error, null, 2));
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  