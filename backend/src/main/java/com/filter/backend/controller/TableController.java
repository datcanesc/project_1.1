package com.filter.backend.controller;

import com.filter.backend.service.TableCreationService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Controller ornegi: item1 ve item2 icin ayri endpoint'ler,
 * ardindan ozellik sorgularini uygulamak icin ayri endpoint.
 */
@RestController
@RequestMapping("/table")
public class TableController {

    private final TableCreationService tableCreationService;

    public TableController(TableCreationService tableCreationService) {
        this.tableCreationService = tableCreationService;
    }

    // ---------------------------------------------------------
    // 1) ITEM1 İcin tablo olusturma
    // ---------------------------------------------------------
    @PostMapping("/createItem1")
    public String createTableForItem1(
            @RequestParam String liste_item,
            @RequestParam String tempTableName,
            @RequestParam String selectedValue,
            @RequestParam(required = false) String startDateValue,
            @RequestParam(required = false) String endDateValue) {

        // item1'e uygun parametreler (liste_item + tarih)
        String createdTable = tableCreationService.createInitialTempTableForItem1(
                liste_item,
                tempTableName,
                selectedValue,
                startDateValue,
                endDateValue);
        return createdTable;
    }

    // ---------------------------------------------------------
    // 2) ITEM2 İcin tablo olusturma
    // ---------------------------------------------------------
    @PostMapping("/createItem2")
    public String createTableForItem2(
            @RequestParam String tempTableName,
            @RequestParam String selectedIds) {

        // item2, liste_item veya tarihlere ihtiyac duymuyor
        String createdTable = tableCreationService.createInitialTempTableForItem2(
                tempTableName,
                selectedIds);
        return createdTable;
    }

    // ---------------------------------------------------------
    // 3) ITEM3 İcin tablo olusturma
    // ---------------------------------------------------------
    @PostMapping("/createItem3")
    public String createTableForItem3(
            @RequestParam String tempTableName,
            @RequestBody List<Integer> ids) {

        tableCreationService.createItem3Table(tempTableName);
        tableCreationService.insertIdsIntoItem3Table(tempTableName, ids);

        return tempTableName;
    }

    // ---------------------------------------------------------
    // 4) ITEM4 İcin tablo olusturma
    // ---------------------------------------------------------
    @PostMapping("/createItem4")
    public String createTableForItem4(
            @RequestParam String tempTableName,
            @RequestParam List<String>  parameter1,
            @RequestParam List<String>  parameter2,
            @RequestParam List<String>  parameter3,
            @RequestParam String liste_item,
            @RequestParam String selectedValue,
            @RequestParam(required = false) String startDateValue,
            @RequestParam(required = false) String endDateValue) {

        // TableCreationService'i çağır
        tableCreationService.createItem4Table(
                tempTableName, parameter1, parameter2, parameter3, liste_item, selectedValue, startDateValue,
                endDateValue);

        return tempTableName;
    }

    // ---------------------------------------------------------
    // Ozellik Sorgularini Uygulama
    // ---------------------------------------------------------
    @PostMapping("/applyOzellik")
    public String applyOzellikQueries(
            @RequestParam String initialTable,
            @RequestBody List<String> ozellikKeys) {

        // Ardisik ozellik sorgulari
        String lastTable = tableCreationService.applyOzellikQueriesSequentially(ozellikKeys, initialTable);
        return lastTable;
    }

    // ---------------------------------------------------------
    // (Opsiyonel) Tum olusturulan tablolari silme endpoint'i
    // ---------------------------------------------------------
    @DeleteMapping("/dropTable")
    public ResponseEntity<String> dropTable(@RequestParam String tableName) {
        try {
            tableCreationService.dropTableSafely(tableName);
            return ResponseEntity.ok("Table dropped successfully: " + tableName);
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body("Error while dropping table: " + tableName + " => " + e.getMessage());
        }
    }

    @DeleteMapping("/cleanupAll")
    public String cleanupAllCreatedTables() {
        tableCreationService.dropAllCreatedTables();
        return "All created tables dropped.";
    }

    @GetMapping("/getTableContents")
    public List<Map<String, Object>> getTableContents(@RequestParam String tableName) {
        return tableCreationService.getTableContents(tableName);
    }

}
