import React, {Component} from 'react';
import styles from './UserForm.css';
//form for your nick
//komponenty-kontenery(posiadają swój wewnętrzny stan)-class
class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {name: ''};
  }

  handleSubmit(e) {
    //zatwierdza formularz(gdzie poczatkowa wartosc to puste pole)
    //zapobiec zachowaniu formularza(przesyłaniu formularza przez przycisk, lub
    //podążaniu za adresem URL)
    e.preventDefault();
    //modyfikuje stan w komponencie App
    //do met onUserSubmit przekazuje sie to co wpisano w formularz
    this.props.onUserSubmit(this.state.name); //????Sakd metoda onUserSubmit???
  }
  //odbiera wiadomosc jaka wpisalismy w input(nazwa uzytkownika)
  handleChange(e) {
    //modyfikuje stan unputa, zmienia text w inpucie
    this.setState({ name : e.target.value });
  }
  //do wpisania nazwy uzytkownika
  render() {
    return(
      <form className={styles.UserForm} onSubmit={e => this.handleSubmit(e)}>
        <input
          className={styles.UserInput}
          placeholder='Write your nickname and press enter'
          onChange={e => this.handleChange(e)}
          value={this.state.name}
        />
      </form>
    );
  }
}

export default UserForm;
