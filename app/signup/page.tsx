'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
const client = createClientComponentClient();


export default function Signup() {
  const [username, setUsername] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  //router
  const router = useRouter();
  //google ouath handler
  const handleGoogleOauth = async () => {

    //TODO: check if user already exists

     await client.auth.signInWithOAuth(

      {
        provider: 'google',
        options: {
          redirectTo: window.location.origin + "/auth/callback?username=" + username,

        }
      }
     
     )
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const saveUserName = () => {
    setUsername(inputValue);
  }
  //TODO: check if username is taken
  
  return (
    <div>
      {username ? (
        <div>
          <div>
            heatmap.sonigeez.tech/{username} is yours
          </div>
          <div>
            now create your account
          </div>
          <Button onClick={handleGoogleOauth}>Sign in with Google</Button>
        </div>
      ) : (
        <div>
          <h1>Claim your heatmap</h1>
          <Input className='my-6' type="text" placeholder="username" onChange={handleInputChange} />
          <Button onClick={saveUserName} className='block'>Grab your link</Button>
          <Link href="/login"> <div>or log in</div></Link>
        </div>
      )}
    </div>
  )
}
