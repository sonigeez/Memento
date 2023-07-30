"use client";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
const client = createClientComponentClient();


export default function SignupDialog() {
    const [username, setUsername] = useState<string | null>(null);

  const handleGoogleOauth = async () => {
    //TODO: check if user already exists

    await client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/auth/callback" + "?username=" + username ,
      },
    });
  };
  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Get yourself a username</DialogTitle>
          <DialogDescription>
            
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value={username??''} onChange={(e)=> setUsername(e.target.value)} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button disabled={username == null || username == ""} onClick={handleGoogleOauth} type="submit">Signup with Google</Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
}
