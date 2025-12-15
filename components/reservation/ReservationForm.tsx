"use client";

import { useReservationContext } from "@/context/ReservationContext";
import Image from "next/image";
import { Suites } from "../../types";
import { differenceInDays } from "date-fns";

import SubmitButton from "../auth/SubmitButton";
import { createReservationAction } from "@/lib/actions";

// This component receives the suite and user information as props
// It uses the reservation context to manage the date range for the reservation
// It calculates the number of nights and total price based on the selected dates and suite pricing
// The form includes fields for the number of guests and any observations, along with a submit button
// The form is styled with Tailwind CSS classes for a consistent look and feel
// The component is designed to be used within the reservation context, allowing users to select dates and
export default function ReservationForm({
  suite,
  user,
}: {
  suite: Suites;
  user: {
    firstName: string;
    avatar: string;
  };
}) {
  // Use the reservation context to get the current date range
  // Extract the range from the context
  const { range, resetRange } = useReservationContext();

  // Extract necessary properties from the suite object
  // This includes maxCapacity, regularPrice, and discount
  const { maxCapacity, regularPrice, discount } = suite;
  const suiteId = suite.suiteId || suite.id.toString();

  // If no range is selected, default to an empty CustomDateRange object
  // If no range is selected, default to the current date for both start and end dates
  const startDate = range.from || new Date();
  const endDate = range.to || new Date();

  // Calculate the number of nights based on the selected date range
  // If no range is selected, default to 0 nights
  // Calculate the total price based on the number of nights and the suite's pricing
  const numNights = differenceInDays(endDate, startDate);
  const suitePrice = numNights * (regularPrice - discount);

  const reservationData = {
    startDate,
    endDate,
    numNights,
    suiteId,
    suitePrice,
  };

  //Bind the reservation data to the form submission action
  // This will be used to create a new reservation when the form is submitted
  const createReservationWithData = createReservationAction.bind(
    null,
    reservationData
  );

  return (
    <div className="scale-[1.01] w-full max-w-2xl mx-auto">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center aspect-square">
          <Image
            className="rounded-full"
            src={user.avatar}
            height={30}
            width={30}
            alt={user.firstName || "User avatar"}
            priority={false}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "/avatar.png";
            }}
          />
          <p>{user.firstName}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          await createReservationWithData(formData);
          resetRange();
        }}
        className="bg-primary-900 py-8 px-6 sm:px-10 md:px-16 text-base sm:text-lg flex flex-col gap-6 rounded-md">
        {/* Number of Guests */}
        <div className="space-y-2">
          <label htmlFor="numGuests" className="block font-medium">
            How many guests?
          </label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-4 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm sm:text-base"
            required>
            <option value="">Select number of guests...</option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        {/* Observations */}
        <div className="space-y-2">
          <label htmlFor="observations" className="block font-medium">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            rows={4}
            className="px-4 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm sm:text-base"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        {/* Reservation Footer */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-4">
          {!range?.from || !range?.to ? (
            <p className="text-primary-300 text-sm sm:text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton
              className="bg-accent-500 px-5 py-3 sm:px-6 sm:py-3 text-primary-800 font-semibold rounded-sm hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 hover:scale-95 disabled:text-gray-300 w-full sm:w-auto"
              pendingLabel="Reserving...">
              Reserve Now
            </SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}
