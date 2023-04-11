import React, { useEffect, useState } from 'react';
import { api } from '../utils/Api';
import { Card } from './Card';

const Main = ({ onEditProfile, onAddPlace, onEditAvatar, ...props }) => {

  const [cards, setCards] = useState([]);

  const [ren] = useState(0);

  const useUserData = () => {
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');

    useEffect(() => {
      api.getUserData().then(({ name, about, avatar }) => {
        if (userName !== name) setUserName(name);
        if (userDescription !== about) setUserDescription(about);
        if (userAvatar !== avatar) setUserAvatar(avatar);
      }).catch((error) => {
        console.log(error)
      })
    }, [userName, userDescription, userAvatar]);

    return { userName, userDescription, userAvatar };
  };

  const { userName, userDescription, userAvatar } = useUserData();

  useEffect(() => {
    api
      .getInitialCards()
      .then((initialCards) => setCards(initialCards))
      .catch((error) => {
        console.log(error)
      })
  }, [ren])

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <div className="profile__avatar-edit" ></div>
          <img src={userAvatar} alt="Фотография пользователя." className="profile__avatar" />
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{userName} </h1>
          <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}  ></button>
      </section>

      <section className="elements" aria-label="Галлерея мест пользователя">
        {
          cards.map(card => {
            return (<Card key={card._id} card={card} onCardClick={props.onCardClick} />)
          })
        }
      </section>

    </main>
  );
};

export default Main;