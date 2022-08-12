import React from "react";
import { withRouter } from "react-router-dom";
import { Input } from "antd";
const { Search } = Input;
function SearchTerm(props) {
  const onSearch = (value) => {
    props.handleSearchText(value);
  };
  return (
    <div>
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        enterButton
        allowClear
      />
    </div>
  );
}

export default withRouter(SearchTerm);
