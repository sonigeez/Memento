"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const client = createClientComponentClient();

export default function SigninButton() {
  const handleGoogleOauth = async () => {
    await client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/auth/callback",
      },
    });
  };

  return (
    <>
      <div
        onClick={handleGoogleOauth}
        className=" cursor-pointer inline-flex justify-center whitespace-nowrap rounded-lg bg-slate-700 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-slate-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150"
      >
        Login
      </div>
    </>
  );
}
