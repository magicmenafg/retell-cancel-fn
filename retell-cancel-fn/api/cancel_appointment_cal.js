export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { booking_uid, reason } = req.body;
  if (!booking_uid) {
    return res.status(400).json({ error: "booking_uid is required" });
  }

  try {
    const response = await fetch(`https://api.cal.com/v1/bookings/${booking_uid}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${process.env.CALCOM_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ reason })
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}