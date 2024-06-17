package com.example.codingapp.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/problem")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class Controller {

    @CrossOrigin
    @GetMapping("/getData/{problemId}")
    public ResponseEntity<String> sayHello(@PathVariable String problemId, @RequestHeader(name="Authorization") String token)
    {
        return ResponseEntity.ok("Hello");
    }
}
