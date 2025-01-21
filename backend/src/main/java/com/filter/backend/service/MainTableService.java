package com.filter.backend.service;

import com.filter.backend.model.MainTable;
import com.filter.backend.repository.MainTableRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MainTableService {
    @Autowired
    private MainTableRepository mainTableRepository;

    public List<MainTable> getAllMainTable() {
        return mainTableRepository.findAll();
    }
}
