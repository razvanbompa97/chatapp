import { useContext, useState, useRef } from 'react';

// import EmojiPicker from 'emoji-picker-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { ConversationContext } from '../../../context/conversations-context';
import { MyUserContext } from '../../../context/myuser-context';

import './MessageInput.css';
import { GroupsContext } from '../../../context/groups-context';

const MessageInput = ({ userId, groupId }) => {
  const [pickerShown, setPickerShown] = useState(false);

  const [message, setMessage] = useState('');

  const hiddenInput = useRef(null);

  const myUser = useContext(MyUserContext).user;

  const { getGroup } = useContext(GroupsContext);

  const { updateConversation, updateGroupConversationForUsers } =
    useContext(ConversationContext);

  const messageChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  const meesageSubmitHandler = (event) => {
    event.preventDefault();

    userId && updateConversation(userId, message);

    if (groupId) {
      const groupConversation = getGroup(groupId);

      const groupConversationUsers = groupConversation.users;

      updateGroupConversationForUsers(
        groupId,
        message,
        groupConversationUsers,
        myUser.id
      );
    }

    setMessage('');
  };

  const sendAttachmentsHandler = (event) => {
    const url = URL.createObjectURL(event.target.files[0]);

    setMessage(url);
  };

  // const emojiClickHandler = (data, event) => {
  //   console.log(data);

  //   setPickerShown(!pickerShown);
  // };

  return (
    <form onSubmit={meesageSubmitHandler} style={{ width: '100%' }}>
      <div className="message-form">
        {/* {pickerShown && <EmojiPicker onEmojiClick={emojiClickHandler} />} */}
        <div
          className="message-emoji"
          onClick={() => setPickerShown(!pickerShown)}
        >
          <FontAwesomeIcon icon={faFaceSmile} />
        </div>
        <input
          className="message-input"
          type="text"
          value={message}
          placeholder="Type a message"
          onChange={messageChangeHandler}
        />
        <div
          className="message-input-image"
          onClick={() => hiddenInput.current.click()}
        >
          <FontAwesomeIcon icon={faImage} />
          <input
            type="file"
            accept="image/*"
            ref={hiddenInput}
            onChange={sendAttachmentsHandler}
          />
        </div>
        <button className="send-button" type="submit">
          Send
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
