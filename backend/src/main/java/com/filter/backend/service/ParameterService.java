package com.filter.backend.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.filter.backend.config.QueryConfig;
import com.filter.backend.util.QueryBuilder;

@Service
public class ParameterService {

    private final QueryConfig queryConfig;
    private final QueryBuilder queryBuilder;
    private final JdbcTemplate jdbcTemplate;

    public ParameterService(QueryConfig queryConfig, QueryBuilder queryBuilder, JdbcTemplate jdbcTemplate) {
        this.queryConfig = queryConfig;
        this.queryBuilder = queryBuilder;
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<String> getParameter1Values() {
        String query = queryConfig.getParameter1();
        return jdbcTemplate.queryForList(query, String.class);
    }

public List<String> getParameter2Values(List<String> parameter1List) {
    String query = queryConfig.getParameter2();
    
    String paramListString = parameter1List.stream()
                            .map(param -> "'" + param + "'")
                            .collect(Collectors.joining(", "));
    
    Map<String, String> placeholders = Map.of("PARAMETER1", paramListString);
    
    String finalQuery = queryBuilder.buildQuery(query, placeholders);
    
    return jdbcTemplate.queryForList(finalQuery, String.class);
}


public List<String> getParameter3Values(List<String> parameter1List, List<String> parameter2List) {
    String query = queryConfig.getParameter3();

    // Listeleri SQL formatına dönüştürme
    String param1ListString = parameter1List.stream()
                                .map(param -> "'" + param + "'")
                                .collect(Collectors.joining(", "));
    
    String param2ListString = parameter2List.stream()
                                .map(param -> "'" + param + "'")
                                .collect(Collectors.joining(", "));

    Map<String, String> placeholders = Map.of(
            "PARAMETER1", param1ListString,
            "PARAMETER2", param2ListString
    );

    String finalQuery = queryBuilder.buildQuery(query, placeholders);
    
    return jdbcTemplate.queryForList(finalQuery, String.class);
}

}
