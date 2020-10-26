const obtainUserRoom = require('../../obtainUserRoom.js');

module.exports = {
  friendlyName: 'Message',

  description: 'Handles the Chat s messages',

  inputs: {
    payload: {
      type: 'string',
      required: true,
    },
  },

  exits: {},

  fn: async function (inputs) {
    // Command Detection
    if (new RegExp(/\/stock=/).test(inputs.payload)) {
      const text = inputs.payload.replace('/stock=', '');

      const msg = {
        user: sails.sockets.getId(this.req),
        stock_code: text.trim(),
      };
      global.amqp_channel.publish(
        'chat_to_bot',
        '',
        Buffer.from(JSON.stringify(msg))
      );
      // Return Resolve and breaks ode to not record Bot Commands
      return Promise.resolve();
    }

    const room = obtainUserRoom(this.req);
    console.log('record msg to ' + room);
    const post = await Post.create({
      postedAt: Date.now(),
      room: room,
      payload: inputs.payload,
      user: this.req.me.fullName,
    }).fetch();

    sails.sockets.broadcast(room, 'message', [post]);
    return Promise.resolve();
  },
};
