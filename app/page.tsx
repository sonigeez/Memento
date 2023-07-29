import Link from "next/link";
import { Button } from "@/components/ui/button";
export const dynamic = "force-dynamic";

export default async function Index() {

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="space-y-4 text-center">
        <div className="text-lg">Heatmap</div>
        <div className="text-lg">Text line 2</div>
        <div className="text-lg">Welcome to Heatmap</div>
        <Button className="block">Create Your Heatmap</Button>
        <Link href="/login"><Button variant="ghost">Login</Button></Link>
      </div>
    </div>
  );
}
