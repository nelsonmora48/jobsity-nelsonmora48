const broadcastLastMessages = require('../../broadcastLastMessages');

module.exports = {
  friendlyName: 'Message',

  description: 'Handles the Chat s messages',

  inputs: {
    room: {
      type: 'string',
      required: true,
      isNotEmptyString: true,
    },
  },

  exits: {},

  fn: async function (inputs) {
    const websocketId = sails.sockets.getId(this.req);

    // Join Connection Socket to Room
    sails.sockets.join(this.req, inputs.room);

    await broadcastLastMessages(websocketId, inputs.room);

    // Announce a User has Joined a other Users in the Room
    sails.sockets.broadcast(
      inputs.room,
      'message',
      [
        {
          postedAt: Date.now(),
          room: inputs.room,
          payload: '[ has Joined ]',
          user: this.req.me.fullName,
        },
      ],
      this.req
    );

    return Promise.resolve();
  },
};
