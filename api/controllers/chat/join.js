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
    // Query Last 50 Messages from Database
    const last50Messages = await Post.find({
      where: { room: inputs.room },
      limit: 50,
      sort: 'createdAt',
    });
    // Broadcast Result with Last 50 Messages
    sails.sockets.broadcast(websocketId, 'message', last50Messages);
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
    // Announce Room Creation
    // sails.sockets.blast('all', 'Creado Room ' + inputs.room);
    return Promise.resolve();
  },
};
