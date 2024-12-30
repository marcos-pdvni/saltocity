import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";

config({ path: ".env" });

const BOT_TOKEN = process.env.BOT_TOKEN as string;

export const create_bot_instance = () =>
  new TelegramBot(BOT_TOKEN, { polling: true });
