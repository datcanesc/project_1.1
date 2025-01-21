package com.filter.backend.service;

import java.util.List;
import java.util.Map;

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

    public List<String> getParameter2Values(String parameter1) {
        String query = queryConfig.getParameter2();
        Map<String, String> placeholders = Map.of("PARAMETER1", parameter1);
        String finalQuery = queryBuilder.buildQuery(query, placeholders);
        return jdbcTemplate.queryForList(finalQuery, String.class);
    }

    public List<String> getParameter3Values(String parameter1, String parameter2) {
        String query = queryConfig.getParameter3();
        Map<String, String> placeholders = Map.of(
                "PARAMETER1", parameter1,
                "PARAMETER2", parameter2
        );
        String finalQuery = queryBuilder.buildQuery(query, placeholders);
        return jdbcTemplate.queryForList(finalQuery, String.class);
    }
}
