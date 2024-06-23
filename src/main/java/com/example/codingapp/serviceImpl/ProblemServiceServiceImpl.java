package com.example.codingapp.serviceImpl;

import com.example.codingapp.models.Problem;
import com.example.codingapp.models.Solution;
import com.example.codingapp.responseModels.ProblemList;
import com.example.codingapp.models.ProblemDescription;
import com.example.codingapp.responseModels.ProblemDetails;
import com.example.codingapp.models.User;
import com.example.codingapp.responseModels.ProblemModel;
import com.example.codingapp.responseModels.SolutionModel;
import com.example.codingapp.repositories.ProblemDescriptionRepository;
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
    ProblemDescriptionRepository problemDescriptionRepository;

    @Autowired
    UserRepository userRepository;

    public ResponseEntity<ProblemDetails> getProblemDetails(String problemId, String email) {
        User user = userRepository.findById(email).orElse(null);
        if (user == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        ProblemDescription problemDescription = problemDescriptionRepository.findById(problemId).orElse(null);
        if (problemDescription == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        ProblemDetails problemDetails = ProblemDetails
                .builder()
                .difficulty(problemDescription.getDifficulty())
                .starred(user.getStarredProblems().contains(problemId))
                .build();

        return new ResponseEntity<>(problemDetails, HttpStatus.OK);
    }

    public ResponseEntity<List<ProblemList>> getAllProblemsSortedAuthenticated(String email) {
        List<ProblemList> problemsModelList = new ArrayList<>();
        List<ProblemDescription> problemDescriptionList = problemDescriptionRepository.findAll(Sort.by("order"));
        User user = userRepository.findById(email).orElse(null);
        if (user == null)
            return new ResponseEntity<>(problemsModelList, HttpStatus.NOT_FOUND);
        else {

            for (ProblemDescription problemDescription : problemDescriptionList) {
                List<Solution> solutions = user.getSolutions();
                List<SolutionModel> solutionModels = new ArrayList<>();
                int bestScore = -1;
                if (solutions != null) {
                    for (Solution sol : solutions) {
                        if (sol.getProblemId().equals(problemDescription.getId())) {
                            if (sol.getScore() > bestScore)
                                bestScore = sol.getScore();
                            SolutionModel solution = SolutionModel.builder()
                                    .id(sol.getId())
                                    .solution(sol.getSolution())
                                    .submissionDate(sol.getDate().toString())
                                    .score(sol.getScore())
                                    .build();
                            solutionModels.add(solution);
                        }
                    }
                }

                if (user.getStarredProblems().contains(problemDescription.getId())) {
                    problemsModelList.add(ProblemList.builder()
                            .id(problemDescription.getId())
                            .title(problemDescription.getTitle())
                            .category(problemDescription.getCategory())
                            .order(problemDescription.getOrder())
                            .difficulty(problemDescription.getDifficulty())
                            .shortDescription(problemDescription.getShortDescription())
                            .score(bestScore)
                            .starred(true)
                            .build());
                } else {
                    problemsModelList.add(ProblemList.builder()
                            .id(problemDescription.getId())
                            .title(problemDescription.getTitle())
                            .category(problemDescription.getCategory())
                            .order(problemDescription.getOrder())
                            .difficulty(problemDescription.getDifficulty())
                            .shortDescription(problemDescription.getShortDescription())
                            .score(bestScore)
                            .starred(false)
                            .build());
                }
            }
        }
        return new ResponseEntity<>(problemsModelList, HttpStatus.OK);
    }

    public ResponseEntity<List<ProblemList>> getAllProblemsSorted() {

        List<ProblemList> problemsModelList = new ArrayList<>();
        List<ProblemDescription> problemDescriptionList = problemDescriptionRepository.findAll(Sort.by("order"));
        for (ProblemDescription problemDescription : problemDescriptionList) {
            problemsModelList.add(ProblemList.builder()
                    .id(problemDescription.getId())
                    .title(problemDescription.getTitle())
                    .category(problemDescription.getCategory())
                    .shortDescription(problemDescription.getShortDescription())
                    .order(problemDescription.getOrder())
                    .difficulty(problemDescription.getDifficulty())
                    .starred(false)
                    .score(-1)
                    .build());
        }
        return new ResponseEntity<>(problemsModelList, HttpStatus.OK);
    }

    public ResponseEntity<ProblemModel> getProblem(String problemId) {
        ProblemDescription problemDescription = problemDescriptionRepository.findById(problemId).orElse(null);
        Problem problem = problemRepository.findById(problemId).orElse(null);
        if (null == problem || problemDescription == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        ProblemModel problemModel = ProblemModel.builder()
                .problemStatement(problem.getProblemStatement())
                .bestScore(-1)
                .examples(problem.getExamples())
                .constraints(problem.getConstraints())
                .title(problem.getTitle())
                .testCases(problem.getTestCases())
                .id(problem.getId())
                .order(problem.getOrder())
                .starred(false)
                .solutions(new ArrayList<>())
                .difficulty(problemDescription.getDifficulty())
                .exampleCode(problem.getExampleCode())
                .build();
        return new ResponseEntity<>(problemModel, HttpStatus.OK);
    }

    public ResponseEntity<ProblemModel> getProblemAuthenticated(String email, String problemId)
    {
        User user = userRepository.findById(email).orElse(null);
        ProblemDescription problemDescription = problemDescriptionRepository.findById(problemId).orElse(null);
        Problem problem = problemRepository.findById(problemId).orElse(null);

        if (null == problem || problemDescription == null || user == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        List<Solution> solutions = user.getSolutions();
        List<SolutionModel> solutionModels = new ArrayList<>();

        int bestScore = -1;
        if (solutions != null) {
            for (Solution sol : solutions) {
                if (sol.getProblemId().equals(problemId)) {
                    if (sol.getScore() > bestScore)
                        bestScore = sol.getScore();
                    SolutionModel solution = SolutionModel.builder()
                            .id(sol.getId())
                            .solution(sol.getSolution())
                            .submissionDate(sol.getDate().toString())
                            .score(sol.getScore())
                            .build();
                    solutionModels.add(solution);
                }
            }
        }


        ProblemModel problemModel = ProblemModel.builder()
                .problemStatement(problem.getProblemStatement())
                .bestScore(bestScore)
                .examples(problem.getExamples())
                .constraints(problem.getConstraints())
                .title(problem.getTitle())
                .testCases(problem.getTestCases())
                .id(problem.getId())
                .order(problem.getOrder())
                .starred(user.getStarredProblems().contains(problemId))
                .solutions(solutionModels)
                .difficulty(problemDescription.getDifficulty())
                .exampleCode(problem.getExampleCode())
                .build();
        return new ResponseEntity<>(problemModel, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ProblemModel> saveSolution(String email, Solution solution) {
        User user = userRepository.findById(email).orElse(null);
        if (user == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        user.addSolution(solution);
        userRepository.save(user);
        return getProblemAuthenticated(email, solution.getProblemId());
    }


    @Override
    public void saveProblemDescription(ProblemDescription problemDescription) {
        problemDescriptionRepository.save(problemDescription);
    }

    @Override
    public void saveProblem(Problem problem) {
        problemRepository.save(problem);
    }

    @Override
    public ResponseEntity<ProblemModel> starProblem(String email, String problemId) {
        User user = userRepository.findById(email).orElse(null);
        if (user != null) {
            if (!user.getStarredProblems().contains(problemId)) {
                user.addStaredProblem(problemId);
                userRepository.save(user);
            }
            return getProblemAuthenticated(email, problemId);
        }
        return getProblem(problemId);
    }

    @Override
    public ResponseEntity<ProblemModel> unStarProblem(String email, String problemId) {
        User user = userRepository.findById(email).orElse(null);
        if (user != null) {
            user.removeStarredProblem(problemId);
            userRepository.save(user);
            return getProblemAuthenticated(email, problemId);
        }
        return getProblem(problemId);
    }
}
