import React, { Component } from "react";
import { Form, Input, Modal } from "antd";
const { TextArea } = Input;
class EditDepartamentForm extends Component {
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
    const { id, name, description } = currentRowData;
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
          <Form.Item label="Nombre:">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "Por favor ingrese el nombre de departamento!" }],
              initialValue: name,
            })(<Input placeholder="Por favor ingrese el nombre del departamento" />)}
          </Form.Item>
          <Form.Item label="Descripción:">
            {getFieldDecorator("description", {
              initialValue: description,
            })(<TextArea rows={4} placeholder="Por favor ingrese la descripción del departamento" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "EditDepartamentForm" })(EditDepartamentForm);
