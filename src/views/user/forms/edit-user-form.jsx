import React, { Component } from "react";
import { Form, Input, Select, Modal } from "antd";

class EditUserForm extends Component {
  render() {
    const {
      visible,
      onCancel,
      onOk,
      form,
      confirmLoading,
      currentRowData,
    } = this.props;
    const { getFieldDecorator } = form;
    const { id, name, role, email, active } = currentRowData;
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
        title="Editar"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        cancelText="Cancelar"
        okText="Guardar"
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout}>
          <Form.Item label="ID:">
            {getFieldDecorator("id", {
              initialValue: id,
            })(<Input disabled />)}
          </Form.Item>
          <Form.Item label="Nombre de usuario:">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "Por favor ingrese el nombre de usuario!" }],
              initialValue: name,
            })(<Input placeholder="Por favor ingrese el nombre de usuario" />)}
          </Form.Item>
          <Form.Item label="Rol:">
            {getFieldDecorator("role", {
              initialValue: role,
            })(
              <Select style={{ width: 120 }} disabled={id === "ROLE_ADMIN"}>
                <Select.Option value="ROLE_ADMIN">ADMIN</Select.Option>
                <Select.Option value="ROLE_USER">USER</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Email :">
            {getFieldDecorator("email", {
              initialValue: email,
            })(<Input type="email" placeholder="Por favor ingrese email del usuario" />)}
          </Form.Item>
          <Form.Item label="Activo:">
            {getFieldDecorator("active", {
              initialValue: active,
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

export default Form.create({ name: "EditUserForm" })(EditUserForm);
