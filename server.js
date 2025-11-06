import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const reply = `Eduh IA Pro (GPT-5): você disse — "${userMessage}". 😎`;
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ reply: "Erro interno no servidor." });
  }
});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));