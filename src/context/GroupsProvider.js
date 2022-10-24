import { useState } from 'react';

import GroupsJSON from '../utils/groupsList.json';
import { GroupsContext } from './groups-context';

const GroupsProvider = (props) => {
  const [groups, setGroups] = useState(GroupsJSON);

  const updateGroupHandler = (data) => {
    setGroups(data);
  };

  const addGroupHandler = (group) => {
    setGroups([...groups, group]);
  };

  const getGroupHandler = (id) => groups.find((group) => group.id === id);

  return (
    <GroupsContext.Provider
      value={{
        groups,
        updateGroup: updateGroupHandler,
        addGroup: addGroupHandler,
        getGroup: getGroupHandler,
      }}
    >
      {props.children}
    </GroupsContext.Provider>
  );
};

export default GroupsProvider;
