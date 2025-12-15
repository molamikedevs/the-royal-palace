import SignInButtons from "@/components/auth/SignInButton";

export const metadata = {
  title: "Login - The Royal Palace",
};

const page = () => {
  return (
    <div className="flex flex-col mt-10 gap-10 items-center">
      <h2 className="text-xl sm:text-3xl font-semibold text-center pt-[15vh] md:pt-0">
        Sign in to access your guest area
      </h2>
      <SignInButtons />
    </div>
  );
};

export default page;
