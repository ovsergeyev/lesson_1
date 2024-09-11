import React, {Fragment, useState} from 'react';
import * as auth from "../utils/auth.js";
import InfoTooltip from "./InfoTooltip.js";

import '../blocks/auth-form/auth-form.css';

function Register (){
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [tooltipStatus, setTooltipStatus] = useState("");

  const closePopup = () => {
    setIsInfoToolTipOpen(false);
    setTooltipStatus("");
  };

  function handleSubmit(e){
    e.preventDefault();
    auth
    .register(email, password)
    .then((res) => {
      setTooltipStatus("success");
      setIsInfoToolTipOpen(true);
      dispatchEvent(new CustomEvent('success-registration', {
        detail: {
          email,
          isLoggedIn: true
        }
      }));
    })
    .catch((err) => {
      setTooltipStatus("fail");
      setIsInfoToolTipOpen(true);
    });
  }
  return (
    <Fragment>
      <div className="auth-form">
        <form className="auth-form__form" onSubmit={handleSubmit}>
          <div className="auth-form__wrapper">
            <h3 className="auth-form__title">Регистрация</h3>
            <label className="auth-form__input">
              <input type="text" name="email" id="email"
                className="auth-form__textfield" placeholder="Email"
                onChange={e => setEmail(e.target.value)} required  />
            </label>
            <label className="auth-form__input">
              <input type="password" name="password" id="password"
                className="auth-form__textfield" placeholder="Пароль"
                onChange={e => setPassword(e.target.value)} required  />
            </label>
          </div>
          <div className="auth-form__wrapper">
            <button className="auth-form__button" type="submit">Зарегистрироваться</button>
            <p className="auth-form__text">Уже зарегистрированы? <a className="auth-form__link" href="/signin">Войти</a></p>
          </div>
        </form>
      </div>

      <InfoTooltip
        isOpen={isInfoToolTipOpen}
        onClose={closePopup}
        status={tooltipStatus}
      />
    </Fragment>
  )
}

export default Register;
