import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../../Build/Classes/CommandClass";

export default new SlashCommand({
  name: "pause",
  description: "Pause the song",
  async execute({ args, client, interaction }) {
    let player = client.player
    let queue = player.queues.get(interaction.guild.id);

    let memberVoice = interaction.member.voice.channel,
        clientVoice = interaction.guild.members.me.voice.channel;

    if (!memberVoice) return interaction.reply({ content: "```❌ Voice Channel | You must be in a voice channel to play that.```", ephemeral: true });

    if (clientVoice && clientVoice.id !== memberVoice.id) return interaction.reply({ content: "```❌ Voice Channel | I am already in a voice channel, come join.```", ephemeral: true });

    if (!queue) return interaction.reply({ content: "```❌ No Queue | There is no music queue in this server.```", ephemeral: true })

    if (!queue.tracks) return interaction.reply({ content: "```❌ No Songs | There are no songs in queue.```", ephemeral: true })

    if (queue.node.isPaused()) return interaction.reply({ content: "```❌ Paused | The song is already paused.```", ephemeral: true })

    else {
      queue.node.setPaused(true)
      let current = queue.currentTrack
      return interaction.reply({ content: `\`\`\`⏸️ Paused | ${current.title} has been paused by ${interaction.user.tag}.\`\`\`` })
    }
  },
});
