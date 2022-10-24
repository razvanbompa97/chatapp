import { useState } from 'react';

import conversationsJSON from '../utils/messages.json';
import { ConversationContext } from './conversations-context';

const formatDate = (date) => {
  const actualDate = date || new Date();
  const day = actualDate.getDate();
  const month = actualDate.toLocaleString('en-us', { month: 'short' });
  const year = actualDate.getFullYear();
  const hour = ('0' + actualDate.getHours()).slice(-2);
  const minutes = ('0' + actualDate.getMinutes()).slice(-2);
  const seconds = ('0' + actualDate.getSeconds()).slice(-2);

  return `${day} ${month} ${year} ${hour}:${minutes}:${seconds}`;
};

const ConversationProvider = (props) => {
  const [conversations, setConversations] = useState(conversationsJSON);

  const addConversationForUsers = (users) => {
    const previousConversations = conversations;
    users.forEach((user) => {
      previousConversations.push({
        id: user.id,
        receivedMessages: [],
        sentMessages: [],
      });
    });

    setConversations(previousConversations);
  };

  const updateConversationHandler = (userId, newMessage) => {
    const updatedConversations = conversations.map((conversation) => {
      if (conversation.id === userId) {
        if (/blob/.test(newMessage)) {
          return {
            id: conversation.id,
            sentMessages: [
              ...conversation.sentMessages,
              {
                text: newMessage,
                date: formatDate(),
              },
            ],
            receivedMessages: [...conversation.receivedMessages],
          };
        }
        return {
          id: conversation.id,
          sentMessages: [
            ...conversation.sentMessages,
            {
              text: newMessage,
              date: formatDate(),
            },
          ],
          receivedMessages: [
            ...conversation.receivedMessages,
            {
              text: newMessage,
              date: formatDate(new Date(Date.now() + 1000)),
            },
          ],
        };
      }

      return conversation;
    });

    setConversations(updatedConversations);
  };

  const updateGroupConversationHandler = (groupId, message, user) => {
    const updatedConversations = conversations.map((conversation) => {
      if (conversation.id === groupId) {
        return {
          id: conversation.id,
          messages: [
            ...conversation.messages,
            {
              text: message,
              date: formatDate(),
              user,
            },
          ],
        };
      }

      return conversation;
    });

    setConversations(updatedConversations);
  };

  const updateGroupConversationForUsers = (groupId, message, users, myUser) => {
    const updatedConversation = conversations.map((conversation) => {
      if (conversation.id === groupId) {
        const newMessages = users.map((user, index) => ({
          text: message,
          date: formatDate(new Date(Date.now() + 1000 * (index + 1))),
          user,
        }));

        return {
          id: conversation.id,
          messages: [...conversation.messages, ...newMessages],
        };
      }

      return conversation;
    });

    setConversations(updatedConversation);
  };

  const getConversationHandler = (id) => {
    return conversations.find((conversation) => conversation.id === id);
  };

  const addGroupConversationHandler = (groupConversation) => {
    setConversations([...conversations, groupConversation]);
  };

  const getLastMessage = (id) => {
    const conversation = conversations.find(
      (conversation) => conversation.id === id
    );

    if (conversation) {
      const messages = conversation.sentMessages.concat(
        conversation.receivedMessages
      );

      let lastMessage = messages.length && messages[0];

      lastMessage &&
        messages.forEach((message) => {
          if (new Date(message.date) > new Date(lastMessage.date)) {
            lastMessage = message;
          }
        });

      return lastMessage.text ? lastMessage.text : '';
    }
  };

  return (
    <ConversationContext.Provider
      value={{
        conversations: conversations,
        updateConversation: updateConversationHandler,
        getConversation: getConversationHandler,
        updateGroupConversation: updateGroupConversationHandler,
        addGroupConversation: addGroupConversationHandler,
        updateGroupConversationForUsers,
        getLastMessage,
        addConversationForUsers,
      }}
    >
      {props.children}
    </ConversationContext.Provider>
  );
};

export default ConversationProvider;
