import {
  createRouteHandlerClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }
  const client = createServerComponentClient({ cookies });
  const session = await client.auth.getSession();
  const email = session.data.session?.user.email;
  const username = requestUrl.searchParams.get("username");

  if(username){
    const { data, error } = await client
    .from("users")
    .insert([
      { username: username, email: email, id: session.data.session?.user.id },
    ]);
// URL to redirect to after sign in process completes
    return NextResponse.redirect(
    requestUrl.origin + "/" + requestUrl.searchParams.get("username")
    );
  }else{
    let { data: users, error } = await client
    .from('users')
    .select('*')
    .eq('email', email)
    .maybeSingle();
    if(users){
      console.log("routing to " + users.username)

      return NextResponse.redirect(
        requestUrl.origin + "/" + users.username
        );
      }else{
        const randomNumber = Math.floor(100000000 + Math.random() * 900000000);

        const { data, error } = await client
        .from("users")
        .insert([
          { username: randomNumber, email: email, id: session.data.session?.user.id },
        ]);
        console.log("routing to random number")
        return NextResponse.redirect(
          requestUrl.origin + "/" + randomNumber
          );
      }




  }


  
}
