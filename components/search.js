import { useState } from "react";
import Output from "./output";

export default function Search() {
  const [input, setInput] = useState("Everyday at 9 AM");
  const [output, setOutput] = useState("0 0 * * *");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setInput(event.target.value);
    if (event.target.value.length == 0) {
      setInput("Everyday at 9 AM");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    fetch("/api/completion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: input }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setOutput(data.completion);
        setError(data.error);
      });
  }

  return (
    <div className="w-full">
      <form
        className="flex justify-between space-x-2 my-10"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="grow placeholder:italic placeholder:text-slate-400 text-slate-800 text-lg bg-white border border-slate-300 rounded-xl w-10 h-14 px-5 transition shadow-sm focus:outline-none focus:border-pink-500 focus:ring-pink-500 focus:ring-1"
          onChange={handleChange}
          placeholder={input}
        />
        <button
          type="submit"
          className="flex justify-center items-center bg-gradient-to-b from-pink-500 to-red-500 text-pink-100 h-14 min-w-14 px-5 transition shadow-lg hover:shadow-xl shadow-pink-400/40 hover:shadow-pink-400/30 rounded-xl text-lg"
        >
          {loading ? (
            <svg
              className="animate-spin h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "Generate"
          )}
        </button>
      </form>
      <Output output={output} error={error}></Output>
      <div className="mt-3 text-center text-slate-500 transition hover:underline">
        <a
          href={"https://crontab.guru/#" + output.replaceAll(" ", "_")}
          rel="noopener noreferrer nofollow"
          target="_blank"
        >
          Open in crontab.guru
        </a>
      </div>
    </div>
  );
}
