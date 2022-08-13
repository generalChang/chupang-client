import React, { useState } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  message,
  Typography,
  Tooltip,
} from "antd";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../_actions/user_actions";
const { Title } = Typography;

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const onChangeEmail = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      message.warning("내용을 입력해주세요");
      return;
    }

    let body = {
      email,
      password,
    };
    dispatch(login(body))
      .then((result) => {
        if (result.payload.loginSuccess) {
          message.success("Successfully logined!");
          props.history.push("/");
        } else {
          message.warning(`${result.payload.message}`);
        }
      })
      .catch((err) => {
        message.error("Error. try again later..");
      });
  };
  return (
    <div style={{ margin: "5rem auto", maxWidth: "350px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Title level={2}>Login</Title>
      </div>
      <Divider />

      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onSubmit={handleSubmit}
      >
        <Form.Item
          label="email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input type="text" value={email} onChange={onChangeEmail} />
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input type="password" value={password} onChange={onChangePassword} />
        </Form.Item>

        <Tooltip title="Reset your password!">
          <Typography.Link href="/user/resetPassword">
            Forget password?
          </Typography.Link>
        </Tooltip>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          style={{ float: "right" }}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Form>
    </div>
  );
}

export default withRouter(LoginPage);
