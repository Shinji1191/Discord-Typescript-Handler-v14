import { greenBright, redBright, yellowBright } from "colorette";
import { LegacyCommandType } from "./Types/LegacyCommandType";
import { CommandHandler } from "./Handlers/CommandHandler";
import { Client, Collection, Partials } from "discord.js";
import { botConfig } from "./Configurations/botConfig";
import { EventHandler } from "./Handlers/EventHandler";
import { CommandType } from "./Types/CommandType";
import Player from "./Client/Player";
import mongoose from "mongoose";
import PlayerEvents from "./Handlers/PlayerEvents";

export class MusicClient extends Client {
  prefixCommands = new Collection<string, LegacyCommandType>()
  commands = new Collection<string, CommandType>()
  aliases = new Collection<string, string>()
  player = Player(this)
  
  constructor() {
    super({
      intents: [
        // Auto Moderation Intents
        "AutoModerationConfiguration",
        "AutoModerationExecution",
        // Direct Messages Intents
        "DirectMessageTyping",
        "DirectMessages",
        "DirectMessageReactions",
        // Guild Intents
        "GuildBans",
        "GuildEmojisAndStickers",
        "GuildIntegrations",
        "GuildInvites",
        "GuildMembers",
        "GuildMessageReactions",
        "GuildMessageTyping",
        "GuildMessages",
        "GuildModeration",
        "GuildPresences",
        "GuildScheduledEvents",
        "GuildVoiceStates",
        "GuildWebhooks",
        "Guilds",
        "MessageContent",
      ],
      partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User,
      ],
    })
  }

  async start() {
    this.login(botConfig.token);
    CommandHandler(this)
    EventHandler(this)
    PlayerEvents(this) 
  }
}
