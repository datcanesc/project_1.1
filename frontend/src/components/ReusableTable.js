import React, { useState } from "react";
import { Table, Input, Space, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function ReusableTable({ columns, dataSource, rowKey = "ID", onSelectChange }) {
    const [filters, setFilters] = useState({});

    // Generate dynamic columns if none provided
    const dynamicColumns =
        columns ||
        (dataSource.length > 0
            ? Object.keys(dataSource[0]).map((key) => ({
                title: key.charAt(0).toUpperCase() + key.slice(1),
                dataIndex: key,
                key,
            }))
            : []);

    // Add search functionality to each column
    const columnsWithSearch = dynamicColumns.map((column, index) => ({
        ...column,
        fixed: index < 2 ? 'left' : undefined, // İlk iki kolonu sola sabitle
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 10, borderRadius: 8, border: "1px solid #1676d1" }}>
                <Input
                    placeholder={`Arama yap: ${column.dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => handleSearch(selectedKeys, confirm, column.dataIndex)}
                    style={{ width: 198, marginBottom: 15, marginRight: 0, display: "block", backgroundColor: "#25497E", color: "white" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, column.dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Ara
                    </Button>
                    <Button
                        color="danger"
                        variant="outlined"
                        onClick={() => handleReset(clearFilters, column.dataIndex)}
                        size="small"
                        style={{ width: 90, marginRight: 0 }}
                    >
                        Sıfırla
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{
                fontSize: '15px',
                padding: 5,
                borderRadius: 8,
                backgroundColor: filtered ? "#1890ff" : undefined,
                color: filtered ? "white" : undefined
            }} />
        ),
        onFilter: (value, record) =>
            record[column.dataIndex]
                ? record[column.dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : "",
    
        // Highlighting the searched text in the table
        render: (text) => {
            const searchValue = filters[column.dataIndex] || "";
            if (!searchValue || !text) return text;
    
            const regex = new RegExp(`(${searchValue})`, "gi");
            const parts = text.toString().split(regex);
    
            return (
                <span>
                    {parts.map((part, index) =>
                        part.toLowerCase() === searchValue.toLowerCase() ? (
                            <mark key={index} style={{ backgroundColor: "yellow", padding: "0 2px" }}>
                                {part}
                            </mark>
                        ) : (
                            part
                        )
                    )}
                </span>
            );
        }
    }));

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setFilters({
            ...filters,
            [dataIndex]: selectedKeys[0],
        });
    };

    const handleReset = (clearFilters, dataIndex) => {
        clearFilters();
        const newFilters = { ...filters };
        delete newFilters[dataIndex];
        setFilters(newFilters);
    };

    const rowSelection = onSelectChange
        ? {
            onChange: (selectedRowKeys, selectedRows) => {
                onSelectChange(selectedRowKeys, selectedRows);
            },
        }
        : undefined;

    return (
        <Table
            columns={columnsWithSearch}
            dataSource={dataSource}
            rowKey={rowKey}
            rowSelection={rowSelection}
            scroll={{ x: 'max-content' }}
            pagination={{
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50', '100'],
                locale: {
                    prev_page: 'Önceki',
                    next_page: 'Sonraki',
                    items_per_page: ' adet / sayfa',
                },
            }}

        />
    );
}

export default ReusableTable;
