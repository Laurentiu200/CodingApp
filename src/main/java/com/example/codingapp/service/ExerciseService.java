package com.example.codingapp.service;

import com.example.codingapp.models.Exercise;
import com.example.codingapp.models.ExerciseSolution;
import com.example.codingapp.responseModels.ExerciseModel;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ExerciseService {
    ResponseEntity<List<Exercise>> getAllExercises();

    ResponseEntity<List<Exercise>> getAllExercisesAuthenticated(String email);

    ResponseEntity<ExerciseModel> getExerciseById(Integer id);

    ResponseEntity<ExerciseModel> saveExerciseSolution(String email, ExerciseSolution exerciseSolution);
}
