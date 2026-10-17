import { useContext } from "react";
import { Link } from "react-router-dom";
import { TaskContext } from "../contexts/TaskContext";
import styles from "./TaskList.module.css";

const PRIORITY_LABELS = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

const COMPLETION_LABELS = {
  false: "Incomplete",
  true: "Completed"
};

function TaskList({ tasks, onSelect }) {
  const { filteredTasks, deleteTask } = useContext(TaskContext);
  //   const { title, description, status, priority } = task;

  if (filteredTasks.length === 0) {
    return <p className="empty-state">No tasks match this filter.</p>;
  }

  return (
    <ul className={styles.taskList}>
      <div className="page__header">
        <h1>Tasks</h1>
        <p className="page__count">
          Showing {filteredTasks.length} of {tasks.length} Tasks
        </p>
      </div>

      {filteredTasks.map((task) => (
        <li key={task.id} className={styles.taskRow}>
          <div className={styles.title}>{task.id}</div>
          <div className={styles.titleBlock}>
            <Link to={`/tasks/${task.id}`} className={styles.taskRowTitle}>
              {task.title}
            </Link>
          </div>

          <div className={styles.taskRowBadges}>
            {/* <span
              className={`${styles.badge} ${task.status === "done" ? styles.badgeActive : styles.badgeInactive}`}
            >
              {task.status}
            </span> */}

            <span
              className={`${styles.badge} ${styles[`badge--${task.completed}`]}`}
            >
              {COMPLETION_LABELS[task.completed]}
            </span>

            <span
              className={`${styles.badge} ${styles[`badge--${task.priority}`]}`}
            >
              {PRIORITY_LABELS[task.priority]}
            </span>
          </div>

          <button
            className={styles.selectButton}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(task.id);
            }}
          >
            Select
          </button>

          <button
            className={styles.deleteButton}
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(task.id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
