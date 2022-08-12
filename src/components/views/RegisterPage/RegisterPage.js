import React, { useState } from "react";
import { Button, Divider, Form, Input, message, Typography, Radio } from "antd";
import { withRouter } from "react-router-dom";
import { Gender } from "../../Config";
import { useDispatch } from "react-redux";
import { register } from "../../../_actions/user_actions";
import moment from "moment";
const { Title } = Typography;
function RegisterPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState(0);
  const dispatch = useDispatch();
  const onChangeEmail = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onChangeUsername = (e) => {
    setUsername(e.currentTarget.value);
  };

  const onGenderChange = (e) => {
    setGender(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !username) {
      message.warning("내용을 입력해주세요");
      return;
    }

    let body = {
      email,
      password,
      username,
      gender,
      image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
    };
    dispatch(register(body))
      .then((result) => {
        if (result.payload.success) {
          message.success("successfully signed up!!");
          props.history.push("/login");
        } else {
          message.warning("failed to sign up..");
        }
      })
      .catch((err) => {
        message.error("failed to sign up...");
      });
  };
  return (
    <div style={{ margin: "5rem auto", maxWidth: "350px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Title level={2}>Register</Title>
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
          label="username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input type="text" value={email} onChange={onChangeUsername} />
        </Form.Item>
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

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <Radio.Group onChange={onGenderChange} value={gender}>
            {Gender.map((gender, index) => {
              return (
                <Radio key={index} value={gender.value}>
                  {gender.label}
                </Radio>
              );
            })}
          </Radio.Group>
        </div>

        <Button
          type="primary"
          size="large"
          htmlType="submit"
          onClick={handleSubmit}
          style={{ float: "right" }}
        >
          Register
        </Button>
      </Form>
    </div>
  );
}

export default withRouter(RegisterPage);
