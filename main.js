const startBtn = document.getElementById('startBtn');
const chatArea = document.getElementById('chatArea');
const chatWindow = document.getElementById('chatWindow');
const input = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

startBtn.addEventListener('click', ()=>{
  chatArea.classList.remove('hidden');
  window.scrollTo(0,document.body.scrollHeight);
});

// helper para adicionar mensagem
function addMsg(text, who='bot'){
  const d = document.createElement('div');
  d.className = 'msg ' + (who==='user'?'user':'bot');
  d.textContent = text;
  chatWindow.appendChild(d);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// simula "digitando" (anima)
function addTyping(){
  const t = document.createElement('div');
  t.className = 'msg bot typing';
  t.id = 'typing';
  t.textContent = 'Digitando...';
  chatWindow.appendChild(t);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function removeTyping(){
  const t = document.getElementById('typing');
  if(t) t.remove();
}

async function sendMessage(msg){
  addMsg(msg,'user');
  input.value = '';
  addTyping();
  try{
    const res = await fetch('/.netlify/functions/chat', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ prompt: msg })
    });
    const json = await res.json();
    removeTyping();
    if(json && json.reply) addMsg(json.reply,'bot');
    else addMsg('Erro: sem resposta do servidor','bot');
  }catch(e){
    removeTyping();
    addMsg('Erro na conexão: '+e.message,'bot');
  }
}

sendBtn.addEventListener('click', ()=>{ const v=input.value.trim(); if(!v) return; sendMessage(v);});
input.addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ e.preventDefault(); sendBtn.click(); }});