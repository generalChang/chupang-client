import React, { useState } from "react";
import { Radio, Collapse } from "antd";
import { Price } from "../../../Config";
import { withRouter } from "react-router-dom";
const { Panel } = Collapse;

function RadioBox(props) {
  const [value, setValue] = useState(0);

  const onRadioChange = (e) => {
    setValue(e.target.value);
    props.handleFilters(e.target.value);
  };

  const renderRadios = Price.map((price, index) => {
    return <Radio value={price._id}>{price.name}</Radio>;
  });
  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Price" key="0">
          <Radio.Group onChange={onRadioChange} value={value}>
            {renderRadios}
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
}

export default withRouter(RadioBox);
