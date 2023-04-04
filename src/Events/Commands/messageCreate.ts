import { botConfig } from "../../Build/Configurations/botConfig";
import { EventClass } from "../../Build/Classes/EventClass";
import { EmbedBuilder, ChannelType } from "discord.js";

export default new EventClass({
  name: "messageCreate",
  execute(client, message) {
    botConfig.prefixes.forEach((prefix) => {
      if (!message.guild || message.author.bot || !message.content.toLowerCase().startsWith(prefix)) return

      let [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g)

      let command = client.prefixCommands.get(cmd.toLowerCase()) || client.prefixCommands.get(client.aliases.get(cmd.toLowerCase()))

      if (!command) return

      if (command.developerCommand && !botConfig.developers.includes(message.author.id)) return message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription("❌ **Developer Command**: `This command is only for the developers to use.`")
            .setThumbnail("https://media2.giphy.com/media/DHBGehJ3FSZEygszX3/giphy.gif")
        ]
      })

      if (command.serverOnlyCommand && botConfig.serverId !== message.guild.id) return message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription("❌ Server Only Command: `This command is a server only command.`")
            .setThumbnail("https://media2.giphy.com/media/DHBGehJ3FSZEygszX3/giphy.gif")
        ]
      })

      if (command.adminCommand && message.guild.ownerId !== message.author.id) return message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription("👑 **Admin Command**: `This command is only for the owner of this server.`")
            .setThumbnail("https://media2.giphy.com/media/DHBGehJ3FSZEygszX3/giphy.gif")
        ]
      })

      if (command.nsfw && message.channel.type === ChannelType.GuildText && !message.channel.nsfw) return message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription("🔞 NSFW Command: `This command is only executable in NSFW channels.`")
            .setThumbnail("https://media2.giphy.com/media/DHBGehJ3FSZEygszX3/giphy.gif")
        ]
      })

      command.execute({ args, client, message })
    })
  },
})