import { useState } from "react"

const CommentForm = ({ handleAddComment, user }) => {
  const [formData, setFormData] = useState({ content: '' })
  const [error, setError] = useState("")

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (!user) {
      setError("You must be logged in to comment.")
      return
    }
    handleAddComment(formData)
    setFormData({ content: '' })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">Your comment:</label>
      <textarea
        required
        name="content"
        id="text-input"
        value={formData.content}
        onChange={handleChange}
        disabled={!user}   
      />
      <button type="submit" disabled={!user}>Post</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  )
}

export default CommentForm
