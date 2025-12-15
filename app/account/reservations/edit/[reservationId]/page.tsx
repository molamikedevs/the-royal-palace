import { updateReservationAction } from "@/lib/actions";
import { getReservation, getSuiteById } from "@/lib/supabase/api";
import SubmitButton from "@/components/auth/SubmitButton";

export default async function Page({
  params,
}: {
  params: { reservationId: string };
}) {
  const { reservationId } = params;
  const reservation = await getReservation(reservationId.toString());
  const { numGuests, observations, suiteId } = reservation;
  const { maxCapacity } = await getSuiteById(suiteId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <form
        action={updateReservationAction}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
        <input type="hidden" name="reservationId" value={reservationId} />
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            defaultValue={numGuests}
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required>
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            defaultValue={observations}
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <div className="flex justify-end items-center gap-4 sm:gap-6 w-full">
            <SubmitButton
              pendingLabel="Updating..."
              className="px-6 py-3 sm:px-8 sm:py-4">
              Update Reservation
            </SubmitButton>
          </div>
        </div>
      </form>
    </div>
  );
}
