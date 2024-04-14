const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });
const { token, channelId } = require('./config.json');

client.once('ready', () => {
    console.log('Bot is ready!');
});

client.on('messageCreate', async message => {
    if (message.content === '.allpfp') {
        const guild = message.guild;
        if (!guild) return message.channel.send('Bu komut yalnızca sunucuda kullanılabilir.');

        const channel = guild.channels.cache.get(channelId);
        if (!channel) return message.channel.send('Belirtilen kanal bulunamadı.');

        guild.members.cache.forEach(async member => {
            const user = await client.users.fetch(member.id);
            const avatarURL = user.displayAvatarURL({ format: 'gif', dynamic: true, size: 256 });
            channel.send({ content: `${user.username}'ın profil fotoğrafı:`, files: [{ attachment: avatarURL, name: 'avatar.gif' }] })
                .then(() => {
                    // Bekleme süresi 1 saniye
                    return new Promise(resolve => setTimeout(resolve, 1000));
                })
                .catch(console.error);
        });

        message.channel.send('Profil fotoğrafları başarıyla kanala gönderildi.');
    }
});

client.login(token);
