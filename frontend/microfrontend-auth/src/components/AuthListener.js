import React, { useEffect } from "react";
import * as auth from "../utils/auth.js";

const AuthListener = () => {
  //Проверяем наличие и актуальность jwt токена
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          dispatchEvent(new CustomEvent('jwt-change', {
            detail: {
              email: res.data.email,
              isLoggedIn: true
            }
          }));
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          console.log(err);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    dispatchEvent(new CustomEvent('jwt-change', {
      detail: {
        email: null,
        isLoggedIn: false
      }
    }));
  };

  //Событие logout
  useEffect(() => {
    addEventListener('logout', handleLogout);
    return () => removeEventListener('logout', handleLogout);
  });

  return null;
}

export default AuthListener;