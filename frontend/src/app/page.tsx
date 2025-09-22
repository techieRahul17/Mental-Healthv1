"use client";

import { Outfit } from "next/font/google";
import { Button } from "../components/Button";
import Link from "next/link";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"], // choose what you need
});

export default function LandingPage() {
  return (
    <main
      className={`min-h-screen bg-[#DAF1DE] flex flex-col items-center ${outfit.className}`}
    >
      {/* Header */}
      <div className="w-full flex justify-between items-center px-10 pt-8 mt-0 ">
        <h1 className="text-2xl text-[#0B2B26]">TakeUrTime</h1>
        <div className="flex gap-4">
          <Button className="bg-[#1B4D3E] text-white px-5 py-2 rounded-full">
            Book Appointment
          </Button>
          <Link href="/chat">
            <Button className="bg-[#1B4D3E] text-white px-5 py-2 rounded-full cursor-pointer">
              Start Chat
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Section */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-start mt-20">
        {/* Left Side */}
        <div className="flex-1">
          <h2 className="text-6xl font-bold leading-tight text-[#0B2B26]">
            Because your <br /> mental health <br /> matters.
          </h2>
        </div>

        <div className="flex-1 flex gap-6 items-center">
          <div className="w-px bg-gray-400  h-[230px] mt-2"></div>
          <p className="text-xl text-[#3A3A3A] mt-5 ">
            Take a step towards healing with a stigma-free, accessible, and
            secure mental wellness companion. Whether you need instant support,
            self-care resources, or professional guidance, we’re here for you —
            day and night.
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-16 text-center">
        <p className="text-2xl font-medium text-[#1B1B1B] mb-6 mt-8">
          Looking for more? Check the menu below to explore self-care,
          <br /> music, journals, and more
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-15">
          <Link href="/mood">
            <button className="bg-[#647E6D] text-black px-6 py-3 rounded-xl shadow-md hover:scale-105 transition">
              Mood Tracker
            </button>
          </Link>

          <Link href="/appointment">
            <button className="bg-[#647E6D] text-black px-6 py-3 rounded-xl shadow-md hover:scale-105 transition">
              Appointment Schedule
            </button>
          </Link>

          <Link href="/gratitude">
            <button className="bg-[#647E6D] text-black px-6 py-3 rounded-xl shadow-md hover:scale-105 transition">
              Gratitude Journal
            </button>
          </Link>

          <Link href="/breathing">
            <button className="bg-[#647E6D] text-black px-6 py-3 rounded-xl shadow-md hover:scale-105 transition">
              Breathing Exercise
            </button>
          </Link>

          <Link href="/music">
            <button className="bg-[#647E6D] text-black px-6 py-3 rounded-xl shadow-md hover:scale-105 transition">
              Music
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
