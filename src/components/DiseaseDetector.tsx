import React, { useState, useRef } from 'react';
import { Camera, Upload, CheckCircle2, ChevronRight, Info, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { geminiService, DiseaseAnalysis } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

export const DiseaseDetector: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<DiseaseAnalysis | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError("Image size exceeds 10MB limit.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      setPreview(reader.result as string);
      setLoading(true);
      setError(null);
      setAnalysis(null);

      try {
        const result = await geminiService.analyzeCropDisease(base64);
        setAnalysis(result);
      } catch (err) {
        setError("AI analysis failed. Please ensure the image is clear and try again.");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const reset = () => {
    setAnalysis(null);
    setPreview(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-serif">Crop Diagnosis</h2>
        {preview && (
          <button 
            onClick={reset}
            className="text-brand-clay hover:text-brand-orange font-medium flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Restart
          </button>
        )}
      </div>

      {!preview ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="organic-card border-dashed border-2 hover:border-brand-olive group cursor-pointer p-12 flex flex-col items-center justify-center text-center space-y-4"
        >
          <div className="w-20 h-20 bg-brand-bg-soft rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Camera className="w-10 h-10 text-brand-moss" />
          </div>
          <div className="space-y-1">
            <p className="text-xl font-medium">Capture Leaf Photo</p>
            <p className="text-brand-moss">Snap a picture to instantly detect diseases with AI</p>
          </div>
          <div className="organic-button">
            <Upload className="w-4 h-4" />
            Select Image
          </div>
          <p className="text-xs text-brand-moss/40">Powered by Gemini 3 Flash</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="organic-card overflow-hidden sticky top-8 border-brand-border"
          >
            <div className="aspect-square bg-brand-bg-soft relative group">
              <img 
                src={preview} 
                alt="Crop preview" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/5 transition-opacity group-hover:opacity-0" />
            </div>
            {loading && (
              <div className="p-4 bg-brand-bg-soft border-t border-brand-border flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-brand-olive border-t-transparent rounded-full animate-spin" />
                <span className="font-medium text-brand-olive">AI is analyzing tissues...</span>
              </div>
            )}
          </motion.div>

          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-start gap-4"
                >
                  <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
                  <p className="text-red-700">{error}</p>
                </motion.div>
              )}

              {analysis && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="organic-card p-8 bg-brand-bg-soft/30 border-brand-border">
                    <div className="flex items-start justify-between mb-4">
                       <span className="pill-label">Detected Issue</span>
                       <div className="flex items-center gap-1 text-brand-moss font-bold">
                         <CheckCircle2 className="w-4 h-4" />
                         <span>{analysis.confidence}% Confidence</span>
                       </div>
                    </div>
                    <h3 className="text-4xl mb-4">{analysis.diseaseName}</h3>
                    <p className="text-lg text-brand-moss leading-relaxed italic">
                      {analysis.description}
                    </p>
                  </div>

                  <div className="grid gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Info className="w-5 h-5 text-brand-clay" />
                        <h4 className="text-xl">Immediate Treatment</h4>
                      </div>
                      <div className="space-y-3">
                        {analysis.treatment.map((item, i) => (
                          <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl border border-brand-border items-start">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-clay/10 text-brand-clay flex items-center justify-center font-bold text-sm">
                              {i + 1}
                            </span>
                            <span className="text-brand-moss leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-brand-olive" />
                        <h4 className="text-xl">Prevention Tips</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {analysis.preventiveTips.map((tip, i) => (
                          <span key={i} className="px-4 py-2 bg-brand-bg-soft text-brand-olive rounded-xl text-sm font-medium border border-brand-border">
                            {tip}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
      
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};
