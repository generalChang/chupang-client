import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { message, Typography, Empty } from "antd";
import UserCartBlock from "./Sections/UserCartBlock";
import {
  getCartItems,
  removeProductFromCart,
} from "../../../_actions/user_actions";

const { Title } = Typography;

function CartPage(props) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [showTotal, setShowTotal] = useState(false);
  useEffect(() => {
    let cartItems = [];
    if (user && user.userData && user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach((item, index) => {
          cartItems.push(item.id);
        });

        dispatch(getCartItems(cartItems, user.userData.cart))
          .then((result) => {
            if (result.payload.success) {
              calculateTotal(result.payload.products);
            } else {
              message.warning("Failed to view your cart items..");
            }
          })
          .catch((err) => {
            message.error("Error... try it later..");
          });
      }
    }
  }, [user.userData]);

  const removeFromCart = (productId) => {
    dispatch(removeProductFromCart(productId)).then((result) => {
      if (result.payload.success) {
        message.success("Successfully remove this product!!");
        if (result.payload.productInfo.length <= 0) {
          setShowTotal(false);
        }
      } else {
        message.warning("Failed to remove this product...");
      }
    });
  };

  const calculateTotal = (allProductsDetails) => {
    let newTotal = 0;
    allProductsDetails.forEach((item, index) => {
      newTotal += item.price * item.quentity;
    });

    setTotal(newTotal);
    setShowTotal(true);
    return newTotal;
  };
  return (
    <div style={{ width: "85%", margin: "4rem auto" }}>
      <div style={{ margin: "1rem auto" }}>
        <Title level={2}>장바구니</Title>
      </div>

      {/* 카트에 있는 상품의 디테일한 정보를 props로 넘겨주자. */}
      <UserCartBlock
        products={user.cartDetail}
        removeFromCart={removeFromCart}
      />
      {showTotal ? (
        <div style={{ marginTop: "3rem" }}>
          <h4>Total : {total} $</h4>
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
}

export default withRouter(CartPage);
