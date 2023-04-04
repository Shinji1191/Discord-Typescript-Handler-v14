import { Message, PermissionResolvable, Awaitable } from "discord.js";
import { MusicClient } from "../Client";

interface runOptions {
  client: MusicClient;
  message: Message;
  args: string[];
}

export type LegacyCommandType = {
  name: string;
  description: string;
  category: string;
  aliases?: string[];
  userPermissions?: PermissionResolvable | PermissionResolvable[]
  botPermissions?: PermissionResolvable | PermissionResolvable[]
  developerCommand?: boolean
  adminCommand?: boolean
  serverOnlyCommand?: boolean
  nsfw?: boolean
  execute: (options: runOptions) => Awaitable<any>
}