import TripDetailClient from "@/app/components/trip-detail";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const TripDetail = async ({params}: {params: Promise<{tripId: string}>}) => {
    const {tripId} = await params;

    const session = await auth();
    if (!session) {
        return ;
    }

    const trip = await prisma.trip.findFirst({
        where: {id: tripId, userId: session.user?.id},
    })

    if (!trip) {
        return <div className="flex justify-center items-center h-[50vh] text-gray-700 text-xl">
            Trip not found.
        </div>
    }
    return <TripDetailClient trip={trip} />
}

export default TripDetail;