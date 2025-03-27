package com.filter.backend.repository;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;
import java.util.Map;

@Repository
public class TrinoDAO {

    private final JdbcTemplate jdbcTemplate;

    public TrinoDAO(@Qualifier("trinoDataSource") DataSource trinoDataSource) {
        this.jdbcTemplate = new JdbcTemplate(trinoDataSource);
    }

    public List<Map<String, Object>> fetchData(String query) {
        return jdbcTemplate.queryForList(query);
    }

    public int executeUpdate(String query, Object[] params) {
        return jdbcTemplate.update(query, params);
    }
    

    public int executeInsert(String query, Object[] params) {
        return jdbcTemplate.update(query, params);
    }
    

    public int executeDelete(String query, Object[] params) {
        return jdbcTemplate.update(query, params);
    }
}
