import SpotifyAuthButton from "@/components/SpotifyAuthButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

// components
import Recommendation from "@/components/Recommendation";
import Header from "@/components/Header";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-5">
      {!session ? (
        <SpotifyAuthButton />
      ) : (
        <>
          <Header />
          <Recommendation />
        </>
      )}
    </main>
  );
}
