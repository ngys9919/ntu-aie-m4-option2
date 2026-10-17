import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import TaskListPage from "./pages/TaskListPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import "./App.css";
import Header from "./components/Header";

// export const API_BASE = "http://localhost:3001";
export const API_BASE = import.meta.env.VITE_API_BASE_URL;


function App() {
  return (
    <BrowserRouter>
      {/* Header for Every Routes */}
      <Header />
      {/* Routes Definition */}
      <main className="main">
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" replace />} />
        <Route path="/tasks" element={<TaskListPage />} />
        <Route path="/tasks/:id" element={<TaskDetailPage />} />
        <Route path="*" element={<Navigate to="/tasks" replace />} />
      </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
