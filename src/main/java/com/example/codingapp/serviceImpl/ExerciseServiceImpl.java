package com.example.codingapp.serviceImpl;

import com.example.codingapp.models.Exercise;
import com.example.codingapp.models.ExerciseSolution;
import com.example.codingapp.models.User;
import com.example.codingapp.responseModels.ExerciseModel;
import com.example.codingapp.repositories.ExerciseRepository;
import com.example.codingapp.repositories.UserRepository;
import com.example.codingapp.responseModels.ExerciseSolutionModel;
import com.example.codingapp.service.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ExerciseServiceImpl implements ExerciseService {

    @Autowired
    ExerciseRepository exerciseRepository;

    @Autowired
    UserRepository userRepository;

    public ResponseEntity<List<Exercise>> getAllExercises()
    {
        List<Exercise> exercises = exerciseRepository.findAll(Sort.by("id"));
        return new ResponseEntity<>(exercises, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Exercise>> getAllExercisesAuthenticated(String email) {
        List<Exercise> exercises = exerciseRepository.findAll(Sort.by("id"));
        return new ResponseEntity<>(exercises, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ExerciseModel> getExerciseById(Integer id) {
        Exercise exercise = exerciseRepository.findById(id).orElse(null);
        if(exercise == null)
        {
            return new ResponseEntity<>(new ExerciseModel(), HttpStatus.NOT_FOUND);
        }
        ExerciseModel exerciseModel = ExerciseModel.builder()
                .difficulty(exercise.getDifficulty())
                .id(exercise.getId())
                .category(exercise.getCategory())
                .var1(exercise.getVar1())
                .var2(exercise.getVar2())
                .var3(exercise.getVar3())
                .var4(exercise.getVar4())
                .correctAnswer(exercise.getCorrectAnswer())
                .statement(exercise.getStatement())
                .build();
        return new ResponseEntity<>(exerciseModel, HttpStatus.OK);

    }


    public ResponseEntity<ExerciseModel> saveExerciseSolution(String email, ExerciseSolution exerciseSolution) {
        User user = userRepository.findById(email).orElse(null);
        if (user == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        user.addExerciseSolution(exerciseSolution);

        List<ExerciseSolutionModel> exerciseSolutions = new ArrayList<>();
        Exercise exercise = exerciseRepository.findById(exerciseSolution.getExerciseId()).orElse(null);
        if (exercise == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

        for(ExerciseSolution sol : user.getExerciseSolution())
        {
            if(sol.getExerciseId().equals(exerciseSolution.getExerciseId()))
            {
                exerciseSolutions.add(ExerciseSolutionModel.builder().correctSolution(sol.isValidAnswer()).lastSubmissionDate(sol.getDate().toString()).build());
            }
        }
        ExerciseModel exerciseModel = ExerciseModel.builder()
                .difficulty(exercise.getDifficulty())
                .id(exercise.getId())
                .category(exercise.getCategory())
                .var1(exercise.getVar1())
                .var2(exercise.getVar2())
                .var3(exercise.getVar3())
                .var4(exercise.getVar4())
                .correctAnswer(exercise.getCorrectAnswer())
                .statement(exercise.getStatement())
                .exerciseSolutions(exerciseSolutions)
                .build();

        return new ResponseEntity<>(exerciseModel, HttpStatus.NOT_FOUND);
    }
}
