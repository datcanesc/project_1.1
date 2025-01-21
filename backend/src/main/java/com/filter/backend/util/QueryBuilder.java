package com.filter.backend.util;

import java.util.Map;

import org.springframework.stereotype.Component;

/**
 * Sorgu template'lerindeki placeholderları (ör: {TempTableName}, {inputTableName} vb.)
 * gerçek değerlerle değiştirmek için yardımcı metot sağlayan sınıf.
 */
@Component
public class QueryBuilder {

    /**
     * Verilen sorgu şablonu (template) içerisindeki placeholderları,
     * map ile gelen değerlerle değiştirir.
     * 
     * @param queryTemplate Örnek: "CREATE TABLE {TempTableName} AS SELECT * FROM MAIN_TABLE ..."
     * @param placeholders  Placeholder anahtar/değerleri. 
     *                      Örnek Map: 
     *                        {
     *                          "TempTableName":"TEMP_ABC", 
     *                          "selectedIds": "1,2,3"
     *                        }
     * @return placeholder'ları değiştirilmiş final sorgu string'i
     */
    public String buildQuery(String queryTemplate, Map<String, String> placeholders) {
        String finalQuery = queryTemplate;
        for (Map.Entry<String, String> entry : placeholders.entrySet()) {
            // Örneğin {TempTableName} => TEMP_ABC
            finalQuery = finalQuery.replace("{" + entry.getKey() + "}", entry.getValue());
        }
        return finalQuery;
    }
}
