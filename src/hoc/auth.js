import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../_actions/user_actions";
import { message } from "antd";
export default function Auth(SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    let user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((result) => {
        if (!result.payload.isAuth) {
          if (option) {
            message.warning("로그인을 해주세요");
            props.history.push("/login");
          }
        } else {
          if (result.payload.passwordReset) {
            props.history.push("/user/updatePassword");
          }

          if (adminRoute && !result.payload.isAdmin) {
            props.history.push("/");
          } else {
            if (option === false) {
              props.history.push("/");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent {...props} user={user} />;
  }

  return AuthenticationCheck;
}
