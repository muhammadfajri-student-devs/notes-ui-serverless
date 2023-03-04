import React from "react";
import useFetch from "../hooks/useFetch";
import NoteList from "src/components/NoteList";
import useConfig from "src/components/useConfig";

const Home = () => {
  const { app } = useConfig();
  const url = app.NOTES_API_URL;

  if (!url) {
    throw Error("API_URL is not set");
  }

  const { data: notes, isPending, error } = useFetch(`${url}/notes`);

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {notes && <NoteList notes={notes} title={"All Notes"} />}
    </div>
  );
};

export default Home;
