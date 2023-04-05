import { queueSettings, trackInformation } from "../Utility/PlayerUtility";
import { EmbedBuilder } from "discord.js";
import { MusicClient } from "../Client";

export default (client: MusicClient) => {
  client.player.events.on("audioTrackAdd", (queue, track) => {
    let data = queue.metadata as any
    let embed = new EmbedBuilder()
      .addFields([{ name: "💿 Song Information:", value: trackInformation(track) }, { name: "⚙️ Queue Settings", value: queueSettings(queue) }])
      .setFooter({ text: `Requested By: ${track.requestedBy.tag}`, iconURL: track.requestedBy.displayAvatarURL() })
      .setImage("https://minecrafttr.com/data/attachments/21/21356-2c54d7a3bae0952bb8c0f4d558476efa.jpg")
      .setThumbnail(track.thumbnail)
      .setTitle("📥 Song Added")
    data.channel.send({ embeds: [embed] })
  })
  .on("audioTracksAdd", (queue, tracks) => {
    let data = queue.metadata as any
    let embed = new EmbedBuilder()
      .setFooter({ text: `Requested By: ${tracks[0].requestedBy.tag}`, iconURL: tracks[0].requestedBy.displayAvatarURL() })
      .setImage("https://minecrafttr.com/data/attachments/21/21356-2c54d7a3bae0952bb8c0f4d558476efa.jpg")
      .setDescription(`\`${tracks.length}\` songs has been added to the queue.`)
      .setTitle("📥 Songs Added")
    data.channel.send({ embeds: [embed] })
  })
  .on("playerStart", (queue, track) => {
    let data = queue.metadata as any
    let embed = new EmbedBuilder()
      .addFields([{ name: "💿 Song Information:", value: trackInformation(track) }, { name: "⚙️ Queue Settings", value: queueSettings(queue) }])
      .setFooter({ text: `Requested By: ${track.requestedBy.tag}`, iconURL: track.requestedBy.displayAvatarURL() })
      .setImage("https://minecrafttr.com/data/attachments/21/21356-2c54d7a3bae0952bb8c0f4d558476efa.jpg")
      .setThumbnail(track.thumbnail)
      .setTitle("💿 Now Playing")
    data.channel.send({ embeds: [embed] })
  })
  .on("playerSkip", (queue, track) => {
    let data = queue.metadata as any
    let embed = new EmbedBuilder()
      .addFields([{ name: "💿 Song Information:", value: trackInformation(track) }, { name: "⚙️ Queue Settings", value: queueSettings(queue) }])
      .setFooter({ text: `Requested By: ${track.requestedBy.tag}`, iconURL: track.requestedBy.displayAvatarURL() })
      .setImage("https://minecrafttr.com/data/attachments/21/21356-2c54d7a3bae0952bb8c0f4d558476efa.jpg")
      .setThumbnail(track.thumbnail)
      .setTitle("⏭️ Skipped")
    data.channel.send({ embeds: [embed] })
  })
  .on("disconnect", (queue) => {
    let data = queue.metadata as any
    let embed = new EmbedBuilder()
      .setDescription(`I have been disconnected from the voice channel`)
      .setTitle("📞 Disconnected")
    data.channel.send({ embeds: [embed] })
  })
  .on("emptyChannel", (queue) => {
    let data = queue.metadata as any
    let embed = new EmbedBuilder()
      .setDescription(`I have left the voice channel because there is no more people there`)
      .setTitle("📞 Disconnected")
    data.channel.send({ embeds: [embed] })
  })
  .on("error", (queue, error) => {
    let data = queue.metadata as any
    let embed = new EmbedBuilder()
      .addFields({ name: "Error", value: `${error.message.substring(0, 1024)}` }, { name: "Error Name", value: `${error.name}` })
      .setDescription(`I have encountered an error`)
      .setTitle("👾 Error")
    data.channel.send({ embeds: [embed] })
  })
  .on("playerError", (queue, error, track) => {
    let data = queue.metadata as any
    let embed = new EmbedBuilder()
      .addFields({ name: "Error", value: `${error.message.substring(0, 1024)}` }, { name: "Error Name", value: `${error.name}` })
      .setDescription(`I have encountered an error while trying to play \`${track.title}\``)
      .setTitle("👾 Error")
    data.channel.send({ embeds: [embed] })
  })
}