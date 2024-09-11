import React, { Fragment, useState } from 'react';
import * as auth from "../utils/auth.js";
import InfoTooltip from "./InfoTooltip.js";

import '../blocks/auth-form/auth-form.css';

function Login (){
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [tooltipStatus, setTooltipStatus] = useState("");

  function handleSubmit(e){
    e.preventDefault();

    auth
    .login(email, password)
    .then((res) => {
      setTooltipStatus("success");
      setIsInfoToolTipOpen(true);
      dispatchEvent(new CustomEvent('jwt-change', {
        detail: {
          email,
          isLoggedIn: true
        }
      }));
    }).catch(()=>{
      setTooltipStatus("fail");
      setIsInfoToolTipOpen(true);
    });
  };

  const closePopup = () => {
    setIsInfoToolTipOpen(false);
    setTooltipStatus("");
  };

  return (
    <Fragment>
      <div className="auth-form">
        <form className="auth-form__form" onSubmit={handleSubmit}>
          <div className="auth-form__wrapper">
            <h3 className="auth-form__title">Вход</h3>
            <label className="auth-form__input">
              <input type="text" name="name" id="email"
                className="auth-form__textfield" placeholder="Email"
                onChange={e => setEmail(e.target.value)} required  />
            </label>
            <label className="auth-form__input">
              <input type="password" name="password" id="password"
                className="auth-form__textfield" placeholder="Пароль"
                onChange={e => setPassword(e.target.value)} required  />
            </label>
          </div>
          <button className="auth-form__button" type="submit">Войти</button>
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

export default Login;
