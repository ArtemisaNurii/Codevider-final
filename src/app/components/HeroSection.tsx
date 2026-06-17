'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight, BarChart2, Bell, Search, TrendingUp, DollarSign, Users, Truck,
  ChevronDown, LayoutDashboard, Target, Zap, Clock, ShieldCheck,
  CheckCircle, RefreshCw, User2, Eye, Globe, Package, MapPin
} from 'lucide-react';

const SURFACE =
  'bg-black/40 backdrop-blur-sm rounded-md sm:rounded-lg lg:rounded-xl shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_8px_24px_rgba(0,0,0,0.25)]';
const INNER_SURFACE =
  'rounded-sm bg-white/5 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset]';

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 8, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring' as const, duration: 0.3, bounce: 0 },
  },
};

const viewExit = { opacity: 0, y: -8, transition: { duration: 0.15, ease: 'easeIn' as const } };

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
    <div className="text-center pt-16 sm:pt-24 h-auto md:pt-32 mb-4 sm:mb-6 lg:mb-8">
      <h1 className="text-2xl sm:text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-b from-white to-white/80 text-balance">
        Your Strategic Partner in
      </h1>
      <div className="relative h-14 sm:h-20 md:h-24 flex items-center justify-center overflow-hidden">
        <h1
          key={phrases[currentIndex]}
          className="text-3xl sm:text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-b from-white to-white/80 absolute animate-fade"
        >
          <span className="text-sky-400">{phrases[currentIndex]}</span>
        </h1>
      </div>
    </div>
  );
}

/* ─── Types ───────────────────────────────────────────────────────── */

type ViewId = 'welcome' | 'analytics' | 'finance' | 'team' | 'operations';

/* ─── Sidebar ─────────────────────────────────────────────────────── */

const Sidebar = ({ activeView, onViewChange }: { activeView: ViewId; onViewChange: (v: ViewId) => void }) => {
  const navItems: { icon: React.ElementType; tooltip: string; view: ViewId }[] = [
    { icon: LayoutDashboard, tooltip: 'Welcome', view: 'welcome' },
    { icon: TrendingUp, tooltip: 'Analytics', view: 'analytics' },
    { icon: DollarSign, tooltip: 'Finance', view: 'finance' },
    { icon: Users, tooltip: 'Team', view: 'team' },
    { icon: Truck, tooltip: 'Operations', view: 'operations' },
  ];

  return (
    <aside className="w-12 sm:w-14 lg:w-16 bg-black/30 backdrop-blur-sm shrink-0 flex flex-col items-center py-2 sm:py-4 gap-2 sm:gap-3 lg:gap-4 shadow-[1px_0_0_rgba(255,255,255,0.06)]">
      <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 mb-2 sm:mb-3 lg:mb-4 rounded-md lg:rounded-lg bg-linear-to-tr from-sky-200 to-sky-300 flex items-center justify-center">
        <BarChart2 size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
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

const DashboardSurface = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div variants={staggerItem} className={`${SURFACE} p-1.5 sm:p-3 lg:p-4 ${className}`}>
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

const WelcomeDashboard = () => (
  <motion.div
    className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-3 lg:gap-4"
    variants={staggerContainer}
    initial="hidden"
    animate="visible"
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
    <DashboardCard title="Operations" icon={Truck} className="col-span-2 lg:col-span-2">
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
    <DashboardCard title="Status" icon={Zap} className="col-span-2 lg:col-span-1">
      <div className="flex items-center gap-2 sm:gap-3 mt-auto">
        <ShieldCheck size={18} className="text-sky-400 sm:w-6 sm:h-6 shrink-0" />
        <p className="text-xs sm:text-sm lg:text-base font-semibold text-white text-pretty leading-snug">
          All Systems Operational
        </p>
      </div>
    </DashboardCard>
    <DashboardCard title="Transactions" icon={Clock} className="col-span-2 lg:col-span-1">
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

const AnalyticsDashboard = () => {
  const weeklyBars = [45, 62, 78, 55, 90, 82, 68, 75, 58, 95, 70, 60, 88, 72, 65, 80, 92, 50, 76, 85, 70, 63, 88, 73, 55, 82, 90, 67];

  const metrics = [
    { label: 'Page Views', value: '24.5K', bars: [40, 65, 55, 80, 70, 90, 60] },
    { label: 'Avg. Session', value: '4m 32s', bars: [50, 60, 45, 75, 65, 55, 70] },
    { label: 'Bounce Rate', value: '32.1%', bars: [70, 55, 60, 45, 50, 40, 35] },
  ];

  const trafficSources = [
    { label: 'Direct', pct: '35%', color: 'bg-sky-400' },
    { label: 'Organic', pct: '25%', color: 'bg-teal-400' },
    { label: 'Social', pct: '20%', color: 'bg-sky-300' },
    { label: 'Referral', pct: '20%', color: 'bg-slate-400' },
  ];

  const topPages = [
    { page: '/home', views: '8.2K', pct: 90 },
    { page: '/products', views: '5.1K', pct: 56 },
    { page: '/about', views: '3.4K', pct: 37 },
  ];

  return (
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-3 lg:gap-4"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <DashboardSurface className="col-span-2 lg:col-span-4">
        <div className="flex items-center justify-between mb-1 sm:mb-2 lg:mb-3">
          <div className="flex items-center gap-1 sm:gap-2">
            <TrendingUp className="text-sky-400 w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
            <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-white text-balance">Weekly Visitors</h3>
          </div>
          <span className="text-xs text-sky-400 font-medium tabular-nums">12,847 total</span>
        </div>
        <div className="flex items-end gap-px sm:gap-0.5 h-10 sm:h-14 lg:h-16">
          {weeklyBars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm transition-[height,opacity] duration-300"
              style={{
                height: `${h}%`,
                background: 'linear-gradient(to top, rgba(56, 189, 248, 0.9), rgba(125, 211, 252, 0.45))',
                opacity: 0.5 + (h / 200),
              }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-500 tabular-nums">
          <span>Mon</span>
          <span className="hidden sm:inline">Tue</span>
          <span className="hidden sm:inline">Wed</span>
          <span>Thu</span>
          <span className="hidden sm:inline">Fri</span>
          <span className="hidden sm:inline">Sat</span>
          <span>Sun</span>
        </div>
      </DashboardSurface>

      {metrics.map((m) => (
        <DashboardSurface key={m.label}>
          <p className="text-xs text-gray-400 truncate text-pretty">{m.label}</p>
          <p className="text-sm sm:text-lg lg:text-xl font-bold text-white tabular-nums">{m.value}</p>
          <div className="flex items-end gap-px mt-1 h-4 sm:h-6">
            {m.bars.map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-sky-400/60 transition-[height] duration-300" style={{ height: `${h}%` }} />
            ))}
          </div>
        </DashboardSurface>
      ))}

      <DashboardSurface className="col-span-1">
        <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
          <Globe className="text-sky-400 w-3 h-3 sm:w-4 sm:h-4" />
          <h3 className="text-xs sm:text-sm font-semibold text-white text-balance">Traffic Sources</h3>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 shrink-0">
            <div
              className="w-full h-full rounded-full outline-1 outline-white/10"
              style={{
                background: 'conic-gradient(#38bdf8 0% 35%, #2dd4bf 35% 60%, #7dd3fc 60% 80%, #64748b 80% 100%)',
              }}
            />
            <div className="absolute inset-1.5 sm:inset-2 lg:inset-3 rounded-full bg-black/90" />
          </div>
          <div className="space-y-0.5 sm:space-y-1 text-xs min-w-0">
            {trafficSources.map((s) => (
              <div key={s.label} className="flex items-center gap-1">
                <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0 ${s.color}`} />
                <span className="text-gray-400 truncate">{s.label}</span>
                <span className="text-white ml-auto shrink-0 tabular-nums">{s.pct}</span>
              </div>
            ))}
          </div>
        </div>
      </DashboardSurface>

      <DashboardSurface className="col-span-1">
        <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
          <Eye className="text-sky-400 w-3 h-3 sm:w-4 sm:h-4" />
          <h3 className="text-xs sm:text-sm font-semibold text-white text-balance">Top Pages</h3>
        </div>
        <div className="space-y-1.5 sm:space-y-2">
          {topPages.map((p) => (
            <div key={p.page}>
              <div className="flex justify-between text-xs mb-0.5">
                <span className="text-gray-300 truncate">{p.page}</span>
                <span className="text-gray-400 ml-2 shrink-0 tabular-nums">{p.views}</span>
              </div>
              <div className="h-1 sm:h-1.5 bg-white/10 rounded-full overflow-hidden shadow-[0_1px_0_rgba(255,255,255,0.04)_inset]">
                <div
                  className="h-full rounded-full bg-linear-to-r from-sky-400 to-teal-400 transition-[width] duration-300"
                  style={{ width: `${p.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </DashboardSurface>
    </motion.div>
  );
};

/* ─── Finance Dashboard ───────────────────────────────────────────── */

const FinanceDashboard = () => {
  const stats = [
    { label: 'Total Revenue', value: '€284K', delta: '+12.5%', positive: true },
    { label: 'Expenses', value: '€156K', delta: '+3.2%', positive: false },
    { label: 'Net Profit', value: '€128K', delta: '+18.7%', positive: true },
    { label: 'Cash Flow', value: '€94K', delta: '+5.1%', positive: true },
  ];

  const monthlyData = [
    { month: 'Jul', income: 72, expense: 45 },
    { month: 'Aug', income: 80, expense: 50 },
    { month: 'Sep', income: 65, expense: 55 },
    { month: 'Oct', income: 90, expense: 48 },
    { month: 'Nov', income: 85, expense: 52 },
    { month: 'Dec', income: 95, expense: 42 },
  ];

  const transactions = [
    { name: 'Client Payment', amount: '+€12,500', status: 'Completed', isIncome: true },
    { name: 'Office Rent', amount: '-€3,200', status: 'Completed', isIncome: false },
    { name: 'Software License', amount: '-€899', status: 'Pending', isIncome: false },
  ];

  return (
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-3 lg:gap-4"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {stats.map((s) => (
        <DashboardSurface key={s.label}>
          <p className="text-xs text-gray-400 text-pretty">{s.label}</p>
          <p className="text-sm sm:text-xl lg:text-2xl font-bold text-white mt-0.5 tabular-nums">{s.value}</p>
          <span className={`text-xs font-semibold tabular-nums ${s.positive ? 'text-sky-400' : 'text-gray-400'}`}>
            {s.positive ? '▲' : '▼'} {s.delta}
          </span>
        </DashboardSurface>
      ))}

      <DashboardSurface className="col-span-1 sm:col-span-1 lg:col-span-2">
        <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
          <BarChart2 className="text-sky-400 w-3 h-3 sm:w-4 sm:h-4" />
          <h3 className="text-xs sm:text-sm font-semibold text-white text-balance">Income vs Expenses</h3>
        </div>
        <div className="flex items-end gap-1.5 sm:gap-2 h-14 sm:h-16 lg:h-20">
          {monthlyData.map((m) => (
            <div key={m.month} className="flex-1 flex items-end gap-px">
              <div className="flex-1 rounded-t-sm bg-sky-400/70 transition-[height] duration-300" style={{ height: `${m.income}%` }} />
              <div className="flex-1 rounded-t-sm bg-sky-800/60 transition-[height] duration-300" style={{ height: `${m.expense}%` }} />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-500 tabular-nums">
          {monthlyData.map((m) => (
            <span key={m.month}>{m.month}</span>
          ))}
        </div>
        <div className="flex gap-3 mt-1.5 sm:mt-2">
          <div className="flex items-center gap-1 text-xs">
            <div className="w-2 h-2 rounded-sm bg-sky-400/70" />
            <span className="text-gray-400">Income</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <div className="w-2 h-2 rounded-sm bg-sky-800/60" />
            <span className="text-gray-400">Expenses</span>
          </div>
        </div>
      </DashboardSurface>

      <DashboardSurface className="col-span-1 sm:col-span-1 lg:col-span-2">
        <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
          <Clock className="text-sky-400 w-3 h-3 sm:w-4 sm:h-4" />
          <h3 className="text-xs sm:text-sm font-semibold text-white text-balance">Recent Transactions</h3>
        </div>
        <div className="space-y-1 sm:space-y-1.5 text-xs">
          {transactions.map((tx) => (
            <div key={tx.name} className={`flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 ${INNER_SURFACE}`}>
              {tx.status === 'Pending' ? (
                <RefreshCw size={10} className="text-yellow-400 sm:w-4 sm:h-4 shrink-0" />
              ) : (
                <CheckCircle size={10} className="text-sky-400 sm:w-4 sm:h-4 shrink-0" />
              )}
              <span className="text-white flex-1 truncate">{tx.name}</span>
              <span className={`font-medium shrink-0 tabular-nums ${tx.isIncome ? 'text-sky-400' : 'text-white'}`}>{tx.amount}</span>
              <span className={`px-1 sm:px-1.5 py-0.5 rounded-sm shrink-0 ${
                tx.status === 'Pending' ? 'text-yellow-400 bg-yellow-400/10' : 'text-sky-400 bg-sky-400/10'
              }`}>
                {tx.status}
              </span>
            </div>
          ))}
        </div>
      </DashboardSurface>
    </motion.div>
  );
};

/* ─── Team Dashboard ──────────────────────────────────────────────── */

const TeamDashboard = () => {
  const members = [
    { initials: 'JD', name: 'John D.', role: 'Lead Dev', status: 'online' as const, score: 95 },
    { initials: 'SK', name: 'Sarah K.', role: 'Designer', status: 'online' as const, score: 88 },
    { initials: 'MR', name: 'Mike R.', role: 'Backend', status: 'away' as const, score: 82 },
    { initials: 'AL', name: 'Anna L.', role: 'Frontend', status: 'online' as const, score: 79 },
  ];

  const statusDot = (s: 'online' | 'away' | 'offline') =>
    s === 'online' ? 'bg-sky-400' : s === 'away' ? 'bg-yellow-400' : 'bg-gray-500';

  const teamStats = [
    { label: 'Total Members', value: '48', icon: Users },
    { label: 'Active Today', value: '36', icon: Zap },
    { label: 'New This Week', value: '5', icon: TrendingUp },
    { label: 'Retention Rate', value: '94%', icon: Target },
  ];

  return (
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-3 lg:gap-4"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {teamStats.map((s) => (
        <DashboardSurface key={s.label}>
          <div className="flex items-center gap-1 mb-0.5 sm:mb-1">
            <s.icon className="text-sky-400 w-3 h-3 sm:w-4 sm:h-4" />
            <p className="text-xs text-gray-400 text-pretty">{s.label}</p>
          </div>
          <p className="text-sm sm:text-xl lg:text-2xl font-bold text-white tabular-nums">{s.value}</p>
        </DashboardSurface>
      ))}

      <DashboardSurface className="col-span-1 lg:col-span-2">
        <h3 className="text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-2 text-balance">Activity Score</h3>
        <div className="space-y-1.5 sm:space-y-2">
          {members.map((m) => (
            <div key={m.initials}>
              <div className="flex justify-between text-xs mb-0.5">
                <span className="text-gray-300">{m.name}</span>
                <span className="text-gray-400 tabular-nums">{m.score}</span>
              </div>
              <div className="h-1 sm:h-1.5 bg-white/10 rounded-full overflow-hidden shadow-[0_1px_0_rgba(255,255,255,0.04)_inset]">
                <div
                  className="h-full rounded-full bg-linear-to-r from-sky-400 to-teal-400 transition-[width] duration-300"
                  style={{ width: `${m.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </DashboardSurface>

      <DashboardSurface className="col-span-1 lg:col-span-2">
        <h3 className="text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-2 text-balance">Team Members</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2">
          {members.map((m) => (
            <div key={m.initials} className={`flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 rounded-sm sm:rounded-md ${INNER_SURFACE}`}>
              <div className="relative shrink-0">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-linear-to-br from-sky-500 to-teal-500 flex items-center justify-center text-[8px] sm:text-xs font-bold text-white outline-1 outline-white/10">
                  {m.initials}
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border-2 border-black/80 ${statusDot(m.status)}`} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-white truncate leading-tight">{m.name}</p>
                <p className="text-[10px] sm:text-xs text-gray-400 truncate leading-tight text-pretty">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </DashboardSurface>
    </motion.div>
  );
};

/* ─── Operations Dashboard ────────────────────────────────────────── */

const OperationsDashboard = () => {
  const pipelineStages = [
    { label: 'Received', short: 'Rec', count: 24, bg: 'bg-sky-300', glow: '0 0 12px rgba(125,211,252,0.4)' },
    { label: 'Processing', short: 'Proc', count: 18, bg: 'bg-sky-400', glow: '0 0 12px rgba(56,189,248,0.4)' },
    { label: 'Dispatched', short: 'Disp', count: 12, bg: 'bg-sky-400', glow: '0 0 12px rgba(56,189,248,0.4)' },
    { label: 'In Transit', short: 'Trans', count: 43, bg: 'bg-teal-400', glow: '0 0 12px rgba(45,212,191,0.4)' },
    { label: 'Delivered', short: 'Done', count: 892, bg: 'bg-sky-300', glow: '0 0 12px rgba(125,211,252,0.4)' },
  ];

  const shipments = [
    { id: 'SHP-4821', from: 'Berlin', to: 'Munich', status: 'Delivered', color: 'text-sky-400 bg-sky-400/10' },
    { id: 'SHP-4822', from: 'Hamburg', to: 'Frankfurt', status: 'In Transit', color: 'text-yellow-400 bg-yellow-400/10' },
    { id: 'SHP-4823', from: 'Cologne', to: 'Stuttgart', status: 'Delayed', color: 'text-gray-400 bg-gray-400/10' },
    { id: 'SHP-4824', from: 'Dresden', to: 'Leipzig', status: 'Delivered', color: 'text-sky-400 bg-sky-400/10' },
  ];

  return (
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-3 lg:gap-4"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {[
        { label: 'Orders Today', value: '156', Icon: Package, iconColor: 'text-sky-400' },
        { label: 'In Transit', value: '43', Icon: Truck, iconColor: 'text-sky-300' },
        { label: 'Delivered', value: '892', Icon: CheckCircle, iconColor: 'text-teal-400' },
      ].map((s) => (
        <DashboardSurface key={s.label}>
          <div className="flex items-center gap-1 mb-0.5 sm:mb-1">
            <s.Icon className={`w-3 h-3 sm:w-4 sm:h-4 ${s.iconColor}`} />
            <p className="text-xs text-gray-400 text-pretty">{s.label}</p>
          </div>
          <p className="text-sm sm:text-xl lg:text-2xl font-bold text-white tabular-nums">{s.value}</p>
        </DashboardSurface>
      ))}

      <DashboardSurface className="col-span-2 lg:col-span-1">
        <p className="text-xs text-gray-400 mb-1 text-pretty">System Uptime</p>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 shrink-0">
            <div
              className="w-full h-full rounded-full outline-1 outline-white/10"
              style={{
                background: 'conic-gradient(#38bdf8 0% 99.8%, rgba(255,255,255,0.1) 99.8% 100%)',
                boxShadow: '0 0 15px rgba(56, 189, 248, 0.3)',
              }}
            />
            <div className="absolute inset-1 sm:inset-1.5 lg:inset-2 rounded-full bg-black/90 flex items-center justify-center">
              <span className="text-[9px] sm:text-xs font-bold text-sky-400 tabular-nums">99.8%</span>
            </div>
          </div>
          <div>
            <p className="text-sm sm:text-lg font-bold text-white tabular-nums">99.8%</p>
            <p className="text-xs text-sky-400">Operational</p>
          </div>
        </div>
      </DashboardSurface>

      <DashboardSurface className="col-span-2 lg:col-span-4">
        <h3 className="text-xs sm:text-sm font-semibold text-white mb-2 sm:mb-3 text-balance">Delivery Pipeline</h3>
        <div className="flex items-center justify-between relative">
          <div className="absolute top-3 sm:top-4 left-6 right-6 h-px shadow-[0_1px_0_rgba(255,255,255,0.12)]" />
          {pipelineStages.map((stage) => (
            <div key={stage.label} className="flex flex-col items-center relative z-10">
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full ${stage.bg} flex items-center justify-center outline-1 outline-black/10`}
                style={{ boxShadow: stage.glow }}
              >
                <span className="text-[9px] sm:text-xs font-bold text-black tabular-nums">{stage.count}</span>
              </div>
              <span className="text-[10px] sm:text-xs text-gray-400 mt-1 text-center hidden sm:block">{stage.label}</span>
              <span className="text-[9px] text-gray-400 mt-0.5 text-center sm:hidden">{stage.short}</span>
            </div>
          ))}
        </div>
      </DashboardSurface>

      {shipments.map((s) => (
        <motion.div
          key={s.id}
          variants={staggerItem}
          className={`${SURFACE} p-1.5 sm:p-2 lg:p-3 flex items-center gap-1.5 sm:gap-2`}
        >
          <MapPin size={10} className="text-sky-400 sm:w-4 sm:h-4 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white truncate">{s.from} → {s.to}</p>
            <p className="text-[10px] sm:text-xs text-gray-500 tabular-nums">{s.id}</p>
          </div>
          <span className={`text-[10px] sm:text-xs px-1 sm:px-1.5 py-0.5 rounded-sm shrink-0 ${s.color}`}>
            {s.status}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};

/* ─── Hero (main) ─────────────────────────────────────────────────── */

const Hero = () => {
  const [activeView, setActiveView] = useState<ViewId>('welcome');

  return (
    <section id="hero" style={{ fontFamily: "var(--font-manrope)" }}
      className="relative w-full min-h-screen text-gray-100 overflow-hidden bg-linear-to-br from-black via-slate-900 to-sky-800">
      
      <style>{componentStyles}</style>
      <div className="absolute inset-0 z-0 bg-dot-grid-white/[0.07] mask-[radial-gradient(ellipse_at_center,white,transparent_70%)]"></div>

      <div className="relative z-10 container mx-auto flex flex-col min-h-screen px-4">
        <div className="flex-1 flex flex-col justify-center items-center">
          <HeroHeadline phrases={PHRASES} />
          <div className="flex flex-col items-center gap-6 mb-12">
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#67c1dd] text-black font-semibold py-3 px-6 rounded-full flex items-center gap-2 hover:gap-4 shadow-lg hover:scale-105 active:scale-[0.96] transition-transform"
            >
              Our Services <ArrowUpRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
        <div 
          className="dashboard-container relative w-full max-w-7xl mx-auto pb-4 sm:pb-6 lg:pb-8
            bg-linear-to-b from-black/60 via-[#121212]/40 to-[#0a0a0a]/60 
            backdrop-blur-xl rounded-t-lg sm:rounded-t-xl lg:rounded-t-2xl 
            shadow-2xl shadow-black/60 flex overflow-hidden shine-border
            mask-[linear-gradient(to_bottom,white_70%,transparent_100%)]
            sm:mask-[linear-gradient(to_bottom,white_80%,transparent_100%)]"
        >
          <Sidebar activeView={activeView} onViewChange={setActiveView} />
          <main className="flex-1 p-1.5 sm:p-4 lg:p-6 relative">
            <div className="flex justify-between items-center mb-2 sm:mb-4 lg:mb-6">
              <div className="flex items-center gap-1 sm:gap-3 lg:gap-4">
                <button
                  type="button"
                  aria-label="Search"
                  className="relative hidden sm:flex items-center justify-center w-8 h-8 text-gray-400 hover:text-white transition-[color,transform] active:scale-[0.96] before:absolute before:inset-[-4px] before:content-['']"
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  type="button"
                  aria-label="Notifications"
                  className="relative flex items-center justify-center w-8 h-8 text-gray-400 hover:text-white transition-[color,transform] active:scale-[0.96] before:absolute before:inset-[-4px] before:content-['']"
                >
                  <Bell className="w-3 h-3 sm:w-5 sm:h-5" />
                </button>
                <button
                  type="button"
                  aria-label="Account menu"
                  className="relative flex items-center gap-1 sm:gap-2 w-8 h-8 justify-center text-gray-400 hover:text-white transition-[color,transform] active:scale-[0.96] before:absolute before:inset-[-4px] before:content-['']"
                >
                  <User2 size={10} className="sm:w-4 sm:h-4" />
                  <ChevronDown size={10} className="sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
            <div className="relative h-[320px] sm:h-[340px] lg:h-[308px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeView}
                  className="absolute inset-0 overflow-hidden"
                  exit={viewExit}
                >
                  {activeView === 'welcome' && <WelcomeDashboard />}
                  {activeView === 'analytics' && <AnalyticsDashboard />}
                  {activeView === 'finance' && <FinanceDashboard />}
                  {activeView === 'team' && <TeamDashboard />}
                  {activeView === 'operations' && <OperationsDashboard />}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default Hero;
