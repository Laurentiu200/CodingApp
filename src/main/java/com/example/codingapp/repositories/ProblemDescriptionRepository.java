package com.example.codingapp.repositories;

import com.example.codingapp.models.ProblemDescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProblemDescriptionRepository extends JpaRepository<ProblemDescription, String> {

}
