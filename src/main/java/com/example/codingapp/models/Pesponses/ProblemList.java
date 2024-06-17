package com.example.codingapp.models.Pesponses;

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

    private Integer likes = 0;

    private Integer order;

    private Integer dislikes = 0;
    private boolean starred = false;
}
