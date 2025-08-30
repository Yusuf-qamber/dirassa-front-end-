import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as noteService from "../../services/noteService";

const NoteForm = (props) => {
  const navigate = useNavigate();

  const { college } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file_url: "",
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await noteService.createNote(formData, college);
      navigate(`/${college}/notes`);
    } catch (err) {
      console.error("Failed to create note:", err);
    }
  };

  return (
    <main>
      <h1> Add a Note</h1>
      <form onSubmit={handleSubmit}>
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

        <label htmlFor="file_url">File URL</label>
        <input
          required
          type="text"
          name="file_url"
          id="file_url"
          value={formData.file_url}
          onChange={handleChange}
        />

        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default NoteForm;
