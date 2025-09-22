"use client";

import { Outfit } from "next/font/google";


import React from "react";
import Link from "next/link";
import Image from "next/image";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"], // choose the weights you need
});

export default function MoodTracker() {
  return (
    <div className={`flex h-screen bg-[#e6f4ec] ${outfit.className}`}>
      {/* Sidebar */}
       <aside className="w-64 bg-[#5b7263] p-6 flex flex-col">
        <h1 className="text-2xl mb-10 text-[#CDE9D6]">TakeUrTime</h1>
        <nav className="flex flex-col gap-4 mt-20 text-xl  text-[#CDE9D6]">
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
      <div className="flex-1 relative flex flex-col items-center justify-start">
        {/* White curved background */}
        <div className="absolute top-0 w-full h-[200px] bg-white rounded-b-[50%]"></div>

        {/* Emojis floating */}
        <div className="absolute top-0 left-0 w-full h-[200px]">
  {/* Angry */}
  <Image
    src="/angry.png"
    alt="angry"
    width={50}
    height={50}
    className="absolute top-6 left-[19%] scale-120"
  />
  {/* Grinning */}
  <Image
    src="/grinning.png"
    alt="grinning"
    width={55}
    height={55}
    className="absolute top-3 left-[40%]"
  />
  {/* Sad */}
  <Image
    src="/sad.png"
    alt="sad"
    width={45}
    height={45}
    className="absolute top-6 left-[65%] scale-130"
  />
  {/* Neutral */}
  <Image
    src="/neutral.png"
    alt="neutral"
    width={50}
    height={50}
    className="absolute top-34 left-[26%]"
  />
  {/* Smile */}
  <Image
    src="/smile.png"
    alt="smile"
    width={48}
    height={48}
    className="absolute top-36 left-[48%] "
  />
  {/* Heart */}
  <Image
    src="/heart.png"
    alt="heart"
    width={60}
    height={60}
    className="absolute top-30 left-[68%]"
  />
</div>


        {/* Question */}
        <h2 className=" relative mt-20 text-4xl font-semibold text-black items-center justify-center text-center">
          How are you feeling today?
        </h2>

        {/* Mood Buttons */}
        <div className="mt-36 grid grid-cols-3 gap-6 justify-items-center">
  <button className="bg-[#164b39] text-white px-6 py-3 rounded-2xl text-lg flex items-center gap-2 shadow-md">
    <img src="/happy.png" className="w-10" /> Great
  </button>
  <button className="bg-[#164b39] text-white px-6 py-3 rounded-2xl text-lg flex items-center gap-2 shadow-md">
    <img src="/good.png" className="w-10" /> Good
  </button>
  <button className="bg-[#164b39] text-white px-6 py-3 rounded-2xl text-lg flex items-center gap-2 shadow-md">
    <img src="/okay.png" className="w-10" /> Okay
  </button>
  <div className="col-span-3 flex justify-center gap-6 mt-4">
    <button className="bg-[#164b39] text-white px-6 py-3 rounded-2xl text-lg flex items-center gap-2 shadow-md">
      <img src="/sadd.png" className="w-10" /> Sad
    </button>
    <button className="bg-[#164b39] text-white px-6 py-3 rounded-2xl text-lg flex items-center gap-2 shadow-md">
      <img src="/anxious.png" className="w-10" /> Anxious
    </button>
  </div>
</div>
<p className="mt-20 text-xl">Your feelings are valid. Take a moment to acknowledge them and be kind to yourself.</p>

      </div>
    </div>
  );
}
