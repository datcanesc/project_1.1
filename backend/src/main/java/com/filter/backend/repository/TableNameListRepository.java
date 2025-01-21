package com.filter.backend.repository;


import com.filter.backend.model.TableNameList;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TableNameListRepository extends JpaRepository<TableNameList, Long> {

    List<TableNameList> findAllByOrderByIdDesc();
}

