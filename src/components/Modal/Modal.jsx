import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalStyle } from './Modal.styled';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, onClose }) => {

  const handleKeyDown = (e => {
    if (e.code === 'Escape') {
      onClose()
    }
  }, [onClose]);

  useEffect(() => {
  
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleKeyDown);
    };
  }, [handleKeyDown]);


  return createPortal(
    <Overlay onClick={onClose}>
      <ModalStyle>
        {children}
      </ModalStyle>
    </Overlay>,
    modalRoot,
  );
};



Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
};