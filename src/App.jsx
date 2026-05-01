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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Inter', sans-serif;
          background: #0f0a1e;
          min-height: 100vh;
        }

        .bg-animated {
          background: linear-gradient(135deg, #0f0a1e 0%, #1a0a2e 40%, #0d1a3a 100%);
          position: relative;
          overflow: hidden;
        }

        .bg-animated::before {
          content: '';
          position: fixed;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(ellipse at 20% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
                      radial-gradient(ellipse at 80% 80%, rgba(236, 72, 153, 0.12) 0%, transparent 50%),
                      radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.08) 0%, transparent 60%);
          animation: bgPulse 8s ease-in-out infinite alternate;
          pointer-events: none;
          z-index: 0;
        }

        @keyframes bgPulse {
          0% { transform: scale(1) rotate(0deg); opacity: 0.8; }
          100% { transform: scale(1.1) rotate(3deg); opacity: 1; }
        }

        .glass {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .glass:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(139, 92, 246, 0.3);
          box-shadow: 0 8px 32px rgba(139, 92, 246, 0.1);
        }

        .glass-header {
          background: rgba(15, 10, 30, 0.8);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .gradient-text {
          background: linear-gradient(135deg, #a78bfa, #f472b6, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gradient-btn {
          background: linear-gradient(135deg, #7c3aed, #a855f7, #ec4899);
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.4);
        }

        .gradient-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(139, 92, 246, 0.6);
        }

        .gradient-btn:active {
          transform: translateY(0);
        }

        .copied-btn {
          background: linear-gradient(135deg, #059669, #10b981);
          border: none;
          cursor: pointer;
          color: white;
          font-weight: 600;
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .type-btn {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 12px 16px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          transition: all 0.25s ease;
          text-align: left;
        }

        .type-btn:hover {
          background: rgba(139, 92, 246, 0.15);
          border-color: rgba(139, 92, 246, 0.4);
          color: white;
          transform: translateY(-1px);
        }

        .type-btn.active {
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.5), rgba(236, 72, 153, 0.3));
          border-color: rgba(167, 139, 250, 0.6);
          color: white;
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.25);
        }

        .upload-zone {
          background: rgba(255, 255, 255, 0.03);
          border: 2px dashed rgba(255, 255, 255, 0.12);
          border-radius: 20px;
          transition: all 0.3s ease;
          cursor: pointer;
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .upload-zone:hover, .upload-zone.drag-over {
          border-color: rgba(167, 139, 250, 0.6);
          background: rgba(139, 92, 246, 0.08);
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.15);
        }

        .input-field {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          padding: 12px 16px;
          font-size: 14px;
          color: white;
          outline: none;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
        }

        .input-field::placeholder { color: rgba(255,255,255,0.3); }

        .input-field:focus {
          border-color: rgba(167, 139, 250, 0.6);
          background: rgba(139, 92, 246, 0.08);
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15);
        }

        .prompt-box {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          padding: 16px;
          font-size: 14px;
          color: rgba(255,255,255,0.8);
          line-height: 1.7;
          min-height: 96px;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(139, 92, 246, 0.15);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 999px;
          padding: 4px 12px;
          font-size: 12px;
          color: rgba(167, 139, 250, 1);
        }

        .social-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .social-yt {
          background: rgba(220, 38, 38, 0.2);
          border: 1px solid rgba(220, 38, 38, 0.4);
          color: #fca5a5;
        }
        .social-yt:hover {
          background: rgba(220, 38, 38, 0.35);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
        }

        .social-yt2 {
          background: rgba(185, 28, 28, 0.2);
          border: 1px solid rgba(185, 28, 28, 0.4);
          color: #fca5a5;
        }
        .social-yt2:hover {
          background: rgba(185, 28, 28, 0.35);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(185, 28, 28, 0.3);
        }

        .social-coffee {
          background: rgba(234, 179, 8, 0.15);
          border: 1px solid rgba(234, 179, 8, 0.4);
          color: #fde047;
        }
        .social-coffee:hover {
          background: rgba(234, 179, 8, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(234, 179, 8, 0.3);
        }

        .ad-zone {
          border: 1px dashed rgba(255, 255, 255, 0.12);
          border-radius: 16px;
          padding: 20px;
          text-align: center;
          background: rgba(255,255,255,0.02);
          transition: all 0.3s ease;
        }
        .ad-zone:hover {
          border-color: rgba(167, 139, 250, 0.3);
          background: rgba(139, 92, 246, 0.05);
        }

        .step-num {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .avatar-ring {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 800;
          flex-shrink: 0;
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
        }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          margin: 24px 0;
        }

        .fade-in {
          animation: fadeIn 0.5s ease forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .visits-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px;
          padding: 6px 14px;
          font-size: 13px;
          color: rgba(255,255,255,0.5);
        }

        .glow-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #a78bfa;
          box-shadow: 0 0 8px #a78bfa;
          animation: blink 2s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>

      <div className="bg-animated" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>

        {/* HEADER */}
        <header className="glass-header" style={{ padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 32, filter: "drop-shadow(0 0 12px rgba(236,72,153,0.6))" }}>👗</div>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px" }} className="gradient-text">
                AI Style Analyzer
              </h1>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>Powered by ChatGPT Vision</p>
            </div>
          </div>
          <div className="visits-badge">
            <div className="glow-dot" />
            <span>{visitorCount !== null ? Number(visitorCount).toLocaleString() : "..."} visits</span>
          </div>
        </header>

        {/* MAIN */}
        <main style={{ flex: 1, maxWidth: 640, margin: "0 auto", width: "100%", padding: "32px 16px", display: "flex", flexDirection: "column", gap: 20, position: "relative", zIndex: 1 }}>

          {/* Hero Text */}
          <div style={{ textAlign: "center", padding: "8px 0 4px" }} className="fade-in">
            <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px", lineHeight: 1.3 }} className="gradient-text">
              Discover Your Style DNA
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginTop: 8 }}>
              Upload a photo · Get AI-powered fashion insights
            </p>
          </div>

          {/* Name Input */}
          <div className="glass" style={{ padding: 20 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              👤 Your Name <span style={{ color: "rgba(255,255,255,0.25)", fontWeight: 400 }}>(optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Sarah"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Image Upload */}
          <div
            className={`upload-zone${dragOver ? " drag-over" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById("fileInput").click()}
          >
            <input id="fileInput" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImage(e.target.files[0])} />
            {image ? (
              <div style={{ position: "relative", padding: 12 }}>
                <img src={image} alt="Uploaded" style={{ maxHeight: 260, borderRadius: 14, objectFit: "contain", display: "block", margin: "0 auto" }} />
                <div style={{ textAlign: "center", marginTop: 10 }}>
                  <span className="badge">✅ Photo ready · click to change</span>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: 32 }}>
                <div style={{ fontSize: 52, marginBottom: 12, filter: "drop-shadow(0 0 16px rgba(167,139,250,0.5))" }}>📸</div>
                <p style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: 15 }}>Click or drag & drop your photo</p>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, marginTop: 6 }}>JPG · PNG · WEBP supported</p>
              </div>
            )}
          </div>

          {/* Analysis Type */}
          <div className="glass" style={{ padding: 20 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              🔍 Analysis Type
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {ANALYSIS_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setAnalysisType(type)}
                  className={`type-btn${analysisType.id === type.id ? " active" : ""}`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generated Prompt */}
          <div className="glass" style={{ padding: 20 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              📝 Generated Prompt
            </label>
            <div className="prompt-box">{generatedPrompt}</div>
            <button
              onClick={handleCopy}
              className={copied ? "copied-btn" : "gradient-btn"}
              style={{ marginTop: 12, width: "100%", padding: "13px", borderRadius: 14, fontSize: 14 }}
            >
              {copied ? "✅ Copied to clipboard!" : "📋 Copy Prompt"}
            </button>
          </div>

          {/* How to Use */}
          <div className="glass" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.5px" }}>🚀 How to Use</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Upload your outfit photo above",
                "Choose an analysis type",
                "Copy the generated prompt",
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div className="step-num">{i + 1}</div>
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>{step}</span>
                </div>
              ))}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div className="step-num">4</div>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>
                  Go to{" "}
                  <a href="https://chat.openai.com" target="_blank" rel="noreferrer" style={{ color: "#a78bfa", textDecoration: "none", fontWeight: 600 }}>
                    ChatGPT ↗
                  </a>
                  {" "}and upload your photo + paste the prompt
                </span>
              </div>
            </div>
          </div>
        </main>

        {/* FOOTER */}
        <footer style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 24px", marginTop: 16, position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>

            {/* Author */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div className="avatar-ring">H</div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 16, color: "white" }}>Henry Wang</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 3 }}>
                  AI enthusiast & content creator. Helping you look your best with AI!
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
              <a href="https://www.youtube.com/@TubeUnderdeveloped" target="_blank" rel="noreferrer" className="social-btn social-yt">
                ▶ TubeUnderdeveloped
              </a>
              <a href="https://www.youtube.com/@DreamWeaveAnimation" target="_blank" rel="noreferrer" className="social-btn social-yt2">
                🎬 DreamWeave Animation
              </a>
              <a href="https://www.buymeacoffee.com/tubeuchannel" target="_blank" rel="noreferrer" className="social-btn social-coffee">
                ☕ Buy Me a Coffee
              </a>
            </div>

            <div className="divider" />

            {/* Ad Zone */}
            <div className="ad-zone" style={{ marginBottom: 20 }}>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: 600 }}>📢 Advertise Here</p>
              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, marginTop: 6 }}>
                Reach AI & fashion enthusiasts ·{" "}
                <a href="mailto:zhhwang168@gmail.com" style={{ color: "#a78bfa", textDecoration: "none" }}>
                  zhhwang168@gmail.com
                </a>
              </p>
            </div>

            {/* Copyright */}
            <p style={{ textAlign: "center", color: "rgba(255,255,255,0.15)", fontSize: 12 }}>
              © {new Date().getFullYear()} Henry Wang · AI Style Analyzer
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}