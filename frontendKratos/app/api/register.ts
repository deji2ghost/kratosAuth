// api/register.ts

import { DataProps } from "../registration/pageTypes";

export const initRegistrationFlow = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_KRATOS_BASE_URL}/self-service/registration/api`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to initialize registration flow");
      }
  
      const data = await response.json();
      return data; // Return flow data for use in the component
    } catch (error) {
      console.error("Error initializing registration flow:", error);
      throw error; // Let the component handle the error
    }
  };
  
  export const submitRegistration = async (flowId: string, registrationData: DataProps) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_KRATOS_BASE_URL}/self-service/registration?flow=${flowId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(registrationData),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error details:", errorData);
        throw new Error(
          errorData?.error?.message || "Registration failed for an unknown reason"
        );
      }
  
      return await response.json(); // Return success data
    } catch (error) {
      console.error("Error during registration submission:", error);
      throw error; // Let the component handle the error
    }
  };
  