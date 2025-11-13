import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Caminhos de diretório
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());


// === ROTA PÁGINA INICIAL (index.html) ===
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


// === ROTA PÁGINA DO CHAT ===
app.get("/chat", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "chat.html"));
});


// === ROTA DA IA ===
app.post("/api/chat", async (req, res) => {
    const { message } = req.body;

    if (!message || message.trim() === "") {
        return res.status(400).json({ response: "⚠️ Por favor, digite uma mensagem válida." });
    }

    try {
        const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "Você é o Eduh IA Pro, um assistente gentil, criativo e profissional."
                    },
                    {
                        role: "user",
                        content: message
                    }
                ]
            })
        });

        const data = await openaiRes.json();
        const botResponse = data.choices?.[0]?.message?.content || "Erro ao gerar resposta 😔";

        res.json({ response: botResponse });

    } catch (error) {
        console.error("Erro no servidor:", error);
        res.status(500).json({ response: "❌ Ocorreu um erro no servidor." });
    }
});


// === CONFIG FINAL PARA FUNCIONAR NO RENDER ===
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
