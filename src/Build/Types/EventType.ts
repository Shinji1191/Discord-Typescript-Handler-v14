import { ClientEvents } from "discord.js";
import { MusicClient } from "../Client";

export type ClientEventType<Key extends keyof ClientEvents> = {
  name: Key
  once?: boolean
  execute: (client: MusicClient, ...args: ClientEvents[Key]) => any
}