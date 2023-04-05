import { EventClass } from "../../Build/Classes/EventClass";

export default new EventClass({
  name: "interactionCreate",
  async execute(client, interaction) {
    if (!interaction.isAutocomplete()) return

    if (interaction.commandName === "play") {
      let option = interaction.options.getString("query");
      let player = client.player
      let search = await player.search(option, { requestedBy: interaction.user });

      try {
        if (!option) return await interaction.respond([{ name: "Give me a song title / url to play.", value: option }])
        else return await interaction.respond(search.tracks.slice(0, 25).map((track) => {
          return {
            name: `${track.author} - ${track.title.substring(0, 50)}`,
            value: track.url
          } 
        }))
      } catch (error) {
        return
      }
    }

    if (interaction.commandName === "skip") {
      let option = interaction.options.getString("track");
      let player = client.player
      let queue = player.queues.get(interaction.guild.id);

      if (queue.tracks.size === 0) {
        return await interaction.respond([{ name: "There are no songs in queue.", value: option }])
      }

      try {
        return await interaction.respond(queue.tracks.toArray().slice(0, 25).map((track) => {
          return {
            name: `${track.author} - ${track.title.substring(0, 50)}`,
            value: track.url
          }
        }))
      } catch (error) {
        return
      }
    }
  },
})