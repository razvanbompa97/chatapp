import React from 'react';

import GroupMessageContainer from './GroupMessageContainer';
import MessageInput from './MessageInput';

const GroupConversationPanel = ({ conversation }) => {
  return (
    <React.Fragment>
      <div className="conversation-messages">
        <GroupMessageContainer
          messages={conversation.messages}
          groupId={conversation.id}
        />
      </div>
      <MessageInput groupId={conversation.id} />
    </React.Fragment>
  );
};

export default GroupConversationPanel;
