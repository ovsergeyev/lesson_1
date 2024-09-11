import React, {Fragment, useEffect, useState} from 'react';
import Card from './Card';
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/api";
import '../blocks/places/places.css';
import '../blocks/popup/popup.css';
import '../blocks/popup/_is-opened/popup_is-opened.css';

function Places() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  //Событие open-place-popup
  useEffect(() => {
    addEventListener('open-place-popup', handleOpenPlacePopup);
    return () => removeEventListener('open-place-popup', handleOpenPlacePopup);
  });

  const handleOpenPlacePopup = () => {
    setIsAddPlacePopupOpen(true);
  };

  // Запрос к API за информацией о карточках выполняется единожды, при монтировании.
  useEffect(() => {
    api
      .getAppInfo()
      .then(([cardData, userData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);

  const onCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };
  const onCardDelete = (card) => {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  };

  const handleAddPlaceSubmit = (newCard) => {
    api
    .addCard(newCard)
    .then((newCardFull) => {
      setCards([newCardFull, ...cards]);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  };

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
  };

  return (
    <Fragment>
      <section className="places page__section">
        <ul className="places__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              currentUser={currentUser}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onAddPlace={handleAddPlaceSubmit}
        onClose={closeAllPopups}
      />
    </Fragment>

  );
}

export default Places;
