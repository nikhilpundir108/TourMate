"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";

export default function PreferencesPage() {
  const { user } = useUser();
  const [form, setForm] = useState({
    destination: "",
    travelType: "",
    budget: "",
    duration: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("Please log in");

    setIsSubmitting(true);
    const res = await fetch("/api/preferences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, userId: user.id }),
    });
    setIsSubmitting(false);

    if (res.ok) {
      window.location.href = "/itinerary"; // redirect to itinerary
    } else {
      alert("Failed to save preferences.");
    }
  };

  return (
    <div className="min-h-[calc(100-4rem)] bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Background Decorative Gradient */}
      <div className="absolute top-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-md border border-slate-900 p-8 rounded-3xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-blue-950 border border-blue-900/50 text-blue-400 mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-white to-slate-350 bg-clip-text text-transparent">
            Plan Your Journey
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Enter your destination and vibe to build your AI itinerary
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Destination</label>
            <input
              type="text"
              placeholder="e.g., Goa, Jaipur, Manali"
              className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              value={form.destination}
              onChange={(e) => setForm({ ...form, destination: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Travel Vibe / Type</label>
            <input
              type="text"
              placeholder="e.g., Adventure, Relaxing, Cultural"
              className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              value={form.travelType}
              onChange={(e) => setForm({ ...form, travelType: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Budget</label>
              <input
                type="text"
                placeholder="e.g., ₹20000"
                className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Duration (days)</label>
              <input
                type="number"
                min="1"
                placeholder="e.g., 3"
                className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/25 transition-all text-sm mt-4 cursor-pointer"
          >
            {isSubmitting ? "Generating Plan..." : "Generate AI Itinerary"}
          </button>
        </form>
      </div>
    </div>
  );
}
