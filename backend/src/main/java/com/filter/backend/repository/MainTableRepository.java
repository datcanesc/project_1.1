package com.filter.backend.repository;

import com.filter.backend.model.MainTable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MainTableRepository extends JpaRepository<MainTable, Long> {

}
