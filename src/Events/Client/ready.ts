import { greenBright, redBright } from "colorette";
import { botConfig } from "../../Build/Configurations/botConfig";
import { EventClass } from "../../Build/Classes/EventClass";
import mongoose from "mongoose";

export default new EventClass({
  name: "ready",
  async execute(client) {
    console.log(
      `[ ${greenBright("Log In ✅")} ] logged in as ${client.user.tag}`
    );

    if (!botConfig.databaseUrl) return;

    mongoose.set("strictQuery", false)
    await mongoose.connect(botConfig.databaseUrl).then(() => {
      console.info(`[ ${greenBright("Database ✅")} ] Connected`)
    }).catch((error) => console.error(`[ ${redBright("Database ❌")} ] Error: ${error.message}`))
  },
});
