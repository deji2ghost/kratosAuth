import type { NextApiRequest, NextApiResponse } from 'next';

const ORY_BASE_URL = process.env.ORY_BASE_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch the login flow from Ory Kratos
    const response = await fetch(`${ORY_BASE_URL}/self-service/login/browser`, {
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json({ error });
    }

    const data = await response.json();
    return res.status(200).json(data); // Send flow data to the client
  } catch (error) {
    console.error('Error fetching login flow:', error);
    return res.status(500).json({ error: 'Failed to fetch login flow' });
  }
}
