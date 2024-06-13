package com.example.codingapp.service;

import com.example.codingapp.requestModels.AuthenticationRequest;
import com.example.codingapp.requestModels.RegisterRequest;
import com.example.codingapp.responseModels.AuthenticationResponse;

public interface AuthenticationService {

    AuthenticationResponse register(RegisterRequest request);
    AuthenticationResponse authenticate(AuthenticationRequest request);
}
