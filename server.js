import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// === ROTA PÁGINA INICIAL (index.html) ===
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// === ROTA /chat (carrega o chat.html) ===
app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "chat.html"));
});

// === CLIENTE OPENAI ===
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// === ROTA DA IA ===
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // modelo rápido e inteligente
      messages: [
        {
          role: "system",
          content: "Você é o Eduh IA Pro, um assistente inteligente, educado e criativo. Responda em português do Brasil.",
        },
        { role: "user", content: message },
      ],
    });

    res.json({ reply: completion.choices[0].message.content });

  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ error: "Erro ao gerar resposta da IA." });
  }
});

app.listen(port, () => {
  console.log(`🚀 Eduh IA Pro rodando em http://localhost:${port}`);
});
