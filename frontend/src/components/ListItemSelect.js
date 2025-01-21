import React from "react";
import { Select, DatePicker } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

function ListItemSelect({
    listItem,
    startDate,
    endDate,
    onListItemChange,
    onDateChange,
}) {
    // dayjs objelerine dönüştürme
    const startDayjs = startDate ? dayjs(startDate) : null;
    const endDayjs = endDate ? dayjs(endDate) : null;

    const listOptions = [
        { value: "list_item_1", label: "Liste Item 1" },
        { value: "list_item_2", label: "Liste Item 2" },
        { value: "list_item_3", label: "Liste Item 3" },
        { value: "list_item_4", label: "Liste Item 4" },
        { value: "list_item_5", label: "Liste Item 5" },
        { value: "list_item_6", label: "Liste Item 6" },
        { value: "list_item_7", label: "Liste Item 7" },
        { value: "list_item_8", label: "Liste Item 8" },
        { value: "list_item_9", label: "Liste Item 9" },
    ];

    return (
        <div className="list-item-select-container">
            <Select
                value={listItem}
                onChange={onListItemChange}
                options={listOptions}
            />

            {listItem === "list_item_9" && (
                <RangePicker
                placeholder={["Başlangıç Tarihi", "Bitiş Tarihi"]}
                    value={
                        startDayjs && endDayjs
                            ? [startDayjs, endDayjs]
                            : null
                    }
                    onChange={(dates, dateStrings) => {
                        // dateStrings[0] => startDate, dateStrings[1] => endDate
                        onDateChange(dates, dateStrings);
                    }}
                />
            )}
        </div>
    );
}

export default ListItemSelect;
