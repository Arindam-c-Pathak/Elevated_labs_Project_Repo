// src/components/NoteBox.jsx
import React, { useEffect, useState } from "react";


const NoteBox = () => {
  const [note, setNote] = useState("");

  useEffect(() => {
    const savedNote = localStorage.getItem("user-note");
    if (savedNote) setNote(savedNote);
  }, []);

  const handleChange = (e) => {
    setNote(e.target.value);
    localStorage.setItem("user-note", e.target.value);
  };

  return (
    <div className="note-box">
        <h3 className="note-title">Your Notes</h3>
      <textarea
        value={note}
        onChange={handleChange}
        placeholder="Write your notes here..."
      />
    </div>
  );
};

export default NoteBox;
