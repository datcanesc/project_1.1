package com.filter.backend.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class TableNameList {

    private Long id;
    private String tableName;  // Change from item_id to itemId
}
