package com.example.codingapp.configuration;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class CorsFilter extends OncePerRequestFilter {

     @Override
     protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain filterChain) throws ServletException, IOException {
         HttpServletRequest request = (HttpServletRequest) req;
         HttpServletResponse response = (HttpServletResponse) res;
         response.setHeader("Access-Control-Allow-Origin",  request.getHeader("Origin"));
         response.setHeader("Access-Control-Allow-Credentials", "true");
         response.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
         response.setHeader("Access-Control-Max-Age", "3600");
         response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me, Authorization, type ");
         response.setHeader("Access-Control-Expose-Headers","Authorization");
         response.setStatus(HttpStatus.OK.value());
     }
 }
