import './ConversationHeader.css';

const ConversationHeader = (props) => {
  return (
    <div className="conversation-header">
      <div className="conversation-header--user--image">
        <img src={props.image} alt={props.name} />
      </div>
      <div className="conversation-header--user-info">
        <div className="conversation-header--user-name">{props.name}</div>
      </div>
    </div>
  );
};

export default ConversationHeader;
