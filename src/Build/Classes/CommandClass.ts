import { CommandType } from "../Types/CommandType";
import { LegacyCommandType } from "../Types/LegacyCommandType";

export class PrefixCommand {
  constructor(data: LegacyCommandType) {
    Object.assign(this, data)
  }
}

export class SlashCommand {
  constructor(data: CommandType) {
    Object.assign(this, data)
  }
}