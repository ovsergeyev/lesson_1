import React, {Fragment, useState} from 'react';
import ImagePopup from './ImagePopup';
import '../blocks/card/card.css';

function Card({ card, currentUser, onCardLike, onCardDelete }) {
  const [selectedCard, setSelectedCard] = React.useState(null);
  const cardStyle = { backgroundImage: `url(${card.link})` };

  function handleClick() {
    setSelectedCard(card);
  };

  function handleLikeClick() {
    onCardLike(card);
  };

  function handleDeleteClick() {
    onCardDelete(card);
  };

  function onCloseImage() {
    setSelectedCard(false);
  };

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${isLiked && 'card__like-button_is-active'}`;

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
  );

  return (
    <Fragment>
      <li className="places__item card">
        <div className="card__image" style={cardStyle} onClick={handleClick}>
        </div>
        <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
        <div className="card__description">
          <h2 className="card__title">
            {card.name}
          </h2>
          <div className="card__likes">
            <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
            <p className="card__like-count">{card.likes.length}</p>
          </div>
        </div>
      </li>

      <ImagePopup card={selectedCard} onClose={onCloseImage} />
    </Fragment>

  );
}

export default Card;
