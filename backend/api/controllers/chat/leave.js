const userLeavesRoom = require('../../userLeavesRoom');

module.exports = {
  friendlyName: 'Leva Room',

  description: 'Handles the User Left Room',

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    userLeavesRoom(this.req);

    return Promise.resolve();
  },
};
