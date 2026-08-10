const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

const getProfile = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/currentUser`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.err || "Failed to fetch profile");
  return data;
};

const addNoteToFavorites = async (noteId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/favorites/notes/${noteId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

const addEventToFavorites = async (eventId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/favorites/events/${eventId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export { getProfile, addNoteToFavorites, addEventToFavorites };
