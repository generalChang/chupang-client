import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Input, Button, Form, Divider, message } from "antd";
import SingleComment from "./SingleComment";
import axios from "axios";
import { useSelector } from "react-redux";
const { TextArea } = Input;
function Comment(props) {
  const [content, setContent] = useState("");
  const user = useSelector((state) => state.user);
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const renderComments =
    props &&
    props.comments &&
    props.comments.map((comment, index) => {
      return <SingleComment key={index} comment={comment} />;
    });

  const handleWriteComment = (e) => {
    e.preventDefault();
    if (!user.userData.isAuth) {
      message.warning("you have to sign in first.");
      props.history.push("/login");
      return;
    }

    if (content.trim() === "") {
      message.warning("Please input your comment!");
      return;
    }

    let body = {
      writer: user.userData._id,
      content: content,
      productId: props.productId,
    };
    axios
      .post("/api/comment/writeComment", body)
      .then((result) => {
        if (result.data.success) {
          message.success("Successfully writed comment!!!");
          setContent("");
          props.updateComments();
        } else {
          message.warning("Failed to write comment.. sorry..");
        }
      })
      .catch((err) => {
        message.error("Failed to write comment.. sorry..");
      });
  };
  return (
    <div>
      <Form>
        <Form.Item
          label="Comment"
          name="Comment"
          rules={[
            {
              required: true,
              message: "Please input your comment!",
            },
          ]}
        >
          <TextArea rows={3} onChange={handleContentChange} value={content} />
          <Button
            style={{ float: "right", marginTop: "1rem" }}
            type="default"
            danger
            onClick={handleWriteComment}
            htmlType="submit"
          >
            submit
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      {renderComments}
    </div>
  );
}

export default withRouter(Comment);
