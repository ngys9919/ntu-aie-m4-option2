import {
  createContext,
  useReducer,
  useState,
  useEffect,
  useContext,
} from "react";

import { taskReducer, initialState } from "../reducers/taskReducer";

export const TaskContext = createContext();

import { API_BASE } from "../App";
// const TASKS_STORAGE_KEY = "tasks_local_override";

// const normalizeTasksArray = (json) =>
//   Array.isArray(json)
//     ? json
//     : Array.isArray(json?.tasks)
//       ? json.tasks
//       : [];

export function TaskProvider({ children }) {
  
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const { tasks, loading, error, submitting, filter } = state;
  const [searchTerm, setSearchTerm] = useState("");
  // const [statusFilter, setStatusFilter] = useState("all");

  // const filteredTasks = tasks
  //   .filter((c) => c.title.toLowerCase().includes(searchTerm.toLowerCase()))
  //   .filter((c) => statusFilter === "all" ? true : c.status === statusFilter);

  // Derived during render, never stored in state, so it can never drift out of
  // sync with `tasks` or `statusFilter`.
  // const filteredTasks =
  //   statusFilter === 'all' ? tasks : tasks.filter((t) => t.status === statusFilter);

  const filteredTasks =
    filter === 'all' ? tasks : tasks.filter((task) => task.completed === filter);
  
  useEffect(() => {

    console.log("Fetching tasks from mock data");

    const loadTasks = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const response = await fetch(`${API_BASE}/tasks`);
        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        const data = await response.json();
        dispatch({ type: "FETCH_SUCCESS", payload: data });
        // const localTasksResponse = await fetch(`${API_BASE}/tasks`);
        // if (localTasksResponse.ok) {
        //   const localTasks = await localTasksResponse.json();
        //   dispatch({
        //     type: "FETCH_SUCCESS",
        //     payload: localTasks,
        //   });
        //   return;
        // }

        // const tasksArray = normalizeTasksArray(initialState.mockTasks);
        // dispatch({ type: "FETCH_SUCCESS", payload: tasksArray });
      } catch (err) {
        dispatch({ type: "FETCH_ERROR", payload: err.message });
      }
    };

    loadTasks();
  }, []);

  // useEffect(() => {
  //   if (!user) {
  //     console.log("No user logged in, skipping tasks fetch.");
  //     return; // Don't fetch if not logged in
  //   }

  //   const loadTasks = async () => {
  //     dispatch({ type: "FETCH_START" });
  //     try {
  //       const response = await fetch(`${API_BASE}/tasks`);
  //       if (!response.ok) throw new Error(`Server error: ${response.status}`);
  //       const data = await response.json();
  //       dispatch({ type: "FETCH_SUCCESS", payload: data });
  //     } catch (err) {
  //       dispatch({ type: "FETCH_ERROR", payload: err.message });
  //     }
  //   };
  //   loadTasks();
  // }, [user]);

  // const addTask = async (taskData) => {
  //   dispatch({ type: "ADD_START" });
  //   try {
  //     // Max-id + 1 rather than length + 1, so ids stay unique after deletions.
  //     const nextId = tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;

  //     const createdTask = {
  //       ...taskData,
  //       id: nextId,
  //       title: taskData.title,
  //       description: taskData.description,
  //       status: taskData.status,
  //       priority: taskData.priority,
  //     };
  //     dispatch({ type: "ADD_TASK", payload: createdTask });
  //     localStorage.setItem(
  //       TASKS_STORAGE_KEY,
  //       JSON.stringify([...tasks, createdTask]),
  //     );
  //     return createdTask;
  //   } catch (err) {
  //     dispatch({ type: "ADD_ERROR" });
  //     alert(`Failed to add task: ${err.message}`);
  //   }
  // };

  const addTask = async (taskData) => {
    dispatch({ type: "ADD_START" });
    try {
      const response = await fetch(`${API_BASE}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const createdTask = await response.json();
      dispatch({ type: "ADD_TASK", payload: createdTask });
      return createdTask;
    } catch (err) {
      dispatch({ type: "ADD_ERROR" });
      alert(`Failed to add task: ${err.message}`);
    }
  };

  // const updateTask = async (taskId, updates) => {
  //   try {
  //     const existing = tasks.find((t) => t.id === taskId);
  //     if (!existing) throw new Error("Task not found");
  //     const updated = { ...existing, ...updates };
  //     dispatch({ type: "UPDATE_TASK", payload: updated });
  //     localStorage.setItem(
  //       TASKS_STORAGE_KEY,
  //       JSON.stringify(
  //         tasks.map((t) => (t.id === taskId ? updated : t)),
  //       ),
  //     );
  //   } catch (err) {
  //     alert(`Failed to update task: ${err.message}`);
  //   }
  // };

  const updateTask = async (taskId, updates) => {
    try {
      const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const updated = await response.json();
      dispatch({ type: "UPDATE_TASK", payload: updated });
    } catch (err) {
      alert(`Failed to update task: ${err.message}`);
    }
  };

  // const deleteTask = async (taskId) => {
  //   if (!window.confirm("Are you sure you want to delete this task?"))
  //     return;
  //   try {
  //     dispatch({ type: "DELETE_TASK", payload: taskId });
  //     localStorage.setItem(
  //       TASKS_STORAGE_KEY,
  //       JSON.stringify(tasks.filter((t) => t.id !== taskId)),
  //     );
  //   } catch (err) {
  //     alert(`Failed to delete task: ${err.message}`);
  //   }
  // };

  const deleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?"))
      return;
    try {
      const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      dispatch({ type: "DELETE_TASK", payload: taskId });
    } catch (err) {
      alert(`Failed to delete task: ${err.message}`);
    }
  };

  function setFilter(nextFilter) {
    dispatch({ type: 'SET_FILTER', payload: nextFilter });
  }
  
  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        loading,
        error,
        submitting,
        // searchTerm,
        // statusFilter,
        filter,
        addTask,
        updateTask,
        deleteTask,
        // setSearchTerm,
        // setStatusFilter,
        setFilter,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

// Small convenience hook so components don't import useContext + TaskContext everywhere.
// export function useTasks() {
//   const context = useContext(TaskContext);
//   if (context === null) {
//     throw new Error('useTasks must be used inside a TaskProvider');
//   }
//   return context;
// }
