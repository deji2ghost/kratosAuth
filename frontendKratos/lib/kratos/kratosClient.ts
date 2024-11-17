import { Configuration, SelfServiceRegistrationFlow, OryClient } from '@ory/client';

// Initialize Ory Kratos client
const kratosClient = new OryClient(new Configuration({
  basePath: process.env.KRATOS_API_URL || 'http://localhost:4434', // Kratos Public API endpoint
}));

// Initialize registration flow
export const initializeRegistrationFlow = async () => {
  try {
    const response = await kratosClient.selfService.initializeSelfServiceRegistrationFlowForBrowsers();
    return response.data;
  } catch (error) {
    console.error('Error initializing registration flow:', error);
    throw error;
  }
};

// Submit registration flow
export const submitRegistrationFlow = async (flowId: string, formData: any) => {
  try {
    const response = await kratosClient.selfService.submitSelfServiceRegistrationFlow(flowId, formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting registration flow:', error);
    throw error;
  }
};

export default kratosClient;
