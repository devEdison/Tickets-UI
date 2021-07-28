import React, { Component } from "react";
import { Card, 
  Button, 
  Table,
  message, 
  Divider} from "antd";
import { getDepartaments, deleteDepartament, editDepartament, addDepartament } from "@/api/departaments";
import TypingCard from '@/components/TypingCard'
import EditDepartamentForm from "./forms/edit-departament-form"
import AddDepartamentForm from "./forms/add-departament-form"
const { Column } = Table;

class Departament extends Component {
  _isMounted = false;
  state = {
    data: [],
    editDepartamentModalVisible: false,
    editDepartamentModalLoading: false,
    addDepartamentModalVisible: false,
    addDepartamentModalLoading: false,
    total: 0,
    listQuery: {
      pageNumber: 1,
      pageSize: 10,
      name: ""
    },
    editModalVisible: false,
    editModalLoading: false,
    currentRowData: {
      id: 0,
      name: "",
      description: ""
    }
  };
  
  getDepartaments = async () => {
    const result = await getDepartaments()
    const { data } = result
    if (result.status === 200) {
      this.setState({
        data
      })
    }
  }

 
  
  handleEditDepartament = (row) => {
    this.setState({
      currentRowData:Object.assign({}, row),
      editDepartamentModalVisible: true,
    });
  };

  handleDeleteDepartament = (row) => {
    const { id } = row
    deleteDepartament(id).then(res => {
      message.success("Eliminado con éxito")
      this.getDepartaments();
    })
  }

  handleEditDepartamentOk = _ => {
    const { form } = this.editDepartamentFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ editModalLoading: true, });
      editDepartament(values).then((response) => {
        form.resetFields();
        this.setState({ editDepartamentModalVisible: false, editDepartamentModalLoading: false });
        message.success("Editar con éxito!")
        this.getDepartaments()
      }).catch(e => {
        if (e.response.status === 403) {
          message.error("No cuenta con los permisos requeridos.")
        }else{
          message.error("No se pudo editar. Vuelve a intentarlo.")
        }
        this.setState({ addDepartamentModalVisible: false, addDepartamentModalLoading: false });
        this.getDepartaments()
      })
      
    });
  };

  handleCancel = _ => {
    this.setState({
      editDepartamentModalVisible: false,
      addDepartamentModalVisible: false,
    });
  };

  handleAddDepartament = (row) => {
    this.setState({
      addDepartamentModalVisible: true,
    });
  };

  handleAddDepartamentOk = _ => {
    const { form } = this.addDepartamentFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ addDepartamentModalLoading: true, });
      addDepartament(values).then((response) => {
        form.resetFields();
        this.setState({ addDepartamentModalVisible: false, addDepartamentModalLoading: false });
        message.success("Agregado exitosamente!")
        this.getDepartaments()
      }).catch(e => {
        if (e.response.status === 403) {
          message.error("No cuenta con los permisos requeridos.")
        }else{
          message.error("No se pudo agregar. Vuelve a intentarlo.")
        }
        this.setState({ addDepartamentModalVisible: false, addDepartamentModalLoading: false });
        this.getDepartaments()
      })
    });
  };
  componentDidMount() {
    this._isMounted = true;
    this.getDepartaments()
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { data } = this.state
    const title = (
      <span>
        <Button type='primary' onClick={this.handleAddDepartament}>Agregar departamento</Button>
      </span>
    )
    const cardContent = `Aquí, puede administrar los departamentos de la empresa, como agregar un nuevo departamento o modificar un departamento existente en el sistema.`
    return (
      <div className="app-container">
        <TypingCard title='Gestión de departamentos' source={cardContent} />
        <br/>
        <Card title={title}>
          <Table bordered rowKey="id" dataSource={ data !== []?data:null} pagination={false}>
            <Column title="ID" dataIndex="id" key="id" align="center"/>
            <Column title="Nombre" dataIndex="name" key="name" align="center"/>
            <Column title="Descripción" dataIndex="description" key="description" align="center" />
            <Column title="Funciones" key="action" width={195} align="center"render={(text, row) => (
              <span>
                <Button type="primary" shape="circle" icon="edit" title="Editar" onClick={this.handleEditDepartament.bind(null,row)}/>
                <Divider type="vertical" />
                <Button type="primary" shape="circle" icon="delete" title="Eliminar" onClick={this.handleDeleteDepartament.bind(null,row)}/>
              </span>
            )}/>
          </Table>
        </Card>
        <EditDepartamentForm
          currentRowData={this.state.currentRowData}
          wrappedComponentRef={formRef => this.editDepartamentFormRef = formRef}
          visible={this.state.editDepartamentModalVisible}
          confirmLoading={this.state.editDepartamentModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleEditDepartamentOk}
        />  
        <AddDepartamentForm
          wrappedComponentRef={formRef => this.addDepartamentFormRef = formRef}
          visible={this.state.addDepartamentModalVisible}
          confirmLoading={this.state.addDepartamentModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleAddDepartamentOk}
        />  
      </div>
    );
  }
}

export default Departament;
