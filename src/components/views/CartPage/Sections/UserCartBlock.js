import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from "antd";
import "./UserCartBlock.css";
import { API_URL } from "../../../Config";

function UserCartBlock(props) {
  const renderProductDetails =
    props &&
    props.products &&
    props.products.map((product, index) => {
      return (
        <tr key={index}>
          <td>
            <img
              style={{ maxHeight: "80px" }}
              src={`${API_URL}/${product.images[0]}`}
              alt="product image"
            />
          </td>
          <td>{product.quentity}</td>
          <td>{product.price} $</td>
          <td>
            <Button
              type="default"
              danger
              onClick={() => {
                props.removeFromCart(product._id);
              }}
            >
              삭제
            </Button>
          </td>
        </tr>
      );
    });
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>상품이미지</th>
            <th>내가 찜한 개수</th>
            <th>상품 가격</th>
            <th>삭제여부</th>
          </tr>
        </thead>
        <tbody>{renderProductDetails}</tbody>
      </table>
    </div>
  );
}

export default withRouter(UserCartBlock);
