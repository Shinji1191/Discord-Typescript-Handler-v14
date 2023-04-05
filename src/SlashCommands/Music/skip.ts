import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../../Build/Classes/CommandClass";
import { QueueRepeatMode } from "discord-player";

export default new SlashCommand({
  name: "skip",
  description: "Skip the song",
  options: [
    {
      name: "track",
      description: "Skip to this track",
      type: ApplicationCommandOptionType.String,
      autocomplete: true,
      required: false,
    },
  ],
  async execute({ args, client, interaction }) {
    let track = args.getString("track");
    let player = client.player;
    let queue = player.queues.get(interaction.guild.id);

    let memberVoice = interaction.member.voice.channel,
      clientVoice = interaction.guild.members.me.voice.channel;

    if (!memberVoice)
      return interaction.reply({
        content:
          "```❌ Voice Channel | You must be in a voice channel to play that.```",
        ephemeral: true,
      });

    if (clientVoice && clientVoice.id !== memberVoice.id)
      return interaction.reply({
        content:
          "```❌ Voice Channel | I am already in a voice channel, come join.```",
        ephemeral: true,
      });

    if (!queue)
      return interaction.reply({
        content: "```❌ No Queue | There is no music queue in this server.```",
        ephemeral: true,
      });

    if (!queue.tracks)
      return interaction.reply({
        content: "```❌ No Songs | There are no songs in queue.```",
        ephemeral: true,
      });

    let find = queue.tracks.find((song) => song.url === track);

    if (queue.tracks.size === 0 && queue.repeatMode === QueueRepeatMode.OFF)
      return interaction.reply({
        content: "```❌ No Songs | There are no songs in queue.```",
        ephemeral: true,
      });

    try {
      if (track && find) {
        queue.node.skipTo(find);

        let current = queue.currentTrack;
        let next = queue.history.nextTrack;

        return interaction.reply({
          content: `\`\`\`⏭️ Skipped | ${current.title} has been skipped by ${interaction.user.tag}. ${next.title} is now playing.\`\`\``,
        });
      } else {
        if (queue.repeatMode === QueueRepeatMode.AUTOPLAY) {
          queue.node.skip();
          let current = queue.currentTrack;

          return interaction.reply({
            content: `\`\`\`⏭️ Skipped | ${current.title} has been skipped by ${interaction.user.tag}.\`\`\``,
          });
        } else if (
          queue.repeatMode === QueueRepeatMode.OFF &&
          queue.tracks.size > 1
        ) {
          queue.node.skip();
          let current = queue.currentTrack;
          let next = queue.history.nextTrack;

          return interaction.reply({
            content: `\`\`\`⏭️ Skipped | ${current.title} has been skipped by ${interaction.user.tag}. ${next.title} is now playing.\`\`\``,
          });
        }
      }
    } catch (error) {
      return;
    }
  },
});
