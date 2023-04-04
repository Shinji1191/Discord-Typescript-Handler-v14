import { Player } from "discord-player";
import { MusicClient } from "../Client";

export default (client: MusicClient) => {
  let player = new Player(client, {
    smoothVolume: true,
    autoRegisterExtractor: true,
    ytdlOptions: {
      quality: "highestaudio",
      filter: "audioonly",
    },
  });
  return player
}