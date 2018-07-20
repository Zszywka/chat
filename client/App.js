//import moduls
//class {Component} is imported from React
import React, { Component } from 'react';
//connect to a server operating in real time
import io from 'socket.io-client';

import styles from './App.css';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import UsersList from './UsersList';
import UserForm from './UserForm';

//connecting to a server in the namespace ('/')
const socket = io('/');

//create class App
// komponenty-kontenery(posiadają swój wewnętrzny stan)-class
class App extends Component {
  //initial state app
  constructor(props) {
  //calling the class Component constructor
    super(props);
    this.state = {
      users: [],
      messages: [],
      text: '',
      name: ''
    };
  }
  //funkcja nasłuchująca na wiadomości
  componentDidMount() {
    socket.on('message', message => this.messageReceive(message));
    socket.on('update', ({users}) => this.chatUpdate(users));
  }
  //odbiera wiadomosci
  messageReceive(message) {
    //...this.state.messages ->na podstawie istniejacej tablicy, stworzona zostala nowa
    //tablica z kolejna wiadomoscia na samym poczatku
    const messages = [message, ...this.state.messages];
    //.setState->aktualizauje stan wiadomosci a nastepnie wywoluje render()
    //{messages:messages} = {messages} skrocony zapis
    this.setState({messages});
  }
  //(aktualizacja listy)Serwer każdorazowo wysyla tablicę z aktualną listą użytkowników
  chatUpdate(users) {
    this.setState({users});
  }
  //wysyłaniem wiadomości do serwera
  handleMessageSubmit(message) {
    const messages = [message, ...this.state.messages];
    //aktualizujemy biezacy stan app
    this.setState({messages});
    //emitujemy wysyłaną wiadomość do reszty użytkowników czatu
    socket.emit('message', message);
  }
  //tworzenie nowego użytkownika czatu
  handleUserSubmit(name) {
    // tworzy nowego urzytkownika
    this.setState({name})
    //wysyła info do serwera, który powiadamia
    //reszte o fakcie,że dołączyliśmy do czatu.
    socket.emit('join', name);
  }
  //disconnect (jest automatycznie nasluchiwane przez server, po wyjsciu z app, server zauwazy zerwanie polaczenia i wykona odpowiednia metode)

  //checks whether the user has entered his name
  render() {
    return this.state.name !== '' ? this.renderLayout() : this.renderUserForm();
  }
  //Layout chat
  renderLayout() {
    return (
      <div className={styles.App}>
        <div className={styles.AppHeader}>
          <div className={styles.AppTitle}>Your Chat</div>
          <div className={styles.AppRoom}>Room For Pets Friends</div>
        </div>
        <div className={styles.AppBody}>
          <UsersList users={this.state.users}/>
          <div className={styles.MessageWrapper}>
            <MessageList messages={this.state.messages}/>
            <MessageForm
              onMessageSubmit={message => this.handleMessageSubmit(message)}
              name={this.state.name}
            />
          </div>
        </div>
      </div>
    );
  }
  //layout form before chat
  renderUserForm() {
    return (
      <UserForm onUserSubmit={name => this.handleUserSubmit(name)} />
    )
  }
};
//export the class outside the module
export default App;
