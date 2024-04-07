'use strict'

require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const {
    API_TOKEN,
} = process.env;

const bot = new TelegramBot(API_TOKEN, { polling: true });

const commands = [
    {
        command: 'ca',
        response: '0xcDa802a5BFFaa02b842651266969A5Bba0c66D3e'
    },
    {
        command: 'contractaddress',
        response: '0xcDa802a5BFFaa02b842651266969A5Bba0c66D3e'
    },
    {
        command: 'buy',
        response: 'https://swapmode.fi/swap?outputCurrency=0xcDa802a5BFFaa02b842651266969A5Bba0c66D3e'
    },
    {
        command: 'website',
        response: 'https://www.mochad.xyz/'
    },
    {
        command: 'token',
        response: 'https://modescan.io/token/0xcDa802a5BFFaa02b842651266969A5Bba0c66D3e'
    },
    {
        command: 'debank',
        response: 'https://debank.com/token/mode/0xcda802a5bffaa02b842651266969a5bba0c66d3e/overview'
    },
    {
        command: 'twitter',
        response: 'https://twitter.com/MoChadCoin'
    },
    {
        command: 'chart',
        response: 'https://dexscreener.com/mode/0xf927bf4a4170f29c429ad3b9d953e57df3691ec9'
    },
];

for (const command of commands) {
    bot.onText(`/${command.command}`, (msg) => {
        const chat = msg.chat;
        const chatId = chat.id;

        if (chat.type === 'group' || chat.type === 'supergroup') {
            bot.sendMessage(chatId, command.response);
        }
    });
}

process.on('unhandledRejection', shutdown);
process.on('uncaughtException', shutdown);
process.once('SIGTERM', shutdown);
process.once('SIGINT', shutdown);
process.once('SIGUSR2', shutdown);

/**
 * Graceful shutdown handler.
 */
async function shutdown(err) {
    console.log(err);
    process.exit(0);
}
