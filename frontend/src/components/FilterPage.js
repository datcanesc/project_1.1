import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Select, Button, Input, message, Upload } from "antd";
import ParameterSelect from "./ParameterSelect";
import ListItemSelect from "./ListItemSelect";
import apiService from "./apiService";
import ReusableTable from "./ReusableTable";
import { UploadOutlined, FilterFilled } from "@ant-design/icons";
import "./FilterPage.css"
import { useTableList } from "./TableNameList/TableListContext";
function FilterPage() {

    const { tableList, fetchTableNames } = useTableList();

    console.log(tableList);

    const navigate = useNavigate();

    const [selectedItem, setSelectedItem] = useState([]);
    const [selectedOzellikler, setSelectedOzellikler] = useState([]);


    // ITEM1 ve ITEM4 gibi ListItemSelect kullanan durumlar için
    const [liste_item, setListeItem] = useState("list_item_1");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [tableData, setTableData] = useState([]);


    // ITEM2 için yıl seçimi
    const [yearSelection, setYearSelection] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    const [params, setParams] = useState({
        parameter1: null,
        parameter2: null,
        parameter3: null,
    });

    // GÜNÜN TARİHİNİ YYYYMMDD formatında veren helper
    const getTodayInYYYYMMDD = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `tmp_table_${year}${month}${day}`;
    };

    // DÜZELTİLMİŞ: Lazy initialization (fonksiyon referansı yerine çağrısı)
    const [tempTableNameInput, setTempTableNameInput] = useState(() => getTodayInYYYYMMDD());

    const isTableNameTaken = (tableName) => {
        return tableList.some((table) =>
            (table.tableName && table.firstTableName) &&
            (table.tableName === tableName || table.firstTableName === tableName)
        );
    };
    // ---- Handlers ----
    const handleTableNameChange = (e) => {
        setTempTableNameInput(e.target.value);
    };

    const handleSelectedItemChange = (value) => {
        setSelectedItem(value);
    };

    const handleListItemChange = (value) => {
        setListeItem(value);
    };

    const handleDateChange = (dates, dateStrings) => {
        if (dates && dates.length === 2) {
            setStartDate(dateStrings[0]);
            setEndDate(dateStrings[1]);
        } else {
            setStartDate(null);
            setEndDate(null);
        }
    };

    const handleParamsChange = (newParams) => {
        setParams(newParams);
    };

    const handleYearChange = (values) => {
        setYearSelection(values);
    };

    const handleFileUpload = async (file) => {
        try {
            const fileReader = new FileReader();

            fileReader.onload = (e) => {
                const content = e.target.result;
                console.log("Dosya içeriği:", content); // Dosya içeriğini konsola yazdır

                const ids = content
                    .split(/\r?\n/) // Satırlara göre ayır
                    .filter((line) => line.trim() !== "") // Boş satırları temizle
                    .map((id) => {
                        const parsedId = parseInt(id.trim(), 10); // ID'yi integer'a çevir
                        console.log(`Okunan ID: ${id}, Parse edilmiş ID: ${parsedId}`); // Her ID'yi kontrol et
                        return parsedId;
                    })
                    .filter((id) => !isNaN(id)); // Geçerli olmayan numaraları temizle

                if (ids.length === 0) {
                    message.error("Dosya boş veya geçersiz ID formatı içeriyor!");
                    return;
                }

                setSelectedIds(ids);
                console.log("Yüklenen ID'ler:", ids); // ID listesini kontrol et
                message.success("Dosya başarıyla yüklendi!");
            };

            fileReader.onerror = () => {
                message.error("Dosya okunurken bir hata oluştu.");
            };

            fileReader.readAsText(file);
        } catch (error) {
            console.error("Dosya yükleme hatası:", error);
            message.error("Bir hata oluştu.");
        }

        return false; // Ant Design'ın otomatik yükleme işlemini durdurmak için
    };



    const applyOzellikler = async (tableName, ozellikKeys) => {
        try {
            if (!tableName || ozellikKeys.length === 0) {
                message.warning("Tablo adı veya özellikler eksik!");
                return;
            }

            const ozellikData = {
                initialTable: tableName,
                ozellikKeys,
            };

            // Özellikleri uygulama isteği
            const response = await apiService.applyOzellikQueries(ozellikData);

            // Backend'den gelen tablo adı
            const lastTableName = response.data; // Yanıt düz bir string ise, bu şekilde alınır
            message.success(`Özellikler uygulandı TABLO İSMİ: ${lastTableName}`);

            // Tablo içeriğini getirme
            const tableContentsResponse = await apiService.getTableContents(lastTableName);
            setTableData(tableContentsResponse.data);


            const tableNameListData = {
                firstTableName: tempTableNameInput,
                tableName: lastTableName,
            };

            await apiService.saveTableName(tableNameListData);

            navigate(`/${lastTableName}`);

            await fetchTableNames();

        } catch (error) {
            console.error("Özellik uygulama sırasında hata oluştu: ", error);
            message.error("Benzer Tablo Adı Kullanılmış olabilir");
        }
    };




    const handleCreateItem1 = async () => {
        try {
            const finalTableName = tempTableNameInput.trim()
                ? tempTableNameInput.trim()
                : getTodayInYYYYMMDD();

            // 1. Tablo oluştur
            const tableData = {
                liste_item,
                tempTableName: finalTableName,
                startDateValue: startDate,
                endDateValue: endDate,
            };

            const tableResponse = await apiService.createTableForItem1(tableData);
            console.log("Item 1 tablosu oluşturuldu: ", tableResponse.data);

            // 2. Özellikleri uygula
            await applyOzellikler(finalTableName, selectedOzellikler);
        } catch (error) {
            console.error("Tablo oluşturma sırasında hata oluştu: ", error);
            message.error("Item 1 oluşturulurken bir hata oluştu!");
        }
    };




    const handleCreateItem2 = async () => {
        try {
            if (selectedIds.length === 0) {
                message.warning("Lütfen tablodan en az bir satır seçiniz.");
                return;
            }

            const finalTableName = tempTableNameInput.trim()
                ? tempTableNameInput.trim()
                : getTodayInYYYYMMDD();

            // 1. Tablo oluştur
            const data = {
                tempTableName: finalTableName,
                selectedIds,
            };

            const tableResponse = await apiService.createTableForItem2(data);
            console.log("Item 2 tablosu oluşturuldu: ", tableResponse.data);

            // 2. Özellikleri uygula
            await applyOzellikler(finalTableName, selectedOzellikler);
        } catch (error) {
            console.error("Tablo oluşturma sırasında hata oluştu: ", error);
            message.error("Item 2 oluşturulurken bir hata oluştu!");
        }
    };

    const handleCreateItem3 = async () => {
        try {
            if (selectedIds.length === 0) {
                message.warning("Lütfen dosya yükleyerek ID'leri seçiniz.");
                return;
            }

            const finalTableName = tempTableNameInput.trim()
                ? tempTableNameInput.trim()
                : getTodayInYYYYMMDD();

            const data = {
                tempTableName: finalTableName,
                ids: selectedIds,
            };

            const response = await apiService.createTableForItem3(data);
            console.log("Item 3 tablosu oluşturuldu: ", response.data);

            await applyOzellikler(finalTableName, selectedOzellikler);
        } catch (error) {
            console.error("Tablo oluşturma sırasında hata oluştu: ", error);
            message.error("Item 3 oluşturulurken bir hata oluştu!");;
        }
    };


    const handleCreateItem4 = async () => {
        try {
            const finalTableName = tempTableNameInput.trim()
                ? tempTableNameInput.trim()
                : getTodayInYYYYMMDD();

            // 1. Tablo oluştur
            const tableData = {
                tempTableName: finalTableName,
                parameter1: params.parameter1,
                parameter2: params.parameter2,
                parameter3: params.parameter3,
                liste_item,
                startDateValue: startDate,
                endDateValue: endDate,
            };

            const tableResponse = await apiService.createTableForItem4(tableData);
            console.log("Item 4 tablosu oluşturuldu: ", tableResponse.data);

            // 2. Özellikleri uygula
            await applyOzellikler(finalTableName, selectedOzellikler);
        } catch (error) {
            console.error("Tablo oluşturma sırasında hata oluştu: ", error);
            message.error("Item 4 oluşturulurken bir hata oluştu!");
        }
    };

    const handleFilterByYears = async () => {
        try {
            if (yearSelection.length === 0) {
                message.warning("Lütfen en az bir yıl seçiniz.");
                return;
            }

            const response = await apiService.filterByYears(yearSelection);
            setTableData(response.data); // Gelen veriyi tabloya kaydediyoruz
            message.success("Veriler başarıyla filtrelendi!");
        } catch (error) {
            message.error("Yıllara göre filtreleme hatası oluştu.");
            console.error("Filtreleme hatası:", error);
        }
    };

    const handleSelectChange = (selectedKeys) => {
        console.log("Seçilen satırların ID'leri:", selectedKeys);
        setSelectedIds(selectedKeys); // Seçilen ID'leri state'e kaydet
    };


    return (
        <div className="filter-page">
            <div className="filter-page-container">
                <Input
                    placeholder="Tablo Adı"
                    value={tempTableNameInput}
                    onChange={handleTableNameChange}
                />

                <Select
                    placeholder="Item Seçiniz"
                    value={selectedItem}
                    onChange={handleSelectedItemChange}
                    options={[
                        { value: "item1", label: "ITEM 1" },
                        { value: "item2", label: "ITEM 2" },
                        { value: "item3", label: "ITEM 3" },
                        { value: "item4", label: "ITEM 4" },
                    ]}
                />

                {selectedItem === "item1" && (
                    <div className="filter-page-item1-container">
                        <ListItemSelect
                            listItem={liste_item}
                            startDate={startDate}
                            endDate={endDate}
                            onListItemChange={handleListItemChange}
                            onDateChange={handleDateChange}
                        />
                    </div>
                )}

                {selectedItem === "item2" && (
                    <div className="filter-page-item2-container">
                        <Select
                            mode="multiple"
                            placeholder="Çoklu Tarih Seçimi"
                            value={yearSelection}
                            onChange={handleYearChange}
                            options={(() => {
                                const years = [];
                                for (let y = 1980; y <= 2100; y++) {
                                    years.push({ value: y.toString(), label: y.toString() });
                                }
                                return years;
                            })()}
                        />
                        <Button
                            icon={<FilterFilled />}
                            type="primary"
                            onClick={handleFilterByYears}
                            style={{ backgroundColor: "green" }}
                        >
                            Filtrele
                        </Button>

                    </div>
                )}

                {selectedItem === "item3" && (
                    <div className="filter-page-item3-container">
                        <Upload
                            beforeUpload={handleFileUpload}
                            accept=".txt,.csv" // Sadece .txt ve .csv dosyalarını kabul et
                        >
                            <Button icon={<UploadOutlined />}>Dosya Yükle</Button>
                        </Upload>
                    </div>
                )}

                {selectedItem === "item4" && (
                    <div className="filter-page-item4-container">
                        <ParameterSelect
                            onChangeParameter={handleParamsChange}
                        />

                        <ListItemSelect
                            listItem={liste_item}
                            startDate={startDate}
                            endDate={endDate}
                            onListItemChange={handleListItemChange}
                            onDateChange={handleDateChange}
                        />
                    </div>
                )}


                <Select
                    mode="multiple"
                    placeholder="Özellik Seçiniz"
                    options={[
                        { value: "sql_ozellik1", label: "Özellik 1" },
                        { value: "sql_ozellik2", label: "Özellik 2" },
                        { value: "sql_ozellik3", label: "Özellik 3" },
                        { value: "sql_ozellik4", label: "Özellik 4" },
                        { value: "sql_ozellik5", label: "Özellik 5" },
                        { value: "sql_ozellik6", label: "Özellik 6" },
                        { value: "sql_ozellik7", label: "Özellik 7" },
                    ]}
                    value={selectedOzellikler} // Seçili değerleri gösterir
                    onChange={(value) => setSelectedOzellikler(value)} // Değişiklikleri state'e kaydeder
                />

                {selectedItem === "item1" && (
                    <Button
                        type="primary"
                        onClick={handleCreateItem1}
                        disabled={isTableNameTaken(tempTableNameInput)}
                    >
                        {isTableNameTaken(tempTableNameInput) ? "Bu İsim Kullanılmıştır" : "Tablo Oluştur"}
                    </Button>
                )}
                {selectedItem === "item2" && (
                    <Button
                        type="primary"
                        onClick={handleCreateItem2}
                        disabled={isTableNameTaken(tempTableNameInput)}
                    >
                        {isTableNameTaken(tempTableNameInput) ? "Bu İsim Kullanılmıştır" : "Tablo Oluştur"}
                    </Button>
                )}
                {selectedItem === "item3" && (
                    <Button
                        type="primary"
                        onClick={handleCreateItem3}
                        disabled={isTableNameTaken(tempTableNameInput)}
                    >
                        {isTableNameTaken(tempTableNameInput) ? "Bu İsim Kullanılmıştır" : "Tablo Oluştur"}
                    </Button>
                )}
                {selectedItem === "item4" && (
                    <Button
                        type="primary"
                        onClick={handleCreateItem4}
                        disabled={isTableNameTaken(tempTableNameInput)}
                    >
                        {isTableNameTaken(tempTableNameInput) ? "Bu İsim Kullanılmıştır" : "Tablo Oluştur"}
                    </Button>
                )}
            </div>
            <div className="filter-page-item2-table">
                {selectedItem === "item2" && (
                    <ReusableTable
                        dataSource={tableData} // Gelen veriler
                        rowKey="ID" // Benzersiz anahtar ID
                        onSelectChange={handleSelectChange} // Checkbox değişikliklerini yönet
                    />
                )}
            </div>
        </div>

    );
}

export default FilterPage;
