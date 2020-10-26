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
    sails.sockets.leave(this.req, inputs.room);
    // Announce a User has Left the Room
    sails.sockets.broadcast(
      inputs.room,
      'message',
      [
        {
          postedAt: Date.now(),
          room: inputs.room,
          payload: '[ has Left ]',
          user: this.req.me.fullName,
        },
      ],
      this.req
    );
    return Promise.resolve();
  },
};
