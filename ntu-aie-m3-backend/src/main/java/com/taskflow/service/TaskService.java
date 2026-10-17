package com.taskflow.service;

import com.taskflow.entity.Task;
import com.taskflow.repository.TaskRepository;
// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> findAllTasks() {
        return taskRepository.findAllTasks();
    }

    public Task findTaskById(Long id) {
        return taskRepository.findTaskById(getTaskIndex(id));
    }

    public Task createTask(Task task) {
        return taskRepository.createTask(task);
    }

    public Task updateTask(Long id, Task task) {
        return taskRepository.updateTask(getTaskIndex(id), task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteTask(getTaskIndex(id));
    }

    public Task markTaskAsComplete(Long id) {
        Task task = taskRepository.findTaskById(getTaskIndex(id));
        task.setCompleted(true);
        return taskRepository.updateTask(getTaskIndex(id), task);
    }

    private int getTaskIndex(Long id) {
        List<Task> tasks = taskRepository.findAllTasks();
        for (int i = 0; i < tasks.size(); i++) {
            if (tasks.get(i).getId().equals(id)) {
                return i;
            }
        }
        throw new IllegalArgumentException("Task not found with id: " + id);
    }
}
