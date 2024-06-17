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
@Table(name = "Solutions")
@AllArgsConstructor
@NoArgsConstructor
public class Solutions {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "UserId")
    private String email;

    @Column(name = "ProblemId")
    private String problemId;

    @ElementCollection
    @Column
    private List<String> solutions;



}
