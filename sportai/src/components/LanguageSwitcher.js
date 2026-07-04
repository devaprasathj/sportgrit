import { useState } from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const getLabel = () => {
    if (language === "en") return "English";
    if (language === "hi") return "Hindi";
    if (language === "ta") return "Tamil";
  };

  return (
    <div className="relative">
      {/* Pill Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-full 
                   border border-gray-300 
                   bg-white/10 backdrop-blur-md 
                   text-white hover:bg-white/20 
                   transition shadow-sm"
      >
        <Globe className="w-4 h-4 text-green-400" />
        <span className="text-sm font-medium">{getLabel()}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-36 
                        bg-[#1e293b] border border-gray-600 
                        rounded-lg shadow-lg overflow-hidden">
          {["en", "hi", "ta"].map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setLanguage(lang);
                setOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 text-sm 
                          hover:bg-cyan-500/20 transition 
                          ${
                            language === lang
                              ? "text-cyan-400"
                              : "text-white"
                          }`}
            >
              {lang === "en"
                ? "English"
                : lang === "hi"
                ? "Hindi"
                : "Tamil"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
