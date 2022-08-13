import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Input, Form, message, Button } from "antd";

import axios from "axios";
function PasswordResetPage(props) {
  const [email, setEmail] = useState("");

  const onEmailChange = (e) => {
    setEmail(e.currentTarget.value);
  };
  const handlePasswordReset = (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      message.warning("Please input your email");
      return;
    }

    let body = {
      email,
    };
    axios
      .post("/api/users/resetPassword", body)
      .then((result) => {
        if (result.data.success) {
          message.success("Check your email and you'll find my message^^");
        } else {
          message.warning("Failed to reset your password...");
        }
      })
      .catch((err) => {
        message.error("Error.. try it again.. sorry");
      });
  };
  return (
    <div style={{ maxWidth: "350px", margin: "4rem auto" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h3>Reset Password</h3>
      </div>
      <div>
        <Form>
          <label>Email</label>
          <Input
            type="text"
            placeholder="input your email.."
            value={email}
            onChange={onEmailChange}
          />

          <Button
            type="default"
            danger
            htmlType="submit"
            onClick={handlePasswordReset}
            style={{ margin: "1rem auto" }}
          >
            Reset
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default withRouter(PasswordResetPage);
