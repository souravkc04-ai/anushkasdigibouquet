  const handleSaveToGarden = async () => {
    setIsSaving(true);
    try {
      const { data, error } = await supabase
        .from("bouquets")
        .insert([
          { 
            flowers: bouquet.flowers, 
            letter: bouquet.letter 
          }
        ]);

      if (error) throw error;
      setSaved(true); // This triggers the "Successfully planted" message
    } catch (err) {
      console.error(err);
      alert("Save failed. Check Supabase RLS.");
    } finally {
      setIsSaving(false);
    }
  };
