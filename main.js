const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (!message) return;

  addMessage("user", message);
  input.value = "";
  addMessage("bot", "Digitando... ⏳");

  try {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    chatBox.lastChild.textContent = data.reply;
  } catch (error) {
    chatBox.lastChild.textContent = "⚠️ Erro ao conectar com o servidor.";
  }
});

function addMessage(sender, text) {
  const div = document.createElement("div");
  div.classList.add(sender);
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}