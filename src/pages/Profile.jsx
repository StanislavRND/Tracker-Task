import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

export const Profile = () => {
  const [data, setData] = useState([]);
  const headers = { Authorization: `Bearer ${localStorage.getItem('access')}` };

  useEffect(() => {
    axios.post('http://79.137.194.19/jwt-auth/user-info/', { headers: headers }).then((res) => {
      setData(res.data);
      
    });
  }, []);
  console.log(localStorage.getItem('user'));
  return (
    <section className="profile">
      <div className="profile__container">
        <div>Профиль</div>
        <div>Фио</div>
        <div className="project">
          <div className="title">{data.id}</div>
          <p>Описание</p>
          <div>Пользователь</div>
          <div>Дата создания</div>
        </div>
      </div>
    </section>
  );
};
export default Profile;
