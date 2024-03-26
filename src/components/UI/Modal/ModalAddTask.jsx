import React from 'react';
import styles from './modal.module.css';
const ModalAddTask = (props) => {
  return (
    <div className={styles.modal__block}>
      <div className={styles.modal}>
        <div className={styles.block__button__close}>
          <div
            onClick={() => props.setIsVisibleModal(false)}
            className={styles.close__button}></div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.addTask(props.inputValues);
          }}
          className={styles.form}>
          <input
            value={props.inputValues.title}
            onChange={props.handleChange}
            type="text"
            placeholder="Название"
            name="title"
            maxLength="50"
            className={styles.input}
          />
          <textarea
            maxLength="200"
            value={props.inputValues.desc}
            onChange={props.handleChange}
            type="text"
            placeholder="Описание"
            className={styles.textarea}
            name="description"
          />
          <input
            type="date"
            name="start_date"
            value={props.inputValues.start_date}
            onChange={props.handleChange}
            className={styles.input}
          />
          <input
            type="date"
            name="end_date"
            value={props.inputValues.end_date}
            onChange={props.handleChange}
            className={styles.input}
          />
          <div className={styles.radio}>
            <div className={styles.block__radio}>
              <input
                onChange={props.handleChange}
                checked={props.inputValues.priority === 'low'}
                value="low"
                type="radio"
                name="priority"
                className={styles.radio__element}
              />
              <div>Низкий</div>
            </div>
            <div className={styles.block__radio}>
              <input
                onChange={props.handleChange}
                checked={props.inputValues.priority === 'medium'}
                value="medium"
                type="radio"
                name="priority"
                className={styles.radio__element}
              />
              <div>Средний</div>
            </div>
            <div className={styles.block__radio}>
              <input
                onChange={props.handleChange}
                checked={props.inputValues.priority === 'high'}
                value="high"
                type="radio"
                name="priority"
                className={styles.radio__element}
              />
              <div>Высокий</div>
            </div>
          </div>
          <button className={styles.button__add} type="submit">
            Создать
          </button>
        </form>
      </div>
    </div>
  );
};
export default ModalAddTask;
