package com.taskflow.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@NoArgsConstructor
// @AllArgsConstructor
@JsonPropertyOrder({ "id", "title", "description", "priority", "dueDate", "completed" })
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String description;

    private String priority;

    private LocalDate dueDate;

    @Column(nullable = false)
    private Boolean completed = false;

    public Task(String title, String description, String priority, LocalDate dueDate, Boolean completed) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.completed = completed;
    }
}
