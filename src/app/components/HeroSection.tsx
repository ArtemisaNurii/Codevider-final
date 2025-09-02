'use client';

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight, BarChart2, Bell, Search, TrendingUp, DollarSign, Users, Truck,
  Settings, ChevronDown, LayoutDashboard, Target, Zap, Clock, ShieldCheck,
  CheckCircle, RefreshCw
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

gsap.registerPlugin(ScrollTrigger);

// --- OPTIMIZED STYLES ---
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
  /* Performance optimizations */
  .hero-text, .hero-button {
    will-change: transform, opacity;
    /* We'll set the initial visibility state via JS to prevent FOUC */
    opacity: 0;
  }
  .dashboard-container {
    will-change: transform, opacity;
    backface-visibility: hidden;
    perspective: 1000px;
    /* We'll set the initial visibility state via JS */
    opacity: 0;
  }
`;

// --- OPTIMIZED CONSTANTS ---
const PHRASES = [
  "Blockchain Apps",
  "Fintech",
  "AI Integrations",
  "A/B Startups"

];

// --- HeroHeadline Component ---
const HeroHeadline = ({ phrases, activeIndex }: { phrases: string[]; activeIndex: number }) => (
  <div className="text-center pt-16 sm:pt-24 h-auto md:pt-32 mb-4 sm:mb-6 lg:mb-8">
    <h1 className="hero-text text-3xl font-spectral font-sans sm:text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
      Your Strategic Partner in
    </h1>
    <div className="relative h-14 sm:h-20 md:h-24 overflow-hidden">
      <div
        className="absolute inset-0 transition-transform duration-700 ease-in-out"
        style={{ transform: `translateY(-${activeIndex * 100}%)` }}
      >
        {phrases.map((phrase, index) => (
          <h1
            key={phrase + index}
            className="hero-text text-3xl sm:text-5xl md:text-7xl font-sans font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80 h-14 sm:h-20 md:h-24 flex items-center justify-center"
          >
            <span className="text-sky-400">{phrase}</span>
          </h1>
        ))}
      </div>
    </div>
  </div>
);


// --- DASHBOARD SUB-COMPONENTS (RESTORED TO FULL CODE) ---
const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, tooltip: 'Welcome', active: true },
    { icon: TrendingUp, tooltip: 'Growth Analytics' },
    { icon: DollarSign, tooltip: 'Income & Revenue' },
    { icon: Users, tooltip: 'Leads Management' },
    { icon: Truck, tooltip: 'Logistics & Ops' },
  ];

  return (
    <aside className="w-12 sm:w-14 lg:w-16 bg-black/30 backdrop-blur-sm flex-shrink-0 flex flex-col items-center py-2 sm:py-4 gap-2 sm:gap-3 lg:gap-4 border-r border-white/20">
      <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 mb-2 sm:mb-3 lg:mb-4 rounded-md lg:rounded-lg bg-gradient-to-tr from-sky-200 to-sky-300 flex items-center justify-center">
        <BarChart2 size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
      </div>
      <div className="flex flex-col gap-1 sm:gap-2">
        {navItems.map((item, index) => (
          <div key={index} title={item.tooltip} className={`relative w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 flex items-center justify-center rounded-md lg:rounded-lg cursor-pointer transition-colors ${
              item.active ? 'bg-sky-500/20 text-sky-400' : 'text-gray-400 hover:bg-white/10 hover:text-white'
            }`}>
            <item.icon size={16} className="sm:w-5 sm:h-5 lg:w-5 lg:h-5" />
            {item.active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 sm:w-1 h-4 sm:h-5 lg:h-6 bg-sky-400 rounded-r-full"></div>}
          </div>
        ))}
      </div>
      <div className="mt-auto" title="Settings">
          <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white rounded-md lg:rounded-lg cursor-pointer transition-colors">
              <Settings size={16} className="sm:w-5 sm:h-5 lg:w-5 lg:h-5" />
          </div>
      </div>
    </aside>
  );
};
const DashboardCard = ({ title, icon: Icon, children, className = '' }: { title: string, icon: React.ElementType, children: React.ReactNode, className?: string }) => (
  <div className={`dashboard-item bg-black/40 backdrop-blur-sm rounded-md sm:rounded-lg lg:rounded-xl p-1.5 sm:p-3 lg:p-4 flex flex-col border border-white/10 ${className}`}>
    <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2 lg:mb-3">
      <Icon className="text-sky-400 w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
      <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-white truncate">{title}</h3>
    </div>
    {children}
  </div>
);
const StatCardContent = ({ value, label, trend, trendColor = 'text-sky-400' }: { value: string, label: string, trend: string, trendColor?: string }) => (
  <div className="mt-auto">
    <p className="text-gray-400 text-xs">{label}</p>
    <p className="text-base sm:text-xl lg:text-2xl font-bold text-white flex items-baseline gap-1">
      {value}
      <span className={`text-xs sm:text-sm font-semibold ${trendColor}`}>{trend}</span>
    </p>
  </div>
);

// --- MAIN COMPONENT ---
const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPhraseIndex((prevIndex) => (prevIndex + 1) % PHRASES.length);
    }, 2500);
    return () => clearInterval(intervalId);
  }, []);

  // ==================================================================
  // === TOP-TIER ANIMATION REFACTOR using GSAP TIMELINE              ===
  // ==================================================================
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 0.8 }
      });

      tl.fromTo('.hero-text',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1 }
      );
      
      tl.fromTo('.hero-button',
        { y: 20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6 },
        "-=0.8"
      );

      tl.fromTo(dashboardRef.current,
        { y: 100, opacity: 0, scale: 0.95, rotationX: -10 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          ease: 'power3.inOut'
        },
        "-=0.6"
      );

      let throttleTimer: NodeJS.Timeout | null = null;
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          const dashboard = dashboardRef.current;
          if (!dashboard) return;
          
          const onMouseMove = (e: MouseEvent) => {
            if (throttleTimer) return;
            
            throttleTimer = setTimeout(() => {
              throttleTimer = null;
              const rect = dashboard.getBoundingClientRect();
              const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
              const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
              
              gsap.to(dashboard, { 
                duration: 0.8, 
                rotateY: x * 2.5, 
                rotateX: -y * 2.5, 
                ease: 'power2.out' 
              });
            }, 16);
          };

          const onMouseLeave = () => {
            gsap.to(dashboard, { 
              duration: 1, 
              rotateX: 0, 
              rotateY: 0, 
              ease: 'elastic.out(1, 0.5)' 
            });
          };

          containerRef.current?.addEventListener('mousemove', onMouseMove);
          containerRef.current?.addEventListener('mouseleave', onMouseLeave);
          
          return () => {
            containerRef.current?.removeEventListener('mousemove', onMouseMove);
            containerRef.current?.removeEventListener('mouseleave', onMouseLeave);
            if (throttleTimer) clearTimeout(throttleTimer);
          };
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id='hero' ref={containerRef} style={{ fontFamily: "var(--font-manrope), " }}
      className="section-hero relative w-full min-h-screen text-gray-100 font-sans overflow-hidden bg-gradient-to-b from-black via-black/80 to-sky-300/70">
      
      <style>{componentStyles}</style>
      <div className="absolute inset-0 z-0 bg-dot-grid-white/[0.07] [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"></div>
      
      <div className="relative z-10 container mx-auto flex flex-col min-h-screen px-4">
        <div className="flex-1 flex flex-col justify-center items-center">
          
          <HeroHeadline phrases={PHRASES} activeIndex={phraseIndex} />

          <div className="flex flex-col items-center gap-6 mb-8 sm:mb-12 lg:mb-16">
            <button onClick={() => {
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hero-button bg-[#67c1dd] text-black font-semibold py-3 px-6 rounded-full flex items-center gap-2 transform transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(56,189,248,0.5)] hover:shadow-[0_0_25px_rgba(56,189,248,0.7)]">
              Our Services <ArrowUpRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div 
          ref={dashboardRef} 
          style={{ transformStyle: 'preserve-3d' }}
          className="
            dashboard-container
            relative w-full max-w-7xl mx-auto pb-4 sm:pb-8 lg:pb-16
            bg-gradient-to-b from-black/60 via-[#121212]/40 to-[#0a0a0a]/60 
            backdrop-blur-xl rounded-t-lg sm:rounded-t-xl lg:rounded-t-2xl 
            shadow-2xl shadow-black/60 
            flex overflow-hidden shine-border
            transform-gpu transition-transform duration-300
            [mask-image:linear-gradient(to_bottom,white_70%,transparent_100%)]
            sm:[mask-image:linear-gradient(to_bottom,white_80%,transparent_100%)]
          "
        >
          <Sidebar />

          <main className="flex-1 p-1.5 sm:p-4 lg:p-6 relative">
            <div className="flex justify-between items-center mb-2 sm:mb-4 lg:mb-6">
              <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl text-white font-sans font-semibold">Welcome</h1>
              <div className="flex items-center gap-1 sm:gap-3 lg:gap-4">
                <Search className="text-gray-400 hover:text-white cursor-pointer w-3 h-3 sm:w-5 sm:h-5 hidden sm:block" />
                <Bell className="text-gray-400 hover:text-white cursor-pointer w-3 h-3 sm:w-5 sm:h-5" />
                <div className="flex items-center gap-1 sm:gap-2">
                    <Avatar className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8 border border-white/20">
                      <AvatarImage src="https://cdn-icons-png.flaticon.com/128/18921/18921078.png" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <ChevronDown size={10} className="text-gray-400 sm:w-4 sm:h-4" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-3 lg:gap-4">
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
                <StatCardContent value="86%" label="Conversion Rate" trend="-0.5%" trendColor='text-gray-400'/>
              </DashboardCard>
              <DashboardCard title="Operations" icon={Truck} className="col-span-2">
                  <div className='grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2 lg:gap-4 text-center mt-auto'>
                    <div>
                        <p className='text-sm sm:text-lg lg:text-2xl font-bold text-sky-400'>99.98%</p>
                        <p className='text-xs text-gray-400'>Uptime</p>
                    </div>
                    <div>
                        <p className='text-sm sm:text-lg lg:text-2xl font-bold text-white'>82ms</p>
                        <p className='text-xs text-gray-400'>Response</p>
                    </div>
                    <div className="hidden sm:block">
                        <p className='text-sm sm:text-lg lg:text-2xl font-bold text-yellow-400'>3</p>
                        <p className='text-xs text-gray-400'>Alerts</p>
                    </div>
                  </div>
              </DashboardCard>
              
              <DashboardCard title="Status" icon={Zap} className="hidden lg:block lg:col-span-2">
                 <div className="flex items-center justify-center gap-2 sm:gap-3 h-full">
                    <ShieldCheck size={18} className="text-sky-400 sm:w-6 sm:h-6"/>
                    <p className="text-sm sm:text-base lg:text-lg font-semibold text-white">All Systems Operational</p>
                 </div>
              </DashboardCard>

              <DashboardCard title="Transactions" icon={Clock} className="hidden sm:block col-span-2 lg:col-span-4">
                  <div className="space-y-1 sm:space-y-2 text-xs">
                    <div className="grid grid-cols-3 items-center gap-2 p-1 rounded bg-white/5">
                      <div className="flex items-center gap-2">
                        <CheckCircle size={10} className="text-sky-400"/>
                        <span className="text-white">Deposit</span>
                      </div>
                      <span className="text-white text-right">€2,500</span>
                      <span className="text-sky-400 text-right">Complete</span>
            ss        </div>
                    <div className="grid grid-cols-3 items-center gap-2 p-1 rounded bg-white/5">
                      <div className="flex items-center gap-2">
                        <RefreshCw size={10} className="text-yellow-400"/>
                        <span className="text-white">Withdrawal</span>
                      </div>
                      <span className="text-white text-right">€550</span>
                      <span className="text-yellow-400 text-right">Pending</span>
                    </div>
                  </div>
              </DashboardCard>
            </div>
            
          </main>
        </div>
      </div>
    </section>
  );
};
 export default Hero;