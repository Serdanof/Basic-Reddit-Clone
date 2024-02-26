import { unstable_noStore as noStore } from "next/cache";

export default async function Home() {
  noStore();

  return (
    <main className="flex justify-center items-center w-full h-screen">

    </main>
  );
}
