"use client"

import Image from "next/image";
import { Trip } from "../generated/prisma";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface TripDetailClientProps {
    trip: Trip;
}

const TripDetailClient = ({ trip }: TripDetailClientProps) => {
    const [activeTab, setActiveTab] = useState<"overview" | "itinerary" | "map">("overview");

    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            {trip.imgUrl && (
                <div className="w-full h-80 overflow-hidden rounded-lg shadow-md relative">
                    <Image src={trip.imgUrl} alt={trip.title} className="object-cover" fill priority />
                </div>
            )}
            <div className="bg-white p-6 shadow rounded-lg flex flex-col md:flex-row md:items-center items-start justify-between">
                <div>
                    <h1 className="text-xl font-semibold capitalize">{trip.title}</h1>
                    <div className="flex gap-4 items-center"><Calendar/>{trip.startDate.toLocaleDateString()} - {trip.endDate.toLocaleDateString()}</div>
                </div>
                <div className="mt-4 md:mt-0">
                    <Link href={`/trips/${trip.id}/itinerary/new`}>
                        <button className="bg-blue-500 text-white py-2 px-4 hover:bg-blue-700 !rounded-full flex items-center">
                            + Add Location
                        </button>
                    </Link>
                </div>
            </div>
            <div role="tablist" aria-label="Trip sections" className="bg-white p-6 shadow rounded-lg">
                <div className="flex items-center justify-center">
                    <button role="tab" onClick={() => setActiveTab("overview")} className={`bg-gray-300 border border-r-0 border-gray-300 px-2 py-1 !rounded-r-none !rounded-l-xl hover:bg-gray-100 hover:shadow-md ${activeTab === "overview" ? "!bg-gray-100 " : ""}`}>Overview</button>
                    <button role="tab" onClick={() => setActiveTab("itinerary")} className={`bg-gray-300 border border-r-0 border-l-0 border-gray-300 px-2 py-1 !rounded-none hover:bg-gray-100 hover:shadow-md ${activeTab === "itinerary" ? "!bg-gray-100 " : ""}`}>Itinerary</button>
                    <button role="tab" onClick={() => setActiveTab("map")} className={`bg-gray-300 border border-l-0 border-gray-300 px-2 py-1 !rounded-l-none !rounded-r-xl hover:bg-gray-100 hover:shadow-md ${activeTab === "map" ? "!bg-gray-100 " : ""}`}>Map</button>
                </div>

                <div hidden={activeTab !== "overview"} role="tabpanel">Overview</div>
                <div hidden={activeTab !== "itinerary"} role="tabpanel">Itinerary</div>
                <div hidden={activeTab !== "map"} role="tabpanel">Map</div>
            </div>
        </div>
    )
}

export default TripDetailClient;