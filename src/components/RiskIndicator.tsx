import React, { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, CloudRain, Thermometer, Info, ChevronRight, Wind } from 'lucide-react';
import { motion } from 'motion/react';
import { geminiService, RiskAnalysis } from '../services/geminiService';

export const RiskIndicator: React.FC = () => {
  const [risk, setRisk] = useState<RiskAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial fetch
    const fetchRisk = async () => {
      try {
        const result = await geminiService.calculateRiskScore({
          weather: "High humidity (85%), Temp 28°C, Light rain forecast",
          cropType: "Wheat & Mustard",
          location: "Punjab Region"
        });
        setRisk(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRisk();
  }, []);

  const getRiskColor = (level: string) => {
    switch(level) {
      case 'Low': return 'text-green-600';
      case 'Moderate': return 'text-brand-moss';
      case 'High': return 'text-brand-clay';
      case 'Critical': return 'text-red-600';
      default: return 'text-brand-olive';
    }
  };

  const getRiskBg = (level: string) => {
    switch(level) {
      case 'Low': return 'bg-green-50 border-green-100';
      case 'Moderate': return 'bg-brand-bg-soft border-brand-border';
      case 'High': return 'bg-brand-clay/10 border-brand-clay/20';
      case 'Critical': return 'bg-red-50 border-red-100';
      default: return 'bg-brand-bg-soft border-brand-border';
    }
  };

  if (loading) {
    return (
      <div className="organic-card p-8 h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-bg-soft border-t-brand-olive rounded-full animate-spin" />
          <p className="text-brand-moss/40 font-serif text-xl">Assessing regional risks...</p>
        </div>
      </div>
    );
  }

  if (!risk) return null;

  return (
    <div className="organic-card overflow-hidden h-full">
      <div className="p-8 border-b border-brand-border bg-brand-bg-soft/30">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="pill-label mb-2">Regional Status</span>
            <h2 className="text-3xl text-brand-text">Health & Risk Index</h2>
          </div>
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-brand-border shadow-sm">
            <AlertTriangle className={getRiskColor(risk.level)} />
          </div>
        </div>

        <div className="relative pt-8 pb-4">
          <div className="flex justify-between items-end mb-4">
            <span className={`text-6xl font-bold font-serif ${getRiskColor(risk.level)}`}>{risk.score}</span>
            <div className="text-right">
              <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getRiskBg(risk.level)} ${getRiskColor(risk.level)}`}>
                {risk.level} Risk
              </span>
            </div>
          </div>
          <div className="h-2 bg-brand-bg-soft rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${risk.score}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full ${risk.score > 70 ? 'bg-red-500' : risk.score > 40 ? 'bg-brand-clay' : 'bg-brand-moss'}`}
            />
          </div>
          <div className="flex justify-between mt-2 text-[10px] font-bold text-brand-moss/30 uppercase tracking-widest">
            <span>Minimum</span>
            <span>Critical</span>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-brand-bg-soft/50 space-y-2 border border-brand-border/40">
            <CloudRain className="w-5 h-5 text-brand-clay" />
            <p className="text-[10px] uppercase font-bold text-brand-moss/40 tracking-wider">Weather</p>
            <p className="text-xs font-medium text-brand-text leading-tight">{risk.factors.weather}</p>
          </div>
          <div className="p-4 rounded-2xl bg-brand-bg-soft/50 space-y-2 border border-brand-border/40">
            <TrendingUp className="w-5 h-5 text-brand-olive" />
            <p className="text-[10px] uppercase font-bold text-brand-moss/40 tracking-wider">Disease</p>
            <p className="text-xs font-medium text-brand-text leading-tight">{risk.factors.disease}</p>
          </div>
          <div className="p-4 rounded-2xl bg-brand-bg-soft/50 space-y-2 border border-brand-border/40">
            <Wind className="w-5 h-5 text-brand-moss" />
            <p className="text-[10px] uppercase font-bold text-brand-moss/40 tracking-wider">Soil/Yield</p>
            <p className="text-xs font-medium text-brand-text leading-tight">{risk.factors.soil}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-brand-clay" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-moss">Recommended Action</span>
          </div>
          <div className="p-4 bg-brand-bg-soft rounded-2xl italic text-sm text-brand-moss">
            "{risk.recommendations[0] || 'Monitor field closely for potential outbreaks.'}"
          </div>
        </div>
      </div>
    </div>
  );
};
