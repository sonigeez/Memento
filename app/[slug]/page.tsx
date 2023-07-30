import HeatMap from "@/components/HeatMap";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import CreateHeatmapDialog from "@/components/CreateHeatmapDialog";
import FloatingLeftButton from "@/components/FloatingRightButton";

export default async function Page({ params }: { params: { slug: string } }) {
  const supabase = createServerComponentClient({ cookies });
  let heatmaps: HeatmapType[] = [];
  let isCurrentUser = false;

  const { data: user, error } = await supabase
    .from("users")
    .select()
    .eq("username", params.slug)
    .maybeSingle();
  if (error) {
    console.log(error);
  } else {
    if (user == null) {
      console.log("user not found");
    }else{
      let { data: heatmapss, error: err } = await supabase
      .from("heatmapss")
      .select("*")
      .eq("user_id", user.id??'');

    if (error) {
      console.log(err);
    } else {
      heatmaps = heatmapss || [];
      isCurrentUser =   user.id == (await supabase.auth.getUser()).data?.user?.id;
      ;
    }
    }
   
  }

  
  return (
    <div>
      <Dialog>
        <CreateHeatmapDialog />

        <DialogTrigger asChild>
          {isCurrentUser ? (
           <Button className="fixed bottom-3 right-5 rounded-full ring-2 ring-gray-500 ring-offset-4 ring-offset-white text-xl" size="icon">
           +
         </Button> ): null}
        
        </DialogTrigger>

        <div className="h-screen w-screen flex flex-col lg:flex-row">
          <div className="lg:w-1/3 w-full flex flex-col  p-4 ">
            <div style={
              {
              fontFamily: "Bebas Neue",
              fontSize: "3rem",
              }
            }>Memento</div>
            <div style={
               {
                fontFamily: "Bebas Neue",
                fontSize: "1rem",
                }
            }>Kepp Track of your daily wins</div>
            <FloatingLeftButton isCurrentUser={isCurrentUser} />

          </div>
          <div className="hidden lg:block border-r-2"></div>

          <div className="lg:w-2/3 w-full flex flex-col p-4 overflow-y-auto">
            <ul>{
              heatmaps.length == 0?
               (<div className="text-center">No Memento yet</div>):null
              }
              {heatmaps.map((heatmap: HeatmapType) => (
                <div>{<HeatMap isCurrentUser={isCurrentUser} heatmap={heatmap} />}</div>
              ))}
            </ul>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export interface UserType {
  id: string;
  username: string;
  email: string;
  created_at: string;
}

export interface HeatmapType {
  id: string;
  heatmap_name: string;
  user_id: string;
  created_at: string;
}
