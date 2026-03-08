package com.edutech.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/hello")
    public String hello() {
        return "Hello! Backend is running :)";
    }

    @GetMapping("/")
    public String mainPage(){
        return "This is the main root endpoint";
    }
}