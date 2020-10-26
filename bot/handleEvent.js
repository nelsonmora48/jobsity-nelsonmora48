const fetch = require("node-fetch");
const AbortController = require("abort-controller");
const controller = new AbortController();
const timeout = setTimeout(() => {
  controller.abort();
}, 30000);

module.exports = async (msg, url) => {
  let response;
  console.log(" [*] Message Received");
  const json_msg = JSON.parse(msg.content.toString());
  // Fetch Data FROM External API
  try {
    console.log("Fetching...");
    const final_url = url.replace(
      "[stock_code]",
      json_msg.stock_code
    );
    const response_fetch = await fetch(final_url, {
      signal: controller.signal,
    });
    console.log("Done...");
    const buffer = await response_fetch.buffer();
    // Parse Body Split by Lines, Gets second line and get de 6th position corresponding Current Quote (HOLC)
    const quote = buffer.toString().split("\r\n")[1].split(",")[6];
    if (quote !== "N/D") {
      response = `${json_msg.stock_code.toUpperCase()} quote is $${quote} per share`;
    } else {
      response = `${json_msg.stock_code.toUpperCase()} not Found`;
    }
    return { user: json_msg.user, response: response };
  } catch (error) {
    console.log(error);
    return { user: json_msg.user, response: "Bot has trouble getting data" };
  } finally {
    clearTimeout(timeout);
  }
};
