package com.example.codingapp.models;

import com.example.codingapp.models.enums.ProblemDifficulty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@Table(name = "PROBLEM_DESCRIPTION")
@AllArgsConstructor
@NoArgsConstructor
public class ProblemDescription {

    @Id
    @Column(name = "ID")
    private String id;

    @Column(name = "TITLE")
    private String title;

    @Column(name = "CATEGORY")
    private String category;

    @Enumerated(EnumType.STRING)
    private ProblemDifficulty difficulty;

    @Column
    private String shortDescription;

    @Column(name = "ORDERS")
    private Integer order;

}
