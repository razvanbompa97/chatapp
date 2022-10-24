import React, { useContext } from 'react';

import ConversationHeader from './Header/ConversationHeader';
import ConversationPanel from './Panel/ConversationPanel';
import NoMessageSelected from '../../images/No-message-selected.svg';
import { FriendsContext } from '../../context/friends-context';
import { ConversationContext } from '../../context/conversations-context';

import './Conversation.css';
import { GroupsContext } from '../../context/groups-context';
import GroupConversationPanel from './Panel/GroupConversationPanel';

const Conversation = () => {
  const { friends } = useContext(FriendsContext);
  const { groups } = useContext(GroupsContext);
  const { getConversation } = useContext(ConversationContext);

  const activeFriend = friends.find((friend) => friend.isActive);
  const activeGroup = groups.find((group) => group.isActive);

  if (!activeFriend && !activeGroup) {
    return (
      <div className="conversation" style={{ justifyContent: 'center' }}>
        <img alt="No message" src={NoMessageSelected} />
      </div>
    );
  }

  let conversation;

  if (activeFriend) {
    const activeConversationId = activeFriend.id;
    conversation = getConversation(activeConversationId);
  } else {
    const activeConversationId = activeGroup.id;
    conversation = getConversation(activeConversationId);
  }

  return (
    <div className="conversation">
      <ConversationHeader
        id={activeFriend ? activeFriend.id : activeGroup.id}
        name={activeFriend ? activeFriend.name : activeGroup.name}
        image={activeFriend ? activeFriend.image : activeGroup.image}
      />
      {activeFriend && conversation && (
        <ConversationPanel conversation={conversation} />
      )}
      {activeGroup && conversation && (
        <GroupConversationPanel conversation={conversation} />
      )}
    </div>
  );
};

export default Conversation;
