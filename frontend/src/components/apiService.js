import axios from "axios";

const apiClient = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
});

// ITEM1 için tablo oluşturma
export const createTableForItem1 = (data) => {
    return apiClient.post("/table/createItem1", null, {
        params: {
            liste_item: data.liste_item,
            tempTableName: data.tempTableName,
            selectedValue: "item1",
            startDateValue: data.startDateValue,
            endDateValue: data.endDateValue,
        },
    });
};

// ITEM2 için tablo oluşturma
export const createTableForItem2 = (data) => {
    const selectedIdsString = data.selectedIds.join(","); // ID'leri virgülle ayrılmış stringe dönüştür
    return apiClient.post("/table/createItem2", null, {
        params: {
            tempTableName: data.tempTableName,
            selectedIds: selectedIdsString, // Dönüştürülmüş ID'ler
        },
    });
};


// ITEM3 için tablo oluşturma ve ID'leri ekleme
export const createTableForItem3 = (data) => {
    return apiClient.post("/table/createItem3", data.ids, {
        params: {
            tempTableName: data.tempTableName,
        },
    });
};

// ITEM4 için tablo oluşturma
export const createTableForItem4 = (data) => {
    return apiClient.post("/table/createItem4", null, {
        params: {
            tempTableName: data.tempTableName,
            parameter1: data.parameter1,
            parameter2: data.parameter2,
            parameter3: data.parameter3,
            liste_item: data.liste_item,
            selectedValue: "item4",
            startDateValue: data.startDateValue,
            endDateValue: data.endDateValue,
        },
    });
};

// Özellik sorgularını uygulama
export const applyOzellikQueries = (data) => {
    return apiClient.post("/table/applyOzellik", data.ozellikKeys, {
        params: {
            initialTable: data.initialTable,
        },
    });
};

// Tüm oluşturulan tabloları silme
export const cleanupAllCreatedTables = () => {
    return apiClient.delete("/table/cleanupAll");
};

// Yıllara göre filtreleme
export const filterByYears = (years) => {
    // years array -> virgülle ayrılmış string formatına dönüştürülüyor
    const yearsParam = years.join(",");
    return apiClient.get("/item2/filterByYears", {
        params: { years: yearsParam },
    });
};

export const getTableContents = (tableName) => {
    return apiClient.get("/table/getTableContents", {
        params: {
            tableName,
        },
    });
};

// 1) Tablo isimlerini liste halinde (ters sırada) çekmek için
export const getSortedTableNames = () => {
    // /table-names endpointine GET isteği
    return apiClient.get("/table-names");
};

export const dropTable = (tableName) => {
    return apiClient.delete("/table/dropTable", {
        params: { tableName },
    });
};

// 2) Yeni bir tablo ismini kaydetmek için
export const saveTableName = (tableName) => {
    // /table-names/saveTableName endpointine POST isteği
    // RequestParam olarak tableName göndermek için:
    return apiClient.post("/table-names/saveTableName", null, {
        params: { tableName },
    });
};

export const deleteTableName = (id) => {
    return apiClient.delete("/table-names", {
        params: { id },
    });
};



// Hepsini tek bir object olarak da export edebilirsiniz:
const apiService = {
    createTableForItem1,
    createTableForItem2,
    createTableForItem3,
    createTableForItem4,
    applyOzellikQueries,
    cleanupAllCreatedTables,
    filterByYears,
    getTableContents,
    getSortedTableNames,
    saveTableName,
    dropTable,
    deleteTableName,
};

export default apiService;
