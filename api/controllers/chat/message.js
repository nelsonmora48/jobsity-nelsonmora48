const amqp = require('amqplib/callback_api');

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
    if (inputs.payload === '/stock') {
      amqp.connect('amqp://user:secret@localhost', function (error0, connection) {
        if (error0) {
          throw error0;
        }
        connection.createChannel(function (error1, channel) {
          if (error1) {
            throw error1;
          }
          var queue = 'stock';
          var msg = {
            user: sails.sockets.getId(this.req),
            stock_code: 'appl.us'
          };

          channel.assertQueue(queue, {
            durable: true,
          });

          channel.sendToQueue(queue, Buffer.from(msg));
          console.log(' [x] Sent %s', msg);
        });
      });
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
