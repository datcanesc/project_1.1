import React, { useState, useEffect } from "react";
import { Select } from "antd";
import axios from "axios";

function ParameterSelect({
    parameter1Label,
    parameter2Label,
    parameter3Label,
    onChangeParameter,
}) {
    // Seçenekler
    const [parameter1Options, setParameter1Options] = useState([]);
    const [parameter2Options, setParameter2Options] = useState([]);
    const [parameter3Options, setParameter3Options] = useState([]);

    // Seçilmiş değerler
    const [selectedParameter1, setSelectedParameter1] = useState(null);
    const [selectedParameter2, setSelectedParameter2] = useState(null);
    const [selectedParameter3, setSelectedParameter3] = useState(null);

    // İsteği yaparken verileri (label, value) şeklinde formatlayan yardımcı fonksiyon
    const formatOptions = (dataArray) => {
        // Array içindeki mükerrer kayıtları filtreliyoruz
        const uniqueValues = [...new Set(dataArray)];
        return uniqueValues.map((value) => ({ label: value, value }));
    };


    // Parameter2 fetch
    const fetchParameter2 = async (parameter1Values) => {
        try {
            const response = await axios.get(`/parameters/parameters2`, {
                params: { parameter1: parameter1Values }, // Liste olarak gönderiyoruz
                paramsSerializer: (params) => {
                    return params.parameter1.map(p => `parameter1=${encodeURIComponent(p)}`).join('&');
                }
            });
    
            setParameter2Options(formatOptions(response.data));
        } catch (error) {
            console.error("Parameter2 verileri alınırken hata oluştu:", error);
        }
    };

    // Parameter3 fetch
    const fetchParameter3 = async (parameter1Values, parameter2Values) => {
        try {
            const response = await axios.get(`/parameters/parameters3`, {
                params: {
                    parameter1: parameter1Values, // Liste olarak gönderiyoruz
                    parameter2: parameter2Values // Liste olarak gönderiyoruz
                },
                paramsSerializer: (params) => {
                    return [
                        ...params.parameter1.map(p => `parameter1=${encodeURIComponent(p)}`),
                        ...params.parameter2.map(p => `parameter2=${encodeURIComponent(p)}`)
                    ].join('&');
                }
            });
    
            setParameter3Options(formatOptions(response.data));
        } catch (error) {
            console.error("Parameter3 verileri alınırken hata oluştu:", error);
        }
    };
    

    // Bileşen ilk yüklendiğinde parameter1 bilgilerini getir
    useEffect(() => {
        const fetchParameter1 = async () => {
            try {
                const response = await axios.get("/parameters/parameters1");
                setParameter1Options(formatOptions(response.data));
            } catch (error) {
                console.error("Parameter1 verileri alınırken hata oluştu:", error);
            }
        };

        fetchParameter1();
    }, []);

    // Parametre 1 seçimi
    const handleParameter1Change = (value) => {
        setSelectedParameter1(value);
        // Parameter2 ve 3'ü sıfırla
        setSelectedParameter2(null);
        setSelectedParameter3(null);
        setParameter2Options([]);
        setParameter3Options([]);

        // Yeni parametre1 seçimine göre parameter2 fetch
        fetchParameter2(value);

        // Değişiklikleri dışarıya aktar
        onChangeParameter({ parameter1: value, parameter2: null, parameter3: null });
    };

    // Parametre 2 seçimi
    const handleParameter2Change = (value) => {
        setSelectedParameter2(value);
        // Parameter3'ü sıfırla
        setSelectedParameter3(null);
        setParameter3Options([]);

        // Yeni parametre2 seçimine göre parameter3 fetch
        fetchParameter3(selectedParameter1, value);

        // Değişiklikleri dışarıya aktar
        onChangeParameter({
            parameter1: selectedParameter1,
            parameter2: value,
            parameter3: null,
        });
    };

    // Parametre 3 seçimi
    const handleParameter3Change = (value) => {
        setSelectedParameter3(value);
        // Değişiklikleri dışarıya aktar
        onChangeParameter({
            parameter1: selectedParameter1,
            parameter2: selectedParameter2,
            parameter3: value,
        });
    };

    return (
        <div className="parameter-container">
            <Select
                mode="multiple"
                placeholder={parameter1Label || "Parametre 1"}
                options={parameter1Options}
                value={selectedParameter1}
                onChange={handleParameter1Change}
            />
            <Select
                mode="multiple"
                placeholder={parameter2Label || "Parametre 2"}
                options={parameter2Options}
                value={selectedParameter2}
                disabled={!selectedParameter1}
                onChange={handleParameter2Change}
            />
            <Select
                mode="multiple"
                placeholder={parameter3Label || "Parametre 3"}
                options={parameter3Options}
                value={selectedParameter3}
                disabled={!selectedParameter2}
                onChange={handleParameter3Change}
            />
        </div>
    );
}

export default ParameterSelect;
