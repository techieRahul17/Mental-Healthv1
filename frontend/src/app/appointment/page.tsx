"use client";
import { useState } from "react";
import Image from "next/image";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"], // choose the weights you need
});

export default function AppointmentPage() {
  const [activeTab, setActiveTab] = useState("Upcoming");

  const appointments = {
    Upcoming: [
      {
        id: 1,
        doctor: "Dr. Meera Sharma",
        role: "MBBS, M.A. Psychology, PhD in Clinical Psychology",
        date: "Sep 20, 2025 | 5:00 PM",
        type: "Video Session",
        status: "upcoming",
      },
    ],
    Completed: [
      {
        id: 2,
        doctor: "Dr. Rahul Verma",
        role: "PhD in Psychiatry",
        date: "Aug 10, 2025 | 4:00 PM",
        type: "In-person",
        status: "completed",
      },
    ],
    Cancelled: [
      {
        id: 3,
        doctor: "Dr. Neha Kapoor",
        role: "MBBS, Clinical Psychology",
        date: "Jun 12, 2025 | 3:00 PM",
        type: "Video Session",
        status: "cancelled",
      },
    ],
  };

  return (
    <div className={`flex h-screen bg-[#121212] text-black ${outfit.className}`}>
      {/* Sidebar */}
      <aside className="w-64 bg-[#647E6D] text-[#EAF4EE] flex flex-col p-6">
        <h1 className="text-2xl mb-10 text-[#CDE9D6]">TakeUrTime</h1>
        <nav className="flex flex-col gap-6 text-xl mt-20">
          <button className="text-left hover:text-white">Home</button>
          <button className="text-left hover:text-white">Mood Tracker</button>
          <button className="text-left font-semibold text-black">
            Appointment Schedule
          </button>
          <button className="text-left hover:text-white">Gratitude Journal</button>
          <button className="text-left hover:text-white">Breathing Exercise</button>
          <button className="text-left hover:text-white">Music</button>
        </nav>
      </aside>

      {/* Main Section */}
      <main className="flex-1 bg-[#CDE9D6] p-10 relative">
        {/* Header with buttons */}
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-4xl font-bold">Your Appointments</h1>
          <div className="flex gap-3">
            <button className="bg-[#1B4D3E] text-white px-4 py-2 rounded-full hover:opacity-80">
              Book Appointment
            </button>
            <button className="bg-[#1B4D3E] text-white px-4 py-2 rounded-full hover:opacity-80">
              View Calendar
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 text-lg mb-8">
          {["Upcoming", "Completed", "Cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? "font-semibold border-b-2 border-black"
                  : "hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Appointments List */}
        <div className="flex flex-wrap gap-6">
          {appointments[activeTab].length > 0 ? (
            appointments[activeTab].map((appt) => (
              <div
                key={appt.id}
                className="bg-white rounded-xl shadow-md w-96 p-6"
              >
                {/* Doctor Info */}
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src="/doctor.png"
                    alt={appt.doctor}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-lg">{appt.doctor}</p>
                    <p className="text-sm text-gray-600">{appt.role}</p>
                  </div>
                </div>

                {/* Appointment Info */}
                <div className="border-t border-gray-300 pt-4">
                  <p className="text-green-900 font-medium">{appt.date}</p>
                  <p className="text-sm text-gray-700">{appt.type}</p>
                </div>

                {/* Actions */}
                {appt.status === "upcoming" ? (
                  <div className="flex gap-3 mt-4">
                    <button className="flex-1 bg-[#CDE9D6] text-[#1B4D3E] px-4 py-2 rounded-full hover:bg-[#B4D9C3]">
                      Reschedule
                    </button>
                    <button className="flex-1 bg-[#647E6D] text-white px-4 py-2 rounded-full hover:opacity-90">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <p
                    className={`mt-4 text-center font-medium ${
                      appt.status === "completed"
                        ? "text-green-700"
                        : "text-red-600"
                    }`}
                  >
                    {appt.status === "completed" ? "Completed" : "Cancelled"}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600">No {activeTab.toLowerCase()} sessions.</p>
          )}
        </div>
      </main>
    </div>
  );
}
