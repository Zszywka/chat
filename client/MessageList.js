import React from 'react';
import styles from './MessageList.css';

//komponent prezentacyjny
const Message = props => (
  <div className={styles.Message}>
    <strong>{props.from} :</strong>
    <span>{props.text}</span>
  </div>
);

const MessageList = props => (
  <div className={styles.MessageList}>
    {
      //mapujemy po liscie wiadomosci, korzysta ze stworzonego
      //wyzej komponentu meddage
      props.messages.map((message, i) => { //skad i czerpie???
        return (
          <Message
            key={i}
            from={message.from}
            text={message.text}
          />
        );
      })
    }
  </div>
);

export default MessageList;
