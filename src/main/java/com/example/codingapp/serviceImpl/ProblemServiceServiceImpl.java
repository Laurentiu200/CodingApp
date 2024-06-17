package com.example.codingapp.serviceImpl;

import com.example.codingapp.models.Pesponses.ProblemList;
import com.example.codingapp.models.Problem;
import com.example.codingapp.models.Pesponses.ProblemDetails;
import com.example.codingapp.models.User;
import com.example.codingapp.repositories.ProblemRepository;
import com.example.codingapp.repositories.UserRepository;
import com.example.codingapp.service.ProblemService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProblemServiceServiceImpl implements ProblemService {

    @Autowired
    ProblemRepository problemRepository;

    @Autowired
    UserRepository userRepository;

    public ResponseEntity<ProblemDetails> getProblemDetails(String problemId, String email)
    {
        User user = userRepository.findById(email).orElse(null);
        if(user == null)
        {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        Problem problem = problemRepository.findById(problemId).orElse(null);
        if(problem == null)
        {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        ProblemDetails problemDetails = ProblemDetails
                .builder()
                .difficulty(problem.getDifficulty())
                .starred(user.getStarredProblems().contains(problemId))
                .build();

        return new ResponseEntity<>(problemDetails, HttpStatus.OK);
    }

    public ResponseEntity<List<ProblemList>> getAllProblemsSortedAuthenticated( String email)
    {
        List<ProblemList> problemsModelList = new ArrayList<>();
        List<Problem> problemList = problemRepository.findAll(Sort.by("order"));
        User user = userRepository.findById(email).orElse(null);
        if(user == null)
            return new ResponseEntity<>(problemsModelList,HttpStatus.NOT_FOUND);
        else {

            for(Problem problem : problemList)
            {
                if(user.getStarredProblems().contains(problem.getId()))
                {
                    problemsModelList.add(ProblemList.builder()
                                    .id(problem.getId())
                                    .title(problem.getTitle())
                                    .category(problem.getCategory())
                                    .order(problem.getOrder())
                                    .likes(problem.getLikes())
                                    .difficulty(problem.getDifficulty())
                                    .dislikes(problem.getDislikes())
                                    .starred(true)
                                    .build());
                }
                else {
                    problemsModelList.add(ProblemList.builder()
                            .id(problem.getId())
                            .title(problem.getTitle())
                            .category(problem.getCategory())
                            .order(problem.getOrder())
                            .likes(problem.getLikes())
                            .difficulty(problem.getDifficulty())
                            .dislikes(problem.getDislikes())
                            .starred(false)
                            .build());
                }
            }
        }
        return new ResponseEntity<>(problemsModelList, HttpStatus.OK);
    }

    public ResponseEntity<List<ProblemList>> getAllProblemsSorted()
    {

        List<ProblemList> problemsModelList = new ArrayList<>();
        List<Problem> problemList = problemRepository.findAll(Sort.by("order"));
        for(Problem problem : problemList)
        {
            problemsModelList.add(ProblemList.builder()
                    .id(problem.getId())
                    .title(problem.getTitle())
                    .category(problem.getCategory())
                    .order(problem.getOrder())
                    .likes(problem.getLikes())
                    .difficulty(problem.getDifficulty())
                    .dislikes(problem.getDislikes())
                    .starred(false)
                    .build());
        }
        return new ResponseEntity<>(problemsModelList, HttpStatus.OK);
    }

    public ResponseEntity<Problem> getProblem(String problemId)
    {
        Problem problem = problemRepository.findById(problemId).orElse(null);
        if(null == problem)
        {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(problem, HttpStatus.OK);
    }

    @Override
    public void saveProblem(Problem problem) {
        problemRepository.save(problem);
    }

    @Override
    public ResponseEntity starProblem(String email, String problemId) {
        User user = userRepository.findById(email).orElse(null);
        if(user != null)
        {
            if(!user.getStarredProblems().contains(problemId)) {
                user.addStaredProblem(problemId);
                userRepository.save(user);
            }
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity unStarProblem(String email, String problemId) {
        User user = userRepository.findById(email).orElse(null);
        if(user != null)
        {
            user.removeStarredProblem(problemId);
            userRepository.save(user);
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }
}
