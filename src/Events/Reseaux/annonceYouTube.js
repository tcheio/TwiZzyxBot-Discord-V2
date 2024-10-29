const axios = require('axios');
const bot = require('../../../index');
const config = require('../../../config');

// Variables de configuration
const API_KEY = config.Info.YouTubeAPIKey;
const CHANNEL_IDS = config.Info.YouTubeChannelID;
const channelsDiscord = config.channel.retour;

// Pour stocker les vidéos déjà annoncées
const announcedVideos = new Set();

// Fonction principale pour vérifier les nouvelles vidéos
async function checkForNewVideos() {
    for (const channelId of CHANNEL_IDS) {
        try {
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
                params: {
                    key: API_KEY,
                    channelId: channelId,
                    part: 'snippet',
                    order: 'date',
                    maxResults: 5,
                    type: 'video',
                },
            });

            const videos = response.data.items;
            for (const video of videos) {
                const videoId = video.id.videoId;
                const title = video.snippet.title;
                const type = identifyVideoType(video.snippet);

                // Vérifiez si la vidéo a déjà été annoncée
                if (!isAlreadyAnnounced(videoId)) {
                    await announceVideo(videoId, title, type, bot);
                    markAsAnnounced(videoId);
                }
            }
        } catch (error) {
            console.error(`Erreur lors de la vérification des vidéos pour la chaîne ${channelId}:`, error);
        }
    }
}

// Fonction pour identifier le type de vidéo (vidéo, short ou live)
function identifyVideoType(snippet) {
    const title = snippet.title.toLowerCase();
    if (title.includes('shorts')) return 'short';
    if (title.includes('live')) return 'live';
    return 'video';
}

// Fonction pour envoyer une annonce de vidéo sur le channel Discord
async function announceVideo(videoId, title, type, bot) { // Prend `bot` en paramètre ici
    let channelID;

    // Choisir le channel Discord en fonction du type
    if (type === 'short') channelID = channelsDiscord.short;
    else if (type === 'live') channelID = channelsDiscord.twitch;
    else channelID = channelsDiscord.videos;

    const channel = bot.channels.cache.get(channelID);
    if (!channel) {
        return console.error(`Channel ${channelID} introuvable ! Assurez-vous que le bot a bien accès à ce channel.`);
    }

    const message = `Nouvelle ${type} publiée : **${title}**\nhttps://www.youtube.com/watch?v=${videoId}`;
    await channel.send(message);
}

// Pour vérifier si une vidéo a déjà été annoncée
function isAlreadyAnnounced(videoId) {
    return announcedVideos.has(videoId);
}

// Pour marquer une vidéo comme annoncée
function markAsAnnounced(videoId) {
    announcedVideos.add(videoId);
}

// Appel de la fonction périodique pour vérifier les nouvelles vidéos toutes les 60 secondes
setInterval(checkForNewVideos, 60 * 1000); // Vérification toutes les 60 secondes

module.exports = checkForNewVideos;
