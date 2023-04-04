# Typescript Discord Bot Handler

![Border](https://minecrafttr.com/data/attachments/21/21356-2c54d7a3bae0952bb8c0f4d558476efa.jpg)

```txt
This handler is for beginners that want to try and make their own discord
bot for: Functionality, Fun, or For their own Private Server.
```

![Border](https://minecrafttr.com/data/attachments/21/21356-2c54d7a3bae0952bb8c0f4d558476efa.jpg)

## Setting Up

```ts
export const botConfig = {
  token: "", // Your bot token
  developers: [""], // The list of Developers
  serverId: "", // Your server id
  databaseUrl: "", // MongoDB URL
  prefixes: ["!", ".", "="] // The prefixes for the prefix commands
}
```

![Border](https://minecrafttr.com/data/attachments/21/21356-2c54d7a3bae0952bb8c0f4d558476efa.jpg)

## Installation and Running

- downloading required packages

```bash
npm i install

or

yarn install
```

- Running

```bash
npm run start

or

yarn start
```

- Building and Running

```bash
npm run build; npm run prod

or

yarn build; yarn prod
```

![Border](https://minecrafttr.com/data/attachments/21/21356-2c54d7a3bae0952bb8c0f4d558476efa.jpg)

## Commands and Events Properties

- Event Properties

| **Name** | **Description**                         | **Type**     |
| -------- | --------------------------------------- | ------------ |
| name     | Name of the event                       | ClientEvents |
| once     | If the event can only be triggered once | Boolean      |
| execute  | Execute the event                       | Function     |

- Prefix Command Properties

| **Name**          | **Description**                                                          | **Type**           |
| ----------------- | ------------------------------------------------------------------------ | ------------------ |
| name              | The name of the command                                                  | String             |
| description       | The description of the command                                           | String             |
| category          | The category of the command                                              | String             |
| aliases           | Other names for the command                                              | String[]           |
| userPermissions   | The required permissions for a use to use this command                   | String or String[] |
| botPermissions    | The needed permissions for your bot to execute the command               | String or String[] |
| developerCommand  | If the command is only for the developer                                 | Boolean            |
| adminCommand      | If the command is only for the owner of the server                       | Boolean            |
| serverOnlyCommand | If the command is only for your private server set in the botConfig file | Boolean            |
| nsfw              | If the command can only be run in NSFW channels                          | Boolean            |
| execute           | Execute the command                                                      | Function           |

- Slash Command Properties

| **Name**          | **Description**                                                          | **Type**                       |
| ----------------- | ------------------------------------------------------------------------ | ------------------------------ |
| name              | Name of the command                                                      | String                         |
| description       | Description of the command                                               | String                         |
| category          | Category of the command                                                  | String                         |
| options           | Options for the command                                                  | ApplicationCommandOptionData[] |
| userPermissions   | The required permissions for a use to use this command                   | String or String[]             |
| botPermissions    | The needed permissions for your bot to execute the command               | String or String[]             |
| developerCommand  | If the command is only for the developer                                 | Boolean                        |
| adminCommand      | If the command is only for the owner of the server                       | Boolean                        |
| serverOnlyCommand | If the command is only for your private server set in the botConfig file | Boolean                        |
| nsfw              | If the command can only be run in NSFW channels                          | Boolean                        |
| execute           | Execute the command                                                      | Function                       |

![Border](https://minecrafttr.com/data/attachments/21/21356-2c54d7a3bae0952bb8c0f4d558476efa.jpg)

## Making Commands and Events

- Prefix Commands

```ts
import { PrefixCommand } from "../../Build/Classes/CommandClass";

export default new PrefixCommand({
  name: "",
  description: "",
  category: "",
  aliases: [""],
  developerCommand: false,
  serverOnlyCommand: false,
  adminCommand: false,
  nsfw: false,
  userPermissions: [""], // or you can pass in a string
  botPermissions: [""], // or you can pass in a string
  async execute({ message, client, args }) {},
});
```

- Slash Commands

```ts
import { SlashCommand } from "../../Build/Classes/CommandClass";
import { ApplicationCommandOptionType } from "discord.js";

export default new SlashCommand({
  name: "",
  description: "",
  category: "",
  developerCommand: false,
  serverOnlyCommand: false,
  adminCommand: false,
  nsfw: false,
  userPermissions: [""], // or you can pass in a string
  botPermissions: [""], // or you can pass in a string
  options: [],
  async execute({ client, interaction, args }) {}
});
```

- Events

```ts
import { EventClass } from "../../Build/Classes/EventClass";

export default new EventClass({
  name: "",
  once: false,
  async execute(client, args) {},
});
```

![Border](https://minecrafttr.com/data/attachments/21/21356-2c54d7a3bae0952bb8c0f4d558476efa.jpg)

## More Information

- For help join my Discord Server [Shen's Coding Den]("https://discord.gg/vCnMwEWbFg") and ask for help in the help channels.

- If there are errors in the handler please DM me in discord as well.
