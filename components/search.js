import { useState } from "react";
import { ExternalLinkIcon, HelpIcon, LoadingIcon } from "./icons";
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
            <HelpIcon />
          </a>
        </div>
        <button
          type="submit"
          className="flex justify-center items-center bg-gradient-to-b from-pink-500 to-red-500 text-pink-100 h-14 min-w-14 px-5 transition shadow-lg hover:shadow-xl shadow-pink-400/40 hover:shadow-pink-400/30 rounded-xl text-lg"
        >
          {loading ? <LoadingIcon /> : "Generate"}
        </button>
      </form>
      <Output output={output} error={error} />
      <div className="mt-3 text-center text-slate-500 transition hover:underline">
        <a
          href={"https://crontab.guru/#" + output.replaceAll(" ", "_")}
          rel="noopener noreferrer nofollow"
          target="_blank"
        >
          Open in crontab.guru
          <ExternalLinkIcon />
        </a>
      </div>
    </div>
  );
}
