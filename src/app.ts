import { create_bot_instance } from "./lib/bot_instance";
import { info } from "./util/logger";
import { GROUP_IDS, welcomeText } from "./util/constant";
import { create_new_user_database } from "./lib/services";

async function main() {
  info("Bot started... 👌");

  const bot = create_bot_instance();

  info("Hey there! 🤖");

  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const isRightGroup = GROUP_IDS.includes(chatId);

    if (!isRightGroup) return;

    if (msg.new_chat_members) {
      const users_created = await create_new_user_database(
        msg.new_chat_members
      );

      if (users_created) {
        users_created.forEach((user) => bot.sendMessage(user.id, welcomeText));
      }
    }
  });
}

main();
