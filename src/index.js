const { GatewayIntentBits, Client, Collection } = require('discord.js');
const path = require('path');
const fs = require('fs');
const params = require('../config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.commands = new Collection();
const commandsFiles = fs.readdirSync(path.join(__dirname, 'commands'), 'utf-8').filter((i) => i.endsWith('.js'));

for(const file of commandsFiles) {
    const command = require(path.join(__dirname, 'commands', file));
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    client.user.setPresence({ status: 'idle' });
    console.log(`Client was started at ${client.user.tag}`);
});

client.on('messageCreate', async (msg) => {
    if(msg.author.bot) return;
    else if(!msg.content.startsWith(params.prefix)) return;

    const args = msg.content.slice(params.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);

    try {
        command.execute(msg, args);
    } catch (error) {
        console.error(error);
        msg.reply('command error');
    }
});

client.login(params.token);