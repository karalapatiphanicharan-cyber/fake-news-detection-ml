import React from 'react';
import Hero from './components/Hero';
import AnalyzerCard from './components/AnalyzerCard';
import ResultsSection from './components/ResultsSection';
import HistoryPanel from './components/HistoryPanel';
import StatsCards from './components/StatsCards';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import URLAnalyzer from './components/URLAnalyzer';
import PredictionInsights from './components/PredictionInsights';
import ParticlesBackground from './components/ParticlesBackground';
import SkeletonLoader from './components/SkeletonLoader';
import { usePredict } from './hooks/usePredict';
import { FileDown, ShieldCheck, Zap } from 'lucide-react';
import { exportResultToPDF } from './services/pdfExport';

function App() {
  const {
    isLoading,
    result,
    error,
    history,
    stats,
    analyze,
    analyzeNewsUrl,
    deleteHistoryItem,
    clearResult,
    clearHistory
  } = usePredict();

  const handleExportPDF = () => {
    if (result) {
      exportResultToPDF({
        prediction: result.prediction,
        confidence: result.confidence,
        timestamp: new Date().toISOString(),
        text: result.originalText || "No content provided."
      });
    }
  };

  const resultId = React.useMemo(() => {
    if (!result) return "";
    // Stable pseudo-random ID based on result properties to satisfy purity rules
    const seed = result.prediction.length + result.confidence;
    return `RES-${Math.floor(seed * 1000).toString(36)}`;
  }, [result]);

  return (
    <div className="min-h-screen bg-ai-gradient overflow-x-hidden text-slate-200">
      <ParticlesBackground />

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] bg-emerald-600/5 rounded-full blur-[120px] animate-pulse-slow" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <nav className="flex justify-between items-center py-8 mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-premium-gradient rounded-lg shadow-lg shadow-blue-500/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white italic">VERIFY.AI</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-xs font-bold uppercase tracking-widest text-gray-500">
            <a href="#" className="hover:text-blue-400 transition-colors">Analyzer</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Analytics</a>
            <a href="#" className="hover:text-blue-400 transition-colors">API</a>
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all">Documentation</button>
          </div>
        </nav>

        <Hero />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-8 space-y-8">
            <StatsCards
              totalAnalyses={stats.totalAnalyses}
              averageConfidence={stats.averageConfidence}
              realCount={stats.realCount}
              fakeCount={stats.fakeCount}
            />

            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-2 px-1">
                <Zap className="w-4 h-4 text-blue-400" />
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">Intelligence Hub</h2>
              </div>

              <URLAnalyzer
                onAnalyze={analyzeNewsUrl}
                isLoading={isLoading}
              />

              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/5 blur-3xl -z-10 rounded-full" />
                <AnalyzerCard
                  onAnalyze={analyze}
                  isLoading={isLoading}
                  onClear={clearResult}
                />
              </div>
            </div>

            {isLoading && <SkeletonLoader />}

            {result && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-2 px-1">
                  <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                    <span>Analysis Result</span>
                    <span className="text-xs font-normal text-gray-500 font-mono bg-white/5 px-2 py-0.5 rounded">ID: {resultId}</span>
                  </h3>
                  <button
                    onClick={handleExportPDF}
                    className="flex items-center space-x-2 text-xs font-bold bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl transition-all"
                  >
                    <FileDown className="w-4 h-4 text-blue-400" />
                    <span>Export PDF</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <ResultsSection
                    prediction={result.prediction}
                    confidence={result.confidence}
                    error={error}
                  />
                  <PredictionInsights confidence={result.confidence} />
                </div>
              </div>
            )}

            {error && !result && (
               <ResultsSection
               prediction={null}
               confidence={null}
               error={error}
             />
            )}

            <AnalyticsDashboard history={history} />
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-8">
              <HistoryPanel
                history={history}
                onClear={clearHistory}
                onDeleteItem={deleteHistoryItem}
              />

              <div className="mt-8 glass-card p-6 border-l-4 border-l-blue-500 bg-premium-gradient/5">
                <h3 className="text-lg font-bold mb-3 text-white">AI Capabilities</h3>
                <ul className="space-y-3">
                  {[
                    "Linguistic Pattern Recognition",
                    "Semantic Consistency Check",
                    "URL Content Auto-Extraction",
                    "Real-time Probability Mapping"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start space-x-2 text-xs text-gray-400">
                      <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="relative z-10 py-16 text-center border-t border-white/5 bg-dark-lighter/30">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-2 opacity-50">
            <div className="p-1 bg-blue-500 rounded text-white">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="font-bold tracking-tighter text-white italic">VERIFY.AI</span>
          </div>
          <div className="text-gray-500 text-xs font-medium">
            © 2026 Fake News Detection AI. Built for Professional Portfolio.
          </div>
          <div className="flex space-x-6 text-gray-500">
            <a href="#" className="hover:text-blue-400 transition-colors"><Zap className="w-4 h-4" /></a>
            <a href="#" className="hover:text-blue-400 transition-colors"><ShieldCheck className="w-4 h-4" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
