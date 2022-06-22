import { Navbar } from "@sendiradid-internship/tracka-ui";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { ReactQueryDevtools } from "react-query/types/devtools";

interface WithAuthProps {
  session: {
    user: {
      accessToken: string
      refreshToken: string
      oAuthToken: string
      id: number
      defaultTeam: string
    }
  }

}


export const withAuth = (Component) => {
  return (props) => {
    const Comp = Component as FC<WithAuthProps>;
    const { data: session, status } = useSession();
    const loading = status === "loading";
    const hasUser = !!session?.user;
    const router = useRouter();
    useEffect(() => {
      if (!loading && !hasUser) {
        router.push("/login?callbackUrl=http%3A%2F%2Flocalhost%3A4200");
      }
    }, [loading, hasUser]);
    if (loading || !hasUser) {
      return <div>Waiting for session...</div>;
    }
    return (
      <>
        <Navbar></Navbar>
        <Comp {...props} session={session} />
      </>
    )
  };
}