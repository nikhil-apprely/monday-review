import React, { useEffect, useState } from "react";
import {
  DialogContentContainer,
  Dropdown,
  Button,
  IconButton,
} from "monday-ui-react-core";
import { Add, Link, CloseSmall } from "monday-ui-react-core/dist/allIcons";

export default function FormRow({ show, setShow }) {
  const [clientData, setclientData] = useState([]);
  const [clientDropDownOptions, setClientDropDownOptions] = useState([]);
  const [projectDropDownOptions, setProjectDropDownOptions] = useState([]);
  const [projectTemp, setProjectTemp] = useState([]);
  const [mePersonData, setMePersonData] = useState([]);
  const [personDropDownOptions, setPersonDropDownOptions] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [activityDropDownOptions, setActivityDropDownOptions] = useState([]);
  const [activityTemp, setActivityTemp] = useState([]);

  function selectClientDropDown() {
    let temp = [];
    let tempProject = [];
    let test = [];
    clientData.forEach((item, index) => {
      temp.push({
        label: item.name,
        value: index,
      });
      item.column_values.forEach((column, index) => {
        if (column.text.length > 0 && index === 1) {
          // index - 1 because data is at second column on Monday board; need to find a better way to pull data
          // console.log(column.text, "27");
          test.push(tempProject.concat(column.text.split(","))); //splicing of array
        }
      });
    });
    // console.log(temp, "temporary 34");

    setClientDropDownOptions(temp);
    setProjectDropDownOptions(test);
  }

  function selectActivityOptions() {
    let temp = [];
    let tempProject = [];
    let test = [];
    activityData.forEach((item, index) => {
      temp.push({
        label: item.name,
        value: index,
      });
      item.column_values.forEach((column, index) => {
        if (column.text.length > 0 && index === 0) {
          // index - 0 because data is at second column on Monday board; need to find a better way to pull data
          // console.log(column.text, "27");
          test.push(tempProject.concat(column.text.split(","))); //splicing of array
        }
      });
    });
    console.log(temp, "temporary 34");
    console.log(test, "test 35");
    // setActivityData(temp);
    setActivityDropDownOptions(test);
  }

  function selectPersonDropDown() {
    let temp = [];
    temp.push({
      label: mePersonData.name,
      value: 0,
    });
    setPersonDropDownOptions(temp);
  }

  useEffect(() => {
    let query = `query {
      me {
    is_guest
    name
    photo_small
    id
    }
  boards (ids: 2901550931) {
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

    fetch("https://api.monday.com/v2", {
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
        setclientData(res.data.boards[0].items);
        setMePersonData(res.data.me);
      });
  }, []);

  useEffect(() => {
    // activity
    let query = `query {
     boards (ids: 2901550949) {
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

    fetch("https://api.monday.com/v2", {
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
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data.boards[0].items);
        setActivityData(response.data.boards[0].items);
        console.log(activityData, "4rd");
      });
  }, []);

  useEffect(() => {
    // console.log("hello 1", clientData);
    selectActivityOptions();
    console.log(activityData, "4rd");
  }, [mePersonData]);

  useEffect(() => {
    // console.log("hello 1", clientData);
    selectClientDropDown();
  }, [mePersonData]);

  useEffect(() => {
    // console.log("hello person", mePersonData);
    selectPersonDropDown();
  }, [mePersonData]);

  if (!show) return null;

  const activitesData = [
    {
      label: "Activity 1",
      value: 1,
    },
    {
      label: "Activity 2",
      value: 2,
    },
    {
      label: "Acitivity 3",
      value: 3,
    },
  ];
  return (
    <div
      className="main-container-form"
      style={{
        position: "absolute",
        top: "100px",
        right: "230px",
        zIndex: "1000",
      }}
    >
      <DialogContentContainer
        type={DialogContentContainer.types.POPOVER}
        size={DialogContentContainer.sizes.MEDIUM}
        className="dialog-container-form"
        style={{
          width: "1050px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", margin: "10px" }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              className="dialog-content-div-1"
              style={{ width: "220px", paddingRight: "10px" }}
            >
              <div>
                <p className="dropdown-spacing">Person</p>
              </div>
              <div>
                <Dropdown
                  className="dropdown-1"
                  options={personDropDownOptions}
                  placeholder="Select value"
                />
              </div>
            </div>
            <div
              className="dialog-content-div-2"
              style={{ width: "220px", padding: "0px 10px" }}
            >
              <div>
                <p className="dropdown-spacing">Clients</p>
              </div>
              <div>
                <Dropdown
                  className="dropdown-2"
                  options={clientDropDownOptions}
                  onChange={(e) => {
                    // console.log(e.value);
                    // console.log(projectDropDownOptions);
                    let temp = [];

                    projectDropDownOptions[e.value].forEach((item, index) => {
                      temp.push({
                        label: item,
                        value: index,
                      });
                    });

                    // console.log(temp, "184");
                    setProjectTemp(temp);
                  }}
                  placeholder="Select value"
                />
              </div>
            </div>
            <div
              className="dialog-content-div-3"
              style={{ width: "220px", padding: "0px 5px 0px 10px" }}
            >
              <div>
                <p className="dropdown-spacing">Projects</p>
              </div>
              <div>
                <Dropdown
                  className="dropdown-3"
                  options={projectTemp}
                  onChange={(e) => {
                    // console.log(e.value);
                    // console.log(projectDropDownOptions);
                    let temp = [];

                    activityDropDownOptions[e.value].forEach((item, index) => {
                      temp.push({
                        label: item,
                        value: index,
                      });
                    });

                    console.log(temp, "184");
                    setActivityTemp(temp);
                  }}
                  placeholder="Select value"
                />
              </div>
            </div>
            <div
              className="dialog-content-div-3-1"
              style={{ padding: "0px 0px" }}
            >
              <div>
                <p
                  className="dropdown-spacing"
                  style={{ visibility: "hidden" }}
                >
                  S
                </p>
              </div>
              <div>
                <IconButton ariaLabel="Link" icon={Link} />
              </div>
            </div>

            <div
              className="dialog-content-div-4"
              style={{ width: "220px", padding: "0 5px" }}
            >
              <div>
                <p className="dropdown-spacing">Activites</p>
              </div>
              <div>
                <Dropdown
                  className="dropdown-4"
                  options={activityTemp}
                  placeholder="Select value"
                />
              </div>
            </div>
            <div
              className="dialog-content-div-4-1"
              style={{ padding: "0px 0px" }}
            >
              <div>
                <p
                  className="dropdown-spacing"
                  style={{ visibility: "hidden" }}
                >
                  S
                </p>
              </div>
              <div>
                <IconButton ariaLabel="Link" icon={Link} />
              </div>
            </div>
            <IconButton
              ariaLabel="Close"
              icon={CloseSmall}
              onClick={() => {
                setShow(false);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              marginTop: "20px",
              marginRight: "5px",
            }}
          >
            <Button leftIcon={Add}>Add Row</Button>
          </div>
        </div>
      </DialogContentContainer>
    </div>
  );
}
