import React, { useEffect, useState } from "react";
import { Layout, Menu, ConfigProvider, Button, Popconfirm, message } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import apiService from "../apiService.js";
import "./SideBar.css";

const { Sider } = Layout;

const SideBar = ({refreshTables}) => {
    const [collapsed, setCollapsed] = useState(false);
    const [tableList, setTableList] = useState([]);
    const navigate = useNavigate(); // Yönlendirme için useNavigate hook'u

    const onCollapse = (collapsedStatus) => {
        setCollapsed(collapsedStatus);
    };

    useEffect(() => {
        fetchTableNames();
    }, [refreshTables]);

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
            message.success(`Tablo Silindi :${tableName}`);
        } catch (error) {
            console.error(`Tablo '${tableName}' silinirken hata oluştu:`, error);
            message.error(`Tablo Silinirken bir hata oluştu :${tableName}`);
        }
    };

    const handleNavigate = (path) => {
        navigate(path); // Belirtilen yola yönlendir
    };

    return (
        <ConfigProvider>
            <Sider
                className="side-bar"
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapse}
                collapsedWidth={50}
                width={250}
            >
                <div className="side-bar-header">
                    {!collapsed ? (
                        <h1 className="side-bar-app-name">Tablolar</h1>
                    ) : (
                        <h1 className="side-bar-app-icon">T</h1>
                    )}
                </div>
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                    <Menu.Item
                        key="1"
                        onClick={() => handleNavigate("/")} // FilterPage için yönlendirme
                    >
                        Filtreleme Sayfası
                    </Menu.Item>

                    {!collapsed &&
                        tableList.map((table) => (
                            <Menu.Item
                                key={table.id}
                                className="menu-item"
                                onClick={() => handleNavigate(`/${table.tableName}`)} // Tabloya yönlendirme
                            >
                                <div className={`menu-item-content`}>
                                    <span className="table-name">{table.tableName}</span>
                                    <Popconfirm
                                        title={`"${table.tableName}" tablosunu silmek istediğinizden emin misiniz?`}
                                        onConfirm={(e) => {
                                            e.stopPropagation();
                                            handleDelete(table.tableName, table.id);
                                        }}
                                        okText="Evet"
                                        cancelText="Hayır"
                                    >
                                        <Button
                                            icon={<DeleteFilled />}
                                            type="text"
                                            className="delete-button"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </Popconfirm>
                                </div>
                            </Menu.Item>
                        ))}
                </Menu>
            </Sider>
        </ConfigProvider>
    );
};

export default SideBar;
