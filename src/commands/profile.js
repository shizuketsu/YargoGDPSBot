const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const qs = require('querystring');
const params = require('../../config.json');

module.exports =  {
    name: 'profile',
    async execute(msg, args) {
        if(!args[0]) {
            await msg.channel.send('Укажите пользователя');
            return;
        }

        let userData;

        try {
            const r = await axios.post(params.database + '/getGJUsers20.php?json', qs.stringify({
                'secret': 'Wmfd2893gb7',
                'gameVersion': '22',
                'binaryVersion': '42',
                'gdw': '0',
                'str': args[0],
            }), { headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': ""
            } });

            if(r.data.status !== 'success') {
                await msg.channel.send('Пользователь не найден');
                return;
            }

            userData = r.data.users[0];
        } catch(e) {
            throw new Error(e.message);
        }

        const embed = new EmbedBuilder()
            .setColor('#92a2ff')
            .setTitle('Найден пользователь')
            .setDescription(`**${userData.uname}** with __uid ${userData.uid}__ ${params.emoji.comment_history}\n${params.emoji.stars} Stars: \`${userData.stats.stars}\`   \n${params.emoji.coins} Coins: \`${userData.stats.coins}\`   \n${params.emoji.ucoins} Usercoins: \`${userData.stats.ucoins}\`   \n${params.emoji.demons} Demons: \`${userData.stats.demons}\`\n${params.emoji.cpoints} Creator points: \`${userData.stats.cpoints}\``)
            .setFooter({ text: 'Отправил ' + msg.author.username, iconURL: msg.author.displayAvatarURL() });

        await msg.channel.send({ embeds: [embed] });
    }
};