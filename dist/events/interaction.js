"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const discord_js_1 = require("discord.js");
exports.event = {
    name: discord_js_1.Events.InteractionCreate,
    run: (client, interaction) => {
        try {
            const findInteraction = client.interactions.get(interaction.customId);
            findInteraction.run(client, interaction);
        }
        catch (e) {
            console.log(e);
        }
    },
};
