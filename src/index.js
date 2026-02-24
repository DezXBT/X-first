const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const PREFIX = '!';
const SOCIAL_DATA_API_BASE = 'https://api.socialdata.tools/twitter';

client.once('ready', () => {
    console.log(`Bot is online as ${client.user.tag}`);
});

async function getXUserId(username) {
    try {
        const response = await axios.get(`${SOCIAL_DATA_API_BASE}/user/${username}`, {
            headers: {
                'Authorization': `Bearer ${process.env.X_API_KEY}`,
                'Accept': 'application/json'
            }
        });
        return response.data.id_str;
    } catch (error) {
        console.error('Error fetching user ID:', error.response?.data || error.message);
        return null;
    }
}

async function getFirstFollowers(userId, targetCount = 10) {
    let followers = [];
    let cursor = null;
    let hasNextPage = true;

    // Untuk efisiensi dan biaya, kita batasi maksimal 30 halaman (sekitar 1500 follower)
    // Jika target akun besar, kita butuh strategi lain.
    let pageCount = 0;
    const maxPages = 40; 

    try {
        while (hasNextPage && pageCount < maxPages) {
            const url = `${SOCIAL_DATA_API_BASE}/followers/list?user_id=${userId}${cursor ? `&cursor=${cursor}` : ''}`;
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${process.env.X_API_KEY}`,
                    'Accept': 'application/json'
                }
            });

            const data = response.data;
            if (data.users && data.users.length > 0) {
                followers.push(...data.users);
            }

            cursor = data.next_cursor;
            hasNextPage = !!cursor;
            pageCount++;
            console.log(`Fetched page ${pageCount}, total followers so far: ${followers.length}`);
        }

        // Karena data datang dari terbaru ke terlama, kita balik urutannya
        // Follower pertama adalah yang paling akhir di daftar
        return followers.reverse().slice(0, targetCount);

    } catch (error) {
        console.error('Error fetching followers:', error.response?.data || error.message);
        return [];
    }
}

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'cek-first') {
        const usernameInput = args[0];
        if (!usernameInput) {
            return message.reply('Tolong berikan username X (Twitter), contoh: `!cek-first @Twitter`');
        }

        const username = usernameInput.replace('@', '');
        
        const loadingEmbed = new EmbedBuilder()
            .setColor(0x1DA1F2)
            .setTitle(`🔍 Menganalisis @${username}`)
            .setDescription('⏳ Sedang menarik data dari SocialData API (Urutan Terlama)...')
            .setFooter({ text: 'Proses ini mungkin memakan waktu beberapa detik.' })
            .setTimestamp();

        const statusMsg = await message.reply({ embeds: [loadingEmbed] });

        try {
            const userId = await getXUserId(username);
            if (!userId) {
                return statusMsg.edit({ content: `❌ User @${username} tidak ditemukan atau API Error.`, embeds: [] });
            }

            const firstFollowers = await getFirstFollowers(userId, 20);

            if (firstFollowers.length === 0) {
                return statusMsg.edit({ content: `❌ Gagal mengambil data follower untuk @${username}.`, embeds: [] });
            }

            const resultEmbed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`🏆 20 Follower Pertama @${username}`)
                .setDescription('Berikut adalah akun-akun yang mem-follow paling awal (berdasarkan urutan data):')
                .setTimestamp();

            firstFollowers.forEach((user, index) => {
                resultEmbed.addFields({
                    name: `#${index + 1} - ${user.name}`,
                    value: `[@${user.screen_name}](https://x.com/${user.screen_name})\nID: \`${user.id_str}\``,
                    inline: false
                });
            });

            await statusMsg.edit({ embeds: [resultEmbed] });

        } catch (error) {
            console.error(error);
            message.reply('Terjadi kesalahan fatal saat memproses permintaan.');
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
