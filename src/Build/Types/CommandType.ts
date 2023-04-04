import { ChatInputApplicationCommandData, ChatInputCommandInteraction, PermissionResolvable, GuildMember, CommandInteractionOptionResolver, Awaitable, ApplicationCommandSubCommandData } from "discord.js";
import { MusicClient } from "../Client";

export interface ExtendedInteraction extends ChatInputCommandInteraction {
  member: GuildMember
}

interface runInterface {
  client: MusicClient
  interaction: ExtendedInteraction
  args: CommandInteractionOptionResolver
}

export type CommandType = {
  category?: string
  userPermissions?: PermissionResolvable | PermissionResolvable[]
  botPermissions?: PermissionResolvable | PermissionResolvable[]
  developerCommand?: boolean
  adminCommand?: boolean
  serverOnlyCommand?: boolean
  execute: (options: runInterface) => Awaitable<any>
} & ChatInputApplicationCommandData