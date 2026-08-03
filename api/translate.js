export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-secret');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

  // නිෂ්පාදකයාගේ රහස් අංකය පරීක්ෂා කිරීම (Admin Secret Header)
  const clientSecret = req.headers['x-admin-secret'];
  const serverSecret = process.env.ADMIN_SECRET || 'kalpa123'; 
  const isAdmin = clientSecret === serverSecret;

  const KEYS_STRING = process.env.GEMINI_API_KEYS; 
  const API_KEYS = KEYS_STRING ? KEYS_STRING.split(',').map(k => k.trim()).filter(k => k.length > 0) : [];

  if (API_KEYS.length === 0) {
    return res.status(500).json({ error: 'Error: GEMINI_API_KEYS not found in Environment Variables' });
  }

  // Model ලැයිස්තුව (ඉහළ සිට පහළට)
  const MODELS = [
    'gemini-3.6-flash',
    'gemini-3.5-flash',
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash'
  ];

  let randomKeyIndex = Math.floor(Math.random() * API_KEYS.length);
  let errorLogs = [];

  // 1. ප්‍රධාන ලූපය: Model එකින් එක මාරු වන්නේ ඉහත සියලුම Keys අසාර්ථක වුවහොත් පමණි
  for (const modelName of MODELS) {
    
    // 2. අදාළ Model එක යටතේ ඇති සෑම API Key එකක්ම එකින් එක පරීක්ෂා කරයි
    for (let i = 0; i < API_KEYS.length; i++) {
      const currentKey = API_KEYS[(randomKeyIndex + i) % API_KEYS.length];
      
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
        
        // සාර්ථක ප්‍රතිචාරයක් ලැබුනොත් වහාම එය ආපසු යවයි
        if (geminiRes.ok && data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          return res.status(200).json({
            ...data,
            _debugInfo: isAdmin ? {
              activeModel: modelName,
              fallbackOccurred: modelName !== MODELS[0],
              errorsEncountered: errorLogs
            } : undefined
          });
        }
        
        let errReason = data.error?.message || 'Unknown error';
        errorLogs.push(`Model: ${modelName} | KeyIndex: ${(randomKeyIndex + i) % API_KEYS.length} | Error: ${errReason}`);
        
      } catch (error) {
        errorLogs.push(`Model: ${modelName} | Exception: ${error.message}`);
      }
    }
  }
  
  // සියලුම Models සහ සියලුම Keys අසාර්ථක වූ විට පමණක් මෙය ක්‍රියාත්මක වේ
  return res.status(429).json({ 
    error: "සියලුම API Models සහ Keys වල සීමාවන් ඉක්මවා ගොස් ඇත.",
    _debugInfo: isAdmin ? { errorsEncountered: errorLogs } : undefined
  });
}
