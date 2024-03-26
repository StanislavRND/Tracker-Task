import React, { useState, useEffect } from 'react';
import styles from './items.module.css';
import Categories from '../Categories';
import Item from '../Item/Item';
import Skeleton from '../UI/Skeleton/Skeleton';
import { calculateDuration, priorityText, getDaysString } from '../../utils/utils';
import { fetchUsers } from '../../API/TaskService';

const Items = ({
  items,
  deleteTask,
  isAdmin,
  selectedValue,
  setSelectedValue,
  selectedUser,
  setSelectedUser,
}) => {
  const [categoryId, setCategoryId] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEmptyState, setShowEmptyState] = useState(false);

  const categories = ['Все', 'low', 'medium', 'high'];

  const itemsWithDuration = items.map((item) => {
    const duration = calculateDuration(item.start_date, item.end_date);
    const priorityInfo = priorityText(item.priority);
    return {
      ...item,
      duration,
      priorityText: priorityInfo.text,
      priorityColor: priorityInfo.color,
    };
  });

  const filteredItems = itemsWithDuration.filter((item) => {
    if (categories[categoryId] === 'Все') {
      return true;
    } else {
      return item.priority === categories[categoryId];
    }
  });

  useEffect(() => {
    if (isAdmin) {
      fetchUsers(setUsers);
    }
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEmptyState(true);
      setLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className={styles.items}>
      <div className={styles.container}>
        <Categories
          categories={categories}
          value={categoryId}
          onClickCategory={(i) => setCategoryId(i)}
        />
        {filteredItems.length >= 1 ? (
          <Item
            isAdmin={isAdmin}
            itemsWithDuration={itemsWithDuration}
            getDaysString={getDaysString}
            deleteTask={deleteTask}
            filteredItems={filteredItems}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            users={users}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        ) : loading && !showEmptyState ? (
          <Skeleton />
        ) : (
          <div className={styles.empty__state}>
            <div className={styles.text__empty}>Список задач пуст 😕</div>
            <div className={styles.text__add}>Создайте новую задачу!</div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Items;
