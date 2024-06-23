package com.example.codingapp.responseModels;

import com.example.codingapp.models.ExerciseSolution;
import com.example.codingapp.models.enums.ProblemDifficulty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Data
@Builder
@AllArgsConstructor
public class ExerciseModel {

    private Integer id;
    private String statement;
    private String var1;
    private String var2;
    private String var3;
    private String var4;
    private String correctAnswer;
    private ProblemDifficulty difficulty;
    private String category;
    List<ExerciseSolutionModel> exerciseSolutions;
}
