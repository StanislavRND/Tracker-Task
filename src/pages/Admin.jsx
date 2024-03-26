import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import ModalAddTask from './../components/UI/Modal/ModalAddTask';
import Items from '../components/Items/Items';

import { fetchTasksApi, deleteTaskApi, addTaskApi } from '../API/TaskService';

export const Admin = () => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [inputValues, setInputValues] = useState({
    title: '',
    description: '',
    priority: '',
    start_date: null,
    end_date: null,
  });
  const [items, setItems] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const fetchTasks = fetchTasksApi(setItems, setSelectedUser);
  const addTask = addTaskApi(setItems, setInputValues, setIsVisibleModal, items);
  const deleteTask = deleteTaskApi(setItems);

  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <>
      <Header
        isAdmin={true}
        isVisibleModal={isVisibleModal}
        setIsVisibleModal={setIsVisibleModal}
      />
      <main className="main">
        {isVisibleModal && (
          <ModalAddTask
            isVisibleModal={isVisibleModal}
            setIsVisibleModal={setIsVisibleModal}
            inputValues={inputValues}
            handleChange={handleChange}
            addTask={addTask}
          />
        )}
        <Items
          isAdmin={true}
          deleteTask={deleteTask}
          items={items}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </main>
    </>
  );
};
export default Admin;
