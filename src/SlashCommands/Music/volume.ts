import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../../Build/Classes/CommandClass";

export default new SlashCommand({
  name: "volume",
  description: "The queue volume",
  options: [
    {
      name: "set",
      description: "Set the volume",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "amount",
          description: "Set this amount as the volume.",
          type: ApplicationCommandOptionType.Number,
          maxValue: 100,
          minValue: 1,
          required: true,
        },
      ],
    },
    {
      name: "mute",
      description: "Mute the player.",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "unmute",
      description: "Unmute the player.",
      type: ApplicationCommandOptionType.Subcommand,
    },
  ],
  async execute({ args, client, interaction }) {
    let subCommand = args.getSubcommand();
    let amount = args.getNumber("amount");
    let player = client.player
    let queue = player.queues.get(interaction.guild.id);

    let memberVoice = interaction.member.voice.channel,
        clientVoice = interaction.guild.members.me.voice.channel;

    if (!memberVoice) return interaction.reply({ content: "```❌ Voice Channel | You must be in a voice channel to play that.```", ephemeral: true });

    if (clientVoice && clientVoice.id !== memberVoice.id) return interaction.reply({ content: "```❌ Voice Channel | I am already in a voice channel, come join.```", ephemeral: true });

    if (!queue) return interaction.reply({ content: "```❌ No Queue | There is no music queue in this server.```", ephemeral: true })

    switch (subCommand) {
      case "set": {
        queue.node.setVolume(amount);

        interaction.reply({ content: `\`\`\`🔊 Volume | The volume has been set to ${amount}% by ${interaction.user.tag}\`\`\`` })
      }
        break;
    
      case "mute": {
        queue.node.setVolume(0)

        interaction.reply({ content: `\`\`\`🔇 Muted | The queue has been muted by ${interaction.user.tag}\`\`\`` })
      }
        break;

      case "unmute": {
        queue.node.setVolume(75)

        interaction.reply({ content: `\`\`\`🔊 | The queue has been unmuted by ${interaction.user.tag}\`\`\`` })
      }
      break;
    }
  },
});
