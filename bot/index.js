require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const token = process.env.BOT_TOKEN;
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;

const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const user = msg.from?.first_name || "Anonim";
  const message = msg.text;
  const groupName = msg.chat.title || msg.chat.id;

  if (msg.text)
    await bot.sendMessage(
      ADMIN_CHAT_ID,
      `💬Guruh: ${groupName} \n 👤Yuboruvchi: ${user} \n 📩Xabar: ${message}`
    );

  if (msg.photo) {
    const photo = msg.photo[msg.photo.length - 1].file_id;
    await bot.sendPhoto(ADMIN_CHAT_ID, photo, {
      caption: `💬Guruh: ${groupName} \n 👤Yuboruvchi: ${user}`,
    });
  }

  if (msg.voice) {
    const voice = msg.voice.file_id;
    await bot.sendVoice(ADMIN_CHAT_ID, voice, {
      caption: `💬Guruh: ${groupName} \n 👤Yuboruvchi: ${user}`,
    });
  }

  if (msg.video) {
    const video = msg.video.file_id;
    await bot.sendVideo(ADMIN_CHAT_ID, video, {
      caption: `💬Guruh: ${groupName} \n 👤Yuboruvchi: ${user}`,
    });
  }

  if (msg.document) {
    const doc = msg.document.file_id;
    await bot.sendDocument(ADMIN_CHAT_ID, doc, {
      caption: `💬Guruh: ${groupName} \n 👤Yuboruvchi: ${user}`,
    });
  }

  if (msg.sticker) {
    const sticker = msg.sticker.file_id;
    await bot.sendSticker(ADMIN_CHAT_ID, sticker, {
      reply_markup: undefined,
    });

    await bot.sendMessage(
      ADMIN_CHAT_ID,
      `💬Guruh: ${groupName} \n 👤Yuboruvchi: ${user}`
    );
  }
});