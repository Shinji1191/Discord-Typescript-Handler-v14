import { ClientEvents } from "discord.js"
import { ClientEventType } from "../Types/EventType";

export class EventClass<Key extends keyof ClientEvents> {
  constructor(data: ClientEventType<Key>) {
    Object.assign(this, data)
  }
}