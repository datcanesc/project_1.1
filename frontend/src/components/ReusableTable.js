import React from "react";
import { Table } from "antd";

function ReusableTable({ columns, dataSource, rowKey = "ID", onSelectChange }) {
    const dynamicColumns =
        columns ||
        (dataSource.length > 0
            ? Object.keys(dataSource[0]).map((key) => ({
                title: key.charAt(0).toUpperCase() + key.slice(1),
                dataIndex: key,
                key,
            }))
            : []);

    const rowSelection = onSelectChange
        ? {
            onChange: (selectedRowKeys, selectedRows) => {
                onSelectChange(selectedRowKeys, selectedRows);
            },
        }
        : undefined;

    return (
            <Table
                columns={dynamicColumns}
                dataSource={dataSource}
                rowKey={rowKey} // Benzersiz anahtar
                rowSelection={rowSelection}
                pagination={{ pageSize: 13 }}
            />
    );
}

export default ReusableTable;
