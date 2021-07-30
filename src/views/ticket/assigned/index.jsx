import React, { Component } from "react";
import { Card, Button, Table, message, Divider } from "antd";
import { getCreate, deleteCreate, editCreate, addCreate } from "@/api/assigned";
import { getCatalog, getTicketUser} from "@/api/ticket";
import TypingCard from '@/components/TypingCard'
import EditCreateForm from "./forms/edit-assigned-form"
import AddCreateForm from "./forms/add-assigned-form"
import { getUser} from "@/utils/auth";
const { Column } = Table;
class Create extends Component {
  state = {
    data: [],
    RowData: [],
    priority: [],
    status: [],
    user: [],
    category: [],
    kind: [],
    departament: [],
    editCreateModalVisible: false,
    editCreateModalLoading: false,
    currentRowData: {},
    addCreateModalVisible: false,
    addCreateModalLoading: false
  };
  getCreate = async (userName) => {
    const result = await getCreate(userName)
    const { data } = result
    if (result.status === 200) {
      this.setState({
        data
      })
    }
    this.getCatalog()
  }

  getCatalog = async () => {
    const result = await getCatalog()
    const { data } = result
    if (result.status === 200) {
      this.setState({
        priority: data.priority,
        status: data.status,
        user: data.user,
        category: data.category,
        kind: data.kind,
        departament: data.departament
      })
    }
  }

  getTicketUser = async (id) => {
    const result = await getTicketUser(id)
    const { data } = result
    if (result.status === 200) {
      this.setState({
        RowData: data[0]
      })
    }
    const {RowData} = this.state
  }

  handleEditCreate = (row) => {
    this.getTicketUser(row.id)
    this.setState({
      currentRowData:Object.assign({}, row),
      editCreateModalVisible: true,
    });
    
  };

  handleDeleteCreate = (row) => {
    const { id } = row
    deleteCreate(id).then(res => {
      message.success("Eliminado con éxito")
      this.getCreate();
    })
  }
  
  handleEditCreateOk = _ => {
    const { form } = this.editCreateFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ editModalLoading: true, });
      editCreate(values).then((response) => {
        form.resetFields();
        this.setState({ editCreateModalVisible: false, editCreateModalLoading: false });
        message.success("Editar con éxito!")
        this.getCreate()
      }).catch(e => {
        message.success("Error al editar, inténtalo de nuevo!")
      })
      
    });
  };

  handleCancel = _ => {
    this.setState({
      editCreateModalVisible: false,
      addCreateModalVisible: false,
    });
  };

  handleAddCreate = (row) => {
    this.setState({
      addCreateModalVisible: true,
    });
  };

  handleAddCreateOk = _ => {
    const { form } = this.addCreateFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ addCreateModalLoading: true, });
      addCreate(values).then((response) => {
        form.resetFields();
        this.setState({ addCreateModalVisible: false, addCreateModalLoading: false });
        message.success("Agregado exitosamente!")
        this.getCreate()
      }).catch(e => {
        message.success("No se pudo agregar. Vuelve a intentarlo.")
      })
    });
  };
  UNSAFE_componentWillMount() {
    this.getCreate(getUser())
  }
  render() {
    const { data } = this.state
    
    const cardContent = `Asignación de ticket de forma manual.`
    return (
      <div className="app-container">
        <TypingCard title='Asignar Ticket' source={cardContent} />
        <br/>
        <Card>
          <Table bordered rowKey="id" dataSource={data} pagination={false}>
            <Column title="ID" dataIndex="id" key="id" align="center"/>
            <Column title="Título" dataIndex="title" key="title1" align="center"/>
            <Column title="Asignado a" dataIndex="asigned_id" key="asigned_id" align="center"/>
            <Column title="Prioridad" dataIndex="priority_id" key="priority_id" align="center" />
            <Column title="Estado" dataIndex="status_id" key="status_id" align="center"/>
            <Column title="Funciones" key="action" width={195} align="center"render={(text, row) => (
              <span>
                <Button type="primary" shape="circle" icon="edit" title="Editar" onClick={this.handleEditCreate.bind(null,row)}/>
                <Divider type="vertical" />
                <Button type="primary" shape="circle" icon="delete" title="Eliminar" onClick={this.handleDeleteCreate.bind(null,row)}/>
              </span>
            )}/>
          </Table>
        </Card>
        <EditCreateForm
          RowData={this.state.RowData}
          priority= {this.state.priority}
          status= {this.state.status}
          user= {this.state.user}
          category= {this.state.category}
          kind= {this.state.kind}
          departament= {this.state.departament}
          currentRowData={this.state.currentRowData}
          wrappedComponentRef={formRef => this.editCreateFormRef = formRef}
          visible={this.state.editCreateModalVisible}
          confirmLoading={this.state.editCreateModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleEditCreateOk}
        />  
        <AddCreateForm
          priority= {this.state.priority}
          status= {this.state.status}
          user= {this.state.user}
          category= {this.state.category}
          kind= {this.state.kind}
          departament= {this.state.departament}
          wrappedComponentRef={formRef => this.addCreateFormRef = formRef}
          visible={this.state.addCreateModalVisible}
          confirmLoading={this.state.addCreateModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleAddCreateOk}
        />  
      </div>
    );
  }
}

export default Create;
