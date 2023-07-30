"use client";

import { useRouter } from "next/dist/client/components/navigation";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";

type FloatingLeftButtonProps = {
  isCurrentUser: boolean;
};

export default function FloatingLeftButton(props: FloatingLeftButtonProps) {
  const { toast } = useToast();
    const router = useRouter();

  function onClickHandler() {
    if (props.isCurrentUser) {
      //copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Copied to clipboard",
      });
    } else {
        router.push("/");
    }
  }

  return (
    <>
      <Button
        onClick={onClickHandler}
        className="fixed shimmer-effect shimmer font-bold bottom-3 left-5 bg-green-200 text-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60"
      >
        {!props.isCurrentUser ? "Get your Memento" : "Share your Memento"}
      </Button>
    </>
  );
}
