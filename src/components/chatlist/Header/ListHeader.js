import React from 'react';

import './ListHeader.css';

const ListHeader = (props) => {
  return (
    <div className="chat-header">
      <div className="chat-header--image">
        <img src={props.image} alt={props.name} />
      </div>
      <div className="chat-header--welcome--text">{`Welcome ${props.name}`}</div>
    </div>
  );
};

export default ListHeader;
