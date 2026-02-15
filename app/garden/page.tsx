// app/bouquet/page.tsx
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import BouquetOnly from "../../components/bouquet/BouquetOnly";

export default function AllBouquetsPage() {
  return (
    <div className="text-center p-6">
      <Link href="/">
        <Image
          src="/digibouquet.png"
          alt="digibouquet"
          width={200}
          height={80}
          className="object-cover mx-auto my-10"
          priority
        />
      </Link>

      {/* Page Title */}
      <h2 className="text-xl uppercase mb-4">OUR GARDEN</h2>
      <p className="text-sm opacity-50 mb-10">Thanks for stopping by!</p>

      <GardenContent />
    </div>
  );
}

// Separate component to handle the randomizing logic
async function GardenContent() {
  const { data, error } = await supabase
    .from("bouquets")
    .select("*");

  if (error || !data) {
    return <div>Error fetching bouquets. Check Batcave connections.</div>;
  }

  // THE RANDOMIZER: Shuffles the fetched bouquets
  const shuffledBouquets = [...data].sort(() => 0.5 - Math.random());

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {shuffledBouquets.map((bouquet) => (
        <div key={bouquet.id} className="flex flex-col items-center">
          <div className="w-full">
             <BouquetOnly bouquet={bouquet} />
          </div>
          <p className="text-xs text-gray-500 mt-4">
            {new Date(bouquet.created_at).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
