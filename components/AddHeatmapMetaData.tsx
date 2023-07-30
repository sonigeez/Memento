"use client";
import { useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { useRouter } from 'next/navigation';
import { useToast } from "./ui/use-toast";


const supabase = createClientComponentClient();

type AddHeatmapMetaDataProps = {
  id: string;
};
export default function AddHeatmapMetaData(
  props: AddHeatmapMetaDataProps
): JSX.Element {
  const router = useRouter();
  const { toast } = useToast()


  const [rating, setRating] = useState(0);
  const [isNetworkCall, setIsNetworkCall] = useState(false);
  async function saveHeatmapData(){

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
    (userId);

    let { data, error } = await supabase
      .from("heatmap_data")
      .insert([
        {
          heatmap_id: props.id,
          value: rating,
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add your today's wins</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-y-6 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Rate
            </Label>
            <Input
              id="name"
              placeholder="Rate it between 1-10"
              value={rating}
              onChange={(e) => {
                const newValue = e.target.value;
                if (newValue === "") {
                  setRating(0);
                } else {
                  const numberValue = Number(newValue);
                  if (
                    !isNaN(numberValue) &&
                    numberValue >= 1 &&
                    numberValue <= 10
                  ) {
                    setRating(numberValue);
                  }
                }
              }}
              className="col-span-3"
            />
          </div>
          <DialogPrimitive.Close className=" w-20">
          <Button onClick={saveHeatmapData} type="submit">Save</Button>
          </DialogPrimitive.Close>
        </div>
       
      </DialogContent>
    </div>
  );
}
