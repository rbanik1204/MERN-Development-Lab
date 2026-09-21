import { Client, Events, GatewayIntentBits } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()
const client = new Client({
    intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages
    ]
})
client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith('create')) {
        console.log(message.content);
        const url = message.content.split("create ")[1];
        return message.reply({ content: "Short ID of " + url });
    }
    else
        message.reply({
            content: "Hi from Broken Bot!"
        })
});

client.on('interactionCreate', (interaction) => {
    console.log(interaction)
    interaction.reply("pong")
})
client.login(process.env.DISCORD_TOKEN)