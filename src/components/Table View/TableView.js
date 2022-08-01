import React, { useState } from "react";
import "antd/dist/antd.css";
import "../../index.css";
import moment from "moment";
import { Button } from "monday-ui-react-core";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Avatar,
} from "antd";
import { useEffect } from "react";

// Table View Return
export default function TableView() {
  const originData = [];
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const [mePersonData, setMePersonData] = useState([]);
  const [imgSrc, setImgSrc] = useState("");
  const [activityLoader, setActivityLoader] = useState(true);
  const [corporateHolidays, setCorporateHolidays] = useState([
    "2022-08-16",
    "2022-08-03",
  ]);
  const [personalHolidays, setPersonalHolidays] = useState([
    "2022-08-24",
    "2022-08-10",
  ]);
  const [corporateData, setCorporateData] = useState([]);

  useEffect(() => {
    fetchCorporateHolidays().then(
      function (value) {
        console.log("PASSED");

        // setCorporateArray();
      },
      function (error) {
        console.log("Null");
      }
    );
    // fetchMeData();
    // setImgSrc(mePersonData.photo_thumb_small);
  }, []);

  async function fetchCorporateHolidays() {
    let query = `query {
    boards (ids: 2901550979) {
    name
    state
    board_folder_id
    items {
      id
      name
      column_values {
        text
      }
    }
  }
}`;

    await fetch("https://api.monday.com/v2", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE2ODYwNzk4NiwidWlkIjozMTY5Njk3MCwiaWFkIjoiMjAyMi0wNy0wNFQxMToxMTozMC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTE0MTA1MTIsInJnbiI6InVzZTEifQ.AQ0i2OQeXqru5sMmRx6h-CCKf6d-CMJ_a1sp8tFJp38",
      },
      body: JSON.stringify({
        query: query,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setCorporateData(res.data.boards[0].items);
        setCorporateArray();
        console.log(res.data.boards[0].items, "222");
      });
  }

  async function setCorporateArray() {
    let tempCorporateData = [];

    if (corporateData.length > 0) {
      corporateData.forEach((item, index) => {
        console.log(item, "ITEMMM");
        item.column_values.forEach((column, index) => {
          console.log(column, "item_values");
          if (column.text.length > 0) {
            tempCorporateData.push(column.text);
          }
        });
      });
    }

    // setCorporateHolidays(tempCorporateData);

    console.log(tempCorporateData, "temp cor");
    console.log(corporateData, "use state corporate");

    // setActivityLoader(true);
  }

  // const [personalHolidays, setPersonalHolidays] = useState(["2022-07-14"]);

  // API

  // useEffect(() => {
  //   getCorporateHolidaysAPI();
  //   setTimeout(() => {
  //     setCorporateArray();
  //   }, 2500);
  // }, []);

  function setCustomClassName(nameOfDay, currentYear, numberOfCurrentMonth, i) {
    if (nameOfDay === "Sun" || nameOfDay === "Sat") return "rowCustomStyling";

    // corporateHolidays
    var index, strDay, strMonth, strYear, dateArr;

    for (index = 0; index < corporateHolidays.length; index++) {
      dateArr = corporateHolidays[index].split("-");

      strYear = dateArr[0];
      strMonth = dateArr[1];
      strDay = dateArr[2];

      // console.log(strDay, "strDay");
      // console.log(strMonth, "strMonth");
      // console.log(strYear, "strYear");

      if (
        (currentYear === strYear) &
        (numberOfCurrentMonth === strMonth) &
        (i == strDay)
      )
        return "corporateCustomStyling";
    }

    // personalHolidays
    for (index = 0; index < personalHolidays.length; index++) {
      dateArr = personalHolidays[index].split("-");

      strYear = dateArr[0];
      strMonth = dateArr[1];
      strDay = dateArr[2];

      if (
        (currentYear === strYear) &
        (numberOfCurrentMonth === strMonth) &
        (i == strDay)
      )
        return "personalCustomStyling";
    }
  }

  async function fetchMeData() {
    let query = `query {
      me {
    is_guest
    name
    photo_thumb_small
    id
    }
}`;
    await fetch("https://api.monday.com/v2", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE2ODYwNzk4NiwidWlkIjozMTY5Njk3MCwiaWFkIjoiMjAyMi0wNy0wNFQxMToxMTozMC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTE0MTA1MTIsInJnbiI6InVzZTEifQ.AQ0i2OQeXqru5sMmRx6h-CCKf6d-CMJ_a1sp8tFJp38",
      },
      body: JSON.stringify({
        query: query,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setMePersonData(res.data.me);

        console.log(res.data.me, "ME");
      });
  }

  // ----------

  // originData ---- Default state of Table Data

  originData.push({
    id: "1",
    totalsum: "0",
    project: "Project X",
    // person: (
    //   <span>
    //     <img src={`${imgSrc}`} alt="H" />
    //   </span>
    // ),
  });

  // Edit data fucntionality

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });

    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  // to calculate total sum of row
  function convertIntObj(obj) {
    const res = {};
    let sum = 0;
    for (const key in obj) {
      res[key] = {};
      for (const prop in obj[key]) {
        const parsed = parseInt(obj[key][prop], 10);
        res[key][prop] = isNaN(parsed) ? obj[key][prop] : parsed;
        sum += res[key][prop];
      }
    }
    return sum;
  }

  // save functionality, and after every updatation, total sum should be updated along with it.

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      let newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
      } else {
        newData.push(row);
      }

      let sumTotal = convertIntObj(row);
      console.log(sumTotal);

      newData[index]["totalsum"] = sumTotal;
      setData(newData);

      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  // coloums title values
  const columns = [];

  // First three fixed columns - Person, Filter and Total

  columns.push(
    {
      title: "Person",
      dataIndex: "person",
      width: 100,
      fixed: "left",
      align: "center",
      className: "opaque-col",
    },
    {
      title: "Project",
      dataIndex: "project",
      width: 130,
      fixed: "left",
      className: "opaque-col",
      align: "center",

      filters: [
        {
          text: "Project X",
          value: "Project X",
        },
        {
          text: "Project Y",
          value: "Project Y",
        },
      ],
      onFilter: (value, record) =>
        record.project.toLowerCase().includes(value.toLowerCase()),
      filterSearch: true,
    },
    {
      title: "Total",
      dataIndex: "totalsum",
      width: 100,
      fixed: "left",
      className: "opaque-col",
      align: "center",
    }
  );

  renderMonthColumn();

  function renderMonthColumn() {
    // days of Month as title

    const momentObj = moment();
    const daysInCurrentMonth = momentObj.daysInMonth(); // 31
    const nameOfCurrentMonth = momentObj.format("MMM"); // Jul
    const numberOfCurrentMonth = momentObj.format("MM"); // "07" for July
    const currentYear = momentObj.format("YYYY"); // 2022

    var oneDate = moment(
      "01-" + numberOfCurrentMonth + "-" + currentYear,
      "DD-MM-YYYY"
    ); // this will make an object of moment for the very first date of every month

    var nameOfDay = oneDate.format("ddd"); // "Fri" as first day of month july
    var dayObj = "";

    for (var i = 1; i <= daysInCurrentMonth; i++) {
      columns.push({
        title: (
          <span>
            {i} {nameOfCurrentMonth}{" "}
            <span className="nameOfDay-styling">{nameOfDay}</span>
          </span>
        ), // 1 Jul
        dataIndex: `date${i}`, // date1
        width: 80,
        key: `${i}`, // 1
        editable: true,
        align: "center",
        className: setCustomClassName(
          nameOfDay,
          currentYear,
          numberOfCurrentMonth,
          i
        ),
      });

      dayObj = oneDate.add(1, "day"); // will keep increasing date along with for loop
      nameOfDay = dayObj.format("ddd"); // "Sat" as day of month july and will go on along with for loop
    }
  }

  columns.push({
    title: "Operation",
    width: 120,
    fixed: "right",
    align: "center",
    className: "opaque-col",
    dataIndex: "operation",
    render: (_, record) => {
      const editable = isEditing(record);
      return editable ? (
        <span>
          <Typography.Link
            onClick={() => save(record.key)}
            style={{
              marginRight: 8,
            }}
          >
            Save
          </Typography.Link>
          <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
            <a>Cancel</a>
          </Popconfirm>
        </span>
      ) : (
        <Typography.Link
          disabled={editingKey !== ""}
          onClick={() => edit(record)}
        >
          Edit
        </Typography.Link>
      );
    },
  });

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const onChange = (pagination, filters, extra) => {
    console.log("params", pagination, filters, extra);
  };

  const handleAdd = () => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newRow = {
      project: "Project" + randomNumber,
      totalsum: "0",
    };

    setData((pre) => {
      return [...pre, newRow];
    });
  };

  return (
    <div style={{ margin: "30px" }}>
      {activityLoader ? (
        <div>
          <Button
            onClick={handleAdd}
            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            Add a row
          </Button>
          <Form form={form} component={false}>
            <Table
              scroll={{
                x: 1300,
              }}
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              onChange={onChange}
              dataSource={data}
              columns={mergedColumns} // mergedColumns so it can be edited
              rowClassName="editable-row"
              pagination={{
                onChange: cancel,
              }}
            />
          </Form>
        </div>
      ) : null}
    </div>
  );
}
