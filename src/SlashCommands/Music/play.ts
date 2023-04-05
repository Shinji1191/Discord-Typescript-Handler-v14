import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../../Build/Classes/CommandClass";

export default new SlashCommand({
  name: "play",
  description: "Play a song from any platform.",
  options: [
    {
      name: "query",
      description:
        "A song for me to play or add to queue. Can be title of the song or the url",
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: true,
    },
  ],
  async execute({ args, client, interaction }) {
    let query = args.getString("query");
    let player = client.player
    let queue = player.queues.get(interaction.guild.id);

    let memberVoice = interaction.member.voice.channel,
        clientVoice = interaction.guild.members.me.voice.channel;

    if (!memberVoice) return interaction.reply({ content: "```❌ Voice Channel | You must be in a voice channel to play that.```", ephemeral: true });

    const searchResult = await player.search(query, {
      requestedBy: interaction.user,
    });

    if (!queue)
    queue = player.nodes.create(interaction.guild.id, {
      metadata: {
        channel: interaction.channel,
        voiceChannel: memberVoice.name
      },
      leaveOnEmpty: true,
      leaveOnEnd: false,
      leaveOnStop: true,
      selfDeaf: true,
      volume: 75,
    });

    if (queue.isPlaying() && clientVoice.id !== memberVoice.id) return interaction.reply({ content: "```❌ Voice Channel | I am already playing a song in a voice channel, come join.```", ephemeral: true });

    if (!queue.connection) await queue.connect(memberVoice, {deaf: true}).then(() => queue.node.setVolume(75))

    if (searchResult.playlist) queue.addTrack(searchResult.tracks)
    else queue.addTrack(searchResult.tracks[0]);

    try {
      if (queue.isPlaying()) {
        return interaction.reply({ content: "```✅ Added | The song that you requested has been added to the queue.```" });
      } else {
        interaction.reply({ content: "```✅ Playing | The song that you requested is now playing.```" });
        queue.node.play()
        return
      }
    } catch (error) {
      return
    }
  },
});
