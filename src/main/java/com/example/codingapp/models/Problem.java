package com.example.codingapp.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@Table(name = "PROBLEM")
@AllArgsConstructor
@NoArgsConstructor
public class Problem {

    @Id
    @Column(name = "ID")
    private String id;

    @Column(name = "TITLE")
    private String title;

    @Column(name = "CATEGORY")
    private String category;

    @Enumerated(EnumType.STRING)
    private ProblemDifficulty difficulty;

    @Column(name = "LIKES")
    private Integer likes = 0;

    @Column(name = "ORDERS")
    private Integer order;

    @Column(name = "DISLIKES")
    private Integer dislikes = 0;

}
