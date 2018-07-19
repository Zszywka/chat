const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

//create app Express
const app = express();
//create server HTTP compatible with app
const server = http.createServer(app);
//connect socket to the server
const io = socketIo(server);
// download module UsersService
const UsersService = require('./UsersService');
//create a new instance class UserService
const userService = new UsersService();
//setting in the Express app the place from which our files will be served
app.use(express.static(__dirname + '/public'));
//create simple listening routing
//which will return the index.html file in response
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
//listening for connecting a new chat user
//socket-> a new chat user
io.on('connection', function(socket) {
  //miejsce dla funkcji, które zostaną wykonane po podłączeniu klienta
});
// klient nasłuchuje na wiadomość wejścia do czatu
//nasluch na zdarzenie join
socket.on('join', function(name){
  // użytkownika, który pojawił się w aplikacji zapisujemy do serwisu trzymającego listę osób w czacie
  userService.addUser({
    id: socket.id,
    name
  });
  // aplikacja emituje zdarzenie update, które aktualizuje
  //informację na temat listy użytkowników każdemu nasłuchującemu na wydarzenie 'update'
  io.emit('update', {
    users: userService.getAllUsers()
  });
});
//closing the chat by the user
io.on('connection', function(socket) {
  //when the connection is broken
  socket.on('disconnect', () => {
    //removes the user from the list of people in the chat
    userService.removeUser(socket.id);
    //user emited last message(socket.broadcast.emit->sent for everyone without you)
    //(socket.emit -> send message for everyone with you)
    socket.broadcast.emit('update', {
      users: userService.getAllUsers()
    });
  });
});
//sending messages in the chat
io.on('connection', function(socket) {
//soclet-> user who send the message in the chat
  socket.on('message', function(message){
    //na liscie uzytkownikow szukamy wyciagamy id tego ktory wysyla wiadomosc,
    //mamy imie tego ktorego id wskazemy
    const {name} = userService.getUserById(socket.id);
    // send message for everyone without you
    socket.broadcast.emit('message', {
      text: message.text,
      //sending name
      from: name
    });
  });
});
//runs the server (routing)
//listens to inquiries from clients
server.listen(3000, function(){
  console.log('listening on *:3000');
});
