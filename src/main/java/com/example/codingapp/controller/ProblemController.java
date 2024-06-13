package com.example.codingapp.controller;

import com.example.codingapp.models.Problem;
import com.example.codingapp.models.ProblemDifficulty;
import com.example.codingapp.repositories.ProblemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/secure/problem")
@RequiredArgsConstructor
@CrossOrigin
public class ProblemController {

    @Autowired
    ProblemRepository problemRepository;

    @GetMapping("/getProblem/{id}")
    public Problem getProblems(@PathVariable String id){
        return problemRepository.findById(id).orElse(new Problem());
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Problem>> getAllProblems(){
        return new ResponseEntity<>(problemRepository.findAll(Sort.by("order")), HttpStatus.OK);
    }

    @PostMapping("/saveProblem")
    public void saveProblem(@RequestBody Problem problem)
    {
        problemRepository.save(problem);
    }


}
