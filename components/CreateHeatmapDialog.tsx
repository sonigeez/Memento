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



const supabase = createClientComponentClient();

export default function CreateHeatmapDialog() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isNetworkCall, setIsNetworkCall] = useState(false);

  async function insertHeatmapData(
    name: string,
    description: string
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
    }
    const userId = session.user.id;

    let { data, error } = await supabase
      .from("heatmapss")
      .insert([
        {
          heatmap_name: name,
          heatmap_description: description,
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

    }
    return;
  }

  return (
    <div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add your Memento</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="col-span-3"
            />
          </div>
        </div>
          <DialogPrimitive.Close className="">
          <Button
            onClick={() => insertHeatmapData(name, description)}
            type="submit"
          >
            Save
          </Button>
      </DialogPrimitive.Close>
      </DialogContent>
    </div>
  );
}
