import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TaskContext } from "../contexts/TaskContext";
// import TaskCard from "../components/TaskCard";
import TaskList from "../components/TaskList";
import FilterBar from "../components/FilterBar";
import AddTaskForm from "../components/AddTaskForm";

function TaskListPage() {
  const {
    tasks,
    filteredTasks,
    loading,
    error,
    // searchTerm,
    // statusFilter,
    // setSearchTerm,
    // setStatusFilter,
    setFilter,
  } = useContext(TaskContext);

  // Derived states
  // whenever value can be computed from existing state, always use derive state
  const doneCount = tasks.filter((t) => t.completed === true).length;

  const navigate = useNavigate();

  if (loading) return null;
  if (error) return <p className="status-message error">Error: {error}</p>;

  return (
    <div>
      {/* <div className="filter-bar">
        {["all", "done", "in-progress", "todo"].map((f) => (
          <button
            key={f}
            className={`filter-btn${statusFilter === f ? " filter-btn-active" : ""}`}
            onClick={() => setStatusFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div> */}

      {/* <FilterBar searchTerm={searchTerm} onSearch={setSearchTerm} /> */}
      <FilterBar />

      <div className="task-list">
        <h2>
          Tasks ({filteredTasks.length} / {tasks.length}) - Total Done Tasks: {doneCount}
        </h2>
        {/* <h2>Tasks ({filteredTasks.length})</h2> */}
        {filteredTasks.length === 0 ? (
          <p className="empty-state">
            {/* {searchTerm ? "No tasks match your search." : "No tasks yet."} */}
            No tasks yet.
          </p>
        ) : (
          <div className="page">
            <TaskList
              tasks={filteredTasks}
              onSelect={(id) => navigate(`/tasks/${id}`)}
            />
          </div>
        )}
      </div>

      <AddTaskForm />
    </div>
  );
}

export default TaskListPage;
