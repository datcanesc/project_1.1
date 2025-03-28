package com.filter.backend.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class TableNameList {

    private Long id;
    private String firstTableName;
    private String tableName;
}
