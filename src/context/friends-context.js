import { createContext } from 'react';

export const FriendsContext = createContext({
  friends: [],
  updateFriend: (friend) => {},
});
