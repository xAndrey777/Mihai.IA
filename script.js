// Usamos una lógica sencilla de ejemplo para entender el flujo
async function analizarSentimiento() {
    const texto = document.getElementById('userInput').value.toLowerCase();
    const resultadoDiv = document.getElementById('resultado');
    
    if (texto === "") return;

    resultadoDiv.innerText = "Pensando...";

    // Palabras clave para simular la lógica de IA (Nivel básico)
    const palabrasPositivas = ['good', 'love', 'great', 'awesome', 'happy', 'bien', 'genial'];
    const palabrasNegativas = ['bad', 'hate', 'terrible', 'sad', 'awful', 'mal', 'odio'];

    let score = 0;
    const palabras = texto.split(' ');

    palabras.forEach(palabra => {
        if (palabrasPositivas.includes(palabra)) score++;
        if (palabrasNegativas.includes(palabra)) score--;
    });

    setTimeout(() => {
        if (score > 0) {
            resultadoDiv.innerText = "😊 Resultado: ¡Positivo!";
            resultadoDiv.style.color = "green";
        } else if (score < 0) {
            resultadoDiv.innerText = "☹️ Resultado: Negativo";
            resultadoDiv.style.color = "red";
        } else {
            resultadoDiv.innerText = "😐 Resultado: Neutral";
            resultadoDiv.style.color = "gray";
        }
    }, 500);
}
