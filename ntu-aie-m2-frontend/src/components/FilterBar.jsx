// import styles from "./FilterBar.module.css";

// function FilterBar({ searchTerm, onSearch }) {
//   return (
//     <div className={styles.filterBar}>
//       <input
//         type="text"
//         placeholder="Search by task title..."
//         value={searchTerm}
//         onChange={(e) => onSearch(e.target.value)}
//       />
//     </div>
//   );
// }

// export default FilterBar;

import { useContext } from "react";
import { TaskContext } from '../contexts/TaskContext';
import styles from "./FilterBar.module.css";

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: false, label: 'Incomplete' },
  { value: true, label: 'Completed' },
];

function FilterBar() {
  const { filter, setFilter } = useContext(TaskContext);

  return (
    <div className={styles['filter-bar']}>
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          className={
            value === filter ? `${styles['filter-bar__button']} ${styles['is-active']}` : styles['filter-bar__button']
          }
          onClick={() => setFilter(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
