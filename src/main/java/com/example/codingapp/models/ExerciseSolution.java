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
@Table(name = "EXERCISE_SOLUTION")
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseSolution {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "exerciseId")
    private Integer exerciseId;

    @Column(name = "validAnswer")
    private boolean validAnswer;

    @Column(name = "submisionDate")
    private Date date = new Date(new java.util.Date().getTime());
}
