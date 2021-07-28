import React, { Component } from "react";
import { Card, 
  Button, 
  Table,
  message, 
  Divider} from "antd";
import { getKinds, deleteKind, editKind, addKind } from "@/api/kind";
import TypingCard from '@/components/TypingCard'
import EditKindForm from "./forms/edit-kind-form"
import AddKindForm from "./forms/add-kind-form"
const { Column } = Table;

class Kind extends Component {
  _isMounted = false;
  state = {
    data: [],
    editKindModalVisible: false,
    editKindModalLoading: false,
    addKindModalVisible: false,
    addKindModalLoading: false,
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
  
  getKinds = async () => {
    const result = await getKinds()
    const { data } = result
    if (result.status === 200) {
      this.setState({
        data
      })
    }
  }

 
  
  handleEditKind = (row) => {
    this.setState({
      currentRowData:Object.assign({}, row),
      editKindModalVisible: true,
    });
  };

  handleDeleteKind = (row) => {
    const { id } = row
    deleteKind(id).then(res => {
      message.success("Eliminado con éxito")
      this.getKinds();
    })
  }

  handleEditKindOk = _ => {
    const { form } = this.editKindFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ editModalLoading: true, });
      editKind(values).then((response) => {
        form.resetFields();
        this.setState({ editKindModalVisible: false, editKindModalLoading: false });
        message.success("Editar con éxito!")
        this.getKinds()
      }).catch(e => {
        if (e.response.status === 403) {
          message.error("No cuenta con los permisos requeridos.")
        }else{
          message.error("No se pudo editar. Vuelve a intentarlo.")
        }
        this.setState({ addKindModalVisible: false, addKindModalLoading: false });
        this.getKinds()
      })
      
    });
  };

  handleCancel = _ => {
    this.setState({
      editKindModalVisible: false,
      addKindModalVisible: false,
    });
  };

  handleAddKind = (row) => {
    this.setState({
      addKindModalVisible: true,
    });
  };

  handleAddKindOk = _ => {
    const { form } = this.addKindFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ addKindModalLoading: true, });
      addKind(values).then((response) => {
        form.resetFields();
        this.setState({ addKindModalVisible: false, addKindModalLoading: false });
        message.success("Agregado exitosamente!")
        this.getKinds()
      }).catch(e => {
        if (e.response.status === 403) {
          message.error("No cuenta con los permisos requeridos.")
        }else{
          message.error("No se pudo agregar. Vuelve a intentarlo.")
        }
        this.setState({ addKindModalVisible: false, addKindModalLoading: false });
        this.getKinds()
      })
    });
  };
  componentDidMount() {
    this._isMounted = true;
    this.getKinds()
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { data } = this.state
    const title = (
      <span>
        <Button type='primary' onClick={this.handleAddKind}>Agregar Tipos</Button>
      </span>
    )
    const cardContent = `Aquí, puede administrar los tipos de la empresa, como agregar un nuevo tipos o modificar un tipo existente en el sistema.`
    return (
      <div className="app-container">
        <TypingCard title='Gestión de tipos' source={cardContent} />
        <br/>
        <Card title={title}>
          <Table bordered rowKey="id" dataSource={ data !== []?data:null} pagination={false}>
            <Column title="ID" dataIndex="id" key="id" align="center"/>
            <Column title="Nombre" dataIndex="name" key="name" align="center"/>
            <Column title="Funciones" key="action" width={195} align="center"render={(text, row) => (
              <span>
                <Button type="primary" shape="circle" icon="edit" title="Editar" onClick={this.handleEditKind.bind(null,row)}/>
                <Divider type="vertical" />
                <Button type="primary" shape="circle" icon="delete" title="Eliminar" onClick={this.handleDeleteKind.bind(null,row)}/>
              </span>
            )}/>
          </Table>
        </Card>
        <EditKindForm
          currentRowData={this.state.currentRowData}
          wrappedComponentRef={formRef => this.editKindFormRef = formRef}
          visible={this.state.editKindModalVisible}
          confirmLoading={this.state.editKindModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleEditKindOk}
        />  
        <AddKindForm
          wrappedComponentRef={formRef => this.addKindFormRef = formRef}
          visible={this.state.addKindModalVisible}
          confirmLoading={this.state.addKindModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleAddKindOk}
        />  
      </div>
    );
  }
}

export default Kind;
