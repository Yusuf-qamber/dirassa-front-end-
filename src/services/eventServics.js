const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`


const index = async (college) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${BASE_URL}/${college}/events`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

const showEvent = async (college, eventId) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${BASE_URL}/${college}/events/${noteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) throw new Error(`Failed to fetch event: ${res.status}`)
    const data = await res.json()
    return data
  } catch (err) {
    console.error(err)
  }
}


const createEvent = async (formData,college) => {
  try {
    const token = localStorage.getItem('token')
     const res = await fetch(`${BASE_URL}/${college}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}
const updateEvent = async (formData, college, eventId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/${college}/events/${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error(`Failed to update event: ${res.status}`);

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
const deleteEvent = async (eventId,college) => {
  try {
    const token = localStorage.getItem('token')
     const res = await fetch(`${BASE_URL}/${college}/events/${eventId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export{
  index,
  showEvent,
  createEvent,
  updateEvent,
  deleteEvent
}