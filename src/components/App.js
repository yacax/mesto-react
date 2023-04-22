import React, { useState, useEffect } from 'react';

import { api } from '../utils/Api'

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import ImagePopup from './ImagePopup';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

const App = () => {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ popupIsOpen: false });

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getInitialCards()
      .then((initialCards) => setCards(initialCards))
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    api
      .getUserData()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleCardDelete(card) {

    api
      .deleteCard(card._id).then(() => {
        setCards((state) => state.filter((o) => o._id !== card._id))

      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api
      .toggleLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
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

  function handleUpdateUser(user) {

    api
      .patchUserData(user.name, user.about)
      .then((newUser) => {
        setCurrentUser(newUser)
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateAvatar(newAvatar) {

    api
      .patchAvatar(newAvatar.avatar)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleAddPlaceSubmit(newPlace) {

    api
      .postNewCard(newPlace)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            cards={cards}
            setCards={setCards}
            onCardDelete={handleCardDelete}
          />
          <Footer />
        </div>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <ImagePopup
          name="card"
          selectedCard={selectedCard}
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
