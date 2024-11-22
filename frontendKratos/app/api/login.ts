// utils/login.ts
export const submitLogin = async (
    baseUrl: string,
    flowId: string,
    identifier: string,
    password: string
  ) => {
    try {
      const response = await fetch(`${baseUrl}/self-service/login?flow=${flowId}`, {
        method: 'POST',
        credentials: 'include', // Include credentials for session handling
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'password',
          password_identifier: identifier,
          password,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Login failed. Please try again.');
      }
  
      return response.json(); // Return response JSON on success
    } catch (err) {
      console.error('Error during login:', err);
      throw err; // Re-throw the error to handle it in the frontend
    }
  };
  