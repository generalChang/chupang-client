import React from "react";
import { withRouter } from "react-router-dom";
import { Avatar, Comment, Tooltip } from "antd";
function SingleComment(props) {
  return (
    props &&
    props.comment && (
      <Comment
        author={<span>{props.comment.writer.username}</span>}
        avatar={
          <Avatar src={`${props.comment.writer.image}`} alt="writer image" />
        }
        content={<p>{props.comment.content}</p>}
      />
    )
  );
}

export default withRouter(SingleComment);
