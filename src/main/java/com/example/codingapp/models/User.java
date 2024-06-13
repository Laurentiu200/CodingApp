package com.example.codingapp.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Date;
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

    @Column(name = "CRT_DT")
    Date crt_dt;

    @Column(name = "UPD_DT")
    Date upd_dt;

    @Column
    List<SolvedProblems> solvedProblems;


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
