import Head from "next/head";
import { GitHubIcon, OpenAIIcon } from "../components/icons";
import Search from "../components/search";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>Cronify - Generate cron schedule expression with AI</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta
          name="description"
          content="An easier way to write crontab schedules."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="grow flex flex-col justify-center items-center">
        <div className="flex flex-col items-center max-w-lg mx-4">
          <div className="text-8xl font-sans text-center font-extrabold subpixel-antialiased tracking-tighter px-2 pb-10 bg-clip-text text-transparent bg-gradient-to-b from-pink-500 to-red-500">
            Cronify
          </div>
          <div className="text-2xl font-sans text-center font-light text-slate-500">
            Create cron expressions from natural language descriptions. The
            opposite of{" "}
            <a
              href="https://crontab.guru/"
              className="text-pink-500"
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              crontab guru
            </a>
            .
          </div>
          <Search />
        </div>
      </main>

      <footer className="flex justify-between items-center m-5 text-slate-500">
        <a
          className="transition hover:brightness-50"
          href="https://zimo.li/"
          rel="noopener noreferrer"
        >
          zimo.li
        </a>
        <a
          className="transition hover:brightness-50"
          href="https://openai.com/"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          Powered by
          <OpenAIIcon />
        </a>
        <a
          className="transition hover:brightness-50"
          aria-label="View on GitHub"
          href="https://github.com/lzm0/cronify"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon />
        </a>
      </footer>
    </div>
  );
}
