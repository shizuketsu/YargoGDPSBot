const { EmbedBuilder } = require('discord.js');

module.exports =  {
    name: 'help',
    async execute(msg, args) {
        const embed = new EmbedBuilder()
            .setColor('#92a2ff')
            .setTitle('Команды:')
            .setDescription('**Level**\nДаёт информацию об уровне. Использовать .level <lvlname \\|\\| id>\n\n**Profile**\nДаёт информацию об участнике гдпс. Использовать .profile <username \\|\\| accountID>\n\n**Help**\nОтправляет список существующих комманд. Использовать .help')
            .setFooter({ text: 'Отправил ' + msg.author.username, iconURL: msg.author.displayAvatarURL() });

        msg.channel.send({ embeds: [embed] });
    }
};