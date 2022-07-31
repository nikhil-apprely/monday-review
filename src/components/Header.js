import React from "react";
import { useState } from "react";
import "../App.css";
import { DatePicker } from "antd";
import { Button, IconButton, ButtonGroup } from "monday-ui-react-core";
import "monday-ui-react-core/dist/main.css";
import moment from "moment";
import {
  MoveArrowRight,
  MoveArrowLeft,
  Add,
} from "monday-ui-react-core/dist/allIcons";

import FormRow from "./FormRow/FormRow";

export default function Header({ data }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <div>
        <div className="main-container-header">
          <div className="header-start">
            <div className="arrow-toggle">
              <IconButton
                icon={MoveArrowLeft}
                kind={IconButton.kinds.SECONDARY}
                ariaLabel="Previous Week"
              />
              <IconButton
                icon={MoveArrowRight}
                kind={IconButton.kinds.SECONDARY}
                ariaLabel="Next Week"
              />
            </div>
            <div className="text-date">
              <p>{moment().format("MMMM YYYY")}</p>
            </div>
            <div className="text-start">
              <p>This Week</p>
            </div>
          </div>
          <div className="header-end">
            <div>
              <ButtonGroup
                groupAriaLabel="button group aria label"
                value={1}
                size={ButtonGroup.sizes.MEDIUM}
                options={[
                  {
                    value: 1,
                    text: "Week",
                  },
                  {
                    value: 2,
                    text: "Month",
                  },
                ]}
              />
            </div>
            <div style={{ margin: "20px" }}>
              <DatePicker />

              {/* <IconButton
                icon={Calendar}
                kind={IconButton.kinds.SECONDARY}
                ariaLabel="Calendar"
              /> */}
            </div>
            <div>
              <Button leftIcon={Add} onClick={() => setShow(true)}>
                Add Row
              </Button>
            </div>
            <div className="text-content hyper-text">
              <p>Copy from most recent work</p>
            </div>
          </div>
        </div>
        <div>
          <FormRow show={show} data={data} setShow={setShow} />
        </div>
      </div>
    </>
  );
}
