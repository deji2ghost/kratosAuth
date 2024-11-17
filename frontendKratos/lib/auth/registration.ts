export default async function handler(req, res) {
  const ORY_BASE_URL = process.env.ORY_BASE_URL || "http://localhost:4434";

  if (req.method === "GET") {
    try {
      // Clean up headers to avoid bloating
      const filteredHeaders = {
        Cookie: req.headers.cookie || "", // Forward only cookies
      };

      const response = await axios.get(`${ORY_BASE_URL}/self-service/registration/browser`, {
        withCredentials: true,
        headers: filteredHeaders,
      });

      res.status(response.status).json(response.data);
    } catch (error) {
      console.error("Error creating registration flow:", error.response?.data || error.message);
      res.status(error.response?.status || 500).json(error.response?.data || { error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
