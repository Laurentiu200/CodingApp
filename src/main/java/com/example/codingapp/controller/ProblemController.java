package com.example.codingapp.controller;

import com.example.codingapp.configuration.JwtService;
import com.example.codingapp.models.Problem;
import com.example.codingapp.models.Solution;
import com.example.codingapp.responseModels.ProblemList;
import com.example.codingapp.models.ProblemDescription;
import com.example.codingapp.responseModels.ProblemDetails;
import com.example.codingapp.responseModels.ProblemModel;
import com.example.codingapp.service.ProblemService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/secure/problem")
@RequiredArgsConstructor
@CrossOrigin
public class ProblemController {

    @Autowired
    ProblemService problemService;

    @Autowired
    JwtService jwtService;

    @GetMapping("/getProblem/{id}")
    public ResponseEntity<ProblemModel> getProblem(@PathVariable String id){
        return problemService.getProblem(id);
    }

    @GetMapping("/getProblemAuthenticated/{id}")
    public ResponseEntity<ProblemModel> getProblemAuthenticated(@RequestHeader(name="Authorization") String token, @PathVariable String id){
        String email = jwtService.extractEmailFromToken(token.substring(7));
        return problemService.getProblemAuthenticated(email, id);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<ProblemList>> getAllProblems(){
        return problemService.getAllProblemsSorted();
    }

    @GetMapping("/getAllAuthenticated")
    public ResponseEntity<List<ProblemList>> getAllProblemsAuthenticated(@RequestHeader(name="Authorization") String token){
        String email = jwtService.extractEmailFromToken(token.substring(7));
        return problemService.getAllProblemsSortedAuthenticated(email);
    }

    @PostMapping("/saveProblemDescription")
    public void saveProblem(@RequestBody ProblemDescription problemDescription)
    {
        problemService.saveProblemDescription(problemDescription);
    }

    @PostMapping("/saveProblem")
    public void saveProblem(@RequestBody Problem problem)
    {
        problemService.saveProblem(problem);
    }

    @PostMapping("/starProblem/{problemId}")
    public ResponseEntity<ProblemModel> starProblem(@RequestHeader(name="Authorization") String token, @PathVariable String problemId)
    {
        String email = jwtService.extractEmailFromToken(token.substring(7));
        return problemService.starProblem(email, problemId);
    }

    @PostMapping("/removeStarProblem/{problemId}")
    public ResponseEntity<ProblemModel> unStarProblem(@RequestHeader(name="Authorization") String token, @PathVariable String problemId)
    {
        String email = jwtService.extractEmailFromToken(token.substring(7));
        return problemService.unStarProblem(email, problemId);
    }

    @GetMapping("/getProblemDetails/{problemId}")
    public ResponseEntity<ProblemDetails> getProblemDetails(@RequestHeader(name="Authorization") String token,@PathVariable String problemId)
    {
        String email = jwtService.extractEmailFromToken(token.substring(7));
        return problemService.getProblemDetails(problemId, email);
    }

    @PostMapping("/saveSolution")
    public ResponseEntity<ProblemModel> saveSolution(@RequestHeader(name="Authorization") String token, @RequestBody Solution solution)
    {
        String email = jwtService.extractEmailFromToken(token.substring(7));
        return problemService.saveSolution(email, solution);
    }
}
