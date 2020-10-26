const { TestScheduler } = require("jest");
const handleEvent = require("./handleEvent");

test("Handle Error on Connection", async () => {
  return handleEvent(
    {
      content: new Buffer.from(
        JSON.stringify({ user: "test", stock_code: "INEXISTENT" })
      ),
    },
    "http://someurl"
  ).then((data) => {
    expect(data).toMatchObject({
      response: "Bot has trouble getting data",
      user: "test",
    });
  });
});
