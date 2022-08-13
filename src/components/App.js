import React from "react";
import { Switch, Router, Route } from "react-router-dom";
import Auth from "../hoc/auth";
import Footer from "./views/Footer/Footer";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import NavBar from "./views/NavBar/NavBar";
import ProductDetailPage from "./views/ProductDetailPage/ProductDetailPage";
import ProductUploadPage from "./views/ProductUploadPage/ProductUploadPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import CartPage from "./views/CartPage/CartPage";
import PasswordResetPage from "./views/PasswordResetPage/PasswordResetPage";
import UpdatePasswordPage from "./views/UpdatePasswordPage/UpdatePasswordPage";

function App() {
  return (
    <div>
      <NavBar />
      <div style={{ minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route path="/" exact component={Auth(LandingPage, null)} />
          <Route path="/login" exact component={Auth(LoginPage, false)} />
          <Route path="/register" exact component={Auth(RegisterPage, false)} />
          <Route
            path="/upload"
            exact
            component={Auth(ProductUploadPage, true)}
          />
          <Route
            path="/product/:id"
            exact
            component={Auth(ProductDetailPage, null)}
          />

          <Route path="/user/cart" exact component={Auth(CartPage, true)} />
          <Route
            path="/user/resetPassword"
            exact
            component={Auth(PasswordResetPage, false)}
          />
          <Route
            path="/user/updatePassword"
            exact
            component={Auth(UpdatePasswordPage, true)}
          />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
