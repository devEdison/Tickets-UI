import React, { Component } from "react";
import { Card, 
  Button, 
  Table,
  message, 
  Divider} from "antd";
import { getPriorities, deletePriority, editPriority, addPriority } from "@/api/priority";
import TypingCard from '@/components/TypingCard'
import EditPriorityForm from "./forms/edit-priority-form"
import AddPriorityForm from "./forms/add-priority-form"
const { Column } = Table;

class Priority extends Component {
  _isMounted = false;
  state = {
    data: [],
    editPriorityModalVisible: false,
    editPriorityModalLoading: false,
    addPriorityModalVisible: false,
    addPriorityModalLoading: false,
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
  
  getPriorities = async () => {
    const result = await getPriorities()
    const { data } = result
    if (result.status === 200) {
      this.setState({
        data
      })
    }
  }

 
  
  handleEditPriority = (row) => {
    this.setState({
      currentRowData:Object.assign({}, row),
      editPriorityModalVisible: true,
    });
  };

  handleDeletePriority = (row) => {
    const { id } = row
    deletePriority(id).then(res => {
      message.success("Eliminado con éxito")
      this.getPriorities();
    })
  }

  handleEditPriorityOk = _ => {
    const { form } = this.editPriorityFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ editModalLoading: true, });
      editPriority(values).then((response) => {
        form.resetFields();
        this.setState({ editPriorityModalVisible: false, editPriorityModalLoading: false });
        message.success("Editar con éxito!")
        this.getPriorities()
      }).catch(e => {
        if (e.response.status === 403) {
          message.error("No cuenta con los permisos requeridos.")
        }else{
          message.error("No se pudo editar. Vuelve a intentarlo.")
        }
        this.setState({ addPriorityModalVisible: false, addPriorityModalLoading: false });
        this.getPriorities()
      })
      
    });
  };

  handleCancel = _ => {
    this.setState({
      editPriorityModalVisible: false,
      addPriorityModalVisible: false,
    });
  };

  handleAddPriority = (row) => {
    this.setState({
      addPriorityModalVisible: true,
    });
  };

  handleAddPriorityOk = _ => {
    const { form } = this.addPriorityFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ addPriorityModalLoading: true, });
      addPriority(values).then((response) => {
        form.resetFields();
        this.setState({ addPriorityModalVisible: false, addPriorityModalLoading: false });
        message.success("Agregado exitosamente!")
        this.getPriorities()
      }).catch(e => {
        if (e.response.status === 403) {
          message.error("No cuenta con los permisos requeridos.")
        }else{
          message.error("No se pudo agregar. Vuelve a intentarlo.")
        }
        this.setState({ addPriorityModalVisible: false, addPriorityModalLoading: false });
        this.getPriorities()
      })
    });
  };
  componentDidMount() {
    this._isMounted = true;
    this.getPriorities()
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { data } = this.state
    const title = (
      <span>
        <Button type='primary' onClick={this.handleAddPriority}>Agregar departamento</Button>
      </span>
    )
    const cardContent = `Aquí, puede administrar las prioridades de la empresa, como agregar una nueva prioridad o modificar una prioridad existente en el sistema.`
    return (
      <div className="app-container">
        <TypingCard title='Gestión de prioridad' source={cardContent} />
        <br/>
        <Card title={title}>
          <Table bordered rowKey="id" dataSource={ data !== []?data:null} pagination={false}>
            <Column title="ID" dataIndex="id" key="id" align="center"/>
            <Column title="Nombre" dataIndex="name" key="name" align="center"/>
            <Column title="Funciones" key="action" width={195} align="center"render={(text, row) => (
              <span>
                <Button type="primary" shape="circle" icon="edit" title="Editar" onClick={this.handleEditPriority.bind(null,row)}/>
                <Divider type="vertical" />
                <Button type="primary" shape="circle" icon="delete" title="Eliminar" onClick={this.handleDeletePriority.bind(null,row)}/>
              </span>
            )}/>
          </Table>
        </Card>
        <EditPriorityForm
          currentRowData={this.state.currentRowData}
          wrappedComponentRef={formRef => this.editPriorityFormRef = formRef}
          visible={this.state.editPriorityModalVisible}
          confirmLoading={this.state.editPriorityModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleEditPriorityOk}
        />  
        <AddPriorityForm
          wrappedComponentRef={formRef => this.addPriorityFormRef = formRef}
          visible={this.state.addPriorityModalVisible}
          confirmLoading={this.state.addPriorityModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleAddPriorityOk}
        />  
      </div>
    );
  }
}

export default Priority;
