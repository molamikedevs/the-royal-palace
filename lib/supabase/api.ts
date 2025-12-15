import { Reservations, Suites } from "@/types";
import { supabase } from "./config";
import { notFound } from "next/navigation";
import { eachDayOfInterval } from "date-fns";

export const getSuites = async function (): Promise<Suites[]> {
  try {
    // Execute the Supabase query:
    // 1. Select from 'suites' table
    // 2. Only get specified columns
    // 3. Order results by suites name
    const { data, error } = await supabase
      .from("suites")
      .select(
        "id, name, maxCapacity, regularPrice, discount, image, description"
      )

      .order("name");

    if (error) {
      throw new Error(`Suites could not be loaded: ${error.message}`);
    }

    // Check if data is returned
    if (!data) {
      throw new Error("No Suites data returned from query");
    }

    // Return the fetched suites data
    return data;
  } catch (error) {
    throw new Error("Failed to load suites. Please try again later.");
  }
};

export const getSuiteById = async function (id: string): Promise<Suites> {
  try {
    // Execute the Supabase query:
    // 1. Select from 'suites' table
    // 2. Only get specified columns
    // 3. Filter by the provided ID
    const { data, error } = await supabase
      .from("suites")
      .select(
        "id, name, maxCapacity, regularPrice, discount, description, image"
      )
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(`Suite could not be loaded: ${error.message}`);
    }

    if (!data) {
      throw new Error("No Suite data returned from query");
    }
    return data;
  } catch (error) {
    notFound();
  }
};

export async function getBookedDatesBySuiteId(
  suiteId: string
): Promise<Date[]> {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todayISOString = today.toISOString();

  // Getting all reservations
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .eq("suiteId", suiteId)
    .or(`startDate.gte.${todayISOString},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error("Reservations could not get loaded");
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates: Date[] = data
    .map((reservation) => {
      return eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
}

export async function createGuest(newGuest: {
  email: string;
  fullName: string;
}) {
  const { data, error } = await supabase.from("guests").insert([newGuest]);
  if (error) {
    console.error("Supabase insert error:", error);
    throw error;
  }
  return data;
}

export async function getGuest(email: string) {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();
  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
  }
  return data;
}

export async function getReservations(
  guestId: string
): Promise<Reservations[]> {
  const { data, error, count } = await supabase
    .from("reservations")
    // We actually also need data on the suites as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
    .select(
      "id, created_at, startDate, endDate, status, numNights, numGuests, observations, totalPrice, guestId, suiteId, suitePrice, suites(name, image)"
    )
    .eq("guestId", guestId)
    .order("startDate");

  if (error) {
    console.error(error);
    throw new Error("Reservation could not get loaded");
  }

  return data.map((reservation) => ({
    ...reservation,
    suites:
      reservation.suites && Array.isArray(reservation.suites)
        ? reservation.suites[0]
        : reservation.suites,
  }));
}

export async function getReservation(id: string): Promise<Reservations> {
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Reservation could not get loaded");
  }

  return data;
}
