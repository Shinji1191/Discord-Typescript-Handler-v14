import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../../Build/Classes/CommandClass";

export default new SlashCommand({
  name: "clear-queue",
  description: "Remove all the songs in queue.",
  async execute({ args, client, interaction }) {
    let player = client.player
    let queue = player.queues.get(interaction.guild.id);

    let memberVoice = interaction.member.voice.channel,
        clientVoice = interaction.guild.members.me.voice.channel;

    if (!memberVoice) return interaction.reply({ content: "```❌ Voice Channel | You must be in a voice channel to play that.```", ephemeral: true });

    if (clientVoice && clientVoice.id !== memberVoice.id) return interaction.reply({ content: "```❌ Voice Channel | I am already in a voice channel, come join.```", ephemeral: true });

    if (!queue) return interaction.reply({ content: "```❌ No Queue | There is no music queue in this server.```", ephemeral: true })

    if (!queue.tracks.size) return interaction.reply({ content: "```❌ No Songs | There are no songs in queue.```", ephemeral: true })

    else {
      interaction.reply({ content: `\`\`\`🗑️ Cleared | ${queue.tracks.size} songs has been removed from the queue.\`\`\`` })
      queue.clear()
    }
  },
});
