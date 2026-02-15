export default async function GardenPage() {
  const { data: bouquets, error } = await supabase
    .from("bouquets")
    .select("*");

  if (error || !bouquets || bouquets.length === 0) {
    return <div>The garden is empty. Start planting!</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {bouquets.map((b) => (
        <BouquetOnly key={b.id} bouquet={b} />
      ))}
    </div>
  );
}
