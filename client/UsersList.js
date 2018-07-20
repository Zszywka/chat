import React from 'react';
import styles from './UsersList.css';
//komponent prezentacyjny(bez render,
//to funkcje przyjujace na wejscie propsy) props => (...);
//a na wyjsciu odpowiednio renderuja komponent => (...);
//wyswietlanie listy uzytkownikow
//do propsow nalezy lista users
const UsersList = props => (
  <div className={styles.Users}>
    <div className={styles.UsersOnline}>
      {props.users.length} people online
    </div>
    <ul className={styles.UsersList}>
      {
        //chcemy zmienic elementy tablicy users:[] na pojedynczych uzytkownikow
        props.users.map((user) => {
          return (
            //props key na li jest wymagany bo iterujemy po liscie uzytk.
            //aby nie renderowac elem. ktore nie ulegly zmianie
            <li key={user.id} className={styles.UserItem}>
              {user.name}
            </li>
          );
        })
      }
    </ul>
  </div>
);

export default UsersList
