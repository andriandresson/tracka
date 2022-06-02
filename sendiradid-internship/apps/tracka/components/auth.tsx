import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Auth = ({ children }) => {
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
    <div className="content">
    {children}
    </div>
    );
};

export default Auth