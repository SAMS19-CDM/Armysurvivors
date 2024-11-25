// Variables globales
let miningInterval;
let startTime;
let totalTime = 14400;  // 4 horas en segundos
let minedAmount = 0;    // Total de ASC minados
let tokensPerSecond = 0.02; // Tokens que se minan por segundo
let timeLeft = totalTime;
let collectableTime = 120; // Tiempo en segundos (2 minutos) para que aparezca el botón "Collect"

// Función para iniciar la minería
function startMining() {
    document.getElementById('startButton').disabled = true;  // Deshabilitar el botón de "Start Mining"
    startTime = Date.now();
    miningInterval = setInterval(function() {
        let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        timeLeft = totalTime - elapsedTime;

        // Calcular la cantidad de tokens minados
        minedAmount = tokensPerSecond * elapsedTime;

        // Actualizar la interfaz de usuario
        document.getElementById('balance').innerText = `Balance: ${minedAmount.toFixed(2)} ASC`;
        document.getElementById('timeLeft').innerText = `Time Left: ${formatTime(timeLeft)}`;
        document.getElementById('miningProgress').innerText = `Mining Progress: ${minedAmount.toFixed(2)} ASC`;

        // Si el tiempo se ha agotado (4 horas)
        if (timeLeft <= 0) {
            clearInterval(miningInterval);
            document.getElementById('startButton').disabled = true;  // Deshabilitar el botón
        }

        // Si han pasado 2 minutos, habilitar el botón "Collect"
        if (elapsedTime >= collectableTime) {
            document.getElementById('collectButton').style.display = 'block';  // Mostrar el botón "Collect"
        }

    }, 1000);
}

// Función para formatear el tiempo en formato hh:mm:ss
function formatTime(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let secondsLeft = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
}

// Función para "recolectar" los tokens minados y agregarlos al balance principal
function collectTokens() {
    alert(`¡Has recolectado ${minedAmount.toFixed(2)} ASC!`);
    // Aquí podrías realizar cualquier operación adicional, como actualizar la base de datos o hacer una transacción.
    // Después de recolectar, deshabilitar el botón de "Collect" hasta la siguiente minería.
    document.getElementById('collectButton').style.display = 'none';
    document.getElementById('startButton').disabled = false;  // Habilitar de nuevo el botón "Start Mining"
}
