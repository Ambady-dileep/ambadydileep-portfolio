import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, PhoneCall, Send, Check, Copy } from 'lucide-react';
import { siteConfig } from '../../data/site';
import { WhatsAppIcon } from '../ui/BrandIcons';
import { GravityStarsBackground } from '../ui/GravityStarsBackground';
import { buildPortfolioGmailUrl, buildPortfolioWhatsAppUrl } from '../../utils/contactLinks';
import { sendContactEmail, isEmailJsConfigured } from '../../utils/contactEmail';
import { viewportOnce } from '../../utils/motion';

const sectionReveal = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.05,
    },
  },
};

const itemReveal = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

function CopyButton({ value, label }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="p-1 rounded-md text-[var(--text-subtle)] hover:text-[var(--text)] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors focus:outline-none"
      aria-label={`Copy ${label}`}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span key="ok" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
            <Check className="w-3 h-3 text-emerald-500" />
          </motion.span>
        ) : (
          <motion.span key="copy" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
            <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setStatus('sending');

    try {
      if (!isEmailJsConfigured()) {
        throw new Error(
          'Email delivery is not configured. Add EmailJS keys to your .env file.'
        );
      }

      await sendContactEmail(form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
  console.error('EmailJS Error:', err);

  setStatus('error');
  setErrorMsg(
    err?.text ||
    err?.message ||
    'Something went wrong. Please try again.'
  );
}
  };

  return (
    <section id="contact" className="relative py-12 md:py-16 overflow-hidden flex items-center justify-center min-h-[calc(100vh-80px)]">
      <GravityStarsBackground
        starsCount={25}
        starsSize={1.0}
        starsOpacity={0.1}
        glowIntensity={3}
        movementSpeed={0.04}
        mouseInfluence={30}
        gravityStrength={20}
        glowAnimation="ease"
        className="pointer-events-none opacity-40 dark:opacity-35"
      />

      <div className="section-container relative z-10 w-full max-w-[480px] px-4">
        <motion.div
          className="w-full flex flex-col gap-5"
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Header */}
          <motion.div variants={itemReveal} className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text)]">
              Let&apos;s Build Something Meaningful
            </h2>
            <p className="mt-2 text-xs text-[var(--text-muted)] font-light leading-relaxed">
              Open to conversations about products, development, collaborations, and ideas worth building.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <motion.div 
            variants={itemReveal} 
            className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full"
          >
            {/* Call card */}
            <motion.div 
              whileHover={{ y: -2, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="relative group p-3 flex flex-col items-center justify-center text-center rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.005] dark:bg-white/[0.005] hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors min-h-[84px] col-span-1"
            >
              <a href={`tel:${siteConfig.phoneCopy}`} className="absolute inset-0 z-10" aria-label="Call Directly" />
              
              <PhoneCall className="w-4.5 h-4.5 text-[var(--text)] mb-1 shrink-0" strokeWidth={1.5} />
              <span className="text-xs font-medium text-[var(--text)]">Call Directly</span>
              <span className="text-[10px] text-[var(--text-subtle)] mt-0.5 font-normal">{siteConfig.phone}</span>
              
              <div className="absolute top-1 right-1 z-20">
                <CopyButton value={siteConfig.phone} label="phone number" />
              </div>
            </motion.div>

            {/* WhatsApp card */}
            <motion.div 
              whileHover={{ y: -2, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="relative group p-3 flex flex-col items-center justify-center text-center rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.005] dark:bg-white/[0.005] hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors min-h-[84px] col-span-1"
            >
              <a 
                href={buildPortfolioWhatsAppUrl()} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="absolute inset-0 z-10" 
                aria-label="Message on WhatsApp" 
              />
              
              <WhatsAppIcon className="w-4.5 h-4.5 text-emerald-600/70 dark:text-emerald-500/70 mb-1 shrink-0" />
              <div className="flex items-center gap-0.5">
                <span className="text-xs font-medium text-[var(--text)]">WhatsApp</span>
                <span className="text-[var(--text-subtle)] text-[10px] transform transition-transform duration-200 group-hover:translate-x-0.5 font-normal">→</span>
              </div>
              <span className="text-[10px] text-[var(--text-subtle)] mt-0.5 font-normal">Quick Conversation</span>
            </motion.div>

            {/* Email card */}
            <motion.div 
              whileHover={{ y: -2, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="relative group p-3 flex flex-col items-center justify-center text-center rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.005] dark:bg-white/[0.005] hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors min-h-[84px] col-span-2 sm:col-span-1"
            >
              <a 
                href={buildPortfolioGmailUrl()} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="absolute inset-0 z-10" 
                aria-label="Send an Email" 
              />
              
              <Mail className="w-4.5 h-4.5 text-slate-500/60 dark:text-slate-400/60 mb-1 shrink-0" strokeWidth={1.5} />
              <div className="flex items-center gap-0.5">
                <span className="text-xs font-medium text-[var(--text)]">Email</span>
                <span className="text-[var(--text-subtle)] text-[10px] transform transition-transform duration-200 group-hover:translate-x-0.5 font-normal">→</span>
              </div>
              <span className="text-[10px] text-[var(--text-subtle)] mt-0.5 font-normal">Professional Inquiries</span>
              
              <div className="absolute top-1 right-1 z-20">
                <CopyButton value={siteConfig.email} label="email address" />
              </div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div variants={itemReveal} className="w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
              {/* Name */}
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-[10px] font-medium tracking-wider text-[var(--text-subtle)] uppercase">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full h-10 px-3 rounded-xl bg-black/[0.015] dark:bg-white/[0.015] border border-black/10 dark:border-white/10 text-xs sm:text-sm text-[var(--text)] placeholder:text-[var(--text-subtle)]/40 focus:outline-none focus:border-black/25 dark:focus:border-white/25 transition-colors"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-[10px] font-medium tracking-wider text-[var(--text-subtle)] uppercase">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full h-10 px-3 rounded-xl bg-black/[0.015] dark:bg-white/[0.015] border border-black/10 dark:border-white/10 text-xs sm:text-sm text-[var(--text)] placeholder:text-[var(--text-subtle)]/40 focus:outline-none focus:border-black/25 dark:focus:border-white/25 transition-colors"
                  placeholder="Your email address"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1">
                <label htmlFor="message" className="text-[10px] font-medium tracking-wider text-[var(--text-subtle)] uppercase">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full h-20 px-3 py-2 rounded-xl bg-black/[0.015] dark:bg-white/[0.015] border border-black/10 dark:border-white/10 text-xs sm:text-sm text-[var(--text)] placeholder:text-[var(--text-subtle)]/40 focus:outline-none focus:border-black/25 dark:focus:border-white/25 transition-colors resize-none"
                  placeholder="Describe your project, inquiry, or idea..."
                />
              </div>

              {/* Submit Button */}
              <div className="mt-1">
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-10 rounded-xl bg-[#0a0a0a] text-white hover:bg-black/90 dark:bg-white dark:text-[#0a0a0a] dark:hover:bg-white/90 text-xs sm:text-sm font-medium tracking-wide flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                  <Send className="w-3.5 h-3.5" strokeWidth={1.5} />
                </motion.button>
              </div>

              {/* Feedback messages */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="p-2.5 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-2"
                  >
                    <Check className="w-4 h-4 shrink-0" strokeWidth={2} />
                    <span>Message sent successfully. I will get back to you soon.</span>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="p-2.5 rounded-xl bg-red-500/[0.08] border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium"
                  >
                    {errorMsg}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
