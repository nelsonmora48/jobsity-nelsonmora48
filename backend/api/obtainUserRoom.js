module.exports = function (req) {
  const websocketId = sails.sockets.getId(req);

  // Obtain Actual Room
  for (const key in sails.io.sockets.adapter.rooms) {
    if (new RegExp(/^room/).test(key)) {
      if (
        sails.io.sockets.adapter.rooms[key].sockets.hasOwnProperty(websocketId)
      ) {
        return key;
      }
    }
  }
};
