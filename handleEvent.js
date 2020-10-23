const fetch = require("node-fetch");

module.exports = async (msg) => {
  const content = JSON.parse(msg.content);
  console.log(" [*] Message Received");
  const json_msg = JSON.parse(msg.content.toString());
  // Fetch Data FROM External API
  try {
    console.log("Fetching...");
    // const response = await fetch(
    //   'https://stoq.com/q/l?s=" + json_msg.stock_code + "&f=sd2t2ohlcv&h&e=csv'
    // );
    const response = await fetch("http://localhost:1337/images/aapl.us.csv");
    console.log("Done...");
    const buffer = await response.buffer();
    // Parse Body Split by Lines, Gets second line and get de 6th position corresponding Current Quote
    const body = buffer.toString().split("\r\n")[1].split(",")[6];
    const resposne = (`${json_msg.stock_code.toUpperCase()} quote is $${body} per share`);
    return {user: json_msg.user, response: resposne};
  } catch (error) {
    console.error(error);
  }
};
