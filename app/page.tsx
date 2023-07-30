export const metadata = {
  title: "Memento",
  description: "Page description",
};

import Image from "next/image";
import Particles from "@/components/particles";
import Shape from "@/public/shape.svg";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SignupDialog from "@/components/SignupDialog";
import SigninButton from "@/components/LoginButton";

export default function Page() {


  return (
    <>
      <Dialog>
        <SignupDialog />
        <main className="relative min-h-screen flex flex-col justify-center bg-slate-900 overflow-hidden">
          <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
            <div
              className=" cursor-pointer fixed left-8 top-4 text-slate-200"
              style={{
                fontFamily: "Bebas Neue",
                fontSize: "3rem",
              }}
            >
              Memento
            </div>

            <div className="text-center">
              <div
                className="absolute top-0 left-0 rotate-180 -translate-x-3/4 -scale-x-100 blur-3xl opacity-70 pointer-events-none"
                aria-hidden="true"
              >
                <Image
                  src={Shape}
                  className="max-w-none"
                  width={852}
                  height={582}
                  alt="Illustration"
                />
              </div>
              <div
                className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 blur-3xl opacity-70 pointer-events-none"
                aria-hidden="true"
              >
                <Image
                  src={Shape}
                  className="max-w-none"
                  width={852}
                  height={582}
                  alt="Illustration"
                />
              </div>

              <Particles className="absolute inset-0 pointer-events-none" />

              <div className="relative">
                <h1 className="inline-flex font-extrabold text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">
                  Journal your daily wins
                </h1>
                <div className="max-w-3xl mx-auto mb-8">
                  <p className="text-lg text-slate-400">
                    Start Journaling Your Wins Today{" "}
                  </p>
                </div>
                <div className="inline-flex justify-center space-x-4">
                  <div>
                    <DialogTrigger asChild>
                      <div className=" cursor-pointer inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 group">
                        Sign Up
                      </div>
                    </DialogTrigger>
                  </div>
                  <div>
                   <SigninButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Dialog>
    </>
  );
}
