import { useEffect, useState } from "react";
import apiService from "../apiService.js";

const TableList = () => {
    const [tableList, setTableList] = useState([]);

    useEffect(() => {
        fetchTableNames();
    }, []);

    const fetchTableNames = async () => {
        try {
            const response = await apiService.getSortedTableNames();
            setTableList(response.data);
        } catch (error) {
            console.error("Tablo isimleri alınırken hata oluştu:", error);
        }
    };

    const handleDeleteTableName = async (tableName, id) => {
        try {
            await apiService.dropTable(tableName);
            await apiService.deleteTableName(id);
            setTableList((prevList) => prevList.filter((table) => table.id !== id));
        } catch (error) {
            console.error(`Tablo '${tableName}' silinirken hata oluştu:`, error);
        }
    };

    return { fetchTableNames, handleDeleteTableName, tableList };
};

export default TableList;
