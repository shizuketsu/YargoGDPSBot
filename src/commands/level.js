const params = require('../../config.json');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const qs = require('querystring');

function setDifficult(diff, rate) {
    if(diff === 1) diff = 'auto';
    else if(diff === 2) diff = 'easy';
    else if(diff === 3) diff = 'normal';
    else if(diff === 4) diff = 'hard4';
    else if(diff === 5) diff = 'hard5';
    else if(diff === 6) diff = 'harder6';
    else if(diff === 7) diff = 'harder7';
    else if(diff === 8) diff = 'insane8';
    else if(diff === 9) diff = 'insane9';
    else if(diff === 10) return rate ? `https://gcs.icu/WTFIcons/difficulties/${rate}/demon-hard.png` : `https://gcs.icu/WTFIcons/difficulties/stars/demon-hard.png`;
    else diff = 'na';
    
    return rate ? `https://panel.fhgdps.com/dist/img/gd/difficulties/${diff}-${rate}.png` : `https://panel.fhgdps.com/dist/img/gd/difficulties/${diff}.png`;
}

module.exports = {
    name: 'level',
    async execute(msg, args) {
        const levelSearch = args[0] ? args.join(' ') : null;
        let lvlData;
        let lvlLength;
        let likeEmoji;
        let lvlDiff = 'https://panel.fhgdps.com/dist/img/gd/difficulties/na.png';

        try {
            const r = await axios.post(params.database + '/getGJLevels21.php?json', qs.stringify({
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

        if(lvlData.is_epic > 0) lvlDiff = setDifficult(lvlData.stars_got, 'epic');
        else if(lvlData.is_featured > 0) lvlDiff = setDifficult(lvlData.stars_got, 'featured');

        const embed = new EmbedBuilder()
            .setColor('#92a2ff')
            .setTitle('Найден уровень')
            .setThumbnail(lvlDiff)
            .setDescription(`<:play:1291806080900399188> **${lvlData.name}** by __${lvlData.username}__\n<:info:1291805710673383424> ID: \`${lvlData.id}\`\n<:length:1291805762410254387> \`${lvlLength}\` ${likeEmoji} \`${Math.abs(lvlData.likes)}\` <:downloads:1291805540355149935>\`${lvlData.downloads}\``)
            .setFooter({ text: 'Отправил ' + msg.author.username, iconURL: msg.author.displayAvatarURL() });

        await msg.channel.send({ embeds: [embed] });
    }
}