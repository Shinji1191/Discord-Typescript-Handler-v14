import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../../Build/Classes/CommandClass";
import axios from "axios";

export default new SlashCommand({
  name: "lyric",
  description: "Get the lyrics of a song or from the current playing song.",
  options: [
    {
      name: "query",
      description: "Search the lyrics of this song.",
      type: ApplicationCommandOptionType.String,
      required: false
    }
  ],
  async execute({ args, interaction, client }) {
    let query = args.getString("query");

    if (query) {
      let lyrics = await getLyrics(query);

      let embedLyrics = new EmbedBuilder()
        .setTitle(`${lyrics.author} - ${lyrics.title}`)
        .setThumbnail(lyrics.thumbnail.genius)
        .setDescription(`\`\`\`${lyrics.lyrics}\`\`\``)
        .addFields({ name: "Disclaimer:", value: `\`\`\`${lyrics.disclaimer}\`\`\`` })
        .setFooter({ text: `Requested By: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
      return interaction.reply({ embeds: [embedLyrics] })
    }
    else {
      let player = client.player
      let queue = player.queues.get(interaction.guild.id);
  
      let memberVoice = interaction.member.voice.channel,
          clientVoice = interaction.guild.members.me.voice.channel;
  
      if (!memberVoice) return interaction.reply({ content: "```❌ Voice Channel | You must be in a voice channel to play that.```", ephemeral: true });
  
      if (clientVoice && clientVoice.id !== memberVoice.id) return interaction.reply({ content: "```❌ Voice Channel | I am already in a voice channel, come join.```", ephemeral: true });
  
      if (!queue) return interaction.reply({ content: "```❌ No Queue | There is no music queue in this server.```", ephemeral: true })
  
      if (!queue.currentTrack) return interaction.reply({ content: "```❌ No Song | A song is not playing.```", ephemeral: true })

      let current = queue.currentTrack

      let lyrics = await getLyrics(`${current.author} ${current.title}`)

      let embedLyrics = new EmbedBuilder()
        .setTitle(`${lyrics.author} - ${lyrics.title}`)
        .setThumbnail(lyrics.thumbnail.genius)
        .setDescription(`\`\`\`${lyrics.lyrics}\`\`\``)
        .addFields({ name: "Disclaimer:", value: `\`\`\`${lyrics.disclaimer}\`\`\`` })
        .setFooter({ text: `Requested By: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
      return interaction.reply({ embeds: [embedLyrics] })
    }
  },
})

async function getLyrics(query: string) {
  let res = await axios.get(`https://some-random-api.ml/others/lyrics?title=${encodeURIComponent(query)}`);
  let data = await res.data

  return data
}