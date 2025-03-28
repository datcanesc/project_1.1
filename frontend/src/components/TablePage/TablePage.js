import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { message, Button } from "antd";
import ReusableTable from "../ReusableTable.js";
import apiService from "../apiService.js";
import * as XLSX from "xlsx"; // xlsx modülü
import { saveAs } from "file-saver"; // Dosya kaydetme modülü
import "./TablePage.css";

const TablePage = () => {
    const { tableName } = useParams(); // URL'den tableName parametresini alır
    const [data, setData] = useState([]); // Tablo verileri
    const [loading, setLoading] = useState(false); // Yüklenme durumu
    const [selectedRows, setSelectedRows] = useState([]); // Seçilen satırlar

    useEffect(() => {
        if (tableName) {
            fetchTableContents(tableName); // Tablo verilerini getir
        }
    }, [tableName]);

    const fetchTableContents = async (tableName) => {
        setLoading(true); // Yüklenme durumunu başlat
        try {
            const response = await apiService.getTableContents(tableName); // API çağrısı
            setData(response.data); // Gelen veriyi tabloya aktar
        } catch (error) {
            console.error("Tablo verileri alınırken hata oluştu:", error);
            message.error("Tablo verileri alınırken bir hata oluştu.");
        } finally {
            setLoading(false); // Yüklenme durumunu bitir
        }
    };

    const handleExportExcel = () => {
        const rowsToExport = selectedRows.length > 0 ? selectedRows : data; // Seçilen satırlar varsa, onları al, yoksa tüm veriyi al
        try {
            const worksheet = XLSX.utils.json_to_sheet(rowsToExport); // JSON'dan Excel sayfası oluştur

            // Kolon genişliklerini ayarlama
            const columns = Object.keys(rowsToExport[0] || {}); // İlk satırın kolon başlıklarını al
            const columnWidths = columns.map((column) => {
                const maxLength = Math.max(
                    column.length, // Başlık uzunluğu
                    ...rowsToExport.map((item) => String(item[column] || "").length) // Verilerin uzunluğu
                );
                return { wch: maxLength + 2 }; // Genişlik: maxLength + padding
            });
            worksheet["!cols"] = columnWidths; // Kolon genişliklerini ata

            const workbook = XLSX.utils.book_new(); // Yeni bir Excel dosyası oluştur
            XLSX.utils.book_append_sheet(workbook, worksheet, tableName || "Sheet1"); // Sayfayı dosyaya ekle

            const excelBuffer = XLSX.write(workbook, {
                bookType: "xlsx",
                type: "array",
            }); // Veriyi buffer olarak yaz
            const blob = new Blob([excelBuffer], { type: "application/octet-stream" }); // Blob oluştur
            saveAs(blob, `${tableName || "table"}.xlsx`); // Dosyayı indir
        } catch (error) {
            console.error("Excel dosyası oluşturulurken hata oluştu:", error);
            message.error("Excel dosyası oluşturulurken bir hata oluştu.");
        }
    };

    const handleSelectChange = (selectedRowKeys, selectedRows) => {
        setSelectedRows(selectedRows); // Seçilen satırları güncelle
    };

    return (
        <div className="table-page-container">
            <h1 style={{ color: "#ffffff" }}>{tableName}</h1>
            <Button
                className="export-excel-button"
                style={{ marginBottom: "10px", backgroundColor: "green" }}
                type="primary"
                onClick={handleExportExcel}
            >
                Seçili Satırları Excel'e Aktar
            </Button>
            <ReusableTable
                columns={null} // Dinamik kolonlar için null
                dataSource={data} // Tablo verileri
                rowKey="ID" // Benzersiz anahtar
                loading={loading} // Yüklenme durumu
                onSelectChange={handleSelectChange} // Seçim değişikliği için callback
            />
        </div>
    );
};

export default TablePage;
