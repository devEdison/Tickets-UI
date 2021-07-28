import React, { Component } from "react";
import { Card, 
  Button, 
  Table,
  message, 
  Divider} from "antd";
import { getStatus, deleteStatus, editStatus, addStatus } from "@/api/status";
import TypingCard from '@/components/TypingCard'
import EditStatusForm from "./forms/edit-status-form"
import AddStatusForm from "./forms/add-status-form"
const { Column } = Table;

class Status extends Component {
  _isMounted = false;
  state = {
    data: [],
    editStatusModalVisible: false,
    editStatusModalLoading: false,
    addStatusModalVisible: false,
    addStatusModalLoading: false,
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
  
  getStatus = async () => {
    const result = await getStatus()
    const { data } = result
    if (result.status === 200) {
      this.setState({
        data
      })
    }
  }

 
  
  handleEditStatus = (row) => {
    this.setState({
      currentRowData:Object.assign({}, row),
      editStatusModalVisible: true,
    });
  };

  handleDeleteStatus = (row) => {
    const { id } = row
    deleteStatus(id).then(res => {
      message.success("Eliminado con éxito")
      this.getStatus();
    })
  }

  handleEditStatusOk = _ => {
    const { form } = this.editStatusFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ editModalLoading: true, });
      editStatus(values).then((response) => {
        form.resetFields();
        this.setState({ editStatusModalVisible: false, editStatusModalLoading: false });
        message.success("Editar con éxito!")
        this.getStatus()
      }).catch(e => {
        if (e.response.status === 403) {
          message.error("No cuenta con los permisos requeridos.")
        }else{
          message.error("No se pudo editar. Vuelve a intentarlo.")
        }
        this.setState({ addStatusModalVisible: false, addStatusModalLoading: false });
        this.getStatus()
      })
      
    });
  };

  handleCancel = _ => {
    this.setState({
      editStatusModalVisible: false,
      addStatusModalVisible: false,
    });
  };

  handleAddStatus = (row) => {
    this.setState({
      addStatusModalVisible: true,
    });
  };

  handleAddStatusOk = _ => {
    const { form } = this.addStatusFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ addStatusModalLoading: true, });
      addStatus(values).then((response) => {
        form.resetFields();
        this.setState({ addStatusModalVisible: false, addStatusModalLoading: false });
        message.success("Agregado exitosamente!")
        this.getStatus()
      }).catch(e => {
        if (e.response.status === 403) {
          message.error("No cuenta con los permisos requeridos.")
        }else{
          message.error("No se pudo agregar. Vuelve a intentarlo.")
        }
        this.setState({ addStatusModalVisible: false, addStatusModalLoading: false });
        this.getStatus()
      })
    });
  };
  componentDidMount() {
    this._isMounted = true;
    this.getStatus()
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { data } = this.state
    const title = (
      <span>
        <Button type='primary' onClick={this.handleAddStatus}>Agregar statuso</Button>
      </span>
    )
    const cardContent = `Aquí, puede administrar los estados de una transacción, como agregar un nuevo estado o modificar un estado existente en el sistema.`
    return (
      <div className="app-container">
        <TypingCard title='Gestión de estados' source={cardContent} />
        <br/>
        <Card title={title}>
          <Table bordered rowKey="id" dataSource={ data !== []?data:null} pagination={false}>
            <Column title="ID" dataIndex="id" key="id" align="center"/>
            <Column title="Nombre" dataIndex="name" key="name" align="center"/>
            <Column title="Funciones" key="action" width={195} align="center"render={(text, row) => (
              <span>
                <Button type="primary" shape="circle" icon="edit" title="Editar" onClick={this.handleEditStatus.bind(null,row)}/>
                <Divider type="vertical" />
                <Button type="primary" shape="circle" icon="delete" title="Eliminar" onClick={this.handleDeleteStatus.bind(null,row)}/>
              </span>
            )}/>
          </Table>
        </Card>
        <EditStatusForm
          currentRowData={this.state.currentRowData}
          wrappedComponentRef={formRef => this.editStatusFormRef = formRef}
          visible={this.state.editStatusModalVisible}
          confirmLoading={this.state.editStatusModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleEditStatusOk}
        />  
        <AddStatusForm
          wrappedComponentRef={formRef => this.addStatusFormRef = formRef}
          visible={this.state.addStatusModalVisible}
          confirmLoading={this.state.addStatusModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleAddStatusOk}
        />  
      </div>
    );
  }
}

export default Status;
