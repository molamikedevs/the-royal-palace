import { Suspense } from "react";
import Spinner from "@/app/loading";
import Filter from "@/components/filter/Filter";
import SuiteList from "@/components/suite/SuiteList";
import ReservationReminder from "@/components/reservation/ReservationReminder";

export const metadata = {
  title: "suites",
};

const SuitesPage = async ({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) => {
  // Get the filter from the URL search params
  const searchTerm = await searchParams;
  const filter = searchTerm.capacity ?? "all";

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6">
      <h1 className="text-3xl sm:text-4xl mb-4 sm:mb-5 text-accent-400 font-medium">
        Our Luxury suites
      </h1>
      <p className="text-primary-200 text-base sm:text-lg mb-8 sm:mb-10">
        Cozy yet luxurious suites, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <div className="flex justify-end mb-8 sm:mb-10">
        <Filter />
      </div>
      {/* Suspense is for handling the loading state of SuiteList and ReservationReminder */}
      {/* The Spinner component will be displayed while the data is being fetched */}
      <Suspense fallback={<Spinner />} key={filter}>
        <SuiteList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
};

export default SuitesPage;
