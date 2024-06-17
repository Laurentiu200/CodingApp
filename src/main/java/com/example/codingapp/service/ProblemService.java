package com.example.codingapp.service;

import com.example.codingapp.models.Pesponses.ProblemList;
import com.example.codingapp.models.Problem;
import com.example.codingapp.models.Pesponses.ProblemDetails;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProblemService {

    ResponseEntity<ProblemDetails> getProblemDetails(String problemId, String email);
    ResponseEntity<List<ProblemList>> getAllProblemsSorted();
    ResponseEntity<Problem> getProblem(String problemId);
    void saveProblem(Problem problem);
    ResponseEntity starProblem(String email, String problemId);

    ResponseEntity unStarProblem(String email, String problemId);
    ResponseEntity<List<ProblemList>> getAllProblemsSortedAuthenticated(String email);
}
