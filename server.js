import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";

dotenv.config();
const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // modelo inteligente e rápido
      messages: [
        {
          role: "system",
          content:
            "Você é o Eduh IA Pro, um assistente inteligente, educado e criativo. Responda em português do Brasil, com explicações completas, sem repetir a pergunta do usuário.",
        },
        { role: "user", content: message },
      ],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("Erro no servidor:", error);
    res.status(500).json({ error: "Erro ao gerar resposta da IA." });
  }
});

app.listen(port, () => {
  console.log(`🚀 Eduh IA Pro rodando em http://localhost:${port}`);
});
