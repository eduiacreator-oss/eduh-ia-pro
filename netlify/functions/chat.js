// ===== EDUH IA PRO - CHAT =====

const chatForm = document.querySelector("#chat-form");
const chatContainer = document.querySelector("#chat-container");
const input = document.querySelector("#user-input");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (!message) return;

  appendMessage("user", message);
  input.value = "";

  appendMessage("loading", "⏳ Digitando...");

  try {
    const response = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    document.querySelector(".loading")?.remove();
    appendMessage("bot", data.reply);
  } catch (error) {
    document.querySelector(".loading")?.remove();
    appendMessage(
      "bot",
      "⚠️ Erro ao conectar com o servidor. Tente novamente."
    );
  }
});

function appendMessage(role, text) {
  const div = document.createElement("div");
  div.classList.add("message", role);
  if (role === "loading") div.classList.add("loading");
  div.innerHTML = `<p>${text}</p>`;
  chatContainer.appendChild(div);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}