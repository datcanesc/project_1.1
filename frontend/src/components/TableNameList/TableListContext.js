import { createContext, useContext, useEffect, useState } from "react";
import apiService from "../apiService.js";

const TableListContext = createContext();

export const TableListProvider = ({ children }) => {
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

    const handleDelete = async (tableName, id) => {
        try {
            await apiService.dropTable(tableName);
            await apiService.deleteTableName(id);
            setTableList((prevList) => prevList.filter((table) => table.id !== id));
        } catch (error) {
            console.error(`Tablo '${tableName}' silinirken hata oluştu:`, error);
        }
    };


    return (
        <TableListContext.Provider value={{ tableList, fetchTableNames, handleDelete }}>
            {children}
        </TableListContext.Provider>
    );
};

export const useTableList = () => {
    return useContext(TableListContext);
};
