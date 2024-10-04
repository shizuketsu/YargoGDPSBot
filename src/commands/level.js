const params = require('../../config.json');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const qs = require('querystring');

module.exports = {
    name: 'level',
    async execute(msg, args) {
        const levelSearch = args[0] ? args.join(' ') : null;
        let lvlData;
        let lvlLength;
        let likeEmoji;

        try {
            r = await axios.post(params.database + '/getGJLevels21.php?json', qs.stringify({
                'gameVersion': 22,
                'binaryVersion': 41,
                'gdw': 0,
                'type': 0,
                'str': levelSearch,
                'diff': "-",
                'page': 0,
                'total': 0,
                'uncompleted': 0,
                'onlyCompleted': 0,
                'featured': 0,
                'original': 0,
                'twoPlayer': 0,
                'coins': 0,
                'epic': 0,
                'secret': "Wmdf2893gb7",
                'count': 1
            }), { headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': ""
            } });

            if(r.data.status !== 'success') {
                await msg.channel.send('Уровень не найден');
                return;
            }
             
            lvlData = r.data.levels[0];
        } catch(e) {
            return console.log(e);
        }

        switch(lvlData.length) {
            case 0:
                lvlLength = 'tiny';
                break;
            case 1:
                lvlLength = 'short';
                break;
            case 2:
                lvlLength = 'medium';
                break;
            case 3:
                lvlLength = 'long';
                break;
            case 4:
                lvlLength = 'XL';
                break;
            case 5:
                lvlLength = 'platform';
                break;
            default:
                lvlLength = 'NA';
                break;
        }

        likeEmoji = lvlData.likes > -1 ? '<:like:1291805792374362152>' : '<:dislike:1291805506880667688>';

        const embed = new EmbedBuilder()
            .setColor('#92a2ff')
            .setTitle('Найден уровень')
            .setDescription(`<:next:1291806046062514258> **${lvlData.name}** by __${lvlData.username}__\n<:info:1291805710673383424> ID: __${lvlData.id}__\n<:length:1291805762410254387> \`${lvlLength}\` <:downloads:1291805540355149935>\`${lvlData.downloads}\` ${likeEmoji} \`${Math.abs(lvlData.likes)}\``)
            .setFooter({ text: 'Отправил ' + msg.author.username, iconURL: msg.author.displayAvatarURL() });

        await msg.channel.send({ embeds: [embed] });
    }
}