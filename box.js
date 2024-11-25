let web3;
let userAccount;
const contractAddress = "0x798fE4B59ef6F58Db895d1F9F9298659E9ea1Efd"; // Dirección de tu billetera para recibir los pagos (reemplázala con tu dirección)

window.addEventListener('load', function () {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        console.log('MetaMask detectado');
    } else {
        alert("Por favor, instala MetaMask para continuar.");
    }

    // Configurar el evento de conexión
    const connectButton = document.getElementById('connect-wallet-button');
    connectButton.addEventListener('click', connectWallet);

    // Configurar los botones de compra
    const buyButtons = document.querySelectorAll('.button');
    buyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const itemId = event.target.getAttribute('data-item-id');
            buyItem(itemId);
        });
    });
});

// Conectar a MetaMask
async function connectWallet() {
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        userAccount = accounts[0];
        console.log("Cuenta conectada:", userAccount);
        
        document.getElementById("connect-wallet-button").innerText = "Billetera Conectada";
    } catch (error) {
        console.error("Error al conectar billetera:", error);
        alert("No se pudo conectar la billetera.");
    }
}

// Función para realizar la compra del producto
async function buyItem(itemId) {
    if (!userAccount) {
        alert("Por favor, conecta tu billetera primero.");
        return;
    }

    // Precios de los productos en MATIC (Polygon)
    const prices = {
        'gold-box': Web3.utils.toWei('4060', 'ether'),  // 4.060 MATIC
        'green-box': Web3.utils.toWei('1351', 'ether'), // 1.351 MATIC
        'white-box': Web3.utils.toWei('0.01', 'ether'), // 0.405 MATIC
        'rainbow-box': Web3.utils.toWei('945', 'ether') // 0.945 MATIC
    };

    const price = prices[itemId];
    if (!price) {
        alert("Artículo no encontrado.");
        return;
    }

    try {
        // Realizar la transacción
        const transaction = await web3.eth.sendTransaction({
            from: userAccount,
            to: contractAddress, // Dirección del contrato o billetera para recibir el pago
            value: price
        });

        console.log("Transacción enviada:", transaction);
        alert("¡Compra realizada exitosamente!");
    } catch (error) {
        console.error("Error en la transacción:", error);
        alert("Hubo un error al procesar la compra.");
    }
}
