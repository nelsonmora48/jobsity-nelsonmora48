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
    // console.log(this.req.me);
    sails.sockets.leave(this.req, inputs.room);
    // sails.sockets.blast('Un Usuario ha dejado el Room ' + inputs.room);
    return Promise.resolve();
  },
};
