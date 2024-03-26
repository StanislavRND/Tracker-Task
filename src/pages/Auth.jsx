import React from 'react';
import imgLogo from '../img/img-01.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendingDataForm } from '../API/TaskService';

export const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  return (
    <section className="section__auth">
      <div className="authorization">
        <div className="authorization__body">
          <div className="authorization__img">
            <img src={imgLogo} alt="logo" />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendingDataForm(email, password, navigate);
            }}
            className="authorization__form"
            action=""
            method="post"
            id="form__id">
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
                  required
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
                  required
                />
              </div>
            </div>
            <button type="submit" className="form__button">
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
