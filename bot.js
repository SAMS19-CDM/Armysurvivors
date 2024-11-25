const { Telegraf } = require('telegraf');

// Token de tu bot (lo obtuviste al crearlo en BotFather)
const bot = new Telegraf('7214026350:AAE6zJxf598OkjEZPAAXRQQHlgHRGyMyQJM');

// Comando de inicio
bot.start((ctx) => {
    // Crear un InlineKeyboard con el botón "Play" que abre la URL
    const inlineKeyboard = {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Play', // El texto del botón
                        url: 'https://t.me/ArmySurvivors_bot/ArmySurvivors' // La URL que abrirá el botón
                    }
                ]
            ]
        }
    };

    // Enviar un mensaje con el botón "Play"
    ctx.reply('¡Bienvenido a Army Survivors! Haz clic en "Play" para acceder a la web app:', inlineKeyboard);
});

// Iniciar el bot
bot.launch().then(() => {
    console.log('Bot de Telegram está en línea');
});
