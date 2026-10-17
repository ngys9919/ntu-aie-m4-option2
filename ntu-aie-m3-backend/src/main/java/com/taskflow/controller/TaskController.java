package com.taskflow.controller;

import com.taskflow.entity.Task;
import com.taskflow.service.TaskService;

// // import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    // Constructor injection for TaskService
    private final TaskService taskService;

    // public TaskController(TaskService taskService) {
    // this.taskService = taskService;
    // }

    private final String initialText = "This is a list of all tasks:";

    private final ChatClient chatClient;

    public TaskController(TaskService taskService, ChatClient.Builder chatClientBuilder) {
        this.taskService = taskService;
        this.chatClient = chatClientBuilder.build();
    }

    @GetMapping("/summary")
    public String summary() {
        List<Task> allTasks = taskService.findAllTasks();
        String message = initialText + "\n\n" + formatTasks(allTasks);
        return chatClient.prompt()
                .system("You are a friendly and professional Task Manager. " +
                        "Given a list of tasks, write a short plain-English summary of what is pending and what is done " +
                        "Keep your answers concise and practical. ")
                .user(message)
                .call()
                .content();
    }

    private String formatTasks(List<Task> tasks) {
        StringBuilder sb = new StringBuilder();
        for (Task task : tasks) {
            sb.append("- ").append(task.getTitle()).append(" [").append(task.getCompleted()).append("]").append("\n");
        }
        return sb.toString();
    }

    // READ (GET ALL)
    // Get all tasks
    @GetMapping("")
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> allTasks = taskService.findAllTasks();
        return new ResponseEntity<>(allTasks, HttpStatus.OK);
    }

    // READ (GET ONE)
    // Get one task by id
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTask(@PathVariable Long id) {
        try {
            Task foundTask = taskService.findTaskById(id);
            return new ResponseEntity<>(foundTask, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // CREATE
    // Create a new task
    @PostMapping("")
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        Task newTask = taskService.createTask(task);
        return new ResponseEntity<>(newTask, HttpStatus.CREATED);
    }

    // UPDATE
    // Update an existing task (by id)
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task task) {
        try {
            Task updatedTask = taskService.updateTask(id, task);
            return new ResponseEntity<>(updatedTask, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // DELETE
    // Delete a task (by id)
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteTask(@PathVariable Long id) {
        try {
            taskService.deleteTask(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // UPDATE
    // Mark a task as completed (by id)
    @PutMapping("/{id}/complete")
    public ResponseEntity<Task> markTaskAsComplete(@PathVariable Long id) {
        try {
            Task updatedTask = taskService.markTaskAsComplete(id);
            return new ResponseEntity<>(updatedTask, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
