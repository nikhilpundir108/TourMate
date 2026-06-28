"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Home, Utensils, Award, Phone } from "lucide-react";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

interface HomestayItem {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

interface RestaurantItem {
  _id: string;
  name: string;
  description: string;
  image: string;
  cuisine: string;
}

interface VendorItem {
  _id: string;
  name: string;
  service: string;
  contact: string;
  image: string;
}

interface DestinationDetailsData {
  _id: string;
  name: string;
  description: string;
  image: string;
  location?: {
    lat: number;
    lng: number;
  };
  homestays?: HomestayItem[];
  restaurants?: RestaurantItem[];
  vendors?: VendorItem[];
}

export default function DestinationDetails() {
  const params = useParams();
  const [destination, setDestination] = useState<DestinationDetailsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params?.id) {
      fetch(`/api/destinations/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setDestination(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load destination details", err);
          setIsLoading(false);
        });
    }
  }, [params?.id]);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100-4rem)] bg-slate-950 text-slate-100 flex justify-center items-center p-6">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
          <p className="text-slate-400 font-medium">Loading destination details...</p>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-[calc(100-4rem)] bg-slate-950 text-slate-100 flex justify-center items-center p-6">
        <div className="bg-slate-900/40 border border-slate-900 p-8 rounded-3xl text-center max-w-sm w-full">
          <p className="text-slate-400 font-medium">Destination not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100-4rem)] bg-slate-950 text-slate-100 pb-16 relative overflow-hidden">
      {/* Hero Image Banner with gradient overlay */}
      <div className="h-[45vh] w-full relative overflow-hidden">
        <img
          src={destination.image || "/default.jpg"}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-6 pb-10">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            {destination.name}
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-10">
        <p className="text-slate-350 text-base md:text-lg leading-relaxed max-w-3xl mb-12">
          {destination.description}
        </p>

        {/* Map Section */}
        {destination.location && (
          <div className="mb-16">
            <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-6 flex items-center gap-2">
              <span>📍 Location Map</span>
            </h2>
            <div className="border border-slate-900 overflow-hidden rounded-3xl shadow-xl h-[400px]">
              <Map lat={destination.location.lat} lng={destination.location.lng} name={destination.name} />
            </div>
          </div>
        )}

        {/* Local Homestays */}
        {destination.homestays && destination.homestays.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-6 flex items-center gap-2">
              <Home className="w-5 h-5 text-blue-400" />
              <span>Certified Local Homestays</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {destination.homestays.map((h) => (
                <div
                  key={h._id}
                  className="bg-slate-900/30 border border-slate-900 rounded-3xl p-5 hover:border-slate-850 transition-all flex flex-col sm:flex-row gap-5"
                >
                  <img
                    src={h.image || "/default.jpg"}
                    alt={h.name}
                    className="h-32 sm:w-40 object-cover rounded-2xl flex-shrink-0"
                  />
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-lg font-bold text-slate-100 mb-1">{h.name}</h3>
                      <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">{h.description}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-semibold text-green-400 bg-green-950/60 border border-green-900 px-3 py-1 rounded-full">
                        ₹{h.price} / night
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Local Restaurants */}
        {destination.restaurants && destination.restaurants.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-6 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-indigo-400" />
              <span>Traditional Dining & Eateries</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {destination.restaurants.map((r) => (
                <div
                  key={r._id}
                  className="bg-slate-900/30 border border-slate-900 rounded-3xl p-5 hover:border-slate-850 transition-all flex flex-col sm:flex-row gap-5"
                >
                  <img
                    src={r.image || "/default.jpg"}
                    alt={r.name}
                    className="h-32 sm:w-40 object-cover rounded-2xl flex-shrink-0"
                  />
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-lg font-bold text-slate-100 mb-1">{r.name}</h3>
                      <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">{r.description}</p>
                    </div>
                    <div className="mt-4">
                      <span className="text-xs font-semibold text-slate-350 bg-slate-900 border border-slate-850 px-3 py-1 rounded-full">
                        {r.cuisine}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Local Vendors & Guides */}
        {destination.vendors && destination.vendors.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              <span>Local Service Providers & Guides</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {destination.vendors.map((v) => (
                <div
                  key={v._id}
                  className="bg-slate-900/30 border border-slate-900 rounded-3xl p-5 hover:border-slate-850 transition-all flex flex-col sm:flex-row gap-5"
                >
                  <img
                    src={v.image || "/default.jpg"}
                    alt={v.name}
                    className="h-32 sm:w-40 object-cover rounded-2xl flex-shrink-0"
                  />
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-lg font-bold text-slate-100 mb-1">{v.name}</h3>
                      <p className="text-slate-450 text-xs font-medium uppercase tracking-wider text-purple-400 mb-2">
                        {v.service}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center">
                      <a
                        href={`tel:${v.contact}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 bg-blue-950/60 border border-blue-900 hover:bg-blue-950 px-3.5 py-1.5 rounded-full transition-all"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{v.contact}</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
