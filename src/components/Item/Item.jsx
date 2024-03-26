import React from 'react';
import styles from './Item.module.css';
import { handleChange, changeTaskState } from '../../API/TaskService';

const Item = ({
  filteredItems,
  getDaysString,
  deleteTask,
  users,
  isAdmin,
  selectedValue,
  setSelectedValue,
  selectedUser,
  setSelectedUser,
}) => {
  const handleStatusChange = (e, newStatus) => {
    const taskId = e.target.dataset.taskid;
    setSelectedValue(newStatus);
    changeTaskState(taskId, newStatus);
  };

  const handleUserChange = (e, userId) => {
    const taskId = e.target.dataset.taskid;
    let newSelectedUser = userId;
    if (userId === '-1') {
      newSelectedUser = '';
      handleChange(taskId, null);
    } else {
      handleChange(taskId, userId);
    }
    setSelectedUser((prevState) => ({
      ...prevState,
      [taskId]: newSelectedUser,
    }));
  };
  return (
    <>
      {filteredItems.map((item, index) => (
        <div key={item.id} className={styles.item}>
          <div className={styles.block}>
            <div className={styles.block__title__desc}>
              <span className={styles.item__title}>
                {item.id}. {item.title}
              </span>
              <p className={styles.description}>{item.description}</p>
              <div className={styles.block__down} style={{ marginTop: !isAdmin ? '10px' : '0px' }}>
                <div className={styles.time}>
                  <svg
                    width="22px"
                    height="22px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 8V12L15 15"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="12" cy="12" r="9" stroke="#000000" strokeWidth="2" />
                  </svg>
                  <span>{getDaysString(item.duration)}</span>
                </div>
                <div className={styles.priority}>
                  <div
                    className={styles.circle}
                    style={{ backgroundColor: item.priorityColor }}></div>
                  <div>{item.priorityText} приоритет</div>
                </div>
                {isAdmin && (
                  <select
                    data-taskid={item.id}
                    onChange={(e) =>
                      handleUserChange(e, e.target.value === '-1' ? null : e.target.value)
                    }
                    className={styles.custom__select__user}
                    value={selectedUser[item.id] ?? ''}>
                    <option value="" disabled selected>
                      Выберите преподавателя
                    </option>
                    {users.map((user, index) => (
                      <option value={user.id} key={index}>
                        {user.username}
                      </option>
                    ))}
                    <option value="-1">Удалить преподавателя</option>
                  </select>
                )}
              </div>
            </div>
            {isAdmin && (
              <button onClick={() => deleteTask(item.id)} className={styles.button}>
                Удалить
              </button>
            )}
            {!isAdmin && (
              <div>
                <select
                  className={styles.custom__select__state}
                  style={{ backgroundColor: '#274f7d' }}
                  data-taskid={item.id}
                  onChange={(e) => handleStatusChange(e, e.target.value)}
                  value={selectedValue[item.id]}>
                  <option value="planned">В ожидании</option>
                  <option value="process">В процессе</option>
                  <option value="done">Завершено</option>
                </select>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};
export default Item;
