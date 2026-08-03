export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-secret');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

  const clientSecret = req.headers['x-admin-secret'];
  const serverSecret = process.env.ADMIN_SECRET || 'kalpa123'; 
  const isAdmin = clientSecret === serverSecret;

  const KEYS_STRING = process.env.GEMINI_API_KEYS; 
  const API_KEYS = KEYS_STRING ? KEYS_STRING.split(',').map(k => k.trim()).filter(k => k.length > 0) : [];

  if (API_KEYS.length === 0) {
    return res.status(500).json({ error: 'Error: GEMINI_API_KEYS not found in Environment Variables' });
  }

  const MODELS = [
    'gemini-3.6-flash',
    'gemini-3.5-flash',
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash'
  ];

  let randomKeyIndex = Math.floor(Math.random() * API_KEYS.length);
  let errorLogs = [];
  let deadKeys = new Set();

  for (const modelName of MODELS) {
    for (let i = 0; i < API_KEYS.length; i++) {
      const currentKeyIndex = (randomKeyIndex + i) % API_KEYS.length;
      const currentKey = API_KEYS[currentKeyIndex];
      
      try {
        const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${currentKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 2048 }
          })
        });
        
        const data = await geminiRes.json();
        
        if (geminiRes.ok && data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          const maskedKey = currentKey.length > 8 
            ? currentKey.substring(0, 4) + "..." + currentKey.substring(currentKey.length - 4) 
            : "********";

          return res.status(200).json({
            ...data,
            _debugInfo: isAdmin ? {
              activeModel: modelName,
              keyStatus: `Key #${currentKeyIndex + 1} of ${API_KEYS.length} (${maskedKey})`,
              deadKeysCount: deadKeys.size,
              deadKeysList: Array.from(deadKeys),
              fallbackOccurred: modelName !== MODELS[0],
              errorsEncountered: errorLogs
            } : undefined
          });
        }
        
        let errReason = data.error?.message || 'Unknown error';
        if (geminiRes.status === 429 || geminiRes.status === 400 || errReason.includes('API key not valid')) {
          deadKeys.add(`Key #${currentKeyIndex + 1}`);
        }

        errorLogs.push(`Model: ${modelName} | Key #${currentKeyIndex + 1} | Error: ${errReason}`);
        
      } catch (error) {
        errorLogs.push(`Model: ${modelName} | Exception: ${error.message}`);
      }
    }
  }
  
  return res.status(429).json({ 
    error: "සියලුම API Models සහ Keys වල සීමාවන් ඉක්මවා ගොස් ඇත.",
    _debugInfo: isAdmin ? { 
      deadKeysCount: deadKeys.size,
      deadKeysList: Array.from(deadKeys),
      errorsEncountered: errorLogs 
    } : undefined
  });
}
