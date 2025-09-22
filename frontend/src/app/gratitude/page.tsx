"use client";
import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"], // choose the weights you need
});

export default function GratitudePage() {
  const [selectedDate, setSelectedDate] = useState<number>(17);
  const [entry, setEntry] = useState<string>("");

  const days = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];

  return (
    <div className={`flex min-h-screen bg-gray-900 text-white ${outfit.className}`}>
      {/* Sidebar */}
      <aside className="w-64 bg-[#5b7263] p-6 flex flex-col">
        <h1 className="text-2xl mb-10 text-[#CDE9D6]">TakeUrTime</h1>
        <nav className="flex flex-col gap-4 mt-20 text-xl">
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
      <main className="flex-1 bg-green-100 text-black rounded-tl-3xl p-8">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold flex items-center gap-2">
            <span role="img" aria-label="leaf">
              🍃
            </span>
            Gratitude Journal
            <span role="img" aria-label="leaf">
              🍃
            </span>
          </h2>
        </header>

        {/* Month & Dates */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays className="w-5 h-5" />
            <span className="font-medium">September 2025</span>
          </div>
          <div className="flex gap-5">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDate(day)}
                className={`w-15 h-15 rounded-md ${
                  selectedDate === day
                    ? "bg-black text-white"
                    : "bg-[#5b7263] text-white"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="I’m grateful for ...."
          className="bg-[#66806f] w-full h-90 p-4 border-2 border-none rounded-xl text-black placeholder-gray-800 focus:outline-none"
        />

        {/* Daily Affirmation */}
        <div className="mt-6 bg-[#16382c] text-center text-white p-4 rounded-2xl">
          <p className="font-semibold">Daily Affirmation</p>
          <p className="text-sm">I love myself and I love my life</p>
        </div>
      </main>
    </div>
  );
}
