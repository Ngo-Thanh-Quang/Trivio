import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function TripsPage() {
  const session = await auth();

  const trips = await prisma.trip.findMany({
    where: { userId: session?.user?.id },
  });

  const sortedTrips = [...trips].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingTrips = sortedTrips.filter((trip) => trip.startDate >= today);

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 text-xl">
        Sign in to view your trips.
      </div>
    );
  }

  return (
    <div className="space-y-6 container mx-auto px-4 py-8">
      <div className="flex justify-between items-center border-b border-gray-300">
        <h1>Dashboard</h1>
        {trips.length > 0 && 
        <Link href={"/trips/new"}>
          <button className="bg-blue-500 text-white py-2 px-4 hover:bg-blue-700 !rounded-full">
            +
          </button>
        </Link>}
      </div>
      <div className="flex flex-col justify-center items-center">
        <h3>Welcome back, {session.user?.name}</h3>
        <p className="text-gray-600 italic">
          {trips.length === 0
            ? "No trips yet—let’s change that!"
            : `Trips Planned: ${trips.length} | Upcoming Trips: ${upcomingTrips.length}`}
        </p>
      </div>

      <div>
        {trips.length === 0 ? (
          <div className="text-center">
            <Link href={"/trips/new"}>
                <button className="bg-blue-500 text-white py-2 px-4 !rounded-full h-12 hover:bg-blue-700">
                    Start Your New Adventure
                </button>
            </Link>
          </div>
        ) : (
            <>
                <h4 className="">Your Recent Trips</h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {sortedTrips.slice(0, 6).map((trip, key) => (
                        <Link key={key} href={`/trips/${trip.id}`} className="h-full hover:shadow-md transition-shadow border border-gray-300 rounded-lg overflow-hidden p-4 flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <p className="text-lg font-bold capitalize">{trip.title}</p>
                                {trip.startDate >= today && (<span className="bg-blue-700 text-white italic px-2 py-1 rounded-full font-bold text-[12px]">Upcoming</span>)}
                            </div>
                            <div className="grid gap-1">
                                <p>{trip.description}</p>
                                <div>
                                    {new Date(trip.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} - {new Date(trip.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </>
        )}
      </div>
    </div>
  );
}
