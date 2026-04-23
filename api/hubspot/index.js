export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body;

    const response = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        properties: {
          firstname: body.name,
          email: body.email,
          phone: body.phone,
          city: body.location,
          budget: body.budget,
          message: body.requirement,
        },
      }),
    });

    const data = await response.json();

    // 🔥 ADD THIS (VERY IMPORTANT)
    console.log("HubSpot response:", data);

    // ❗ handle errors properly
    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Failed to send data" });
  }
}