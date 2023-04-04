import { SlashCommand } from "../../Build/Classes/CommandClass";

export default new SlashCommand({
  name: "ping",
  description: "Ping Command",
  execute ({ interaction }) {
    interaction.reply("Pong")
  }
})