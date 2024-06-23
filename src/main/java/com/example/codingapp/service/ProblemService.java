package com.example.codingapp.service;

import com.example.codingapp.models.Problem;
import com.example.codingapp.models.Solution;
import com.example.codingapp.responseModels.ProblemList;
import com.example.codingapp.models.ProblemDescription;
import com.example.codingapp.responseModels.ProblemDetails;
import com.example.codingapp.responseModels.ProblemModel;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProblemService {

    ResponseEntity<ProblemDetails> getProblemDetails(String problemId, String email);
    ResponseEntity<List<ProblemList>> getAllProblemsSorted();
    ResponseEntity<ProblemModel> getProblem(String problemId);
    void saveProblemDescription(ProblemDescription problemDescription);
    void saveProblem(Problem problem);
    ResponseEntity<ProblemModel> starProblem(String email, String problemId);

    ResponseEntity<ProblemModel> unStarProblem(String email, String problemId);
    ResponseEntity<List<ProblemList>> getAllProblemsSortedAuthenticated(String email);
    ResponseEntity<ProblemModel> getProblemAuthenticated(String email, String problemId);
    ResponseEntity<ProblemModel> saveSolution(String email, Solution solution);

}
