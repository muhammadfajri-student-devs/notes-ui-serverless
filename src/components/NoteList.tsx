import React from "react";

import { Link } from "react-router-dom";

const NoteList = ({ notes, title }: INoteList) => {
  return (
    <div className="blog-list">
      <h2>{title}</h2>
      {notes.map((note) => (
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

interface INoteList {
  notes: NotesData[];
  title: string;
}

interface NotesData {
  id: number;
  title: string;
  desc: string;
  priority: string;
}

export default NoteList;
