import * as webllm from "https://esm.run/@mlc-ai/web-llm";

const status = document.getElementById("status");
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// Modelo ligero para que no tarde demasiado en descargar
const selectedModel = "Llama-3-8B-Instruct-q4f16_1-MLC";

let engine;

async function initIA() {
    try {
        // Inicializamos el motor de IA
        engine = await webllm.CreateMLCEngine(
            selectedModel,
            { 
                initProgressCallback: (report) => {
                    status.innerText = report.text;
                }
            }
        );
        
        status.innerText = "IA Lista. ¡Pregunta lo que sea!";
        sendBtn.disabled = false;
    } catch (error) {
        status.innerText = "Error al cargar la IA. Tu navegador podría no ser compatible.";
        console.error(error);
    }
}

async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // 1. Mensaje del usuario
    appendMessage("user", text);
    userInput.value = "";
    
    // 2. Mensaje de espera de la IA
    const aiMsgDiv = appendMessage("ai", "Pensando...");
    sendBtn.disabled = true;

    try {
        const messages = [{ role: "user", content: text }];
        const reply = await engine.chat.completions.create({ messages });
        
        // 3. Mostrar respuesta real
        aiMsgDiv.innerText = reply.choices[0].message.content;
    } catch (error) {
        aiMsgDiv.innerText = "Hubo un error al procesar tu pregunta.";
    } finally {
        sendBtn.disabled = false;
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

function appendMessage(role, text) {
    const div = document.createElement("div");
    div.className = `message ${role}`;
    div.innerText = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
    return div;
}

// Configurar eventos
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Arrancar la IA
initIA();
