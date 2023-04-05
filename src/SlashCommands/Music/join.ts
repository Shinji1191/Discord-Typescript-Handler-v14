import { SlashCommand } from "../../Build/Classes/CommandClass";

export default new SlashCommand({
  name: "connect",
  description: "Join the voice channel that you are currently on.",
  async execute({ client, interaction }) {
    let player = client.player
    let queue = player.queues.get(interaction.guild.id);

    let memberVoice = interaction.member.voice.channel,
        clientVoice = interaction.guild.members.me.voice.channel;

    if (!memberVoice) return interaction.reply({ content: "```❌ Voice Channel | You must be in a voice channel to play that.```", ephemeral: true });

    if (clientVoice && clientVoice.id !== memberVoice.id) return interaction.reply({ content: "```❌ Voice Channel | I am already in a voice channel, come join.```", ephemeral: true });

    if (!clientVoice) {
      player.voiceUtils.join(memberVoice, {
        deaf: true
      })

      return interaction.reply({ content: "```✅ Connected | I have connected to the voice channel that you are in.```", ephemeral: true });
    }
  }
})