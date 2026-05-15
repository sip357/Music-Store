export const getInstrumentals = async (lastId: String | null) => {
  try {
    const response = await fetch(`/api/getBeats/multiple?cursor=${lastId || ""}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    });
    console.log("API Response", response);
    return await response.json()
  } catch (error) {
      console.error("Error fetching beats:", error);
      return null;
  }
}
