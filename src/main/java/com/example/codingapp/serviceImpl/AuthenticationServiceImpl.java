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
    public AuthenticationResponse register(RegisterRequest request) {
        User user = User.builder()
                .email(request.getEmail())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);
        String jwtToken = jwtService.generateNewToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
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
