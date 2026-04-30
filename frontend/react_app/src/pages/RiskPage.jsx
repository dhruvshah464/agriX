import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, AlertTriangle, TrendingDown, Umbrella, CheckCircle, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const riskData = [
  { month: 'Jan', drought: 10, flood: 5, pest: 20 },
  { month: 'Feb', drought: 15, flood: 8, pest: 18 },
  { month: 'Mar', drought: 25, flood: 12, pest: 30 },
  { month: 'Apr', drought: 40, flood: 5, pest: 45 },
  { month: 'May', drought: 60, flood: 2, pest: 50 },
  { month: 'Jun', drought: 75, flood: 0, pest: 65 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function RiskPage() {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto page-enter">
      <header className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-4 border border-rose-100">
          <ShieldAlert size={14} /> Actuarial AI Active
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Risk & Insurance</h1>
        <p className="text-slate-500 mt-2 text-lg">Predictive environmental risk modeling and policy management.</p>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-12 gap-6"
      >
        {/* Main Risk Chart */}
        <motion.div variants={itemVariants} className="md:col-span-8 card p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Operational Risk Forecast</h2>
              <p className="text-sm text-slate-500 mt-1">6-month projection based on climate and soil data</p>
            </div>
            <select className="input-field w-auto py-2 bg-slate-50">
              <option>North Farm Sector</option>
              <option>South Valley</option>
            </select>
          </div>
          <div className="h-[300px] w-full chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={riskData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDrought" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPest" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ fontSize: '13px', fontWeight: 500 }}
                />
                <Area type="monotone" dataKey="drought" name="Drought Probability %" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorDrought)" />
                <Area type="monotone" dataKey="pest" name="Pest Infestation %" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorPest)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Current Policies */}
        <motion.div variants={itemVariants} className="md:col-span-4 flex flex-col gap-6">
          <div className="card p-6 md:p-8 flex-1 bg-gradient-to-br from-slate-900 to-slate-800 border-none text-white overflow-hidden relative">
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[50%] bg-emerald-500/20 blur-[50px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <Umbrella className="w-10 h-10 text-emerald-400 mb-6" />
              <h2 className="text-2xl font-bold mb-1">Active Coverage</h2>
              <p className="text-slate-400 text-sm mb-8">Multi-Peril Crop Insurance (MPCI)</p>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-slate-300 text-sm">Policy Limit</span>
                  <span className="font-semibold">$2,500,000</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-slate-300 text-sm">Deductible</span>
                  <span className="font-semibold">$50,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm">Next Premium</span>
                  <span className="font-semibold text-emerald-400">Oct 15, 2026</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Risk Alerts */}
        <motion.div variants={itemVariants} className="md:col-span-12 card p-6 md:p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Activity className="text-blue-500" /> Live AI Risk Analysis
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 flex items-start gap-4">
              <div className="p-2 bg-amber-100 rounded-lg text-amber-600 mt-1">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h4 className="font-bold text-amber-900">Elevated Heat Stress</h4>
                <p className="text-sm text-amber-700 mt-1">Temperatures are projected to exceed 35°C for 5 consecutive days next month. Consider adjusting irrigation schedules.</p>
              </div>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 flex items-start gap-4">
              <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600 mt-1">
                <CheckCircle size={20} />
              </div>
              <div>
                <h4 className="font-bold text-emerald-900">Flood Risk Minimal</h4>
                <p className="text-sm text-emerald-700 mt-1">Recent soil drainage improvements have reduced standing water probability by 85%.</p>
              </div>
            </div>
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex items-start gap-4">
              <div className="p-2 bg-slate-200 rounded-lg text-slate-600 mt-1">
                <TrendingDown size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Market Volatility</h4>
                <p className="text-sm text-slate-600 mt-1">Soybean futures are trending down 4%. Hedging recommended before end of Q3.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
