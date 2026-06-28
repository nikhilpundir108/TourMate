"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";

interface DestinationItem {
  _id: string;
  name: string;
  description: string;
  image: string;
}

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<DestinationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/destinations")
      .then((res) => res.json())
      .then((data) => {
        setDestinations(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load destinations", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-[calc(100-4rem)] bg-slate-950 text-slate-100 py-12 px-6 relative overflow-hidden">
      {/* Background Decorative Gradient */}
      <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Block */}
        <div className="mb-12 border-b border-slate-900 pb-8">
          <div className="flex items-center gap-3 mb-4 text-blue-400 font-medium">
            <Compass className="w-5 h-5 animate-spin-slow" />
            <span>Discover India</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Explore Handpicked Destinations
          </h1>
          <p className="text-slate-400 mt-2 max-w-xl">
            Browse through local tourism gems and find certified homestays, dining spots, and guides for your trip.
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-slate-900/30 border border-slate-900 rounded-3xl h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((d) => (
              <Link
                key={d._id}
                href={`/destinations/${d._id}`}
                className="bg-slate-900/40 border border-slate-900 hover:border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:translate-y-[-4px] group flex flex-col h-full cursor-pointer"
              >
                <div className="h-48 w-full overflow-hidden relative">
                  <img
                    src={d.image || "/default.jpg"}
                    alt={d.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors">
                    {d.name}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                    {d.description}
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 group-hover:text-blue-300 transition-colors mt-auto">
                    <span>View Destination</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
