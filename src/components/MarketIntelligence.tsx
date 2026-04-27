import React, { useState } from 'react';
import { TrendingUp, ArrowDown, ArrowUp, MapPin, Search, Calendar, ChevronDown, ListFilter } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';

const MOCK_PRICES = [
  { day: 'Mon', price: 2150, low: 2100 },
  { day: 'Tue', price: 2180, low: 2120 },
  { day: 'Wed', price: 2140, low: 2110 },
  { day: 'Thu', price: 2210, low: 2180 },
  { day: 'Fri', price: 2250, low: 2200 },
  { day: 'Sat', price: 2240, low: 2190 },
  { day: 'Sun', price: 2280, low: 2210 },
];

const COMMODITIES = [
  { name: 'Wheat (Sona)', price: 2280, change: '+4.2%', trend: 'up', location: 'Khanna, Punjab' },
  { name: 'Rice (Basmati)', price: 4150, change: '-1.5%', trend: 'down', location: 'Karnal, Haryana' },
  { name: 'Mustard Seeds', price: 5600, change: '+2.8%', trend: 'up', location: 'Alwar, Rajasthan' },
  { name: 'Onion (Red)', price: 1850, change: '+12.4%', trend: 'up', location: 'Nashik, Maharashtra' },
];

export const MarketIntelligence: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState(COMMODITIES[0]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl mb-2">Market Pulse</h2>
          <p className="text-brand-moss text-lg">Live Mandi intelligence & price trajectories</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-moss/40" />
             <input 
               type="text" 
               placeholder="Search Mandi..." 
               className="organic-input pl-11 w-64"
             />
          </div>
          <button className="p-3 bg-white border border-brand-border rounded-2xl hover:bg-brand-bg-soft transition-colors">
            <ListFilter className="w-5 h-5 text-brand-olive" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="organic-card p-8">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-bg-soft rounded-2xl flex items-center justify-center">
                   <TrendingUp className="text-brand-olive" />
                </div>
                <div>
                  <h3 className="text-2xl">{selectedCrop.name} Price Trend</h3>
                  <div className="flex items-center gap-2 text-brand-moss text-sm">
                    <MapPin className="w-3 h-3" />
                    <span>Primary Market: {selectedCrop.location}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-brand-text">₹{selectedCrop.price}</div>
                <div className={`flex items-center justify-end gap-1 font-bold ${selectedCrop.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedCrop.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  <span>{selectedCrop.change}</span>
                </div>
              </div>
            </div>

            <div className="h-[350px] w-full -ml-8">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_PRICES}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#5A5A40" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#5A5A40" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: '1px solid #E6E6D4', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', backgroundColor: '#fff' }}
                    itemStyle={{ color: '#3D3D29', fontWeight: 'bold' }}
                    labelStyle={{ color: '#8C8C66', fontWeight: '600' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#5A5A40" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorPrice)" 
                  />
                  <CartesianGrid vertical={false} stroke="#E6E6D4" strokeDasharray="3 3" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#8C8C66', fontSize: 12, fontWeight: 600 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-8 flex justify-between items-center pt-8 border-t border-brand-border">
              <div className="flex gap-4">
                 <button className="px-4 py-2 bg-brand-olive text-white rounded-xl text-sm font-bold">1 Week</button>
                 <button className="px-4 py-2 hover:bg-brand-bg-soft text-brand-moss rounded-xl text-sm font-bold transition-colors">1 Month</button>
                 <button className="px-4 py-2 hover:bg-brand-bg-soft text-brand-moss rounded-xl text-sm font-bold transition-colors">Season</button>
              </div>
              <div className="flex items-center gap-2 text-brand-moss/40 text-[10px] font-bold uppercase tracking-widest">
                <Calendar className="w-4 h-4" />
                <span>Last updated 24m ago</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl px-2 flex items-center justify-between">
            Commodities Near You
            <ChevronDown className="w-5 h-5 text-brand-moss/30" />
          </h3>
          <div className="space-y-4">
            {COMMODITIES.map((crop, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 5 }}
                onClick={() => setSelectedCrop(crop)}
                className={`organic-card p-5 cursor-pointer flex items-center justify-between group ${selectedCrop.name === crop.name ? 'border-brand-olive ring-4 ring-brand-olive/5' : ''}`}
              >
                <div className="flex items-center gap-4 text-left">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${selectedCrop.name === crop.name ? 'bg-brand-olive text-white' : 'bg-brand-bg-soft text-brand-olive group-hover:bg-brand-border'}`}>
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xl leading-tight">{crop.name}</h4>
                    <p className="text-xs text-brand-moss">{crop.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-brand-text">₹{crop.price}</div>
                  <div className={`text-[10px] font-bold ${crop.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {crop.change}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="organic-card p-6 bg-brand-clay text-white border-none shadow-lg shadow-brand-clay/20 relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                <ArrowUp className="w-6 h-6" />
                <h4 className="text-2xl">Smart Advice</h4>
              </div>
              <p className="text-brand-cream/90 text-sm leading-relaxed italic">
                "Wheat prices in Khanna are peaking. Consider offloading 40% of inventory before next Wednesday."
              </p>
              <button className="w-full py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl font-bold text-sm transition-colors uppercase tracking-widest">
                Set Alert
              </button>
            </div>
            <ArrowUp className="absolute -bottom-8 -right-8 w-40 h-40 opacity-10 -rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
};
