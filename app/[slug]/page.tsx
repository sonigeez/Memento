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
           <Button className="fixed bottom-5 right-5 rounded-full " size="icon">
           <svg width="30" height="30" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
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
            }>Keep Track of your daily wins</div>
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
