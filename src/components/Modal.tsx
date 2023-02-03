import React from "react";

const Modal = ({ message, valid }: { message: string; valid: boolean }) => {
  return <p className={`modal ${valid ? "green" : "red"}`}>{message}</p>;
};

export default Modal;
