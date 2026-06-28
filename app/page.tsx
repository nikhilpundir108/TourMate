import Link from "next/link";
import { Sparkles, Compass, ShieldCheck, Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <div className="flex-1 max-w-6xl mx-auto px-6 py-20 flex flex-col justify-center items-center text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5 text-xs text-blue-400 font-medium mb-8 shadow-inner animate-pulse">
          <Sparkles className="w-4.5 h-4.5" />
          <span>Generative AI-Powered Travel Planning</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-6">
          Your Next Adventure,<br />
          <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Redefined by AI</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
          Plan custom, budget-conscious trips in seconds. Tour Mate generates day-by-day itineraries tailored to your style while connecting you directly with authentic local homestays and guides.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-sm sm:max-w-none">
          <Link
            href="/preferences"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all text-center"
          >
            Start Planning
          </Link>
          <Link
            href="/destinations"
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 hover:border-slate-700 font-semibold px-8 py-4 rounded-xl transition-all text-center"
          >
            Explore Destinations
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full">
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-900 hover:border-slate-800 p-8 rounded-2xl transition-all hover:translate-y-[-4px] text-left">
            <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-900 flex items-center justify-center mb-6">
              <Compass className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-2">Smart Itineraries</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Personalized itineraries compiled instantly from your destination, travel style, and budget preferences.
            </p>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-900 hover:border-slate-800 p-8 rounded-2xl transition-all hover:translate-y-[-4px] text-left">
            <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-900 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-2">Verified Offerings</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Discover hostings, traditional dining spots, and local services backed by trusted operators.
            </p>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-900 hover:border-slate-800 p-8 rounded-2xl transition-all hover:translate-y-[-4px] text-left">
            <div className="w-12 h-12 rounded-xl bg-purple-950 border border-purple-900 flex items-center justify-center mb-6">
              <Heart className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-2">Support Local Communities</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Promote eco-tourism and directly contribute to regional economies by booking certified homestays and guides.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
