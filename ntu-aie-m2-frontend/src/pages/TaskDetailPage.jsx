// src/pages/TaskDetailPage.jsx
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import styles from "./TaskDetailPage.module.css";

import { TaskContext } from "../contexts/TaskContext";

const PRIORITY_LABELS = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

const COMPLETION_LABELS = {
  false: "Incomplete",
  true: "Completed"
};

function TaskDetailPage() {
  const { id } = useParams();
  const { tasks } = useContext(TaskContext);
  const navigate = useNavigate();
  const { deleteTask } = useContext(TaskContext);

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Keep track when user is editing to render the right component
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    const deleteID = id;
    // const deleteID = Number(id);
    await deleteTask(deleteID);
    navigate("/tasks");
  };

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      setError(null);
      try {
        // const data = tasks.find((candidate) => candidate.id === Number(id));
        const data = tasks.find((candidate) => candidate.id === id);
        if (!data) {
          throw new Error(`Task not found`);
        }

        setTask(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id, tasks]); // re-fetch whenever the id in the URL changes

  const handleEditClick = () => setIsEditing(true);

  const handleDone = (updates) => {
    if (updates) {
      setTask((prev) => ({ ...prev, ...updates }));
    }
    setIsEditing(false);
  };

  // Conditional rendering
  if (!id) {
    return (
      <div className={styles.panel}>
        <p className={styles.empty}>Select a task to view details.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.panel}>
        <p className={styles.empty}>Loading task details...</p>
      </div>
    );
  }

  // if (loading || !task) {
  //   return (
  //     <div className={styles.panel}>
  //       <p className={styles.empty}>Loading task details...</p>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className={styles.panel}>
        <p className={styles.empty}>Error: {error}</p>
        <Link to="/tasks">Back to Tasks</Link>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className={styles.panel}>
  //       <p className={styles.empty}>Error: {error}</p>
  //     </div>
  //   );
  // }

  return (
    <div className={styles.panel}>
      <Link to="/tasks" className={styles.backLink}>
        ← Back to Tasks
      </Link>

      {task &&
        (isEditing ? (
          <TaskEditForm task={task} onDone={handleDone} />
        ) : (
          <TaskView
            task={task}
            onEditClick={handleEditClick}
            onDeleteClick={handleDelete}
          />
        ))}
    </div>
  );
}

function TaskView({ task, onEditClick, onDeleteClick }) {
  return (
    <>
      <div className={styles.panelHead}>
        <div>
          <h2 className={styles.title}>
            {" "}
            {task.id} : {task.title}
          </h2>
          {task.description && (
            <p className={styles.description}>{task.description}</p>
          )}
        </div>

        <button className={styles.editButton} onClick={onEditClick}>
          Edit
        </button>
      </div>

      <div className="task-detail__badges">
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

      <button className={styles.deleteButton} onClick={onDeleteClick}>
        Delete Task
      </button>
    </>
  );
}

function TaskEditForm({ task, onDone }) {
  const { updateTask } = useContext(TaskContext);

  const [editForm, setEditForm] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate,
    completed: task.completed,
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateTask(task.id, editForm);
      onDone(editForm);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className={styles.name}>Edit task</h2>

      <div className={styles.section}>
        <div className={styles.editField}>
          <label className={styles.sectionLabel} htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className={styles.input}
            value={editForm.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.editField}>
          <label className={styles.sectionLabel} htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="5"
            className={styles.input}
            value={editForm.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.editField}>
          <label className={styles.sectionLabel} htmlFor="priority">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            className={styles.input}
            value={editForm.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className={styles.editField}>
          <label className={styles.sectionLabel} htmlFor="dueDate">
            Due Date
          </label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            className={styles.input}
            value={editForm.dueDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.editField}>
          <label className={styles.sectionLabel} htmlFor="completed">
            Completion Status
          </label>
          <select
            id="completed"
            name="completed"
            className={styles.input}
            value={editForm.completed}
            onChange={handleChange}
          >
            <option value={false}>Incomplete</option>
            <option value={true}>Completed</option>
          </select>
        </div>
      </div>

      <div className={styles.editActions}>
        <button type="submit" className={styles.saveButton} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={() => onDone(null)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default TaskDetailPage;
