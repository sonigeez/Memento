"use client";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from 'next/navigation';
import { Dialog } from "@radix-ui/react-dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react";
import { useToast } from "./ui/use-toast";



const supabase = createClientComponentClient();

export default function CreateHeatmapDialog() {
  const router = useRouter();
  const { toast } = useToast()


  const [name, setName] = useState("");
  const [isNetworkCall, setIsNetworkCall] = useState(false);

  async function insertHeatmapData(
    name: string,
  ): Promise<any> {

    if (isNetworkCall) return;
    setIsNetworkCall(true);

    const { data: session, error: sessionError } =
      await supabase.auth.getUser();
    if (sessionError) {
      setIsNetworkCall(false);
      console.log(sessionError);
      return;
    } else {
      setIsNetworkCall(true);
      setName("");
    }
    const userId = session.user.id;

    let { data, error } = await supabase
      .from("heatmapss")
      .insert([
        {
          heatmap_name: name,
          user_id: userId,
        },
      ])
      .select();
    if (error) {
      setIsNetworkCall(false);
      console.log(error);
    } else {
      setIsNetworkCall(false);
      router.refresh();
      toast({
        title: "Saved",
      })

    }
    return;
  }

  return (
    <div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add your Memento</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-y-6">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              onChange={(e) => setName(e.target.value)}
              id="name"
              value={name}
              className="col-span-3"
            />
          </div>
          <Button
            onClick={() => insertHeatmapData(name)}
            type="submit"
            className="w-20"
            disabled={isNetworkCall || name == ""}
          >
          <DialogPrimitive.Close className="">

            Add
      </DialogPrimitive.Close>

          </Button>
        </div>
       
      </DialogContent>
    </div>
  );
}
