import React from "react";
import { Dropdown } from "monday-ui-react-core";
import "../App.css";

export default function Content() {
  return (
    <div className="content-main-container">
      <p>Person</p>
      <div className="level-input-container">
        <div className="dropdown-div">
          <Dropdown
            className="dropdown-element"
            options={[
              {
                label: "Option 1",
                value: 1,
              },
              {
                label: "Option 2",
                value: 2,
              },
              {
                label: "Option 3",
                value: 3,
              },
            ]}
            placeholder="Filter..."
          />
        </div>
      </div>
    </div>
  );
}
