import React, { useState } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

const App = () => {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ popupIsOpen: false });

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const handleCardClick = (card) => {
    setSelectedCard({ ...card, popupIsOpen: true });
  };

  const closeAllPopups = () => {
    switch (true) {
      case isEditProfilePopupOpen:
        setIsEditProfilePopupOpen(false);
        break;
      case isAddPlacePopupOpen:
        setIsAddPlacePopupOpen(false);
        break;
      case isEditAvatarPopupOpen:
        setIsEditAvatarPopupOpen(false);
        break;
      case selectedCard.popupIsOpen:
        setSelectedCard({ ...selectedCard, popupIsOpen: false });
        break;
      default:
        break;
    }
  }

  return (
    <div className="body">
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />
      </div>

      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >

        <input
          type="text"
          className="popup__input popup__input_name_title"
          name="name"
          placeholder="Имя"
          required
          minLength="4"
          maxLength="40"
          id="profile-name-input"
        />
        <span className="popup__error-text profile-name-input-error"/>
        <input
          type="text"
          className="popup__input popup__input_name_subtitle"
          name="about"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
          id="profile-description-input"
        />
        <span className="popup__error-text profile-description-input-error"/>

      </PopupWithForm>

      <PopupWithForm
        name="place"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        buttonText="Создать"
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
        />
        <span className="popup__error-text place-name-input-error"/>

        <input
          type="url"
          className="popup__input popup__input_name_subtitle"
          name="link"
          placeholder="Ссылка на картинку"
          id="place-url-input"
          required
        />
        <span className="popup__error-text place-url-input-error"/>
      </PopupWithForm>

      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >

        <input
          type="url"
          className="popup__input popup__input_name_subtitle"
          name="avatar"
          placeholder="Ссылка на картинку"
          id="place-url-avatar-input"
          required
        />
        <span className="popup__error-text place-url-avatar-input-error"/>
      </PopupWithForm>

      <ImagePopup
        name="card"
        selectedCard={selectedCard}
        onClose={closeAllPopups}
      />

    </div>
  );
};

export default App;
