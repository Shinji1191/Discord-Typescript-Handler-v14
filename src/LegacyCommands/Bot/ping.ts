import { PrefixCommand } from "../../Build/Classes/CommandClass";

export default new PrefixCommand({
  name: "ping",
  description: "Ping Command",
  category: "Bot",
  execute({ message, client }) {
    message.reply({ content: "Pong" });
  },
});
