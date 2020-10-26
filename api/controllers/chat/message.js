module.exports = {
  friendlyName: 'Message',

  description: 'Handles the Chat s messages',

  inputs: {
    room: {
      type: 'string',
      required: true,
    },
    payload: {
      type: 'string',
      required: true,
    },
  },

  exits: {},

  fn: async function (inputs) {
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
      // Return Resolv and breaks ode to not record Bot Commands
      return Promise.resolve();
    }

    const post = await Post.create({
      postedAt: Date.now(),
      room: inputs.room,
      payload: inputs.payload,
      user: this.req.me.fullName,
    }).fetch();
    sails.sockets.broadcast(inputs.room, 'message', [post]);
    return Promise.resolve();
  },
};
