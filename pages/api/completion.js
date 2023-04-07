const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function filterCompletion(completion) {
  const trimmed = completion.trim();
  const splitted = trimmed.split(" ");
  if (splitted.length === 5) {
    return splitted.join(" ");
  } else {
    return "* * * * *";
  }
}

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
  } else if (req.body.prompt === undefined) {
    res.status(400).json({ error: "No prompt provided" });
  } else if (req.body.prompt.length > 100) {
    res.status(413).json({ error: "Prompt too long" });
  } else {
    return openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a tool that generates cron expressions from user prompts. Do not respond anything other than a cron expression.",
          },
          {
            role: "user",
            content: req.body.prompt,
          },
        ],
        max_tokens: 32,
        temperature: 0,
        stop: ["\n"],
      })
      .then((response) => {
        res.status(200).json({
          completion: filterCompletion(
            response.data.choices?.[0].message.content
          ),
        });
        console.log(
          JSON.stringify({
            request: req.body,
            response: response.data,
          })
        );
      })
      .catch((e) => {
        console.log(e);
        switch (e.response.status) {
          case 429:
            res.status(429).json({ error: "Rate limit exceeded" });
            break;
          default:
            res.status(500).json({ error: "Internal server error" });
        }
      });
  }
}
