import React, { useState } from "react";

import { useHistory, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useConfig from "./useConfig";

const NoteDetails = () => {
  const { id } = useParams<any>();

  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { app } = useConfig();
  const url = app.NOTES_API_URL;

  if (!url) {
    throw Error("API_URL is not set");
  }

  const { data: notes, error, isPending } = useFetch(`${url}/notes/` + id);

  const [title, setTitle] = useState(notes?.title);
  const [desc, setDesc] = useState(notes?.desc);
  const [priority, setPriority] = useState(notes?.priority);

  const history = useHistory();

  // * Delete notes and redirect the user to home page once they've delete it
  const handleClick = () => {
    fetch(`${url}/notes/${notes!.id}`, {
      method: "DELETE",
    }).then(() => {
      history.push("/");
    });
  };

  // * Edit notes
  const handleEdit = (e: any) => {
    e.preventDefault();

    const note = { title, desc, priority };
    setIsLoading(true);

    console.log(note);

    try {
      fetch(`${url}/notes/${notes!.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      }).then(() => {
        console.log("New note added");
        setIsLoading(false);
        history.push("/");
      });
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {notes && (
        <article>
          <h2>{notes.title}</h2>
          <div>{notes.desc}</div>
          <p>
            Priority Type: <b>{notes.priority}</b>
          </p>
          <button style={{ background: "mediumspringgreen", color: "black" }} onClick={() => setEdit(!edit)}>
            Edit
          </button>
          <button onClick={handleClick}>Delete</button>
        </article>
      )}
      {notes && edit && (
        <div className="create" style={{ margin: "20px 0" }}>
          <form onSubmit={handleEdit}>
            <label>Note title:</label>
            <input type="text" defaultValue={notes.title} onChange={(e) => setTitle(e.target.value)} />
            <label>Note body:</label>
            <textarea defaultValue={notes.desc} onChange={(e) => setDesc(e.target.value)}></textarea>
            <label>Note priority:</label>
            <select defaultValue={notes.priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="normal">Normal</option>
              <option value="mandatory">Mandatory</option>
              <option value="urgent">Urgent</option>
            </select>
            {!isLoading && <button style={{ background: "mediumspringgreen", color: "black" }}>Update Note</button>}
            {isLoading && (
              <button style={{ background: "mediumspringgreen", color: "black" }} disabled>
                Updating Note...
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default NoteDetails;
