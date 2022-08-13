import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
function HistoryPage(props) {
  const user = useSelector((state) => state.user);
  useEffect(() => {}, []);
  return (
    <div style={{ width: "80%", margin: "4rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h3>History</h3>
      </div>
      <br />

      <table>
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Price</th>
            <th>Quentity</th>
            <th>Date of Purchase</th>
          </tr>
        </thead>
        <tbody>
          {user &&
            user.userData &&
            user.userData.history &&
            user.userData.history.map((itemArr, index) => {
              return itemArr.map((item, index) => {
                return (
                  <tr key={item._id}>
                    <td>{item.id}</td>
                    <td>{item.price} $</td>
                    <td>{item.quentity}</td>
                    <td>{item.dateOfPurchase}</td>
                  </tr>
                );
              });
            })}
        </tbody>
      </table>
    </div>
  );
}

export default withRouter(HistoryPage);
