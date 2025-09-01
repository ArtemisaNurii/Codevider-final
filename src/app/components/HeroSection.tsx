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
  .hero-text, .hero-button, .dashboard-item {
    will-change: transform, opacity;
  }
  .dashboard-container {
    will-change: transform;
    backface-visibility: hidden;
    perspective: 1000px;
  }
`;

// --- OPTIMIZED CONSTANTS ---
const PHRASES = [
  "Blockchain Apps",
  "Fintech",
  "AI Integrations",
  "A/B Startups"

];

const HeroHeadline = ({ phrases, activeIndex }: { phrases: string[]; activeIndex: number }) => (
  <div className="text-center pt-16 sm:pt-24 h-auto md:pt-32 mb-4 sm:mb-6 lg:mb-8">
    <h1 className="hero-text text-3xl font-spectral font-sans sm:text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
      Your Strategic Partner in
    </h1>
    {/* This container creates the "viewport" for the rotating text */}
    <div className="relative h-14 sm:h-20 md:h-24 overflow-hidden">
      {/* This inner div holds all the phrases and moves vertically */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-in-out"
        style={{ transform: `translateY(-${activeIndex * 100}%)` }}
      >
        {phrases.map((phrase, index) => (
          <h1
            key={phrase + index}
            className="hero-manrope text-3xl sm:text-5xl md:text-7xl font-sans font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80 h-14 sm:h-20 md:h-24 flex items-center justify-center"
          >
            <span className="text-sky-400">{phrase}</span>
          </h1>
        ))}
      </div>
    </div>
  </div>
);


// --- DASHBOARD SUB-COMPONENTS ---
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

  // --- NEW STATE & EFFECT FOR ROTATING TEXT ---
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPhraseIndex((prevIndex) => (prevIndex + 1) % PHRASES.length);
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-text',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.1 }
      );
      gsap.fromTo('.hero-button',
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', delay: 0.4 }
      );
      gsap.fromTo(dashboardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.2 }
      );
      gsap.fromTo('.dashboard-item',
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.015, ease: 'power2.out', delay: 0.5 }
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
                duration: 0.4, 
                rotateY: x * 2, 
                rotateX: -y * 2, 
                ease: 'power2.out' 
              });
            }, 16);
          };

          const onMouseLeave = () => {
            gsap.to(dashboard, { 
              duration: 0.6, 
              rotateX: 0, 
              rotateY: 0, 
              ease: 'power2.out' 
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
                    </div>
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
      </div> {/* This div closes the "relative z-10" container */}
    </section>
  );
};

export default Hero;




// import { Button } from "@/components/ui/button"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Phone, Search, TrendingUp, TrendingDown } from "lucide-react"

// export default function HeroSection() {
//   return (
//     <div className="min-h-screen relative overflow-hidden">
//       {/* Main gradient background */}
//       <div className="absolute inset-0 bg-gradient-to-r from-sky-200 via-amber-50 to-sky-200"></div>

//       {/* Left side geometric pattern overlay */}
//       <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-sky-200/20  to-transparent opacity-80">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `
//             linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 41%, rgba(255,255,255,0.1) 43%, transparent 44%),
//             linear-gradient(-45deg, transparent 40%, rgba(255,255,255,0.1) 41%, rgba(255,255,255,0.1) 43%, transparent 44%),
//             linear-gradient(90deg, transparent 40%, rgba(255,255,255,0.05) 41%, rgba(255,255,255,0.05) 43%, transparent 44%)
//           `,
//             backgroundSize: "60px 60px, 60px 60px, 40px 40px",
//           }}
//         ></div>
//       </div>

//       {/* Right side softer gradient */}
//       <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-sky-200 to-transparent opacity-60"></div>



//       {/* Navigation */}
//       <nav className="relative z-10 flex justify-end p-6">
//         <Button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-full">Get Started</Button>
//       </nav>

//       {/* Hero Section */}
//       <div className="relative z-10 max-w-4xl mx-auto px-6 pt-12 pb-8 text-center">
//         {/* Social Proof */}
//         <div className="flex items-center justify-center gap-2 mb-8">
//           <div className="flex -space-x-2">
//             <Avatar className="w-8 h-8 border-2 border-white">
//               <AvatarImage src="/abstract-geometric-shapes.png" />
//               <AvatarFallback>U1</AvatarFallback>
//             </Avatar>
//             <Avatar className="w-8 h-8 border-2 border-white">
//               <AvatarImage src="/abstract-geometric-shapes.png" />
//               <AvatarFallback>U2</AvatarFallback>
//             </Avatar>
//             <Avatar className="w-8 h-8 border-2 border-white">
//               <AvatarImage src="/diverse-group-collaborating.png" />
//               <AvatarFallback>U3</AvatarFallback>
//             </Avatar>
//           </div>
//           <span className="text-gray-600 text-sm ml-2">Loved by Over 1 Million Users</span>
//         </div>

//         {/* Main Heading */}
//         <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
//           Smarter Money
//           <br />
//           Starts with Spendex
//         </h1>

//         {/* Subheading */}
//         <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
//           Take charge of your financial journey with Spendex — the
//           <br />
//           wallet SaaS built to scale with your goals.
//         </p>

//         {/* CTA Buttons */}
//         <div className="flex items-center justify-center gap-4 mb-16">
//           <Button className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-lg text-lg font-medium flex items-center gap-2">
//             <Phone className="w-5 h-5" />
//             Talk to sales
//           </Button>
//           <Button variant="ghost" className="text-gray-700 hover:text-gray-900 px-8 py-3 text-lg font-medium">
//             Learn More
//           </Button>
//         </div>
//       </div>

//       {/* Dashboard Mockup */}
//       <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
//         <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
//           {/* Browser Chrome */}
//           <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b">
//             <div className="flex gap-2">
//               <div className="w-3 h-3 bg-red-400 rounded-full"></div>
//               <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
//               <div className="w-3 h-3 bg-green-400 rounded-full"></div>
//             </div>
//             <div className="flex-1 mx-4">
//               <div className="bg-white rounded px-3 py-1 text-sm text-gray-600 text-center max-w-xs mx-auto">
//                 spendex.com
//               </div>
//             </div>
//             <div className="flex gap-2 text-gray-400">
//               <div className="w-4 h-4 border border-gray-300 rounded-sm"></div>
//               <div className="w-4 h-4 border border-gray-300 rounded-sm"></div>
//             </div>
//           </div>

//           {/* Dashboard Content */}
//           <div className="flex">
//             {/* Sidebar */}
//             <div className="w-64 bg-white border-r border-gray-200 p-6">
//               {/* Logo */}
//               <div className="flex items-center gap-2 mb-8">
//                 <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
//                   <div className="w-4 h-4 bg-white rounded-sm"></div>
//                 </div>
//                 <span className="font-bold text-xl">Spendex</span>
//               </div>

//               {/* Search */}
//               <div className="relative mb-8">
//                 <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Type here to search"
//                   className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg text-sm border-0 focus:outline-none focus:ring-2 focus:ring-sky-500"
//                 />
//               </div>

//               {/* Navigation */}
//               <div className="space-y-1">
//                 <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">MAIN</div>
//                 <div className="flex items-center gap-3 px-3 py-2 bg-sky-50 text-sky-600 rounded-lg">
//                   <div className="w-4 h-4 bg-sky-500 rounded-sm"></div>
//                   <span className="font-medium">Dashboard</span>
//                 </div>
//                 <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
//                   <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
//                   <span>Transactions</span>
//                 </div>
//                 <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
//                   <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
//                   <span>Wallets</span>
//                 </div>
//                 <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
//                   <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
//                   <span>Budgets</span>
//                 </div>
//                 <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
//                   <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
//                   <span>Recipients</span>
//                 </div>

//                 <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 mt-6">OTHER</div>
//                 <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
//                   <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
//                   <span>Integrations</span>
//                 </div>
//                 <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
//                   <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
//                   <span>Settings</span>
//                 </div>
//                 <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
//                   <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
//                   <span>Get Help</span>
//                 </div>
//               </div>
//             </div>

//             {/* Main Content */}
//             <div className="flex-1 p-6">
//               {/* Header */}
//               <div className="flex items-center justify-between mb-8">
//                 <div className="flex items-center gap-4">
//                   <Avatar className="w-10 h-10">
//                     <AvatarImage src="/abstract-profile.png" />
//                     <AvatarFallback>OM</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <div className="font-semibold">Octavia Melvin</div>
//                     <div className="text-sm text-gray-500">Oct • 2024 • 8:04</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Dashboard Grid */}
//               <div className="grid grid-cols-3 gap-6">
//                 {/* Wallet Overview */}
//                 <div className="col-span-2">
//                   <div className="flex items-center justify-between mb-4">
//                     <h2 className="text-xl font-semibold">Wallet Overview</h2>
//                     <select className="text-sm text-gray-500 bg-transparent border-0 focus:outline-none">
//                       <option>Last 7 days</option>
//                     </select>
//                   </div>

//                   <div className="grid grid-cols-2 gap-6 mb-6">
//                     <div>
//                       <div className="text-sm text-gray-500 mb-1">Total Balance</div>
//                       <div className="text-3xl font-bold">$2,450</div>
//                       <div className="flex items-center gap-1 text-sm">
//                         <TrendingUp className="w-4 h-4 text-sky-500" />
//                         <span className="text-sky-500">36.8%</span>
//                         <span className="text-gray-500">vs last month</span>
//                       </div>
//                     </div>
//                     <div>
//                       <div className="text-sm text-gray-500 mb-1">Monthly Spend</div>
//                       <div className="text-3xl font-bold">$1,320</div>
//                       <div className="flex items-center gap-1 text-sm">
//                         <TrendingDown className="w-4 h-4 text-green-500" />
//                         <span className="text-green-500">36.8%</span>
//                         <span className="text-gray-500">vs last month</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Recent Transactions */}
//                   <div>
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="text-lg font-semibold">Recent Transactions</h3>
//                       <div className="relative">
//                         <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                         <input
//                           type="text"
//                           placeholder="Search..."
//                           className="pl-10 pr-4 py-2 bg-gray-50 rounded-lg text-sm border-0 focus:outline-none focus:ring-2 focus:ring-sky-500"
//                         />
//                       </div>
//                     </div>

//                     <div className="space-y-3">
//                       <div className="flex items-center justify-between py-3 border-b border-gray-100">
//                         <div className="flex items-center gap-3">
//                           <div className="text-sm text-gray-500">Feb 12</div>
//                           <div className="text-sm text-gray-500">8:22 AM</div>
//                           <div className="font-medium">$3140.00</div>
//                           <div className="text-sm text-gray-500">$0.00</div>
//                           <div className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">Pending</div>
//                         </div>
//                         <div className="font-medium">$3140.00</div>
//                       </div>
//                       <div className="flex items-center justify-between py-3 border-b border-gray-100">
//                         <div className="flex items-center gap-3">
//                           <div className="text-sm text-gray-500">Jan 28</div>
//                           <div className="text-sm text-gray-500">6:15 AM</div>
//                           <div className="font-medium">$6,236.00</div>
//                           <div className="text-sm text-gray-500">$0.00</div>
//                           <div className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Completed</div>
//                         </div>
//                         <div className="font-medium">$6,236.00</div>
//                       </div>
//                       <div className="flex items-center justify-between py-3">
//                         <div className="flex items-center gap-3">
//                           <div className="text-sm text-gray-500">Jan 15</div>
//                           <div className="text-sm text-gray-500">2:45 PM</div>
//                           <div className="font-medium">$1,896.00</div>
//                           <div className="text-sm text-gray-500">$0.00</div>
//                           <div className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Completed</div>
//                         </div>
//                         <div className="font-medium">$1,896.00</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Right Sidebar */}
//                 <div className="space-y-6">
//                   {/* Spending Chart */}
//                   <div>
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="text-lg font-semibold">Spending Chart</h3>
//                       <select className="text-sm text-gray-500 bg-transparent border-0 focus:outline-none">
//                         <option>Last 7 days</option>
//                       </select>
//                     </div>
//                     <div className="bg-gray-50 rounded-lg p-4 h-48 flex items-end justify-center gap-2">
//                       <div className="w-6 h-12 bg-gray-300 rounded-t"></div>
//                       <div className="w-6 h-8 bg-gray-300 rounded-t"></div>
//                       <div className="w-6 h-16 bg-gray-300 rounded-t"></div>
//                       <div className="w-6 h-6 bg-gray-300 rounded-t"></div>
//                       <div className="w-6 h-10 bg-gray-300 rounded-t"></div>
//                       <div className="w-6 h-4 bg-gray-300 rounded-t"></div>
//                       <div className="w-6 h-32 bg-sky-500 rounded-t relative">
//                         <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
//                           $2k
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Messages */}
//                   <div>
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="text-lg font-semibold">Messages</h3>
//                       <select className="text-sm text-gray-500 bg-transparent border-0 focus:outline-none">
//                         <option>Last 7 days</option>
//                       </select>
//                     </div>
//                     <div className="space-y-3">
//                       <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
//                         <Avatar className="w-8 h-8">
//                           <AvatarImage src="/joyce.png" />
//                           <AvatarFallback>J</AvatarFallback>
//                         </Avatar>
//                         <div className="flex-1">
//                           <div className="flex items-center gap-2 mb-1">
//                             <span className="font-medium text-sm">Joyce</span>
//                             <span className="text-xs text-gray-500">@joyce</span>
//                           </div>
//                           <div className="text-xs text-gray-500 mb-1">3 days ago</div>
//                           <div className="text-sm text-gray-700">
//                             Hello, I would like to request a new product, could you please check...
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
