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
    step4: "Visual Effect Options",
    step4opt: "For visual types",
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
      "Pick a style vibe & visual options (optional)",
      "Go to ChatGPT · Upload your photo · Paste the prompt · Get your report!",
    ],
    visits: "visits",
    selected: (n) => `${n} selected`,
    authorBio: "AI enthusiast & content creator. Helping you look your best with AI!",
    adTitle: "📢 Advertise Here",
    adSub: "Reach AI & fashion enthusiasts ·",
    vibes: ["More Dashing", "More Elegant", "More Youthful", "More Sophisticated", "More Cute", "More Edgy"],
    layoutLabel: "🖼 Effect Image Layout",
    layouts: ["Before / After", "3-Panel Grid", "Single Image"],
    colorLabel: "👗 Clothing Colors (max 4)",
    colorPlaceholder: "e.g. Navy Blue, Beige, White, Olive",
    colorHint: "Enter up to 4 colors separated by commas",
    tabReport: "Report",
    tabVisual: "Visual",
    combinedPromptLabel: "✨ Combined Style Makeover",
    combinedNote: "Combined prompt for all selected visual types",
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
    step4: "效果图选项",
    step4opt: "视觉类型专用",
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
      "选择风格方向与效果图选项（可选）",
      "前往 ChatGPT · 上传照片 · 粘贴提示词 · 获取你的专业报告！",
    ],
    visits: "次访问",
    selected: (n) => `已选 ${n} 项`,
    authorBio: "AI 爱好者 & 内容创作者，用 AI 帮你打造最好的自己！",
    adTitle: "📢 广告招租",
    adSub: "触达 AI 与时尚爱好者 ·",
    vibes: ["更帅气", "更优雅", "更年轻", "更成熟", "更可爱", "更个性"],
    layoutLabel: "🖼 效果图布局",
    layouts: ["前后对比", "三格展示", "单张效果图"],
    colorLabel: "👗 服装颜色（最多4种）",
    colorPlaceholder: "例如：藏青色、米色、白色、橄榄绿",
    colorHint: "输入最多4种颜色，用逗号分隔",
    tabReport: "报告",
    tabVisual: "效果图",
    combinedPromptLabel: "✨ 综合造型改造",
    combinedNote: "已为所有选中的视觉类型生成综合造型提示词",
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
    step4: "ビジュアルオプション",
    step4opt: "ビジュアルタイプ用",
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
      "スタイルの好みとビジュアルオプションを選ぶ（任意）",
      "ChatGPTへ · 写真をアップロード · プロンプトを貼り付け · レポートを取得！",
    ],
    visits: "回訪問",
    selected: (n) => `${n}件選択中`,
    authorBio: "AIエンスージアスト＆コンテンツクリエイター。AIであなたの魅力を最大限に！",
    adTitle: "📢 広告掲載募集",
    adSub: "AI・ファッション愛好家にリーチ ·",
    vibes: ["よりダッシング", "よりエレガント", "より若々しく", "よりソフィスティケート", "よりキュート", "よりエッジー"],
    layoutLabel: "🖼 エフェクト画像レイアウト",
    layouts: ["ビフォー/アフター", "3パネルグリッド", "シングル画像"],
    colorLabel: "👗 服の色（最大4色）",
    colorPlaceholder: "例：ネイビー、ベージュ、ホワイト、オリーブ",
    colorHint: "カンマ区切りで最大4色入力",
    tabReport: "レポート",
    tabVisual: "ビジュアル",
    combinedPromptLabel: "✨ 総合スタイルメイクオーバー",
    combinedNote: "選択したすべてのビジュアルタイプの総合プロンプト",
  },
};

const LAYOUT_PROMPT_DESC = {
  en: {
    "Before / After": "side-by-side BEFORE (left, original photo) and AFTER (right, fully styled result) layout",
    "3-Panel Grid": "3-panel horizontal grid: Panel 1 = original photo, Panel 2 = front view styled, Panel 3 = detail close-up",
    "Single Image": "single full-image styled portrait, high detail",
  },
  zh: {
    "前后对比": "side-by-side BEFORE (left, original photo) and AFTER (right, fully styled result) layout",
    "三格展示": "3-panel horizontal grid: Panel 1 = original photo, Panel 2 = front view styled, Panel 3 = detail close-up",
    "单张效果图": "single full-image styled portrait, high detail",
  },
  ja: {
    "ビフォー/アフター": "side-by-side BEFORE (left, original photo) and AFTER (right, fully styled result) layout",
    "3パネルグリッド": "3-panel horizontal grid: Panel 1 = original photo, Panel 2 = front view styled, Panel 3 = detail close-up",
    "シングル画像": "single full-image styled portrait, high detail",
  },
};

const getAnalysisTypes = (lang) => [
  {
    id: "face",
    label: { en: "Facial Analysis", zh: "面部特征分析", ja: "顔の特徴分析" }[lang],
    sub: { en: "Proportions & measurements", zh: "比例与测量数据", ja: "プロポーション＆計測" }[lang],
    icon: "🔬",
    isVisual: false,
    reportPrompt: (name, vibe) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo.

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
SUMMARY: 2-3 sentence professional summary for ${name}.

RULES: Full color · Annotations on photo · Identity unaltered · No grayscale · No watermarks`,
  },
  {
    id: "color",
    label: { en: "Color Analysis", zh: "个人色彩分析", ja: "パーソナルカラー分析" }[lang],
    sub: { en: "Seasonal color & skin tone", zh: "四季色彩与肤色", ja: "シーズンカラー＆肌色" }[lang],
    icon: "🎨",
    isVisual: true,
    reportPrompt: (name, vibe) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo.

Generate a professional Personal Color Report in a HORIZONTAL 16:9 landscape layout.

Subject name: ${name}${vibe ? `\nStyle vibe: ${vibe}` : ""}

LEFT SECTION (55%): Full color portrait. Overlay color swatches and tone labels near skin, hair, and eye areas. Show undertone labels (warm/cool/neutral) and a Season type badge (Spring/Summer/Autumn/Winter).

RIGHT SECTION (45%): White/light gray background.
HEADER: "PERSONAL COLOR ANALYSIS REPORT" / "SEASONAL COLOR PROFILING"
BEST COLORS: 6 recommended clothing colors with hex codes
AVOID COLORS: 3 colors to avoid with reason
DIAGRAM: Color palette grid — 6 best + 3 avoid
NOTES: Natural light photo · Undertone detected · Season identified
SUMMARY: 2-3 sentence professional summary for ${name}.

RULES: Full color · Annotations on photo · Identity unaltered · No grayscale · No watermarks`,
    visualPrompt: (name, vibe, layout, colors) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo. Do NOT alter facial features.

Generate a COLOR PALETTE STYLING VISUAL in a ${layout} format.

Subject name: ${name}${vibe ? `\nStyle vibe: ${vibe}` : ""}${colors ? `\nPreferred clothing colors: ${colors}` : ""}

STYLING DIRECTION:
- Apply the subject's best seasonal color palette to their outfit and accessories
- Show coordinated clothing in their most flattering colors
- Maintain natural skin tone and hair color
- Add subtle color swatches as overlay labels showing the palette used

QUALITY: Photorealistic · Fashion editorial style · Soft studio lighting · High detail
IDENTITY: Face and features must remain 100% identical to the original photo
RULES: Full color · Realistic styling · Identity unaltered · No grayscale · No watermarks`,
  },
  {
    id: "glasses",
    label: { en: "Glasses Guide", zh: "眼镜推荐", ja: "メガネガイド" }[lang],
    sub: { en: "Frame matching by face shape", zh: "根据脸型推荐镜框", ja: "顔型に合うフレーム" }[lang],
    icon: "👓",
    isVisual: true,
    reportPrompt: (name, vibe) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo.

Generate a professional Spectacles Recommendation Report in a HORIZONTAL 16:9 landscape layout.

Subject name: ${name}${vibe ? `\nStyle vibe: ${vibe}` : ""}

LEFT SECTION (55%): Full color portrait. Overlay face shape guides: dashed outline tracing face shape, width and length ratio lines, frame icons near eye area showing best match.

RIGHT SECTION (45%): White/light gray background.
HEADER: "SPECTACLES GUIDE" / "FACE SHAPE & FRAME MATCHING"
RECOMMENDED FRAMES: Round / Rectangular / Aviator / Cat-eye / Rimless / Bold — with suitability scores
FRAMES TO AVOID: Styles that clash with face shape + reason
DIAGRAM: Grid of 6 frame style icons
NOTES: Based on frontal proportions · Face shape detected · Style guidelines only
SUMMARY: 2-3 sentence professional summary for ${name}.

RULES: Full color · Annotations on photo · Identity unaltered · No grayscale · No watermarks`,
    visualPrompt: (name, vibe, layout, colors) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo. Do NOT alter facial features.

Generate a GLASSES STYLING VISUAL in a ${layout} format.

Subject name: ${name}${vibe ? `\nStyle vibe: ${vibe}` : ""}${colors ? `\nPreferred clothing colors: ${colors}` : ""}

STYLING DIRECTION:
- Show the subject wearing the most flattering glasses frame style for their face shape
- Frame style should complement face proportions (e.g., round frames for square face)
- Keep glasses realistic and wearable — no costume or novelty frames
- Soft natural or studio lighting to highlight the frames clearly

QUALITY: Photorealistic · Fashion editorial style · High detail on frames
IDENTITY: Face and features must remain 100% identical to the original photo
RULES: Full color · Realistic glasses · Identity unaltered · No grayscale · No watermarks`,
  },
  {
    id: "hairstyle",
    label: { en: "Hairstyle Analysis", zh: "发型分析", ja: "ヘアスタイル分析" }[lang],
    sub: { en: "Best styles for your face", zh: "最适合你脸型的发型", ja: "顔型に合うヘアスタイル" }[lang],
    icon: "💇",
    isVisual: true,
    reportPrompt: (name, vibe) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo.

Generate a professional Hairstyle Report in a HORIZONTAL 16:9 landscape layout.

Subject name: ${name}${vibe ? `\nStyle vibe: ${vibe}` : ""}

LEFT SECTION (55%): Full color portrait. Overlay contour guides: forehead width measurement line, jawline contour outline, face length-to-width ratio indicator.

RIGHT SECTION (45%): White/light gray background.
HEADER: "HAIRSTYLE ANALYSIS REPORT" / "FACE SHAPE & STYLE MATCHING"
RECOMMENDED HAIRSTYLES: 6 styles with suitability rating and reason
STYLES TO AVOID: 3 styles that don't suit the face shape + reason
DIAGRAM: Hairstyle silhouette icons grid
NOTES: Face shape analysis · Hair texture not assessed · Style suggestions only
SUMMARY: 2-3 sentence professional summary for ${name}.

RULES: Full color · Annotations on photo · Identity unaltered · No grayscale · No watermarks`,
    visualPrompt: (name, vibe, layout, colors) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo. Do NOT alter facial features.

Generate a HAIRSTYLE MAKEOVER VISUAL in a ${layout} format.

Subject name: ${name}${vibe ? `\nStyle vibe: ${vibe}` : ""}${colors ? `\nPreferred clothing colors: ${colors}` : ""}

STYLING DIRECTION:
- Apply the most flattering hairstyle for the subject's face shape
- Hairstyle should be modern, realistic, and wearable
- Hair color may be slightly enhanced but should remain natural-looking
- Show the new hairstyle clearly with good lighting and detail

QUALITY: Photorealistic · Salon/editorial style · High detail on hair texture
IDENTITY: Face and features must remain 100% identical to the original photo
RULES: Full color · Realistic hair · Identity unaltered · No grayscale · No watermarks`,
  },
  {
    id: "physique",
    label: { en: "Physique Analysis", zh: "体型分析", ja: "体型分析" }[lang],
    sub: { en: "Body composition & posture", zh: "体态与体型评估", ja: "体組成＆姿勢評価" }[lang],
    icon: "💪",
    isVisual: false,
    reportPrompt: (name, vibe) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo.

Generate a professional Physique Report in a HORIZONTAL 16:9 landscape layout.

Subject name: ${name}${vibe ? `\nStyle vibe: ${vibe}` : ""}

LEFT SECTION (55%): Full color portrait. Overlay body measurement lines: shoulder width, waist, hip lines; muscle group labels (shoulders, core, arms, legs); body type badge (Ectomorph/Mesomorph/Endomorph).

RIGHT SECTION (45%): White/light gray background.
HEADER: "PHYSIQUE ANALYSIS REPORT" / "BODY COMPOSITION ASSESSMENT"
BODY METRICS: Body Fat % / Shoulder Width / Waist Ratio / Muscle Balance / Posture Score / Body Type
FITNESS INDEX: Strength Score · Flexibility Score · Proportion Balance
DIAGRAM: Body silhouette with labeled muscle groups
NOTES: Visual 2D estimate · Not medical · Consult a professional
SUMMARY: 2-3 sentence professional summary for ${name}.

RULES: Full color · Annotations on photo · Identity unaltered · No grayscale · No watermarks`,
  },
  {
    id: "aesthetics",
    label: { en: "Aesthetics Report", zh: "面部美学报告", ja: "顔の美学レポート" }[lang],
    sub: { en: "Golden ratio & enhancement", zh: "黄金比例与提升建议", ja: "黄金比＆改善提案" }[lang],
    icon: "✨",
    isVisual: false,
    reportPrompt: (name, vibe) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo.

Generate a professional Facial Aesthetics Report in a HORIZONTAL 16:9 landscape layout.

Subject name: ${name}${vibe ? `\nStyle vibe: ${vibe}` : ""}

LEFT SECTION (55%): Full color portrait. Overlay suggestion arrows to hairline, brow, skin, expression areas with callout labels. Add golden ratio overlay lines on facial thirds.

RIGHT SECTION (45%): White/light gray background.
HEADER: "FACIAL AESTHETICS REPORT" / "ENHANCEMENT SUGGESTION ANALYSIS"
ENHANCEMENT: Hairline / Brow Shape / Skin Quality / Eye Area / Lip Balance / Jaw Definition
HARMONY SCORES: Facial Symmetry · Golden Ratio Match · Feature Balance
DIAGRAM: Golden ratio facial thirds diagram
NOTES: Visual estimates only · Not medical advice · 2D frontal image
SUMMARY: 2-3 sentence professional summary for ${name}.

RULES: Full color · Annotations on photo · Identity unaltered · No grayscale · No watermarks`,
  },
  {
    id: "outfit",
    label: { en: "Outfit Style Guide", zh: "穿搭风格指南", ja: "コーデスタイルガイド" }[lang],
    sub: { en: "Clothing & style suggestions", zh: "服装与风格建议", ja: "服装＆スタイル提案" }[lang],
    icon: "👗",
    isVisual: true,
    reportPrompt: (name, vibe) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo.

Generate a professional Outfit Style Report in a HORIZONTAL 16:9 landscape layout.

Subject name: ${name}${vibe ? `\nStyle vibe: ${vibe}` : ""}

LEFT SECTION (55%): Full color portrait. Overlay style annotations: labels on clothing items with style category tags, color coordination indicators, style archetype badge (Casual/Formal/Streetwear/Minimalist/etc.).

RIGHT SECTION (45%): White/light gray background.
HEADER: "OUTFIT STYLE REPORT" / "PERSONAL STYLE ASSESSMENT"
STYLE PROFILE: Style Category / Color Palette / Key Pieces / Fit / Occasion / Style Score
UPGRADE SUGGESTIONS: 3 ways to enhance this look
DIAGRAM: Outfit flat-lay icons or style mood board
NOTES: Based on visible clothing · Accessories not fully assessed · Style is subjective
SUMMARY: 2-3 sentence professional style summary for ${name}.

RULES: Full color · Annotations on photo · Identity unaltered · No grayscale · No watermarks`,
    visualPrompt: (name, vibe, layout, colors) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo. Do NOT alter facial features.

Generate an OUTFIT STYLING VISUAL in a ${layout} format.

Subject name: ${name}${vibe ? `\nStyle vibe: ${vibe}` : ""}${colors ? `\nPreferred clothing colors: ${colors}` : ""}

STYLING DIRECTION:
- Dress the subject in a complete, coordinated outfit matching their style profile and vibe
- Include top, bottom (or dress), shoes, and 1-2 accessories
- Clothing colors should follow the preferred palette if specified
- Ensure proper fit and proportion for the subject's body type

QUALITY: Photorealistic · Fashion editorial style · Full body or 3/4 shot · High detail
IDENTITY: Face and features must remain 100% identical to the original photo
RULES: Full color · Realistic outfit · Identity unaltered · No grayscale · No watermarks`,
  },
  {
    id: "accessory",
    label: { en: "Accessory Guide", zh: "配饰搭配指南", ja: "アクセサリーガイド" }[lang],
    sub: { en: "Jewelry & accessory pairing", zh: "珠宝与配饰搭配", ja: "ジュエリー＆アクセサリー" }[lang],
    icon: "💍",
    isVisual: true,
    reportPrompt: (name, vibe) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo.

Generate a professional Accessory Recommendation Report in a HORIZONTAL 16:9 landscape layout.

Subject name: ${name}${vibe ? `\nStyle vibe: ${vibe}` : ""}

LEFT SECTION (55%): Full color portrait. Overlay accessory guides: necklace length indicators, earring style suggestions near ear area, wrist/hand accessory placement markers.

RIGHT SECTION (45%): White/light gray background.
HEADER: "ACCESSORY GUIDE" / "JEWELRY & ACCESSORY PAIRING"
RECOMMENDED: Necklace / Earrings / Bracelet / Ring / Bag / Hat — with style match scores
AVOID: Accessory styles that clash with face shape or outfit
DIAGRAM: Accessory icon grid with pairing labels
NOTES: Based on visible features · Personal taste may vary · Style guidelines only
SUMMARY: 2-3 sentence professional recommendation for ${name}.

RULES: Full color · Annotations on photo · Identity unaltered · No grayscale · No watermarks`,
    visualPrompt: (name, vibe, layout, colors) => `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo. Do NOT alter facial features.

Generate an ACCESSORY STYLING VISUAL in a ${layout} format.

Subject name: ${name}${vibe ? `\nStyle vibe: ${vibe}` : ""}${colors ? `\nPreferred clothing colors: ${colors}` : ""}

STYLING DIRECTION:
- Style the subject with the most flattering jewelry and accessories for their face shape
- Include: necklace, earrings, bracelet or watch, and a bag or hat as appropriate
- Accessories should be elegant, modern, and cohesive as a complete set
- Metal tones (gold/silver/rose gold) should complement the subject's skin undertone

QUALITY: Photorealistic · Fashion editorial style · High detail on accessories
IDENTITY: Face and features must remain 100% identical to the original photo
RULES: Full color · Realistic accessories · Identity unaltered · No grayscale · No watermarks`,
  },
];

const buildCombinedPrompt = (name, vibe, layout, colors, visualTypes) => {
  const typeNames = visualTypes.map((t) => t.label).join(", ");
  const hairLine = visualTypes.some((t) => t.id === "hairstyle")
    ? "- HAIR: Apply the most flattering hairstyle for the subject's face shape. Modern, realistic, wearable.\n"
    : "";
  const glassLine = visualTypes.some((t) => t.id === "glasses")
    ? "- GLASSES: Add the most complementary eyeglass frame style for the face shape.\n"
    : "";
  const outfitLine = visualTypes.some((t) => t.id === "outfit")
    ? `- OUTFIT: Dress in a complete, coordinated, fashionable outfit${colors ? ` using colors (${colors})` : ""}. Include top, bottom/dress, shoes.\n`
    : "";
  const accLine = visualTypes.some((t) => t.id === "accessory")
    ? "- ACCESSORIES: Add flattering jewelry and accessories (necklace, earrings, bag/hat as appropriate).\n"
    : "";
  const colorLine = visualTypes.some((t) => t.id === "color")
    ? "- COLOR PALETTE: Ensure all clothing and accessory colors align with the subject's best seasonal color palette.\n"
    : "";
  return `This is a new independent image generation task. Use ONLY the uploaded portrait photo as the subject reference. Keep the subject's face, identity, skin tone, and features 100% faithful to the original photo. Do NOT alter facial features.

Generate a COMPREHENSIVE STYLE MAKEOVER VISUAL in a ${layout} format.

Subject name: ${name}${vibe ? `\nStyle vibe: ${vibe}` : ""}${colors ? `\nPreferred clothing colors: ${colors}` : ""}
Style transformation areas: ${typeNames}

COMPREHENSIVE STYLING DIRECTION:
${hairLine}${glassLine}${outfitLine}${accLine}${colorLine}
OVERALL GOAL: Create a cohesive, polished, magazine-worthy total look that enhances the subject's natural features.
${vibe ? `VIBE DIRECTION: The overall look should feel "${vibe}".` : ""}

QUALITY: Photorealistic · High-end fashion editorial · Professional studio lighting · Full body or 3/4 shot · Ultra-high detail
IDENTITY: Face and features must remain 100% identical to the original photo
RULES: Full color · Realistic total styling · Identity unaltered · No grayscale · No watermarks`;
};

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
  const [selectedLayout, setSelectedLayout] = useState(0);
  const [clothingColors, setClothingColors] = useState("");
  const [activeTab, setActiveTab] = useState({});

  const t = LANGS[lang];
  const ANALYSIS_TYPES = getAnalysisTypes(lang);

  useEffect(() => {
    fetch("https://api.counterapi.dev/v1/ai-style-analyzer/visits/up")
      .then((r) => r.json())
      .then((d) => setVisitorCount(d.count))
      .catch(() => setVisitorCount("--"));
  }, []);

  const handleLangChange = (l) => {
    setLang(l);
    setSelectedVibe("");
    setSelectedLayout(0);
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
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    setGenerated(false);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const getLayoutDesc = () => {
    const name = t.layouts[selectedLayout];
    const map = LAYOUT_PROMPT_DESC[lang];
    return map[name] || Object.values(LAYOUT_PROMPT_DESC.en)[selectedLayout];
  };

  const getColors = () =>
    clothingColors.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 4).join(", ");

  const selectedTypesData = ANALYSIS_TYPES.filter((x) => selectedTypes.includes(x.id));
  const selectedVisualTypes = selectedTypesData.filter((x) => x.isVisual);
  const hasCombined = selectedVisualTypes.length > 1;

  const getTab = (id) => activeTab[id] || "report";
  const setTab = (id, tab) => setActiveTab((prev) => ({ ...prev, [id]: tab }));

  const colorTags = clothingColors.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 4);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter',sans-serif;background:#0d0d1a;min-height:100vh}
        .pw{min-height:100vh;display:flex;flex-direction:column;background:linear-gradient(160deg,#0d0d1a 0%,#130d2a 50%,#0a1020 100%);position:relative}
        .pw::before{content:'';position:fixed;top:0;left:0;right:0;bottom:0;background:radial-gradient(ellipse at 15% 15%,rgba(139,92,246,.18) 0%,transparent 45%),radial-gradient(ellipse at 85% 80%,rgba(236,72,153,.13) 0%,transparent 45%);pointer-events:none;z-index:0;animation:bgP 10s ease-in-out infinite alternate}
        @keyframes bgP{from{opacity:.7}to{opacity:1}}
        .hdr{background:linear-gradient(90deg,#6d28d9,#a21caf,#db2777);padding:14px 20px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;box-shadow:0 2px 20px rgba(139,92,246,.4);flex-wrap:wrap;gap:10px}
        .hl{display:flex;align-items:center;gap:10px}
        .hi{font-size:26px;filter:drop-shadow(0 0 8px rgba(255,255,255,.5))}
        .ht{font-size:18px;font-weight:800;color:white;letter-spacing:-.3px}
        .hs{font-size:11px;color:rgba(255,255,255,.7);margin-top:1px}
        .hr{display:flex;flex-direction:column;align-items:flex-end;gap:6px}
        .hdate{font-size:12px;color:rgba(255,255,255,.75)}
        .hfree{font-size:11px;color:rgba(255,255,255,.5)}
        .vbadge{font-size:10px;background:rgba(255,255,255,.15);color:rgba(255,255,255,.7);padding:2px 8px;border-radius:999px;font-weight:700;letter-spacing:.5px}
        .lsw{display:flex;gap:4px;background:rgba(0,0,0,.25);border-radius:999px;padding:3px}
        .lb{padding:4px 12px;border-radius:999px;font-size:12px;font-weight:700;border:none;cursor:pointer;transition:all .2s;background:transparent;color:rgba(255,255,255,.55)}
        .lb.act{background:rgba(255,255,255,.2);color:white;box-shadow:0 2px 8px rgba(0,0,0,.3)}
        .lb:hover:not(.act){color:white}
        .mc{flex:1;max-width:760px;margin:0 auto;width:100%;padding:24px 16px 32px;display:flex;flex-direction:column;gap:16px;position:relative;z-index:1}
        .card{background:rgba(255,255,255,.04);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:20px;transition:border-color .3s}
        .card:hover{border-color:rgba(139,92,246,.25)}
        .sb{display:inline-flex;align-items:center;background:linear-gradient(90deg,#f59e0b,#f97316);color:white;font-size:11px;font-weight:800;padding:3px 10px;border-radius:999px;margin-right:10px;letter-spacing:.5px;white-space:nowrap}
        .sb.p{background:linear-gradient(90deg,#7c3aed,#a855f7)}
        .sb.pk{background:linear-gradient(90deg,#db2777,#f472b6)}
        .sb.tl{background:linear-gradient(90deg,#0891b2,#06b6d4)}
        .ct{font-size:16px;font-weight:700;color:white;display:flex;align-items:center;flex-wrap:wrap;gap:4px}
        .ctr{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:8px}
        .uz{border:2px dashed rgba(255,255,255,.15);border-radius:14px;cursor:pointer;transition:all .3s;overflow:hidden}
        .uz:hover,.uz.do{border-color:rgba(167,139,250,.6);background:rgba(139,92,246,.07)}
        .ui{display:flex;align-items:center;gap:16px;padding:16px}
        .uth{width:90px;height:90px;border-radius:12px;object-fit:cover;flex-shrink:0;border:2px solid rgba(167,139,250,.4)}
        .uph{width:90px;height:90px;border-radius:12px;background:rgba(255,255,255,.05);display:flex;align-items:center;justify-content:center;font-size:32px;flex-shrink:0}
        .uok{color:#4ade80;font-weight:700;font-size:14px;margin-bottom:8px}
        .uhi{font-size:12px;color:rgba(255,255,255,.4);line-height:1.8}
        .utp{font-size:11px;color:rgba(255,255,255,.25);margin-top:6px}
        .sc{background:linear-gradient(90deg,#7c3aed,#ec4899);color:white;font-size:12px;font-weight:700;padding:4px 12px;border-radius:999px;white-space:nowrap}
        .mh{font-size:12px;color:rgba(255,255,255,.35);margin-left:4px}
        .tg{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        .tb{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:12px 14px;cursor:pointer;transition:all .2s;text-align:left}
        .tb:hover{background:rgba(139,92,246,.1);border-color:rgba(139,92,246,.35)}
        .tb.sel{background:rgba(124,58,237,.2);border-color:rgba(167,139,250,.6);box-shadow:0 0 16px rgba(139,92,246,.2)}
        .vb2{font-size:9px;background:rgba(6,182,212,.2);color:#67e8f9;border:1px solid rgba(6,182,212,.3);border-radius:4px;padding:1px 5px;font-weight:700;letter-spacing:.3px;margin-top:3px;display:inline-block}
        .tic{font-size:22px;flex-shrink:0}
        .tl2{font-size:13px;font-weight:600;color:white}
        .ts{font-size:11px;color:rgba(255,255,255,.4);margin-top:2px}
        .tc{width:20px;height:20px;border-radius:50%;border:2px solid rgba(255,255,255,.2);margin-left:auto;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:11px;transition:all .2s}
        .tc.ck{background:linear-gradient(135deg,#7c3aed,#ec4899);border-color:transparent;color:white}
        .vr{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
        .vbtn{padding:7px 16px;border-radius:999px;font-size:13px;font-weight:500;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04);color:rgba(255,255,255,.6);cursor:pointer;transition:all .2s}
        .vbtn:hover{border-color:rgba(167,139,250,.4);color:white}
        .vbtn.av{background:linear-gradient(135deg,#f59e0b,#f97316);border-color:transparent;color:white;font-weight:700;box-shadow:0 4px 14px rgba(245,158,11,.35)}
        .vlbl{font-size:13px;font-weight:600;color:#fbbf24;margin-bottom:2px}
        .lr{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}
        .lbtn{padding:7px 16px;border-radius:10px;font-size:12px;font-weight:600;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04);color:rgba(255,255,255,.6);cursor:pointer;transition:all .2s}
        .lbtn:hover{border-color:rgba(6,182,212,.4);color:white}
        .lbtn.al{background:linear-gradient(135deg,#0891b2,#06b6d4);border-color:transparent;color:white;font-weight:700;box-shadow:0 4px 14px rgba(6,182,212,.3)}
        .ci{width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:11px 16px;font-size:14px;color:white;outline:none;font-family:'Inter',sans-serif;transition:border-color .3s;margin-top:10px}
        .ci:focus{border-color:rgba(6,182,212,.5)}
        .chi{font-size:11px;color:rgba(255,255,255,.25);margin-top:6px}
        .ctags{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
        .ctag{padding:3px 10px;border-radius:999px;font-size:11px;font-weight:600;background:rgba(6,182,212,.15);border:1px solid rgba(6,182,212,.3);color:#67e8f9}
        .gbtn{width:100%;padding:16px;background:linear-gradient(90deg,#7c3aed,#a855f7,#ec4899);background-size:200%;animation:gs 4s ease infinite;border:none;border-radius:14px;color:white;font-size:16px;font-weight:800;cursor:pointer;transition:all .3s;box-shadow:0 6px 24px rgba(139,92,246,.45);letter-spacing:.3px}
        .gbtn:hover{transform:translateY(-2px);box-shadow:0 10px 32px rgba(139,92,246,.6)}
        .gbtn:disabled{background:rgba(255,255,255,.08);color:rgba(255,255,255,.3);cursor:not-allowed;animation:none;box-shadow:none;transform:none}
        @keyframes gs{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        .pb{background:rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.07);border-radius:14px;overflow:hidden;margin-bottom:12px}
        .ph{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:rgba(139,92,246,.12);border-bottom:1px solid rgba(255,255,255,.06);flex-wrap:wrap;gap:8px}
        .ptl{font-size:14px;font-weight:700;color:white}
        .ptabs{display:flex;gap:4px}
        .ptab{padding:4px 12px;border-radius:999px;font-size:11px;font-weight:700;border:1px solid rgba(255,255,255,.12);background:transparent;color:rgba(255,255,255,.45);cursor:pointer;transition:all .2s}
        .ptab.at{background:rgba(139,92,246,.35);border-color:rgba(167,139,250,.5);color:white}
        .cbtn{padding:6px 16px;border-radius:999px;font-size:12px;font-weight:700;border:none;cursor:pointer;transition:all .2s;background:linear-gradient(90deg,#7c3aed,#ec4899);color:white;white-space:nowrap}
        .cbtn.dn{background:linear-gradient(90deg,#059669,#10b981)}
        .cbtn:hover{transform:scale(1.05)}
        .pt{padding:14px 16px;font-size:12px;color:rgba(255,255,255,.6);line-height:1.7;max-height:160px;overflow-y:auto;white-space:pre-wrap;word-break:break-word}
        .cpb{background:rgba(0,0,0,.4);border:1px solid rgba(236,72,153,.25);border-radius:14px;overflow:hidden;margin-bottom:12px}
        .cph{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:linear-gradient(90deg,rgba(124,58,237,.2),rgba(236,72,153,.15));border-bottom:1px solid rgba(255,255,255,.06);flex-wrap:wrap;gap:8px}
        .cpn{font-size:11px;color:rgba(255,255,255,.35);margin-top:4px}
        .hsteps{display:flex;flex-direction:column;gap:10px}
        .hstep{display:flex;align-items:flex-start;gap:12px}
        .hnum{width:26px;height:26px;border-radius:50%;flex-shrink:0;background:linear-gradient(135deg,#7c3aed,#ec4899);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:white}
        .htxt{font-size:13px;color:rgba(255,255,255,.55);line-height:1.6;padding-top:3px}
        .hlnk{color:#a78bfa;text-decoration:none;font-weight:600}
        .hlnk:hover{text-decoration:underline}
        .vp{display:flex;align-items:center;gap:6px;background:rgba(255,255,255,.1);border-radius:999px;padding:5px 12px;font-size:12px;color:rgba(255,255,255,.65)}
        .ld{width:7px;height:7px;border-radius:50%;background:#4ade80;box-shadow:0 0 6px #4ade80;animation:bl 2s ease-in-out infinite}
        @keyframes bl{0%,100%{opacity:1}50%{opacity:.3}}
        footer{background:rgba(0,0,0,.5);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.06);padding:28px 20px;position:relative;z-index:1}
        .fi{max-width:760px;margin:0 auto}
        .ar{display:flex;align-items:center;gap:14px;margin-bottom:20px}
        .av{width:48px;height:48px;border-radius:50%;flex-shrink:0;background:linear-gradient(135deg,#7c3aed,#ec4899);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:white;box-shadow:0 0 18px rgba(139,92,246,.5)}
        .an{font-size:15px;font-weight:700;color:white}
        .ab{font-size:12px;color:rgba(255,255,255,.4);margin-top:3px}
        .sr{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px}
        .sbn{display:inline-flex;align-items:center;gap:6px;padding:7px 16px;border-radius:999px;font-size:12px;font-weight:600;text-decoration:none;transition:all .2s}
        .sy{background:rgba(220,38,38,.2);border:1px solid rgba(220,38,38,.35);color:#fca5a5}
        .sy:hover{background:rgba(220,38,38,.35);transform:translateY(-2px)}
        .sy2{background:rgba(185,28,28,.2);border:1px solid rgba(185,28,28,.35);color:#fca5a5}
        .sy2:hover{background:rgba(185,28,28,.35);transform:translateY(-2px)}
        .scf{background:rgba(234,179,8,.15);border:1px solid rgba(234,179,8,.35);color:#fde047}
        .scf:hover{background:rgba(234,179,8,.28);transform:translateY(-2px)}
        .adb{border:1px dashed rgba(255,255,255,.1);border-radius:14px;padding:16px;text-align:center;margin-bottom:16px;background:rgba(255,255,255,.02)}
        .adt{font-size:13px;color:rgba(255,255,255,.35);font-weight:600}
        .ads{font-size:11px;color:rgba(255,255,255,.2);margin-top:4px}
        .adl{color:#a78bfa;text-decoration:none}
        .dv{height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent);margin:16px 0}
        .cp{text-align:center;font-size:11px;color:rgba(255,255,255,.15)}
        .fi2{animation:fu .4s ease forwards}
        @keyframes fu{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:480px){.tg{grid-template-columns:1fr}.ht{font-size:15px}}
      `}</style>

      <div className="pw">
        <header className="hdr">
          <div className="hl">
            <span className="hi">🪄</span>
            <div>
              <div className="ht">AI Style Analyzer <span className="vbadge">v1.3.0</span></div>
              <div className="hs">{t.headerSub}</div>
            </div>
          </div>
          <div className="hr">
            <div className="lsw">
              {[{code:"en",label:"🇺🇸 EN"},{code:"zh",label:"🇨🇳 中文"},{code:"ja",label:"🇯🇵 日本語"}].map(({code,label})=>(
                <button key={code} className={`lb${lang===code?" act":""}`} onClick={()=>handleLangChange(code)}>{label}</button>
              ))}
            </div>
            <div className="hdate">{t.dateLabel(new Date())}</div>
            <div className="hfree">{t.free}</div>
          </div>
        </header>

        <main className="mc">

  {/* ===== DEMO HERO SECTION ===== */}
  <div style={{
    marginBottom: 32,
    padding: "24px 20px",
    background: "linear-gradient(135deg, rgba(109,40,217,0.15), rgba(219,39,119,0.15))",
    border: "1px solid rgba(168,85,247,0.3)",
    borderRadius: 16,
    position: "relative",
    overflow: "hidden"
  }}>
    {/* Badge */}
    <div style={{
      display: "inline-block",
      padding: "6px 14px",
      background: "linear-gradient(90deg, #ef4444, #f97316)",
      borderRadius: 20,
      fontSize: 12,
      fontWeight: 700,
      color: "white",
      marginBottom: 12,
      boxShadow: "0 4px 12px rgba(239,68,68,0.4)"
    }}>
      🔥 LIVE DEMO
    </div>

    {/* Title */}
    <div style={{
      fontSize: 24,
      fontWeight: 700,
      background: "linear-gradient(90deg, #a855f7, #ec4899, #f97316)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: 8
    }}>
      {lang === "en" && "See What AI Style Analyzer Can Do"}
      {lang === "zh" && "看看 AI 风格分析的真实效果"}
      {lang === "ja" && "AIスタイル分析の実力を見る"}
    </div>

    {/* Subtitle */}
    <div style={{
      fontSize: 13,
      color: "rgba(255,255,255,0.5)",
      marginBottom: 20
    }}>
      {lang === "en" && "Real transformation · Professional analysis · Instant results"}
      {lang === "zh" && "真实改造 · 专业分析 · 即时生成"}
      {lang === "ja" && "リアルな変身 · プロ分析 · 即座に結果"}
    </div>

    {/* Demo Image */}
    <div style={{
      position: "relative",
      borderRadius: 12,
      overflow: "hidden",
      border: "1px solid rgba(168,85,247,0.2)",
      marginBottom: 16,
      cursor: "pointer",
      transition: "transform 0.3s ease",
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
    onClick={() => {
      document.getElementById("fi")?.scrollIntoView({behavior: "smooth"});
    }}
    >
      <img 
        src="/screenshots/elon-demo.png" 
        alt="AI Style Analysis Demo"
        style={{
          width: "100%",
          display: "block"
        }}
      />
    </div>

    {/* CTA Button */}
    <button 
      className="gbtn"
      style={{
        width: "100%",
        padding: "14px 24px",
        fontSize: 15,
        fontWeight: 600,
        marginBottom: 12
      }}
      onClick={() => {
        document.getElementById("fi")?.click();
      }}
    >
      {lang === "en" && "🎯 Try With Your Photo Now"}
      {lang === "zh" && "🎯 立即上传你的照片试试"}
      {lang === "ja" && "🎯 あなたの写真で今すぐ試す"}
    </button>

    {/* Disclaimer */}
    <div style={{
      fontSize: 10,
      color: "rgba(255,255,255,0.25)",
      textAlign: "center",
      lineHeight: 1.5
    }}>
      {lang === "en" && "Demo · Educational use only · Not affiliated"}
      {lang === "zh" && "演示样本 · 仅用于教育目的 · 未经授权"}
      {lang === "ja" && "デモ · 教育目的のみ · 提携なし"}
    </div>
  </div>

  {/* STEP 2, 3, 4... */}

          {/* STEP 1 */}
          <div className="card">
            <div className="ctr">
              <div className="ct"><span className="sb">STEP 1</span>{t.step1}</div>
              <div className="vp">
                <div className="ld"/>
                <span>{visitorCount!==null?Number(visitorCount).toLocaleString():"..."} {t.visits}</span>
              </div>
            </div>
            <div
              className={`uz${dragOver?" do":""}`}
              onDragOver={(e)=>{e.preventDefault();setDragOver(true)}}
              onDragLeave={()=>setDragOver(false)}
              onDrop={handleDrop}
              onClick={()=>document.getElementById("fi").click()}
            >
              <input id="fi" type="file" accept="image/*" style={{display:"none"}} onChange={(e)=>handleImage(e.target.files[0])}/>
              <div className="ui">
                {image
                  ? <img src={image} alt="uploaded" className="uth"/>
                  : <div className="uph">📷</div>
                }
                <div>
                  {image
                    ? <div className="uok">{t.uploadSuccess}</div>
                    : <div style={{color:"rgba(255,255,255,.7)",fontWeight:600,fontSize:14,marginBottom:8}}>{t.uploadClick}</div>
                  }
                  <div className="uhi">• {t.uploadHint1}<br/>• {t.uploadHint2}</div>
                  <div className="utp">💡 {t.uploadTip}</div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="card">
            <div className="ctr">
              <div className="ct">
                <span className="sb p">STEP 2</span>{t.step2}
                <span className="mh">{t.step2multi}</span>
              </div>
              {selectedTypes.length>0&&<span className="sc">{t.selected(selectedTypes.length)}</span>}
            </div>
            <div className="tg">
              {ANALYSIS_TYPES.map((type)=>{
                const isSel=selectedTypes.includes(type.id);
                return(
                  <button key={type.id} className={`tb${isSel?" sel":""}`} onClick={()=>toggleType(type.id)}>
                    <span className="tic">{type.icon}</span>
                    <div style={{flex:1}}>
                      <div className="tl2">{type.label}</div>
                      <div className="ts">{type.sub}</div>
                      {type.isVisual&&<span className="vb2">+ Visual</span>}
                    </div>
                    <div className={`tc${isSel?" ck":""}`}>{isSel?"✓":""}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3 */}
          <div className="card">
            <div className="ct"><span className="sb pk">STEP 3</span>{t.step3}<span className="mh">{t.step3opt}</span></div>
            <div style={{marginTop:14}}>
              <div className="vlbl">{t.vibeLabel}</div>
              <div className="vr">
                {t.vibes.map((v)=>(
                  <button key={v} className={`vbtn${selectedVibe===v?" av":""}`} onClick={()=>setSelectedVibe(selectedVibe===v?"":v)}>{v}</button>
                ))}
              </div>
            </div>
          </div>

          {/* STEP 4 - Visual Options */}
          <div className="card">
            <div className="ct"><span className="sb tl">STEP 4</span>{t.step4}<span className="mh">{t.step4opt}</span></div>
            <div style={{marginTop:14}}>
              <div className="vlbl">{t.layoutLabel}</div>
              <div className="lr">
                {t.layouts.map((l,i)=>(
                  <button key={l} className={`lbtn${selectedLayout===i?" al":""}`} onClick={()=>setSelectedLayout(i)}>{l}</button>
                ))}
              </div>
            </div>
            <div style={{marginTop:16}}>
              <div className="vlbl">{t.colorLabel}</div>
              <input
                className="ci"
                type="text"
                placeholder={t.colorPlaceholder}
                value={clothingColors}
                onChange={(e)=>setClothingColors(e.target.value)}
              />
              <div className="chi">{t.colorHint}</div>
              {colorTags.length>0&&(
                <div className="ctags">{colorTags.map((c,i)=><span key={i} className="ctag">🎨 {c}</span>)}</div>
              )}
            </div>
          </div>

          {/* Name */}
          <div className="card">
            <label style={{fontSize:13,fontWeight:600,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:".5px",display:"block",marginBottom:10}}>
              👤 {t.nameLabel} <span style={{color:"rgba(255,255,255,.25)",fontWeight:400,textTransform:"none"}}>{t.nameSub}</span>
            </label>
            <input
              type="text"
              placeholder={t.namePlaceholder}
              value={userName}
              onChange={(e)=>{setUserName(e.target.value);setGenerated(false);}}
              style={{width:"100%",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:12,padding:"11px 16px",fontSize:14,color:"white",outline:"none",fontFamily:"Inter,sans-serif",transition:"border-color .3s"}}
            />
          </div>

          {/* Generate Button */}
          <button
            className="gbtn"
            disabled={selectedTypes.length===0}
            onClick={()=>setGenerated(true)}
          >
            {selectedTypes.length===0?t.generateDisabled:t.generateBtn(selectedTypes.length)}
          </button>

          {/* Prompts Output */}
          {generated&&selectedTypesData.length>0&&(
            <div className="fi2">
              <div style={{fontSize:13,fontWeight:600,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:".5px",marginBottom:14}}>
                {t.promptTitle(selectedTypesData.length)}
              </div>

              {/* Combined prompt block - shown when 2+ visual types selected */}
              {hasCombined&&(
                <div className="cpb">
                  <div className="cph">
                    <div>
                      <div className="ptl">✨ {t.combinedPromptLabel}</div>
                      <div className="cpn">{t.combinedNote}</div>
                    </div>
                    <button
                      className={`cbtn${copiedId==="combined"?" dn":""}`}
                      onClick={()=>handleCopy("combined",buildCombinedPrompt(
                        userName||"this person",
                        selectedVibe,
                        getLayoutDesc(),
                        getColors(),
                        selectedVisualTypes
                      ))}
                    >
                      {copiedId==="combined"?t.copiedBtn:t.copyBtn}
                    </button>
                  </div>
                  <div className="pt">
                    {buildCombinedPrompt(
                      userName||"this person",
                      selectedVibe,
                      getLayoutDesc(),
                      getColors(),
                      selectedVisualTypes
                    )}
                  </div>
                </div>
              )}

              {/* Individual prompt blocks */}
              {selectedTypesData.map((type)=>{
                const reportPrompt=type.reportPrompt(userName||"this person",selectedVibe);
                const visualPrompt=type.isVisual
                  ?type.visualPrompt(userName||"this person",selectedVibe,getLayoutDesc(),getColors())
                  :null;
                const tab=getTab(type.id);
                return(
                  <div key={type.id} className="pb">
                    <div className="ph">
                      <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                        <span className="ptl">{type.icon} {type.label}</span>
                        {type.isVisual&&(
                          <div className="ptabs">
                            <button className={`ptab${tab==="report"?" at":""}`} onClick={()=>setTab(type.id,"report")}>{t.tabReport}</button>
                            <button className={`ptab${tab==="visual"?" at":""}`} onClick={()=>setTab(type.id,"visual")}>{t.tabVisual}</button>
                          </div>
                        )}
                      </div>
                      <button
                        className={`cbtn${copiedId===type.id+tab?" dn":""}`}
                        onClick={()=>handleCopy(
                          type.id+tab,
                          tab==="visual"&&visualPrompt?visualPrompt:reportPrompt
                        )}
                      >
                        {copiedId===type.id+tab?t.copiedBtn:t.copyBtn}
                      </button>
                    </div>
                    <div className="pt">
                      {tab==="visual"&&visualPrompt?visualPrompt:reportPrompt}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* How to Use */}
          <div className="card">
            <div style={{fontSize:13,fontWeight:600,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:".5px",marginBottom:14}}>
              {t.howTitle}
            </div>
            <div className="hsteps">
              {t.howSteps.map((step,i)=>(
                <div key={i} className="hstep">
                  <div className="hnum">{i+1}</div>
                  <div className="htxt">
                    {i===3
                      ?(lang==="en"
                        ?<>Go to <a href="https://chat.openai.com" target="_blank" rel="noreferrer" className="hlnk">ChatGPT ↗</a> · Upload your photo · Paste the prompt · Get your report!</>
                        :lang==="zh"
                        ?<>前往 <a href="https://chat.openai.com" target="_blank" rel="noreferrer" className="hlnk">ChatGPT ↗</a> · 上传照片 · 粘贴提示词 · 获取你的专业报告！</>
                        :<><a href="https://chat.openai.com" target="_blank" rel="noreferrer" className="hlnk">ChatGPT ↗</a> へ · 写真をアップロード · プロンプトを貼り付け · レポートを取得！</>
                      )
                      :step
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>

        {/* FOOTER */}
        <footer>
          <div className="fi">
            <div className="ar">
              <div className="av">H</div>
              <div>
                <div className="an">Henry Wang</div>
                <div className="ab">{t.authorBio}</div>
              </div>
            </div>
            <div className="sr">
              <a href="https://www.youtube.com/@TubeUnderdeveloped" target="_blank" rel="noreferrer" className="sbn sy">▶ TubeUnderdeveloped</a>
              <a href="https://www.youtube.com/@DreamWeave_Animation" target="_blank" rel="noreferrer" className="sbn sy2">🎬 DreamWeave_Animation</a>
              <a href="https://www.buymeacoffee.com/tubeuchannel" target="_blank" rel="noreferrer" className="sbn scf">☕ Buy Me a Coffee</a>
            </div>
            <div className="dv"/>
            <div className="adb">
              <div className="adt">{t.adTitle}</div>
              <div className="ads">{t.adSub} <a href="mailto:zhhwang168@gmail.com" className="adl">zhhwang168@gmail.com</a></div>
            </div>
            <div className="cp">© {new Date().getFullYear()} Henry Wang · AI Style Analyzer v1.3.0</div>
          </div>
        </footer>

      </div>
    </>
  );
}
