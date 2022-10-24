import React, { useState } from 'react';
import Chat from './components/chatlist/Chat';
import Conversation from './components/conversation/Conversation';

import './App.css';
import { FriendsContext } from './context/friends-context';
import MyUserProvider from './context/MyUserProvider';
import ConversationProvider from './context/ConversationProvider';
import friendsList from './utils/friendsList.json';
import GroupsProvider from './context/GroupsProvider';

const App = () => {
  const [friends, setFriends] = useState(friendsList);

  const handleFriendUpdate = (data) => {
    setFriends(data);
  };

  return (
    <MyUserProvider>
      <GroupsProvider>
        <FriendsContext.Provider
          value={{ friends, updateFriend: handleFriendUpdate }}
        >
          <ConversationProvider>
            <main className="chat-app">
              <Chat />
              <Conversation />
            </main>
          </ConversationProvider>
        </FriendsContext.Provider>
      </GroupsProvider>
    </MyUserProvider>
  );
};

export default App;
