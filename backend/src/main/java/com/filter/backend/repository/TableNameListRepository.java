package com.filter.backend.repository;

import com.filter.backend.model.TableNameList;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.filter.backend.config.QueryConfig;
import com.filter.backend.util.QueryBuilder;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class TableNameListRepository {

    private final JdbcTemplate jdbcTemplate;
    private final QueryConfig queryConfig;
    private final QueryBuilder queryBuilder;

    public TableNameListRepository(JdbcTemplate jdbcTemplate, QueryConfig queryConfig, QueryBuilder queryBuilder) {
        this.jdbcTemplate = jdbcTemplate;
        this.queryConfig = queryConfig;
        this.queryBuilder = queryBuilder;
    }

    // ID'ye göre sıralı tüm kayıtları getir
    public List<TableNameList> findAllByOrderByIdDesc() {
        String sql = queryConfig.getFindAllByOrderByIdDesc();
        return jdbcTemplate.query(sql, new TableNameListRowMapper());
    }

    // Tabloya yeni bir kayıt ekleme
    public void save(String firstTableName, String tableName) {

        String sqlTemplate = queryConfig.getSaveTableName();

        Map<String, String> placeholders = new HashMap<>();
        placeholders.put("FirstTableName", firstTableName);
        placeholders.put("TableName", tableName);

        String finalQuery = queryBuilder.buildQuery(sqlTemplate, placeholders);

        jdbcTemplate.update(finalQuery);
    }

    // ID'ye göre bir kaydı sil
    public void deleteById(Long id) {

        String sqlTempalte = queryConfig.getDeleteTableName();

        Map<String, String> placeholders = new HashMap<>();
        placeholders.put("ID", String.valueOf(id));

        String finalQuery = queryBuilder.buildQuery(sqlTempalte, placeholders);

        jdbcTemplate.update(finalQuery);
    }

    // TableNameList için RowMapper
    private static class TableNameListRowMapper implements RowMapper<TableNameList> {
        @Override
        public TableNameList mapRow(ResultSet rs, int rowNum) throws SQLException {
            TableNameList tableNameList = new TableNameList();
            tableNameList.setId(rs.getLong("ID"));
            tableNameList.setFirstTableName(rs.getString("FIRST_TABLE_NAME"));
            tableNameList.setTableName(rs.getString("TABLE_NAME"));
            return tableNameList;
        }
    }
}
