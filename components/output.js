export default function Output({ output, error }) {
  function copy(event) {
    event.preventDefault();
    navigator.clipboard.writeText(outputOrDefault());
  }

  function outputOrDefault() {
    return output || "0 0 * * *";
  }

  return (
    <div
      className="flex justify-center items-center h-16 bg-slate-50 rounded-xl transition hover:bg-slate-100 active:ring active:ring-slate-300 font-mono text-2xl selection:bg-pink-100"
      onClick={copy}
    >
      {outputOrDefault()}
    </div>
  );
}
