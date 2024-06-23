package com.example.codingapp.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@Table(name = "Examples")
@AllArgsConstructor
@NoArgsConstructor
public class Example {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "inputText")
    private String inputText;

    @Column(name = "outputText")
    private String outputText;

    @Column(name = "explanation")
    private String explanation;
}
