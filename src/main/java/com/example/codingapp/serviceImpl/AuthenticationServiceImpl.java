package com.example.codingapp.serviceImpl;

import com.example.codingapp.configuration.JwtService;
import com.example.codingapp.models.enums.Role;
import com.example.codingapp.models.User;
import com.example.codingapp.repositories.UserRepository;
import com.example.codingapp.requestModels.AuthenticationRequest;
import com.example.codingapp.requestModels.RegisterRequest;
import com.example.codingapp.responseModels.AuthenticationResponse;
import com.example.codingapp.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public ResponseEntity<AuthenticationResponse> register(RegisterRequest request) {
        if(request.getEmail() == null
                || request.getPassword() == null
                || request.getLastName() == null
                || request.getFirstName() == null )
        {
            return new ResponseEntity<>(AuthenticationResponse.builder()
                    .token("All fields must be filled!")
                    .build(),HttpStatus.BAD_REQUEST);
        }

        User searchedUser = userRepository.findById(request.getEmail()).orElse(null);
        if(searchedUser != null)
        {
            return new ResponseEntity<>(AuthenticationResponse.builder()
                    .token("Email already exists")
                    .build(),HttpStatus.BAD_REQUEST);
        }

        if(request.getPassword().length() < 10)
        {
            return new ResponseEntity<>(AuthenticationResponse.builder()
                    .token("Password must contain at least 10 characters")
                    .build(),HttpStatus.BAD_REQUEST);
        }

        User user = User.builder()
                .email(request.getEmail())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);
        String jwtToken = jwtService.generateNewToken(user);
        return new ResponseEntity<>(AuthenticationResponse.builder()
                .token(jwtToken)
                .build(), HttpStatus.OK);
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        User user = userRepository.findById(request.getEmail())
                .orElseThrow();
        String jwtToken = jwtService.generateNewToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
