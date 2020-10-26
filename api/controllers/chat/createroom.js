const userLeavesRoom = require('../../userLeavesRoom');
const broadcastLastMessages = require('../../broadcastLastMessages');

module.exports = {
  friendlyName: 'Room Create',

  description: 'Creates a New Room',

  inputs: {},

  exits: {},

  fn: async function () {
    const websocketId = sails.sockets.getId(this.req);

    // Obtains Rooms created
    const allRooms = _.keys(sails.io.sockets.adapter.rooms);
    const groupRooms = _.filter(allRooms, (k) => {
      return new RegExp(/^room/).test(k);
    });
    const numberOfRooms = _.size(groupRooms);
    const newRoom = 'room' + numberOfRooms;

    userLeavesRoom(this.req);

    // Join Connection Socket to New Room
    sails.sockets.join(this.req, newRoom);

    await broadcastLastMessages(websocketId, newRoom);

    // Announce a User has Joined a other Users in the Room
    sails.sockets.broadcast(
      newRoom,
      'message',
      [
        {
          postedAt: Date.now(),
          room: newRoom,
          payload: '[ has Joined ]',
          user: this.req.me.fullName,
        },
      ],
      this.req
    );

    // Announce Room Creation
    sails.sockets.blast('rooms', [...groupRooms, newRoom]);
    return Promise.resolve();
  },
};
