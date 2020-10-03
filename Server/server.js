const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);



io.sockets.on("connection", socket => {
    io.emit("init", { 'data': 'hello' });


});



server.listen(3000, () => {
    console.log("Listening on port 3000");
});
