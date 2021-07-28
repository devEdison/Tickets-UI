import React, { Component } from "react";
import { Form, Input, Select, Modal, Icon } from "antd";
//import { reqValidatUserID } from "@/api/user";
class AddUserForm extends Component {
  render() {
    const { visible, onCancel, onOk, form, confirmLoading } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        sm: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 16 },
      },
    };
    return (
      <Modal
        title="Nuevo"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        cancelText="Cancelar"
        okText="Guardar"
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout}>
        <Form.Item label="Usuario:">
              {getFieldDecorator("userName", {
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
          <Form.Item label="Rol:">
            {getFieldDecorator("roles", {
              initialValue: "ROLE_ADMIN",
            })(
              <Select style={{ width: 120 }}>
                <Select.Option value="ROLE_ADMIN">ADMIN</Select.Option>
                <Select.Option value="ROLE_USER">USER</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Contraseña:">
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
          <Form.Item label="Repetir contraseña:">
            {getFieldDecorator("retrypassword", {
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
                placeholder="Repetir Contraseña"
              />
            )}
          </Form.Item>
          <Form.Item label="Email:">
            {getFieldDecorator("email", {
            })(<Input type="email" placeholder="Por favor ingrese email del usuario" />)}
          </Form.Item>
          <Form.Item label="Activo:">
            {getFieldDecorator("active", {
              initialValue: "true",
            })(
              <Select style={{ width: 120 }}>
                <Select.Option value="true">Activo</Select.Option>
                <Select.Option value="false">Inactivo</Select.Option>
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "AddUserForm" })(AddUserForm);
