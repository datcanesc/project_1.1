package com.filter.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import jakarta.annotation.PostConstruct;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Configuration
@PropertySource("classpath:queries.properties")
public class QueryConfig {

    @Value("${sql_ozellik1}")
    private String sql_ozellik1;

    @Value("${sql_ozellik2}")
    private String sql_ozellik2;

    @Value("${sql_ozellik3}")
    private String sql_ozellik3;
    
    @Value("${sql_ozellik4}")
    private String sql_ozellik4;

    @Value("${sql_ozellik5}")
    private String sql_ozellik5;

    @Value("${sql_ozellik6}")
    private String sql_ozellik6;

    @Value("${sql_ozellik7}")
    private String sql_ozellik7;

    @Value("${sql_item2_liste}")
    private String sql_item2_liste;

    @Value("${sql1}")
    private String sql1;
    
    @Value("${sql2}")
    private String sql2;

    @Value("${sql3}")
    private String sql3;
    
    @Value("${sql4}")
    private String sql4;

    @Value("${sql5}")
    private String sql5;

    @Value("${sql6}")
    private String sql6;

    @Value("${item3_create_table_sql}")
    private String item3_create_table_sql;

    @Value("${item3_insert_sql}")
    private String item3_insert_sql;

    @Value("${parameter1}")
    private String parameter1;

    @Value("${parameter2}")
    private String parameter2;

    @Value("${parameter3}")
    private String parameter3;

    @Value("${drop_table_sql}")
    private String drop_table_sql;

    @PostConstruct
    public void printQueries() {
        System.out.println("################# SQL OZELLIK");
        System.out.println("SQL_OZELLIK_1: " + sql_ozellik1);
        System.out.println("SQL_OZELLIK_2: " + sql_ozellik2);
        System.out.println("SQL_OZELLIK_3: " + sql_ozellik3);
        System.out.println("SQL_OZELLIK_4: " + sql_ozellik4);
        System.out.println("SQL_OZELLIK_5: " + sql_ozellik5);
        System.out.println("SQL_OZELLIK_6: " + sql_ozellik6);
        System.out.println("SQL_OZELLIK_7: " + sql_ozellik7);
        System.out.println("");
        System.out.println("################# SQL");
        System.out.println("SQL1: " + sql1);
        System.out.println("SQL2: " + sql2);
        System.out.println("SQL3: " + sql3);
        System.out.println("SQL4: " + sql4);
        System.out.println("SQL5: " + sql5);
        System.out.println("");
        System.out.println("sql_item2_liste: " + sql_item2_liste);
        System.out.println("item3_create_table_sql: " + item3_create_table_sql);
        System.out.println("item3_insert_sql: " + item3_insert_sql);
        System.out.println("parameter1:" + parameter1);
        System.out.println("parameter2: " + parameter2);
        System.out.println("parameter3: " + parameter3);
        System.out.println("drop_table_sql: " + drop_table_sql);
    }
}

