import { useState, useEffect } from "react";

const ANALYSIS_TYPES = [
  {
    id: "style",
    label: "👗 Style Analysis",
    prompt: (name) =>
      `Please analyze the fashion style in this photo for ${name}. Describe the overall aesthetic, key clothing pieces, color palette, and style category (e.g., casual, formal, streetwear, minimalist, etc.). Then suggest 3 ways to enhance or evolve this look.`,
  },
  {
    id: "color",
    label: "🎨 Color Palette",
    prompt: (name) =>
      `Analyze the color palette worn by ${name} in this photo. Identify the dominant colors, accent colors, and how well they complement each other. Suggest a personal color season (Spring/Summer/Autumn/Winter) and recommend 5 colors that would suit this person best.`,
  },
  {
    id: "occasion",
    label: "📅 Occasion Matcher",
    prompt: (name) =>
      `Based on the outfit ${name} is wearing in this photo, identify what occasions this look is best suited for. Then suggest 3 alternative outfits for: 1) a casual day out, 2) a professional setting, and 3) a special evening event — all matching this person's apparent style.`,
  },
  {
    id: "body",
    label: "✨ Body Type Styling",
    prompt: (name) =>
      `Analyze how the clothing in this photo flatters ${name}'s body type. Identify the body shape, explain what current outfit elements work well, and suggest 5 specific styling tips and clothing choices that would best complement this body type.`,
  },
];

export default function App() {
  const [image, setImage] = useState(null);
  const [analysisType, setAnalysisType] = useState(ANALYSIS_TYPES[0]);
  const [userName, setUserName] = useState("");
  const [copied, setCopied] = useState(false);
  const [visitorCount, setVisitorCount] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  // 访问计数器
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

  const generatedPrompt = analysisType.prompt(userName || "this person");

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* ===== HEADER ===== */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">👗</span>
          <div>
            <h1 className="text-xl font-bold text-white">AI Style Analyzer</h1>
            <p className="text-xs text-gray-400">Powered by ChatGPT Vision</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>👁️</span>
          <span>{visitorCount !== null ? visitorCount.toLocaleString() : "..."} visits</span>
        </div>
      </header>

      {/* ===== MAIN ===== */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 flex flex-col gap-6">

        {/* Name Input */}
        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            👤 Your Name (optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Sarah"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 text-sm outline-none border border-gray-700 focus:border-purple-500 transition"
          />
        </div>

        {/* Image Upload */}
        <div
          className={`bg-gray-900 rounded-2xl border-2 border-dashed transition cursor-pointer ${
            dragOver ? "border-purple-400 bg-gray-800" : "border-gray-700"
          } flex flex-col items-center justify-center p-6 min-h-48`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput").click()}
        >
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImage(e.target.files[0])}
          />
          {image ? (
            <img
              src={image}
              alt="Uploaded"
              className="max-h-64 rounded-xl object-contain"
            />
          ) : (
            <div className="text-center">
              <div className="text-5xl mb-3">📸</div>
              <p className="text-gray-300 font-medium">Click or drag & drop your photo</p>
              <p className="text-gray-500 text-sm mt-1">JPG, PNG, WEBP supported</p>
            </div>
          )}
        </div>

        {/* Analysis Type */}
        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <label className="block text-sm font-semibold text-gray-300 mb-3">
            🔍 Analysis Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            {ANALYSIS_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setAnalysisType(type)}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition text-left ${
                  analysisType.id === type.id
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Generated Prompt */}
        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <label className="block text-sm font-semibold text-gray-300 mb-3">
            📝 Generated Prompt
          </label>
          <div className="bg-gray-800 rounded-xl p-4 text-sm text-gray-200 leading-relaxed min-h-24">
            {generatedPrompt}
          </div>
          <button
            onClick={handleCopy}
            className={`mt-3 w-full py-3 rounded-xl font-semibold text-sm transition ${
              copied
                ? "bg-green-600 text-white"
                : "bg-purple-600 hover:bg-purple-500 text-white"
            }`}
          >
            {copied ? "✅ Copied!" : "📋 Copy Prompt"}
          </button>
        </div>

        {/* How to Use */}
        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">🚀 How to Use</h3>
          <ol className="text-sm text-gray-400 space-y-2 list-decimal list-inside">
            <li>Upload your outfit photo above</li>
            <li>Choose an analysis type</li>
            <li>Copy the generated prompt</li>
            <li>
              Go to{" "}
              <a
                href="https://chat.openai.com"
                target="_blank"
                rel="noreferrer"
                className="text-purple-400 underline"
              >
                ChatGPT
              </a>{" "}
              and upload your photo + paste the prompt
            </li>
          </ol>
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-900 border-t border-gray-800 px-6 py-8 mt-4">
        <div className="max-w-2xl mx-auto">

          {/* Author Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-purple-700 flex items-center justify-center text-xl font-bold">
              H
            </div>
            <div>
              <p className="font-semibold text-white">Henry Wang</p>
              <p className="text-sm text-gray-400">
                AI enthusiast & content creator. Helping you look your best with AI!
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-3 mb-6">
            <a
              href="https://www.youtube.com/@TubeUnderdeveloped"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-red-700 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-full transition"
            >
              ▶ TubeUnderdeveloped
            </a>
            <a
              href="https://www.youtube.com/@DreamWeaveAnimation"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-red-800 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-full transition"
            >
              🎬 DreamWeave Animation
            </a>
            <a
              href="https://www.buymeacoffee.com/tubeuchannel"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black text-sm px-4 py-2 rounded-full transition font-semibold"
            >
              ☕ Buy Me a Coffee
            </a>
          </div>

          {/* Ad Banner */}
          <div className="border border-dashed border-gray-600 rounded-xl p-4 text-center mb-4">
            <p className="text-gray-400 text-sm">📢 Advertise Here</p>
            <p className="text-gray-500 text-xs mt-1">
              Interested in reaching AI & fashion enthusiasts?{" "}
              <a
                href="mailto:zhhwang168@gmail.com"
                className="text-purple-400 underline"
              >
                zhhwang168@gmail.com
              </a>
            </p>
          </div>

          {/* Copyright */}
          <p className="text-center text-gray-600 text-xs">
            © {new Date().getFullYear()} Henry Wang · AI Style Analyzer
          </p>
        </div>
      </footer>
    </div>
  );
}