package com.example.codingapp.controller;

import com.example.codingapp.requestModels.AuthenticationRequest;
import com.example.codingapp.requestModels.RegisterRequest;
import com.example.codingapp.responseModels.AuthenticationResponse;
import com.example.codingapp.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/secure")
@RequiredArgsConstructor
@CrossOrigin
public class AuthenticationController {

    @Autowired
    private final AuthenticationService authenticationService;


    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request)
    {
        return authenticationService.register(request);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request)
    {
        return new ResponseEntity<>(authenticationService.authenticate(request), HttpStatus.OK);
    }
}
