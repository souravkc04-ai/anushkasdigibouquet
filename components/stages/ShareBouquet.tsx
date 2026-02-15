"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useBouquet } from "../../context/BouquetContext";
import BouquetOnly from "../bouquet/BouquetOnly";
import Link from "next/link";

export default function ShareBouquet() {
  const { bouquet } = useBouquet();
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSaveToGarden = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("bouquets")
        .insert([
          { 
            flowers: bouquet.flowers, 
            letter: bouquet.letter,
            created_at: new Date().toISOString() 
          }
        ]);

      if (error) throw error;
      setSaved(true);
    } catch (err) {
      console.error("Error saving:", err);
      alert("The Batcave is having trouble saving. Try again!");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-lg uppercase mb-6">Send the Bouquet</h2>
      
      <div className="w-full max-w-sm mb-10">
         <BouquetOnly bouquet={bouquet} />
      </div>

      {!saved ? (
        <button
          onClick={handleSaveToGarden}
          disabled={isSaving}
          className="bg-black text-white px-8 py-3 uppercase text-xs tracking-widest hover:opacity-80 transition-all"
        >
          {isSaving ? "Planting in Garden..." : "Save this Bouquet"}
        </button>
      ) : (
        <div className="text-center">
          <p className="text-green-600 font-medium mb-4">Successfully planted! 🌸</p>
          <Link href="/garden" className="bg-black text-white px-8 py-3 uppercase text-xs tracking-widest inline-block">
            View the Garden
          </Link>
        </div>
      )}

      <button onClick={() => window.location.reload()} className="mt-8 text-[10px] uppercase opacity-40">
        Start Over
      </button>
    </div>
  );
}
