import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Form, Icon, Input, Button, message, Spin } from "antd";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import "./index.less";
import { login, getUserInfo } from "@/store/actions";
import logo from "@/assets/images/Logo.png";

const Login = (props) => {
  const { form, token, login, getUserInfo } = props;
  const { getFieldDecorator } = form;

  const [loading, setLoading] = useState(false);

  const handleLogin = (username, password) => {
   
    setLoading(true);
    login(username, password)
      .then((data) => {
        message.success("Inicio de sesión correcto");
        handleUserInfo(data.token, data.userName);
      })
      .catch((error) => {
        setLoading(false);
        message.error("Usuario o contraseña incorrecta.");
      });
  };

  const handleUserInfo = (token, userName) => {
    getUserInfo(token, userName)
      .then((data) => {})
      .catch((error) => {
        message.error("Intentelo mas tarde.");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const { username, password } = values;
        handleLogin(username, password);
      } else {
        console.log("Prueba fallida!");
      }
    });
  };

  if (token) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <DocumentTitle title={"Inicio de sesión"}>
      <div className="login-container">
        <Form onSubmit={handleSubmit} className="content" id="login-form">
        <div align="center">
          <img src={logo} width="120" height="80" alt="logo" />
        </div>
          <div className="title">
            <h2>Inicio de sesión</h2>
          </div>
          <Spin spinning={loading} tip="Iniciando sesión...">
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "Por favor ingrese el nombre de usuario.",
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Nombre de usuario"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "Por favor introduzca la contraseña.",
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Contraseña"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Iniciar sesión
              </Button>
            </Form.Item>
          </Spin>
        </Form>
      </div>
    </DocumentTitle>
  );
};

const WrapLogin = Form.create()(Login);

export default connect((state) => state.user, { login, getUserInfo })(
  WrapLogin
);
