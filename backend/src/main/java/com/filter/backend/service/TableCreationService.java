package com.filter.backend.service;

import com.filter.backend.config.QueryConfig;
import com.filter.backend.util.QueryBuilder;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Verilen sorgu template'lerine gore veritabaninda tablo olusturma ve
 * ozellik sorgularini ardisik uygulama islerini yuruten servis.
 */
@Service
public class TableCreationService {

    private static final Logger logger = LoggerFactory.getLogger(TableCreationService.class);

    private final QueryConfig queryConfig;
    private final QueryBuilder queryBuilder;
    private final JdbcTemplate jdbcTemplate;

    private final List<String> createdTableNames = new ArrayList<>();

    public TableCreationService(
            QueryConfig queryConfig,
            QueryBuilder queryBuilder,
            JdbcTemplate jdbcTemplate) {
        this.queryConfig = queryConfig;
        this.queryBuilder = queryBuilder;
        this.jdbcTemplate = jdbcTemplate;
    }

    // ---------------------------------------------------------
    // 1) ITEM1 icin tablo olusturma
    // ---------------------------------------------------------
    public String createInitialTempTableForItem1(
            String liste_item,
            String tempTableName,
            String selectedValue,
            String startDateValue,
            String endDateValue) {

        String sqlTemplate;
        switch (liste_item) {
            case "list_item_1":
            case "list_item_2":
            case "list_item_3":
            case "list_item_4":
            case "list_item_5":
            case "list_item_6":
                sqlTemplate = queryConfig.getSql1();
                break;

            case "list_item_7":
            case "list_item_8":
                sqlTemplate = queryConfig.getSql2();
                break;

            case "list_item_9":
                sqlTemplate = queryConfig.getSql3();
                break;

            default:
                throw new IllegalArgumentException("Unsupported liste_item for item1: " + liste_item);
        }

        Map<String, String> placeholders = new HashMap<>();
        placeholders.put("TempTableName", tempTableName);
        placeholders.put("selectedIds", selectedValue);

        if (sqlTemplate.equals(queryConfig.getSql3())) {
            placeholders.put("tarih1", startDateValue);
            placeholders.put("tarih2", endDateValue);
        }

        String finalQuery = queryBuilder.buildQuery(sqlTemplate, placeholders);
        logger.info("Executing query for item1: {}", finalQuery);

        jdbcTemplate.update(finalQuery);

        createdTableNames.add(tempTableName);

        return tempTableName;
    }

    // ---------------------------------------------------------
    // 2) ITEM2 icin tablo olusturma
    // ---------------------------------------------------------
    public String createInitialTempTableForItem2(
            String tempTableName,
            String selectedIds) {
        String sqlTemplate = queryConfig.getSql4();

        Map<String, String> placeholders = new HashMap<>();
        placeholders.put("TempTableName", tempTableName);
        placeholders.put("selectedIds", selectedIds);

        String finalQuery = queryBuilder.buildQuery(sqlTemplate, placeholders);
        logger.info("Executing query for item2: {}", finalQuery);

        jdbcTemplate.update(finalQuery);

        createdTableNames.add(tempTableName);

        return tempTableName;
    }

    // ---------------------------------------------------------
    // 3) ITEM3 icin tablo olusturma
    // ---------------------------------------------------------
    public void createItem3Table(String tempTableName) {
        String createTableQuery = queryConfig.getItem3_create_table_sql();

        Map<String, String> placeholders = new HashMap<>();
        placeholders.put("TempTableName", tempTableName);

        String finalQuery = queryBuilder.buildQuery(createTableQuery, placeholders);
        jdbcTemplate.update(finalQuery);

        System.out.println("Table created: " + tempTableName);
    }

    public void insertIdsIntoItem3Table(String tempTableName, List<Integer> ids) {
        String insertQuery = queryConfig.getItem3_insert_sql() + tempTableName + " (id) VALUES (?)";

        for (Integer id : ids) {
            jdbcTemplate.update(insertQuery, id);
        }

        System.out.println("IDs inserted into table: " + tempTableName);
    }

    // ---------------------------------------------------------
    // 4) ITEM4 icin tablo olusturma
    // ---------------------------------------------------------

    private String formatListForSQL(List<String> values) {
        return values.stream()
                .map(value -> "'" + value + "'") // Değerleri tek tırnak içine al
                .collect(Collectors.joining(", "));
    }

    public void createItem4Table(
            String tempTableName,
            List<String> parameter1,
            List<String> parameter2,
            List<String> parameter3,
            String liste_item,
            String selectedValue,
            String startDateValue,
            String endDateValue) {

        String sqlTemplate;
        switch (liste_item) {
            case "list_item_1":
            case "list_item_2":
            case "list_item_3":
            case "list_item_4":
            case "list_item_5":
            case "list_item_6":
            case "list_item_7":
            case "list_item_8":
                sqlTemplate = queryConfig.getSql5(); // Listeye uygun SQL
                break;

            case "list_item_9":
                sqlTemplate = queryConfig.getSql6(); // Tarih aralığı isteyen SQL
                break;

            default:
                throw new IllegalArgumentException("Unsupported liste_item for item4: " + liste_item);
        }

        // Placeholderları doldur
        Map<String, String> placeholders = new HashMap<>();
        placeholders.put("TempTableName", tempTableName);
        placeholders.put("PARAMETER1", formatListForSQL(parameter1)); // Listeyi SQL formatına çevir
        placeholders.put("PARAMETER2", formatListForSQL(parameter2));
        placeholders.put("PARAMETER3", formatListForSQL(parameter3));
        placeholders.put("selectedIds", selectedValue);

        // Tarih aralığı gerekiyorsa ekle
        if (sqlTemplate.equals(queryConfig.getSql6())) {
            placeholders.put("tarih1", startDateValue);
            placeholders.put("tarih2", endDateValue);
        }

        // Query'yi oluştur
        String finalQuery = queryBuilder.buildQuery(sqlTemplate, placeholders);
        logger.info("Executing query for item4: {}", finalQuery);

        // Query'yi çalıştır
        jdbcTemplate.update(finalQuery);

        System.out.println("Table created for item4: " + tempTableName);
    }

    // ---------------------------------------------------------
    // Zincirleme OZELLIK sorgularini uygulayan metot
    // ---------------------------------------------------------
    public String applyOzellikQueriesSequentially(List<String> ozellikQueries, String initialTable) {
        String oldTable = initialTable;
        String lastCreatedTable = oldTable;

        for (int i = 0; i < ozellikQueries.size(); i++) {
            String ozellikQueryKey = ozellikQueries.get(i);
            String sqlTemplate = pickOzellikSqlTemplate(ozellikQueryKey); // alttaki yard. metot

            String nextTableName = initialTable + "_" + String.format("%02d", (i + 1));

            Map<String, String> placeholders = new HashMap<>();
            placeholders.put("inputTableName", oldTable);
            placeholders.put("outputTableName", nextTableName);

            String finalQuery = queryBuilder.buildQuery(sqlTemplate, placeholders);
            logger.info("Executing ozellik query: {}", finalQuery);

            jdbcTemplate.execute(finalQuery);
            lastCreatedTable = nextTableName;

            // islemlerin basindaki ilk tabloyu siler
            dropTableSafely(oldTable); // zincirde bir onceki tabloyu siler

            oldTable = nextTableName;
        }
        return lastCreatedTable;
    }

    // ---------------------------------------------------------
    // Yardimci Metot: ozellik sorgularini secmek
    // ---------------------------------------------------------
    private String pickOzellikSqlTemplate(String ozellikQueryKey) {
        switch (ozellikQueryKey) {
            case "sql_ozellik1":
                return queryConfig.getSql_ozellik1();
            case "sql_ozellik2":
                return queryConfig.getSql_ozellik2();
            case "sql_ozellik3":
                return queryConfig.getSql_ozellik3();
            case "sql_ozellik4":
                return queryConfig.getSql_ozellik4();
            case "sql_ozellik5":
                return queryConfig.getSql_ozellik5();
            case "sql_ozellik6":
                return queryConfig.getSql_ozellik6();
            case "sql_ozellik7":
                return queryConfig.getSql_ozellik7();
            default:
                throw new IllegalArgumentException("Unsupported ozellik key: " + ozellikQueryKey);
        }
    }

    // ---------------------------------------------------------
    // Yardimci Metot: Bir tabloyu guvenli sekilde drop et
    // ---------------------------------------------------------
    public void dropTableSafely(String tableName) {
        try {
            Map<String, String> dropPlaceholders = new HashMap<>();
            dropPlaceholders.put("TempTableName", tableName);

            String dropQuery = queryBuilder.buildQuery(queryConfig.getDrop_table_sql(), dropPlaceholders);
            logger.info("Dropping table: {}", tableName);
            jdbcTemplate.execute(dropQuery);
        } catch (Exception e) {
            logger.error("Drop error for table: {} => {}", tableName, e.getMessage());
        }
    }

    public List<Map<String, Object>> getTableContents(String tableName) {

        String sqlTemplate = queryConfig.getGet_table();

        Map<String, String> placeholders = new HashMap<>();
        placeholders.put("TableName", tableName);

        String finalQuery = queryBuilder.buildQuery(sqlTemplate, placeholders);

        return jdbcTemplate.queryForList(finalQuery);
    }

    // ---------------------------------------------------------
    // Opsiyonel: Son olusturulan tablo adini returnler
    // ---------------------------------------------------------
    public String getLastCreatedTableName() {
        if (createdTableNames.isEmpty()) {
            return null;
        }
        return createdTableNames.get(createdTableNames.size() - 1);
    }

    // ---------------------------------------------------------
    // 7) Zincirleme sorgu sirasinda olusturulan ara tablolari siler
    // ---------------------------------------------------------
    public void dropAllCreatedTables() {
        for (String tableName : createdTableNames) {
            dropTableSafely(tableName);
        }
        createdTableNames.clear();
    }
}
