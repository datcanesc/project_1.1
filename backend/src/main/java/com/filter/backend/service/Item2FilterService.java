package com.filter.backend.service;

import com.filter.backend.config.QueryConfig;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class Item2FilterService {

    private static final Logger logger = LoggerFactory.getLogger(Item2FilterService.class);

    private final QueryConfig queryConfig;
    private final JdbcTemplate jdbcTemplate;

    public Item2FilterService(QueryConfig queryConfig,
            JdbcTemplate jdbcTemplate) {
        this.queryConfig = queryConfig;
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Map<String, Object>> getItem2ListByYears(List<String> years) {
    // public List<Map<String, Object>> getItem2ListByYears(String itemId, List<String> years) {asdfasd

        String sqlTemplate = queryConfig.getSql_item2_liste();

        StringBuilder inClause = new StringBuilder();

        if (years == null || years.isEmpty()) {
            inClause.append("(0)");
        } else {
            inClause.append("(");
            for (int i = 0; i < years.size(); i++) {
                inClause.append(years.get(i));
                if (i < years.size() - 1) {
                    inClause.append(",");
                }
            }
            inClause.append(")");
        }

        String replacedSql = sqlTemplate
                // .replace(":itemId", itemId) 
                .replace(":years", inClause.toString());

        logger.info("Generated SQL for item2 list by years: {}", replacedSql);

        // 4) Sorguyu çalıştır ve sonucu döndür
        // (Her satır Map<String, Object> olacak şekilde)
        return jdbcTemplate.queryForList(replacedSql);
    }
}
