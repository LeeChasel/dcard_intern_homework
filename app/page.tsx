'use client'
import {useRouter} from 'next/navigation';

const scope = "repo%20user"; 

function login(router: any)
{
  let windowWidth : number = 500;
  let windowHeight : number = 700;
  const y = window.top!.outerHeight / 2 + window.top!.screenY - (windowHeight / 2);
  const x = window.top!.outerWidth / 2 + window.top!.screenX - (windowWidth / 2);
  let popup = window.open(`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}&scope=${scope}`,"", `top=${y}, left=${x}, width=${windowWidth}, height=${windowHeight}`)!;
  listenPopup();
  function listenPopup()
  {
    try {
      if (popup.location.pathname == "/authorizeRes")
      {
        let urlParams = new URLSearchParams(popup.location.search);
        if (!urlParams.has("code"))
        {
          window.alert("Don't have code in popup window url");
          return;
        }
        processToken(urlParams.get("code")!, router)
      } else {
        setTimeout(listenPopup, 2000);
      }
    } catch (err) {
      // To handle CORS
      setTimeout(listenPopup, 2000);
    }
  }

  async function processToken(code:string, router:any) {
    await wait(500);
    popup.close();
    const token = await getToken(code);
    router.push("AfterLogin?access_token=" + token);   
  }

    function wait(ms:number) 
    {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    function getToken(code: string)
    {
      return fetch("api/getToken?code=" + code).then(res => res.json()).then(json => json.access_token);
    }
}

export default function Home() 
{
  const router = useRouter();
  return (
    <main>
      <button onClick={() => login(router)}>Click to oauth</button>
    </main>
  )
}