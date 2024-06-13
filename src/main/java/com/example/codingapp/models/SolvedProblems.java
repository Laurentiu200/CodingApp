package com.example.codingapp.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Builder
@Table(name = "SOLVED_PROBLEM")
@AllArgsConstructor
@NoArgsConstructor
public class SolvedProblems {

    @Id
    @Column(name = "ID")
    String problemId;

    @Column
    List<String> problemSolutions;


}
