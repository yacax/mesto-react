import PopupWithForm from "./PopupWithForm"
import React, { useState } from "react";

export function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link: link,
    });
    setName('');
    setLink('');
  }

  function handleName(e) {
    setName(e.target.value);
  }

  function handleLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Создать"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input popup__input_name_title"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        id="place-name-input"
        value={name}
        onChange={handleName}
      />
      <span className="popup__error-text place-name-input-error" />

      <input
        type="url"
        className="popup__input popup__input_name_subtitle"
        name="link"
        placeholder="Ссылка на картинку"
        id="place-url-input"
        required
        value={link}
        onChange={handleLink}
      />
      <span className="popup__error-text place-url-input-error" />
    </PopupWithForm>
  )

}