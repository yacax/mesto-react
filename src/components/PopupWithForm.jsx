import React, { useEffect } from 'react';

  const PopupWithForm = ({ name, title, children, isOpen, onClose }) => {

  const handleOverlayClose = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleEscClose = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscClose);
    } else {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isOpen]);

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
      onClick={handleOverlayClose}
    >
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <form className={`popup__form popup__form_name_${name}`} noValidate>
          <h2 className="popup__title">{title}</h2>
          {children}         
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;