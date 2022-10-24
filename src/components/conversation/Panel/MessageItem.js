import React from 'react';
import { Emoji } from 'emoji-picker-react';

import './MessageItem.css';

const MessageItem = (props) => {
  const isMyUser = props.isSent;

  const messageClass = isMyUser ? 'message-item--right' : 'message-item--left';

  return (
    <React.Fragment>
      {!/blob/.test(props.text) ? (
        <div className={messageClass}>
          {isMyUser && <div className="message-item-text">{props.text}</div>}
          {!isMyUser && (
            <div className="message-item-with-emoji">
              <div className="message-item-text">{props.text}</div>
              <Emoji unified="2764-fe0f" size={15} />
            </div>
          )}
          <div className="message-item-date">{props.date}</div>
        </div>
      ) : (
        <div className={messageClass}>
          <img alt="file" src={props.text}></img>
        </div>
      )}
    </React.Fragment>
  );
};

export default MessageItem;
