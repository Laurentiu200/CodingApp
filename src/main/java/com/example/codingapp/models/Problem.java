package com.example.codingapp.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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

    @Column(name = "title")
    private String title;

    @Column(name = "problemStatement")
    private String problemStatement;

    @Column(name = "constraints")
    private String constraints;

    @Column(name = "orders")
    private Integer order;

    @Column(name = "exampleCode")
    private String exampleCode;

    @OneToMany(targetEntity = Example.class, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "examples", referencedColumnName = "id")
    private List<Example> examples;

    @OneToMany(targetEntity = ProblemTestCase.class, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "testCases", referencedColumnName = "id")
    private List<ProblemTestCase> testCases;


}
