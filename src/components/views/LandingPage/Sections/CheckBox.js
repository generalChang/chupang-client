import React, { useState } from "react";
import { Checkbox, Collapse } from "antd";
import { withRouter } from "react-router-dom";
import { Categorys } from "../../../Config";
const { Panel } = Collapse;
function CheckBox(props) {
  const [checked, setChecked] = useState([]);

  const handleChecked = (key) => {
    let newChecked = [...checked];

    let index = newChecked.indexOf(key);
    if (index === -1) {
      //없으면
      newChecked.push(key);
    } else {
      newChecked.splice(index, 1);
    }

    setChecked(newChecked);
    props.handleFilters(newChecked);
  };
  const renderCheckList = Categorys.map((ct, index) => {
    return (
      <Checkbox
        key={index}
        onChange={() => {
          handleChecked(ct.key);
        }}
        checked={checked.indexOf(ct.key) === -1 ? false : true}
      >
        {ct.value}
      </Checkbox>
    );
  });
  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Categorys" key="0">
          {renderCheckList}
        </Panel>
      </Collapse>
    </div>
  );
}

export default withRouter(CheckBox);
