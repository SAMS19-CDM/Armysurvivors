const express = require('express');
const app = express();
const port = 3000;

let users = {}; // Simulando base de datos de usuarios

app.use(express.json());

app.post('/start-mining', (req, res) => {
    const { userId } = req.body;
    
    if (!users[userId]) {
        users[userId] = { balance: 0, miningActive: false };
    }

    if (users[userId].miningActive) {
        return res.status(400).send('Already mining');
    }

    // Comienza a minar 0.02 ASC por segundo
    users[userId].miningActive = true;

    setTimeout(() => {
        // Simula que las 4 horas han pasado
        users[userId].miningActive = false;
        res.send({ message: 'Mining completed. Claim your rewards.', balance: users[userId].balance });
    }, 4 * 60 * 60 * 1000); // 4 horas en milisegundos

    setInterval(() => {
        users[userId].balance += 0.02; // Minando 0.02 ASC por segundo
    }, 1000);
});

app.post('/claim-rewards', (req, res) => {
    const { userId } = req.body;
    const user = users[userId];

    if (!user || user.balance === 0) {
        return res.status(400).send('No balance to claim.');
    }

    // Aquí transferirías las ganancias al wallet del usuario
    user.balance = 0; // Resetea el saldo tras reclamar
    res.send({ message: 'Rewards claimed successfully!', balance: user.balance });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
