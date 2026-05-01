import { useState, useEffect } from "react";

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
    // Visual prompt labels
    visualPromptLabel: "🎨 Bonus: Visual Makeover Prompt",
    visualPromptSub: "Paste this into ChatGPT to generate a visual before/after image!",
    outfitColorLabel: "👗 Outfit Color Options",
    outfitColorSub: "Select colors to include in the visual prompt",
    layoutLabel: "🖼️ Visual Layout Style",
    layoutSide: "Side by Side (Before / After)",
    layoutGrid: "3-Panel Grid (Original + 2 Looks)",
    layoutSingle: "Single Makeover Image",
    colors: ["Black", "White", "Navy", "Beige", "Burgundy", "Forest Green", "Camel", "Grey", "Dusty Rose", "Cobalt Blue"],
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
    visualPromptLabel: "🎨 加餐：效果图生成提示词",
    visualPromptSub: "将此提示词发给 ChatGPT，即可生成穿搭前后对比效果图！",
    outfitColorLabel: "👗 服装颜色选项",
    outfitColorSub: "选择要在效果图中展示的颜色",
    layoutLabel: "🖼️ 效果图排版样式",
    layoutSide: "左右对比（改造前 / 改造后）",
    layoutGrid: "三格展示（原图 + 2种造型）",
    layoutSingle: "单图改造效果",
    colors: ["黑色", "白色", "藏青色", "米色", "酒红色", "墨绿色", "驼色", "灰色", "藕粉色", "宝蓝色"],
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
    visualPromptLabel: "🎨 ボーナス：ビジュアルメイクオーバープロンプト",
    visualPromptSub: "このプロンプトをChatGPTに貼り付けて、ビジュアルビフォーアフター画像を生成！",
    outfitColorLabel: "👗 コーデカラーオプション",
    outfitColorSub: "ビジュアルに含める色を選択",
    layoutLabel: "🖼️ ビジュアルレイアウトスタイル",
    layoutSide: "左右比較（ビフォー / アフター）",
    layoutGrid: "3パネルグリッド（元画像 + 2スタイル）",
    layoutSingle: "シングルメイクオーバー画像",
    colors: ["ブラック", "ホワイト", "ネイビー", "ベージュ", "バーガンディ", "フォレストグリーン", "キャメル", "グレー", "ダスティローズ", "コバルトブルー"],
  },
};

// ── Visual-prompt capable types ──
const VISUAL_TYPES = ["hairstyle", "outfit", "accessory", "color"];

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

LEFT SECTION (55%): Full color portrait. Overlay color swatches and tone labels near skin, hair, and eye areas. Include undertone labels (warm/cool/neutral) and season type badge.

RIGHT SECTION (45%): White/light gray background.
HEADER: "PERSONAL COLOR ANALYSIS REPORT" / "SEASONAL COLOR PROFILING"
BEST COLORS: 6 recommended clothing colors with hex codes
AVOID COLORS: 3 colors to avoid with reason
DIAGRAM: Color palette grid — 6 best + 3 avoid
SUMMARY: 2–3 sentence professional summary for ${name}.

RULES: ✅ Full color · ✅ Annotations on photo · ✅ Identity unaltered · ✗ No grayscale · ✗ No watermarks`,
    visualPrompt: (name, vibe, colors, layout) => buildVisualPrompt("color", name, vibe, colors, layout),
  },
  {
    id: "glasses",
    label: { en: "Glasses Guide", zh: "眼镜推荐", ja: "メガネガイド" }[lang],
    sub: { en: "Frame matching by face shape", zh: "根据脸型推荐镜框", ja: "顔型に合うフレーム" }[lang],
    icon: "👓",
    prompt: (name, vibe) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo.

Generate a professional Spectacles Recommendation Report in a HORIZONTAL 16:9 landscape layout.

Subject name: ${name}${vibe ? `\nStyle vibe: ${vibe}` : ""}

LEFT SECTION (55%): Full color portrait. Overlay face shape guides, dashed outline, width/length ratio lines, and frame icons near eye area.

RIGHT SECTION (45%): White/light gray background.
HEADER: "SPECTACLES GUIDE" / "FACE SHAPE & FRAME MATCHING"
RECOMMENDED FRAMES: Round / Rectangular / Aviator / Cat-eye / Rimless / Bold — with suitability scores
FRAMES TO AVOID: Styles that clash with face shape + reason
DIAGRAM: Grid of 6 frame style icons
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

LEFT SECTION (55%): Full color portrait. Overlay forehead width line, jawline contour, face length-to-width ratio indicator.

RIGHT SECTION (45%): White/light gray background.
HEADER: "HAIRSTYLE ANALYSIS REPORT" / "FACE SHAPE & STYLE MATCHING"
RECOMMENDED HAIRSTYLES: 6 styles with suitability rating and reason
STYLES TO AVOID: 3 styles that don't suit the face shape + reason
DIAGRAM: Hairstyle silhouette icons grid
SUMMARY: 2–3 sentence professional summary for ${name}.

RULES: ✅ Full color · ✅ Annotations on photo · ✅ Identity unaltered · ✗ No grayscale · ✗ No watermarks`,
    visualPrompt: (name, vibe, colors, layout) => buildVisualPrompt("hairstyle", name, vibe, colors, layout),
  },
  {
    id: "physique",
    label: { en: "Physique Analysis", zh: "体型分析", ja: "体型分析" }[lang],
    sub: { en: "Body composition & posture", zh: "体态与体型评估", ja: "体組成＆姿勢評価" }[lang],
    icon: "💪",
    prompt: (name, vibe) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo.

Generate a professional Physique Report in a HORIZONTAL 16:9 landscape layout.

Subject name: ${name}${vibe ? `\nStyle vibe: ${vibe}` : ""}

LEFT SECTION (55%): Full color portrait. Overlay shoulder width, waist, hip measurement lines, muscle group labels, and body type badge.

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

LEFT SECTION (55%): Full color portrait. Overlay suggestion arrows to hairline, brow, skin, expression areas with callout labels. Add golden ratio overlay lines on facial thirds.

RIGHT SECTION (45%): White/light gray background.
HEADER: "FACIAL AESTHETICS REPORT" / "ENHANCEMENT SUGGESTION ANALYSIS"
ENHANCEMENT: Hairline / Brow Shape / Skin Quality / Eye Area / Lip Balance / Jaw Definition
HARMONY SCORES: Facial Symmetry · Golden Ratio Match · Feature Balance
DIAGRAM: Golden ratio facial thirds diagram
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

LEFT SECTION (55%): Full color portrait. Overlay style annotations, labels on clothing items with style category tags, color coordination indicators, and style archetype badge.

RIGHT SECTION (45%): White/light gray background.
HEADER: "OUTFIT STYLE REPORT" / "PERSONAL STYLE ASSESSMENT"
STYLE PROFILE: Style Category / Color Palette / Key Pieces / Fit / Occasion / Style Score
UPGRADE SUGGESTIONS: 3 ways to enhance this look
DIAGRAM: Outfit flat-lay icons or style mood board
SUMMARY: 2–3 sentence professional style summary for ${name}.

RULES: ✅ Full color · ✅ Annotations on photo · ✅ Identity unaltered · ✗ No grayscale · ✗ No watermarks`,
    visualPrompt: (name, vibe, colors, layout) => buildVisualPrompt("outfit", name, vibe, colors, layout),
  },
  {
    id: "accessory",
    label: { en: "Accessory Guide", zh: "配饰搭配指南", ja: "アクセサリーガイド" }[lang],
    sub: { en: "Jewelry & accessory pairing", zh: "珠宝与配饰搭配", ja: "ジュエリー＆アクセサリー" }[lang],
    icon: "💍",
    prompt: (name, vibe) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo.

Generate a professional Accessory Recommendation Report in a HORIZONTAL 16:9 landscape layout.

Subject name: ${name}${vibe ? `\nStyle vibe: ${vibe}` : ""}

LEFT SECTION (55%): Full color portrait. Overlay necklace length indicators, earring style suggestions near ear area, wrist/hand accessory placement markers.

RIGHT SECTION (45%): White/light gray background.
HEADER: "ACCESSORY GUIDE" / "JEWELRY & ACCESSORY PAIRING"
RECOMMENDED: Necklace / Earrings / Bracelet / Ring / Bag / Hat — with style match scores
AVOID: Accessory styles that clash with face shape or outfit
DIAGRAM: Accessory icon grid with pairing labels
SUMMARY: 2–3 sentence professional recommendation for ${name}.

RULES: ✅ Full color · ✅ Annotations on photo · ✅ Identity unaltered · ✗ No grayscale · ✗ No watermarks`,
    visualPrompt: (name, vibe, colors, layout) => buildVisualPrompt("accessory", name, vibe, colors, layout),
  },
];

// ════════════════════════════════
// Visual Prompt Builder
// ════════════════════════════════
function buildVisualPrompt(type, name, vibe, colors, layout) {
  const colorStr = colors.length > 0 ? colors.join(", ") : "neutral tones";
  const vibeStr = vibe ? ` The overall style direction is: ${vibe}.` : "";

  const typeDetails = {
    hairstyle: {
      subject: "hairstyle makeover",
      desc: `Show ${name} with 2 different recommended hairstyles that suit their face shape. Each panel shows the same person with a different hairstyle — keep face and identity 100% identical, only change the hair.`,
      panels: {
        side: `LEFT PANEL: Original photo of ${name}. RIGHT PANEL: ${name} with the most recommended hairstyle applied naturally.`,
        grid: `PANEL 1: Original photo. PANEL 2: ${name} with recommended hairstyle #1 (e.g. Textured Crop). PANEL 3: ${name} with recommended hairstyle #2 (e.g. Side Part).`,
        single: `Single image of ${name} with the top recommended hairstyle applied. Keep face identical, only update the hair style naturally.`,
      },
    },
    outfit: {
      subject: "outfit makeover",
      desc: `Show ${name} wearing upgraded outfit looks using the recommended color palette: ${colorStr}. Keep face and identity 100% identical, only change the clothing.`,
      panels: {
        side: `LEFT PANEL: Original photo of ${name} in current outfit. RIGHT PANEL: ${name} wearing a stylish upgraded outfit in ${colorStr}.`,
        grid: `PANEL 1: Original photo. PANEL 2: ${name} in outfit color option 1 (${colors[0] || "black"}). PANEL 3: ${name} in outfit color option 2 (${colors[1] || "navy"}).`,
        single: `Single image of ${name} wearing a complete stylish outfit in ${colorStr}. Keep face identical, only update the clothing.`,
      },
    },
    accessory: {
      subject: "accessory styling",
      desc: `Show ${name} styled with recommended accessories (necklace, earrings, bracelet). Keep face and identity 100% identical, only add accessories.`,
      panels: {
        side: `LEFT PANEL: Original photo of ${name} without accessories. RIGHT PANEL: ${name} styled with a complete accessory set — necklace, earrings, and bracelet that suit their features.`,
        grid: `PANEL 1: Original photo. PANEL 2: ${name} with elegant jewelry set (gold/silver tones). PANEL 3: ${name} with a bold statement accessory look.`,
        single: `Single image of ${name} wearing a curated accessory set that complements their face shape and style. Keep face identical, only add accessories.`,
      },
    },
    color: {
      subject: "personal color makeover",
      desc: `Show ${name} wearing outfits in their best seasonal color palette: ${colorStr}. Keep face and identity 100% identical, only change the clothing colors.`,
      panels: {
        side: `LEFT PANEL: Original photo of ${name}. RIGHT PANEL: ${name} wearing an outfit in their best seasonal colors (${colorStr}).`,
        grid: `PANEL 1: Original photo. PANEL 2: ${name} in best color palette outfit #1. PANEL 3: ${name} in best color palette outfit #2.`,
        single: `Single image of ${name} wearing an outfit perfectly matched to their seasonal color type. Colors: ${colorStr}.`,
      },
    },
  };

  const info = typeDetails[type];
  const layoutKey = layout === "side" ? "side" : layout === "grid" ? "grid" : "single";
  const layoutDesc = info.panels[layoutKey];

  const layoutFormat = {
    side: "HORIZONTAL 16:9 layout split into 2 equal panels side by side.",
    grid: "HORIZONTAL 16:9 layout split into 3 equal panels in a row.",
    single: "VERTICAL portrait 9:16 layout, single makeover image.",
  }[layoutKey];

  return `This is a visual makeover image generation task. Use the uploaded photo as the ONLY reference for ${name}'s face, skin tone, and identity. Do NOT alter the face. Only apply the ${info.subject} changes described below.

Subject: ${name}${vibeStr}

LAYOUT: ${layoutFormat}

${layoutDesc}

STYLE NOTES:
- ${info.desc}
- Lighting: soft, natural, flattering
- Background: clean studio or lifestyle setting
- Quality: photorealistic, high detail
- Colors to feature: ${colorStr}

STRICT RULES:
✅ Face & identity must remain 100% identical to the original photo
✅ Photorealistic result
✅ Clean, professional styling
✗ Do NOT change facial features
✗ Do NOT add text or watermarks
✗ Do NOT use cartoon or illustration style`;
}

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
  // Visual prompt states
  const [selectedColors, setSelectedColors] = useState([]);
  const [visualLayout, setVisualLayout] = useState("side");

  const t = LANGS[lang];
  const ANALYSIS_TYPES = getAnalysisTypes(lang);

  useEffect(() => {
    fetch("https://api.counterapi.dev/v1/ai-style-analyzer/visits/up")
      .then((res) => res.json())
      .then((data) => setVisitorCount(data.count))
      .catch(() => setVisitorCount("--"));
  }, []);

  const handleLangChange = (l) => {
    setLang(l);
    setSelectedVibe("");
    setGenerated(false);
    setSelectedColors([]);
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
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    setGenerated(false);
  };

  const toggleColor = (c) => {
    setSelectedColors((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : prev.length < 5 ? [...prev, c] : prev
    );
  };

  const handleCopy = (id, prompt) => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const selectedTypesData = ANALYSIS_TYPES.filter((x) => selectedTypes.includes(x.id));
  const hasVisualTypes = selectedTypesData.some((x) => VISUAL_TYPES.includes(x.id));

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
          padding: 14px 20px; display: flex; align-items: center; justify-content: space-between;
          position: sticky; top: 0; z-index: 100;
          box-shadow: 0 2px 20px rgba(139,92,246,0.4); flex-wrap: wrap; gap: 10px;
        }
        .header-left { display: flex; align-items: center; gap: 10px; }
        .header-icon { font-size: 26px; filter: drop-shadow(0 0 8px rgba(255,255,255,0.5)); }
        .header-title { font-size: 18px; font-weight: 800; color: white; letter-spacing: -0.3px; }
        .header-sub { font-size: 11px; color: rgba(255,255,255,0.7); margin-top: 1px; }
        .header-right { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
        .header-date { font-size: 12px; color: rgba(255,255,255,0.75); }
        .header-free { font-size: 11px; color: rgba(255,255,255,0.5); }
        .lang-switcher { display: flex; gap: 4px; background: rgba(0,0,0,0.25); border-radius: 999px; padding: 3px; }
        .lang-btn { padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; border: none; cursor: pointer; transition: all 0.2s; background: transparent; color: rgba(255,255,255,0.55); }
        .lang-btn.active { background: rgba(255,255,255,0.2); color: white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); }
        .lang-btn:hover:not(.active) { color: white; }
        .main-content { flex: 1; max-width: 760px; margin: 0 auto; width: 100%; padding: 24px 16px 32px; display: flex; flex-direction: column; gap: 16px; position: relative; z-index: 1; }
        .card { background: rgba(255,255,255,0.04); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; padding: 20px; transition: border-color 0.3s; }
        .card:hover { border-color: rgba(139,92,246,0.25); }
        .card-visual { background: rgba(251,191,36,0.05); border: 1px solid rgba(251,191,36,0.2); border-radius: 18px; padding: 20px; }
        .step-badge { display: inline-flex; align-items: center; background: linear-gradient(90deg, #f59e0b, #f97316); color: white; font-size: 11px; font-weight: 800; padding: 3px 10px; border-radius: 999px; margin-right: 10px; letter-spacing: 0.5px; white-space: nowrap; }
        .step-badge.purple { background: linear-gradient(90deg, #7c3aed, #a855f7); }
        .step-badge.pink { background: linear-gradient(90deg, #db2777, #f472b6); }
        .step-badge.gold { background: linear-gradient(90deg, #d97706, #f59e0b); }
        .card-title { font-size: 16px; font-weight: 700; color: white; display: flex; align-items: center; flex-wrap: wrap; gap: 4px; }
        .card-title-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; gap: 8px; }
        .upload-zone { border: 2px dashed rgba(255,255,255,0.15); border-radius: 14px; cursor: pointer; transition: all 0.3s; overflow: hidden; }
        .upload-zone:hover, .upload-zone.drag-over { border-color: rgba(167,139,250,0.6); background: rgba(139,92,246,0.07); }
        .upload-inner { display: flex; align-items: center; gap: 16px; padding: 16px; }
        .upload-thumb { width: 90px; height: 90px; border-radius: 12px; object-fit: cover; flex-shrink: 0; border: 2px solid rgba(167,139,250,0.4); }
        .upload-placeholder { width: 90px; height: 90px; border-radius: 12px; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; font-size: 32px; flex-shrink: 0; }
        .upload-text-success { color: #4ade80; font-weight: 700; font-size: 14px; margin-bottom: 8px; }
        .upload-hint { font-size: 12px; color: rgba(255,255,255,0.4); line-height: 1.8; }
        .upload-tip { font-size: 11px; color: rgba(255,255,255,0.25); margin-top: 6px; }
        .selected-count { background: linear-gradient(90deg, #7c3aed, #ec4899); color: white; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 999px; white-space: nowrap; }
        .multi-hint { font-size: 12px; color: rgba(255,255,255,0.35); margin-left: 4px; }
        .type-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .type-btn { display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 12px 14px; cursor: pointer; transition: all 0.2s; text-align: left; }
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
        /* Color chips */
        .color-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
        .color-chip { padding: 5px 14px; border-radius: 999px; font-size: 12px; font-weight: 500; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.6); cursor: pointer; transition: all 0.2s; }
        .color-chip:hover { border-color: rgba(251,191,36,0.5); color: white; }
        .color-chip.active { background: linear-gradient(135deg, #d97706, #f59e0b); border-color: transparent; color: white; font-weight: 700; }
        /* Layout selector */
        .layout-row { display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap; }
        .layout-btn { flex: 1; min-width: 120px; padding: 10px 8px; border-radius: 12px; font-size: 12px; font-weight: 600; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.2s; text-align: center; }
        .layout-btn:hover { border-color: rgba(251,191,36,0.4); color: white; }
        .layout-btn.active { background: rgba(217,119,6,0.2); border-color: rgba(251,191,36,0.6); color: #fbbf24; font-weight: 700; }
        .layout-icon { font-size: 18px; display: block; margin-bottom: 4px; }
        .generate-btn { width: 100%; padding: 16px; background: linear-gradient(90deg, #7c3aed, #a855f7, #ec4899); background-size: 200%; animation: gradShift 4s ease infinite; border: none; border-radius: 14px; color: white; font-size: 16px; font-weight: 800; cursor: pointer; transition: all 0.3s; box-shadow: 0 6px 24px rgba(139,92,246,0.45); letter-spacing: 0.3px; }
        .generate-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(139,92,246,0.6); }
        .generate-btn:disabled { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.3); cursor: not-allowed; animation: none; box-shadow: none; transform: none; }
        @keyframes gradShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        .prompt-block { background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; overflow: hidden; margin-bottom: 12px; }
        .prompt-block.visual { border-color: rgba(251,191,36,0.25); background: rgba(217,119,6,0.07); }
        .prompt-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: rgba(139,92,246,0.12); border-bottom: 1px solid rgba(255,255,255,0.06); flex-wrap: wrap; gap: 8px; }
        .prompt-header.visual-header { background: rgba(217,119,6,0.15); border-bottom-color: rgba(251,191,36,0.15); }
        .prompt-type-label { font-size: 14px; font-weight: 700; color: white; }
        .visual-badge { font-size: 10px; font-weight: 700; background: linear-gradient(90deg, #d97706, #f59e0b); color: white; padding: 2px 8px; border-radius: 999px; margin-left: 6px; }
        .copy-btn { padding: 6px 16px; border-radius: 999px; font-size: 12px; font-weight: 700; border: none; cursor: pointer; transition: all 0.2s; background: linear-gradient(90deg, #7c3aed, #ec4899); color: white; white-space: nowrap; }
        .copy-btn.gold-btn { background: linear-gradient(90deg, #d97706, #f59e0b); }
        .copy-btn.done { background: linear-gradient(90deg, #059669, #10b981); }
        .copy-btn:hover { transform: scale(1.05); }
        .prompt-text { padding: 14px 16px; font-size: 12px; color: rgba(255,255,255,0.6); line-height: 1.7; max-height: 140px; overflow-y: auto; white-space: pre-wrap; word-break: break-word; }
        .visual-sub { font-size: 11px; color: rgba(251,191,36,0.6); padding: 8px 16px 0; }
        .section-label { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
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
        @media (max-width: 480px) { .type-grid { grid-template-columns: 1fr; } .header-title { font-size: 15px; } .layout-row { flex-direction: column; } }
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
            <div className="lang-switcher">
              {[{code:"en",label:"🇺🇸 EN"},{code:"zh",label:"🇨🇳 中文"},{code:"ja",label:"🇯🇵 日本語"}].map(({code,label})=>(
                <button key={code} className={`lang-btn${lang===code?" active":""}`} onClick={()=>handleLangChange(code)}>{label}</button>
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
              <div className="card-title"><span className="step-badge">STEP 1</span>{t.step1}</div>
              <div className="visits-pill">
                <div className="live-dot"/>
                <span>{visitorCount!==null?Number(visitorCount).toLocaleString():"..."} {t.visits}</span>
              </div>
            </div>
            <div className={`upload-zone${dragOver?" drag-over":""}`}
              onDragOver={(e)=>{e.preventDefault();setDragOver(true);}}
              onDragLeave={()=>setDragOver(false)}
              onDrop={handleDrop}
              onClick={()=>document.getElementById("fileInput").click()}>
              <input id="fileInput" type="file" accept="image/*" style={{display:"none"}} onChange={(e)=>handleImage(e.target.files[0])}/>
              <div className="upload-inner">
                {image?<img src={image} alt="uploaded" className="upload-thumb"/>:<div className="upload-placeholder">📷</div>}
                <div>
                  {image
                    ?<div className="upload-text-success">{t.uploadSuccess}</div>
                    :<div style={{color:"rgba(255,255,255,0.7)",fontWeight:600,fontSize:14,marginBottom:8}}>{t.uploadClick}</div>
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
                <span className="step-badge purple">STEP 2</span>{t.step2}
                <span className="multi-hint">{t.step2multi}</span>
              </div>
              {selectedTypes.length>0&&<span className="selected-count">{t.selected(selectedTypes.length)}</span>}
            </div>
            <div className="type-grid">
              {ANALYSIS_TYPES.map((type)=>{
                const isSel=selectedTypes.includes(type.id);
                return(
                  <button key={type.id} className={`type-btn${isSel?" selected":""}`} onClick={()=>toggleType(type.id)}>
                    <span className="type-icon">{type.icon}</span>
                    <div style={{flex:1}}>
                      <div className="type-label">{type.label}</div>
                      <div className="type-sub">{type.sub}</div>
                    </div>
                    {VISUAL_TYPES.includes(type.id)&&<span style={{fontSize:9,color:"#fbbf24",fontWeight:700,marginRight:4}}>✦ VISUAL</span>}
                    <div className={`type-check${isSel?" checked":""}`}>{isSel?"✓":""}</div>
                  </button>
                );
              })}
            </div>
            {hasVisualTypes&&(
              <div style={{marginTop:10,padding:"8px 12px",background:"rgba(251,191,36,0.07)",borderRadius:10,border:"1px solid rgba(251,191,36,0.15)"}}>
                <span style={{fontSize:11,color:"#fbbf24"}}>✦ Items marked VISUAL support bonus makeover image prompts below</span>
              </div>
            )}
          </div>

          {/* STEP 3 */}
          <div className="card">
            <div className="card-title">
              <span className="step-badge pink">STEP 3</span>{t.step3}
              <span className="multi-hint">{t.step3opt}</span>
            </div>
            <div style={{marginTop:14}}>
              <div className="vibe-label">{t.vibeLabel}</div>
              <div className="vibe-row">
                {t.vibes.map((v)=>(
                  <button key={v} className={`vibe-btn${selectedVibe===v?" active":""}`} onClick={()=>setSelectedVibe(selectedVibe===v?"":v)}>{v}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Visual Options — only show if visual types selected */}
          {hasVisualTypes&&(
            <div className="card-visual">
              <div className="card-title">
                <span className="step-badge gold">✦ VISUAL</span>
                {t.visualPromptLabel}
              </div>
              <p style={{fontSize:12,color:"rgba(251,191,36,0.6)",marginTop:6,marginBottom:16}}>{t.visualPromptSub}</p>

              {/* Color picker — show for outfit/color types */}
              {selectedTypesData.some(x=>["outfit","color"].includes(x.id))&&(
                <div style={{marginBottom:16}}>
                  <div className="section-label">{t.outfitColorLabel}</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.3)",marginBottom:8}}>{t.outfitColorSub} (max 5 · {selectedColors.length}/5)</div>
                  <div className="color-grid">
                    {t.colors.map((c)=>(
                      <button key={c} className={`color-chip${selectedColors.includes(c)?" active":""}`} onClick={()=>toggleColor(c)}>{c}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* Layout selector */}
              <div>
                <div className="section-label">{t.layoutLabel}</div>
                <div className="layout-row">
                  <button className={`layout-btn${visualLayout==="side"?" active":""}`} onClick={()=>setVisualLayout("side")}>
                    <span className="layout-icon">◧</span>{t.layoutSide}
                  </button>
                  <button className={`layout-btn${visualLayout==="grid"?" active":""}`} onClick={()=>setVisualLayout("grid")}>
                    <span className="layout-icon">⊞</span>{t.layoutGrid}
                  </button>
                  <button className={`layout-btn${visualLayout==="single"?" active":""}`} onClick={()=>setVisualLayout("single")}>
                    <span className="layout-icon">▭</span>{t.layoutSingle}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Name */}
          <div className="card">
            <label style={{fontSize:13,fontWeight