import React from "react";

import { useHistory, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const NoteDetails = () => {
  const { id } = useParams<any>();
  const url = String(process.env.NOTES_API_URL);

  if (!url) {
    throw Error("API_URL is not set");
  }

  const { data: notes, error, isPending } = useFetch(`${url}/notes/` + id);

  const history = useHistory();

  // * Delete notes and redirect the user to home page once they've delete it
  const handleClick = () => {
    fetch(`${url}/notes/` + notes!.id, {
      method: "DELETE",
    }).then(() => {
      history.push("/");
    });
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {notes && (
        <article>
          <h2>{notes.title}</h2>
          <p>
            Priority Type: <b>{notes.priority}</b>
          </p>
          <div>{notes.desc}</div>
          <button onClick={handleClick}>Delete</button>
        </article>
      )}
    </div>
  );
};

export default NoteDetails;
