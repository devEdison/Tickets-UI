import React, { Component } from "react";
import { Form, Input, DatePicker, Select, Rate, Modal } from "antd";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
class EditForm extends Component {
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
    const { id, author, date, readings, star, status, title } = currentRowData;
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
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout}>
          <Form.Item label="Número de serie:">
            {getFieldDecorator("id", {
              initialValue: id,
            })(<Input disabled />)}
          </Form.Item>
          <Form.Item label="Título:">
            {getFieldDecorator("title", {
              rules: [{ required: true, message: "Por favor ingrese un titulo!" }],
              initialValue: title,
            })(<Input placeholder="Título" />)}
          </Form.Item>
          <Form.Item label="Autor:">
            {getFieldDecorator("author", {
              initialValue: author,
            })(<Input disabled />)}
          </Form.Item>
          <Form.Item label="Leyendo:">
            {getFieldDecorator("readings", {
              initialValue: readings,
            })(<Input disabled />)}
          </Form.Item>
          <Form.Item label="Recomendado:">
            {getFieldDecorator("star", {
              initialValue: star.length,
            })(<Rate count={3} />)}
          </Form.Item>
          <Form.Item label="Estado:">
            {getFieldDecorator("status", {
              initialValue: status,
            })(
              <Select style={{ width: 120 }}>
                <Select.Option value="published">published</Select.Option>
                <Select.Option value="draft">draft</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Fecha:">
            {getFieldDecorator("date", {
              rules: [{ type: 'object', required: true, message: 'Por favor elija una hora!' }],
              initialValue: moment(date || "YYYY-MM-DD HH:mm:ss"),
            })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "EditForm" })(EditForm);
