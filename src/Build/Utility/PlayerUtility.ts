import { Track, GuildQueue, QueueRepeatMode } from "discord-player";
import { hyperlink } from "discord.js"

export function queueSettings(queue: GuildQueue) {
  let autoplay = ""
  let repeatMode = ""

  if (queue.repeatMode === QueueRepeatMode.OFF) repeatMode = "off";
  if (queue.repeatMode === QueueRepeatMode.QUEUE) repeatMode = "queue";
  if (queue.repeatMode === QueueRepeatMode.TRACK) repeatMode = "track";
  if (queue.repeatMode === QueueRepeatMode.AUTOPLAY) repeatMode = "autoplay";
  if (queue.repeatMode === QueueRepeatMode.AUTOPLAY) autoplay = "on"

  return `**Volume:** \`${queue.node.volume}%\` |\n **Songs in Queue:** \`${queue.tracks.size.toLocaleString()}\` |\n **Repeat:** \`${repeatMode}\` |\n **Autoplay:** \`${autoplay || "off"}\``
}

export function trackInformation(track: Track) {
  return `**Title:** \`${track.title}\` |\n **Publisher:** \`${track.author}\` |\n **Duration:** \`${track.duration}\` |\n **URL:** ${hyperlink("`Click Here`", track.url)} |\n **Requested By:** \`${track.requestedBy.tag}\``
}