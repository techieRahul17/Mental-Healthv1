"use client";

import { Outfit } from "next/font/google";
import Link from "next/link";
import React from "react";
import { MessageCircle, Search, Clock } from "lucide-react";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function BreathingExercise() {
  

  return (
    <div className={`flex h-screen bg-[#e6f4ec] ${outfit.className}`}>
      {/* Sidebar */}
      <aside className="w-64 bg-[#5b7263] p-6 flex flex-col">
        <h1 className="text-2xl mb-10 text-[#CDE9D6]">TakeUrTime</h1>
        <nav className="flex flex-col gap-4 mt-20 text-xl text-[#CDE9D6]">
          <button className="text-left hover:text-green-200">Home</button>
          <button className="text-left hover:text-green-100">
            Mood Tracker
          </button>
          <button className="text-left hover:text-green-200">
            Appointment Schedule
          </button>
          <button className="text-left text-black font-semibold hover:text-black-200">
            Gratitude Journal
          </button>
          <button className="text-left hover:text-green-200">
            Breathing Exercise
          </button>
          <button className="text-left hover:text-green-200">Music</button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col  justify-start p-12">
        {/* Heading */}
        <h2 className="text-4xl font-semibold text-black">
          Let’s do some breathing exercise!
        </h2>
        <hr className="w-full border-t border-black my-4" />

        {/* Subtext */}
        <p className="text-lg text-black mb-10 text-center mt-10">
          Breathing can calm your mind and relax your body. <br />
          Choose a technique below to begin.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-6 mt-10">
          <div className="flex gap-6 justify-center">
            <button className="bg-[#164b39] text-white px-6 py-3 rounded-2xl text-lg shadow-md">
              Calm Breathing
            </button>
            <button className="bg-[#164b39] text-white px-6 py-3 rounded-2xl text-lg shadow-md">
              Anxiety Relief Breathing
            </button>
            <button className="bg-[#164b39] text-white px-6 py-3 rounded-2xl text-lg shadow-md">
              Sleep Breathing
            </button>
          </div>
          <div className="flex gap-6 justify-center">
            <button className="bg-[#164b39] text-white px-6 py-3 rounded-2xl text-lg shadow-md">
              Focus Breathing
            </button>
            <button className="bg-[#164b39] text-white px-6 py-3 rounded-2xl text-lg shadow-md">
              Energizing Breathing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
