import Hero from './components/Hero';
import AnalyzerCard from './components/AnalyzerCard';
import ResultsSection from './components/ResultsSection';
import HistoryPanel from './components/HistoryPanel';
import StatsCards from './components/StatsCards';
import { usePredict } from './hooks/usePredict';

function App() {
  const {
    isLoading,
    result,
    error,
    history,
    stats,
    analyze,
    clearResult,
    clearHistory
  } = usePredict();

  return (
    <div className="min-h-screen bg-ai-gradient overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-20">
        <Hero />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <StatsCards
              totalAnalyses={stats.totalAnalyses}
              averageConfidence={stats.averageConfidence}
            />

            <AnalyzerCard
              onAnalyze={analyze}
              isLoading={isLoading}
              onClear={clearResult}
            />

            <ResultsSection
              prediction={result?.prediction || null}
              confidence={result?.confidence || null}
              error={error}
            />

            <div className="glass-card p-6 border-l-4 border-l-blue-500">
              <h3 className="text-lg font-bold mb-2">About this AI</h3>
              <p className="text-gray-400 text-sm">
                This system utilizes a Passive Aggressive Classifier combined with TF-IDF vectorization to detect nuances in news reporting.
                The confidence score represents the model's certainty based on linguistic patterns discovered during training.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <HistoryPanel
              history={history}
              onClear={clearHistory}
            />
          </div>
        </div>
      </div>

      <footer className="relative z-10 py-12 text-center text-gray-600 text-sm border-t border-white/5">
        <p>© 2026 Fake News Detection AI Project • Phase 3 Frontend</p>
      </footer>
    </div>
  );
}

export default App;
