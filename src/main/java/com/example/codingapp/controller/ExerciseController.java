package com.example.codingapp.controller;

import com.example.codingapp.configuration.JwtService;
import com.example.codingapp.models.Exercise;
import com.example.codingapp.models.ExerciseSolution;
import com.example.codingapp.responseModels.ExerciseModel;
import com.example.codingapp.service.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/secure/exercises")
@RequiredArgsConstructor
@CrossOrigin
public class ExerciseController {

    @Autowired
    private ExerciseService exerciseService;

    @Autowired
    JwtService jwtService;
    @GetMapping("/getAllExercises")
    public ResponseEntity<List<Exercise>> getProblemAuthenticated(){
        return exerciseService.getAllExercises();
    }

    @GetMapping("/getExercise/{id}")
    public ResponseEntity<ExerciseModel> getExerciseById(@PathVariable Integer id)
    {
        return exerciseService.getExerciseById(id);
    }

    @PostMapping("/saveExercise")
    public ResponseEntity<ExerciseModel> saveExercise(@RequestHeader(name="Authorization") String token, @RequestBody ExerciseSolution exercise)
    {
        String email = jwtService.extractEmailFromToken(token.substring(7));
        return exerciseService.saveExerciseSolution(email, exercise);
    }
}
