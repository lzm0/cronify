import { useState, useEffect } from "react";
import { CheckIcon, CopyIcon } from "./icons";

export default function Output({ output, error }) {
  const [copied, setCopied] = useState(false);

  function copy(event) {
    event.preventDefault();
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  return (
    <div
      className="relative flex justify-center items-center h-16 bg-slate-50 rounded-xl transition hover:bg-slate-100 active:bg-slate-200 active:ring active:ring-slate-300 font-mono text-2xl selection:bg-pink-100"
      onClick={copy}
    >
      {output}
      <span className="absolute inset-y-0 right-0 mr-4 flex items-center">
        {copied ? <CheckIcon /> : <CopyIcon />}
      </span>
    </div>
  );
}
