class UsersService {
  //initializing the user array
  constructor() {
    this.users = [];
  }
  //zwraca tablice użytkowników
  getAllUsers() {
    return this.users;
  }
  // odszukuje użytkownika po wskazanym przez nas id
  getUserById(userId) {
    return this.users.find(user => user.id === userId);
  }
  // dodac kolejna osobe do listy
  addUser(user) {
    this.users = [user, ...this.users];
  }
  //usuwa wskazanego przez nas użytkownika
  //odfiltrowuje każdy obiekt znajdujący się na liście i zwraca te,
  //które spełniają przekazany warunek. W tym miejscu odfiltrowujemy
  //tych użytkowników, których ID różni się od wskazanego w argum.metody
  removeUser(userId) {
    this.users = this.users.filter(user => user.id !== userId);
  }
}
//export object UserService
module.exports = UsersService;
