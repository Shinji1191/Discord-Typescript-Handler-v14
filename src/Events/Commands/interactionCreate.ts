import { ExtendedInteraction } from "../../Build/Types/CommandType";
import { botConfig } from "../../Build/Configurations/botConfig";
import { EventClass } from "../../Build/Classes/EventClass";
import { EmbedBuilder, ChannelType, CommandInteractionOptionResolver } from "discord.js";

export default new EventClass({
  name: "interactionCreate",
  execute(client, interaction) {
    if (interaction.isChatInputCommand()) {
      let command = client.commands.get(interaction.commandName);

      if (!command) return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription("❌ Invalid Command: `This command is outdated please wait.`")
            .setThumbnail("https://media2.giphy.com/media/DHBGehJ3FSZEygszX3/giphy.gif")
        ]
      })

      if (command.developerCommand && !botConfig.developers.includes(interaction.user.id)) return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription("❌ **Developer Command**: `This command is only for the developers to use.`")
            .setThumbnail("https://media2.giphy.com/media/DHBGehJ3FSZEygszX3/giphy.gif")
        ]
      })

      if (command.serverOnlyCommand && botConfig.serverId !== interaction.guild.id) return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription("❌ Server Only Command: `This command is a server only command.`")
            .setThumbnail("https://media2.giphy.com/media/DHBGehJ3FSZEygszX3/giphy.gif")
        ]
      })

      if (command.adminCommand && interaction.guild.ownerId !== interaction.user.id) return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription("👑 **Admin Command**: `This command is only for the owner of this server.`")
            .setThumbnail("https://media2.giphy.com/media/DHBGehJ3FSZEygszX3/giphy.gif")
        ]
      })

      if (command.nsfw && interaction.channel.type === ChannelType.GuildText && !interaction.channel.nsfw) return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription("🔞 NSFW Command: `This command is only executable in NSFW channels.`")
            .setThumbnail("https://media2.giphy.com/media/DHBGehJ3FSZEygszX3/giphy.gif")
        ]
      })

      try {
        command.execute({ client, args: interaction.options as CommandInteractionOptionResolver, interaction: interaction as ExtendedInteraction })
      } catch (error) {
        return
      }
    }
  },
});
