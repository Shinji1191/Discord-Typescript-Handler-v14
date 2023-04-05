import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../../Build/Classes/CommandClass";
import { lyricsExtractor } from "@discord-player/extractor";
import { trackInformation } from "../../Build/Utility/PlayerUtility";

export default new SlashCommand({
  name: "now-playing",
  description: "Check the information about the current song that is playing.",
  async execute({ client, interaction }) {
    let player = client.player
    let queue = player.queues.get(interaction.guild.id);

    let memberVoice = interaction.member.voice.channel,
        clientVoice = interaction.guild.members.me.voice.channel;

    if (!memberVoice) return interaction.reply({ content: "```❌ Voice Channel | You must be in a voice channel to play that.```", ephemeral: true });

    if (clientVoice && clientVoice.id !== memberVoice.id) return interaction.reply({ content: "```❌ Voice Channel | I am already in a voice channel, come join.```", ephemeral: true });

    if (!queue) return interaction.reply({ content: "```❌ No Queue | There is no music queue in this server.```", ephemeral: true })

    if (!queue.currentTrack) return interaction.reply({ content: "```❌ No Song | A song is not playing.```", ephemeral: true })

    let current = queue.currentTrack
    let progressBar = queue.node.createProgressBar({
      timecodes: true,
    })
    
    let embed = new EmbedBuilder()
    .setImage("https://minecrafttr.com/data/attachments/21/21356-2c54d7a3bae0952bb8c0f4d558476efa.jpg")
      .setDescription(`${trackInformation(current)}\n\n${progressBar}`)
      .setThumbnail(current.thumbnail)
      .setTitle("💿 Now Playing")
    interaction.reply({ embeds: [embed] })
  },
});
