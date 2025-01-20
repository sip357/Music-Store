export const getBeats = async (lastId: String | null) => {
    const response = await fetch(`/api/instrumentals?${lastId ? `&lastId=${lastId}` : ""}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    });
    return response.json()
}

export const fetchAudio = async (id: String | null) => {
  const response = await fetch(`/api/getAudioURL?${id ? `&id=${id}` : ""}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};
