// app/bouquet/page.tsx
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import BouquetOnly from "../../components/bouquet/BouquetOnly";

export default async function AllBouquetsPage() {
  // 1. Fetching ALL bouquets to fill up the garden
  const { data: bouquets, error } = await supabase
    .from("bouquets")
    .select("*");

  // 2. Error handling if the database is acting up
  if (error || !bouquets || bouquets.length === 0) {
    return (
      <div className="text-center p-10">
        <p className="text-gray-500">The Batcave database is currently empty.</p>
        <Link href="/" className="text-blue-500 underline mt-4 block">Go Build One!</Link>
      </div>
    );
  }

  // 3. THE RANDOMIZER: This shuffles the entire collection 
  // so she sees a different "bloom" every time she refreshes.
  const shuffledBouquets = [...bouquets].sort(() => 0.5 - Math.random());

  return (
    <div className="text-center p-4 bg-[#fdfcf0] min-h-screen">
      <Link href="/">
        <Image
          src="/digibouquet.png"
          alt="digibouquet"
          width={180}
          height={60}
          className="mx-auto my-8"
          priority
        />
      </Link>

      <h2 className="text-lg font-serif tracking-widest uppercase mb-2">OUR GARDEN</h2>
      <p className="text-xs italic opacity-40 mb-10">A collection of digital blooms</p>

      {/* 4. Grid layout to match your reference image */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-2">
        {shuffledBouquets.map((bouquet) => (
          <div key={bouquet.id} className="flex flex-col items-center transition-transform hover:scale-105">
            <div className="w-full aspect-square relative">
               <BouquetOnly bouquet={bouquet} />
            </div>
            {/* Optional: Add a very small date or ID below each one */}
            <span className="text-[10px] opacity-30 mt-1 uppercase">
               {new Date(bouquet.created_at).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
