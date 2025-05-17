export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const googleWebhookUrl = "https://script.google.com/macros/s/AKfycbyrBggkfknPLl7TYr0QCnDhiJNj_qJXLYkFCoVHXWaiRNiSJ6Cobvi-FCBihFzyk405cQ/exec";
  
    try {
      const response = await fetch(googleWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body)
      });
  
      const text = await response.text();
      res.status(200).json({ result: text });
    } catch (error) {
      console.error("Proxy failed:", error);
      res.status(500).json({ error: "Google Sheets proxy failed" });
    }
  }