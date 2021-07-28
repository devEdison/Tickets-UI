import React, { Component } from "react";
import { Form, Input, Modal } from "antd";
import { reqValidatName } from "@/api/departaments";
const { TextArea } = Input;
class AddDepartamentForm extends Component {
  validatName = async (rule, value, callback) => {
    if (value) {
      let res = await reqValidatName(value);
      const { status } = res;
      if (status === 302) {
        callback("El departamento ya existe.");
      }
    } else {
      callback("Introduzca un nombre de departamento");
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
          <Form.Item label="Descripción:">
            {getFieldDecorator("description", {
            })(<TextArea rows={4} placeholder="Por favor ingrese la descripción" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "AddDepartamentForm" })(AddDepartamentForm);
