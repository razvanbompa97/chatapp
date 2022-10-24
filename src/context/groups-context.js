import { createContext } from 'react';

export const GroupsContext = createContext({
  groups: [],
  updateGroup: () => {},
  addGroup: () => {},
  getGroup: () => {},
});
