import React, {useState, useEffect, Fragment} from 'react';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import '../blocks/profile/profile.css';
import '../blocks/popup/popup.css';
import '../blocks/popup/_is-opened/popup_is-opened.css';
import api from "../utils/api";

function Profile() {

  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  // Запрос к API за информацией о пользователе выполняется единожды, при монтировании.
  useEffect(() => {
    api
      .getAppInfo()
      .then(([userData]) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
  }, []);

  const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };

  const onEditProfile = () => {
    setIsEditProfilePopupOpen(true);
  };

  const onEditAvatar = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleUpdateUser = (userUpdate) => {
    api
    .setUserInfo(userUpdate)
    .then((newUserData) => {
      setCurrentUser(newUserData);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (avatarUpdate) => {
    api
    .setUserAvatar(avatarUpdate)
    .then((newUserData) => {
      setCurrentUser(newUserData);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  };

  const openPlacePopup = () => {
    dispatchEvent(new CustomEvent('open-place-popup'));
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    // setIsAddPlacePopupOpen(false);
  }

  return (
    <Fragment>
      <main className="content">
        <section className="profile page__section">
          <div className="profile__image" onClick={onEditAvatar} style={imageStyle}></div>
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
            <p className="profile__description">{currentUser.about}</p>
          </div>
          <button className="profile__add-button" type="button" onClick={openPlacePopup}></button>
        </section>
      </main>

      <EditProfilePopup
        currentUser={currentUser}
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
        onClose={closeAllPopups}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onUpdateAvatar={handleUpdateAvatar}
        onClose={closeAllPopups}
      />

    </Fragment>
  );
}

export default Profile;
