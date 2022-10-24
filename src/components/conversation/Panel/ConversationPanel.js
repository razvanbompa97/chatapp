import React from 'react';
import MessageContainer from './MessageContainer';
import MessageInput from './MessageInput';

import './ConversationPanel.css';

const ConversationPanel = ({ conversation }) => {
  return (
    <React.Fragment>
      <div className="conversation-messages">
        <MessageContainer
          receivedMessages={conversation.receivedMessages}
          sentMessages={conversation.sentMessages}
          userId={conversation.id}
        />
      </div>
      <MessageInput userId={conversation.id} />
    </React.Fragment>
  );
};

export default ConversationPanel;
