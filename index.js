const amqp = require("amqplib");
require('dotenv').config()
const handleEvent = require("./handleEvent");

(async () => {
  try {
    // Create Connection to MQ
    const connection = await amqp.connect(procees.env.URL_AMPQ);
    // Create Channel
    const channel = await connection.createChannel();
    // Create Exchange
    channel.assertExchange("chat_to_bot", "fanout", {
      durable: false,
    });
    channel.assertExchange("bot_to_chat", "fanout", {
      durable: false,
    });
    // Create Queue
    const q_to_bot = await channel.assertQueue("", {
    });
    const q_to_chat = await channel.assertQueue("", {
    });

    console.log(
      " [*] Waiting for messages in %s. To exit press CTRL+C",
      q_to_bot.queue
    );

    await channel.bindQueue(q_to_bot.queue, "chat_to_bot", "");
    await channel.bindQueue(q_to_chat.queue, "bot_to_chat", "");

    let stock_response={};
    await channel.consume(q_to_bot.queue, async (msg) => {
        stock_response = await handleEvent(msg, process.env.URL_STOQ);
        await channel.publish("bot_to_chat", "", Buffer.from(JSON.stringify(stock_response)));
    });

  } catch (error) {
    console.log(error);
  }
})();
