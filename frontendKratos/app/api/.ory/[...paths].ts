// Import necessary modules from @ory/integrations
import { config, createApiHandler } from "@ory/integrations/next-edge";

// Export the Ory configuration
export { config };

// Create and export the API handler that connects your Next.js app to Ory's APIs
export default createApiHandler({
  fallbackToPlayground: true,  // Allows fallback to the Ory Kratos Playground if needed
  dontUseTldForCookieDomain: true,  // Helps with setting up cookies during local development
});
