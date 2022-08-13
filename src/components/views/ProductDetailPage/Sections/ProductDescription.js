import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Button, Descriptions, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../_actions/user_actions";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import axios from "axios";
import { API_URL } from "../../../Config";
function ProductDescription(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [likes, setLikes] = useState(0);
  const [action, setAction] = useState(null);

  const getLikes = () => {
    let body = {};

    if (props && props.detail) {
      body = {
        productId: props.detail._id,
      };
      axios
        .post(`${API_URL}/api/like/likes`, body)
        .then((result) => {
          if (result.data.success) {
            setLikes(result.data.likesCount);
            let isliked = false;

            if (user && user.userData && user.userData.isAuth) {
              result.data.likes.forEach((like, index) => {
                if (user.userData._id === like.writer) {
                  isliked = true;
                }
              });

              if (isliked) {
                setAction("liked");
              } else {
                setAction(null);
              }
            }
          }
        })
        .catch((err) => {});
    }
  };
  useEffect(() => {
    getLikes();
  }, [props.detail, user.userData]);
  const handleAddToCart = (e) => {
    e.preventDefault();

    if (user && user.userData && user.userData.isAuth) {
      dispatch(addToCart(props.detail._id)).then((result) => {
        if (result.payload.success) {
          message.success("Successfully Add this product in your cart!");
        } else {
          message.warning("Failed to Add this product in your cart...");
        }
      });
    } else {
      message.warning("You have to sign in first!");
      props.history.push("/login");
      return;
    }
  };

  const handleLikeButton = (e) => {
    e.preventDefault();

    if (!user.userData.isAuth) {
      message.warning("you have to sign in first.");
      props.history.push("/login");
      return;
    }

    if (action === "liked") {
      //이미 좋아요를 누른상태였다면
      //좋아요 버튼을 클릭했을때 좋아요를 취소하는 기능이 되어야함.
      let body = {
        productId: props.detail._id,
      };
      axios
        .post(`${API_URL}/api/like/unlike`, body)
        .then((result) => {
          if (result.data.success) {
            message.success("Successfully canceled like to this product!!");
            getLikes();
          } else {
            message.warning("Failed to cancel like...");
          }
        })
        .catch((err) => {
          message.error("Error... try it again..");
        });
    } else {
      //좋아요를 누르지 않았떤 상태.
      let body = {
        productId: props.detail._id,
      };
      axios
        .post(`${API_URL}/api/like/uplike`, body)
        .then((result) => {
          if (result.data.success) {
            message.success("Successfully liked to this product!!");
            getLikes();
          } else {
            message.warning("Failed to like...");
          }
        })
        .catch((err) => {
          message.error("Error... try it again..");
        });
    }
  };
  return (
    <div>
      {props && props.detail && (
        <div>
          <Descriptions title="상품 정보">
            <Descriptions.Item label="Price">
              {props.detail.price}$
            </Descriptions.Item>
            <Descriptions.Item label="Sold">
              {props.detail.sold}
            </Descriptions.Item>
            <Descriptions.Item label="View">
              {props.detail.views}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {props.detail.description}
            </Descriptions.Item>
          </Descriptions>
          <br />
          <br />
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              size="large"
              type="primary"
              danger
              shape="round"
              onClick={handleAddToCart}
            >
              장바구니
            </Button>
            <Button
              size="large"
              type="default"
              shape="round"
              style={{ marginLeft: "1rem" }}
              onClick={handleLikeButton}
            >
              {action === "liked" ? (
                <LikeFilled style={{ fontSize: "1.5rem" }} />
              ) : (
                <LikeOutlined style={{ fontSize: "1.5rem" }} />
              )}{" "}
              {likes}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default withRouter(ProductDescription);
