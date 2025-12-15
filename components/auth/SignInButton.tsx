"use client";

import { useState } from "react";
import Image from "next/image";
import { signInAction } from "@/lib/actions";

function SignInButtons() {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleSignIn = (provider: string) => {
    setLoadingProvider(provider);
  };

  return (
    <div className="flex flex-col sm:flex-row  gap-4 w-full max-w-sm mx-auto px-4 sm:px-0">
      {/* Google Button */}
      <form
        action={signInAction}
        onSubmit={() => handleSignIn("google")}
        className="w-full mb-5 mb:mb-2 hover:scale-95 transition-transform">
        <input type="hidden" name="provider" value="google" />
        <button
          type="submit"
          disabled={loadingProvider === "google"}
          className="flex items-center justify-center gap-3 sm:gap-4 text-sm sm:text-base border border-primary-300 px-4 sm:px-6 py-3 font-medium w-full rounded-lg disabled:opacity-75 disabled:cursor-wait min-h-[50px] sm:min-h-[56px] relative">
          {loadingProvider === "google" && (
            <span className="absolute left-4 inline-block h-5 w-5 sm:h-6 sm:w-6 border-2 border-t-transparent border-primary-300 rounded-full animate-spin"></span>
          )}
          <div className="relative h-5 w-5 sm:h-6 sm:w-6">
            <Image
              src="https://authjs.dev/img/providers/google.svg"
              alt="Google logo"
              fill
              className="object-contain"
            />
          </div>
          <span>Continue with Google</span>
        </button>
      </form>

      {/* GitHub Button */}
      <form
        action={signInAction}
        onSubmit={() => handleSignIn("github")}
        className="w-full hover:scale-95 transition-transform">
        <input type="hidden" name="provider" value="github" />
        <button
          type="submit"
          disabled={loadingProvider === "github"}
          className="flex items-center justify-center gap-3 sm:gap-4 text-sm sm:text-base border border-primary-300 px-4 sm:px-6 py-3 font-medium w-full rounded-lg disabled:opacity-75 disabled:cursor-wait min-h-[50px] sm:min-h-[56px] relative">
          {loadingProvider === "github" && (
            <span className="absolute left-4 inline-block h-5 w-5 sm:h-6 sm:w-6 border-2 border-t-transparent border-primary-300 rounded-full animate-spin"></span>
          )}
          <div className="relative h-5 w-5 sm:h-6 sm:w-6">
            <Image
              src="https://authjs.dev/img/providers/github.svg"
              alt="GitHub logo"
              fill
              className="object-contain"
            />
          </div>
          <span>Continue with GitHub</span>
        </button>
      </form>
    </div>
  );
}

export default SignInButtons;
