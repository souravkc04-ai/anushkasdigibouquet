import { supabase } from "@/lib/supabase"; // Ensure this import is at the top
// ... other imports

export default function ShareBouquet() {
  const { bouquet } = useBouquet();
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveToGarden = async () => {
    setIsSaving(true);
    try {
      // Sending the bouquet data to your Supabase "bouquets" table
      const { error } = await supabase
        .from("bouquets")
        .insert([
          { 
            flowers: bouquet.flowers, 
            letter: bouquet.letter,
            created_at: new Date() 
          }
        ]);

      if (error) throw error;
      alert("Bouquet successfully planted in the garden! 🌸");
    } catch (err) {
      console.error("Error saving:", err);
      alert("Failed to save to garden. Check Batcave power levels.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* ... your bouquet and letter display code ... */}

      <button
        onClick={handleSaveToGarden}
        disabled={isSaving}
        className="bg-black text-white px-8 py-3 uppercase text-sm tracking-widest hover:opacity-80 transition-all"
      >
        {isSaving ? "Planting..." : "Save this Bouquet"}
      </button>
      
      <Link href="/garden" className="mt-4 text-xs underline opacity-50">
        View the Garden
      </Link>
    </div>
  );
}
