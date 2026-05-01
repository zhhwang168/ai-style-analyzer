import { useState, useEffect } from "react";

// ════════════════════════════════
// 多语言文字配置
// ════════════════════════════════
const LANGS = {
  en: {
    headerSub: "Upload · Select · Copy Prompt · Send to ChatGPT",
    dateLabel: (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    free: "Free · No API needed",
    step1: "Upload Photo",
    step2: "Choose Analysis Types",
    step2multi: "Multiple allowed",
    step3: "Style Preferences",
    step3opt: "Optional",
    vibeLabel: "✨ Overall Vibe Direction",
    nameLabel: "Your Name",
    nameSub: "(optional — personalizes the prompt)",
    namePlaceholder: "e.g. Sarah",
    generateBtn: (n) => `✦ Generate Prompt${n > 1 ? "s" : ""}${n > 1 ? ` (${n})` : ""}`,
    generateDisabled: "✦ Generate Prompts",
    uploadClick: "Click or drag & drop your photo",
    uploadSuccess: "✅ Photo uploaded! Continue below.",
    uploadHint1: "JPG / PNG / WEBP supported",
    uploadHint2: "Good lighting recommended",
    uploadTip: "💡 You'll send this photo + the prompt to ChatGPT",
    promptTitle: (n) => `📋 Your Generated Prompt${n > 1 ? "s" : ""}`,
    copyBtn: "📋 Copy",
    copiedBtn: "✅ Copied!",
    howTitle: "🚀 How to Use",
    howSteps: [
      "Upload your portrait photo above",
      "Choose one or more analysis types",
      "Pick a style vibe (optional)",
      "Go to ChatGPT · Upload your photo · Paste the prompt · Get your report!",
    ],
    visits: "visits",
    selected: (n) => `${n} selected`,
    authorBio: "AI enthusiast & content creator. Helping you look your best with AI!",
    adTitle: "📢 Advertise Here",
    adSub: "Reach AI & fashion enthusiasts ·",
    vibes: ["More Dashing", "More Elegant", "More Youthful", "More Sophisticated", "More Cute", "More Edgy"],
  },
  zh: {
    headerSub: "上传 · 选择 · 复制提示词 · 发送给 ChatGPT",
    dateLabel: (d) => d.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" }),
    free: "免费 · 无需 API",
    step1: "上传照片",
    step2: "选择分析类型",
    step2multi: "可多选",
    step3: "风格偏好",
    step3opt: "可选",
    vibeLabel: "✨ 整体风格方向",
    nameLabel: "你的名字",
    nameSub: "（可选 — 让提示词更个性化）",
    namePlaceholder: "例如：小雪",
    generateBtn: (n) => `✦ 生成提示词${n > 1 ? ` (${n}个)` : ""}`,
    generateDisabled: "✦ 生成提示词",
    uploadClick: "点击或拖拽照片到此处",
    uploadSuccess: "✅ 照片已上传！请继续下方操作。",
    uploadHint1: "支持 JPG / PNG / WEBP 格式",
    uploadHint2: "建议使用光线充足的照片",
    uploadTip: "💡 你需要将照片和提示词一起发送给 ChatGPT",
    promptTitle: (n) => `📋 已生成的提示词${n > 1 ? `（${n}个）` : ""}`,
    copyBtn: "📋 复制",
    copiedBtn: "✅ 已复制！",
    howTitle: "🚀 使用方法",
    howSteps: [
      "在上方上传你的人像照片",
      "选择一个或多个分析类型",
      "选择风格方向（可选）",
      "前往 ChatGPT · 上传照片 · 粘贴提示词 · 获取你的专业报告！",
    ],
    visits: "次访问",
    selected: (n) => `已选 ${n} 项`,
    authorBio: "AI 爱好者 & 内容创作者，用 AI 帮你打造最好的自己！",
    adTitle: "📢 广告招租",
    adSub: "触达 AI 与时尚爱好者 ·",
    vibes: ["更帅气", "更优雅", "更年轻", "更成熟", "更可爱", "更个性"],
  },
  ja: {
    headerSub: "アップロード · 選択 · プロンプトをコピー · ChatGPTへ送信",
    dateLabel: (d) => d.toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" }),
    free: "無料 · APIキー不要",
    step1: "写真をアップロード",
    step2: "分析タイプを選択",
    step2multi: "複数選択可",
    step3: "スタイルの好み",
    step3opt: "任意",
    vibeLabel: "✨ 全体的なスタイル方向",
    nameLabel: "お名前",
    nameSub: "（任意 — プロンプトをパーソナライズ）",
    namePlaceholder: "例：さくら",
    generateBtn: (n) => `✦ プロンプトを生成${n > 1 ? `（${n}件）` : ""}`,
    generateDisabled: "✦ プロンプトを生成",
    uploadClick: "クリックまたはドラッグ＆ドロップ",
    uploadSuccess: "✅ 写真がアップロードされました！",
    uploadHint1: "JPG / PNG / WEBP 対応",
    uploadHint2: "明るい照明の写真を推奨",
    uploadTip: "💡 写真とプロンプトをChatGPTに送信してください",
    promptTitle: (n) => `📋 生成されたプロンプト${n > 1 ? `（${n}件）` : ""}`,
    copyBtn: "📋 コピー",
    copiedBtn: "✅ コピー済み！",
    howTitle: "🚀 使い方",
    howSteps: [
      "上の欄に顔写真をアップロード",
      "分析タイプを1つ以上選択",
      "スタイルの好みを選ぶ（任意）",
      "ChatGPTへ · 写真をアップロード · プロンプトを貼り付け · レポートを取得！",
    ],
    visits: "回訪問",
    selected: (n) => `${n}件選択中`,
    authorBio: "AIエンスージアスト＆コンテンツクリエイター。AIであなたの魅力を最大限に！",
    adTitle: "📢 広告掲載募集",
    adSub: "AI・ファッション愛好家にリーチ ·",
    vibes: ["よりダッシング", "よりエレガント", "より若々しく", "よりソフィスティケート", "よりキュート", "よりエッジー"],
  },
};

// ════════════════════════════════
// 分析类型（名称三语 + Prompt英文）
// ════════════════════════════════
const getAnalysisTypes = (lang) => [
  {
    id: "face",
    label: { en: "Facial Analysis", zh: "面部特征分析", ja: "顔の特徴分析" }[lang],
    sub: { en: "Proportions & measurements", zh: "比例与测量数据", ja: "プロポーション＆計測" }[lang],
    icon: "🔬",
    prompt: (name, vibe) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo.

Generate a professional Facial Feature Report in a HORIZONTAL 16:9 landscape layout.

Subject name: ${name}${vibe ? `\nStyle vibe: ${vibe}` : ""}

LEFT SECTION (55%): Full color portrait. Overlay red measurement lines:
- Thin red lines: nose length, jaw width, eye spacing
- Numbered red dot markers at anatomical landmarks
- Dashed oval outline showing face shape

RIGHT SECTION (45%): White/light gray background.
HEADER: "FACIAL ANALYSIS REPORT" / "ANTHROPOMETRIC MEASUREMENTS"
MEASUREMENTS: Nose Length / Jaw Width / Eye Spacing / Face Width / Face Length / Mouth Width
PROPORTION INDEX: Face Width/Length · Eye Spacing/Width · Nose/Face ratio
DIAGRAM: Frontal face line-art with labeled landmarks
NOTES: Measurements approximate · Expression: neutral · Units: mm
SUMMARY: 2–3 sentence professional summary for ${name}.

RULES: ✅ Full color · ✅ Annotations on photo · ✅ Identity unaltered · ✗ No grayscale · ✗ No watermarks`,
  },
  {
    id: "color",
    label: { en: "Color Analysis", zh: "个人色彩分析", ja: "パーソナルカラー分析" }[lang],
    sub: { en: "Seasonal color & skin tone", zh: "四季色彩与肤色", ja: "シーズンカラー＆肌色" }[lang],
    icon: "🎨",
    prompt: (name, vibe) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo.

Generate a professional Personal Color Report in a HORIZONTAL 16:9 landscape layout.

Subject name: ${name}${vibe ? `\nStyle vibe: ${vibe}` : ""}

LEFT SECTION (55%): Full color portrait. Overlay color swatches and tone labels:
- Color swatches near skin, hair, and eye areas
- Undertone labels (warm/cool/neutral)
- Season type badge (Spring / Summer / Autumn / Winter)

RIGHT SECTION (45%): White/light gray background.
HEADER: "PERSONAL COLOR ANALYSIS REPORT" / "SEASONAL COLOR PROFILING"
BEST COLORS: 6 recommended clothing colors with hex codes
AVOID COLORS: 3 colors to avoid with reason
DIAGRAM: Color palette grid — 6 best + 3 avoid
NOTES: Natural light photo · Undertone detected · Season identified
SUMMARY: 2–3 sentence professional summary for ${name}.

RULES: ✅ Full color · ✅ Annotations on photo · ✅ Identity unaltered · ✗ No grayscale · ✗ No watermarks`,
  },
  {
    id: "glasses",
    label: { en: "Glasses Guide", zh: "眼镜推荐", ja: "メガネガイド" }[lang],
    sub: { en: "Frame matching by face shape", zh: "根据脸型推荐镜框", ja: "顔型に合うフレーム" }[lang],
    icon: "👓",
    prompt: (name, vibe) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo.

Generate a professional Spectacles Recommendation Report in a HORIZONTAL 16:9 landscape layout.

Subject name: ${name}${vibe ? `\nStyle vibe: ${vibe}` : ""}

LEFT SECTION (55%): Full color portrait. Overlay face shape guides:
- Dashed outline tracing face shape
- Width and length ratio lines
- Frame icons near eye area showing best match

RIGHT SECTION (45%): White/light gray background.
HEADER: "SPECTACLES GUIDE" / "FACE SHAPE & FRAME MATCHING"
RECOMMENDED FRAMES: Round / Rectangular / Aviator / Cat-eye / Rimless / Bold — with suitability scores
FRAMES TO AVOID: Styles that clash with face shape + reason
DIAGRAM: Grid of 6 frame style icons
NOTES: Based on frontal proportions · Face shape detected · Style guidelines only
SUMMARY: 2–3 sentence professional summary for ${name}.

RULES: ✅ Full color · ✅ Annotations on photo · ✅ Identity unaltered · ✗ No grayscale · ✗ No watermarks`,
  },
  {
    id: "hairstyle",
    label: { en: "Hairstyle Analysis", zh: "发型分析", ja: "ヘアスタイル分析" }[lang],
    sub: { en: "Best styles for your face", zh: "最适合你脸型的发型", ja: "顔型に合うヘアスタイル" }[lang],
    icon: "💇",
    prompt: (name, vibe) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo.

Generate a professional Hairstyle Report in a HORIZONTAL 16:9 landscape layout.

Subject name: ${name}${vibe ? `\nStyle vibe: ${vibe}` : ""}

LEFT SECTION (55%): Full color portrait. Overlay contour guides:
- Forehead width measurement line
- Jawline contour outline
- Face length-to-width ratio indicator

RIGHT SECTION (45%): White/light gray background.
HEADER: "HAIRSTYLE ANALYSIS REPORT" / "FACE SHAPE & STYLE MATCHING"
RECOMMENDED HAIRSTYLES: 6 styles with suitability rating and reason
STYLES TO AVOID: 3 styles that don't suit the face shape + reason
DIAGRAM: Hairstyle silhouette icons grid
NOTES: Face shape analysis · Hair texture not assessed · Style suggestions only
SUMMARY: 2–3 sentence professional summary for ${name}.

RULES: ✅ Full color · ✅ Annotations on photo · ✅ Identity unaltered · ✗ No grayscale · ✗ No watermarks`,
  },
  {
    id: "physique",
    label: { en: "Physique Analysis", zh: "体型分析", ja: "体型分析" }[lang],
    sub: { en: "Body composition & posture", zh: "体态与体型评估", ja: "体組成＆姿勢評価" }[lang],
    icon: "💪",
    prompt: (name, vibe) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo.

Generate a professional Physique Report in a HORIZONTAL 16:9 landscape layout.

Subject name: ${name}${vibe ? `\nStyle vibe: ${vibe}` : ""}

LEFT SECTION (55%): Full color portrait. Overlay body measurement lines:
- Shoulder width, waist, hip measurement lines
- Muscle group labels (shoulders, core, arms, legs)
- Body type badge (Ectomorph / Mesomorph / Endomorph)

RIGHT SECTION (45%): White/light gray background.
HEADER: "PHYSIQUE ANALYSIS REPORT" / "BODY COMPOSITION ASSESSMENT"
BODY METRICS: Body Fat % / Shoulder Width / Waist Ratio / Muscle Balance / Posture Score / Body Type
FITNESS INDEX: Strength Score · Flexibility Score · Proportion Balance
DIAGRAM: Body silhouette with labeled muscle groups
NOTES: Visual 2D estimate · Not medical · Consult a professional
SUMMARY: 2–3 sentence professional summary for ${name}.

RULES: ✅ Full color · ✅ Annotations on photo · ✅ Identity unaltered · ✗ No grayscale · ✗ No watermarks`,
  },
  {
    id: "aesthetics",
    label: { en: "Aesthetics Report", zh: "面部美学报告", ja: "顔の美学レポート" }[lang],
    sub: { en: "Golden ratio & enhancement", zh: "黄金比例与提升建议", ja: "黄金比＆改善提案" }[lang],
    icon: "✨",
    prompt: (name, vibe) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo.

Generate a professional Facial Aesthetics Report in a HORIZONTAL 16:9 landscape layout.

Subject name: ${name}${vibe ? `\nStyle vibe: ${vibe}` : ""}

LEFT SECTION (55%): Full color portrait. Overlay suggestion arrows:
- Arrows to hairline, brow, skin, expression areas
- Callout labels with improvement suggestions
- Golden ratio overlay lines on facial thirds

RIGHT SECTION (45%): White/light gray background.
HEADER: "FACIAL AESTHETICS REPORT" / "ENHANCEMENT SUGGESTION ANALYSIS"
ENHANCEMENT: Hairline / Brow Shape / Skin Quality / Eye Area / Lip Balance / Jaw Definition
HARMONY SCORES: Facial Symmetry · Golden Ratio Match · Feature Balance
DIAGRAM: Golden ratio facial thirds diagram
NOTES: Visual estimates only · Not medical advice · 2D frontal image
SUMMARY: 2–3 sentence professional summary for ${name}.

RULES: ✅ Full color · ✅ Annotations on photo · ✅ Identity unaltered · ✗ No grayscale · ✗ No watermarks`,
  },
  {
    id: "outfit",
    label: { en: "Outfit Style Guide", zh: "穿搭风格指南", ja: "コーデスタイルガイド" }[lang],
    sub: { en: "Clothing & style suggestions", zh: "服装与风格建议", ja: "服装＆スタイル提案" }[lang],
    icon: "👗",
    prompt: (name, vibe) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo.

Generate a professional Outfit Style Report in a HORIZONTAL 16:9 landscape layout.

Subject name: ${name}${vibe ? `\nStyle vibe: ${vibe}` : ""}

LEFT SECTION (55%): Full color portrait. Overlay style annotations:
- Labels on clothing items with style category tags
- Color coordination indicators
- Style archetype badge (Casual / Formal / Streetwear / Minimalist / etc.)

RIGHT SECTION (45%): White/light gray background.
HEADER: "OUTFIT STYLE REPORT" / "PERSONAL STYLE ASSESSMENT"
STYLE PROFILE: Style Category / Color Palette / Key Pieces / Fit / Occasion / Style Score
UPGRADE SUGGESTIONS: 3 ways to enhance this look
DIAGRAM: Outfit flat-lay icons or style mood board
NOTES: Based on visible clothing · Accessories not fully assessed · Style is subjective
SUMMARY: 2–3 sentence professional style summary for ${name}.

RULES: ✅ Full color · ✅ Annotations on photo · ✅ Identity unaltered · ✗ No grayscale · ✗ No watermarks`,
  },
  {
    id: "accessory",
    label: { en: "Accessory Guide", zh: "配饰搭配指南", ja: "アクセサリーガイド" }[lang],
    sub: { en: "Jewelry & accessory pairing", zh: "珠宝与配饰搭配", ja: "ジュエリー＆アクセサリー" }[lang],
    icon: "💍",
    prompt: (name, vibe) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo.

Generate a professional Accessory Recommendation Report in a HORIZONTAL 16:9 landscape layout.

Subject name: ${name}${vibe ? `\nStyle vibe: ${vibe}` : ""}

LEFT SECTION (55%): Full color portrait. Overlay accessory guides:
- Necklace length indicators for neckline
- Earring style suggestions near ear area
- Wrist/hand accessory placement markers

RIGHT SECTION (45%): White/light gray background.
HEADER: "ACCESSORY GUIDE" / "JEWELRY & ACCESSORY PAIRING"
RECOMMENDED: Necklace / Earrings / Bracelet / Ring / Bag / Hat — with style match scores
AVOID: Accessory styles that clash with face shape or outfit
DIAGRAM: Accessory icon grid with pairing labels
NOTES: Based on visible features · Personal taste may vary · Style guidelines only
SUMMARY: 2–3 sentence professional recommendation for ${name}.

RULES: ✅ Full color · ✅ Annotations on photo · ✅ Identity unaltered · ✗ No grayscale · ✗ No watermarks`,
  },
];

export default function App() {
  const [lang, setLang] = useState("en");
  const [image, setImage] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [userName, setUserName] = useState("");
  const [selectedVibe, setSelectedVibe] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [visitorCount, setVisitorCount] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [generated, setGenerated] = useState(false);

  const t = LANGS[lang];
  const ANALYSIS_TYPES = getAnalysisTypes(lang);

  useEffect(() => {
    fetch("https://api.counterapi.dev/v1/ai-style-analyzer/visits/up")
      .then((res) => res.json())
      .then((data) => setVisitorCount(data.count))
      .catch(() => setVisitorCount("--"));
  }, []);

  // 切换语言时重置 vibe（因为文字不同）
  const handleLangChange = (l) => {
    setLang(l);
    setSelectedVibe("");
    setGenerated(false);
  };

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
          min-height: 100vh; display: flex; flex-direction: column;
          background: linear-gradient(160deg, #0d0d1a 0%, #130d2a 50%, #0a1020 100%);
          position: relative;
        }
        .page-wrap::before {
          content: ''; position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background:
            radial-gradient(ellipse at 15% 15%, rgba(139,92,246,0.18) 0%, transparent 45%),
            radial-gradient(ellipse at 85% 80%, rgba(236,72,153,0.13) 0%, transparent 45%);
          pointer-events: none; z-index: 0;
          animation: bgPulse 10s ease-in-out infinite alternate;
        }
        @keyframes bgPulse { from{opacity:0.7} to{opacity:1} }

        .top-header {
          background: linear-gradient(90deg, #6d28d9, #a21caf, #db2777);
          padding: 14px 20px;
          display: flex; align-items: center; justify-content: space-between;
          position: sticky; top: 0; z-index: 100;
          box-shadow: 0 2px 20px rgba(139,92,246,0.4);
          flex-wrap: wrap; gap: 10px;
        }
        .header-left { display: flex; align-items: center; gap: 10px; }
        .header-icon { font-size: 26px; filter: drop-shadow(0 0 8px rgba(255,255,255,0.5)); }
        .header-title { font-size: 18px; font-weight: 800; color: white; letter-spacing: -0.3px; }
        .header-sub { font-size: 11px; color: rgba(255,255,255,0.7); margin-top: 1px; }
        .header-right { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
        .header-date { font-size: 12px; color: rgba(255,255,255,0.75); }
        .header-free { font-size: 11px; color: rgba(255,255,255,0.5); }

        /* 语言切换器 */
        .lang-switcher {
          display: flex; gap: 4px; background: rgba(0,0,0,0.25);
          border-radius: 999px; padding: 3px;
        }
        .lang-btn {
          padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 700;
          border: none; cursor: pointer; transition: all 0.2s;
          background: transparent; color: rgba(255,255,255,0.55);
        }
        .lang-btn.active {
          background: rgba(255,255,255,0.2); color: white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .lang-btn:hover:not(.active) { color: white; }

        .main-content {
          flex: 1; max-width: 760px; margin: 0 auto; width: 100%;
          padding: 24px 16px 32px; display: flex; flex-direction: column; gap: 16px;
          position: relative; z-index: 1;
        }
        .card {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px; padding: 20px;
          transition: border-color 0.3s;
        }
        .card:hover { border-color: rgba(139,92,246,0.25); }
        .step-badge {
          display: inline-flex; align-items: center;
          background: linear-gradient(90deg, #f59e0b, #f97316);
          color: white; font-size: 11px; font-weight: 800;
          padding: 3px 10px; border-radius: 999px; margin-right: 10px;
          letter-spacing: 0.5px; white-space: nowrap;
        }
        .step-badge.purple { background: linear-gradient(90deg, #7c3aed, #a855f7); }
        .step-badge.pink { background: linear-gradient(90deg, #db2777, #f472b6); }
        .card-title { font-size: 16px; font-weight: 700; color: white; display: flex; align-items: center; flex-wrap: wrap; gap: 4px; }
        .card-title-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; gap: 8px; }
        .upload-zone {
          border: 2px dashed rgba(255,255,255,0.15); border-radius: 14px;
          cursor: pointer; transition: all 0.3s; overflow: hidden;
        }
        .upload-zone:hover, .upload-zone.drag-over {
          border-color: rgba(167,139,250,0.6); background: rgba(139,92,246,0.07);
        }
        .upload-inner { display: flex; align-items: center; gap: 16px; padding: 16px; }
        .upload-thumb { width: 90px; height: 90px; border-radius: 12px; object-fit: cover; flex-shrink: 0; border: 2px solid rgba(167,139,250,0.4); }
        .upload-placeholder { width: 90px; height: 90px; border-radius: 12px; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; font-size: 32px; flex-shrink: 0; }
        .upload-text-success { color: #4ade80; font-weight: 700; font-size: 14px; margin-bottom: 8px; }
        .upload-hint { font-size: 12px; color: rgba(255,255,255,0.4); line-height: 1.8; }
        .upload-tip { font-size: 11px; color: rgba(255,255,255,0.25); margin-top: 6px; }
        .selected-count { background: linear-gradient(90deg, #7c3aed, #ec4899); color: white; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 999px; white-space: nowrap; }
        .multi-hint { font-size: 12px; color: rgba(255,255,255,0.35); margin-left: 4px; }
        .type-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .type-btn {
          display: flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; padding: 12px 14px; cursor: pointer; transition: all 0.2s; text-align: left;
        }
        .type-btn:hover { background: rgba(139,92,246,0.1); border-color: rgba(139,92,246,0.35); }
        .type-btn.selected { background: rgba(124,58,237,0.2); border-color: rgba(167,139,250,0.6); box-shadow: 0 0 16px rgba(139,92,246,0.2); }
        .type-icon { font-size: 22px; flex-shrink: 0; }
        .type-label { font-size: 13px; font-weight: 600; color: white; }
        .type-sub { font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 2px; }
        .type-check { width: 20px; height: 20px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.2); margin-left: auto; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 11px; transition: all 0.2s; }
        .type-check.checked { background: linear-gradient(135deg, #7c3aed, #ec4899); border-color: transparent; color: white; }
        .vibe-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
        .vibe-btn { padding: 7px 16px; border-radius: 999px; font-size: 13px; font-weight: 500; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.6); cursor: pointer; transition: all 0.2s; }
        .vibe-btn:hover { border-color: rgba(167,139,250,0.4); color: white; }
        .vibe-btn.active { background: linear-gradient(135deg, #f59e0b, #f97316); border-color: transparent; color: white; font-weight: 700; box-shadow: 0 4px 14px rgba(245,158,11,0.35); }
        .vibe-label { font-size: 13px; font-weight: 600; color: #fbbf24; margin-bottom: 2px; }
        .generate-btn { width: 100%; padding: 16px; background: linear-gradient(90deg, #7c3aed, #a855f7, #ec4899); background-size: 200%; animation: gradShift 4s ease infinite; border: none; border-radius: 14px; color: white; font-size: 16px; font-weight: 800; cursor: pointer; transition: all 0.3s; box-shadow: 0 6px 24px rgba(139,92,246,0.45); letter-spacing: 0.3px; }
        .generate-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(139,92,246,0.6); }
        .generate-btn:disabled { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.3); cursor: not-allowed; animation: none; box-shadow: none; transform: none; }
        @keyframes gradShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        .prompt-block { background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; overflow: hidden; margin-bottom: 12px; }
        .prompt-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: rgba(139,92,246,0.12); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .prompt-type-label { font-size: 14px; font-weight: 700; color: white; }
        .copy-btn { padding: 6px 16px; border-radius: 999px; font-size: 12px; font-weight: 700; border: none; cursor: pointer; transition: all 0.2s; background: linear-gradient(90deg, #7c3aed, #ec4899); color: white; white-space: nowrap; }
        .copy-btn.done { background: linear-gradient(90deg, #059669, #10b981); }
        .copy-btn:hover { transform: scale(1.05); }
        .prompt-text { padding: 14px 16px; font-size: 12px; color: rgba(255,255,255,0.6); line-height: 1.7; max-height: 140px; overflow-y: auto; white-space: pre-wrap; word-break: break-word; }
        .how-steps { display: flex; flex-direction: column; gap: 10px; }
        .how-step { display: flex; align-items: flex-start; gap: 12px; }
        .how-num { width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0; background: linear-gradient(135deg, #7c3aed, #ec4899); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; color: white; }
        .how-text { font-size: 13px; color: rgba(255,255,255,0.55); line-height: 1.6; padding-top: 3px; }
        .how-link { color: #a78bfa; text-decoration: none; font-weight: 600; }
        .how-link:hover { text-decoration: underline; }
        .visits-pill { display: flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.1); border-radius: 999px; padding: 5px 12px; font-size: 12px; color: rgba(255,255,255,0.65); }
        .live-dot { width: 7px; height: 7px; border-radius: 50%; background: #4ade80; box-shadow: 0 0 6px #4ade80; animation: blink 2s ease-in-out infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        footer { background: rgba(0,0,0,0.5); backdrop-filter: blur(20px); border-top: 1px solid rgba(255,255,255,0.06); padding: 28px 20px; position: relative; z-index: 1; }
        .footer-inner { max-width: 760px; margin: 0 auto; }
        .author-row { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
        .avatar { width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0; background: linear-gradient(135deg, #7c3aed, #ec4899); display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 800; color: white; box-shadow: 0 0 18px rgba(139,92,246,0.5); }
        .author-name { font-size: 15px; font-weight: 700; color: white; }
        .author-bio { font-size: 12px; color: rgba(255,255,255,0.4); margin-top: 3px; }
        .social-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
        .soc-btn { display: inline-flex; align-items: center; gap: 6px; padding: 7px 16px; border-radius: 999px; font-size: 12px; font-weight: 600; text-decoration: none; transition: all 0.2s; }
        .soc-yt { background: rgba(220,38,38,0.2); border: 1px solid rgba(220,38,38,0.35); color: #fca5a5; }
        .soc-yt:hover { background: rgba(220,38,38,0.35); transform: translateY(-2px); }
        .soc-yt2 { background: rgba(185,28,28,0.2); border: 1px solid rgba(185,28,28,0.35); color: #fca5a5; }
        .soc-yt2:hover { background: rgba(185,28,28,0.35); transform: translateY(-2px); }
        .soc-coffee { background: rgba(234,179,8,0.15); border: 1px solid rgba(234,179,8,0.35); color: #fde047; }
        .soc-coffee:hover { background: rgba(234,179,8,0.28); transform: translateY(-2px); }
        .ad-box { border: 1px dashed rgba(255,255,255,0.1); border-radius: 14px; padding: 16px; text-align: center; margin-bottom: 16px; background: rgba(255,255,255,0.02); }
        .ad-title { font-size: 13px; color: rgba(255,255,255,0.35); font-weight: 600; }
        .ad-sub { font-size: 11px; color: rgba(255,255,255,0.2); margin-top: 4px; }
        .ad-link { color: #a78bfa; text-decoration: none; }
        .divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent); margin: 16px 0; }
        .copyright { text-align: center; font-size: 11px; color: rgba(255,255,255,0.15); }
        .fade-in { animation: fadeUp 0.4s ease forwards; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @media (max-width: 480px) {
          .type-grid { grid-template-columns: 1fr; }
          .header-title { font-size: 15px; }
        }
      `}</style>

      <div className="page-wrap">
        {/* HEADER */}
        <header className="top-header">
          <div className="header-left">
            <span className="header-icon">🪄</span>
            <div>
              <div className="header-title">AI Style Analyzer</div>
              <div className="header-sub">{t.headerSub}</div>
            </div>
          </div>
          <div className="header-right">
            {/* 语言切换器 */}
            <div className="lang-switcher">
              {[
                { code: "en", label: "🇺🇸 EN" },
                { code: "zh", label: "🇨🇳 中文" },
                { code: "ja", label: "🇯🇵 日本語" },
              ].map(({ code, label }) => (
                <button
                  key={code}
                  className={`lang-btn${lang === code ? " active" : ""}`}
                  onClick={() => handleLangChange(code)}
                >{label}</button>
              ))}
            </div>
            <div className="header-date">{t.dateLabel(new Date())}</div>
            <div className="header-free">{t.free}</div>
          </div>
        </header>

        <main className="main-content">

          {/* STEP 1 */}
          <div className="card">
            <div className="card-title-row">
              <div className="card-title">
                <span className="step-badge">STEP 1</span>{t.step1}
              </div>
              <div className="visits-pill">
                <div className="live-dot" />
                <span>{visitorCount !== null ? Number(visitorCount).toLocaleString() : "..."} {t.visits}</span>
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
                    ? <div className="upload-text-success">{t.uploadSuccess}</div>
                    : <div style={{color:"rgba(255,255,255,0.7)",fontWeight:600,fontSize:14,marginBottom:8}}>{t.uploadClick}</div>
                  }
                  <div className="upload-hint">• {t.uploadHint1}<br/>• {t.uploadHint2}</div>
                  <div className="upload-tip">💡 {t.uploadTip}</div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="card">
            <div className="card-title-row">
              <div className="card-title">
                <span className="step-badge purple">STEP 2</span>
                {t.step2}
                <span className="multi-hint">{t.step2multi}</span>
              </div>
              {selectedTypes.length > 0 && (
                <span className="selected-count">{t.selected(selectedTypes.length)}</span>
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
                    <div className={`type-check${isSelected ? " checked" : ""}`}>{isSelected ? "✓" : ""}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3 */}
          <div className="card">
            <div className="card-title">
              <span className="step-badge pink">STEP 3</span>
              {t.step3}
              <span className="multi-hint">{t.step3opt}</span>
            </div>
            <div style={{marginTop:14}}>
              <div className="vibe-label">{t.vibeLabel}</div>
              <div className="vibe-row">
                {t.vibes.map((v) => (
                  <button key={v} className={`vibe-btn${selectedVibe === v ? " active" : ""}`} onClick={() => setSelectedVibe(selectedVibe === v ? "" : v)}>{v}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Name */}
          <div className="card">
            <label style={{fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.45)",textTransform:"uppercase",letterSpacing:"0.5px",display:"block",marginBottom:10}}>
              👤 {t.nameLabel} <span style={{color:"rgba(255,255,255,0.25)",fontWeight:400,textTransform:"none"}}>{t.nameSub}</span>
            </label>
            <input
              type="text"
              placeholder={t.namePlaceholder}
              value={userName}
              onChange={(e) => { setUserName(e.target.value); setGenerated(false); }}
              style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,padding:"11px 16px",fontSize:14,color:"white",outline:"none",fontFamily:"Inter,sans-serif",transition:"border-color 0.3s"}}
            />
          </div>

          {/* Generate */}
          <button
            className="generate-btn"
            disabled={selectedTypes.length === 0}
            onClick={() => setGenerated(true)}
          >
            {selectedTypes.length === 0 ? t.generateDisabled : t.generateBtn(selectedTypes.length)}
          </button>

          {/* Prompts */}
          {generated && selectedTypesData.length > 0 && (
            <div className="card fade-in">
              <div style={{fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.45)",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:14}}>
                {t.promptTitle(selectedTypesData.length)}
              </div>
              {selectedTypesData.map((type) => {
                const prompt = type.prompt(userName || "this person", selectedVibe);
                return (
                  <div key={type.id} className="prompt-block">
                    <div className="prompt-header">
                      <span className="prompt-type-label">{type.icon} {type.label}</span>
                      <button className={`copy-btn${copiedId === type.id ? " done" : ""}`} onClick={() => handleCopy(type.id, prompt)}>
                        {copiedId === type.id ? t.copiedBtn : t.copyBtn}
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
              {t.howTitle}
            </div>
            <div className="how-steps">
              {t.howSteps.map((step, i) => (
                <div key={i} className="how-step">
                  <div className="how-num">{i + 1}</div>
                  <div className="how-text">
                    {i === 3
                      ? <>{
                          lang === "en" ? <>Go to <a href="https://chat.openai.com" target="_blank" rel="noreferrer" className="how-link">ChatGPT ↗</a> · Upload your photo · Paste the prompt · Get your report!</>
                          : lang === "zh" ? <>前往 <a href="https://chat.openai.com" target="_blank" rel="noreferrer" className="how-link">ChatGPT ↗</a> · 上传照片 · 粘贴提示词 · 获取你的专业报告！</>
                          : <>  <a href="https://chat.openai.com" target="_blank" rel="noreferrer" className="how-link">ChatGPT ↗</a> へ · 写真をアップロード · プロンプトを貼り付け · レポートを取得！</>
                        }</>
                      : step
                    }
                  </div>
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
                <div className="author-bio">{t.authorBio}</div>
              </div>
            </div>
            <div className="social-row">
              <a href="https://www.youtube.com/@TubeUnderdeveloped" target="_blank" rel="noreferrer" className="soc-btn soc-yt">▶ TubeUnderdeveloped</a>
              <a href="https://www.youtube.com/@DreamWeaveAnimation" target="_blank" rel="noreferrer" className="soc-btn soc-yt2">🎬 DreamWeave Animation</a>
              <a href="https://www.buymeacoffee.com/tubeuchannel" target="_blank" rel="noreferrer" className="soc-btn soc-coffee">☕ Buy Me a Coffee</a>
            </div>
            <div className="divider" />
            <div className="ad-box">
              <div className="ad-title">{t.adTitle}</div>
              <div className="ad-sub">{t.adSub} <a href="mailto:zhhwang168@gmail.com" className="ad-link">zhhwang168@gmail.com</a></div>
            </div>
            <div className="copyright">© {new Date().getFullYear()} Henry Wang · AI Style Analyzer</div>
          </div>
        </footer>
      </div>
    </>
  );
}