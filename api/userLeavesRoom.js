const obtainUserRoom = require('./obtainUserRoom');

module.exports = function (req) {
  const room = obtainUserRoom(req);

  // Leave Actual Room
  sails.sockets.leave(req, room);

  // Announce a User has Left the Room
  sails.sockets.broadcast(
    room,
    'message',
    [
      {
        postedAt: Date.now(),
        room: room,
        payload: '[ has Left ]',
        user: req.me.fullName,
      },
    ],
    req
  );
};
