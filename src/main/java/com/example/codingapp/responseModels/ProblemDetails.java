package com.example.codingapp.responseModels;

import com.example.codingapp.models.enums.ProblemDifficulty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@Builder
@AllArgsConstructor
public class ProblemDetails {

    boolean starred;

    ProblemDifficulty difficulty;

    Integer bestScore;
}
