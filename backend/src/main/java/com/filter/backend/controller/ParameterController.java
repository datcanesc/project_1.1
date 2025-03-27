package com.filter.backend.controller;

import com.filter.backend.service.ParameterService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/parameters")
public class ParameterController {

    private final ParameterService parameterService;

    public ParameterController(ParameterService parameterService) {
        this.parameterService = parameterService;
    }

    @GetMapping("/parameters1")
    public List<String> getParameter1Values() {
        return parameterService.getParameter1Values();
    }

    @GetMapping("/parameters2")
    public List<String> getParameter2Values(@RequestParam String parameter1) {
        return parameterService.getParameter2Values(parameter1);
    }

    @GetMapping("/parameters3")
    public List<String> getParameter3Values(@RequestParam String parameter1, @RequestParam String parameter2) {
        return parameterService.getParameter3Values(parameter1, parameter2);
    }
}