import { Link, useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as eventServics from "../../services/eventServics";

const validColleges = [
  "it",
  "business",
  "science",
  "law",
  "engineering",
  "art",
];

const EventList = () => {
  const { college } = useParams();
  if (!validColleges.includes(college)) {
    return <Navigate to="/" replace />;
  }

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventServics.index(college);
        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [college]);

  if (loading) return <p>Loading...</p>;
  if (!events.length) return <p>No events found in {college}</p>;

  return(
        <main className="event-list-container">
      <h1>{college} Events</h1>
      <li>
        <Link to={`/${college}/events/new`}>Add an Event</Link>
      </li>
      <ul>
        {events.map((event) => (
          <li key={event._id} className="event-card">
            <Link to={`/${college}/events/${event._id}`}>
              <h2>{event.title}</h2>
              <span>
                {event.owner?.username} <hr /> posted on{" "}
                {new Date(event.createdAt).toLocaleDateString()}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
};
export default EventList;
