import React from 'react';

const Categories = ({ value, onClickCategory }) => {
  const categories = ['Все', 'Низкий приоритет', 'Средний приоритет', 'Высокий приоритет'];

  return (
    <div className="categories">
      <ul>
        {categories.map((el, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={value === index ? 'active' : 0}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Categories;
