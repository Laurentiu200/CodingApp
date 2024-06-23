package com.example.codingapp.models;

import com.example.codingapp.models.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Data
@Builder
@Table(name = "USER")
@AllArgsConstructor
public class User implements UserDetails {

    @Id
    @Column(name = "EMAIL")
    private String email;

    @Column(name = "FNAME")
    private String firstName;

    @Column(name = "LNAME")
    private String lastName;

    @Getter
    @Column(name = "PASSWORD")
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(targetEntity = Solution.class, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "email", referencedColumnName = "EMAIL")
    List<Solution> solutions = new ArrayList<>();

    @OneToMany(targetEntity = ExerciseSolution.class, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "email", referencedColumnName = "EMAIL")
    List<ExerciseSolution> exerciseSolution = new ArrayList<>();

    @ElementCollection
    @Column
    List<String> starredProblems = new ArrayList<>();


    public void addSolution(Solution solution)
    {
        solutions.add(solution);
    }

    public void addExerciseSolution(ExerciseSolution solution)
    {
        exerciseSolution.add(solution);
    }

    public void addStaredProblem(String id)
    {
        starredProblems.add(id);
    }

    public void removeStarredProblem(String problemId)
    {
        starredProblems.remove(problemId);
    }


    public User() {
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
