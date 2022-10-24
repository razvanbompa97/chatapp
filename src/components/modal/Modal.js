import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from './Backdrop';

import './Modal.css';

const ModalOverlay = (props) => {
  const content = (
    <div className="modal">
      <header className="modal-header">{props.header}</header>
      <div className="modal-content">{props.content}</div>
      <footer className="modal-footer">{props.footer}</footer>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById('modal'));
};

const Modal = (props) => {
  return (
    <React.Fragment>
      <Backdrop />
      <ModalOverlay {...props} />
    </React.Fragment>
  );
};

export default Modal;
