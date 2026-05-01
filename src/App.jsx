import React, { useState, useRef } from 'react';

const S = {
  app: { minHeight:'100vh', background:'linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#0f172a 100%)', color:'#fff', fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' },
  header: { background:'linear-gradient(90deg,#7c3aed,#db2777)', padding:'16px 24px', boxShadow:'0 4px 20px rgba(0,0,0,0.4)' },
  headerInner: { maxWidth:720, margin:'0 auto', display:'flex', alignItems:'center', gap:12 },
  headerTitle: { fontSize:20, fontWeight:700, margin:0 },
  headerSub: { fontSize:12, color:'rgba(255,255,255,0.7)', margin:0 },
  headerDate: { marginLeft:'auto', textAlign:'right', fontSize:12, color:'rgba(255,255,255,0.6)' },
  main: { maxWidth:720, margin:'0 auto', padding:'24px 16px', display:'flex', flexDirection:'column', gap:20 },
  card: { background:'rgba(30,41,59,0.9)', borderRadius:16, padding:20, border:'1px solid rgba(255,255,255,0.1)' },
  cardViolet: { background:'rgba(30,41,59,0.9)', borderRadius:16, padding:20, border:'1px solid rgba(124,58,237,0.5)' },
  cardPink: { background:'rgba(30,41,59,0.9)', borderRadius:16, padding:20, border:'1px solid rgba(219,39,119,0.5)' },
  cardAmber: { background:'rgba(30,41,59,0.9)', borderRadius:16, padding:20, border:'1px solid rgba(245,158,11,0.5)' },
  cardGreen: { background:'rgba(30,41,59,0.9)', borderRadius:16, padding:20, border:'1px solid rgba(34,197,94,0.5)' },
  badge: (color) => ({ background:color, color:'#fff', fontSize:11, fontWeight:700, padding:'2px 8px', borderRadius:99, display:'inline-block' }),
  stepTitle: { fontWeight:700, fontSize:16, margin:0 },
  grid2: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 },
  analysisBtn: (selected, color) => ({
    display:'flex', alignItems:'center', gap:12, padding:'12px', borderRadius:12,
    border: selected ? `2px solid ${color}` : '2px solid rgba(255,255,255,0.1)',
    background: selected ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)',
    cursor:'pointer', textAlign:'left', color:'#fff', transition:'all 0.2s',
  }),
  chip: (selected) => ({
    padding:'6px 14px', borderRadius:99, fontSize:12, border: selected ? '2px solid #a78bfa' : '2px solid rgba(255,255,255,0.15)',
    background: selected ? '#7c3aed' : 'transparent', color: selected ? '#fff' : '#94a3b8',
    cursor:'pointer', transition:'all 0.2s',
  }),
  vibeChip: (selected) => ({
    padding:'6px 14px', borderRadius:99, fontSize:12, border: selected ? '2px solid #f59e0b' : '2px solid rgba(255,255,255,0.15)',
    background: selected ? '#d97706' : 'transparent', color: selected ? '#fff' : '#94a3b8',
    cursor:'pointer', transition:'all 0.2s',
  }),
  generateBtn: { width:'100%', padding:'14px', background:'linear-gradient(90deg,#7c3aed,#db2777)', border:'none', borderRadius:12, color:'#fff', fontSize:16, fontWeight:700, cursor:'pointer', marginTop:8 },
  copyBtn: (state) => ({
    width:'100%', padding:'14px', border:'none', borderRadius:12, color:'#fff', fontSize:15, fontWeight:700, cursor:'pointer',
    background: state==='copied' ? '#16a34a' : state==='manual' ? '#d97706' : 'linear-gradient(90deg,#7c3aed,#db2777)',
    transition:'all 0.2s',
  }),
  navBtn: (disabled) => ({
    flex:1, padding:'10px', borderRadius:12, border:'2px solid rgba(255,255,255,0.15)',
    background:'transparent', color: disabled ? '#475569' : '#94a3b8',
    cursor: disabled ? 'not-allowed' : 'pointer', fontWeight:600, fontSize:14,
  }),
  nextBtn: { flex:1, padding:'10px', borderRadius:12, border:'none', background:'#7c3aed', color:'#fff', cursor:'pointer', fontWeight:700, fontSize:14 },
  doneBtn: { flex:1, padding:'10px', borderRadius:12, border:'none', background:'#16a34a', color:'#fff', cursor:'pointer', fontWeight:700, fontSize:14 },
  dot: (i, cur) => ({
    width:28, height:28, borderRadius:'50%', border:'none', cursor:'pointer', fontWeight:700, fontSize:12,
    background: i===cur ? '#16a34a' : i<cur ? '#1e3a2f' : '#334155',
    color: i===cur ? '#fff' : i<cur ? '#4ade80' : '#94a3b8',
    outline: i<cur ? '2px solid #16a34a' : 'none',
  }),
  infoBox: { background:'rgba(124,58,237,0.15)', border:'1px solid rgba(124,58,237,0.4)', borderRadius:12, padding:'12px 14px', fontSize:13 },
  textarea: { width:'100%', height:110, fontSize:12, fontFamily:'monospace', background:'#020617', color:'#94a3b8', border:'1px solid #334155', borderRadius:10, padding:10, resize:'none', outline:'none', cursor:'text', boxSizing:'border-box' },
  jumpChip: (i, cur) => ({
    display:'flex', alignItems:'center', gap:4, padding:'6px 12px', borderRadius:99, fontSize:12,
    border: i===cur ? '2px solid #7c3aed' : i<cur ? '2px solid #16a34a' : '2px solid rgba(255,255,255,0.15)',
    background: i===cur ? '#7c3aed' : 'transparent',
    color: i===cur ? '#fff' : i<cur ? '#4ade80' : '#94a3b8',
    cursor:'pointer',
  }),
};

const analysisTypes = [
  { id:'face',      icon:'🔬', label:'Facial Analysis',    desc:'Proportions & measurements',   color:'#f87171' },
  { id:'color',     icon:'🎨', label:'Color Analysis',     desc:'Seasonal color & skin tone',   color:'#fbbf24' },
  { id:'glasses',   icon:'👓', label:'Glasses Guide',      desc:'Frame matching by face shape', color:'#60a5fa' },
  { id:'hair',      icon:'💇', label:'Hairstyle Analysis', desc:'Best styles for your face',    color:'#c084fc' },
  { id:'physique',  icon:'💪', label:'Physique Analysis',  desc:'Body composition & posture',   color:'#4ade80' },
  { id:'aesthetic', icon:'✨', label:'Aesthetics Report',  desc:'Golden ratio & enhancement',   color:'#f472b6' },
  { id:'outfit',    icon:'👗', label:'Outfit Style Guide', desc:'Clothing & style suggestions', color:'#fb923c' },
  { id:'accessory', icon:'💍', label:'Accessory Guide',    desc:'Jewelry & accessory pairing',  color:'#facc15' },
];

const styleOptions = {
  outfit:    ['French Elegance','Modern Minimal','Street Style','Business Formal','Resort Casual','Vintage Chic','Athletic','Dark & Edgy'],
  hair:      ['Short & Sharp','Long & Flowing','Wavy Curls','Bun Updo','Fringe Style','Braided','Natural Volume','Sleek & Clean'],
  glasses:   ['Round Frame','Square Frame','Aviator','Cat-Eye','Rimless','Bold Thick Frame','Thin Wire Frame','Semi-Rimless'],
  accessory: ['Minimal Gold','Pearl Series','Bohemian','Punk Edge','Business Subtle','Romantic Floral','Sporty','Vintage Gem'],
  color:     ['Spring Warm Tones','Summer Cool Tones','Autumn Earth Tones','Winter Deep Tones'],
  face:[], physique:[], aesthetic:[],
};

const vibeOptions = ['More Dashing','More Elegant','More Youthful','More Sophisticated','More Cute','More Edgy'];

function getTodayString() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth()+1).padStart(2,'0');
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return { long:`${months[now.getMonth()]} ${now.getDate()}, ${y}`, subjectId:`${String(y).slice(2)}${m}${String(now.getDate()).padStart(2,'0')}-01` };
}

const buildPrompt = (id, vibe, styles) => {
  const today = getTodayString();
  const vibeText  = vibe          ? `Overall vibe direction: Make the subject look ${vibe}.` : '';
  const styleText = styles.length ? `Preferred styles: ${styles.join(', ')}.` : '';
  const base   = `[NEW INDEPENDENT TASK — IGNORE ALL PREVIOUS CONTEXT]\n\nUse the uploaded portrait photo as the ONLY subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo. Portrait must remain in FULL NATURAL COLOR.\n\n`;
  const footer = `\n\n${vibeText}\n${styleText}\n\nSTRICT RULES:\n✅ Full color portrait — never grayscale or black and white\n✅ All annotations seamlessly integrated on the photo\n✅ Subject identity must NOT be altered or idealized\n✅ Professional report layout only — not a poster or flyer\n✅ High resolution, sharp readable text, print quality\n✗ No watermarks, logos, or random stray characters`;
  const T = {
    face:`Generate a professional FACIAL ANALYSIS REPORT in HORIZONTAL 16:9 landscape layout.\n\nLEFT SECTION (55%):\n- Full color portrait with red measurement lines overlaid\n- Numbered markers: ① Nose Length ② Jaw Width ③ Eye Spacing ④ Face Width ⑤ Face Length ⑥ Mouth Width\n- Dashed oval outline showing detected face shape\n\nRIGHT SECTION (45%) — white background:\n- Header: "FACIAL ANALYSIS REPORT"\n- Subheader: "ANTHROPOMETRIC MEASUREMENTS"\n- SUBJECT ID: ${today.subjectId} | DATE: ${today.long}\n- MEASUREMENTS table: all 6 values in mm\n- PROPORTION INDEX table: 4 key ratios\n- ANATOMICAL LANDMARKS diagram: Tr, N, Zy, Pup, Sn, Ch, Go, Gn\n- NOTES and SUMMARY\n\nStyle: clinical medical anthropometry report`,
    color:`Generate a professional PERSONAL COLOR ANALYSIS REPORT in HORIZONTAL 16:9 landscape layout.\n\nLEFT SECTION (55%):\n- Full color portrait with color swatch chips overlaid near skin, hair, and eye areas\n- Season type badge (Spring / Summer / Autumn / Winter)\n- Undertone label: Warm / Cool / Neutral\n\nRIGHT SECTION (45%) — white background:\n- Header: "PERSONAL COLOR ANALYSIS"\n- Subheader: "SEASONAL COLOR PROFILING"\n- SUBJECT ID: ${today.subjectId} | DATE: ${today.long}\n- BEST COLORS: 6 swatches with hex codes and names\n- AVOID COLORS: 3 colors with reasons\n- COLOR PALETTE GRID\n- NOTES and SUMMARY\n\nStyle: fashion editorial, beauty magazine`,
    glasses:`Generate a professional SPECTACLES GUIDE in HORIZONTAL 16:9 landscape layout.\n\nLEFT SECTION (55%):\n- Full color portrait with face shape outline overlay\n- Top 3 best frame matches labeled near eye area\n\nRIGHT SECTION (45%) — white background:\n- Header: "SPECTACLES GUIDE"\n- Subheader: "FACE SHAPE & FRAME MATCHING"\n- SUBJECT ID: ${today.subjectId} | DATE: ${today.long}\n- RECOMMENDED FRAMES: 6 styles with suitability score and reason\n- FRAMES TO AVOID: 2–3 with reason\n- FRAME ICON GRID\n- NOTES and SUMMARY\n\nStyle: optical fashion editorial`,
    hair:`Generate a professional HAIRSTYLE ANALYSIS REPORT in HORIZONTAL 16:9 landscape layout.\n\nLEFT SECTION (55%):\n- Full color portrait with face contour and measurement guides\n- Top 2–3 hairstyle callout labels\n\nRIGHT SECTION (45%) — white background:\n- Header: "HAIRSTYLE ANALYSIS"\n- Subheader: "FACE SHAPE & STYLE MATCHING"\n- SUBJECT ID: ${today.subjectId} | DATE: ${today.long}\n- RECOMMENDED STYLES: 6 with rating and reason\n- STYLES TO AVOID: 2–3 with reason\n- SILHOUETTE ICON GRID\n- NOTES and SUMMARY\n\nStyle: beauty salon editorial`,
    physique:`Generate a professional PHYSIQUE ANALYSIS REPORT in HORIZONTAL 16:9 landscape layout.\n\nLEFT SECTION (55%):\n- Full color portrait with measurement lines and muscle labels\n- Body type badge: Ectomorph / Mesomorph / Endomorph\n\nRIGHT SECTION (45%) — dark background, white text:\n- Header: "PHYSIQUE ANALYSIS"\n- Subheader: "BODY COMPOSITION ASSESSMENT"\n- SUBJECT ID: ${today.subjectId} | DATE: ${today.long}\n- BODY METRICS: 6 key measurements\n- FITNESS INDEX: 3 scores\n- BODY SILHOUETTE DIAGRAM\n- NOTES and SUMMARY\n\nStyle: fitness app, sports science report`,
    aesthetic:`Generate a professional FACIAL AESTHETICS REPORT in HORIZONTAL 16:9 landscape layout.\n\nLEFT SECTION (55%):\n- Full color portrait with golden ratio phi grid overlay\n- Improvement arrows: hairline, brow, skin, lips, jaw\n\nRIGHT SECTION (45%) — white background with gold accents:\n- Header: "FACIAL AESTHETICS REPORT"\n- Subheader: "ENHANCEMENT SUGGESTION ANALYSIS"\n- SUBJECT ID: ${today.subjectId} | DATE: ${today.long}\n- ENHANCEMENT SUGGESTIONS: 6 facial zones\n- HARMONY SCORES: Symmetry, Golden Ratio, Feature Balance\n- FACIAL THIRDS DIAGRAM\n- NOTES and SUMMARY\n\nStyle: aesthetic medicine, luxury beauty clinic`,
    outfit:`Generate a professional OUTFIT STYLE GUIDE in HORIZONTAL 16:9 landscape layout.\n\nLEFT SECTION (55%):\n- Full color portrait with subject wearing a stylish outfit\n- Face and identity 100% unchanged — only clothing changes\n\nRIGHT SECTION (45%) — white background:\n- Header: "OUTFIT STYLE GUIDE"\n- Subheader: "PERSONAL STYLING REPORT"\n- SUBJECT ID: ${today.subjectId} | DATE: ${today.long}\n- RECOMMENDED LOOKS: 6 styles with name, occasion, why it works\n- COLOR PALETTE: swatches per look\n- STYLES TO AVOID: 3–4 with reason\n- MOOD BOARD icon grid\n- NOTES and SUMMARY\n\nStyle: fashion magazine, personal stylist editorial`,
    accessory:`Generate a professional ACCESSORY STYLING GUIDE in HORIZONTAL 16:9 landscape layout.\n\nLEFT SECTION (55%):\n- Full color portrait with accessory overlays (necklace, watch, earrings)\n- Face and identity 100% unchanged\n\nRIGHT SECTION (45%) — white background:\n- Header: "ACCESSORY GUIDE"\n- Subheader: "PERSONAL STYLING REPORT"\n- SUBJECT ID: ${today.subjectId} | DATE: ${today.long}\n- RECOMMENDED ACCESSORIES: 6 items with name, style, material, occasion\n- METAL & MATERIAL SUGGESTIONS\n- PIECES TO AVOID with reason\n- ACCESSORY ICON GRID\n- NOTES and SUMMARY\n\nStyle: luxury fashion, fine jewelry editorial`,
  };
  return base + (T[id]||'') + footer;
};

function copyToClipboard(text) {
  return new Promise((resolve, reject) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(resolve).catch(() => { fallbackCopy(text) ? resolve() : reject(); });
    } else { fallbackCopy(text) ? resolve() : reject(); }
  });
}
function fallbackCopy(text) {
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;';
    document.body.appendChild(ta); ta.focus(); ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta); return ok;
  } catch { return false; }
}

function CopyButton({ text }) {
  const [state, setState] = useState('idle');
  const handle = async () => {
    if (state==='copied') return;
    try { await copyToClipboard(text); setState('copied'); setTimeout(()=>setState('idle'),2500); }
    catch { setState('manual'); setTimeout(()=>setState('idle'),3000); }
  };
  return (
    <button onClick={handle} style={S.copyBtn(state)}>
      {state==='copied' ? '✅  Copied! Paste into ChatGPT' : state==='manual' ? '⚠️  Select text below to copy' : '📋  Copy Prompt'}
    </button>
  );
}

function SelectableText({ text }) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  return (
    <div>
      <button onClick={()=>{ setShow(v=>!v); setTimeout(()=>{ if(ref.current){ref.current.select();} },100); }}
        style={{ background:'none', border:'none', color:'#64748b', fontSize:12, cursor:'pointer', textDecoration:'underline', padding:0 }}>
        {show ? '▲ Hide' : '▼ Manual copy (fallback)'}
      </button>
      {show && (
        <div style={{ marginTop:8 }}>
          <p style={{ fontSize:12, color:'#fbbf24', marginBottom:4 }}>👆 Click box → Ctrl+A → Ctrl+C</p>
          <textarea ref={ref} readOnly value={text} style={S.textarea}
            onClick={e=>{ e.target.select(); e.target.setSelectionRange(0,text.length); }} />
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [photo,            setPhoto]            = useState(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState([]);
  const [selectedStyles,   setSelectedStyles]   = useState({});
  const [selectedVibe,     setSelectedVibe]     = useState('');
  const [generatedPrompts, setGeneratedPrompts] = useState([]);
  const [step,             setStep]             = useState(1);
  const [currentIndex,     setCurrentIndex]     = useState(0);
  const today = getTodayString();

  const handlePhotoUpload = e => {
    const file = e.target.files[0];
    if (file) { setPhoto(URL.createObjectURL(file)); setStep(2); }
  };
  const toggleAnalysis = id => {
    setSelectedAnalysis(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev,id]);
    if (step<3) setStep(3);
  };
  const toggleStyle = (aid, style) => {
    setSelectedStyles(prev => { const cur=prev[aid]||[]; return {...prev,[aid]:cur.includes(style)?cur.filter(x=>x!==style):[...cur,style]}; });
  };
  const generatePrompts = () => {
    const prompts = selectedAnalysis.map(id => ({
      id, label:analysisTypes.find(a=>a.id===id)?.label, icon:analysisTypes.find(a=>a.id===id)?.icon,
      prompt: buildPrompt(id, selectedVibe, selectedStyles[id]||[]),
    }));
    setGeneratedPrompts(prompts); setCurrentIndex(0); setStep(4);
  };
  const reset = () => { setStep(2); setGeneratedPrompts([]); setSelectedAnalysis([]); setSelectedStyles({}); setSelectedVibe(''); setCurrentIndex(0); };
  const current = generatedPrompts[currentIndex];
  const total   = generatedPrompts.length;

  return (
    <div style={S.app}>
      {/* Header */}
      <div style={S.header}>
        <div style={S.headerInner}>
          <span style={{ fontSize:32 }}>🪞</span>
          <div>
            <p style={S.headerTitle}>AI Style Analyzer</p>
            <p style={S.headerSub}>Upload · Select · Copy Prompt · Send to ChatGPT</p>
          </div>
          <div style={S.headerDate}>
            <div>📅 {today.long}</div>
            <div style={{ color:'rgba(255,255,255,0.4)', fontSize:11 }}>Free · No API needed</div>
          </div>
        </div>
      </div>

      <div style={S.main}>

        {/* STEP 1 */}
        <div style={S.cardViolet}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
            <span style={S.badge('#7c3aed')}>STEP 1</span>
            <h2 style={S.stepTitle}>Upload Photo</h2>
          </div>
          <div style={{ display:'flex', gap:20, alignItems:'center' }}>
            <label style={{ cursor:'pointer', flexShrink:0 }}>
              <div style={{ width:112, height:112, borderRadius:16, border:`2px dashed ${photo?'#4ade80':'#a78bfa'}`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', overflow:'hidden', ...(photo?{backgroundImage:`url(${photo})`,backgroundSize:'cover',backgroundPosition:'center'}:{}) }}>
                {!photo && <><span style={{ fontSize:32 }}>📷</span><span style={{ fontSize:12, color:'#94a3b8', textAlign:'center', padding:'0 8px' }}>Click to upload</span></>}
              </div>
              <input type="file" accept="image/*" style={{ display:'none' }} onChange={handlePhotoUpload} />
            </label>
            <div style={{ fontSize:14, color:'#94a3b8', lineHeight:1.8 }}>
              {photo ? <p style={{ color:'#4ade80', fontWeight:600 }}>✅ Photo uploaded! Continue below.</p>
                     : <p style={{ color:'#a78bfa' }}>Upload a clear, front-facing portrait</p>}
              <p>• JPG / PNG / WEBP supported</p>
              <p>• Good lighting recommended</p>
              <p style={{ fontSize:12, color:'#64748b' }}>💡 You'll send this photo + the prompt to ChatGPT</p>
            </div>
          </div>
        </div>

        {/* STEP 2 */}
        {step>=2 && (
          <div style={S.cardPink}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16, flexWrap:'wrap' }}>
              <span style={S.badge('#db2777')}>STEP 2</span>
              <h2 style={S.stepTitle}>Choose Analysis Types</h2>
              <span style={{ fontSize:12, color:'#94a3b8' }}>Multiple allowed</span>
              {selectedAnalysis.length>0 && <span style={{ marginLeft:'auto', ...S.badge('#9d174d'), fontSize:12 }}>{selectedAnalysis.length} selected</span>}
            </div>
            <div style={S.grid2}>
              {analysisTypes.map(a => (
                <button key={a.id} onClick={()=>toggleAnalysis(a.id)} style={S.analysisBtn(selectedAnalysis.includes(a.id), a.color)}>
                  <span style={{ fontSize:22 }}>{a.icon}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontWeight:600, fontSize:14, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{a.label}</div>
                    <div style={{ fontSize:12, color:'#94a3b8', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{a.desc}</div>
                  </div>
                  <div style={{ width:20, height:20, borderRadius:'50%', border:`2px solid ${selectedAnalysis.includes(a.id)?a.color:'#475569'}`, background:selectedAnalysis.includes(a.id)?a.color:'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    {selectedAnalysis.includes(a.id) && <span style={{ fontSize:11, color:'#fff' }}>✓</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step>=3 && selectedAnalysis.length>0 && (
          <div style={S.cardAmber}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
              <span style={S.badge('#d97706')}>STEP 3</span>
              <h2 style={S.stepTitle}>Style Preferences</h2>
              <span style={{ fontSize:12, color:'#94a3b8' }}>Optional</span>
            </div>
            <div style={{ marginBottom:16 }}>
              <p style={{ fontSize:13, fontWeight:600, color:'#fbbf24', marginBottom:8 }}>🌟 Overall Vibe Direction</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {vibeOptions.map(v => (
                  <button key={v} onClick={()=>setSelectedVibe(selectedVibe===v?'':v)} style={S.vibeChip(selectedVibe===v)}>{v}</button>
                ))}
              </div>
            </div>
            {selectedAnalysis.map(id => {
              const opts = styleOptions[id];
              if (!opts||opts.length===0) return null;
              const a = analysisTypes.find(x=>x.id===id);
              return (
                <div key={id} style={{ marginBottom:12 }}>
                  <p style={{ fontSize:13, fontWeight:600, color:'#cbd5e1', marginBottom:8 }}>{a.icon} {a.label} — Specific Preferences</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                    {opts.map(opt => (
                      <button key={opt} onClick={()=>toggleStyle(id,opt)} style={S.chip((selectedStyles[id]||[]).includes(opt))}>{opt}</button>
                    ))}
                  </div>
                </div>
              );
            })}
            <button onClick={generatePrompts} style={S.generateBtn}>✨ Generate Prompts</button>
          </div>
        )}

        {/* STEP 4 */}
        {step>=4 && current && (
          <div style={S.cardGreen}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:8, marginBottom:16 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={S.badge('#16a34a')}>STEP 4</span>
                <h2 style={S.stepTitle}>Copy & Send to ChatGPT</h2>
              </div>
              <div style={{ display:'flex', gap:6 }}>
                {generatedPrompts.map((_,i) => (
                  <button key={i} onClick={()=>setCurrentIndex(i)} style={S.dot(i,currentIndex)}>{i<currentIndex?'✓':i+1}</button>
                ))}
              </div>
            </div>

            <div style={{ background:'rgba(255,255,255,0.05)', borderRadius:12, padding:'12px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
              <div>
                <p style={{ fontSize:12, color:'#94a3b8', margin:0 }}>Current</p>
                <p style={{ fontSize:22, fontWeight:700, margin:0 }}>{currentIndex+1} <span style={{ fontSize:14, color:'#94a3b8', fontWeight:400 }}>of {total}</span></p>
              </div>
              <div style={{ textAlign:'right' }}>
                <p style={{ fontSize:28, margin:0 }}>{current.icon}</p>
                <p style={{ fontWeight:600, fontSize:14, margin:0 }}>{current.label}</p>
              </div>
            </div>

            <div style={{ ...S.infoBox, marginBottom:16 }}>
              <p style={{ fontWeight:700, color:'#a78bfa', marginBottom:6, fontSize:13 }}>📌 How to use — Item {currentIndex+1}:</p>
              <div style={{ fontSize:13, color:'#cbd5e1', lineHeight:1.8 }}>
                <p style={{ margin:0 }}>① Click <strong>"Copy Prompt"</strong> below</p>
                <p style={{ margin:0 }}>② Open <strong>ChatGPT</strong> → upload your photo</p>
                <p style={{ margin:0 }}>③ Paste the prompt and send</p>
                {currentIndex<total-1
                  ? <p style={{ margin:0, color:'#fbbf24' }}>④ After it generates, come back and click <strong>Next →</strong></p>
                  : <p style={{ margin:0, color:'#4ade80' }}>🎉 This is the last one — you're almost done!</p>}
              </div>
            </div>

            <div style={{ marginBottom:8 }}><CopyButton text={current.prompt} /></div>
            <div style={{ marginBottom:16 }}><SelectableText text={current.prompt} /></div>

            <div style={{ display:'flex', gap:12, marginBottom:16 }}>
              <button onClick={()=>setCurrentIndex(i=>Math.max(0,i-1))} disabled={currentIndex===0} style={S.navBtn(currentIndex===0)}>← Previous</button>
              {currentIndex<total-1
                ? <button onClick={()=>setCurrentIndex(i=>i+1)} style={S.nextBtn}>Next → {generatedPrompts[currentIndex+1]?.icon}</button>
                : <button onClick={reset} style={S.doneBtn}>🎉 Done! Start Over</button>}
            </div>

            {total>1 && (
              <div style={{ borderTop:'1px solid rgba(255,255,255,0.1)', paddingTop:12 }}>
                <p style={{ fontSize:12, color:'#64748b', marginBottom:8 }}>Quick jump:</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {generatedPrompts.map((p,i) => (
                    <button key={p.id} onClick={()=>setCurrentIndex(i)} style={S.jumpChip(i,currentIndex)}>
                      {i<currentIndex&&<span>✓</span>}{p.icon} {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}