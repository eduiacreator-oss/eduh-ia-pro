// ======= EDUH IA PRO - MAIN.JS ======= //

// Elementos principais
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");
const statusIndicator = document.getElementById("status-indicator");

// Função: verificar status do servidor / IA
async function verificarStatus() {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "ping" }),
    });

    if (res.ok) {
      statusIndicator.textContent = "🟢 Eduh IA Pro: Online";
      statusIndicator.classList.remove("offline");
      statusIndicator.classList.add("online");
    } else {
      throw new Error("Servidor respondeu com erro");
    }
  } catch (err) {
    statusIndicator.textContent = "🔴 Eduh IA Pro: Offline";
    statusIndicator.classList.remove("online");
    statusIndicator.classList.add("offline");
  }
}

// Checa o status da IA a cada 15 segundos
setInterval(verificarStatus, 15000);
verificarStatus();

// Função para adicionar mensagens ao chat
function addMessage(content, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = content;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Envio do formulário
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  // Mostra mensagem do usuário
  addMessage(userMessage, "user");
  userInput.value = "";

  // Mostra IA digitando
  const typing = document.createElement("div");
  typing.classList.add("message", "bot");
  typing.textContent = "💬 Digitando...";
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!res.ok) {
      throw new Error("Erro ao conectar com a IA.");
    }

    const data = await res.json();
    typing.remove();
    addMessage(data.reply || "⚠️ Erro na resposta da IA.", "bot");
  } catch (error) {
    typing.remove();
    addMessage("⚠️ Erro ao conectar com o servidor da IA.", "bot");
  }
});
