package com.example.codingapp.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@Table(name = "TEST_CASSES")
@AllArgsConstructor
@NoArgsConstructor
public class ProblemTestCase {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "inputData")
    private String inputData;

    @Column(name = "expectedOutputData")
    private String expectedOutputData;

    @Column(name = "points")
    private Integer points;
}
