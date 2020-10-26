module.exports = async function (websocketId, room) {
  // Query Last 50 Messages from Database
  const last50Messages = await Post.find({
    where: { room: room },
    limit: 50,
    sort: 'createdAt',
  });

  // Broadcast Result with Last 50 Messages
  sails.sockets.broadcast(websocketId, 'message', last50Messages);
};
