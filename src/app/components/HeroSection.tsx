'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'motion/react';
import { useScrollRevealMode } from '@/lib/hooks/useScrollRevealMode';
import { HERO_TEAM_MEMBERS } from '@/lib/constants/heroTeam';
import {
  ArrowUpRight, BarChart2, TrendingUp, DollarSign, Users, Truck,
  LayoutDashboard, Target, Zap, Clock, ShieldCheck,
  CheckCircle, RefreshCw, User2
} from 'lucide-react';

const SURFACE =
  'bg-black/40 backdrop-blur-sm rounded-md sm:rounded-lg lg:rounded-xl shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_8px_24px_rgba(0,0,0,0.25)]';
const INNER_SURFACE =
  'rounded-sm bg-white/5 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset]';

/** Hide on mobile — avoids partial clipping inside the fixed-height dashboard shell */
const DESKTOP_ONLY = 'max-sm:hidden';

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, duration: 0.3, bounce: 0 },
  },
};

const viewExit = { opacity: 0, y: -8, transition: { duration: 0.15, ease: 'easeIn' as const } };

const HeroEntranceContext = createContext(false);

function useHeroEntrance() {
  const skipEntrance = useContext(HeroEntranceContext);
  return {
    initial: skipEntrance ? ('visible' as const) : ('hidden' as const),
    animate: 'visible' as const,
  };
};

const componentStyles = `
  @keyframes shine {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .shine-border::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(110deg, transparent 20%, rgba(14, 165, 233, 0.8), rgba(56, 189, 248, 1), rgba(125, 211, 252, 0.9), transparent 80%);
    background-size: 300% 100%;
    animation: shine 6s ease-in-out infinite;
    opacity: 0.9;
    border-radius: 0 0 2px 2px;
    box-shadow: 
      0 0 10px rgba(56, 189, 248, 0.5),
      0 0 20px rgba(56, 189, 248, 0.3),
      0 0 30px rgba(56, 189, 248, 0.1);
    filter: blur(0.5px);
  }
  .shine-border::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(110deg, transparent 25%, rgba(255, 255, 255, 0.9), rgba(56, 189, 248, 1), rgba(255, 255, 255, 0.9), transparent 75%);
    background-size: 200% 100%;
    animation: shine 6s ease-in-out infinite;
    opacity: 1;
    border-radius: 0 0 1px 1px;
  }
`;

const PHRASES = [
  "Software Solutions",
  "Blockchain Apps",
  "Fintech",
  "AI Integrations",
  "A/B Startups",
  "Smart Automation",
];
type Props = { phrases: string[]; interval?: number };

export function HeroHeadline({ phrases, interval = 2500 }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (phrases.length <= 1) return;
    const id = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % phrases.length);
    }, interval);
    return () => clearTimeout(id);
  }, [phrases, interval, currentIndex]);

  return (
    <div className="text-center pt-10 sm:pt-24 h-auto md:pt-32 mb-3 sm:mb-6 lg:mb-8">
      <h1 className="text-fluid-display font-bold bg-clip-text text-transparent bg-linear-to-b from-white to-white/80 text-balance">
        Your Strategic Partner in
      </h1>
      <div className="relative h-12 sm:h-20 md:h-24 flex items-center justify-center overflow-hidden">
        <h1
          key={phrases[currentIndex]}
          className="text-fluid-display font-bold bg-clip-text text-transparent bg-linear-to-b from-white to-white/80 absolute animate-fade text-balance"
        >
          <span className="text-sky-400">{phrases[currentIndex]}</span>
        </h1>
      </div>
    </div>
  );
}

/* ─── Types ───────────────────────────────────────────────────────── */

type ViewId = 'welcome' | 'analytics' | 'finance' | 'team' | 'operations';

const VIEW_CONFIG: Record<ViewId, { icon: React.ElementType; label: string }> = {
  welcome: { icon: LayoutDashboard, label: 'Welcome' },
  analytics: { icon: TrendingUp, label: 'Analytics' },
  finance: { icon: DollarSign, label: 'Finance' },
  team: { icon: Users, label: 'Team' },
  operations: { icon: Truck, label: 'Operations' },
};

const iconSpring = { type: 'spring' as const, duration: 0.3, bounce: 0 };

const ActiveViewIcon = ({ view }: { view: ViewId }) => {
  const Icon = VIEW_CONFIG[view].icon;

  return (
    <div className="relative w-full h-full" aria-hidden>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={view}
          initial={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
          transition={iconSpring}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400" strokeWidth={2} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* ─── Sidebar ─────────────────────────────────────────────────────── */

const Sidebar = ({ activeView, onViewChange }: { activeView: ViewId; onViewChange: (v: ViewId) => void }) => {
  const navItems = (Object.entries(VIEW_CONFIG) as [ViewId, (typeof VIEW_CONFIG)[ViewId]][]).map(
    ([view, { icon, label }]) => ({ icon, tooltip: label, view })
  );

  return (
    <aside className="w-12 sm:w-14 lg:w-16 bg-black/30 backdrop-blur-sm shrink-0 flex flex-col items-center py-2 sm:py-4 gap-2 sm:gap-3 lg:gap-4 shadow-[1px_0_0_rgba(255,255,255,0.06)]">
      <div
        className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 mb-2 sm:mb-3 lg:mb-4 rounded-lg lg:rounded-xl bg-sky-500/15 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset] flex items-center justify-center"
        aria-hidden
      >
        <ActiveViewIcon view={activeView} />
      </div>
      <div className="flex flex-col gap-1 sm:gap-2">
        {navItems.map((item) => (
          <button
            key={item.view}
            type="button"
            title={item.tooltip}
            aria-label={item.tooltip}
            aria-current={activeView === item.view ? 'page' : undefined}
            onClick={() => onViewChange(item.view)}
            className={`relative w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 flex items-center justify-center rounded-md lg:rounded-lg cursor-pointer transition-[transform,background-color,color] active:scale-[0.96] before:absolute before:inset-[-4px] before:content-[''] ${
              activeView === item.view ? 'bg-sky-500/20 text-sky-400' : 'text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <item.icon size={16} className="sm:w-5 sm:h-5 lg:w-5 lg:h-5" />
            {activeView === item.view && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 sm:w-1 h-4 sm:h-5 lg:h-6 bg-sky-400 rounded-r-full" />}
          </button>
        ))}
      </div>
    </aside>
  );
};

/* ─── Shared Components ───────────────────────────────────────────── */

const DashboardCard = ({ title, icon: Icon, children, className = '' }: { title: string, icon: React.ElementType, children: React.ReactNode, className?: string }) => (
  <motion.div
    variants={staggerItem}
    className={`dashboard-item ${SURFACE} p-1.5 sm:p-3 lg:p-4 flex flex-col ${className}`}
  >
    <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2 lg:mb-3">
      <Icon className="text-sky-400 w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
      <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-white truncate text-balance">{title}</h3>
    </div>
    {children}
  </motion.div>
);

const StatCardContent = ({ value, label, trend, trendColor = 'text-sky-400' }: { value: string, label: string, trend: string, trendColor?: string }) => (
  <div className="mt-auto">
    <p className="text-gray-400 text-xs text-pretty">{label}</p>
    <p className="text-base sm:text-xl lg:text-2xl font-bold text-white flex items-baseline gap-1 tabular-nums">
      <span>{value}</span>
      <span className={`text-xs sm:text-sm font-semibold ${trendColor}`}>{trend}</span>
    </p>
  </div>
);

/* ─── Welcome Dashboard (original) ───────────────────────────────── */

const WelcomeDashboard = () => {
  const { initial, animate } = useHeroEntrance();

  return (
  <motion.div
    className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-3 lg:gap-4"
    variants={staggerContainer}
    initial={initial}
    animate={animate}
  >
    <DashboardCard title="Performance" icon={BarChart2}>
      <StatCardContent value="€1.25M" label="Total Revenue" trend="+1.8%" />
    </DashboardCard>
    <DashboardCard title="Growth" icon={TrendingUp}>
      <StatCardContent value="1,420" label="New Users (MoM)" trend="+12%" />
    </DashboardCard>
    <DashboardCard title="Income" icon={DollarSign}>
      <StatCardContent value="€85K" label="Monthly Recurring" trend="+4.5%" />
    </DashboardCard>
    <DashboardCard title="Leads" icon={Target}>
      <StatCardContent value="86%" label="Conversion Rate" trend="-0.5%" trendColor="text-gray-400" />
    </DashboardCard>
    <DashboardCard title="Operations" icon={Truck} className={`col-span-2 lg:col-span-2 ${DESKTOP_ONLY}`}>
      <div className="grid grid-cols-3 gap-1 sm:gap-2 lg:gap-4 text-center mt-auto">
        <div>
          <p className="text-sm sm:text-lg lg:text-2xl font-bold text-sky-400 tabular-nums">99.98%</p>
          <p className="text-xs text-gray-400">Uptime</p>
        </div>
        <div>
          <p className="text-sm sm:text-lg lg:text-2xl font-bold text-white tabular-nums">82ms</p>
          <p className="text-xs text-gray-400">Response</p>
        </div>
        <div>
          <p className="text-sm sm:text-lg lg:text-2xl font-bold text-yellow-400 tabular-nums">3</p>
          <p className="text-xs text-gray-400">Alerts</p>
        </div>
      </div>
    </DashboardCard>
    <DashboardCard title="Status" icon={Zap} className={`col-span-2 lg:col-span-1 ${DESKTOP_ONLY}`}>
      <div className="flex items-center gap-2 sm:gap-3 mt-auto">
        <ShieldCheck size={18} className="text-sky-400 sm:w-6 sm:h-6 shrink-0" />
        <p className="text-xs sm:text-sm lg:text-base font-semibold text-white text-pretty leading-snug">
          All Systems Operational
        </p>
      </div>
    </DashboardCard>
    <DashboardCard title="Transactions" icon={Clock} className={`col-span-2 lg:col-span-1 ${DESKTOP_ONLY}`}>
      <div className="space-y-1 sm:space-y-1.5 text-xs mt-auto">
        <div className={`grid grid-cols-3 items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 ${INNER_SURFACE}`}>
          <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
            <CheckCircle size={10} className="text-sky-400 shrink-0" />
            <span className="text-white truncate">Deposit</span>
          </div>
          <span className="text-white text-right tabular-nums">€2,500</span>
          <span className="text-sky-400 text-right">Complete</span>
        </div>
        <div className={`grid grid-cols-3 items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 ${INNER_SURFACE}`}>
          <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
            <RefreshCw size={10} className="text-yellow-400 shrink-0" />
            <span className="text-white truncate">Withdrawal</span>
          </div>
          <span className="text-white text-right tabular-nums">€550</span>
          <span className="text-yellow-400 text-right">Pending</span>
        </div>
      </div>
    </DashboardCard>
  </motion.div>
  );
};

const HeroSecondaryDashboards = dynamic(
  () => import('./HeroSecondaryDashboards'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[200px] sm:h-[308px] animate-pulse rounded-lg bg-white/5" aria-hidden />
    ),
  },
);

/* ─── Hero (main) ─────────────────────────────────────────────────── */

const TEAM_MEMBERS = HERO_TEAM_MEMBERS.map(({ name, image }) => ({
  name: name.trim(),
  firstName: name.trim().split(/\s+/)[0],
  image: `/images/members/headshots/${image}`,
}));

const Hero = () => {
  const [activeView, setActiveView] = useState<ViewId>('welcome');
  const [selectedMember, setSelectedMember] = useState<(typeof TEAM_MEMBERS)[number] | null>(null);
  const { ref, mode } = useScrollRevealMode<HTMLElement>();

  const handleUserPillClick = useCallback(() => {
    if (TEAM_MEMBERS.length === 0) return;

    setSelectedMember((current) => {
      if (TEAM_MEMBERS.length === 1) return TEAM_MEMBERS[0];

      let next = TEAM_MEMBERS[Math.floor(Math.random() * TEAM_MEMBERS.length)];
      while (current && next.name === current.name) {
        next = TEAM_MEMBERS[Math.floor(Math.random() * TEAM_MEMBERS.length)];
      }
      return next;
    });
  }, []);

  return (
    <HeroEntranceContext.Provider value={mode === 'instant'}>
    <section ref={ref} id="hero" style={{ fontFamily: "var(--font-manrope)" }}
      className="relative w-full min-h-dvh text-gray-100 overflow-x-hidden bg-linear-to-br from-black via-slate-900 to-sky-800">
      
      <style>{componentStyles}</style>
      <div className="absolute inset-0 z-0 bg-dot-grid-white/[0.07] mask-[radial-gradient(ellipse_at_center,white,transparent_70%)]"></div>

      <div className="relative z-10 site-container flex flex-col min-h-dvh max-sm:min-h-0">
        <div className="flex-1 flex flex-col justify-center items-center max-sm:flex-none max-sm:pt-14 sm:pt-0">
          <HeroHeadline phrases={PHRASES} />
          <div className="flex flex-col items-center gap-6 mb-6 sm:mb-12">
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#67c1dd] text-black font-semibold py-3 px-6 min-h-11 rounded-full flex items-center gap-2 hover:gap-4 shadow-[0_4px_14px_rgba(103,193,221,0.35),0_1px_0_rgba(255,255,255,0.2)_inset] hover:scale-105 active:scale-[0.96] transition-[transform,gap] duration-300"
            >
              Our Services <ArrowUpRight size={20} strokeWidth={2.5} aria-hidden />
            </button>
          </div>
        </div>
        <div 
          className="dashboard-container relative w-full max-w-7xl mx-auto pb-4 sm:pb-6 lg:pb-8
            bg-linear-to-b from-black/60 via-[#121212]/40 to-[#0a0a0a]/60 
            backdrop-blur-xl rounded-t-lg sm:rounded-t-xl lg:rounded-t-2xl 
            shadow-2xl shadow-black/60 flex max-sm:overflow-visible sm:overflow-hidden shine-border
            max-sm:mask-none
            mask-[linear-gradient(to_bottom,white_70%,transparent_100%)]
            sm:mask-[linear-gradient(to_bottom,white_80%,transparent_100%)]"
        >
          <Sidebar activeView={activeView} onViewChange={setActiveView} />
          <main className="flex-1 min-w-0 p-2 sm:p-4 lg:p-6 relative">
            <div className="flex items-center justify-between gap-3 mb-2 sm:mb-4 lg:mb-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.h2
                  key={activeView}
                  initial={{ opacity: 0, y: 4, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -4, filter: 'blur(4px)' }}
                  transition={iconSpring}
                  className="text-sm sm:text-base lg:text-lg font-semibold text-white truncate text-balance min-w-0"
                >
                  {VIEW_CONFIG[activeView].label}
                </motion.h2>
              </AnimatePresence>

              <button
                type="button"
                onClick={handleUserPillClick}
                aria-label={selectedMember ? selectedMember.name : 'Show team member'}
                className="relative shrink-0 flex items-center gap-2 sm:gap-2.5 rounded-full bg-white/5 py-1 pl-1 pr-2.5 sm:pr-3 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_4px_12px_rgba(0,0,0,0.2)] transition-[transform,background-color] hover:bg-white/10 active:scale-[0.96] before:absolute before:inset-[-4px] before:content-['']"
              >
                <span className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden bg-sky-500/20">
                  {selectedMember ? (
                    <Image
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      fill
                      sizes="36px"
                      className="object-cover object-top"
                    />
                  ) : (
                    <User2 className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400" strokeWidth={2} />
                  )}
                </span>
                <span className="text-xs sm:text-sm font-medium text-white pr-0.5 max-w-28 sm:max-w-36 truncate">
                  {selectedMember?.firstName ?? 'User'}
                </span>
              </button>
            </div>
            <div className="relative max-sm:min-h-0 sm:h-[340px] lg:h-[308px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeView}
                  className="max-sm:relative sm:absolute sm:inset-0 max-sm:overflow-visible sm:overflow-hidden"
                  exit={viewExit}
                >
                  {activeView === 'welcome' ? (
                    <WelcomeDashboard />
                  ) : (
                    <HeroSecondaryDashboards view={activeView} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </section>
    </HeroEntranceContext.Provider>
  );
};

export default Hero;
