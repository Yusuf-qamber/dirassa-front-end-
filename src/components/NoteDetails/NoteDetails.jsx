import { useParams,Link } from "react-router-dom";
import { useState, useEffect } from "react";

import * as noteService from "../../services/noteService.js";

const NoteDetails = () => {
  const { college, noteId } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const data = await noteService.showNote(college, noteId);
        setNote(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [college, noteId]);

  if (loading) return <p>Loading note...</p>;
  if (!note) return <p>Note not found.</p>;

  return (
    
      
    <main className="note-details-container">
       <Link to={`/${college}/notes`}>⬅ Back to Notes</Link>
       
      <h1>{note.title}</h1>
      <p>
        By: {note.owner?.username || "Unknown"} | Posted on:{" "}
        {new Date(note.createdAt).toLocaleDateString()}
      </p>
      <p>{note.description}</p>

      {note.file_url && (
        <p>
          <a href={note.file_url} target="_blank" rel="noreferrer">
            Open File
          </a>
        </p>
      )}

     <section className="comments">
        <h2>Comments</h2>
        {note.comments?.length ? (
          <ul>
            {note.comments.map((comment) => (
              <li key={comment._id}>
                <p>
                  <strong>{comment.author?.username || "Unknown"}:</strong>{" "}
                  {comment.content}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </section>

      
    </main>
  );
};

export default NoteDetails;
