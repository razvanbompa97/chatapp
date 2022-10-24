import React, { useContext } from 'react';
import { FriendsContext } from '../../../context/friends-context';
import { GroupsContext } from '../../../context/groups-context';

import UserItem from './UserItem';

import './UserList.css';

const UserList = () => {
  const { friends, updateFriend } = useContext(FriendsContext);
  const { groups, updateGroup } = useContext(GroupsContext);

  const handleConvInfo = (data) => {
    const updatedGroupData = groups.map((group) => {
      if (data.id === group.id) {
        return {
          id: data.id,
          name: data.name,
          image: data.image,
          isActive: data.isActive,
          users: group.users,
        };
      }

      return {
        isActive: false,
        id: group.id,
        name: group.name,
        image: group.image,
        users: group.users,
      };
    });

    updateGroup(updatedGroupData);

    const updatedUserData = friends.map((user) => {
      if (data.id === user.id) {
        return {
          isActive: data.isActive,
          id: data.id,
          name: data.name,
          image: data.image,
        };
      }

      return {
        isActive: false,
        id: user.id,
        name: user.name,
        image: user.image,
      };
    });

    updateFriend(updatedUserData);
  };

  return (
    <section className="user-list">
      {friends.map((user) => (
        <UserItem
          id={user.id}
          name={user.name}
          image={user.image}
          isActive={user.isActive}
          onChatClick={handleConvInfo}
          key={user.id}
        />
      ))}
      {groups.map((group) => (
        <UserItem
          id={group.id}
          name={group.name}
          image={group.image}
          isActive={group.isActive}
          onChatClick={handleConvInfo}
          key={group.id}
        />
      ))}
    </section>
  );
};

export default UserList;
