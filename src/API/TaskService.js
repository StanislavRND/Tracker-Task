import axios from 'axios';

const axiosInstanсe = axios.create({
  baseURL: 'http://new-team.space',
});

axiosInstanсe.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Получаем все задачи
export const fetchTasksApi = (setItems, setSelectedUser) => async () => {
  try {
    const response = await axiosInstanсe.get('/api/tasks/');
    console.log(response.data);
    const tasks = [...response.data].reverse();
    setItems(tasks);
    const userSelected = response.data.reduce((acc, task) => {
      acc[task.id] = task.user;
      return acc;
    }, {});
    console.log(userSelected);
    setSelectedUser(userSelected);
  } catch (error) {
    console.log('Ошибка: ', error);
  }
};

// Удаление задачи
export const deleteTaskApi = (setItems) => async (id) => {
  try {
    await axiosInstanсe.delete(`/api/tasks/${id}`);
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  } catch (error) {
    console.log('Ошибка: ', error);
  }
};

// Добавление задачи
export const addTaskApi = (setItems, setInputValues, setIsVisibleModal, items) => async (task) => {
  try {
    const response = await axiosInstanсe.post('/api/tasks/', task);
    setItems([response.data, ...items]);
    setInputValues({
      title: '',
      description: '',
      priority: '',
    });
    setIsVisibleModal(false);
  } catch (error) {
    console.log('Ошибка:', error);
  }
};

// Получение всех users
export const fetchUsers = (setUsers) => {
  try {
    axiosInstanсe.get('/jwt-auth/users/').then((response) => {
      setUsers(response.data);
    });
  } catch (error) {
    console.log('Ошибка', error);
  }
};

// Добавления пользователя на задачу
export const handleChange = (taskId, userId) => {
  try {
    axiosInstanсe.patch(`/api/tasks/${taskId}/`, { user: userId });
    fetchTasksApi();
  } catch (error) {
    console.log('Ошибка', error);
  }
};

// Отправка данных с формы авторизации
export const sendingDataForm = (email, password, navigate) => {
  const data = { email, password };
  axiosInstanсe
    .post('/jwt-auth/get-token/', data)
    .then((response) => {
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);

      getUserInfo(navigate);
    })
    .catch((error) => {
      console.error(error.message);
    });
};

// Получение информации о пользователе
export const getUserInfo = (navigate) => {
  axiosInstanсe
    .get('/jwt-auth/user-info/')
    .then((res) => {
      let isAdmin = res.data.is_staff;
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    })
    .catch((error) => {
      console.error(error.message);
    });
};
// Получение задач конкретного пользователя
export const getTasksForUser = async (setItems, setSelectedValue) => {
  try {
    const response = await axiosInstanсe.get('/api/tasks/my/');

    const reverseTasks = response.data.reverse();
    setItems(reverseTasks);

    const taskStatus = response.data.reduce((acc, task) => {
      acc[task.id] = task.status;
      return acc;
    }, {});
    setSelectedValue(taskStatus);
  } catch (error) {
    console.log('Ошибка: ', error);
  }
};

// Изменение статуса задачи
export const changeTaskState = (taskId, newStatus) => {
  try {
    axiosInstanсe.patch(`/api/tasks/${taskId}/`, { status: newStatus });
  } catch (error) {
    console.log('Ошибка', error);
  }
};
