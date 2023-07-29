import HeatMap from "@/components/HeatMap";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CreateHeatmapDialog from "@/components/CreateHeatmapDialog";

export default async function Page({ params }: { params: { slug: string } }) {
  const supabase = createServerComponentClient({ cookies });
  const imageSrc = (await supabase.auth.getUser()).data?.user?.user_metadata
    .avatar_url;
  const title = params.slug; // replace with your title text
  let heatmaps: HeatmapType[] = [];


  const { data: user, error } = await supabase
    .from("users")
    .select()
    .eq("username", params.slug)
    .maybeSingle();
  if (error) {
    console.log(error);
  } else {
    console.log(user);
    let { data: heatmapss, error: err } = await supabase
      .from("heatmapss")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.log(err);
    } else {
      heatmaps = heatmapss || [];
      console.log(heatmapss);
    }
  }

  let isCurrentUser = user.id == (await supabase.auth.getUser()).data?.user?.id;

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
          <div className="lg:w-1/3 w-full flex flex-col  p-4 text-center">
            {/* <Avatar className="h-16 w-16 sm:h-20 sm:w-20 lg:h-32 lg:w-32 xl:h-52 xl:w-52">
              <AvatarImage src={imageSrc} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar> */}
            <h1 className="text-2xl text-center lg:text-left">{title}</h1>
          </div>
          <div className="hidden lg:block border-r-2"></div>

          <div className="lg:w-2/3 w-full flex flex-col p-4 overflow-y-auto">
            <ul>{
              heatmaps.length == 0?
               (<div className="text-center">No heatmaps yet</div>):null
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
