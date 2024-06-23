package com.example.codingapp.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Data
@Builder
@Table(name = "Solutions")
@AllArgsConstructor
@NoArgsConstructor
public class Solution {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "ProblemId")
    private String problemId;

    @Column(name = "solution")
    private String solution;

    @Column(name = "score")
    private Integer score;

    @Column(name = "sumbisionDate")
    private Date date = new Date(new java.util.Date().getTime());
}
