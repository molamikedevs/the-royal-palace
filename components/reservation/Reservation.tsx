import { Suites } from "@/types";
import { auth } from "@/lib/auth/config";
import { getBookedDatesBySuiteId, getSettings } from "@/lib/supabase/api";

import DateSelector from "./DateSelector";
import LoginMessage from "../auth/LoginMessage";
import ReservationForm from "./ReservationForm";


const Reservation = async ({ suite }: { suite: Suites }) => {
  const session = await auth();
  const user = {
    firstName: session?.user?.name?.split(" ")?.[0] || "Guest",
    avatar: session?.user?.image || "/avatar.png",
  };
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesBySuiteId(String(suite.id)),
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-12 border border-primary-800 rounded-lg p-6 sm:p-8 lg:p-10 mb-12 lg:mb-24">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        suite={suite}
      />
      {session?.user ? (
        <ReservationForm suite={suite} user={user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
};

export default Reservation;
