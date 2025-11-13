import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  console.log("🔍 Testando API OpenAI com o modelo gpt-4o-mini...");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "Diga olá em português." }],
    }),
  });

  const data = await res.json();
  console.log("📦 Resposta da API:");
  console.log(JSON.stringify(data, null, 2));
})();
