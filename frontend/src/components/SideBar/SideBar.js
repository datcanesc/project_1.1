import React, {  useState } from "react";
import { Layout, Menu, ConfigProvider, Button, Popconfirm } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";
import { useTableList } from "../TableNameList/TableListContext.js";

const { Sider } = Layout;

const SideBar = () => {
    const { tableList, handleDelete } = useTableList();
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate(); // Yönlendirme için useNavigate hook'u

    const onCollapse = (collapsedStatus) => {
        setCollapsed(collapsedStatus);
    };

    const handleNavigate = (path) => {
        navigate(path);
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
                        key="2"
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
