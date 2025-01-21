package com.filter.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "MAIN_TABLE")
public class MainTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ITEM_NAME", nullable = false)
    private String itemName;  // Change from item_id to itemId

    @Column(name = "COLUMN1", nullable = false)
    private String column1;

    @Column(name = "TARIH", nullable = false)
    private LocalDate tarih;

    @Column(name = "PARAMETER1", nullable = false)
    private String parameter1;

    @Column(name = "PARAMETER2", nullable = false)
    private String parameter2;

    @Column(name = "PARAMETER3", nullable = false)
    private String parameter3;
}
