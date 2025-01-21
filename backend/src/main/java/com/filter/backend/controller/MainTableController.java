package com.filter.backend.controller;

import com.filter.backend.model.MainTable;
import com.filter.backend.service.MainTableService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/main-table")

public class MainTableController {

    @Autowired
    private MainTableService mainTableService;
    
    @GetMapping
    public ResponseEntity<List<MainTable>> getAllMainTable() {
        return ResponseEntity.ok(mainTableService.getAllMainTable());
    }
}
