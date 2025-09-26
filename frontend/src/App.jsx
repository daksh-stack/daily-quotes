import { useState, useEffect } from "react";
import Cursor from "./components/Cursor.jsx";
import Asteroids from "./components/Asteroids.jsx";

function App() {
  const [quote, setQuote] = useState(""); 
  const [author, setAuthor] = useState(""); 
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/quote");
      const data = await res.json();
      setQuote(data.content); 
      setAuthor(data.author); 
    } catch (err) {
      setQuote("Error fetching quote.");
      setAuthor("");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuote(); 
  }, []);

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-black p-4 overflow-hidden">
      <img
        src="/src/assets/solar-system.jpg"
        alt="Solar system background"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/70" />
      <Cursor />
      <Asteroids count={14} />
      <div className="z-10 relative max-w-xl w-full text-center">
        <div className="group relative rounded-3xl p-10 text-slate-100 bg-gradient-to-br from-indigo-900/60 via-slate-900/60 to-black/60 backdrop-blur-lg border border-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-transform duration-300 will-change-transform hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_30px_80px_-10px_rgba(0,0,0,0.85),0_0_30px_0_rgba(99,102,241,0.35)]">
          {/* Decorative sparkle circles */}
          
          <div className="absolute -top-2 -left-2 w-3 h-3 bg-indigo-300/80 rounded-full blur-[1px]"></div>
          <div className="absolute -bottom-3 right-6 w-2 h-2 bg-fuchsia-300/80 rounded-full blur-[1px]"></div>
          <div className="absolute top-6 -right-2 w-3 h-3 bg-sky-300/80 rounded-full blur-[1px]"></div>

          <h1 className="text-3xl font-extrabold mb-6 tracking-wide text-indigo-200 drop-shadow-[0_0_12px_rgba(129,140,248,0.6)]">✨ Daily Quote ✨</h1>

          {loading ? (
            <div className="flex justify-center items-center space-x-2 mb-6">
              <span className="w-4 h-4 bg-indigo-300 rounded-full animate-bounce-slow"></span>
              <span className="w-4 h-4 bg-fuchsia-300 rounded-full animate-bounce-delay"></span>
              <span className="w-4 h-4 bg-sky-300 rounded-full animate-bounce-slowest"></span>
            </div>
          ) : (
            <>
              <p className="text-2xl md:text-[26px] leading-relaxed italic mb-4 text-slate-100 drop-shadow-[0_0_10px_rgba(236,72,153,0.2)] [text-shadow:0_0_10px_rgba(56,189,248,0.25),0_0_20px_rgba(167,139,250,0.25)]">“{quote}”</p>
              <p className="text-lg font-semibold mb-8 text-indigo-200/90">— {author}</p>
            </>
          )}

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={fetchQuote}
              className="relative inline-flex items-center justify-center px-6 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-sky-500 text-white font-semibold shadow-[0_10px_30px_-10px_rgba(99,102,241,0.7)] hover:shadow-[0_20px_40px_-8px_rgba(168,85,247,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
            >
              <span className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              New Quote
            </button>

            <button
              onClick={() => {
                navigator.clipboard.writeText(`"{quote}" — {author}`);
                alert("Quote copied to clipboard!");
              }}
              className="relative inline-flex items-center justify-center px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-semibold shadow-[0_10px_30px_-10px_rgba(16,185,129,0.7)] hover:shadow-[0_20px_40px_-8px_rgba(34,211,238,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
            >
              <span className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              Copy Quote
            </button>

            <button
              onClick={() => {
                const tweetText = encodeURIComponent(`"${quote}" — ${author}`);
                window.open(
                  `https://twitter.com/intent/tweet?text=${tweetText}`,
                  "_blank"
                );
              }}
              className="relative inline-flex items-center justify-center px-6 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 text-white font-semibold shadow-[0_10px_30px_-10px_rgba(14,165,233,0.7)] hover:shadow-[0_20px_40px_-8px_rgba(236,72,153,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-sky-400/60"
            >
              <span className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              Tweet Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
