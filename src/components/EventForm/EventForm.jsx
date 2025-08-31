import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as eventServices from "../../services/eventServics";
const EventForm=(props)=>{
  const navigate = useNavigate();
  const { college } = useParams();
  const {eventId} = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
  });

    useEffect(() => {
    const fetchEvent = async () => {
      const data = await eventServices.showEvent(college,eventId)
      setFormData(data)
    }
    if (eventId) fetchEvent()
  }, [college,eventId])

  	const handleChange = (evt) => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value })
	}

const handleSubmit = async (evt) => {
  evt.preventDefault();

  if (eventId) {
    // update
    await props.handleUpdateEvent(college, eventId, formData);
    navigate(`/${college}/events/${eventId}`);
  } else {
    // create
    await eventServices.createEvent(formData, college);
    navigate(`/${college}/events`);
  }
};

return (
    <main>

      <form onSubmit={handleSubmit}>
        <h1>{eventId?'Edit Event':'Add an Event'}</h1>
        <label htmlFor="title">Title</label>
        <input
          required
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          required
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label htmlFor="location">Location</label>
        <input
          required
          type="text"
          name="location"
          id="location"
          value={formData.location}
          onChange={handleChange}
        />

        <button type="submit">SUBMIT</button>
      </form>
    </main>
)

}

export default EventForm