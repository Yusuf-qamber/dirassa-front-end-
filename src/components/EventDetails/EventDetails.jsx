import { useParams, Link ,Navigate ,useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import CommentForm from "../CommentForm/CommentForm.jsx";
import * as eventServics from "../../services/eventServics.js";
// import eventServices from 

const EventDetails = (props) => {
  const navigate=useNavigate()
  const { college, eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await eventServics.showEvent(college, eventId);
        setEvent(data);
      } catch (err) {
        console.error(err);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [college, eventId]);

  if (loading) return <p>Loading event...</p>;
  if (!event) return<Navigate to={`/${college}/events`} replace />

  const handleAddComment = async (commentFormData) => {
    const newComment = await eventServics.createComment(
      college,
      eventId,
      commentFormData
    );
    setEvent({ ...event, comments: [...event.comments, newComment] });
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await eventServics.deleteComment(college, eventId, commentId);
      setEvent({
        ...event,
        comments: event.comments.filter((c) => c._id !== commentId),
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
    const updatedComment = await eventServics.updateComment(
      college,      
      eventId,
      commentId,
      { content: editContent }
    );

    setEvent({
      ...event,
      comments: event.comments.map((c) =>
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
    <main className="event-details-container">
      <Link to={`/${college}/events`}>⬅ Back to Events</Link>

      <h1>{event.title}</h1>
      <p>
        By: {event.owner?.username || "Unknown"} | Posted on:{" "}
        {new Date(event.createdAt).toLocaleDateString()}
      </p>
      <p>{event.description}</p>

     <p>{event.location}</p> 
{event.owner?._id === props.user?._id && (
  <>   
    <Link to={`/${college}/events/${eventId}/edit`}>Edit</Link>       
    <button onClick={() => props.handleDeleteEvent(college, eventId)}>Delete</button>
  </>
)}

      <section>
        <h2>Comments</h2>
        {props.user ? (
    <CommentForm handleAddComment={handleAddComment} user={props.user} />
  ) : (
    <p>You must be logged in to comment.</p>
  )}
 
        {!event.comments.length && <p>There are no comments.</p>}

        {event.comments.map((comment) => (
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

export default EventDetails;
