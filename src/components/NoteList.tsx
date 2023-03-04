import React from "react";

import { Link } from "react-router-dom";

const NoteList = ({ notes, title }: any) => {
  return (
    <div className="blog-list">
      <h2>{title}</h2>
      {notes.map((note: NotesData) => (
        <div className="blog-preview" key={note.id}>
          <Link to={`/notes/${note.id}`}>
            <h2>{note.title}</h2>
            <p>
              Priority Type: <b>{note.priority}</b>
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

interface NotesData {
  id: string;
  title: string;
  desc: string;
  priority: string;
}

export default NoteList;
