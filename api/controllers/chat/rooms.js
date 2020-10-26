module.exports = {
  friendlyName: 'Rooms',

  description: 'Return Rooms Created',

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    const websocketId = sails.sockets.getId(this.req);

    // Obtains Rooms created
    const allRooms = _.keys(sails.io.sockets.adapter.rooms);
    const rooms = _.filter(allRooms, (k) => {
      return new RegExp(/^room/).test(k);
    });

    sails.sockets.broadcast(websocketId, 'rooms', rooms);
    return Promise.resolve();
  },
};
