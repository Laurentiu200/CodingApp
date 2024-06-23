package com.example.codingapp.responseModels;

import com.example.codingapp.models.Example;
import com.example.codingapp.models.ProblemTestCase;
import com.example.codingapp.models.enums.ProblemDifficulty;
import com.example.codingapp.responseModels.SolutionModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Data
@Builder
@AllArgsConstructor
public class ProblemModel {

    private String id;

    private String title;

    private String problemStatement;

    private String constraints;

    private Integer order;

    private String exampleCode;

    private List<Example> examples;

    private List<ProblemTestCase> testCases;

    private boolean starred;

    private ProblemDifficulty difficulty;

    private Integer bestScore;

    private List<SolutionModel> solutions;
}
