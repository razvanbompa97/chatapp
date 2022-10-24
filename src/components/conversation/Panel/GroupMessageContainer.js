import React from 'react';
import GroupMessageItem from './GroupMessageItem';

const GroupMessageContainer = (props) => {
  return (
    <div className="message-container">
      {props.messages.map((message) => (
        <GroupMessageItem
          {...message}
          key={message.text + message.date + message.user}
        />
      ))}
    </div>
  );
};

export default GroupMessageContainer;
