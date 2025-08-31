import { useParams, Link ,Navigate ,useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import * as noteService from "../../services/noteService.js";
import CommentForm from "../CommentForm/CommentForm.jsx";


const NoteDetails = (props) => {
  const navigate=useNavigate()
  const { college, noteId } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const data = await noteService.showNote(college, noteId);
        setNote(data);
      } catch (err) {
        console.error(err);
        setNote(null);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [college, noteId]);

  if (loading) return <p>Loading note...</p>;
  if (!note) return<Navigate to={`/${college}/notes`} replace />
  //  <p>Note not found.</p>;

  const handleAddComment = async (commentFormData) => {
    const newComment = await noteService.createComment(
      college,
      noteId,
      commentFormData
    );
    setNote({ ...note, comments: [...note.comments, newComment] });
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await noteService.deleteComment(college, noteId, commentId);
      setNote({
        ...note,
        comments: note.comments.filter((c) => c._id !== commentId),
      });
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  const handleEditClick = (comment) => {
    setEditingCommentId(comment._id);
    setEditContent(comment.content);
  };

const handleUpdateComment = async (commentId) => {
  try {
    const updatedComment = await noteService.updateComment(
      college,      
      noteId,
      commentId,
      { content: editContent }
    );

    setNote({
      ...note,
      comments: note.comments.map((c) =>
        c._id === commentId ? updatedComment : c
      ),
    });
    setEditingCommentId(null);
    setEditContent("");
  } catch (err) {
    console.error("Error updating comment:", err);
  }
};


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
{note.owner?._id === props.user?._id && (
  <>   
    <Link to={`/${college}/notes/${noteId}/edit`}>Edit</Link>       
    <button onClick={() => props.handleDeleteNote(college, noteId)}>Delete</button>
  </>
)}

      <section>
        <h2>Comments</h2>
        {props.user ? (
    <CommentForm handleAddComment={handleAddComment} user={props.user} />
  ) : (
    <p>You must be logged in to comment.</p>
  )}
 
        {!note.comments.length && <p>There are no comments.</p>}

        {note.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <p>
                {comment.author?.username} posted on{" "}
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
              
              {props.user && props.user._id === comment.author._id && (
                <>
                  <button onClick={() => handleDeleteComment(comment._id)}>
                    Delete
                  </button>
                  <button onClick={() => handleEditClick(comment)}>Edit</button>
                </>
              )}
            </header>

            {editingCommentId === comment._id ? (
              <>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <button onClick={() => handleUpdateComment(comment._id)}>
                  Save
                </button>
                <button onClick={() => setEditingCommentId(null)}>Cancel</button>
              </>
            ) : (
              <p>{comment.content}</p>
            )}
          </article>
        ))}
      </section>
    </main>
  );
};

export default NoteDetails;
