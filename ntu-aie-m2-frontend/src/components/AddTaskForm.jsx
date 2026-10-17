import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TaskContext } from "../contexts/TaskContext";

const ALL_PRIORITY_TAGS = ["Low", "Medium", "High"];
const ALL_COMPLETION_STATUSES = ["Incomplete", "Completed"];

const EMPTY_FORM = {
  title: '',
  description: '',
  priority: 'medium',
  dueDate: '',
  completed: false,
  
};

function AddTaskForm() {
  const { addTask, submitting } = useContext(TaskContext);
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY_FORM);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTagToggle = (tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = await addTask({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      priority: form.priority,
      dueDate: form.dueDate,
      completed: form.completed,
    });

    // Clear only on success.
    setForm(EMPTY_FORM);
  
  };

  return (
    <div>
      
      <h1>Add New Task</h1>

      <form onSubmit={handleSubmit} className="add-task-form">
        <div className="form-field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="e.g. Feature X"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="e.g. Implement feature X using Y technology"
            rows="5"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div className="form-field">
          <label>Status Tags</label>
          <div className="tag-options">
            {ALL_STATUS_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagToggle(tag)}
                className={`tag-toggle${form.tags.includes(tag) ? " tag-toggle-active" : ""}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div> */}
        
        <div className="form-field">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="dueDate">Due Date</label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="completed">Completion Status</label>
          <select
            id="completed"
            name="completed"
            value={form.completed}
            onChange={handleChange}
          >
            <option value={false}>Incomplete</option>
            <option value={true}>Completed</option>
          </select>
        </div>
        
        <button type="submit" className="submit-button" disabled={submitting}>
          {submitting ? "Adding..." : "Add Task"}
        </button>
      </form>
    </div>
  );
}

export default AddTaskForm;
