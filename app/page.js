"use client";
import React, { useState } from 'react';

const RACE_DATA = {
  "Kona": { temp: 86, hum: 80, multiplier: 1.4 },
  "Texas": { temp: 85, hum: 75, multiplier: 1.35 },
  "Florida": { temp: 78, hum: 65, multiplier: 1.15 },
  "Arizona": { temp: 75, hum: 20, multiplier: 1.1 }, // Dry heat
  "Wisconsin": { temp: 70, hum: 50, multiplier: 1.0 },
  "Custom": { temp: 70, hum: 50, multiplier: 1.0 }
};

export default function KPRACoachTool() {
  const [race, setRace] = useState("Wisconsin");
  const [level, setLevel] = useState("Competitive");
  const [weight, setWeight] = useState(165);

  // Elite Logic Pulls
  const baseNaLoss = 1000; // Your baseline from the spreadsheet
  const heatFactor = RACE_DATA[race].multiplier;
  const adjustedNaLoss = Math.round(baseNaLoss * heatFactor);

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <header className="border-b border-orange-500 pb-4">
          <h1 className="text-3xl font-black italic tracking-tighter text-orange-500">KPRA RACE CALCULATOR v2.0</h1>
          <p className="text-slate-400">Environmental Sweat Multiplier & 2026 On-Course Logic</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* INPUTS */}
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold uppercase text-slate-500">Race Environment</h2>
            
            <select value={race} onChange={(e) => setRace(e.target.value)} 
              className="w-full p-3 bg-slate-800 rounded border-none text-lg">
              {Object.keys(RACE_DATA).map(r => <option key={r} value={r}>Ironman {r}</option>)}
            </select>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-slate-800 p-3 rounded">
                <span className="block text-xs text-slate-500">Avg Temp</span>
                <span className="text-xl font-bold">{RACE_DATA[race].temp}°F</span>
              </div>
              <div className="bg-slate-800 p-3 rounded">
                <span className="block text-xs text-slate-500">Humidity</span>
                <span className="text-xl font-bold">{RACE_DATA[race].hum}%</span>
              </div>
            </div>

            <label className="block pt-4">
              <span className="text-xs font-bold text-slate-500 uppercase">Athlete Level</span>
              <select value={level} onChange={(e) => setLevel(e.target.value)} className="w-full mt-1 p-3 bg-slate-800 rounded border-none">
                <option value="MidPack">Mid-Pack Age Grouper</option>
                <option value="Competitive">Top 10% / Podium</option>
                <option value="Elite">Elite / Pro</option>
              </select>
            </label>
          </div>

          {/* DYNAMIC PRESCRIPTION */}
          <div className="bg-orange-600 p-6 rounded-xl text-white shadow-2xl">
            <h2 className="text-lg font-black italic mb-4 uppercase tracking-tight">Prescribed Hourly Intake</h2>
            
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-orange-400 pb-2">
                <span>Total Sodium ($Na^+$)</span>
                <span className="text-3xl font-black">{adjustedNaLoss}mg</span>
              </div>
              <div className="flex justify-between items-end border-b border-orange-400 pb-2">
                <span>Total Fluid</span>
                <span className="text-3xl font-black">{race === "Kona" ? '1.2L' : '900ml'}</span>
              </div>
              <div className="flex justify-between items-end border-b border-orange-400 pb-2">
                <span>Total Carbohydrates</span>
                <span className="text-3xl font-black">{level === "Elite" ? '110g' : '90g'}</span>
              </div>
            </div>

            <div className="mt-6 bg-orange-700 p-4 rounded-lg text-sm italic">
              "At {RACE_DATA[race].temp}°F, your sweat rate is increased by {Math.round((heatFactor - 1) * 100)}%. 
              Prioritize drinking PH 1000 every 15 mins to maintain blood volume."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
