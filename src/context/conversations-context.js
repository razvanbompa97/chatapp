import { createContext } from 'react';

export const ConversationContext = createContext({
  conversations: [],
  updateConversation: (conversation) => {},
  getConversation: () => {},
  updateGroupConversation: () => {},
  addGroupConversation: () => {},
  updateGroupConversationForUsers: () => {},
  getLastMessage: () => {},
  addConversationForUsers: () => {},
});
