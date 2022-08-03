export default function Output({ output, error }) {
  function copy(event) {
    event.preventDefault();
    navigator.clipboard.writeText(output);
  }

  return (
    <div
      className="relative flex justify-center items-center h-16 bg-slate-50 rounded-xl transition hover:bg-slate-100 active:bg-slate-200 active:ring active:ring-slate-300 font-mono text-2xl selection:bg-pink-100"
      onClick={copy}
    >
      {output}
      <span className="absolute inset-y-0 right-0 mr-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 fill-slate-300"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
        </svg>
      </span>
    </div>
  );
}
