import { HeatmapType } from "@/app/[slug]/page";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import AddHeatmapMetaData from "./AddHeatmapMetaData";

type HeatMapProps = {
  heatmap: HeatmapType;
  isCurrentUser: boolean;
};

function getDateFromDayNum(dayNum: number): Date {
  const date = new Date(2023, 0); // Start at January 1st, 2023
  date.setDate(dayNum);
  return date;
}

function formatDate(date: Date): string {
  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString(); // +1 because months are 0-indexed
  let year = date.getFullYear().toString().substr(-2); // get last two digits of year

  // If day or month is single digit add a leading zero
  if (day.length < 2) day = "0" + day;
  if (month.length < 2) month = "0" + month;

  return day + "/" + month + "/" + +year;
}

function areDatesEqualWithoutTime(date1: Date, date2: Date): boolean {
  // Extract year, month, and day from the first date
  const year1 = date1.getFullYear();
  const month1 = date1.getMonth();
  const day1 = date1.getDate();

  // Extract year, month, and day from the second date
  const year2 = date2.getFullYear();
  const month2 = date2.getMonth();
  const day2 = date2.getDate();

  // Compare the components (year, month, and day)
  return year1 === year2 && month1 === month2 && day1 === day2;
}

export default async function HeatMap({
  heatmap, isCurrentUser
}: HeatMapProps): Promise<JSX.Element> {
  const supabase = createServerComponentClient({ cookies });

  let { data: heatmap_data, error } = await supabase
    .from("heatmap_data")
    .select("*")
    .eq("heatmap_id", heatmap.id);

  if (error) {
    console.log(error);
  } else {
    
  }

  const currentDate = new Date(); // This will get the current date
  let isCurrentDate = heatmap_data!.some((d) =>
    areDatesEqualWithoutTime(new Date(d.created_at), currentDate)
  );

  console.log(isCurrentDate);
  return (
    <div>
      <Dialog>
        {!isCurrentDate && isCurrentUser ? <AddHeatmapMetaData id={heatmap.id} /> : null}

        <div className="mb-10">
          <div className="flex flex-row">
            <div className="font-['Bangers'] tracking-wider	 text-2xl">
              {heatmap.heatmap_name}
            </div>

            <DialogTrigger asChild>
              {!isCurrentDate ? (
                <>
                  <Button
                    variant="secondary"
                    className=" mx-4 mb-2 rounded-full h-8 w-8 flex items-center justify-center text-lg"
                    size="icon"
                  >
                    +
                  </Button>
                </>
              ) : null}
            </DialogTrigger>
          </div>

          <div
            className="overflow-auto grid gap-x-1.5  "
            style={{
              gridAutoFlow: "column",
              gridTemplateRows: "repeat(7, 1fr)",
              gridTemplateColumns: "repeat(auto-fill, 1fr)",
            }}
          >
            {" "}
            {[...Array(7 * 4 * 12)].map((_, i) => {
              const date = getDateFromDayNum(i + 1);
              const data = heatmap_data!.find((d) =>
                areDatesEqualWithoutTime(new Date(d.created_at), date)
              );
              const opacity = data ? data.value * 0.1 : 0;

              return (
                <div>
                  <TooltipProvider>
                    <Tooltip delayDuration={500}>
                      <TooltipTrigger>
                        <div
                          key={i}
                          className=" h-6 w-6 border rounded-sm border-gray-400 transition-all duration-300 ease-in-out"
                          style={{
                            background: `rgba(0, 0, 0, ${opacity})`,
                            borderColor:
                              opacity === 0 ? "#D9D9D9" : "transparent",
                          }}
                        ></div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{formatDate(date)+ `${data? " rating "+data.value:""}` }</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              );
            })}
          </div>
        </div>
      </Dialog>
    </div>
  );
}
