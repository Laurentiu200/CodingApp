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
public class ProblemList {

    private String id;

    private String title;

    private String category;

    private ProblemDifficulty difficulty;

    private String shortDescription;

    private Integer order;

    private Integer score;

    private boolean starred = false;
}
