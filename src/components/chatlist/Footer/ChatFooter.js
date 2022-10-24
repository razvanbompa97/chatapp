import React, { useContext, useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FriendsContext } from '../../../context/friends-context';
import { GroupsContext } from '../../../context/groups-context';
import { MyUserContext } from '../../../context/myuser-context';
import { ConversationContext } from '../../../context/conversations-context';
import Modal from '../../modal/Modal';

import './ChatFooter.css';

const ChatFooter = () => {
  const [addGroupModal, setAddGroupModal] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const { friends } = useContext(FriendsContext);

  const { groups, addGroup } = useContext(GroupsContext);

  const myUser = useContext(MyUserContext).user;

  const { addGroupConversation } = useContext(ConversationContext);

  const [selectedFriends, setSelectedFriends] = useState(
    friends.map((friend) => ({
      id: friend.id,
      name: friend.name,
      image: friend.image,
      isSelected: false,
    }))
  );

  useEffect(() => {
    if (selectedFriends.filter((friend) => friend.isSelected).length >= 2) {
      return setButtonDisabled(false);
    }

    return setButtonDisabled(true);
  }, [selectedFriends]);

  const addGroupHandler = (event) => {
    event.preventDefault();

    setAddGroupModal(true);
  };

  const selectFriendHandler = (event, selectedFriend) => {
    event.preventDefault();

    const updatedSelectedFriends = selectedFriends.map((friend) => {
      if (selectedFriend.id === friend.id) {
        return {
          id: friend.id,
          name: friend.name,
          image: friend.image,
          isSelected: !friend.isSelected,
        };
      }

      return friend;
    });

    setSelectedFriends(updatedSelectedFriends);
  };

  const createGroupHandler = (event) => {
    event.preventDefault();

    const users = selectedFriends
      .map((friend) => {
        if (friend.isSelected) {
          return friend.id;
        }

        return null;
      })
      .filter((friend) => friend);

    const group = {
      id: `g${groups.length + 1}`,
      name: `Friends Group ${groups.length + 1}`,
      users: [...users, myUser.id].sort(),
      image:
        'https://www.shareicon.net/data/512x512/2016/06/30/788858_group_512x512.png',
      isActive: false,
    };

    addGroup(group);

    addGroupConversation({ id: group.id, messages: [] });

    const updatedSelectedFriends = selectedFriends.map((friend) => ({
      id: friend.id,
      name: friend.name,
      image: friend.image,
      isSelected: false,
    }));

    setSelectedFriends(updatedSelectedFriends);

    setAddGroupModal(false);
  };

  const cancelGroupHandler = (event) => {
    event.preventDefault();

    setAddGroupModal(false);

    const updatedSelectedFriends = selectedFriends.map((friend) => ({
      id: friend.id,
      name: friend.name,
      image: friend.image,
      isSelected: false,
    }));

    setSelectedFriends(updatedSelectedFriends);
  };

  const addGroupHeader = <h2>Select at least 2 people from your list</h2>;

  const addGroupContent = (
    <React.Fragment>
      {selectedFriends.map((friend) => (
        <div
          className={
            friend.isSelected ? 'add-group-user selected' : 'add-group-user'
          }
          key={friend.id}
          onClick={(event) => selectFriendHandler(event, friend)}
        >
          <div className="add-group-user-image">
            <img src={friend.image} alt={friend.name} />
          </div>
          <div className="add-group-user-message-info">
            <div className="add-group-user-info">
              <div className="add-group-user-info--name">{friend.name}</div>
            </div>
          </div>
        </div>
      ))}
    </React.Fragment>
  );

  const addGroupFooter = (
    <React.Fragment>
      <div className="add-group-actions">
        <button type="button" onClick={cancelGroupHandler}>
          Cancel
        </button>
        <button
          type="button"
          disabled={buttonDisabled}
          onClick={createGroupHandler}
        >
          Create Group
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {addGroupModal && (
        <Modal
          header={addGroupHeader}
          content={addGroupContent}
          footer={addGroupFooter}
        />
      )}
      <div className="chat-footer">
        <div className="add-button">
          <FontAwesomeIcon icon={faPlus} />
          <div className="add-button-text">Add Friend</div>
        </div>
        <div className="add-button" onClick={addGroupHandler}>
          <FontAwesomeIcon icon={faPlus} />
          <div className="add-button-text">Make a group</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChatFooter;
