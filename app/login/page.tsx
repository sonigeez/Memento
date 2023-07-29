import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Login(){
    
    return(
        <>
        <h1>Login to your heatmap</h1>
        <div>Good to have you back</div>
        <Button className="block"> Sign in with google</Button>
        <Link href="/signup"> <div>or sign up</div></Link>
        
        </>
    )
}