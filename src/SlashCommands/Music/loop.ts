import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../../Build/Classes/CommandClass";
import { QueueRepeatMode } from "discord-player";

export default new SlashCommand({
  name: "repeat",
  description: "Repeat the song or queue or turn it off",
  options: [
    {
      name: "song",
      description: "Repeat the song.",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "queue",
      description: "Repeat the queue.",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "off",
      description: "Turn the repeat off.",
      type: ApplicationCommandOptionType.Subcommand,
    }
  ],
  async execute({ args, client, interaction }) {
    let command = args.getSubcommand()
    let player = client.player
    let queue = player.queues.get(interaction.guild.id);

    let memberVoice = interaction.member.voice.channel,
        clientVoice = interaction.guild.members.me.voice.channel;

    if (!memberVoice) return interaction.reply({ content: "```❌ Voice Channel | You must be in a voice channel to play that.```", ephemeral: true });

    if (clientVoice && clientVoice.id !== memberVoice.id) return interaction.reply({ content: "```❌ Voice Channel | I am already in a voice channel, come join.```", ephemeral: true });

    if (!queue) return interaction.reply({ content: "```❌ No Queue | There is no music queue in this server.```", ephemeral: true })


    switch (command) {
      case "song": {
        if (!queue.currentTrack) return interaction.reply({ content: "```❌ No Queue | There is no music queue in this server.```", ephemeral: true })
        else {
          let current = queue.currentTrack
          queue.setRepeatMode(QueueRepeatMode.TRACK)
          interaction.reply({ content: `\`\`\`🔂 Repeat | ${current.title} has been put on repeat by ${interaction.user.tag}.\`\`\`` })
        }
      }
        break;
    
      case "queue": {
        if (queue.tracks.size === 0) return interaction.reply({ content: "```❌ No Queue | There is no music queue in this server.```", ephemeral: true })
        else {
          queue.setRepeatMode(QueueRepeatMode.QUEUE)
          interaction.reply({ content: `\`\`\`🔂 Repeat | The queue has been put on repeat by ${interaction.user.tag}.\`\`\`` })
        }
      }
      break;

      case "off": {
        if (queue.repeatMode === QueueRepeatMode.OFF) return interaction.reply({ content: "```❌ Repeat | The queue or song is not on repeat```", ephemeral: true })
        else {
          queue.setRepeatMode(QueueRepeatMode.OFF)
          interaction.reply({ content: `\`\`\`🔂 Repeat |  Repeat song/queue has been turned off by ${interaction.user.tag}.\`\`\`` })
        }
      }
    }
  },
});
