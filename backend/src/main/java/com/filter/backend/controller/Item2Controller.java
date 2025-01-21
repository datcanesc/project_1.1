package com.filter.backend.controller;

import com.filter.backend.service.Item2FilterService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/item2")
public class Item2Controller {

    private final Item2FilterService item2FilterService;

    public Item2Controller(Item2FilterService item2FilterService) {
        this.item2FilterService = item2FilterService;
    }

    @GetMapping("/filterByYears")
    public List<Map<String, Object>> filterByYears(
            // @RequestParam(required = false) String itemId, asdasd
            @RequestParam String years) {

        List<String> yearList;
        if (years == null || years.isEmpty()) {
            yearList = new ArrayList<>();
        } else {
            yearList = Arrays.asList(years.split(","));
        }
        return item2FilterService.getItem2ListByYears(yearList);
    }
}
