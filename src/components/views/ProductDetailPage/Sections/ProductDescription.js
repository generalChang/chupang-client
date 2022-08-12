import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Descriptions, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../_actions/user_actions";
import { ShoppingCartOutlined } from "@ant-design/icons";
function ProductDescription(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
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
      message.warning("로그인을 해주세요.");
      props.history.push("/login");
      return;
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
          </div>
        </div>
      )}
    </div>
  );
}

export default withRouter(ProductDescription);
