let keyIndex = 0;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method!== 'POST') return res.status(405).json({error: 'Method Not Allowed'});

  const { prompt } = req.body;
  const KEYS_STRING = process.env.GEMINI_API_KEYS;
  const API_KEYS = KEYS_STRING? KEYS_STRING.split(',') : [];

  if(API_KEYS.length === 0) return res.status(500).json({error: 'No API Keys configured'});

  for(let i = 0; i < API_KEYS.length; i++){
    const currentKey = API_KEYS[(keyIndex + i) % API_KEYS.length].trim();
    try {
      const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${currentKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] })
      });
      const data = await geminiRes.json();
      if (geminiRes.ok && data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        keyIndex = (keyIndex + i + 1) % API_KEYS.length;
        return res.status(200).json(data);
      }
    } catch (error) {}
  }
  res.status(429).json({ error: "All API Keys Quota Exceeded" });
}
