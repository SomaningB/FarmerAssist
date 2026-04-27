import React, { useState } from 'react';
import { 
  Sprout, 
  Search, 
  LayoutDashboard, 
  Stethoscope, 
  TrendingUp, 
  Bell, 
  Menu, 
  X,
  MapPin,
  Settings,
  HelpCircle,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DiseaseDetector } from './components/DiseaseDetector';
import { MarketIntelligence } from './components/MarketIntelligence';
import { RiskIndicator } from './components/RiskIndicator';

type NavTab = 'overview' | 'diagnostics' | 'market';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavItem = ({ id, label, icon: Icon }: { id: NavTab, label: string, icon: any }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setIsMenuOpen(false);
      }}
      className={`flex items-center gap-3 px-6 py-4 rounded-3xl transition-all duration-300 w-full group ${
        activeTab === id 
          ? 'bg-brand-moss text-white shadow-lg shadow-brand-olive/20 px-8' 
          : 'text-brand-moss hover:bg-brand-bg-soft'
      }`}
    >
      <Icon className={`w-6 h-6 transition-transform group-hover:scale-110 ${activeTab === id ? 'text-white' : 'text-brand-moss/60'}`} />
      <span className="text-lg font-medium">{label}</span>
      {activeTab === id && (
        <motion.div 
          layoutId="active-pill"
          className="ml-auto w-2 h-2 bg-white rounded-full"
        />
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-brand-border p-4 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-olive rounded-2xl flex items-center justify-center">
            <Sprout className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl mt-1">KisanSetu</h1>
        </div>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 bg-brand-bg-soft rounded-xl text-brand-olive"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-0 z-40 lg:relative lg:translate-x-0 transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:w-96 min-h-screen bg-brand-olive flex flex-col flex-shrink-0 p-8`}>
        <div className="hidden lg:flex items-center gap-4 mb-16 text-white">
          <div className="w-14 h-14 bg-brand-moss rounded-[24px] flex items-center justify-center shadow-lg shadow-black/10">
            <Sprout className="text-white w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl leading-tight">KisanSetu</h1>
            <p className="text-brand-cream/40 uppercase tracking-widest text-[10px] font-bold">Farmer Intelligence</p>
          </div>
        </div>

        <nav className="space-y-4 flex-grow">
          <NavItem id="overview" label="Overview" icon={LayoutDashboard} />
          <NavItem id="diagnostics" label="Diagnostics" icon={Stethoscope} />
          <NavItem id="market" label="Market Pulse" icon={TrendingUp} />
        </nav>

        <div className="mt-auto space-y-6 pt-8 border-t border-white/10">
           <div className="bg-white/10 rounded-3xl p-6 flex items-center gap-4 text-white">
             <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shadow-sm backdrop-blur-md">
               <User className="text-white" />
             </div>
             <div>
               <p className="text-sm font-bold">Somaning B.</p>
               <div className="flex items-center gap-1 text-[10px] text-brand-cream/60 font-bold uppercase tracking-widest">
                 <MapPin className="w-2.5 h-2.5" />
                 <span>Belagavi, KA</span>
               </div>
             </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
             <button className="flex flex-col items-center gap-2 p-4 bg-olive-50/50 rounded-2xl text-olive-300 hover:text-olive-600 transition-colors">
               <Settings className="w-5 h-5" />
               <span className="text-[10px] uppercase font-bold tracking-widest leading-none">Settings</span>
             </button>
             <button className="flex flex-col items-center gap-2 p-4 bg-olive-50/50 rounded-2xl text-olive-300 hover:text-olive-600 transition-colors">
               <HelpCircle className="w-5 h-5" />
               <span className="text-[10px] uppercase font-bold tracking-widest leading-none">Help</span>
             </button>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-4 lg:p-12 overflow-y-auto max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-4">
                  <h2 className="text-5xl lg:text-7xl leading-tight max-w-2xl italic">Empowering your sustainable <span className="text-brand-moss not-italic">harvest cycle</span></h2>
                  <p className="text-brand-moss text-xl max-w-xl">Namaste, Ramesh. Your fields look healthy today.</p>
                </div>
                <div className="flex items-center gap-4">
                   <button className="w-16 h-16 rounded-full bg-white border border-brand-border flex items-center justify-center relative hover:bg-brand-bg-soft transition-colors shadow-sm">
                     <Bell className="text-brand-olive w-6 h-6" />
                     <span className="absolute top-4 right-4 w-3 h-3 bg-brand-clay rounded-full border-2 border-white" />
                   </button>
                   <button className="organic-button text-lg h-16 px-10">
                    Quick Action
                   </button>
                </div>
              </div>

              <div className="grid lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3">
                  <RiskIndicator />
                </div>
                <div className="lg:col-span-2 space-y-8">
                   <div className="organic-card p-10 bg-brand-olive text-white relative overflow-hidden h-[260px] flex flex-col justify-between border-none">
                     <div className="relative z-10 space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Weather Update</p>
                        <h3 className="text-6xl flex items-baseline gap-2">31° <span className="text-2xl font-sans opacity-60">C</span></h3>
                        <p className="text-lg opacity-80">Sunny · Light breeze</p>
                     </div>
                     <div className="relative z-10 font-bold bg-white/10 w-fit px-4 py-2 rounded-full text-xs backdrop-blur-md">
                        Zero rain probability
                     </div>
                     <Sprout className="absolute -bottom-8 -right-8 w-48 h-48 opacity-10 rotate-12" />
                   </div>

                   <div className="organic-card p-8 bg-[#F27D26] text-white border-none">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                          <TrendingUp className="text-white" />
                        </div>
                        <h4 className="text-2xl">Mandi Forecast</h4>
                      </div>
                      <p className="text-white/90 mb-6 leading-relaxed italic">"Onion prices in Nashik have jumped 12% today. Target price ₹2,450 reached."</p>
                      <button 
                        onClick={() => setActiveTab('market')}
                        className="text-white font-bold flex items-center gap-2 group underline underline-offset-4 decoration-white/30 hover:decoration-white transition-all"
                      >
                        Sell Now
                        <TrendingUp className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'diagnostics' && (
            <motion.div
              key="diagnostics"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <DiseaseDetector />
            </motion.div>
          )}

          {activeTab === 'market' && (
            <motion.div
              key="market"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <MarketIntelligence />
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-24 pt-12 border-t border-brand-border flex flex-col md:flex-row justify-between items-center gap-8 pb-12">
          <div className="flex items-center gap-3">
            <Sprout className="text-brand-moss/40" />
            <span className="text-brand-moss/40 font-serif text-xl">KisanSetu • Harvest 2026</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-brand-moss/60 hover:text-brand-olive text-sm font-medium transition-colors">Privacy Policy</a>
            <a href="#" className="text-brand-moss/60 hover:text-brand-olive text-sm font-medium transition-colors">Contact Support</a>
            <a href="#" className="text-brand-moss/60 hover:text-brand-olive text-sm font-medium transition-colors">Community Forum</a>
          </div>
        </footer>
      </main>
    </div>
  );
}

