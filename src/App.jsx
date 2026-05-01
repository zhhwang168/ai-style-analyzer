import { useState, useEffect } from "react";

const ANALYSIS_TYPES = [
  {
    id: "face",
    label: "Facial Analysis",
    sub: "Proportions & measurements",
    icon: "🔬",
    prompt: (name, vibe) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo.

Generate a professional Facial Feature Report in a HORIZONTAL 16:9 landscape layout.

Subject name: ${name}${vibe ? `\nStyle vibe preference: ${vibe}` : ""}

LEFT SECTION (55%): Display portrait in FULL COLOR. Overlay red measurement lines and numbered markers:
- Thin red lines measuring nose length, jaw width, eye spacing
- Numbered red dot markers at anatomical landmarks
- Dashed oval outline showing detected face shape

RIGHT SECTION (45%): White/light gray background. Clean report layout.
HEADER: "FACIAL ANALYSIS REPORT" / "ANTHROPOMETRIC MEASUREMENTS"
MEASUREMENTS: Nose Length / Jaw Width / Eye Spacing / Face Width / Face Length / Mouth Width
PROPORTION INDEX: Face Width/Length · Eye Spacing/Width · Nose Length/Face Length
DIAGRAM: Small frontal face line-art with labeled anatomical landmarks
NOTES: Measurements approximate · Expression: neutral · Units: mm (estimated)
SUMMARY: 2–3 sentence professional summary for ${name}.

STRICT RULES: ✅ Full natural color portrait · ✅ Annotations seamlessly on photo · ✅ Face/identity unaltered · ✗ No grayscale · ✗ No floating labels · ✗ No watermarks`,
  },
  {
    id: "color",
    label: "Color Analysis",
    sub: "Seasonal color & skin tone",
    icon: "🎨",
    prompt: (name, vibe) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo.

Generate a professional Personal Color Report in a HORIZONTAL 16:9 landscape layout.

Subject name: ${name}${vibe ? `\nStyle vibe preference: ${vibe}` : ""}

LEFT SECTION (55%): Display portrait in FULL COLOR. Overlay color swatch overlays and tone labels:
- Small color swatches placed near skin, hair, and eye areas
- Labels indicating undertone (warm/cool/neutral)
- Season type badge (Spring / Summer / Autumn / Winter)

RIGHT SECTION (45%): White/light gray background. Clean report layout.
HEADER: "PERSONAL COLOR ANALYSIS REPORT" / "SEASONAL COLOR PROFILING"
BEST COLORS: 6 recommended clothing colors with hex codes and color names
AVOID COLORS: 3 colors to avoid with brief reason each
DIAGRAM: Color palette grid — 6 best + 3 avoid colors as swatches
NOTES: Based on frontal natural light photo · Undertone detected · Season type identified
SUMMARY: 2–3 sentence professional summary for ${name}.

STRICT RULES: ✅ Full natural color portrait · ✅ Annotations seamlessly on photo · ✅ Face/identity unaltered · ✗ No grayscale · ✗ No floating labels · ✗ No watermarks`,
  },
  {
    id: "glasses",
    label: "Glasses Guide",
    sub: "Frame matching by face shape",
    icon: "👓",
    prompt: (name, vibe) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo.

Generate a professional Spectacles Recommendation Report in a HORIZONTAL 16:9 landscape layout.

Subject name: ${name}${vibe ? `\nStyle vibe preference: ${vibe}` : ""}

LEFT SECTION (55%): Display portrait in FULL COLOR. Overlay face shape outline and measurement guides:
- Dashed outline tracing the detected face shape
- Width and length ratio lines across the face
- Small frame icons overlaid near the eye area showing best match

RIGHT SECTION (45%): White/light gray background. Clean report layout.
HEADER: "SPECTACLES GUIDE" / "FACE SHAPE & FRAME MATCHING"
RECOMMENDED FRAMES: Round / Rectangular / Aviator / Cat-eye / Rimless / Bold — each with suitability score
FRAMES TO AVOID: Frame styles that clash with detected face shape + reason
DIAGRAM: Grid of 6 small frame style icons with labels
NOTES: Based on frontal face proportions · Face shape detected · Style guidelines only
SUMMARY: 2–3 sentence professional summary for ${name}.

STRICT RULES: ✅ Full natural color portrait · ✅ Annotations seamlessly on photo · ✅ Face/identity unaltered · ✗ No grayscale · ✗ No floating labels · ✗ No watermarks`,
  },
  {
    id: "hairstyle",
    label: "Hairstyle Analysis",
    sub: "Best styles for your face",
    icon: "💇",
    prompt: (name, vibe) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo.

Generate a professional Hairstyle Report in a HORIZONTAL 16:9 landscape layout.

Subject name: ${name}${vibe ? `\nStyle vibe preference: ${vibe}` : ""}

LEFT SECTION (55%): Display portrait in FULL COLOR. Overlay face contour lines and proportion guides:
- Forehead width measurement line
- Jawline contour outline
- Face length-to-width ratio indicator

RIGHT SECTION (45%): White/light gray background. Clean report layout.
HEADER: "HAIRSTYLE ANALYSIS REPORT" / "FACE SHAPE & STYLE MATCHING"
RECOMMENDED HAIRSTYLES: 6 hairstyle names with suitability rating and brief reason each
STYLES TO AVOID: 3 hairstyles that don't suit the face shape + reason
DIAGRAM: Small hairstyle silhouette icons grid with labels
NOTES: Based on face shape analysis · Hair texture not assessed · Style suggestions only
SUMMARY: 2–3 sentence professional summary for ${name}.

STRICT RULES: ✅ Full natural color portrait · ✅ Annotations seamlessly on photo · ✅ Face/identity unaltered · ✗ No grayscale · ✗ No floating labels · ✗ No watermarks`,
  },
  {
    id: "physique",
    label: "Physique Analysis",
    sub: "Body composition & posture",
    icon: "💪",
    prompt: (name, vibe) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo.

Generate a professional Physique Report in a HORIZONTAL 16:9 landscape layout.

Subject name: ${name}${vibe ? `\nStyle vibe preference: ${vibe}` : ""}

LEFT SECTION (55%): Display portrait in FULL COLOR. Overlay body measurement lines and muscle group labels:
- Shoulder width, waist, and hip measurement lines
- Muscle group labels (shoulders, core, arms, legs)
- Body type badge (Ectomorph / Mesomorph / Endomorph)

RIGHT SECTION (45%): White/light gray background. Clean report layout.
HEADER: "PHYSIQUE ANALYSIS REPORT" / "BODY COMPOSITION ASSESSMENT"
BODY METRICS: Est. Body Fat % / Shoulder Width / Waist Ratio / Muscle Balance / Posture Score / Body Type
FITNESS INDEX: Strength Score · Flexibility Score · Proportion Balance
DIAGRAM: Small body silhouette diagram with labeled muscle groups
NOTES: Estimates based on visual 2D image · Not a medical assessment · Consult a professional
SUMMARY: 2–3 sentence professional summary for ${name}.

STRICT RULES: ✅ Full natural color portrait · ✅ Annotations seamlessly on photo · ✅ Face/identity unaltered · ✗ No grayscale · ✗ No floating labels · ✗ No watermarks`,
  },
  {
    id: "aesthetics",
    label: "Aesthetics Report",
    sub: "Golden ratio & enhancement",
    icon: "✨",
    prompt: (name, vibe) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo.

Generate a professional Facial Aesthetics Report in a HORIZONTAL 16:9 landscape layout.

Subject name: ${name}${vibe ? `\nStyle vibe preference: ${vibe}` : ""}

LEFT SECTION (55%): Display portrait in FULL COLOR. Overlay improvement suggestion arrows and labeled callouts:
- Arrows pointing to hairline, brow, skin, and expression areas
- Short callout labels with improvement suggestions
- Golden ratio overlay lines on facial thirds

RIGHT SECTION (45%): White/light gray background. Clean report layout.
HEADER: "FACIAL AESTHETICS REPORT" / "ENHANCEMENT SUGGESTION ANALYSIS"
ENHANCEMENT SUGGESTIONS: Hairline / Brow Shape / Skin Quality / Eye Area / Lip Balance / Jaw Definition
HARMONY SCORES: Facial Symmetry · Golden Ratio Match · Feature Balance
DIAGRAM: Golden ratio facial thirds diagram
NOTES: Visual estimates only · Not medical advice · Based on 2D frontal image
SUMMARY: 2–3 sentence professional summary for ${name}.

STRICT RULES: ✅ Full natural color portrait · ✅ Annotations seamlessly on photo · ✅ Face/identity unaltered · ✗ No grayscale · ✗ No floating labels · ✗ No watermarks`,
  },
  {
    id: "outfit",
    label: "Outfit Style Guide",
    sub: "Clothing & style suggestions",
    icon: "👗",
    prompt: (name, vibe) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo.

Generate a professional Outfit Style Report in a HORIZONTAL 16:9 landscape layout.

Subject name: ${name}${vibe ? `\nStyle vibe preference: ${vibe}` : ""}

LEFT SECTION (55%): Display portrait in FULL COLOR. Overlay style annotation labels:
- Labels pointing to clothing items with style category tags
- Color coordination indicators between pieces
- Overall style archetype badge (Casual / Formal / Streetwear / Minimalist / etc.)

RIGHT SECTION (45%): White/light gray background. Clean report layout.
HEADER: "OUTFIT STYLE REPORT" / "PERSONAL STYLE ASSESSMENT"
STYLE PROFILE: Style Category / Color Palette / Key Pieces / Fit Assessment / Occasion Suitability / Style Score
UPGRADE SUGGESTIONS: 3 specific ways to enhance or evolve this look
DIAGRAM: Small outfit flat-lay icons or style mood board
NOTES: Based on visible clothing only · Accessories not fully assessed · Style is subjective
SUMMARY: 2–3 sentence professional style summary for ${name}.

STRICT RULES: ✅ Full natural color portrait · ✅ Annotations seamlessly on photo · ✅ Face/identity unaltered · ✗ No grayscale · ✗ No floating labels · ✗ No watermarks`,
  },
  {
    id: "accessory",
    label: "Accessory Guide",
    sub: "Jewelry & accessory pairing",
    icon: "💍",
    prompt: (name, vibe) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo.

Generate a professional Accessory Recommendation Report in a HORIZONTAL 16:9 landscape layout.

Subject name: ${name}${vibe ? `\nStyle vibe preference: ${vibe}` : ""}

LEFT SECTION (55%): Display portrait in FULL COLOR. Overlay accessory placement guides:
- Indicators showing ideal necklace length for neckline
- Earring style suggestions overlaid near ear area
- Wrist/hand accessory placement markers

RIGHT SECTION (45%): White/light gray background. Clean report layout.
HEADER: "ACCESSORY GUIDE" / "JEWELRY & ACCESSORY PAIRING"
RECOMMENDED ACCESSORIES: Necklace / Earrings / Bracelet / Ring / Bag / Hat — each with style match score
AVOID: Accessory styles that clash with detected face shape or outfit
DIAGRAM: Small accessory icon grid with pairing labels
NOTES: Based on visible features and outfit · Personal taste may vary · Style guidelines only
SUMMARY: 2–3 sentence professional accessory recommendation for ${name}.

STRICT RULES: ✅ Full natural color portrait · ✅ Annotations seamlessly on photo · ✅ Face/identity unaltered · ✗ No grayscale · ✗ No floating labels · ✗ No watermarks`,
  },
];

const VIBES = ["More Dashing", "More Elegant", "More Youthful", "More Sophisticated", "More Cute", "More Edgy"];

export default function App() {
  const [image, setImage] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [userName, setUserName] = useState("");
  const [selectedVibe, setSelectedVibe] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [visitorCount, setVisitorCount] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    fetch("https://api.counterapi.dev/v1/ai-style-analyzer/visits/up")
      .then((res) => res.json())
      .then((data) => setVisitorCount(data.count))
      .catch(() => setVisitorCount("--"));
  }, []);

  const handleImage = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleImage(file);
  };

  const toggleType = (id) => {
    setSelectedTypes((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
    setGenerated(false);
  };

  const handleCopy = (id, prompt) => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const selectedTypesData = ANALYSIS_TYPES.filter((t) => selectedTypes.includes(t.id));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: #0d0d1a; min-height: 100vh; }

        .page-wrap {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: linear-gradient(160deg, #0d0d1a 0%, #130d2a 50%, #0a1020 100%);
          position: relative;
        }
        .page-wrap::before {
          content: '';
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background:
            radial-gradient(ellipse at 15% 15%, rgba(139,92,246,0.18) 0%, transparent 45%),
            radial-gradient(ellipse at 85% 80%, rgba(236,72,153,0.13) 0%, transparent 45%);
          pointer-events: none; z-index: 0;
          animation: bgPulse 10s ease-in-out infinite alternate;
        }
        @keyframes bgPulse {
          from { opacity: 0.7; }
          to { opacity: 1; }
        }

        .top-header {
          background: linear-gradient(90deg, #6d28d9, #a21caf, #db2777);
          padding: 14px 20px;
          display: flex; align-items: center; justify-content: space-between;
          position: sticky; top: 0; z-index: 100;
          box-shadow: 0 2px 20px rgba(139,92,246,0.4);
        }
        .header-left { display: flex; align-items: center; gap: 10px; }
        .header-icon { font-size: 26px; filter: drop-shadow(0 0 8px rgba(255,255,255,0.5)); }
        .header-title { font-size: 18px; font-weight: 800; color: white; letter-spacing: -0.3px; }
        .header-sub { font-size: 11px; color: rgba(255,255,255,0.7); margin-top: 1px; }
        .header-right { text-align: right; font-size: 12px; color: rgba(255,255,255,0.75); line-height: 1.6; }

        .main-content {
          flex: 1; max-width: 760px; margin: 0 auto; width: 100%;
          padding: 24px 16px 32px; display: flex; flex-direction: column; gap: 16px;
          position: relative; z-index: 1;
        }

        .card {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 20px;
          transition: border-color 0.3s;
        }
        .card:hover { border-color: rgba(139,92,246,0.25); }

        .step-badge {
          display: inline-flex; align-items: center;
          background: linear-gradient(90deg, #f59e0b, #f97316);
          color: white; font-size: 11px; font-weight: 800;
          padding: 3px 10px; border-radius: 999px; margin-right: 10px;
          letter-spacing: 0.5px;
        }
        .step-badge.purple {
          background: linear-gradient(90deg, #7c3aed, #a855f7);
        }
        .step-badge.pink {
          background: linear-gradient(90deg, #db2777, #f472b6);
        }
        .card-title {
          font-size: 16px; font-weight: 700; color: white;
          display: flex; align-items: center;
        }
        .card-title-row {
          display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;
        }

        .upload-zone {
          border: 2px dashed rgba(255,255,255,0.15);
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.3s;
          overflow: hidden;
        }
        .upload-zone:hover, .upload-zone.drag-over {
          border-color: rgba(167,139,250,0.6);
          background: rgba(139,92,246,0.07);
        }
        .upload-inner {
          display: flex; align-items: center; gap: 16px; padding: 16px;
        }
        .upload-thumb {
          width: 90px; height: 90px; border-radius: 12px;
          object-fit: cover; flex-shrink: 0;
          border: 2px solid rgba(167,139,250,0.4);
        }
        .upload-placeholder {
          width: 90px; height: 90px; border-radius: 12px;
          background: rgba(255,255,255,0.05);
          display: flex; align-items: center; justify-content: center;
          font-size: 32px; flex-shrink: 0;
        }
        .upload-text-success { color: #4ade80; font-weight: 700; font-size: 14px; margin-bottom: 8px; }
        .upload-hint { font-size: 12px; color: rgba(255,255,255,0.4); line-height: 1.8; }
        .upload-tip { font-size: 11px; color: rgba(255,255,255,0.25); margin-top: 6px; }

        .selected-count {
          background: linear-gradient(90deg, #7c3aed, #ec4899);
          color: white; font-size: 12px; font-weight: 700;
          padding: 4px 12px; border-radius: 999px;
        }
        .multi-hint { font-size: 12px; color: rgba(255,255,255,0.35); margin-left: 6px; }

        .type-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
        }
        .type-btn {
          display: flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; padding: 12px 14px;
          cursor: pointer; transition: all 0.2s; text-align: left;
          position: relative;
        }
        .type-btn:hover {
          background: rgba(139,92,246,0.1);
          border-color: rgba(139,92,246,0.35);
        }
        .type-btn.selected {
          background: rgba(124,58,237,0.2);
          border-color: rgba(167,139,250,0.6);
          box-shadow: 0 0 16px rgba(139,92,246,0.2);
        }
        .type-icon { font-size: 22px; flex-shrink: 0; }
        .type-label { font-size: 13px; font-weight: 600; color: white; }
        .type-sub { font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 2px; }
        .type-check {
          width: 20px; height: 20px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.2);
          margin-left: auto; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; transition: all 0.2s;
        }
        .type-check.checked {
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          border-color: transparent; color: white;
        }

        .vibe-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
        .vibe-btn {
          padding: 7px 16px; border-radius: 999px; font-size: 13px; font-weight: 500;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.6);
          cursor: pointer; transition: all 0.2s;
        }
        .vibe-btn:hover { border-color: rgba(167,139,250,0.4); color: white; }
        .vibe-btn.active {
          background: linear-gradient(135deg, #f59e0b, #f97316);
          border-color: transparent; color: white; font-weight: 700;
          box-shadow: 0 4px 14px rgba(245,158,11,0.35);
        }
        .vibe-label { font-size: 13px; font-weight: 600; color: #fbbf24; margin-bottom: 2px; }

        .generate-btn {
          width: 100%; padding: 16px;
          background: linear-gradient(90deg, #7c3aed, #a855f7, #ec4899);
          background-size: 200%;
          animation: gradShift 4s ease infinite;
          border: none; border-radius: 14px;
          color: white; font-size: 16px; font-weight: 800;
          cursor: pointer; transition: all 0.3s;
          box-shadow: 0 6px 24px rgba(139,92,246,0.45);
          letter-spacing: 0.3px;
        }
        .generate-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(139,92,246,0.6); }
        .generate-btn:disabled {
          background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.3);
          cursor: not-allowed; animation: none; box-shadow: none; transform: none;
        }
        @keyframes gradShift {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .prompt-block {
          background: rgba(0,0,0,0.35);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; overflow: hidden; margin-bottom: 12px;
        }
        .prompt-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 16px;
          background: rgba(139,92,246,0.12);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .prompt-type-label { font-size: 14px; font-weight: 700; color: white; }
        .copy-btn {
          padding: 6px 16px; border-radius: 999px; font-size: 12px; font-weight: 700;
          border: none; cursor: pointer; transition: all 0.2s;
          background: linear-gradient(90deg, #7c3aed, #ec4899);
          color: white;
        }
        .copy-btn.done { background: linear-gradient(90deg, #059669, #10b981); }
        .copy-btn:hover { transform: scale(1.05); }
        .prompt-text {
          padding: 14px 16px; font-size: 12px; color: rgba(255,255,255,0.6);
          line-height: 1.7; max-height: 140px; overflow-y: auto;
          white-space: pre-wrap; word-break: break-word;
        }

        .how-steps { display: flex; flex-direction: column; gap: 10px; }
        .how-step { display: flex; align-items: flex-start; gap: 12px; }
        .how-num {
          width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 800; color: white;
        }
        .how-text { font-size: 13px; color: rgba(255,255,255,0.55); line-height: 1.6; padding-top: 3px; }
        .how-link { color: #a78bfa; text-decoration: none; font-weight: 600; }
        .how-link:hover { text-decoration: underline; }

        .visits-pill {
          display: flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.1); border-radius: 999px;
          padding: 5px 12px; font-size: 12px; color: rgba(255,255,255,0.65);
        }
        .live-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #4ade80; box-shadow: 0 0 6px #4ade80;
          animation: blink 2s ease-in-out infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

        footer {
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 28px 20px; position: relative; z-index: 1;
        }
        .footer-inner { max-width: 760px; margin: 0 auto; }
        .author-row { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
        .avatar {
          width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; font-weight: 800; color: white;
          box-shadow: 0 0 18px rgba(139,92,246,0.5);
        }
        .author-name { font-size: 15px; font-weight: 700; color: white; }
        .author-bio { font-size: 12px; color: rgba(255,255,255,0.4); margin-top: 3px; }
        .social-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
        .soc-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 16px; border-radius: 999px; font-size: 12px; font-weight: 600;
          text-decoration: none; transition: all 0.2s;
        }
        .soc-yt { background: rgba(220,38,38,0.2); border: 1px solid rgba(220,38,38,0.35); color: #fca5a5; }
        .soc-yt:hover { background: rgba(220,38,38,0.35); transform: translateY(-2px); }
        .soc-yt2 { background: rgba(185,28,28,0.2); border: 1px solid rgba(185,28,28,0.35); color: #fca5a5; }
        .soc-yt2:hover { background: rgba(185,28,28,0.35); transform: translateY(-2px); }
        .soc-coffee { background: rgba(234,179,8,0.15); border: 1px solid rgba(234,179,8,0.35); color: #fde047; }
        .soc-coffee:hover { background: rgba(234,179,8,0.28); transform: translateY(-2px); }
        .ad-box {
          border: 1px dashed rgba(255,255,255,0.1); border-radius: 14px;
          padding: 16px; text-align: center; margin-bottom: 16px;
          background: rgba(255,255,255,0.02);
        }
        .ad-title { font-size: 13px; color: rgba(255,255,255,0.35); font-weight: 600; }
        .ad-sub { font-size: 11px; color: rgba(255,255,255,0.2); margin-top: 4px; }
        .ad-link { color: #a78bfa; text-decoration: none; }
        .divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent); margin: 16px 0; }
        .copyright { text-align: center; font-size: 11px; color: rgba(255,255,255,0.15); }

        .fade-in { animation: fadeUp 0.4s ease forwards; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <div className="page-wrap">
        {/* HEADER */}
        <header className="top-header">
          <div className="header-left">
            <span className="header-icon">🪄</span>
            <div>
              <div className="header-title">AI Style Analyzer</div>
              <div className="header-sub">Upload · Select · Copy Prompt · Send to ChatGPT</div>
            </div>
          </div>
          <div className="header-right">
            <div>{new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div>
            <div style={{color:"rgba(255,255,255,0.5)"}}>Free · No API needed</div>
          </div>
        </header>

        <main className="main-content">

          {/* STEP 1 — Upload */}
          <div className="card">
            <div className="card-title-row">
              <div className="card-title">
                <span className="step-badge">STEP 1</span> Upload Photo
              </div>
              <div className="visits-pill">
                <div className="live-dot" />
                <span>{visitorCount !== null ? Number(visitorCount).toLocaleString() : "..."} visits</span>
              </div>
            </div>
            <div
              className={`upload-zone${dragOver ? " drag-over" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById("fileInput").click()}
            >
              <input id="fileInput" type="file" accept="image/*" style={{display:"none"}} onChange={(e) => handleImage(e.target.files[0])} />
              <div className="upload-inner">
                {image
                  ? <img src={image} alt="uploaded" className="upload-thumb" />
                  : <div className="upload-placeholder">📷</div>
                }
                <div>
                  {image
                    ? <div className="upload-text-success">✅ Photo uploaded! Continue below.</div>
                    : <div style={{color:"rgba(255,255,255,0.7)",fontWeight:600,fontSize:14,marginBottom:8}}>Click or drag & drop your photo</div>
                  }
                  <div className="upload-hint">
                    • JPG / PNG / WEBP supported<br/>
                    • Good lighting recommended
                  </div>
                  <div className="upload-tip">💡 You'll send this photo + the prompt to ChatGPT</div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2 — Analysis Types */}
          <div className="card">
            <div className="card-title-row">
              <div className="card-title">
                <span className="step-badge purple">STEP 2</span>
                Choose Analysis Types
                <span className="multi-hint">Multiple allowed</span>
              </div>
              {selectedTypes.length > 0 && (
                <span className="selected-count">{selectedTypes.length} selected</span>
              )}
            </div>
            <div className="type-grid">
              {ANALYSIS_TYPES.map((type) => {
                const isSelected = selectedTypes.includes(type.id);
                return (
                  <button key={type.id} className={`type-btn${isSelected ? " selected" : ""}`} onClick={() => toggleType(type.id)}>
                    <span className="type-icon">{type.icon}</span>
                    <div style={{flex:1}}>
                      <div className="type-label">{type.label}</div>
                      <div className="type-sub">{type.sub}</div>
                    </div>
                    <div className={`type-check${isSelected ? " checked" : ""}`}>
                      {isSelected ? "✓" : ""}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3 — Style Preferences */}
          <div className="card">
            <div className="card-title">
              <span className="step-badge pink">STEP 3</span>
              Style Preferences
              <span className="multi-hint">Optional</span>
            </div>
            <div style={{marginTop:14}}>
              <div className="vibe-label">✨ Overall Vibe Direction</div>
              <div className="vibe-row">
                {VIBES.map((v) => (
                  <button
                    key={v}
                    className={`vibe-btn${selectedVibe === v ? " active" : ""}`}
                    onClick={() => setSelectedVibe(selectedVibe === v ? "" : v)}
                  >{v}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Name Input */}
          <div className="card">
            <label style={{fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.45)",textTransform:"uppercase",letterSpacing:"0.5px",display:"block",marginBottom:10}}>
              👤 Your Name <span style={{color:"rgba(255,255,255,0.25)",fontWeight:400,textTransform:"none"}}>(optional — personalizes the prompt)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Sarah"
              value={userName}
              onChange={(e) => { setUserName(e.target.value); setGenerated(false); }}
              style={{
                width:"100%", background:"rgba(255,255,255,0.05)",
                border:"1px solid rgba(255,255,255,0.1)", borderRadius:12,
                padding:"11px 16px", fontSize:14, color:"white", outline:"none",
                fontFamily:"Inter,sans-serif", transition:"border-color 0.3s"
              }}
            />
          </div>

          {/* Generate Button */}
          <button
            className="generate-btn"
            disabled={selectedTypes.length === 0}
            onClick={() => setGenerated(true)}
          >
            ✦ Generate Prompt{selectedTypes.length > 1 ? "s" : ""}
            {selectedTypes.length > 1 ? ` (${selectedTypes.length})` : ""}
          </button>

          {/* Generated Prompts */}
          {generated && selectedTypesData.length > 0 && (
            <div className="card fade-in">
              <div style={{fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.45)",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:14}}>
                📋 Your Generated Prompt{selectedTypesData.length > 1 ? "s" : ""}
              </div>
              {selectedTypesData.map((type) => {
                const prompt = type.prompt(userName || "this person", selectedVibe);
                return (
                  <div key={type.id} className="prompt-block">
                    <div className="prompt-header">
                      <span className="prompt-type-label">{type.icon} {type.label}</span>
                      <button
                        className={`copy-btn${copiedId === type.id ? " done" : ""}`}
                        onClick={() => handleCopy(type.id, prompt)}
                      >
                        {copiedId === type.id ? "✅ Copied!" : "📋 Copy"}
                      </button>
                    </div>
                    <div className="prompt-text">{prompt}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* How to Use */}
          <div className="card">
            <div style={{fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.45)",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:14}}>
              🚀 How to Use
            </div>
            <div className="how-steps">
              {[
                "Upload your portrait photo above",
                "Choose one or more analysis types",
                "Pick a style vibe (optional)",
                <>Go to <a href="https://chat.openai.com" target="_blank" rel="noreferrer" className="how-link">ChatGPT ↗</a> · Upload your photo · Paste the prompt · Get your report!</>,
              ].map((step, i) => (
                <div key={i} className="how-step">
                  <div className="how-num">{i + 1}</div>
                  <div className="how-text">{step}</div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* FOOTER */}
        <footer>
          <div className="footer-inner">
            <div className="author-row">
              <div className="avatar">H</div>
              <div>
                <div className="author-name">Henry Wang</div>
                <div className="author-bio">AI enthusiast & content creator. Helping you look your best with AI!</div>
              </div>
            </div>
            <div className="social-row">
              <a href="https://www.youtube.com/@TubeUnderdeveloped" target="_blank" rel="noreferrer" className="soc-btn soc-yt">▶ TubeUnderdeveloped</a>
              <a href="https://www.youtube.com/@DreamWeaveAnimation" target="_blank" rel="noreferrer" className="soc-btn soc-yt2">🎬 DreamWeave Animation</a>
              <a href="https://www.buymeacoffee.com/tubeuchannel" target="_blank" rel="noreferrer" className="soc-btn soc-coffee">☕ Buy Me a Coffee</a>
            </div>
            <div className="divider" />
            <div className="ad-box">
              <div className="ad-title">📢 Advertise Here</div>
              <div className="ad-sub">Reach AI & fashion enthusiasts · <a href="mailto:zhhwang168@gmail.com" className="ad-link">zhhwang168@gmail.com</a></div>
            </div>
            <div className="copyright">© {new Date().getFullYear()} Henry Wang · AI Style Analyzer</div>
          </div>
        </footer>
      </div>
    </>
  );
}