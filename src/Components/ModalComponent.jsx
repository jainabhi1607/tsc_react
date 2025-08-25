import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalComponent = ({ show, handleClose, title, children, footer }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Body>
        <h1 class="">
		  	{title}
			<a
          className="float-right close-icon close-popup"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleClose(); // closes via React state
          }}
          aria-label="Close"
        >
          <span class="cross-icon"></span>
        </a>
		  </h1>
        {children}{footer}</Modal.Body>
    </Modal>
  );
};

export default ModalComponent;
