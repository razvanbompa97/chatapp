import MessageItem from './MessageItem';

import './MessageContainer.css';

const MessageContainer = (props) => {
  const receivedMessages = props.receivedMessages.map((message) => ({
    ...message,
    isReceived: true,
    isSent: false,
  }));

  const sentMessages = props.sentMessages.map((message) => ({
    ...message,
    isReceived: false,
    isSent: true,
  }));

  const allMessages = receivedMessages.concat(sentMessages);

  const messagesSortedByNewest = allMessages.sort((conv1, conv2) => {
    if (new Date(conv1.date) < new Date(conv2.date)) {
      return -1;
    } else if (new Date(conv1.date) < new Date(conv2.date)) {
      return 1;
    }
    return 0;
  });

  return (
    <div className="message-container">
      {messagesSortedByNewest.map((message) => (
        <MessageItem {...message} key={message.text + message.date} />
      ))}
    </div>
  );
};

export default MessageContainer;
