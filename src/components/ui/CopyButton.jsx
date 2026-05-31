import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy } from 'lucide-react';

export function CopyButton({ value, label }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group flex items-center gap-2 text-left focus-ring rounded-lg p-1 -m-1"
      aria-label={`Copy ${label}`}
    >
      <span className="text-[13px] font-light text-[var(--text)] group-hover:text-[#2563EB] transition-colors truncate">
        {value}
      </span>
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="shrink-0"
          >
            <Check className="w-3.5 h-3.5 text-emerald-500" />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="shrink-0"
          >
            <Copy className="w-3.5 h-3.5 text-[var(--text-subtle)] opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
