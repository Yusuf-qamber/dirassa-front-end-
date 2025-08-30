import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as noteService from "../../services/noteService.js";

const NoteList = () => {
  const { college } = useParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await noteService.index(college);
        setNotes(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [college]);

  if (loading) return <p>Loading...</p>;
  if (!notes.length) return <p>No notes found {college}</p>;

  return (
    <main className="note-list-container">
      <h1>{college} Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note._id} className="note-card">
            <Link to={`/${college}/notes/${note._id}`}>
              <h2>{note.title}</h2>
              <span>
                {note.owner?.username} <hr /> posted on{" "}
                {new Date(note.createdAt).toLocaleDateString()}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default NoteList;
