package com.example.codingapp.responseModels;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@Builder
@AllArgsConstructor
public class ExerciseSolutionModel {
    private String lastSubmissionDate;
    private boolean correctSolution;
}
