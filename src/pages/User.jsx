import React from 'react';
import { useEffect } from 'react';
import Header from '../components/Header/Header';
import { getTasksForUser, deleteTaskApi } from '../API/TaskService';
import Items from '../components/Items/Items';

const User = () => {
  const [items, setItems] = React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState({});

  const deleteTask = deleteTaskApi(setItems);

  useEffect(() => {
    getTasksForUser(setItems, setSelectedValue);
  }, []);

  return (
    <>
    <Header isAdmin={false} />
		<Items isAdmin={false} items={items} deleteTask={deleteTask} selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
    </>
  );
};
export default User;
