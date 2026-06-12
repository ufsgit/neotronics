import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

const logoUrl = 'https://via.placeholder.com/180x60?text=LOGO';
const lottieUrl = 'https://assets10.lottiefiles.com/packages/lf20_jcikwtux.json';

export default function GlassLogin() {
  const [darkMode, setDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [showPassword, setShowPassword] = useState(false);
  const [animationData, setAnimationData] = useState(null);

  useMemo(() => {
    fetch(lottieUrl).then((res) => res.json()).then(setAnimationData).catch(() => setAnimationData(null));
  }, []);

  const particles = useMemo(() => Array.from({ length: 10 }, (_, index) => ({
    left: `${8 + index * 9}%`,
    delay: `${index * 0.7}s`,
    size: `${6 + (index % 4) * 3}px`,
  })), []);

  return (
    <main className={`${darkMode ? 'dark' : ''}`}>
      <div className="relative min-h-screen overflow-hidden bg-slate-100 text-slate-950 transition-colors duration-500 dark:bg-slate-950 dark:text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.24),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.18),transparent_32%)]" />
        {particles.map((particle, index) => (
          <span key={index} className="pointer-events-none absolute bottom-[-40px] rounded-full bg-blue-400/20 blur-[1px] animate-[floatParticle_14s_linear_infinite]" style={{ left: particle.left, width: particle.size, height: particle.size, animationDelay: particle.delay }} />
        ))}

        <svg className="absolute bottom-0 left-0 h-40 w-[200%] animate-[waveMove_18s_linear_infinite] text-blue-500/10 dark:text-cyan-300/10" viewBox="0 0 1440 180" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,96L80,90.7C160,85,320,75,480,85.3C640,96,800,128,960,133.3C1120,139,1280,117,1360,106.7L1440,96L1440,180L0,180Z" />
        </svg>

        <section className="relative z-10 mx-auto grid min-h-screen max-w-6xl place-items-center px-5 py-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="grid w-full overflow-hidden rounded-2xl border border-white/40 bg-white/55 shadow-2xl shadow-slate-900/10 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/55 md:grid-cols-[0.9fr_1fr]">
            <aside className="hidden items-center justify-center border-r border-white/30 bg-white/30 p-10 dark:border-white/10 dark:bg-white/5 md:flex">
              {animationData && <Lottie animationData={animationData} loop className="max-w-sm" />}
            </aside>

            <div className="p-7 sm:p-10 lg:p-12">
              <div className="mb-8 flex justify-center">
                <img src={logoUrl} alt="Logo" className="h-[60px] w-[180px] rounded-lg object-cover shadow-sm" />
              </div>

              <div className="mb-8 flex items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Sign in to continue to your workspace.</p>
                </div>
                <button type="button" onClick={() => setDarkMode((value) => !value)} className="relative h-8 w-14 rounded-full bg-slate-300 p-1 transition dark:bg-blue-600" aria-label="Toggle theme">
                  <span className="block h-6 w-6 rounded-full bg-white shadow transition-transform dark:translate-x-6" />
                </button>
              </div>

              <form className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold">Username</span>
                  <input className="h-12 w-full rounded-xl border border-white/50 bg-white/65 px-4 outline-none transition hover:bg-white/80 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/15 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15" placeholder="Enter username" />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold">Password</span>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} className="h-12 w-full rounded-xl border border-white/50 bg-white/65 px-4 pr-12 outline-none transition hover:bg-white/80 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/15 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15" placeholder="Enter password" />
                    <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 dark:text-slate-300">{showPassword ? 'Hide' : 'Show'}</button>
                  </div>
                </label>

                <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-blue-600" />
                  Remember me
                </label>

                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} type="submit" className="group relative h-12 w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:shadow-blue-500/50">
                  <span className="absolute inset-0 opacity-0 blur-xl transition group-hover:opacity-100 bg-cyan-300/40" />
                  <span className="relative">Login</span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}

