import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState, useRef } from "react";
import { Send, Paperclip, Smile, Loader2, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import ReactMarkdown from "react-markdown";

const quickActions = [
  { id: "record", key: "chatbot.quick1" },
  { id: "score", key: "chatbot.quick2" },
  { id: "profile", key: "chatbot.quick3" },
];

export default function SportChatBot() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, from: "bot", text: t("chatbot.hello") },
  ]);
  const [tone, setTone] = useState(() => {
    try {
      return localStorage.getItem("chatbot_tone") || "friendly";
    } catch (e) {
      return "friendly";
    }
  });

  const scrollRef = useRef(null);
  const apiBaseUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle API communication
  const requestBotReply = async (message, tonePref) => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // include user's tone preference so a capable backend LLM can adapt
        body: JSON.stringify({ message, tone: tonePref || tone }),
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();
      return data?.reply || t("chatbot.error");
    } catch (error) {
      console.error("Chat Error:", error);
      return "Sorry, I'm having trouble connecting to the SportGrit servers.";
    }
  };

  // Lightweight suggestion generator to produce follow-up questions
  const generateSuggestions = (userText, botText) => {
    const stop = new Set([
      "the","and","is","in","to","a","of","for","on","with","i","you","it","my","me","that","this",
    ]);
    const words = (userText || botText || "").toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/);
    const keywords = [];
    for (const w of words) {
      if (!w || stop.has(w)) continue;
      if (!keywords.includes(w)) keywords.push(w);
      if (keywords.length >= 3) break;
    }

    const base = keywords[0] || (userText || botText || "this").split(" ")[0];
    const suggestions = [];
    if (base) suggestions.push(`Tell me more about ${base}`);
    if (keywords[1]) suggestions.push(`How can I improve my ${keywords[1]}?`);
    suggestions.push(`Do you have tips related to ${base}?`);
    return suggestions.slice(0, 3);
  };

  const handleSendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    // Add user message
    const userMsg = { id: Date.now(), from: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setShowEmoji(false);
    setIsLoading(true);

    // Add temporary bot placeholder
    const pendingId = "pending-" + Date.now();
    setMessages((prev) => [
      ...prev,
      { id: pendingId, from: "bot", text: "", pending: true },
    ]);

    // Fetch and update
    const reply = await requestBotReply(text, tone);
    const suggestions = generateSuggestions(text, reply);
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === pendingId
          ? { ...msg, text: reply, pending: false, suggestions }
          : msg
      )
    );
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  const handleQuick = (id) => {
    const quickText = t(quickActions.find((q) => q.id === id)?.key || "");
    handleSendMessage(quickText);
  };

  const emojis = ['😊', '👍', '🎉', '🏆', '⚽', '🏀', '🎾', '🏃', '🤸', '💪'];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34, 211, 238, 0.4)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-2xl text-2xl"
      >
        {open ? <X className="text-white" /> : "🏃"}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] sm:w-96 md:w-[500px] h-[600px] bg-slate-900 border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-cyan-500/20 bg-slate-800/40 flex justify-between items-center">
              <div>
                <h3 className="text-cyan-100 font-bold text-sm uppercase tracking-wider">{t("chatbot.title")}</h3>
                <p className="text-[10px] text-cyan-400 uppercase tracking-widest animate-pulse">System Active</p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={tone}
                  onChange={(e) => {
                    setTone(e.target.value);
                    try { localStorage.setItem("chatbot_tone", e.target.value); } catch {}
                  }}
                  className="text-xs bg-slate-800 border border-cyan-500/20 text-cyan-200 px-2 py-1 rounded"
                >
                  <option value="friendly">Friendly</option>
                  <option value="concise">Concise</option>
                  <option value="detailed">Detailed</option>
                </select>
                <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyan-500/20"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.from === "user" 
                      ? "bg-cyan-600 text-white rounded-tr-none shadow-lg shadow-cyan-900/20" 
                      : "bg-slate-800 text-cyan-50 border border-cyan-500/10 rounded-tl-none"
                  }`}>
                    {msg.pending ? (
                      <div className="flex items-center gap-2 text-cyan-400 py-1">
                        <Loader2 className="animate-spin" size={16} />
                        <span className="text-xs italic tracking-tight">SportGrit is thinking...</span>
                      </div>
                    ) : (
                      <>
                        <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-strong:text-cyan-300">
                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </div>

                        {/* Suggestions (click to ask) */}
                        {msg.suggestions && msg.suggestions.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {msg.suggestions.map((s, i) => (
                              <button
                                key={i}
                                onClick={() => handleSendMessage(s)}
                                className="text-xs px-3 py-1 rounded-full bg-cyan-700/20 border border-cyan-500/20 text-cyan-200 hover:bg-cyan-500/20 transition"
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar border-t border-cyan-500/5 bg-slate-900/50">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleQuick(action.id)}
                  className="whitespace-nowrap text-[10px] uppercase font-bold px-3 py-1.5 rounded-full border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 transition-colors"
                >
                  {t(action.key)}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-4 bg-slate-800/20">
              {showEmoji && (
                <div className="mb-2 grid grid-cols-5 gap-2 p-2 bg-slate-800 rounded-lg border border-cyan-500/20">
                  {emojis.map((e) => (
                    <button key={e} type="button" onClick={() => setInput(prev => prev + e)} className="text-xl hover:scale-125 transition-transform">{e}</button>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-2 bg-slate-900 border border-cyan-500/40 rounded-xl px-3 py-2 focus-within:border-cyan-400 transition-colors">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t("chatbot.inputPlaceholder")}
                  className="flex-1 bg-transparent text-white outline-none text-sm placeholder:text-slate-600"
                  disabled={isLoading}
                />
                <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="text-slate-500 hover:text-cyan-400 transition-colors">
                  <Smile size={20} />
                </button>
                <button type="submit" disabled={isLoading || !input.trim()} className="disabled:opacity-20">
                  <Send size={20} className="text-cyan-400" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}