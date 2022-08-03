import { useState } from "react";
import Output from "./output";

export default function Search() {
  const [input, setInput] = useState("Everyday at 9 AM");
  const [output, setOutput] = useState("* * * * *");
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
        <div className="grow relative">
          <input
            type="text"
            className="w-full placeholder:italic placeholder:text-slate-400 text-slate-800 text-lg bg-white border border-slate-300 rounded-xl h-14 pl-5 pr-14 transition shadow-sm focus:outline-none focus:border-pink-500 focus:ring-pink-500 focus:ring-1"
            onChange={handleChange}
            placeholder={input}
          />
          <a
            href="https://blog.zimo.li/introducing-cronify"
            className="absolute inset-y-0 right-0 mr-4 flex items-center"
            title="Learn more"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 fill-slate-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1 inline"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
