package com.example.codingapp.service;

import com.example.codingapp.requestModels.AuthenticationRequest;
import com.example.codingapp.requestModels.RegisterRequest;
import com.example.codingapp.responseModels.AuthenticationResponse;
import org.springframework.http.ResponseEntity;

public interface AuthenticationService {

    ResponseEntity<AuthenticationResponse> register(RegisterRequest request);
    AuthenticationResponse authenticate(AuthenticationRequest request);
}
