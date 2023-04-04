import { redBright, greenBright, yellowBright } from "colorette";
import { LegacyCommandType } from "../Types/LegacyCommandType";
import { ApplicationCommandOptionType } from "discord.js";
import { CommandType } from "../Types/CommandType";
import { MusicClient } from "../Client";
import { promisify } from "util";
import { glob } from "glob";
import path from "path";
let gb = promisify(glob);

export async function CommandHandler(client: MusicClient) {
  client.commands.clear();
  client.prefixCommands.clear();

  let commandFiles = await gb(
    path.join(process.cwd(), "src", "SlashCommands", "**/*{.ts,.js}").replace(/\\/g, "/")
  );
  let legacyCommandFiles = await gb(
    path
      .join(process.cwd(), "src", "LegacyCommands", "**/*{.ts,.js}")
      .replace(/\\/g, "/")
  );
  let cmds = [];

  legacyCommandFiles.forEach(async (file) => {
    let command: LegacyCommandType = (await import(file)).default;
    let split = file.split("/")
    let category = split[split.length - 2]

    if (!command) return;

    if (command.name) {
      let properties = { category, ...command }
      client.prefixCommands.set(command.name, properties);
      console.log(`[ ${greenBright("Registered ✅")} ] ${command.name}`);
    }

    if (command.aliases && Array.isArray(command.aliases))
      command.aliases.forEach((alias) =>
        client.aliases.set(alias, command.name)
      );
  });

  commandFiles.forEach(async (file) => {
    let command: CommandType = (await import(file))?.default;
    let split = file.split("/")
    let category = split[split.length - 2]

    if (!command.name) return;
    else {
      let properties = { category, ...command }
      try {
        client.commands.set(command.name, properties);
        cmds.push(command);
        console.log(`[ ${greenBright("Registered ✅")} ] ${command.name}`);
      } catch (error) {
        console.log(
          `[ ${redBright("Error ❌")} ] an error occured while registering ${
            command.name
          }`
        );
      }
    }
  });

  client.on("ready", async () => {
    await client.application.commands.set(cmds);
  });
}
