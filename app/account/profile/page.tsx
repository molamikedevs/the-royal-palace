import { Metadata } from "next";
import { auth } from "@/lib/auth/config";
import { getGuest } from "@/lib/supabase/api";

import UpdateProfileForm from "@/components/common/UpdateProfileForm";
import SelectCountry from "@/components/common/SelectCountry";

export const metadata: Metadata = {
  title: "Profile",
};

const ProfilePage = async () => {
  const session = await auth();
  const guest = session?.user?.email
    ? await getGuest(session.user.email)
    : null;

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6 overflow-hidden">
      <div className="max-w-2xl mx-auto w-full">
        <h2 className="font-semibold text-xl sm:text-2xl text-accent-400 mb-4">
          Update your guest profile
        </h2>
        <p className="text-base sm:text-lg mb-6 sm:mb-8 text-primary-200">
          Providing the following information will make your check-in process
          faster and smoother. See you soon!
        </p>

        <UpdateProfileForm guest={guest}>
          <SelectCountry
            name="nationality"
            id="nationality"
            className="px-4 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm border-none focus:ring-2 focus:ring-accent-500"
            defaultCountry={guest?.nationality}
          />
        </UpdateProfileForm>
      </div>
    </div>
  );
};

export default ProfilePage;
