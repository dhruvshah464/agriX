import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, ArrowRight, CloudSun, Map, Bot, ShieldCheck, Sprout, TrendingUp, LocateFixed } from 'lucide-react';

const ParallaxHero = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const yText = useTransform(scrollY, [0, 500], [0, 100]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);
  
  // 3D Mouse tracking for dashboard mockup
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (clientY / innerHeight - 0.5) * 2; // -1 to 1
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Use springs for smooth 3D rotation
  const rotateX = useSpring(isHovering ? mousePosition.y * -15 : 0, { stiffness: 100, damping: 30 });
  const rotateY = useSpring(isHovering ? mousePosition.x * 15 : 0, { stiffness: 100, damping: 30 });

  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 perspective-[2000px]">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] bg-emerald-200/40 blur-[120px] rounded-full mix-blend-multiply pointer-events-none" />
      <div className="absolute top-[10%] right-[-10%] w-[40%] h-[50%] bg-blue-200/40 blur-[120px] rounded-full mix-blend-multiply pointer-events-none" />

      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="max-w-5xl mx-auto text-center relative z-20"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-emerald-100 shadow-sm mb-8">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">AgriX OS 2.0 is live</span>
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-[5rem] font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6"
        >
          Intelligence for <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600">Global Agriculture.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl text-slate-500 font-medium max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Harness the power of geospatial data, predictive climate modeling, and conversational AI. Manage millions of acres from a single, stunning interface.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/login" className="btn-primary text-lg px-8 py-4 rounded-2xl group w-full sm:w-auto shadow-xl shadow-emerald-500/20">
            Start Free Trial
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>

      {/* 3D Dashboard Mockup */}
      <motion.div
        ref={containerRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{ rotateX, rotateY }}
        className="mt-20 max-w-6xl mx-auto relative z-30 transform-gpu preserve-3d"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 to-transparent z-40 h-full pointer-events-none rounded-[32px] translate-z-[1px]" />
        
        <div className="bg-white/80 backdrop-blur-2xl p-3 rounded-[32px] shadow-2xl shadow-emerald-900/10 border border-white/60">
          <div className="bg-slate-50 h-[400px] md:h-[600px] w-full rounded-[24px] overflow-hidden relative border border-slate-100 shadow-inner flex flex-col">
            {/* Fake Dashboard Header */}
            <div className="h-16 border-b border-slate-200/60 flex items-center px-6 justify-between bg-white/50 backdrop-blur-md">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="w-48 h-6 bg-slate-200/50 rounded-md" />
              <div className="w-8 h-8 bg-emerald-100 rounded-full" />
            </div>
            
            {/* Fake Dashboard Grid */}
            <div className="flex-1 p-6 grid grid-cols-12 gap-6 relative">
              {/* Floating UI Elements for 3D depth */}
              <motion.div 
                style={{ translateZ: 50 }} 
                className="absolute top-10 right-10 w-64 h-32 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4"
              >
                <div className="w-10 h-10 bg-emerald-100 rounded-xl mb-3 flex items-center justify-center">
                  <TrendingUp className="text-emerald-600 w-5 h-5" />
                </div>
                <div className="w-3/4 h-4 bg-slate-200 rounded mb-2" />
                <div className="w-1/2 h-4 bg-emerald-100 rounded" />
              </motion.div>

              <div className="col-span-3 h-full bg-white rounded-2xl shadow-sm border border-slate-100 p-4 space-y-3">
                <div className="w-full h-8 bg-slate-100 rounded-lg mb-6" />
                {[1,2,3,4,5].map(i => <div key={i} className="w-full h-10 bg-slate-50 rounded-lg" />)}
              </div>
              <div className="col-span-9 grid grid-rows-2 gap-6">
                <div className="grid grid-cols-3 gap-6">
                  {[1,2,3].map(i => (
                    <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 relative overflow-hidden">
                      <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-50 rounded-bl-full opacity-50" />
                      <div className="w-12 h-12 bg-slate-100 rounded-xl mb-4" />
                      <div className="w-1/2 h-5 bg-slate-200 rounded mb-2" />
                      <div className="w-1/3 h-4 bg-slate-100 rounded" />
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between relative overflow-hidden">
                   <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                   <div className="w-1/4 h-6 bg-slate-200 rounded" />
                   <div className="w-full h-32 bg-emerald-50 rounded-xl mt-4 border border-emerald-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const BentoCard = ({ title, description, icon: Icon, span, children, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
    className={`bg-white rounded-[32px] border border-slate-100 shadow-lg shadow-slate-200/40 p-8 flex flex-col group overflow-hidden relative ${span}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/50 pointer-events-none" />
    <div className="relative z-10 flex flex-col h-full">
      <div className="mb-auto">
        <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
          <Icon className="w-7 h-7 text-slate-700" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-600 leading-relaxed font-medium">{description}</p>
      </div>
      <div className="mt-8 relative z-0">
        {children}
      </div>
    </div>
  </motion.div>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden font-sans selection:bg-emerald-200 selection:text-emerald-900">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 bg-white/60 backdrop-blur-xl border-b border-white/20 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-md shadow-emerald-500/20">
              <Leaf size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">AgriX</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors hidden md:block">Login</Link>
            <Link to="/login" className="btn-primary py-2.5 px-6 text-sm rounded-xl">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* 3D Parallax Hero */}
      <ParallaxHero />

      {/* Bento Grid Features */}
      <section className="py-32 px-6 bg-slate-50 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">A unified operating system.</h2>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">Everything you need to predict, optimize, and manage your agricultural operations in one seamless experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
            {/* Feature 1: Geospatial */}
            <BentoCard 
              span="md:col-span-2"
              title="Geospatial Intelligence" 
              description="Sub-meter resolution satellite imagery processed in real-time to generate NDVI health indices and productivity heatmaps."
              icon={Map}
              delay={0.1}
            >
              <div className="absolute -bottom-10 -right-10 w-[120%] h-[200px] bg-slate-100 rounded-tl-3xl border border-slate-200 p-4 transform rotate-[-5deg] group-hover:rotate-0 transition-transform duration-700 ease-out flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#10b981 2px, transparent 2px)', backgroundSize: '15px 15px' }} />
                <LocateFixed className="w-20 h-20 text-emerald-300 absolute" />
              </div>
            </BentoCard>

            {/* Feature 2: Yield Lab */}
            <BentoCard 
              span="md:col-span-1"
              title="Predictive Yield Lab" 
              description="XGBoost machine learning models ingest millions of data points to predict harvest outcomes with extreme accuracy."
              icon={Sprout}
              delay={0.2}
            >
              <div className="w-full h-[150px] bg-gradient-to-t from-emerald-50 to-transparent rounded-2xl border border-emerald-100 flex items-end p-4">
                 <div className="flex w-full items-end gap-2 h-full">
                    {[40, 60, 45, 80, 65, 95].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + (i * 0.1) }}
                        className="flex-1 bg-emerald-400 rounded-t-sm"
                      />
                    ))}
                 </div>
              </div>
            </BentoCard>

            {/* Feature 3: RAG Assistant */}
            <BentoCard 
              span="md:col-span-1"
              title="Agronomy AI Engine" 
              description="Talk to your data. Our LangChain RAG assistant queries scientific datasets and your telemetry simultaneously."
              icon={Bot}
              delay={0.3}
            >
              <div className="w-full bg-slate-100 rounded-2xl border border-slate-200 p-4 space-y-3 transform group-hover:translate-y-[-10px] transition-transform duration-500">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-300 flex-shrink-0" />
                  <div className="h-6 w-3/4 bg-slate-200 rounded-full" />
                </div>
                <div className="flex gap-3 flex-row-reverse">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex-shrink-0" />
                  <div className="h-12 w-4/5 bg-emerald-100 rounded-xl" />
                </div>
              </div>
            </BentoCard>

            {/* Feature 4: Climate Hub */}
            <BentoCard 
              span="md:col-span-2"
              title="Hyper-Local Climate Forecasts" 
              description="Advanced time-series forecasting utilizing Facebook Prophet to predict micro-climate changes and mitigate environmental risk."
              icon={CloudSun}
              delay={0.4}
            >
               <div className="absolute -bottom-4 left-8 right-8 h-[180px] bg-white rounded-t-[32px] border-t border-l border-r border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] p-6 group-hover:translate-y-[-10px] transition-transform duration-700 flex justify-between items-end">
                  <div className="w-16 h-24 bg-blue-50 rounded-full flex flex-col items-center py-3 border border-blue-100">
                    <CloudSun className="text-blue-400 mb-auto" />
                    <span className="font-bold text-blue-900">24°</span>
                  </div>
                  <div className="w-16 h-32 bg-amber-50 rounded-full flex flex-col items-center py-3 border border-amber-100">
                    <CloudSun className="text-amber-500 mb-auto" />
                    <span className="font-bold text-amber-900">28°</span>
                  </div>
                  <div className="w-16 h-28 bg-blue-50 rounded-full flex flex-col items-center py-3 border border-blue-100">
                    <CloudSun className="text-blue-400 mb-auto" />
                    <span className="font-bold text-blue-900">26°</span>
                  </div>
                  <div className="w-16 h-20 bg-slate-50 rounded-full flex flex-col items-center py-3 border border-slate-200">
                    <CloudSun className="text-slate-400 mb-auto" />
                    <span className="font-bold text-slate-700">21°</span>
                  </div>
               </div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900" />
        <div className="absolute top-[-50%] left-[-20%] w-[70%] h-[150%] bg-emerald-900/40 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-8">
            Ready to upgrade your farm?
          </h2>
          <p className="text-xl text-slate-400 font-medium mb-12">
            Join the leading agricultural enterprises relying on AgriX intelligence.
          </p>
          <Link to="/login" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 text-lg font-bold rounded-2xl transition-all active:scale-[0.98]">
            Get Started Now
            <ArrowRight className="w-5 h-5 ml-1" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-3 mb-6 md:mb-0">
            <Leaf size={24} className="text-emerald-500" />
            <span className="text-xl font-bold text-white tracking-tight">AgriX</span>
          </div>
          <div className="flex gap-8 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">Platform</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
