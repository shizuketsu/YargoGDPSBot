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

        console.log(userData.role);
        console.log(userData.stats);
        const embed = new EmbedBuilder()
            .setColor('#92a2ff')
            .setTitle('Найден пользователь')
            .setDescription(`**${userData.uname}** with __uid ${userData.uid}__ <:comment_history:1292016261181734953>\n<:stars:1292016683115872341> Stars: \`${userData.stats.stars}\`   \n<:secret_coin:1291805924931010590> Coins: \`${userData.stats.coins}\`   \n<:user_coin:1291806006560555059> Usercoins: \`${userData.stats.ucoins}\`   \n<:demon:1291805461300903936> Demons: \`${userData.stats.demons}\`\n<:cp:1292019168367083590> Creator points: \`${userData.stats.cpoints}\``)
            .setFooter({ text: 'Отправил ' + msg.author.username, iconURL: msg.author.displayAvatarURL() });

        await msg.channel.send({ embeds: [embed] });
    }
};