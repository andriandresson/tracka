import { useSession } from 'next-auth/react'


export function Index() {
  const { data: session} = useSession()

  
  if(session){
    return (
      <h1>you can only see this if you are logged in</h1>
    )
  }else {
     return <h1>You are not logged in</h1>
  }
}
Index.auth = true
export default Index;
