package com.filter.backend.controller;

import com.filter.backend.config.QueryConfig;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/queries")
public class QueryController {

    private final QueryConfig queryConfig;

    public QueryController(QueryConfig queryConfig) {
        this.queryConfig = queryConfig;
    }

    @GetMapping("/all")
    public Map<String, String> getAllQueries() {
        Map<String, String> queries = new LinkedHashMap<>();

        queries.put("sql_ozellik1", queryConfig.getSql_ozellik1());
        queries.put("sql_ozellik2", queryConfig.getSql_ozellik2());
        queries.put("sql_ozellik3", queryConfig.getSql_ozellik3());
        queries.put("sql_ozellik4", queryConfig.getSql_ozellik4());
        queries.put("sql_ozellik5", queryConfig.getSql_ozellik5());
        queries.put("sql_ozellik6", queryConfig.getSql_ozellik6());
        queries.put("sql_ozellik7", queryConfig.getSql_ozellik7());
        queries.put("sql_item2_liste", queryConfig.getSql_item2_liste());
        queries.put("sql1", queryConfig.getSql1());
        queries.put("sql2", queryConfig.getSql2());
        queries.put("sql3", queryConfig.getSql3());
        queries.put("sql4", queryConfig.getSql4());
        queries.put("sql5", queryConfig.getSql5());
        queries.put("sql6", queryConfig.getSql6());
        queries.put("item3_create_table_sql", queryConfig.getItem3_create_table_sql());
        queries.put("item3_insert_sql", queryConfig.getItem3_insert_sql());
        queries.put("parameter1", queryConfig.getParameter1());
        queries.put("parameter2", queryConfig.getParameter2());
        queries.put("parameter3", queryConfig.getParameter3());
        queries.put("drop_table_sql", queryConfig.getDrop_table_sql());
        queries.put("get_table", queryConfig.getGet_table());
        queries.put("findAllByOrderByIdDesc", queryConfig.getFindAllByOrderByIdDesc());
        queries.put("saveTableName", queryConfig.getSaveTableName());
        queries.put("deleteTableName", queryConfig.getDeleteTableName());

        return queries;
    }
}
