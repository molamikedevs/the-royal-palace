"use client";


import { useOptimistic } from "react";
import { deleteReservationAction } from "@/lib/actions";
import { Reservations } from "@/types";
import ReservationCard from "./ReservationCard";


const ReservationList = ({
  reservations,
}: {
  reservations: Reservations[];
}) => {
  const [optimisticReservations, optimisticDelete] = useOptimistic(
    reservations,
    (currentReservations, reservationId) => {
      return currentReservations.filter(
        (reservation) => reservation.id !== reservationId
      );
    }
  );

  const handleDelete = async (reservationId: string) => {
    optimisticDelete(reservationId);
    try {
      await deleteReservationAction(reservationId);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  return (
    <ul className="space-y-6">
      {optimisticReservations.map((reservation) => (
        <ReservationCard
          onDelete={handleDelete}
          reservation={reservation}
          key={reservation.id}
        />
      ))}
    </ul>
  );
};

export default ReservationList;
