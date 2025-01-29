package com.filter.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.filter.backend.service.TableNameListService;
import com.filter.backend.model.TableNameList;

@RestController
@RequestMapping("/table-names")
public class TableNameListController {

    private final TableNameListService tableNameListService;

    public TableNameListController(TableNameListService tableNameListService) {
        this.tableNameListService = tableNameListService;
    }

    @GetMapping()
    public List<TableNameList> getSortedTables() {
        return tableNameListService.getTablesSortedByIdDesc();
    }

    @PostMapping("/saveTableName")
    public String saveTableName(
        @RequestParam String firstTableName,
        @RequestParam String tableName) {

            tableNameListService.saveTableName(firstTableName,tableName);
            return "Table saved successfully.";

    }

    @DeleteMapping
    public ResponseEntity<Void> deleteTableName(@RequestParam Long id) {
        tableNameListService.deleteTableName(id);
        return ResponseEntity.ok().build();
    }
}
