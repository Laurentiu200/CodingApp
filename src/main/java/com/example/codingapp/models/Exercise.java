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
@Table(name = "EXERCISE")
@AllArgsConstructor
@NoArgsConstructor
public class Exercise {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "statement")
    private String statement;

    @Column(name = "var1")
    private String var1;

    @Column(name = "var2")
    private String var2;

    @Column(name = "var3")
    private String var3;

    @Column(name = "var4")
    private String var4;

    @Column(name = "correctAnswer")
    private String correctAnswer;

    @Enumerated(EnumType.STRING)
    private ProblemDifficulty difficulty;

    @Column(name = "category")
    private String category;

}
