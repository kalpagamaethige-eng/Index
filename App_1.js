import React, { useState, useEffect, useRef } from 'react';
import {
Languages,
Mic,
MicOff,
Volume2,
BookOpen,
BarChart3,
Settings,
Sparkles,
RefreshCw,
Search,
BrainCircuit,
ChevronRight,
Info,
HelpCircle,
Award,
Lock,
Unlock,
Hourglass,
Zap,
Trash2,
ClipboardPaste,
Bookmark,
Rocket,
Edit3,
Moon,
X,
Sliders,
Cpu,
Filter,
Star,
Share2,
Copy
} from 'lucide-react';
// ==========================================
// 1. CONFIGURATION & KEYS (Api_Config.js)
// ==========================================
const ENCODED_KEYS = [
"QVEuQWI4Uk42SnhMUGlHS1BrazljakE2ajNIaDhjT01lTXktMHlIeU5TZkZwZk5JWV9SaGcK",
"CkFRLkFiOFJONktBTTQxUGkwem9XRXVHSHFRRlpkWmFBSlJiTzJyQVpRNnN2QWRxdkhyby1B",
"CkFRLkFiOFJONktGQWFNYkxRandEdjNKcHRMZld0a1pOZ2s2YXx4Qmo4amxkUGJTMHFVR29B",
"QVEuQWI4Uk42TDhpcWxDa2JyY1lRZXNxdkFiOWI3bHhMSDBhcW1fdnJiX0F3SWdkMHNRencKCgo",
"QVEuQWI4Uk42SzVMWHowWFJPMmtTbE9RTWZXa1hiQWZFMTBTa2l3Y0gwZUpSb1ZSSDlQTmcKCgoKCgo",
"QVEuQWI4Uk42SW05ekNzNkhfanFsN19kR0Y3RUFLU2gwT0ONpZFA3UWl1TklyUFo0dXhCLWc",
"QVEuQWI4Uk42TDFaMk5Qcl9MNk9qNlJlSUNJWjZsektzQy1ISU5NNHlVUHM1TlBrdFNHc3c",
"QVEuQWI4Uk42Sk9ObnBuc3Y3Q2JKc3EtSFdBZGtoQ0VmQkZpeHMwdzZRNmY0Qkd2N2ZLMGcK",
"QVEuQWI4Uk42THF0aC14UkswbG9mMU9rczMyWlFVaGtnc0pyNGZSRlFxLVlMZEJ4dk1jancKCg",
"QVEuQWI4Uk42TGVWUm02R19PXzh0VU1Ed3hmSEJXN1QyYmUwRFE3WGJpb3kxbzJ0SDVqSkEKCg",
"QVEuQWI4Uk42SWF6QWhySlczQVpRRG56elVDaFRsZWdFNkdLaGJaMXBIVk9yQ1NyRFZvb0E",
"QVEuQWI4Uk42TDc0cHBMLWlvWWpHd2ZrOVVlWkdQUGw1UTd2N3J3cGIwTy02VVlsRmVCY3cK",
"QVEuQWI4Uk42SWlWMVh1d1NzZzJfcEhkeGFIMVlmMFN2cjF6YTRyV280OWQzemQ4TmhQbncKCgoK",
"QVEuQWI4Uk42S1owQlNuTGpwNzE2NzFHOTVmUDZCNmpNYlVyZGpBeFBZVzR3Vm90ZFNXVkEKCgoKCgo",
"QVEuQWI4Uk42S3Y1NVVNUmJDdC1RTmFjWVIxTmFSaXpUa1RqbDNLUERZRUN6bmNjN3NVN2cKCgoKCgoK",
"QVEuQWI4Uk42TEdaREE0RGdFSEtmQmVXQ0VabXFhOGc3QWJCTkFmRGpPb3pQY2VENFhRb0EKCgoKCgo",
"QVEuQWI4Uk42SlRNYnZRcEZzZEM3OENFd19sVGZUZXlLeXU0RFVwa2pyRkRtTVRtN280T3cKCgoKCgoK",
"QVEuQWI4Uk42TC1QZDZfMFVlRXA0QnloUWtwR0NycTZ5bWMxdy0zWjFDUEZocWtlbXlEMHcKCgoKCgoK",
"QVEuQWI4Uk42SkZpMjF5aWd0TDM1aGZGV0thcWhaYTZjNUEzZjRybDFna0VHTkZOQjFfUHcKCgoKCgoK",
"QVEuQWI4Uk42TDhYYTdyV0o3OXdvV0lWQmNBNl_PbmhhNjdNUjBhXzRNbkRFbmpnaVY5ZWcKCgoKCgoKCgoKCg",
"QVEuQWI4Uk42SkV1UmJrUS13REtSSlRzOEJ5Z0hDdjEwVndESVlmeTBJMGRCMEN5RnRrbkEKCgoKCgoKCgoKCg",
"QVEuQWI4Uk42TFZNVm5OR25JMWdBZ0RMOVdiUkk5dXVVbXFSS0lkWTcxaDJod3M0bDlEZ1EKCgoKCgoKCgoK",
"QVEuQWI4Uk42SXlkV2dodHFheG5RSWl6TGpTbWNNME92dVlQY1hQbVlvLXJReU5HU3BaMVEKCgoKCgoKCgoKCgo",
"QVEuQWI4Uk42THhlWm5zb0JuTXgtTWNEdTFTeWlUUk50aFlDX0xZQTJsdFp0eXZCbUV5MncKCgoKCgoKCgoKCg",
"QVEuQWI4Uk42TDBYb0xNdTFzbEV2Y1VpWEVhWTJacUViaklZdmZKRDNneks4eFdVMTZEZ3cKCgoKCgoKCgoK",
"QVEuQWI4Uk42SlltSkRHdlXTaUllY3lw_uVIR292aS1lY081dnUwdGdOcWhfX3BhendaNWcKCgoKCgoKCgoK",
"QVEuQWI4Uk42STUyLUlIRTZfV1JJQm5jVHdmez1udWFwS0hwS01obGgxaDVPVzB1YlRmWHcKCgoKCgoKCgoK",
"QVEuQWI4Uk42TFB5eTFtMnF6NnZwc1pWX0toaEd3MktKYTNENFc2U1NKdGo5NUQ4cXdpd0EK",
"CkFRLkFiOFJONkxQeXkxbTJxejZ2cHNaVl9LaGhHdzJLSmEzRDRXNlNTSnRqOTVEOHF3aXdBCg",
"QVEuQWI4Uk42SXRPQWY0ck9nbkFLWWh5aHJOQnZQcnMwaUVzd3hjeGNFdWkzM3ExWG1GMnc"
];
const DEFAULT_SYSTEM_PROMPT = `You are an expert bilingual English-Sinhala AI teacher and translator.
Your responsibilities:
1. Translate English ↔ Sinhala accurately.
2. Correct grammar mistakes and awkward phrasing in the user's input. Highlight and explain grammar mistakes.
3. STRICT PASSIVE VOICE RULE: When converting or generating Passive Voice, strictly ensure the grammatical Object of the active sentence becomes the new Subject, with correct form of 'to be' + V3, and the original subject appropriately introduced using 'by' if needed, maintaining absolute structural accuracy.
4. ALWAYS identify and specify the Grammatical Tense & Time Category in both English and Sinhala.
5. Provide a clear Main Translation highlighted in both English and Sinhala format: [EN_TEXT] || [SI_TEXT].
6. Break down sentence structure clearly (Identify: 1. Subject / උක්තය, 2. Verb / ක්‍රියාපදය, 3. Object / කර්මය, 4. Modifiers/Other / වෙනත් කොටස්).
7. ALWAYS end your explanation with 1 engaging practice question in Sinhala under the heading "### 💬 අභ්‍යාස ප්‍රශ්නය (Practice Question)".
Format your responses neatly with clear headings:
🇱🇰 ප්‍රධාන පරිවර්තනය (Main Translation)
[EN_TEXT] || [SI_TEXT]
⌛ කාලය සහ ව්‍යාකරණ (Tense & Grammar)
 English Tense: [Specific Tense Name]
 Sinhala Tense: [සිංහල කාලය]
 Verb Classification: [V1/V2/V3 status if applicable]
✍️ නිවැරදි කළ වාක්‍යය (Corrected Sentence)
🧩 වාක්‍ය ව්‍යුහය විශ්ලේෂණය (Sentence Breakdown)
1. උක්ත පදය (Subject): ...
2. ක්‍රියා පදය (Verb): ...
3. කර්ම පදය (Object): ...
4. අනෙකුත් කොටස් (Modifiers/Other): ...
📖 ව්‍යාකරණ පැහැදිලි කිරීම සහ පිළිතුර (Grammar & Answer)
💡 සමාන වාක්‍ය සහ උදාහරණ (Similar Sentences & Examples)
💬 අභ්‍යාස ප්‍රශ්නය (Practice Question)
[Write 1 engaging practice sentence or question here for the student to test their knowledge]`;
const isKeyBlocked = (index) => {
const blockedTime = localStorage.getItem(⁠blocked_key_${index}⁠);
if (!blockedTime) return false;
const now = new Date().getTime();
if (now - parseInt(blockedTime, 10) > 86400000) {
localStorage.removeItem(⁠blocked_key_${index}⁠);
return false;
}
return true;
};
const blockKey = (index) => {
const now = new Date().getTime();
localStorage.setItem(⁠blocked_key_${index}⁠, now.toString());
};
const getValidKeyIndex = () => {
for (let i = 0; i < ENCODED_KEYS.length; i++) {
if (!isKeyBlocked(i)) {
const encoded = ENCODED_KEYS[i];
if (encoded && !encoded.includes("YOUR_")) {
return i;
}
}
}
return -1;
};
const getActiveApiKey = (index) => {
try {
const encodedKey = ENCODED_KEYS[index];
if (!encodedKey || encodedKey.includes("YOUR_")) return "";
return atob(encodedKey.trim());
} catch (e) {
return "";
}
};
const askGeminiService = async (promptText, customSystemPrompt = null) => {
let attempts = 0;
let collectedErrors = [];
const maxAttempts = ENCODED_KEYS.length;
const activeSystemPrompt = customSystemPrompt || DEFAULT_SYSTEM_PROMPT;
while (attempts < maxAttempts) {
let currentIndex = getValidKeyIndex();
if (currentIndex === -1) {
collectedErrors.push("All custom encoded API keys are currently rate-limited/blocked.");
break;
}
const currentApiKey = getActiveApiKey(currentIndex);
if (!currentApiKey) {
blockKey(currentIndex);
attempts++;
continue;
}
const url = ⁠https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${currentApiKey}⁠;
const payload = {
contents: [{ role: "user", parts: [{ text: promptText }] }],
systemInstruction: { parts: [{ text: activeSystemPrompt }] }
};
try {
const response = await fetch(url, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(payload)
});
const data = await response.json();
if (response.status === 429 || response.status === 403) {
const rateMsg = data.error?.message || "Rate limit exceeded";
collectedErrors.push(⁠Key [${currentIndex + 1}] (Status ${response.status}):${rateMsg}⁠);
blockKey(currentIndex);
attempts++;
continue;
}
if (!response.ok) {
const errDetails = data.error?.message || 'Request failed';
collectedErrors.push(⁠Key [${currentIndex + 1}] (Status ${response.status}):${errDetails}⁠);
blockKey(currentIndex);
attempts++;
continue;
}
const textOut = data.candidates?.[0]?.content?.parts?.[0]?.text;
if (textOut) {
return { text: textOut, error: null };
} else {
collectedErrors.push(⁠Key [${currentIndex + 1}]: Invalid response structure.⁠);
blockKey(currentIndex);
attempts++;
}
} catch (error) {
collectedErrors.push(⁠Key [${currentIndex + 1}]: Network Error (${error.message})⁠);
blockKey(currentIndex);
attempts++;
}
}
try {
const envApiKey = "";
const url = ⁠https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${envApiKey}⁠;
const payload = {
contents: [{ role: "user", parts: [{ text: promptText }] }],
systemInstruction: { parts: [{ text: activeSystemPrompt }] }
};
const response = await fetch(url, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(payload)
});
const data = await response.json();
const textOut = data.candidates?.[0]?.content?.parts?.[0]?.text;
if (textOut) {
return { text: textOut, error: null };
}
} catch (fallbackErr) {
collectedErrors.push(⁠Fallback Env Key: ${fallbackErr.message}⁠);
}
return { text: null, error: collectedErrors.join('\n') };
};
const speakBilingual = (enText, siText) => {
if (!('speechSynthesis' in window)) {
alert("ඔබගේ Browser එකෙහි Voice/Speech පහසුකම සහය නොදක්වයි.");
return;
}
window.speechSynthesis.cancel();
const cleanForSpeech = (str) => {
if (!str) return "";
return str
.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}🇬🇧🇱🇰]/gu, '')
.replace(/[*_#`~|[](){}]/g, ' ')
.replace(/[.-–—:=+?/\<>]/g, ' ')
.replace(/\s+/g, ' ')
.trim();
};
const cleanEn = cleanForSpeech(enText);
const cleanSi = cleanForSpeech(siText);
if (cleanEn) {
const enUtterance = new SpeechSynthesisUtterance(cleanEn);
enUtterance.lang = 'en-US';
enUtterance.rate = 0.9;
let siTriggered = false;
const triggerSinhalaSpeech = () => {
if (siTriggered) return;
siTriggered = true;
if (cleanSi) {
setTimeout(() => {
window.speechSynthesis.cancel();
const siUtterance = new SpeechSynthesisUtterance(cleanSi);
siUtterance.lang = 'si-LK';
siUtterance.rate = 0.9;
window.speechSynthesis.speak(siUtterance);
}, 150);
}
};
enUtterance.onend = triggerSinhalaSpeech;
enUtterance.onerror = (e) => {
triggerSinhalaSpeech();
};
window.speechSynthesis.speak(enUtterance);
} else if (cleanSi) {
const siUtterance = new SpeechSynthesisUtterance(cleanSi);
siUtterance.lang = 'si-LK';
siUtterance.rate = 0.9;
window.speechSynthesis.speak(siUtterance);
}
};
const saveToHistory = (input, output) => {
try {
const existing = JSON.parse(localStorage.getItem('app_translation_history') || '[]');
const newItem = { id: Date.now(), input, output, time: new Date().toLocaleTimeString() };
const updated = [newItem, ...existing.filter(item => item.input !== input)].slice(0, 20);
localStorage.setItem('app_translation_history', JSON.stringify(updated));
} catch (e) {
console.error(e);
}
};
const saveToFavorites = (input, output) => {
try {
const existing = JSON.parse(localStorage.getItem('app_translation_favorites') || '[]');
if (existing.some(item => item.input === input)) return false;
const newItem = { id: Date.now(), input, output };
localStorage.setItem('app_translation_favorites', JSON.stringify([newItem, ...existing]));
return true;
} catch (e) {
console.error(e);
return false;
}
};
const ScreenBox = ({ title, icon: Icon, children, badge, color = "sky", className = "" }) => {
const colorMap = {
sky: "border-sky-500/30 bg-sky-500/5 text-sky-400",
emerald: "border-emerald-500/30 bg-emerald-500/5 text-emerald-400",
amber: "border-amber-500/30 bg-amber-500/5 text-amber-400",
purple: "border-purple-500/30 bg-purple-500/5 text-purple-400",
blue: "border-blue-500/30 bg-blue-500/5 text-blue-400",
};
return (
<div className={⁠rounded-xl border border-slate-800 bg-slate-900/90 p-3.5 sm:p-4 backdrop-blur-sm shadow-xl transition-all duration-200 ${className}⁠}>
{title && (
<div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800/80">
<div className="flex items-center gap-2">
{Icon && (
<div className={⁠p-1.5 rounded-lg border ${colorMap[color] || colorMap.sky}⁠}>
<Icon size={16} />
</div>
)}
<h3 className="font-semibold text-slate-100 text-xs sm:text-sm tracking-wide">{title}</h3>
</div>
{badge && (
<span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-sky-300 border border-slate-700">
{badge}
</span>
)}
</div>
)}
<div className="text-slate-200">{children}</div>
</div>
);
};
const FormattedMarkdownOutput = ({ text }) => {
if (!text) return null;
const lines = text.split('\n');
const elements = [];
lines.forEach((line, idx) => {
const trimmed = line.trim();
if (!trimmed) return;
if (/^[-*_]{3,}$/.test(trimmed)) {
elements.push(<div key={idx} className="my-6 sm:my-8 h-4" />);
return;
}
if (trimmed.includes('||')) {
const parts = trimmed.split('||');
const cleanEn = parts[0].replace(/[EN_TEXT]|**/g, '').trim();
const cleanSi = parts[1].replace(/[SI_TEXT]|**/g, '').trim();
elements.push(
<div key={idx} className="my-5 sm:my-6 p-3.5 sm:p-4 rounded-xl border border-sky-400/40 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 shadow-lg flex items-center justify-between gap-3">
<div className="space-y-1 flex-1">
<div className="text-sm sm:text-base font-semibold text-slate-100 flex items-center gap-2">
<span>🇬🇧</span>
<span>{cleanEn}</span>
</div>
<div className="text-sm sm:text-base font-semibold text-amber-300 flex items-center gap-2">
<span>🇱🇰</span>
<span>{cleanSi}</span>
</div>
</div>
<button
onClick={() => speakBilingual(cleanEn, cleanSi)}
title="ශ්‍රවණය කරන්න"
className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-sky-500/30 transition-transform active:scale-95 touch-manipulation"
>
<Volume2 size={18} />
</button>
</div>
);
return;
}
if (trimmed.includes('කාලය සහ ව්‍යාකරණ') || trimmed.includes('Tense & Grammar')) {
const title = trimmed.replace(/^#+\s*/, '').replace(/**/g, '').trim();
const displayTitle = title.includes('⌛') || title.includes('⏳') ? title : ⁠⌛ ${title}⁠;
elements.push(
<div key={idx} className="mt-7 sm:mt-8 mb-4 px-3 py-1.5 rounded-lg bg-slate-800 text-sky-400 font-bold text-xs sm:text-sm tracking-wide shadow-sm border border-slate-700">
<span>{displayTitle}</span>
</div>
);
return;
}
if (trimmed.startsWith('###') || trimmed.startsWith('##')) {
const title = trimmed.replace(/^#+\s*/, '').replace(/**/g, '').trim();
elements.push(
<div key={idx} className="mt-7 sm:mt-8 mb-4 px-3 py-1.5 rounded-lg bg-slate-800 text-sky-400 font-bold text-xs sm:text-sm tracking-wide shadow-sm border border-slate-700">
{title}
</div>
);
return;
}
if (trimmed.includes('නිවැරදි කළ වාක්‍යය') || trimmed.includes('Corrected Sentence')) {
elements.push(
<div key={idx} className="my-3 p-3 rounded-xl bg-red-950/20 border border-red-500/40 text-xs sm:text-sm text-slate-200">
<span className="text-red-400 font-bold block mb-1">⚠️ වැරදි කොටස් ඉස්මතු කර ඇත:</span>
<span dangerouslySetInnerHTML={{ __html: trimmed.replace(/**(.*?)**/g, '<strong class="text-red-400 underline decoration-red-500 font-semibold">$1</strong>') }} />
</div>
);
return;
}
if (/^\d+.\s*/.test(trimmed)) {
const match = trimmed.match(/^(\d+.)\s*(.)/);
if (match) {
const num = match[1];
const rest = match[2];
elements.push(
<div key={idx} className="ml-1 my-2 text-xs sm:text-sm text-slate-200 flex items-start gap-2 leading-relaxed">
<span className="text-sky-400 font-bold mt-0.5 shrink-0">{num}</span>
<span dangerouslySetInnerHTML={{ __html: rest.replace(/**(.?)**/g, '<strong class="text-sky-300 font-semibold">$1</strong>') }} />
</div>
);
return;
}
}
if (trimmed.startsWith('- *') || trimmed.startsWith(' **') || trimmed.startsWith('•') || trimmed.startsWith('-')) {
const formattedContent = trimmed.replace(/^[-•]\s/, '');
elements.push(
<div key={idx} className="ml-1 my-2 text-xs sm:text-sm text-slate-200 flex items-start gap-2 leading-relaxed">
<span className="text-sky-400 mt-1 shrink-0">•</span>
<span dangerouslySetInnerHTML={{ __html: formattedContent.replace(/**(.*?)**/g, '<strong class="text-sky-300 font-semibold">$1</strong>') }} />
</div>
);
return;
}
elements.push(
<p
key={idx}
className="my-2 text-xs sm:text-sm text-slate-300 leading-relaxed"
dangerouslySetInnerHTML={{ __html: trimmed.replace(/**(.*?)**/g, '<strong class="text-sky-300 font-semibold">$1</strong>') }}
/>
);
});
return <div className="space-y-1.5">{elements}</div>;
};
const SettingsModal = ({ onClose, onSelectHistoryItem, darkMode, setDarkMode, errorLogs }) => {
const [activeSubTab, setActiveSubTab] = useState('settings');
const [adminPin, setAdminPin] = useState('');
const [adminUnlocked, setAdminUnlocked] = useState(false);
const [historyItems, setHistoryItems] = useState([]);
const [favoriteItems, setFavoriteItems] = useState([]);
useEffect(() => {
try {
setHistoryItems(JSON.parse(localStorage.getItem('app_translation_history') || '[]'));
setFavoriteItems(JSON.parse(localStorage.getItem('app_translation_favorites') || '[]'));
} catch (e) {
console.error(e);
}
}, []);
const clearHistory = () => {
localStorage.removeItem('app_translation_history');
setHistoryItems([]);
};
return (
<div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
<div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-4 sm:p-5 shadow-2xl space-y-3.5 text-slate-200 max-h-[90vh] flex flex-col">
<div className="flex items-center justify-between border-b border-slate-800 pb-2.5 shrink-0">
<div className="flex items-center gap-2 text-sky-400 font-bold text-sm sm:text-base">
<Settings size={18} />
<span>⚙️ යෙදුම් සැකසුම්</span>
</div>
<button onClick={onClose} className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white">
<X size={18} />
</button>
</div>
<div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between shrink-0">
<div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200">
<Moon size={16} className="text-amber-400" />
<span>රාත්‍රී ප්‍රකාරය (Dark Mode)</span>
</div>
<button
onClick={() => setDarkMode(!darkMode)}
className={⁠w-11 h-6 rounded-full transition-colors relative p-0.5 ${darkMode ? 'bg-sky-500' : 'bg-slate-700'}⁠}
>
<div className={⁠w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${darkMode ? 'translate-x-5' : 'translate-x-0'}⁠} />
</button>
</div>
<div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-medium shrink-0">
<button
onClick={() => setActiveSubTab('settings')}
className={⁠py-1.5 rounded-lg transition-all ${activeSubTab === 'settings' ? 'bg-sky-500 text-white font-bold' : 'text-slate-400 hover:text-slate-200'}⁠}
>
සැකසුම්
</button>
<button
onClick={() => setActiveSubTab('history')}
className={⁠py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 ${activeSubTab === 'history' ? 'bg-sky-500 text-white font-bold' : 'text-slate-400 hover:text-slate-200'}⁠}
>
<span>📜</span> ඉතිහාසය
</button>
<button
onClick={() => setActiveSubTab('favorites')}
className={⁠py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 ${activeSubTab === 'favorites' ? 'bg-sky-500 text-white font-bold' : 'text-slate-400 hover:text-slate-200'}⁠}
>
<span>⭐</span> ප්‍රියතම
</button>
</div>
<div className="overflow-y-auto flex-1 pr-1 space-y-3">
{activeSubTab === 'settings' && (
<div className="space-y-3 pt-1">
<button
onClick={clearHistory}
className="w-full bg-red-950/40 hover:bg-red-900/50 border border-red-800/60 text-red-300 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
>
<Trash2 size={15} />
<span>🗑️ ඉතිහාසය හිස් කරන්න</span>
</button>
<div className="border-t border-slate-800 pt-3 space-y-2">
<label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
<Lock size={14} className="text-amber-400" />
<span>🔒 Admin Developer Panel</span>
</label>
{!adminUnlocked ? (
<div className="flex gap-2">
<input
type="password"
placeholder="Admin Password එක ලියන්න..."
value={adminPin}
onChange={(e) => setAdminPin(e.target.value)}
className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
/>
<button
onClick={() => {
if (adminPin === '1979') setAdminUnlocked(true);
else alert('❌ මුරපදය වැරදියි!');
}}
className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold px-3 py-2 rounded-lg"
>
Unlock
</button>
</div>
) : (
<div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-xs">
<div className="flex items-center justify-between text-emerald-400 font-bold">
<span>Developer Logs (PIN 1979 Verified)</span>
<Unlock size={14} />
</div>
<div className="max-h-32 overflow-y-auto bg-black p-2 rounded text-red-300 font-mono text-[11px] whitespace-pre-wrap">
{errorLogs || "දැනට දෝෂ වාර්තා වී නොමැත."}
</div>
</div>
)}
</div>
</div>
)}
{activeSubTab === 'history' && (
<div className="space-y-2">
{historyItems.length === 0 ? (
<p className="text-center text-xs text-slate-500 py-6">ඉතිහාස සටහන් කිසිවක් නැත.</p>
) : (
historyItems.map((item) => (
<div
key={item.id}
onClick={() => { onSelectHistoryItem(item.input, item.output); onClose(); }}
className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 hover:border-sky-500/50 cursor-pointer transition-colors space-y-1"
>
<p className="text-xs font-semibold text-slate-200 line-clamp-1">{item.input}</p>
<span className="text-[10px] text-slate-500 block">{item.time}</span>
</div>
))
)}
</div>
)}
{activeSubTab === 'favorites' && (
<div className="space-y-2">
{favoriteItems.length === 0 ? (
<p className="text-center text-xs text-slate-500 py-6">සුරැකූ ප්‍රියතම වාක්‍ය කිසිවක් නැත.</p>
) : (
favoriteItems.map((item) => (
<div
key={item.id}
onClick={() => { onSelectHistoryItem(item.input, item.output); onClose(); }}
className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-colors space-y-1"
>
<p className="text-xs font-semibold text-amber-300 line-clamp-1">⭐ {item.input}</p>
</div>
))
)}
</div>
)}
</div>
</div>
</div>
);
};
const AdvancedToolsModal = ({ onClose, onSelectTool }) => {
const tools = [
{
id: 'grammar',
icon: Edit3,
label: 'Grammar Fix Only',
desc: 'පරිවර්තනය නොකර ව්‍යාකරණ පමණක් නිවැරදි කරන්න',
promptPrefix: 'Fix and correct the English grammar for this text without translating it. Point out the tense and mistakes in Sinhala: '
},
{
id: 'improve',
icon: Sparkles,
label: 'Improve Writing',
desc: 'වඩාත් ස්වාභාවික හා වෘත්තීය ලෙස වාක්‍යය නැවත සකසන්න',
promptPrefix: 'Improve and rewrite this English text to make it sound natural, professional, and grammatically perfect. Explain tense and changes in Sinhala: '
},
{
id: 'meaning',
icon: BookOpen,
label: 'Word Meaning',
desc: 'වචන වල අර්ථ, සමාන පද සහ විග්‍රහයන් ලබා ගන්න',
promptPrefix: 'Provide detailed word meanings, definitions, verb tense/type (V1/V2/V3), synonyms, and Sinhala explanation for: '
}
];
return (
<div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
<div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-4 sm:p-5 shadow-2xl space-y-3.5">
<div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
<div className="flex items-center gap-2 text-sky-400 font-bold text-sm sm:text-base">
<Rocket size={18} />
<span>🚀 Advanced Tools</span>
</div>
<button onClick={onClose} className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white">
<X size={18} />
</button>
</div>
<div className="space-y-2">
{tools.map((t) => {
const Icon = t.icon;
return (
<button
key={t.id}
onClick={() => { onSelectTool(t.promptPrefix); onClose(); }}
className="w-full bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/50 p-3 rounded-xl text-left transition-all flex items-center gap-3 group"
>
<div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors shrink-0">
<Icon size={16} />
</div>
<div>
<h4 className="text-xs sm:text-sm font-semibold text-slate-200">{t.label}</h4>
<p className="text-[10px] sm:text-[11px] text-slate-400">{t.desc}</p>
</div>
</button>
);
})}
</div>
</div>
</div>
);
};
// ==========================================
// 4. SCREENS IMPLEMENTATION
// ==========================================
const TranslatorScreen = () => {
const [inputText, setInputText] = useState('');
const [loading, setLoading] = useState(false);
const [outputText, setOutputText] = useState('');
const [isCached, setIsCached] = useState(false);
const [errorDetails, setErrorDetails] = useState(null);
const [countdown, setCountdown] = useState(0);
const [showSettingsModal, setShowSettingsModal] = useState(false);
const [showToolsModal, setShowToolsModal] = useState(false);
const [darkMode, setDarkMode] = useState(true);
const [isListening, setIsListening] = useState(false);
const timerRef = useRef(null);
const samplePhrases = [
{ label: "මම ගෙදර ගියා", text: "මම ගෙදර ගියා" },
{ label: "I have been working here for 2 years.", text: "I have been working here for 2 years." },
{ label: "If I knew the answer, I would tell you.", text: "If I knew the answer, I would tell you." }
];
const startCountdownTimer = (seconds, rawError) => {
setErrorDetails(rawError);
setCountdown(seconds);
if (timerRef.current) clearInterval(timerRef.current);
timerRef.current = setInterval(() => {
setCountdown((prev) => {
if (prev <= 1) {
clearInterval(timerRef.current);
return 0;
}
return prev - 1;
});
}, 1000);
};
const handleTranslate = async (customPrompt = null) => {
const textToProcess = customPrompt || inputText.trim();
if (!textToProcess) {
setOutputText("කරුණාකර යම් වාක්‍යක් හෝ ප්‍රශ්නයක් ඇතුළත් කරන්න.");
return;
}
localStorage.setItem('app_last_translated_phrase', textToProcess);
if (timerRef.current) clearInterval(timerRef.current);
setErrorDetails(null);
setCountdown(0);
setIsCached(false);
const cacheKey = ⁠trans_cache_${textToProcess.toLowerCase()}⁠;
const cachedResult = localStorage.getItem(cacheKey);
if (cachedResult && !customPrompt) {
setOutputText(cachedResult);
setIsCached(true);
return;
}
setLoading(true);
setOutputText('');
try {
const result = await askGeminiService(textToProcess);
if (result.text) {
if (!customPrompt) {
localStorage.setItem(cacheKey, result.text);
saveToHistory(textToProcess, result.text);
}
setOutputText(result.text);
} else {
startCountdownTimer(60, result.error);
}
} catch (err) {
startCountdownTimer(60, ⁠Execution Exception: ${err.message}⁠);
} finally {
setLoading(false);
}
};
const handlePaste = async () => {
try {
const text = await navigator.clipboard.readText();
if (text) setInputText(text);
} catch (e) {
alert("පේස්ට් කිරීමට නොහැකි විය. කරුණාකර අවසර ලබා දෙන්න.");
}
};
const handleClear = () => {
setInputText('');
setOutputText('');
setIsCached(false);
};
const handleSaveFavorite = () => {
if (!inputText || !outputText) {
alert("සුරැකීමට ප්‍රමාණවත් පරිවර්තනයක් නොමැත.");
return;
}
const success = saveToFavorites(inputText, outputText);
if (success) alert("⭐ ප්‍රියතම ලැයිස්තුවට එක් කරන ලදී!");
else alert("මෙම වාක්‍යය දැනටමත් ප්‍රියතම ලැයිස්තුවේ ඇත.");
};
const handleVoiceInput = () => {
if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
alert('ඔබගේ බ්‍රවුසරයේ Speech Recognition සක්‍රීය නැත.');
return;
}
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.onstart = () => setIsListening(true);
recognition.onend = () => setIsListening(false);
recognition.onerror = () => setIsListening(false);
recognition.onresult = (event) => {
const transcript = event.results[0][0].transcript;
setInputText(transcript);
};
if (isListening) recognition.stop();
else recognition.start();
};
return (
<div className="space-y-3 sm:space-y-4">
<div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 sm:p-4 shadow-xl space-y-2 relative">
<textarea
rows={7}
value={inputText}
onChange={(e) => setInputText(e.target.value)}
placeholder="මෙතැනට ඔබේ වාක්‍යය, ප්‍රශ්නය හෝ විමසීම ලියන්න..."
className="w-full min-h-[170px] sm:min-h-[200px] bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-400 text-sm sm:text-base resize-y transition-all leading-relaxed"
/>
<div className="grid grid-cols-6 gap-1.5 pt-0.5">
<button
onClick={() => setShowSettingsModal(true)}
title="යෙදුම් සැකසුම්"
className="flex items-center justify-center p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500/50 text-slate-300 hover:text-sky-400 transition-colors touch-manipulation"
>
<Settings size={18} />
</button>
<button
onClick={handlePaste}
title="පේස්ට් කරන්න"
className="flex items-center justify-center p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500/50 text-slate-300 hover:text-amber-400 transition-colors touch-manipulation"
>
<ClipboardPaste size={18} />
</button>
<button
onClick={handleClear}
title="හිස් කරන්න"
className="flex items-center justify-center p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500/50 text-slate-300 hover:text-red-400 transition-colors touch-manipulation"
>
<Trash2 size={18} />
</button>
<button
onClick={handleSaveFavorite}
title="සුරකින්න"
className="flex items-center justify-center p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500/50 text-slate-300 hover:text-emerald-400 transition-colors touch-manipulation"
>
<Bookmark size={18} />
</button>
<button
onClick={() => setShowToolsModal(true)}
title="Advanced Tools"
className="flex items-center justify-center p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500/50 text-slate-300 hover:text-purple-400 transition-colors touch-manipulation"
>
<Rocket size={18} />
</button>
<button
onClick={handleVoiceInput}
title="කටහඬින් ඇතුලත් කරන්න"
className={⁠flex items-center justify-center p-2 rounded-xl bg-slate-950 border border-slate-800 transition-colors touch-manipulation ${ isListening ? 'text-red-400 border-red-500/50 animate-pulse' : 'text-slate-300 hover:text-sky-400 hover:border-sky-500/50' }⁠}
>
{isListening ? <MicOff size={18} /> : <Mic size={18} />}
</button>
</div>
<button
onClick={() => handleTranslate()}
disabled={loading}
className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-sky-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm disabled:opacity-50 touch-manipulation select-none"
>
{loading ? (
<>
<RefreshCw size={18} className="animate-spin" />
<span>විශ්ලේෂණය කරමින් පවතී...</span>
</>
) : (
<>
<Sparkles size={18} className="animate-spin-slow" />
<span>✨ Translate (පරිවර්තනය)</span>
</>
)}
</button>
</div>
{!outputText && !loading && countdown === 0 && (
<div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 space-y-2">
<span className="text-[11px] font-medium text-slate-400 block">උත්සාහ කර බලන්න:</span>
<div className="flex flex-wrap gap-1.5">
{samplePhrases.map((phrase, i) => (
<button
key={i}
onClick={() => { setInputText(phrase.text); handleTranslate(phrase.text); }}
className="text-xs bg-slate-950 hover:bg-slate-800 text-sky-300 border border-slate-800 hover:border-sky-500/40 px-2.5 py-1.5 rounded-lg transition-colors"
>
"{phrase.label}"
</button>
))}
</div>
</div>
)}
{countdown > 0 && (
<div className="bg-slate-900 border border-amber-500/50 rounded-2xl p-5 text-center space-y-2.5 shadow-xl">
<div className="text-2xl">⏳</div>
<h3 className="text-amber-400 font-bold text-sm sm:text-base">දෛනික සීමාව ඉක්මවා ඇත!</h3>
<p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
ඔබ නොමිලේ භාවිතා කල සීමාව අවසන් වී ඇත. කරුණාකර පසුව නැවත උත්සාහ කරන්න.
</p>
<div className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono px-3.5 py-1.5 rounded-lg">
තත්පර <span className="font-bold text-amber-200">{countdown}</span> කින් නැවත සක්‍රිය වේ...
</div>
</div>
)}
{outputText && countdown === 0 && (
<ScreenBox color="sky" icon={BrainCircuit} title="පරිවර්තනය සහ විග්‍රහය (Translation & Analysis)">
<FormattedMarkdownOutput text={outputText} />
{isCached && (
<div className="mt-3 pt-2 border-t border-slate-800/80 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
<Zap className="text-amber-400" size={13} />
<span>⚡ මතකයෙන් ක්ෂණිකව ලබාගත් ප්‍රතිඵලයකි</span>
</div>
)}
</ScreenBox>
)}
{showSettingsModal && (
<SettingsModal
onClose={() => setShowSettingsModal(false)}
onSelectHistoryItem={(inTxt, outTxt) => {
setInputText(inTxt);
setOutputText(outTxt);
}}
darkMode={darkMode}
setDarkMode={setDarkMode}
errorLogs={errorDetails}
/>
)}
{showToolsModal && (
<AdvancedToolsModal
onClose={() => setShowToolsModal(false)}
onSelectTool={(promptPrefix) => {
handleTranslate(⁠${promptPrefix} "${inputText}"⁠);
}}
/>
)}
</div>
);
};
const parseRobustJson = (rawText) => {
if (!rawText) return null;
try {
let clean = rawText.replace(/⁠json/gi, '').replace(/⁠/g, '').trim();
let firstBrace = clean.indexOf('{');
let lastBrace = clean.lastIndexOf('}');
if (firstBrace !== -1 && lastBrace !== -1) {
clean = clean.substring(firstBrace, lastBrace + 1);
}
return JSON.parse(clean);
} catch (err) {
console.error("JSON Parse Error:", err, rawText);
return null;
}
};
const ChartsScreen = () => {
const [activeVoiceTab, setActiveVoiceTab] = useState('active');
const [targetPhrase, setTargetPhrase] = useState('');
const [analysisData, setAnalysisData] = useState(null);
const [loading, setLoading] = useState(false);
const [errorMsg, setErrorMsg] = useState(null);
const [tenseGroupMode, setTenseGroupMode] = useState('all');
const [groupByFourEnabled, setGroupByFourEnabled] = useState(false);
useEffect(() => {
const lastPhrase = localStorage.getItem('app_last_translated_phrase') || '';
if (lastPhrase) {
setTargetPhrase(lastPhrase);
handleAnalyzePhrase(lastPhrase);
} else {
const defaultExample = "She writes a letter";
setTargetPhrase(defaultExample);
handleAnalyzePhrase(defaultExample);
}
}, []);
const handleAnalyzePhrase = async (phraseInput = null) => {
const phrase = phraseInput || targetPhrase.trim();
if (!phrase) return;
setLoading(true);
setAnalysisData(null);
setErrorMsg(null);
const prompt = `For this English/Sinhala sentence or verb: "${phrase}"
Generate a complete breakdown in JSON format ONLY. Do NOT wrap in markdown codeblocks. Return strictly raw JSON string starting with { and ending with }.
STRICT PASSIVE VOICE RULE: When generating passive voice forms, ensure the direct object becomes the subject of the passive sentence, followed by the appropriate 'to be' verb and V3.
JSON Schema:
{
"activeVoice": [
{ "tense": "1. Present Simple (සාමාන්‍ය වර්තමාන කාලය)", "english": "...", "sinhala": "..." },
{ "tense": "2. Present Continuous (වර්තමාන නොනැවතුනු කාලය)", "english": "...", "sinhala": "..." },
{ "tense": "3. Present Perfect (වර්තමාන පූර්ණ කාලය)", "english": "...", "sinhala": "..." },
{ "tense": "4. Present Perfect Continuous (වර්තමාන පූර්ණ නොනැවතුනු කාලය)", "english": "...", "sinhala": "..." },
{ "tense": "5. Past Simple (සාමාන්‍ය අතීත කාලය)", "english": "...", "sinhala": "..." },
{ "tense": "6. Past Continuous (අතීත නොනැවතුනු කාලය)", "english": "...", "sinhala": "..." },
{ "tense": "7. Past Perfect (අතීත පූර්ණ කාලය)", "english": "...", "sinhala": "..." },
{ "tense": "8. Past Perfect Continuous (අතීත පූර්ණ නොනැවතුනු කාලය)", "english": "...", "sinhala": "..." },
{ "tense": "9. Future Simple (සාමාන්‍ය අනාගත කාලය)", "english": "...", "sinhala": "..." },
{ "tense": "10. Future Continuous (අනාගත නොනැවතුනු කාලය)", "english": "...", "sinhala": "..." },
{ "tense": "11. Future Perfect (අනාගත පූර්ණ කාලය)", "english": "...", "sinhala": "..." },
{ "tense": "12. Future Perfect Continuous (අනාගත පූර්ණ නොනැවතුනු කාලය)", "english": "...", "sinhala": "..." }
],
"passiveVoice": [
{ "tense": "1. Present Simple (සාමාන්‍ය වර්තමාන කාලය)", "english": "...", "sinhala": "..." },
{ "tense": "2. Present Continuous (වර්තමාන නොනැවතුනු කාලය)", "english": "...", "sinhala": "..." },
{ "tense": "3. Present Perfect (වර්තමාන පූර්ණ කාලය)", "english": "...", "sinhala": "..." },
{ "tense": "4. Present Perfect Continuous (වර්තමාන පූර්ණ නොනැවතුනු කාලය)", "english": "N/A", "sinhala": "N/A" },
{ "tense": "5. Past Simple (සාමාන්‍ය අතීත කාලය)", "english": "...", "sinhala": "..." },
{ "tense": "6. Past Continuous (අතීත නොනැවතුනු කාලය)", "english": "...", "sinhala": "..." },
{ "tense": "7. Past Perfect (අතීත පූර්ණ කාලය)", "english": "...", "sinhala": "..." },
{ "tense": "8. Past Perfect Continuous (අතීත පූර්ණ නොනැවතුනු කාලය)", "english": "N/A", "sinhala": "N/A" },
{ "tense": "9. Future Simple (සාමාන්‍ය අනාගත කාලය)", "english": "...", "sinhala": "..." },
{ "tense": "10. Future Continuous (අනාගත නොනැවතුනු කාලය)", "english": "N/A", "sinhala": "N/A" },
{ "tense": "11. Future Perfect (අනාගත පූර්ණ කාලය)", "english": "...", "sinhala": "..." },
{ "tense": "12. Future Perfect Continuous (අනාගත පූර්ණ නොනැවතුනු කාලය)", "english": "N/A", "sinhala": "N/A" }
],
"modalVerbs": [
{ "modal": "1. Can (පුළුවන්)", "english": "...", "sinhala": "..." },
{ "modal": "2. Could (පුළුවන්කම තිබුණා/වේවි)", "english": "...", "sinhala": "..." },
{ "modal": "3. Should (යුතුයි)", "english": "...", "sinhala": "..." },
{ "modal": "4. Must (අනිවාර්යයෙන්ම කළ යුතුයි)", "english": "...", "sinhala": "..." },
{ "modal": "5. May / Might (සමහරවිට ඉඩ තිබේ)", "english": "...", "sinhala": "..." },
{ "modal": "6. Would (කරනු ඇත)", "english": "...", "sinhala": "..." }
],
"otherPatterns": [
{ "pattern": "1. ප්‍රශ්නාර්ථ වාක්‍යය (Question Form)", "english": "...", "sinhala": "..." },
{ "pattern": "2. නැත අර්ථ වාක්‍යය (Negative Form)", "english": "...", "sinhala": "..." },
{ "pattern": "3. කොන්දේසි සහිත වාක්‍යය (Conditional / If clause)", "english": "...", "sinhala": "..." },
{ "pattern": "4. ආයාචනා / නියෝග වාක්‍යය (Imperative / Request)", "english": "...", "sinhala": "..." }
]
}`;
try {
const res = await askGeminiService(prompt, "Output strictly raw JSON without markdown blocks.");
if (res.text) {
const parsed = parseRobustJson(res.text);
if (parsed && (parsed.activeVoice || parsed.modalVerbs)) {
setAnalysisData(parsed);
} else {
setErrorMsg("විශ්ලේෂණ ප්‍රතිඵලය සැකසීමේදී දෝෂයක් මතු විය.");
}
} else {
setErrorMsg("ප්‍රතිඵලය ලබාගැනීමට නොහැකි විය.");
}
} catch (e) {
console.error(e);
setErrorMsg("ජාල දෝෂයක් සිදු විය.");
} finally {
setLoading(false);
}
};
const handleCopy = (containerId) => {
const el = document.getElementById(containerId);
if (el) {
navigator.clipboard.writeText(el.innerText);
alert("📋 Content copied successfully!");
}
};
const handleShare = () => {
if (navigator.share) {
navigator.share({
title: 'Charts & Notes',
text: 'Check out these English grammar charts & notes!',
url: window.location.href,
}).catch(() => {});
} else {
navigator.clipboard.writeText(window.location.href);
alert("🔗 Link copied to clipboard!");
}
};
const renderGroupedTenses = (list) => {
if (!list) return null;
if (!groupByFourEnabled) {
// OFF mode: Vertical categorical grouping with distinct blue accent frames as requested by user
const verticalCategories = [
{ title: "* Simple Tenses (සරල අදහස් ප්‍රකාශනය)", indices: [0, 4, 8] },
{ title: "* Continuous Tenses (යමක් මේ මොහොතේ කරමින් සිටින අදහස් ප්‍රකාශනය)", indices: [1, 5, 9] },
{ title: "* Perfect Tenses (යමක් කරලා තිබෙන බව අදහස් කරන ප්‍රකාශනය)", indices: [2, 6, 10] },
{ title: "* Perfect Continuous Tenses (යමක් යම් කාල පරාසයක් තුළ නොකඩවා කෙරීගෙන එන අදහස් ප්‍රකාශන)", indices: [3, 7, 11] }
];
return (
<div className="space-y-4">
{verticalCategories.map((cat, cIdx) => {
const subItems = cat.indices.map(i => list[i]).filter(Boolean);
return (
<div key={cIdx} className="p-3.5 rounded-xl border-2 border-sky-500/50 bg-slate-950/80 shadow-md space-y-2.5">
<div className="flex items-center gap-2 pb-1.5 border-b border-sky-500/30 text-sky-300 font-bold text-xs sm:text-sm">
<span>📌</span>
<span>{cat.title}</span>
</div>
<div className="space-y-2">
{subItems.map((item, sIdx) => {
let label = "Present";
if (sIdx === 1) label = "Past";
else if (sIdx === 2) label = "Future";
return (
<div key={sIdx} className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
<div className="space-y-0.5 flex-1">
<span className="text-xs font-semibold text-sky-400">
{sIdx + 1}. {label} : <span className="text-slate-100 font-bold">{item.english}</span>
</span>
<p className="text-xs text-amber-300">🇱🇰 {item.sinhala}</p>
</div>
{item.sinhala !== "N/A" && (
<button
onClick={() => speakBilingual(item.english, item.sinhala)}
className="text-slate-400 hover:text-sky-400 p-1 shrink-0"
>
<Volume2 size={15} />
</button>
)}
</div>
);
})}
</div>
</div>
);
})}
</div>
);
}
// ON mode: Boxed Tenses View (Present, Past, Future)
const categories = [
{ key: 'present', title: 'වර්තමාන කාල (Present Tenses)', range: [0, 3] },
{ key: 'past', title: 'අතීත කාල (Past Tenses)', range: [4, 7] },
{ key: 'future', title: 'අනාගත කාල (Future Tenses)', range: [8, 11] }
];
const activeCategories = tenseGroupMode === 'all'
? categories
: categories.filter(c => c.key === tenseGroupMode);
return (
<div className="space-y-4">
{activeCategories.map(cat => {
const subList = list.slice(cat.range[0], cat.range[1] + 1);
return (
<div key={cat.key} className="p-3.5 rounded-xl border-2 border-sky-500/40 bg-slate-950/80 shadow-md space-y-2.5">
<div className="flex items-center gap-2 pb-1.5 border-b border-sky-500/30 text-sky-300 font-bold text-xs sm:text-sm">
<span>📌</span>
<span>{cat.title}</span>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
{subList.map((item, idx) => (
<div key={idx} className="bg-slate-900 p-3 rounded-xl border border-slate-800/80 space-y-1">
<span className="font-semibold text-sky-400 text-xs sm:text-sm block">
{item.tense}
</span>
<p className="text-xs sm:text-sm font-bold text-slate-100">🇬🇧 {item.english}</p>
<p className="text-xs text-amber-300">🇱🇰 {item.sinhala}</p>
<div className="pt-1 text-right">
{item.sinhala !== "N/A" && (
<button
onClick={() => speakBilingual(item.english, item.sinhala)}
className="text-slate-400 hover:text-sky-400 p-1"
>
<Volume2 size={15} />
</button>
)}
</div>
</div>
))}
</div>
</div>
);
})}
</div>
);
};
return (
<div className="space-y-4">
<ScreenBox title="Translator හි විමසූ වාක්‍යය පිළිබඳ ව්‍යාකරණ විග්‍රහය" icon={Cpu} color="sky">
<div className="space-y-3">
<div className="flex gap-2">
<input
type="text"
value={targetPhrase}
onChange={(e) => setTargetPhrase(e.target.value)}
placeholder="විශ්ලේෂණය කිරීමට වාක්‍යක් හෝ ක්‍රියාපදයක් ඇතුළත් කරන්න..."
className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-sky-400"
/>
<button
onClick={() => handleAnalyzePhrase()}
disabled={loading}
className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50 shrink-0"
>
{loading ? (
<RefreshCw size={15} className="animate-spin" />
) : (
<Sparkles size={15} />
)}
<span>විශ්ලේෂණය</span>
</button>
</div>
<div className="text-[11px] text-slate-400 flex items-center gap-1.5">
<Info size={13} className="text-sky-400 shrink-0" />
<span>Translator පිටුවේ ඔබ යෙදූ වාක්‍යය පදනම් කරගෙන මෙම විග්‍රහය ස්වයංක්‍රීයව සැකසේ.</span>
</div>
</div>
</ScreenBox>
<div className="bg-slate-900 border border-slate-800 p-1.5 rounded-xl shadow-xl space-y-2">
<div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 gap-1 overflow-x-auto">
<button
onClick={() => setActiveVoiceTab('active')}
className={⁠flex-1 min-w-[80px] py-2 px-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all touch-manipulation text-center ${ activeVoiceTab === 'active' ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900' }⁠}
>
Active Voice
</button>
<button
onClick={() => setActiveVoiceTab('passive')}
className={⁠flex-1 min-w-[80px] py-2 px-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all touch-manipulation text-center ${ activeVoiceTab === 'passive' ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900' }⁠}
>
Passive Voice
</button>
<button
onClick={() => setActiveVoiceTab('modals')}
className={⁠flex-1 min-w-[80px] py-2 px-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all touch-manipulation text-center ${ activeVoiceTab === 'modals' ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900' }⁠}
>
Modal Verbs
</button>
<button
onClick={() => setActiveVoiceTab('patterns')}
className={⁠flex-1 min-w-[80px] py-2 px-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all touch-manipulation text-center ${ activeVoiceTab === 'patterns' ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900' }⁠}
>
Others
</button>
</div>
{(activeVoiceTab === 'active' || activeVoiceTab === 'passive') && (
<div className="pt-1 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 px-1">
<div className="flex items-center gap-1.5 w-full sm:w-auto">
<button
onClick={() => setGroupByFourEnabled(!groupByFourEnabled)}
className={⁠px-3 py-1 rounded-lg text-[11px] font-semibold border transition-all flex items-center gap-1.5 ${ groupByFourEnabled  ? 'bg-indigo-600 text-white border-indigo-500'  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200' }⁠}
>
<Sliders size={12} />
<span>රාමුගත කාල කාණ්ඩ (Boxed Tenses View)</span>
</button>
<button
onClick={() => alert("Charts (වගු) view is active.")}
className="px-4 py-1 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg text-[11px] font-bold shadow-sm flex items-center gap-1.5"
>
<BarChart3 size={13} />
<span>Charts (වගු)</span>
</button>
</div>
{groupByFourEnabled && (
<div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800 gap-1 w-full sm:w-auto overflow-x-auto text-[11px]">
<button
onClick={() => setTenseGroupMode('all')}
className={⁠px-2.5 py-1 rounded-md transition ${tenseGroupMode === 'all' ? 'bg-sky-500 text-white font-bold' : 'text-slate-400 hover:text-slate-200'}⁠}
>
සියල්ල (12)
</button>
<button
onClick={() => setTenseGroupMode('present')}
className={⁠px-2.5 py-1 rounded-md transition ${tenseGroupMode === 'present' ? 'bg-sky-500 text-white font-bold' : 'text-slate-400 hover:text-slate-200'}⁠}
>
Present
</button>
<button
onClick={() => setTenseGroupMode('past')}
className={⁠px-2.5 py-1 rounded-md transition ${tenseGroupMode === 'past' ? 'bg-sky-500 text-white font-bold' : 'text-slate-400 hover:text-slate-200'}⁠}
>
Past
</button>
<button
onClick={() => setTenseGroupMode('future')}
className={⁠px-2.5 py-1 rounded-md transition ${tenseGroupMode === 'future' ? 'bg-sky-500 text-white font-bold' : 'text-slate-400 hover:text-slate-200'}⁠}
>
Future
</button>
</div>
)}
</div>
)}
</div>
{errorMsg && (
<div className="p-4 bg-red-950/50 border border-red-800/80 rounded-xl text-xs text-red-300 text-center">
⚠️ {errorMsg}
<button
onClick={() => handleAnalyzePhrase()}
className="block mx-auto mt-2 bg-red-800 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-[11px] font-bold"
>
නැවත උත්සාහ කරන්න
</button>
</div>
)}
{loading ? (
<div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-xl space-y-2">
<RefreshCw size={24} className="animate-spin text-sky-400 mx-auto" />
<p className="text-xs text-slate-400">ක්‍රියාපද රටා විශ්ලේෂණය කරමින් පවතී...</p>
</div>
) : analysisData ? (
<div id="chartNotesContainer">
{activeVoiceTab === 'active' && (
<div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3.5 sm:p-4 backdrop-blur-sm shadow-xl space-y-3">
<div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
<div className="flex items-center gap-2">
<div className="p-1.5 rounded-lg border border-sky-500/30 bg-sky-500/5 text-sky-400">
<BarChart3 size={16} />
</div>
<h3 className="font-semibold text-slate-100 text-xs sm:text-sm tracking-wide">
Active Voice - ප්‍රධාන කාල 12 {groupByFourEnabled && tenseGroupMode !== 'all' ? ⁠(${tenseGroupMode.toUpperCase()})⁠ : ''}
</h3>
</div>
<div className="flex items-center space-x-1.5">
<button
onClick={() => handleCopy('active-content-body')}
className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg text-slate-200 transition flex items-center space-x-1 shadow-sm border border-slate-700"
title="Copy"
>
<Copy size={12} />
<span>copy</span>
</button>
<button 
onClick={handleShare} 
className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg text-slate-200 transition flex items-center space-x-1 shadow-sm border border-slate-700"
title="Share"
>
<Share2 size={12} />
<span>share</span>
</button>
</div>
</div>
<div id="active-content-body">
{renderGroupedTenses(analysisData.activeVoice)}
</div>
</div>
)}
{activeVoiceTab === 'passive' && (
<div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3.5 sm:p-4 backdrop-blur-sm shadow-xl space-y-3">
<div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
<div className="flex items-center gap-2">
<div className="p-1.5 rounded-lg border border-purple-500/30 bg-purple-500/5 text-purple-400">
<BarChart3 size={16} />
</div>
<h3 className="font-semibold text-slate-100 text-xs sm:text-sm tracking-wide">
Passive Voice - ප්‍රධාන කාල 12 {groupByFourEnabled && tenseGroupMode !== 'all' ? ⁠(${tenseGroupMode.toUpperCase()})⁠ : ''}
</h3>
</div>
<div className="flex items-center space-x-1.5">
<button
onClick={() => handleCopy('passive-content-body')}
className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg text-slate-200 transition flex items-center space-x-1 shadow-sm border border-slate-700"
title="Copy"
>
<Copy size={12} />
<span>copy</span>
</button>
<button 
onClick={handleShare} 
className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg text-slate-200 transition flex items-center space-x-1 shadow-sm border border-slate-700"
title="Share"
>
<Share2 size={12} />
<span>share</span>
</button>
</div>
</div>
<div id="passive-content-body">
{renderGroupedTenses(analysisData.passiveVoice)}
</div>
</div>
)}
{activeVoiceTab === 'modals' && (
<div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3.5 sm:p-4 backdrop-blur-sm shadow-xl space-y-3">
<div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
<div className="flex items-center gap-2">
<div className="p-1.5 rounded-lg border border-amber-500/30 bg-amber-500/5 text-amber-400">
<Rocket size={16} />
</div>
<h3 className="font-semibold text-slate-100 text-xs sm:text-sm tracking-wide">Modal Verbs වෙනස්කම්</h3>
</div>
<div className="flex items-center space-x-1.5">
<button
onClick={() => handleCopy('modal-content-body')}
className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg text-slate-200 transition flex items-center space-x-1 shadow-sm border border-slate-700"
title="Copy"
>
<Copy size={12} />
<span>copy</span>
</button>
<button 
onClick={handleShare} 
className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg text-slate-200 transition flex items-center space-x-1 shadow-sm border border-slate-700"
title="Share"
>
<Share2 size={12} />
<span>share</span>
</button>
</div>
</div>
<div id="modal-content-body" className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
{analysisData.modalVerbs?.map((item, idx) => (
<div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
<span className="font-semibold text-amber-400 text-xs sm:text-sm block">
{item.modal}
</span>
<p className="text-xs sm:text-sm font-bold text-slate-100">🇬🇧 {item.english}</p>
<p className="text-xs text-amber-300">🇱🇰 {item.sinhala}</p>
<div className="pt-1 text-right">
<button
onClick={() => speakBilingual(item.english, item.sinhala)}
className="text-slate-400 hover:text-sky-400 p-1"
>
<Volume2 size={15} />
</button>
</div>
</div>
))}
</div>
</div>
)}
{activeVoiceTab === 'patterns' && (
<div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3.5 sm:p-4 backdrop-blur-sm shadow-xl space-y-3">
<div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
<div className="flex items-center gap-2">
<div className="p-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/5 text-emerald-400">
<Info size={16} />
</div>
<h3 className="font-semibold text-slate-100 text-xs sm:text-sm tracking-wide">වෙනත් ප්‍රධාන වාක්‍ය රටා</h3>
</div>
<div className="flex items-center space-x-1.5">
<button
onClick={() => handleCopy('patterns-content-body')}
className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg text-slate-200 transition flex items-center space-x-1 shadow-sm border border-slate-700"
title="Copy"
>
<Copy size={12} />
<span>copy</span>
</button>
<button 
onClick={handleShare} 
className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg text-slate-200 transition flex items-center space-x-1 shadow-sm border border-slate-700"
title="Share"
>
<Share2 size={12} />
<span>share</span>
</button>
</div>
</div>
<div id="patterns-content-body" className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
{analysisData.otherPatterns?.map((item, idx) => (
<div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
<span className="font-semibold text-emerald-400 text-xs sm:text-sm block">
{item.pattern}
</span>
<p className="text-xs sm:text-sm font-bold text-slate-100">🇬🇧 {item.english}</p>
<p className="text-xs text-amber-300">🇱🇰 {item.sinhala}</p>
<div className="pt-1 text-right">
<button
onClick={() => speakBilingual(item.english, item.sinhala)}
className="text-slate-400 hover:text-sky-400 p-1"
>
<Volume2 size={15} />
</button>
</div>
</div>
))}
</div>
</div>
)}
</div>
) : null}
</div>
);
};
const VerbListsScreen = () => {
const [search, setSearch] = useState('');
const [irregularOnly, setIrregularOnly] = useState(false);
const verbs = [
{ v1: "Accept", v2: "Accepted", v3: "Accepted", irregular: false, meaning: "පිළිගන්නවා" },
{ v1: "Allow", v2: "Allowed", v3: "Allowed", irregular: false, meaning: "අවසර දෙනවා" },
{ v1: "Answer", v2: "Answered", v3: "Answered", irregular: false, meaning: "පිළිතුරු දෙනවා" },
{ v1: "Become", v2: "Became", v3: "Become", irregular: true, meaning: "බවට පත්වෙනවා" },
{ v1: "Begin", v2: "Began", v3: "Begun", irregular: true, meaning: "පටන් ගන්නවා" },
{ v1: "Break", v2: "Broke", v3: "Broken", irregular: true, meaning: "කඩනවා" },
{ v1: "Bring", v2: "Brought", v3: "Brought", irregular: true, meaning: "ගෙනෙනවා" },
{ v1: "Build", v2: "Built", v3: "Built", irregular: true, meaning: "ගොඩනඟනවා" },
{ v1: "Buy", v2: "Bought", v3: "Bought", irregular: true, meaning: "මිලදී ගන්නවා" },
{ v1: "Choose", v2: "Chose", v3: "Chosen", irregular: true, meaning: "තෝරාගන්නවා" },
{ v1: "Come", v2: "Came", v3: "Come", irregular: true, meaning: "එනවා" },
{ v1: "Do", v2: "Did", v3: "Done", irregular: true, meaning: "කරනවා" },
{ v1: "Drink", v2: "Drank", v3: "Drunk", irregular: true, meaning: "බොනවා" },
{ v1: "Drive", v2: "Drove", v3: "Driven", irregular: true, meaning: "පදවනවා" },
{ v1: "Eat", v2: "Ate", v3: "Eaten", irregular: true, meaning: "කනවා" },
{ v1: "Fall", v2: "Fell", v3: "Fallen", irregular: true, meaning: "වැටෙනවා" },
{ v1: "Find", v2: "Found", v3: "Found", irregular: true, meaning: "සොයාගන්නවා" },
{ v1: "Fly", v2: "Flew", v3: "Flown", irregular: true, meaning: "පියාසර කරනවා" },
{ v1: "Forget", v2: "Forgot", v3: "Forgotten", irregular: true, meaning: "අමතක වෙනවා" },
{ v1: "Get", v2: "Got", v3: "Got/Gotten", irregular: true, meaning: "ලබාගන්නවා" },
{ v1: "Give", v2: "Gave", v3: "Given", irregular: true, meaning: "දෙනවා" },
{ v1: "Go", v2: "Went", v3: "Gone", irregular: true, meaning: "යනවා" },
{ v1: "Grow", v2: "Grew", v3: "Grown", irregular: true, meaning: "වැවෙනවා" },
{ v1: "Have", v2: "Had", v3: "Had", irregular: true, meaning: "සතුව තිබෙනවා" },
{ v1: "Hear", v2: "Heard", v3: "Heard", irregular: true, meaning: "ඇසෙනවා" },
{ v1: "Know", v2: "Knew", v3: "Known", irregular: true, meaning: "දන්නවා" },
{ v1: "Make", v2: "Made", v3: "Made", irregular: true, meaning: "හදනවා" },
{ v1: "Meet", v2: "Met", v3: "Met", irregular: true, meaning: "හමුවෙනවා" },
{ v1: "Pay", v2: "Paid", v3: "Paid", irregular: true, meaning: "මුදල් ගෙවනවා" },
{ v1: "Put", v2: "Put", v3: "Put", irregular: true, meaning: "තබනවා" },
{ v1: "Read", v2: "Read", v3: "Read", irregular: true, meaning: "කියවනවා" },
{ v1: "Run", v2: "Ran", v3: "Run", irregular: true, meaning: "දුවනවා" },
{ v1: "Say", v2: "Said", v3: "Said", irregular: true, meaning: "කියනවා" },
{ v1: "See", v2: "Saw", v3: "Seen", irregular: true, meaning: "දකිනවා" },
{ v1: "Send", v2: "Sent", v3: "Sent", irregular: true, meaning: "යවනවා" },
{ v1: "Sing", v2: "Sang", v3: "Sung", irregular: true, meaning: "ගීත ගයනවා" },
{ v1: "Sit", v2: "Sat", v3: "Sat", irregular: true, meaning: "වාඩිවෙනවා" },
{ v1: "Sleep", v2: "Slept", v3: "Slept", irregular: true, meaning: "නිදාගන්නවා" },
{ v1: "Speak", v2: "Spoke", v3: "Spoken", irregular: true, meaning: "කතා කරනවා" },
{ v1: "Swim", v2: "Swam", v3: "Swum", irregular: true, meaning: "පීනනවා" },
{ v1: "Take", v2: "Took", v3: "Taken", irregular: true, meaning: "ගන්නවා" },
{ v1: "Teach", v2: "Taught", v3: "Taught", irregular: true, meaning: "උගන්වනවා" },
{ v1: "Tell", v2: "Told", v3: "Told", irregular: true, meaning: "පවසනවා" },
{ v1: "Think", v2: "Thought", v3: "Thought", irregular: true, meaning: "හිතනවා" },
{ v1: "Understand", v2: "Understood", v3: "Understood", irregular: true, meaning: "තේරුම් ගන්නවා" },
{ v1: "Wear", v2: "Wore", v3: "Worn", irregular: true, meaning: "අඳිනවා" },
{ v1: "Win", v2: "Won", v3: "Won", irregular: true, meaning: "දිනනවා" },
{ v1: "Write", v2: "Wrote", v3: "Written", irregular: true, meaning: "ලියනවා" }
];
const filtered = verbs.filter(v => {
const matchesSearch =
v.v1.toLowerCase().includes(search.toLowerCase()) ||
v.v2.toLowerCase().includes(search.toLowerCase()) ||
v.v3.toLowerCase().includes(search.toLowerCase()) ||
v.meaning.includes(search);
if (irregularOnly) {
return matchesSearch && v.irregular;
}
return matchesSearch;
});
return (
<div className="space-y-3">
<div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-2.5">
<div className="flex items-center justify-between gap-2">
<div className="relative flex-1">
<Search size={15} className="absolute left-3 top-2.5 text-slate-500" />
<input
type="text"
placeholder="v1, v2, v3 හෝ තේරුම මඟින් සොයන්න..."
value={search}
onChange={(e) => setSearch(e.target.value)}
className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-sky-400"
/>
</div>
<span className="text-[11px] text-slate-400 shrink-0">ගණන: {filtered.length}</span>
</div>
<div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
<label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 cursor-pointer select-none">
<Filter size={13} className="text-sky-400" />
<span>Irregular Verbs Only (අක්‍රමවත් ක්‍රියාපද පමණක්)</span>
</label>
<button
onClick={() => setIrregularOnly(!irregularOnly)}
className={⁠w-10 h-5 rounded-full transition-colors relative p-0.5 ${irregularOnly ? 'bg-sky-500' : 'bg-slate-700'}⁠}
>
<div className={⁠w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${irregularOnly ? 'translate-x-5' : 'translate-x-0'}⁠} />
</button>
</div>
</div>
<div className="bg-slate-900 border border-slate-800 rounded-xl max-h-[520px] overflow-y-auto">
<table className="w-full text-left text-xs sm:text-sm text-slate-300 relative">
<thead className="bg-slate-950 text-[11px] font-semibold text-slate-400 uppercase border-b border-slate-800 sticky top-0 z-10 shadow-md">
<tr>
<th className="p-2.5">V1 (Base)</th>
<th className="p-2.5">V2 (Past)</th>
<th className="p-2.5">V3 (Past Part.)</th>
<th className="p-2.5">තේරුම</th>
<th className="p-2.5 text-right">ශබ්දය</th>
</tr>
</thead>
<tbody className="divide-y divide-slate-800/60">
{filtered.map((item, idx) => (
<tr key={idx} className="hover:bg-slate-800/40 transition-colors">
<td className="p-2.5 font-semibold text-sky-400">
{item.v1} {item.irregular && <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 ml-1">Irr</span>}
</td>
<td className="p-2.5 text-slate-300">{item.v2}</td>
<td className="p-2.5 text-slate-300">{item.v3}</td>
<td className="p-2.5 text-emerald-400 font-medium">{item.meaning}</td>
<td className="p-2.5 text-right">
<button
onClick={() => speakBilingual(⁠${item.v1}, ${item.v2}, ${item.v3}⁠, item.meaning)}
className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-sky-400"
>
<Volume2 size={15} />
</button>
</td>
</tr>
))}
</tbody>
</table>
</div>
</div>
);
};
const PracticeQuizScreen = () => {
const [loading, setLoading] = useState(false);
const [quiz, setQuiz] = useState(null);
const [selected, setSelected] = useState(null);
const [score, setScore] = useState(0);
const loadQuestion = async () => {
setLoading(true);
setSelected(null);
const prompt = ⁠Generate 1 multiple choice grammar question for Sinhala speakers learning English. JSON Output Format ONLY: { "question": "Sentence with blank __", "options": ["A", "B", "C", "D"], "correctIndex": 0, "explanation": "Explanation in Sinhala including tense details" }⁠;
try {
const res = await askGeminiService(prompt, "Output strictly raw JSON without markdown codeblocks.");
const cleanJson = res.text.replace(/⁠json/g, '').replace(/⁠/g, '').trim();
setQuiz(JSON.parse(cleanJson));
} catch (e) {
console.error(e);
} finally {
setLoading(false);
}
};
useEffect(() => {
loadQuestion();
}, []);
const handleSelect = (index) => {
if (selected !== null) return;
setSelected(index);
if (index === quiz.correctIndex) {
setScore(s => s + 10);
}
};
return (
<div className="space-y-3.5 max-w-xl mx-auto">
<div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between">
<div className="flex items-center gap-2">
<Award className="text-amber-400" size={20} />
<span className="text-xs sm:text-sm font-semibold text-slate-200">ලකුණු මට්ටම (Score)</span>
</div>
<span className="text-lg font-bold text-amber-400 font-mono">{score} pts</span>
</div>
{loading ? (
<div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-xl space-y-2">
<RefreshCw size={24} className="animate-spin text-sky-400 mx-auto" />
<p className="text-xs text-slate-400">අභ්‍යාස ප්‍රශ්නය සකස් වෙමින් පැවැත්තේ...</p>
</div>
) : quiz ? (
<ScreenBox title="ඉංග්‍රීසි ව්‍යාකරණ අභ්‍යාසය (Grammar Quiz)" icon={HelpCircle} color="amber">
<div className="space-y-3">
<p className="text-sm sm:text-base font-semibold text-slate-100 bg-slate-950 p-3 rounded-lg border border-slate-800">
{quiz.question}
</p>
<div className="space-y-1.5">
{quiz.options.map((opt, idx) => {
let style = "bg-slate-950 hover:bg-slate-800 text-slate-200 border-slate-800";
if (selected !== null) {
if (idx === quiz.correctIndex) {
style = "bg-emerald-500/20 text-emerald-300 border-emerald-500/50";
} else if (idx === selected) {
style = "bg-red-500/20 text-red-300 border-red-500/50";
}
}
return (
<button
key={idx}
onClick={() => handleSelect(idx)}
disabled={selected !== null}
className={⁠w-full p-2.5 rounded-lg border text-left text-xs sm:text-sm font-medium transition-all ${style}⁠}
>
{opt}
</button>
);
})}
</div>
{selected !== null && (
<div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
<span className="text-[10px] font-semibold text-sky-400 uppercase">විග්‍රහය (Sinhala Explanation)</span>
<p className="text-xs text-slate-300">{quiz.explanation}</p>
<ActionButton onClick={loadQuestion} icon={ChevronRight} label="ඊළඟ ප්‍රශ්නය" className="mt-1" />
</div>
)}
</div>
</ScreenBox>
) : null}
</div>
);
};
const WordOfTheDayScreen = () => {
return (
<div className="space-y-3 max-w-xl mx-auto">
<ScreenBox title="Word of the Day (අද දින වචනය)" icon={Star} color="amber">
<div className="space-y-3 text-slate-200 p-2">
<div className="bg-slate-950 p-4 rounded-xl border border-amber-500/40 text-center space-y-2.5 relative">
<button
onClick={() => speakBilingual("Resilience. Resilience means අභියෝග හමුවේ නොහැකිවීම, ඔරොත්තු දීමේ හැකියාව.", "අභියෝග හමුවේ නොහැකිවීම, නොපසුබට උත්සාහය / ඔරොත්තු දීමේ හැකියාව")}
title="ශබ්ද නගා කියවන්න"
className="absolute right-3 top-3 p-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-xl transition shadow-sm"
>
<Volume2 size={16} />
</button>
<span className="text-2xl font-bold text-amber-300 block">Resilience</span>
<p className="text-xs text-slate-400">/rɪˈzɪliəns/ (Noun)</p>
<p className="text-sm font-medium text-emerald-400">අභියෝග හමුවේ නොහැකිවීම, නොපසුබට උත්සාහය / ඔරොත්තු දීමේ හැකියාව</p>
</div>
<div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
<span className="text-xs font-bold text-sky-400">Example Sentence:</span>
<p className="text-xs text-slate-300">"Her resilience during difficult times inspired everyone."</p>
<p className="text-xs text-amber-300/90">"අපහසු අවස්ථා වලදී ඇයගේ නොපසුබට උත්සාහය සැමගේ සිතට ආස්වාදයක් විය."</p>
</div>
</div>
</ScreenBox>
</div>
);
};
const SystemConfigScreen = () => {
return (
<div className="space-y-3 max-w-xl mx-auto">
<ScreenBox title="System Architecture & API Config" icon={Settings} color="sky">
<div className="space-y-2.5 text-xs text-slate-300">
<div>
<label className="text-slate-400 block mb-1">Active Application Version</label>
<p className="font-mono text-emerald-400 bg-slate-950 p-2 rounded border border-slate-800">
V 2.0 Pro
</p>
</div>
<div>
<label className="text-slate-400 block mb-1">Encoded API Key Pool</label>
<p className="font-mono text-sky-400 bg-slate-950 p-2 rounded border border-slate-800">
30 Keys loaded in Smart Rotation Pool.
</p>
</div>
</div>
</ScreenBox>
</div>
);
};
export default function App() {
const [activeTab, setActiveTab] = useState('translator');
const tabs = [
{ id: 'translator', label: '1. Translator', icon: Languages },
{ id: 'charts', label: '2. Charts & Notes', icon: BarChart3 },
{ id: 'verbs', label: '3. Verb Lists', icon: BookOpen },
{ id: 'practice', label: '4. Practice Quiz', icon: BrainCircuit },
{ id: 'word-of-the-day', label: 'Word of the Day', icon: Star },
{ id: 'config', label: 'System Config', icon: Settings },
];
return (
<div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans p-2 sm:p-4 selection:bg-sky-500 selection:text-white overscroll-none">
<div className="max-w-xl mx-auto w-full text-center mb-3 bg-gradient-to-b from-slate-900 to-slate-950 p-3.5 sm:p-4 rounded-2xl border border-slate-800 shadow-2xl space-y-1">
<span className="text-[10px] sm:text-xs font-bold text-sky-400 tracking-wider uppercase block">
Created by Kalpa Gamaethige
</span>
<div className="flex items-center justify-center gap-2">
<h1 className="text-lg sm:text-2xl font-extrabold text-sky-400">
AI English Translator & Teacher
</h1>
</div>
<p className="text-[11px] sm:text-xs text-slate-400 pt-0.5">
ද්විභාෂා පරිවර්තනය, ව්‍යාකරණ නිවැරදි කිරීම සහ ඉගෙනුම් සහකරු
</p>
</div>
<div className="max-w-xl mx-auto w-full mb-3">
<div className="flex bg-slate-900/90 p-1 rounded-xl border border-slate-800 overflow-x-auto gap-1">
{tabs.map((t) => {
const Icon = t.icon;
const active = activeTab === t.id;
const isConfig = t.id === 'config';
return (
<button
key={t.id}
onClick={() => setActiveTab(t.id)}
className={⁠flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all flex-1 justify-center touch-manipulation select-none ${ active ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' }⁠}
>
<Icon size={14} />
<span>{t.label}</span>
</button>
);
})}
</div>
</div>
<div className="max-w-xl mx-auto w-full flex-1">
{activeTab === 'translator' && <TranslatorScreen />}
{activeTab === 'charts' && <ChartsScreen />}
{activeTab === 'verbs' && <VerbListsScreen />}
{activeTab === 'practice' && <PracticeQuizScreen />}
{activeTab === 'word-of-the-day' && <WordOfTheDayScreen />}
{activeTab === 'config' && <SystemConfigScreen />}
</div>
<footer className="max-w-xl mx-auto w-full text-center py-3 mt-4 border-t border-slate-800/60 text-[11px] sm:text-xs text-slate-500">
© 2026 AI English Translator & Teacher V 2.0 Pro | Developed with React.
</footer>
</div>
);
}
