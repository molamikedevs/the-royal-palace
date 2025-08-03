"use server"

import { signIn, signOut } from "../auth/config";



// This function handles the sign-in action for different providers
// It expects a FormData object with a "provider" field
export async function signInAction(formData: FormData) {
  const provider = formData.get("provider");
  if (provider === "google" || provider === "github") {
    await signIn(provider as string, {
      redirectTo: "/account",
    });
  } else {
    throw new Error("Invalid provider");
  }
} 

// This function handles the sign-out action
export async function signOutAction() {
  await signOut({
    redirectTo: "/",}, 
);
}