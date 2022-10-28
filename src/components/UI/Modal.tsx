import { useEffect } from 'react';

import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

type PropsBackdrop = {
  onClose: () => void;
};

type PropsModalOverlay = {
  currentTheme: string;
  children: React.ReactNode;
};

type PropsModal = {
  onClose: () => void;
  currentTheme: string;
  children: React.ReactNode;
};

const Backdrop = (props: PropsBackdrop) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props: PropsModalOverlay) => {
  return (
    <div
      className={classes.modal}
      style={{
        backgroundColor: props.currentTheme === 'light' ? 'white' : '#dddada',
        color: props.currentTheme === 'light' ? 'black' : 'white',
      }}
    >
      <div>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props: PropsModal) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay currentTheme={props.currentTheme}>
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
