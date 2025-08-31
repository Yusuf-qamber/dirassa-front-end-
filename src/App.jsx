import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import { Routes, Route, useNavigate,Navigate } from 'react-router-dom';import * as authService from "./services/authService.js";
import * as noteService from "./services/noteService.js";
import { useState } from "react";
import { useEffect,useContext } from "react";
import Landing from "./components/Landing/Landing";
import College from "./components/College/College.jsx";
import NoteList from "./components/NoteList/NoteList.jsx";
import NoteDetails from "./components/NoteDetails/NoteDetails.jsx";
import NoteForm from "./components/NoteForm/NoteForm.jsx";
import EventList from "./components/EventList/EventList.jsx";
import EventForm from "./components/EventForm/EventForm.jsx";

import * as eventServices from "./services/eventServics.js";

const App = () => {

const navigate = useNavigate();

  const initialState = authService.getUser();
  const [user, setUser] = useState(initialState);

  // const [events,setEvents]=useState([])


  const handleSignUp = async (formData) => {
    try {
      const res = await authService.signUp(formData);
      setUser(res);
      // return success
      return { success: true };
    } catch (err) {
      // return failure flag (then signup form can display message)
      // add message?
      return { success: false, message: err.message };
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const handleSignIn = async (formData) => {
    const res = await authService.signIn(formData);
    setUser(res);
  };



// const handleAddNote = async (noteFormData) => {
//  const newNote = await noteService.create(noteFormData);
//   setNotes([newNote, ...notes]);  
//   navigate('/notes');
// };


// const handleSubmit = (evt) => {
//   evt.preventDefault();
//   props.handleAddNote(formData);
// };



const handleDeleteNote = async (college, noteId) => {
  try {
    await noteService.deleteNote(noteId, college);
    navigate(`/${college}/notes`);
  } catch (err) {
    console.error("Error deleting note:", err);
  }
};

const handleUpdateNote = async (college, noteId, noteFormData) => { await noteService.updateNote(noteFormData, college, noteId); navigate(`/${college}/notes/${noteId}`); }

const handleDeleteEvent = async (college, eventId) => {
  try {
    await eventServices.deleteEvent(eventId, college);
    navigate(`/${college}/events`);
  } catch (err) {
    console.error("Error deleting event:", err);
  }
};

const handleUpdateEvent = async (college,eventId, noteFormData) => { 
  await eventServices.updateEvent(noteFormData, college, eventId); navigate(`/${college}/event/${eventId}`); 
}



  return (
    <>
      <NavBar user={user} handleSignOut={handleSignOut} />
      <Routes>
         <Route path="/" element={<Landing />} />
        <Route path="/:college" element={<College />} />
        <Route path="/:college/notes" element={<NoteList />} />
<Route path="/:college/notes/new" element={<NoteForm />} />
        <Route path="/:college/notes/:noteId" element={<NoteDetails user={user} handleDeleteNote={handleDeleteNote}/>} />
 <Route path="/:college/notes/:noteId/edit" element={<NoteForm handleUpdateNote={handleUpdateNote} />} />

        <Route path="/:college/events" element={<EventList />} />

        <Route path="/:college/events/new" element={<EventForm />} />

        <Route
          path="/sign-up"
          element={<SignUp handleSignUp={handleSignUp} user={user} />}
        />
        <Route
          path="/sign-in"
          element={<SignIn handleSignIn={handleSignIn} user={user} />}
        />
        <Route path="/404" element={<h1>404 Not Found</h1>} />

        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>

    // <>
    //   <NavBar user={user} handleSignOut={handleSignOut} />
    //   <Routes>
    //     <Route path="/" element={<h1>Hello World!</h1>} />
    //     {!user && (
    //       <>
    //         <Route
    //           path="/sign-up"
    //           element={<SignUp handleSignUp={handleSignUp} />}
    //         />
    //         <Route
    //           path="/sign-in"
    //           element={<SignIn handleSignIn={handleSignIn} />}
    //         />
    //       </>
    //     )}
    //     <Route path="*" element={<h1>404</h1>} />
    //   </Routes>
    // </>
  );
};

export default App;
