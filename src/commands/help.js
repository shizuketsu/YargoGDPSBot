const { EmbedBuilder } = require('discord.js');
const params = require('../../config.json');

module.exports =  {
    name: 'help',
    async execute(msg, args) {
        const embed = new EmbedBuilder()
            .setColor('#92a2ff')
            .setTitle('Команды:')
            .setDescription('**Level**\nДаёт информацию об уровне. Использовать ' + params.prefix + 'level <lvlname \\|\\| id>\n\n**Profile**\nДаёт информацию об участнике гдпс. Использовать ' + params.prefix + 'profile <username \\|\\| accountID>\n\n**Help**\nОтправляет список существующих комманд. Использовать ' + params.prefix + 'help')
            .setFooter({ text: 'Отправил ' + msg.author.username, iconURL: msg.author.displayAvatarURL() });

        await msg.channel.send({ embeds: [embed] });
    }
};