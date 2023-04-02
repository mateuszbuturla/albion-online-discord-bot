"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const path_1 = require("path");
const fs_1 = require("fs");
const utils_1 = require("../utils");
const cron_1 = require("../cron");
class ExtendedClient extends discord_js_1.Client {
    constructor() {
        super({
            intents: [
                discord_js_1.GatewayIntentBits.Guilds,
                discord_js_1.GatewayIntentBits.GuildMessages,
                discord_js_1.GatewayIntentBits.MessageContent,
                discord_js_1.GatewayIntentBits.GuildMessages,
                discord_js_1.GatewayIntentBits.DirectMessages,
                discord_js_1.GatewayIntentBits.DirectMessageTyping,
                discord_js_1.GatewayIntentBits.DirectMessageReactions,
                discord_js_1.GatewayIntentBits.GuildEmojisAndStickers,
                discord_js_1.GatewayIntentBits.GuildMessageReactions,
            ],
        });
        this.commands = new discord_js_1.Collection();
        this.aliases = new discord_js_1.Collection();
        this.events = new discord_js_1.Collection();
        this.interactions = new discord_js_1.Collection();
        this.cron = new cron_1.Cron();
    }
    loadCommands() {
        const commandPath = (0, path_1.join)(__dirname, '..', 'commands');
        (0, fs_1.readdirSync)(commandPath).forEach((dir) => {
            const commands = (0, fs_1.readdirSync)(`${commandPath}/${dir}`).filter((file) => file.endsWith('.ts') || file.endsWith('.js'));
            for (const file of commands) {
                const { command } = require(`${commandPath}/${dir}/${file}`);
                this.commands.set(command.name, command);
                (0, utils_1.logger)(`Command ${command.name} has been loaded`);
                if ((command === null || command === void 0 ? void 0 : command.aliases.length) !== 0) {
                    command === null || command === void 0 ? void 0 : command.aliases.forEach((alias) => {
                        this.aliases.set(alias, command);
                    });
                }
            }
        });
    }
    loadEvents() {
        const eventPath = (0, path_1.join)(__dirname, '..', 'events');
        (0, fs_1.readdirSync)(eventPath).forEach((file) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { event } = yield (_a = `${eventPath}/${file}`, Promise.resolve().then(() => __importStar(require(_a))));
            this.events.set(event.name, event);
            (0, utils_1.logger)(`Event ${event.name} has been loaded`);
            this.on(event.name, event.run.bind(null, this));
        }));
    }
    loadInteractions() {
        const interactionPath = (0, path_1.join)(__dirname, '..', 'interactions');
        (0, fs_1.readdirSync)(interactionPath).forEach((dir) => {
            const interactions = (0, fs_1.readdirSync)(`${interactionPath}/${dir}`).filter((file) => file.endsWith('.ts') || file.endsWith('.js'));
            for (const file of interactions) {
                const { interaction } = require(`${interactionPath}/${dir}/${file}`);
                this.interactions.set(interaction.name, interaction);
                (0, utils_1.logger)(`Interaction ${interaction.name} has been loaded`);
            }
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.login(process.env.TOKEN);
            this.loadCommands();
            this.loadEvents();
            this.loadInteractions();
            globalThis.client = this;
        });
    }
}
exports.default = ExtendedClient;
