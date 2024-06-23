package com.example.codingapp.responseModels;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@Builder
@AllArgsConstructor
public class SolutionModel {

    private Integer id;

    private String solution;

    private String submissionDate;

    private Integer score;

}
