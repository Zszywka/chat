import React, { Component } from 'react';
import styles from './MessageForm.css';

//komponenty-kontenery(posiadają swój wewnętrzny stan)-class
//formularz do wyslania wiadomosci na czacie
class MessageForm extends Component {
  constructor(props) {
    super(props);
    //poczatkowa wartosc -pusty string
    this.state = {
      text: ''
    };
  }
  //wyslanie nowej wiadom do servera
  handleSubmit(e) {
    e.preventDefault();
    //konstruujemy obiekt message (tak jak chce beck-end)
    const message = {
      //od kogo(this.props->bezposrednio z propsow/co bylo na poczatku wpisane)
      from: this.props.name,
      //jaka wiadomosc (wiadomość ustawiamy na taką,
      //jaka znajduje się w stanie (to co wpisaliśmy w input)
      text: this.state.text
    };
    //?? skad ta metoda onMessageSubmit????
    //masage nasza nowo napisana metoda
    this.props.onMessageSubmit(message);
    //wyczyszczenia stanu text, aby mozna bylo pisac kolejna wiadomosc
    this.setState({
      text: ''
    });
  }
  //zmieni stan text
  changeHandler(e) {
    this.setState({
      //ustawia wartosc inputa
      text: e.target.value
    });
  }

  render() {
    return(
      <form className={styles.MessageForm} onSubmit={e => this.handleSubmit(e)}>
        <input
          className={styles.MessageInput}
          onChange={e => this.changeHandler(e)}
          value={this.state.text}
          placeholder='Message'
        />
      </form>
    );
  }
}

export default MessageForm;
