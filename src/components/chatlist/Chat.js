import React, { useContext, useEffect } from 'react';

import { MyUserContext } from '../../context/myuser-context';
import { FriendsContext } from '../../context/friends-context';
import { ConversationContext } from '../../context/conversations-context';
import ListHeader from './Header/ListHeader';
import UserList from './List/UserList';
import ChatFooter from './Footer/ChatFooter';

import './Chat.css';

const Chat = () => {
  const { user } = useContext(MyUserContext);

  const { friends } = useContext(FriendsContext);

  const { conversations, addConversationForUsers } =
    useContext(ConversationContext);

  useEffect(() => {
    const friendsWithNoConversation = friends.filter((friend) => {
      return !conversations.some(
        (conversation) => friend.id === conversation.id
      );
    });

    addConversationForUsers(friendsWithNoConversation);
  }, [conversations, friends, addConversationForUsers]);

  return (
    <div className="chat">
      <ListHeader id={user.id} name={user.name} image={user.image} />
      <UserList />
      <ChatFooter />
    </div>
  );
};

export default Chat;
