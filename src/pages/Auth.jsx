import React from 'react';
import imgLogo from '../img/img-01.png';
import axios from 'axios';
import { useState } from 'react';

export const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    const data = { email, password };
    axios
      .post('http://79.137.194.19/jwt-auth/get-token/', data)
      .then((response) => {
        localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);
        localStorage.setItem('user', response.status);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(typeof localStorage.getItem('user'));
  };
  return (
    <section className="section__auth">
      <div className="authorization">
        <div className="authorization__body">
          <div className="authorization__img">
            <img src={imgLogo} alt="logo" />
          </div>
          <form className="authorization__form" action="" method="post" id="form__id">
            <div className="form__title">Авторизация</div>
            <div className="form__input-block">
              <div className="form__input login__input">
                <input
                  type="text"
                  className="input login"
                  id="usernameInput"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form__input pass__input">
                <input
                  type="password"
                  className="input pass"
                  id="passwordInput"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button onClick={handleClick} type="button" className="form__button">
              Войти
            </button>
          </form>
        </div>
        <div className="information__block">Управляйте проектами и задачами своего коллектива</div>
      </div>
    </section>
  );
};

export default Auth;
