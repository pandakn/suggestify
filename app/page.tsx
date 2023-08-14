import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

// components
import Recommendation from "@/components/Recommendation";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Recommendation />
    </main>
  );
}
