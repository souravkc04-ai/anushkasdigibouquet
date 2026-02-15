// app/bouquet/page.tsx
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import BouquetOnly from "../../components/bouquet/BouquetOnly";

export default async function AllBouquetsPage() {
  // Fetching bouquets from Supabase
  const { data: bouquets, error } = await supabase
    .from("bouquets")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !bouquets) {
    return (
      <div className="text-center p-10">
        <p>Error fetching bouquets. Check Batcave connections.</p>
        <Link href="/" className="text-blue-500 underline mt-4 block">Return Home</Link>
      </div>
    );
  }

  // THE RANDOMIZER: Shuffles the saved bouquets for a fresh look every time
  const shuffledBouquets = [...bouquets].sort(() => 0.5 - Math.random());

  return (
    <div className="text-center p-6">
      <Link href="/">
        <Image
          src="/digibouquet.png"
          alt="digibouquet"
          width={200}
          height={80}
          className="mx-auto my-10"
          priority
        />
      </Link>

      <h2 className="text-xl uppercase mb-4">OUR GARDEN</h2>
      <p className="text-sm opacity-50 mb-10">Thanks for stopping by!</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {shuffledBouquets.map((bouquet) => (
          <div key={bouquet.id} className="flex flex-col items-center border p-4 rounded-lg shadow-sm">
            <BouquetOnly bouquet={bouquet} />
            <p className="text-xs text-gray-400 mt-4">
              Saved on {new Date(bouquet.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
