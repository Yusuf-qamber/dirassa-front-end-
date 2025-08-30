import { useState } from "react"

const CommentForm=(props)=>{
const [formData,setFormData]=useState({content:''})

const handleChange=(evt)=>{
  setFormData({...formData,[evt.target.name]:evt.target.value})
}

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddComment(formData);
    setFormData({ content: '' });
  };

  return(
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">Your comment:</label>
     <textarea
        required
        type='text'
        name='content'
        id='text-input'
        value={formData.content}
        onChange={handleChange}
      />
      <button type='submit'>post</button>
    </form>
  )

}

export default CommentForm