package com.filter.backend.service;

import com.filter.backend.model.TableNameList;
import com.filter.backend.repository.TableNameListRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TableNameListService {

    @Autowired
    private TableNameListRepository tableNameListRepository;

    // Tablo adını kaydetme metodu
    public TableNameList saveTableName(String tableName) {
        TableNameList tableNameList = new TableNameList();
        tableNameList.setTableName(tableName);
        return tableNameListRepository.save(tableNameList);
    }

    // ID'ye göre sıralı tablo adlarını getirme
    public List<TableNameList> getTablesSortedByIdDesc() {
        return tableNameListRepository.findAllByOrderByIdDesc();
    }

    public void deleteTableName(Long id) {
        tableNameListRepository.deleteById(id);
    }
}
