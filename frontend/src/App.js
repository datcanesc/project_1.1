import './App.css';
import React from "react";

import FilterPage from './components/FilterPage';
import SideBar from './components/SideBar/SideBar.js';
import TablePage from './components/TablePage/TablePage.js';
import { ConfigProvider } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import colorPalette from './colorPalette.js';

import { TableListProvider } from "./components/TableNameList/TableListContext.js";

function App() {



  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            colorText: colorPalette.white,
            colorBgContainer: colorPalette.darkBlue,
            rowHoverBg: colorPalette.hoverBlue,
            borderColor: colorPalette.darkBlue2,
            rowSelectedBg: colorPalette.hoverBlue2,
            rowSelectedHoverBg: colorPalette.hoverBlue,
            // Header
            headerBg: colorPalette.darkBlue2,
          },
          Button: {
            colorText: colorPalette.lightBlue,
            colorBgContainer: colorPalette.darkBlue,
            textHoverBg: colorPalette.hoverBlue,
            lineWidth: 1,
          },
          Tooltip: {
            colorBgSpotlight: colorPalette.hoverBlue, // Yeni Tooltip arka plan rengi
          },
          DatePicker: {
            cellActiveWithRangeBg: colorPalette.hoverBlue,
          }
        },
        token: {
          "colorInfo": "#c76000",
          "colorBgBase": "#1A345A",
          "fontSize": 15,
          "sizeStep": 4,
          "wireframe": false,
          "colorWarning": "#fadb14",
          "colorTextBase": "#ffffff",
        }
      }}>
      <TableListProvider>
        <Router>
          <div className="App">
            <SideBar  />
            <Routes>
              <Route path="/" element={<FilterPage  />} />
              <Route path="/:tableName" element={<TablePage />} />
            </Routes>
          </div>
        </Router>
      </TableListProvider>

    </ConfigProvider>
  );
}

export default App;
