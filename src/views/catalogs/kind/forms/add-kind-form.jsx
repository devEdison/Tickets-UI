import React, { Component } from "react";
import { Form, Input, Modal } from "antd";
import { reqValidatKind } from "@/api/kind";

class AddKindForm extends Component {
  validatKind = async (rule, value, callback) => {
    if (value) {
      let res = await reqValidatKind(value);
      const { status } = res;
      if (status === 302) {
        callback("El tipo ya existe.");
      }
    } else {
      callback("Introduzca un nombre de tipo");
    }
    callback();
  };
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
          <Form.Item label="Nombre:">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "Por favor ingrese el nombre!" }],
            })(<Input placeholder="Por favor ingrese el nombre" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "AddKindForm" })(AddKindForm);
