import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input, Form, message, Button } from "antd";
import axios from "axios";
function UpdatePasswordPage(props) {
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.user);

  const onPasswordChange = (e) => {
    setPassword(e.currentTarget.value);
  };
  const handlePasswordUpdate = (e) => {
    e.preventDefault();

    if (password.trim() === "") {
      message.warning("Please input your password!!!");
      return;
    }

    let body = {
      password,
    };

    axios
      .post("/api/users/updatePassword", body)
      .then((result) => {
        if (result.data.success) {
          message.success("Successfully updated your password!!");
          props.history.push("/");
        } else {
          message.warning("Failed to update your password...");
        }
      })
      .catch((err) => {
        message.error("Error.. try it again.. sorry");
      });
  };
  return (
    <div style={{ maxWidth: "350px", margin: "4rem auto" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h3>Update Password</h3>
      </div>
      <div>
        <Form>
          <label>Password</label>
          <Input
            type="password"
            placeholder="input your password.."
            value={password}
            onChange={onPasswordChange}
          />

          <Button
            type="default"
            danger
            htmlType="submit"
            onClick={handlePasswordUpdate}
            style={{ margin: "1rem auto" }}
          >
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default withRouter(UpdatePasswordPage);
