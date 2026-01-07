"use client";
import React, { useState, useMemo } from 'react';

// DATA INGESTED FROM UPLOADED 2026 SCHEDULE
const IRONMAN_2026_SCHEDULE = [
  { date: "2026-04-18", name: "IRONMAN Texas", location: "The Woodlands, TX", mult: 1.35 },
  { date: "2026-05-16", name: "IRONMAN Jacksonville", location: "Jacksonville, FL", mult: 1.25 },
  { date: "2026-07-19", name: "IRONMAN Lake Placid", location: "Lake Placid, NY", mult: 1.15 },
  { date: "2026-08-02", name: "IRONMAN Canada", location: "Ottawa, ON", mult: 1.10 },
  { date: "2026-09-13", name: "IRONMAN Wisconsin", location: "Madison, WI", mult: 1.00 },
  { date: "2026-09-19", name: "IRONMAN Maryland", location: "Cambridge, MD", mult: 1.25 },
  { date: "2026-09-27", name: "IRONMAN Chattanooga", location: "Chattanooga, TN", mult: 1.20 },
  { date: "2026-10-18", name: "IRONMAN California", location: "Sacramento, CA", mult: 1.15 },
  { date: "2026-10-31", name: "IRONMAN Florida", location: "Panama City Beach, FL", mult: 1.15 },
  // 70.3 Races
  { date: "2026-03-29", name: "70.3 Texas", location: "Galveston, TX", mult: 1.20 },
  { date: "2026-03-28", name: "70.3 Oceanside", location: "Oceanside, CA", mult: 1.05 },
  { date: "2026-05-30", name: "70.3 Hawai'i", location: "Kohala Coast, HI", mult: 1.40 },
  { date: "2026-06-21", name: "70.3 Mont-Tremblant", location: "Mont-Tremblant, QC", mult: 1.10 },
  { date: "2026-07-19", name: "70.3 Oregon", location: "Salem, OR", mult: 1.15 }
];

export default function KPRARacePlanner() {
  const [raceIndex, setRaceIndex] = useState(0);
  const [level, setLevel] = useState("Competitive");
  const [usePersonalBottle, setUsePersonalBottle] = useState(true);

  const selectedRace = IRONMAN_2026_SCHEDULE[raceIndex];

  // Logic based on your provided Athlete Data
  const athleteStats = useMemo(() => {
    const levels = {
      "Elite": { glycogen: 453, carbBurn: 1.8, naLoss: [500, 1000, 1500], absorption: 0.90 },
      "Competitive": { glycogen: 420, carbBurn: 1.64, naLoss: [450, 900, 1300], absorption: 0.85 },
      "MidPack": { glycogen: 380, carbBurn: 1.4, naLoss: [400, 800, 1100], absorption: 0.75 },
      "Beginner": { glycogen: 320, carbBurn: 1.2, naLoss: [300, 600, 800], absorption: 0.65 }
    };
    return levels[level];
  }, [level]);

  // Calculations
  const hourlyNaTarget = Math.round(athleteStats.naLoss[1] * selectedRace.mult);
  const hourlyCarbTarget = Math.round(athleteStats.carbBurn * 60 * athleteStats.absorption);

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-orange-500">
      <div className="max-w-6xl mx-auto p-4 md:p-10 space-y-8">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between border-b border-orange-600/30 pb-8">
          <div>
            <h1 className="text-5xl font-black tracking-tighter italic text-orange-500">KPRA 2026</h1>
            <p className="text-xl font-light text-neutral-400">Race Strategy & Metabolic Calculator</p>
          </div>
          <div className="mt-6 md:mt-0 bg-neutral-900 p-4 rounded-xl border border-neutral-800">
            <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-1">Selected Event</span>
            <select 
              className="bg-transparent text-xl font-bold border-none focus:ring-0 cursor-pointer"
              onChange={(e) => setRaceIndex(Number(e.target.value))}
            >
              {IRONMAN_2026_SCHEDULE.map((r, i) => <option key={i} value={i} className="bg-neutral-900">{r.name}</option>)}
            </select>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Inputs Section */}
          <div className="space-y-6">
            <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
              <h3 className="text-sm font-bold text-neutral-500 uppercase mb-4">Athlete Profile</h3>
              <div className="space-y-4">
                <label className="block">
                  <span className="text-xs text-neutral-400 font-medium">Competition Level</span>
                  <select 
                    value={level} 
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full mt-1 p-3 bg-neutral-800 rounded-lg border-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Elite">Elite (Max Absorption)</option>
                    <option value="Competitive">Competitive (Top 10%)</option>
                    <option value="MidPack">Mid-Pack</option>
                    <option value="Beginner">Beginner</option>
                  </select>
                </label>
                <div className="flex items-center gap-3 p-3 bg-neutral-800 rounded-lg cursor-pointer" onClick={() => setUsePersonalBottle(!usePersonalBottle)}>
                  <input type="checkbox" checked={usePersonalBottle} readOnly className="h-5 w-5 rounded border-neutral-600 bg-neutral-700 text-orange-500" />
                  <span className="text-sm">Carry Personal High-Carb Bottle</span>
                </div>
              </div>
            </div>

            <div className="bg-orange-500/10 p-6 rounded-2xl border border-orange-500/20">
              <h3 className="text-sm font-bold text-orange-500 uppercase mb-2">Climate Factor</h3>
              <p className="text-2xl font-black">{selectedRace.location}</p>
              <p className="text-sm text-neutral-400 mt-1">Date: {selectedRace.date}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs font-bold uppercase">Sweat Multiplier</span>
                <span className="text-xl font-mono text-orange-500">{selectedRace.mult}x</span>
              </div>
            </div>
          </div>

          {/* Core Results Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-neutral-900 p-6 rounded-2xl border-t-4 border-orange-500">
                <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Sodium / HR</p>
                <p className="text-4xl font-black mt-2">{hourlyNaTarget} <span className="text-lg font-normal text-neutral-500">mg</span></p>
              </div>
              <div className="bg-neutral-900 p-6 rounded-2xl border-t-4 border-blue-500">
                <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Fluid / HR</p>
                <p className="text-4xl font-black mt-2">{Math.round(800 * selectedRace.mult)} <span className="text-lg font-normal text-neutral-500">ml</span></p>
              </div>
              <div className="bg-neutral-900 p-6 rounded-2xl border-t-4 border-green-500">
                <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Carbs / HR</p>
                <p className="text-4xl font-black mt-2">{hourlyCarbTarget} <span className="text-lg font-normal text-neutral-500">g</span></p>
              </div>
            </div>

            {/* 15 Minute Logic Table */}
            <div className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden">
              <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
                <h3 className="font-black italic uppercase text-lg">The 15-Minute Bike Protocol</h3>
                <span className="text-[10px] bg-white text-black px-2 py-1 font-bold rounded">2026 ON-COURSE PARTNERS</span>
              </div>
              <div className="p-0">
                <table className="w-full text-left">
                  <thead className="bg-neutral-800/50 text-neutral-500 text-[10px] uppercase font-bold">
                    <tr>
                      <th className="px-6 py-3">Time</th>
                      <th className="px-6 py-3">Intake</th>
                      <th className="px-6 py-3 text-right">Yield</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {[":15", ":30", ":45", ":00"].map((time, idx) => (
                      <tr key={time} className={idx % 2 === 0 ? "" : "bg-neutral-800/20"}>
                        <td className="px-6 py-4 font-black text-orange-500">{time}</td>
                        <td className="px-6 py-4">
                          {idx % 2 === 0 
                            ? (usePersonalBottle ? "3 Sips Personal Carb Mix (Maurten 320)" : "3 Sips PF&H PH 1000")
                            : "1x Maurten Gel 100"}
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-xs">
                          {idx % 2 === 0 ? `~${Math.round(hourlyNaTarget * 0.25)}mg Na+` : "25g CHO"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Data Verification */}
        <footer className="bg-neutral-900/50 p-6 rounded-xl border border-neutral-800 text-center">
          <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-[0.2em]">
            Metabolic Constants: {athleteStats.glycogen}g Glycogen Store | {athleteStats.carbBurn} g/min Burn Rate | Precision Fuel & Hydration Partner Logic
          </p>
        </footer>

      </div>
    </div>
  );
}
