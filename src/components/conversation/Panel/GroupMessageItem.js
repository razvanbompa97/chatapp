import React, { useContext } from 'react';
import { Emoji } from 'emoji-picker-react';

import { FriendsContext } from '../../../context/friends-context';
import { MyUserContext } from '../../../context/myuser-context';

const GroupMessageItem = (props) => {
  const myUser = useContext(MyUserContext).user;

  const { friends } = useContext(FriendsContext);

  const isMyUser = props.user === myUser.id;

  const messageClass = isMyUser ? 'message-item--right' : 'message-item--left';

  const userName = isMyUser
    ? myUser.name
    : friends.find((friend) => friend.id === props.user).name;

  return (
    <div className={messageClass}>
      {!isMyUser && <div className="message-item-user">{userName}</div>}
      {isMyUser && <div className="message-item-text">{props.text}</div>}
      {!isMyUser && (
        <div className="message-item-with-emoji">
          <div className="message-item-text">{props.text}</div>
          <Emoji unified="2764-fe0f" size={15} />
        </div>
      )}
      <div className="message-item-date">{props.date}</div>
    </div>
  );
};

export default GroupMessageItem;
