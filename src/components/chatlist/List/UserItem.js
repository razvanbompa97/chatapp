import React, { useContext } from 'react';

import { ConversationContext } from '../../../context/conversations-context';

import './UserItem.css';

const UserItem = (props) => {
  const { getLastMessage } = useContext(ConversationContext);

  const activeChatItem = (event) => {
    event.preventDefault();

    props.onChatClick({
      ...props,
      isActive: true,
    });
  };

  const lastMessage = props.id.includes('u') && getLastMessage(props.id);

  return (
    <div className="user-item" key={props.id} onClick={activeChatItem}>
      <div className="user-image">
        <img src={props.image} alt={props.name} />
      </div>
      <div className="user-message-info">
        <div className="user-info">
          <div className="user-info--name">{props.name}</div>
          <div className="user-info--message">{lastMessage}</div>
        </div>
        <div className="user-info--message--date">15:34</div>
      </div>
    </div>
  );
};

export default UserItem;
