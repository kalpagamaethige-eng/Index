let keyIndex = 0; // ඊළඟ පාර පාවිච්චි කරන Key එක මතක තියාගන්න

export default async function handler(req, res) {
  // Browser එකෙන් Call කරන්න අවසර දෙනවා
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method!== 'POST') return res.status(405).json({error: 'Method Not Allowed'});

  const { prompt } = req.body;

  // ===============================================
  // !!! වැදගත් !!!
  // API KEYS ටික දාන්න ඕන Vercel > Settings > Environment Variables වලට
  // Variable Name: GEMINI_API_KEYS
  // Value: key1,key2,key3  <- මෙහෙම කොමා වලින්
  // Code එක ඇතුලේ Keys ලියන්න එපා
  // ===============================================
  const KEYS_STRING = process.env.GEMINI_API_KEYS; 
  const API_KEYS = KEYS_STRING? KEYS_STRING.split(',').map(k => k.trim()) : [];

  if(API_KEYS.length === 0) {
    return res.status(500).json({error: 'Error: GEMINI_API_KEYS not found in Vercel Environment Variables'});
  }

  // Keys ඔක්කොම එකින් එක Try කරනවා. Block උන එක Skip වෙනවා
  for(let i = 0; i < API_KEYS.length; i++){
    const currentKey = API_KEYS[(keyIndex + i) % API_KEYS.length];
    
    try {
      const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${currentKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 2048 }
        })
      });
      
      const data = await geminiRes.json();
      
      // හරියට Response ආවොත්
      if (geminiRes.ok && data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        keyIndex = (keyIndex + i + 1) % API_KEYS.length; // ඊළඟ පාර ඊළඟ Key එක
        return res.status(200).json(data);
      }
      
      // Quota ඉවර නම් Console එකේ Log කරනවා
      console.log(`Key ${i} Failed:`, data.error?.message);
      
    } catch (error) {
      console.log(`Key ${i} Exception:`, error.message);
    }
  }
  
  // ඔක්කොම Keys Fail උනා නම්
  return res.status(429).json({ error: "සියලුම API Keys වල Quota ඉවරයි. ටික වෙලාවකින් ආපහු උත්සාහ කරන්න." });
}
