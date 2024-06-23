package com.example.codingapp.repositories;

import com.example.codingapp.models.ProblemTestCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProblemTestCaseRepository extends JpaRepository<ProblemTestCase, Integer> {
}
