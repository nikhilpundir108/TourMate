"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import ReactMarkdown from "react-markdown";
import { Sparkles, Calendar, Loader } from "lucide-react";

export default function ItineraryPage() {
  const { user, isLoaded } = useUser();
  const [itinerary, setItinerary] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      setIsLoading(false);
      return;
    }

    const fetchItinerary = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const res = await fetch(`/api/itinerary`);
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch itinerary");
        }
        
        setItinerary(data.itinerary);
      } catch (err: unknown) {
        const errorVal = err as Error;
        setError(errorVal.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItinerary();
  }, [user, isLoaded]);

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-[calc(100-4rem)] bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-6 relative overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none" />
        <div className="bg-slate-900/40 border border-slate-900 p-12 rounded-3xl shadow-2xl flex flex-col justify-center items-center text-center max-w-sm w-full backdrop-blur-md relative z-10">
          <Loader className="w-12 h-12 text-blue-500 animate-spin mb-6" />
          <h3 className="text-xl font-bold text-slate-100">Generating Trip Itinerary</h3>
          <p className="text-sm text-slate-400 mt-2">
            Gemini is tailoring your custom plan, local highlights, and budget estimates...
          </p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="min-h-[calc(100-4rem)] bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-6">
        <div className="bg-slate-900/40 border border-slate-900 p-8 rounded-3xl text-center max-w-sm w-full">
          <p className="text-slate-350">Please sign in to view your itinerary.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100-4rem)] bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-6">
        <div className="bg-slate-900/40 border border-red-950 p-8 rounded-3xl text-center max-w-sm w-full">
          <p className="text-red-400 font-medium">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100-4rem)] bg-slate-950 text-slate-100 py-12 px-6 relative overflow-hidden">
      {/* Background Decorative Gradient */}
      <div className="absolute top-[5%] left-[5%] w-[45%] h-[45%] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b border-slate-900 pb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-950 border border-indigo-900 flex items-center justify-center text-indigo-400">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Your AI-Generated Itinerary
              </h1>
              <p className="text-sm text-slate-450 mt-1">
                Custom travel guide curated by Gemini
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-full px-4.5 py-2 text-xs text-blue-400 font-semibold self-start md:self-auto">
            <Sparkles className="w-4 h-4" />
            <span>AI Powered</span>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-slate-900/30 border border-slate-900 p-8 md:p-12 rounded-3xl shadow-2xl backdrop-blur-md">
          <article className="prose prose-invert max-w-none prose-headings:text-slate-100 prose-headings:font-bold prose-p:text-slate-350 prose-li:text-slate-350 prose-strong:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-hr:border-slate-900">
            <ReactMarkdown>{itinerary}</ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
}