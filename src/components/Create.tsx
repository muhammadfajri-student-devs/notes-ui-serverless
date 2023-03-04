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

  // * Send data
  let addNote = async () => {
    let res = await fetch(`${url}/notes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, desc, priority }),
    });
    let resJson = await res.json();
    if (res.status === 200) {
      console.log("New note added");
      setIsPending(false);
      history.push("/");
    } else {
      console.error(`Failed to add note. An error occured: ${res.status} - ${res.statusText}`);
    }
  };

  // * Form handler
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setIsPending(true);
      await addNote();
    } catch (err) {
      console.log(err);
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
        {!isPending && <button>Add Note</button>}
        {isPending && <button disabled>Adding Note...</button>}
      </form>
    </div>
  );
};

export default Create;
