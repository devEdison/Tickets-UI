import React, { Component } from "react";
import { Form, Input, Select, Modal, Upload, Row, Col, Button } from "antd";
const { TextArea } = Input;
const { Option } = Select;
const normFile = (e) => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const normFile2 = (e) => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList2;
};

class EditCreateForm extends Component {

  render() {
    const {
      visible,
      onCancel,
      onOk,
      form,
      confirmLoading,
      RowData,
      priority,
      status,
      category,
      kind,
      departament
    } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        title="Ver"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        cancelText="Cancelar"
        okText="Guardar"
        confirmLoading={confirmLoading}
      >
        <Form>
          <Row gutter={12}>
            <Col span={24} >
              <Form.Item label="ID:">
                {getFieldDecorator("id", {
                  initialValue: RowData.id,
                })(<Input disabled />)}
              </Form.Item>
            </Col>
            <Col span={24} >
              <Form.Item label="Título:">
                    {getFieldDecorator("title", {
                      initialValue: RowData.title,
                      rules: [
                        {
                          required: true,
                          whitespace: true,
                          message: "Por favor ingrese título.",
                        },
                      ],
                    })(
                      <Input
                        placeholder="Título"
                      />
                    )}
              </Form.Item>
              </Col>
            <Col span={24} >
            <Form.Item label="Descripcion:">
              {getFieldDecorator("description", {
                initialValue: RowData.description,
                rules: [
                        {
                          required: true,
                          whitespace: true,
                          message: "Por favor ingrese descripción.",
                        },
                      ],
              })(<TextArea rows={4} placeholder="Por favor ingrese la descripción" />)}
            </Form.Item>
            </Col>
            <Col span={12} >
              <Form.Item label="Codigo interno:">
                {getFieldDecorator("code", {
                  initialValue: RowData.code,
                })(<Input type="code" placeholder="Por favor ingrese codigo" />)}
              </Form.Item>
            </Col>
            <Col span={12} >
              <Form.Item label="Categoria:">
                {getFieldDecorator("category", {
                  initialValue: RowData.category_id,
                })(
                  <Select showSearch
                    placeholder="Seleccione categoria"
                    optionFilterProp="children"
                    >
                    {category.map(elemento =>(
                      <Option key={elemento.id} value={elemento.id}>{elemento.name}</Option>
                    )
                    )}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12} >
              <Form.Item label="Tipo:">
                {getFieldDecorator("kind", {
                  initialValue: RowData.kind_id,
                })(
                  <Select showSearch
                    placeholder="Seleccione tipo"
                    optionFilterProp="children"
                    >
                    {kind.map(elemento =>(
                      <Option key={elemento.id} value={elemento.id}>{elemento.name}</Option>
                    )
                    )}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12} >
              <Form.Item label="Prioridad:">
                {getFieldDecorator("priority", {
                  initialValue: RowData.priority_id,
                })(
                  <Select showSearch
                    placeholder="Seleccione prioridad"
                    optionFilterProp="children"
                    >
                    {priority.map(elemento =>(
                      <Option key={elemento.id} value={elemento.id}>{elemento.name}</Option>
                    )
                    )}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12} >
              <Form.Item label="Departamento:">
                {getFieldDecorator("departament", {
                  initialValue: RowData.project_id
,
                })(
                  <Select showSearch
                    placeholder="Seleccione departamento"
                    optionFilterProp="children"
                    >
                    {departament.map(elemento =>(
                      <Option key={elemento.id} value={elemento.id}>{elemento.name}</Option>
                    )
                    )}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12} >
              <Form.Item label="Estado:">
                {getFieldDecorator("status", {
                  initialValue: RowData.status_id,
                })(
                  <Select showSearch
                    placeholder="Seleccione estado"
                    optionFilterProp="children"
                    >
                    {status.map(elemento =>(
                      <Option key={elemento.id} value={elemento.id}>{elemento.name}</Option>
                    )
                    )}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12} >
              <Form.Item
                name="file"
                label="Adjunto"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                >
                <Upload name="logo" action="/upload.do" listType="text">
                  <Button>Clic para adjuntar</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12} >
              <Form.Item
                name="file2"
                label="Adjunto 2"
                valuePropName="fileList2"
                getValueFromEvent={normFile2}
                >
                <Upload name="logo" action="/upload.do" listType="text">
                  <Button >Clic para adjuntar</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "EditCreateForm" })(EditCreateForm);
