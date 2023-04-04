import { ClientEventType } from "../Types/EventType";
import { ClientEvents } from "discord.js";
import { MusicClient } from "../Client";
import { promisify } from "util";
import { glob } from "glob";
import path from "path";
let gb = promisify(glob);

export async function EventHandler(client: MusicClient) {
  let eventFiles = await gb(
    path.join(process.cwd(), "src" ,"Events", "**/*{.ts,.js}").replace(/\\/g, "/")
  );

  eventFiles.forEach(async (file) => {
    let event: ClientEventType<keyof ClientEvents> = (await import(file))
      ?.default;

    if (!event) return;

    if (event.once == true)
      return client.once(event.name, event.execute.bind(null, client));
    else return client.on(event.name, event.execute.bind(null, client));
  });
}
