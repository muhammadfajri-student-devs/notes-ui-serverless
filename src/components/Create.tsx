import React from "react";

import { useState } from "react";
import { useHistory } from "react-router-dom";

import useConfig from "./useConfig";

const Create = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("normal");
  const [isPending, setIsPending] = useState(false);

  const history = useHistory();

  const { app } = useConfig();
  const url = app.NOTES_API_URL;

  if (!url) {
    throw Error("API_URL is not set");
  }

  // * Form handler to send data
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const note = { title, desc, priority };
    setIsPending(true);

    console.log(note);

    // * Send data
    try {
      fetch(`${url}/notes`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      }).then(() => {
        console.log("New note added");
        setIsPending(false);
        history.push("/");
      });
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  return (
    <div className="create">
      <h2>Add a New Note</h2>
      <form onSubmit={handleSubmit}>
        <label>Note title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Note body:</label>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} required></textarea>
        <label>Note priority:</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="normal">Normal</option>
          <option value="mandatory">Mandatory</option>
          <option value="urgent">Urgent</option>
        </select>
        {!isPending && <button style={{ background: "mediumspringgreen", color: "black" }}>Add Note</button>}
        {isPending && <button disabled>Adding Note...</button>}
      </form>
    </div>
  );
};

export default Create;
