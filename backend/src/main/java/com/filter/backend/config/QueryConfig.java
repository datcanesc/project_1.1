package com.filter.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

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

    @Value("${get_table}")
    private String get_table;

    @Value("${findAllByOrderByIdDesc}")
    private String findAllByOrderByIdDesc;

    @Value("${saveTableName}")
    private String saveTableName;

    @Value("${deleteTableName}")
    private String deleteTableName;
}

