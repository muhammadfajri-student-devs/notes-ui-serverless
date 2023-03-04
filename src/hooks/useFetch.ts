import { useState, useEffect } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState<NotesData | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const aboutCont = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: aboutCont.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error("Could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("Fetch Aborted");
          } else {
            setIsPending(false);
            setError(err.message);
          }
        });
    }, 1000);

    return () => aboutCont.abort();
  }, [url]);

  return { data, isPending, error };
};

interface NotesData {
  id: number;
  title: string;
  desc: string;
  priority: string;
}

export default useFetch;
