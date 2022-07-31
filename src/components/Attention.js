import React from "react";
import { AttentionBox } from "monday-ui-react-core";

export default function Attention() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "250px",
      }}
    >
      <AttentionBox
        title="This is an attention box!"
        text="It does nothing here!"
        className="monday-style-attention-box_boxx"
      />
    </div>
  );
}
