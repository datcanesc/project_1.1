package com.filter.backend.repository;

import com.filter.backend.model.TableNameList;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class TableNameListRepository {

    private final JdbcTemplate jdbcTemplate;

    public TableNameListRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // ID'ye göre sıralı tüm kayıtları getir
    public List<TableNameList> findAllByOrderByIdDesc() {
        String sql = "SELECT * FROM TABLE_NAME_LIST ORDER BY id DESC";
        return jdbcTemplate.query(sql, new TableNameListRowMapper());
    }

    // Tabloya yeni bir kayıt ekleme
    public void save(String tableName) {
        String sql = "INSERT INTO TABLE_NAME_LIST (TABLE_NAME) VALUES (?)";
        jdbcTemplate.update(sql, tableName);
    }

    // ID'ye göre bir kaydı sil
    public void deleteById(Long id) {
        String sql = "DELETE FROM TABLE_NAME_LIST WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    // TableNameList için RowMapper
    private static class TableNameListRowMapper implements RowMapper<TableNameList> {
        @Override
        public TableNameList mapRow(ResultSet rs, int rowNum) throws SQLException {
            TableNameList tableNameList = new TableNameList();
            tableNameList.setId(rs.getLong("id"));
            tableNameList.setTableName(rs.getString("TABLE_NAME"));
            return tableNameList;
        }
    }
}
