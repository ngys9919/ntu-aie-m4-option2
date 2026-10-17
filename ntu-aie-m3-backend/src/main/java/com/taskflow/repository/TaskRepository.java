package com.taskflow.repository;

import com.taskflow.entity.Task;
// import org.springframework.data.jpa.repository.JpaRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class TaskRepository {

    private List<Task> tasks = new ArrayList<>();

    // Preload data here now — moved out of the controller
    public TaskRepository() {
        tasks.add(new Task("Set up project repository",
                "Initialise a Git repo, add a .gitignore, and push the first commit.", "high", "2027-06-30", true));
        tasks.add(new Task("Design database schema", "Draft the ERD for the contacts and deals tables.", "high", "2026-02-03", true));
        tasks.add(new Task("Build login page",
                "Create a login form with email and password fields and basic validation.", "high", "2025-12-25", false));
        tasks.add(new Task("Write unit tests for reducer",
                "Cover ADD_TASK, DELETE_TASK, and SET_FILTER with at least two cases each.", "medium", "2025-11-30", false));
        tasks.add(new Task("Update README",
                "Add setup instructions, a screenshot, and a description of the tech stack.", "low", "2028-12-31", false));
        tasks.add(new Task("Deploy to Vercel", "Connect the GitHub repo to Vercel and configure environment variables.",
                "medium", "2028-01-01", false));
    }

    // Create
    public Task createTask(Task task) {
        tasks.add(task);
        return task;
    }

    // Get One
    public Task findTaskById(int index) {
        return tasks.get(index);
    }

    // Get All
    public List<Task> findAllTasks() {
        return tasks;
    }

    // Update (full replace of the customer's data)
    public Task updateTask(int index, Task task) {
        Task taskToUpdate = tasks.get(index);
        taskToUpdate.setTitle(task.getTitle());
        taskToUpdate.setDescription(task.getDescription());
        taskToUpdate.setPriority(task.getPriority());
        taskToUpdate.setDueDate(task.getDueDate());
        taskToUpdate.setCompleted(task.getCompleted());
        return taskToUpdate;
    }

    // Delete
    public void deleteTask(int index) {
        tasks.remove(index);
    }
}

