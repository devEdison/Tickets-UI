import React, { Component } from "react";
import { Card, Button, Table, message } from "antd";
import { getCreate, editCreate } from "@/api/assign";
import { getCatalog, getTicketUser} from "@/api/ticket";
import TypingCard from '@/components/TypingCard'
import EditCreateForm from "./forms/edit-assign-form"
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
  getCreate = async (assign) => {
    const result = await getCreate(assign)
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

  }

  handleEditCreate = (row) => {
    this.getTicketUser(row.id)
    this.setState({
      currentRowData:Object.assign({}, row),
      editCreateModalVisible: true,
    });
    
  };
  
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

  UNSAFE_componentWillMount() {
    this.getCreate(getUser())
  }
  render() {
    const { data } = this.state
    
    const cardContent = `Ticket asignados para su atención.`
    return (
      <div className="app-container">
        <TypingCard title='Ticket asignados' source={cardContent} />
        <br/>
        <Card>
          <Table bordered rowKey="id" dataSource={data} pagination={false}>
            <Column title="ID" dataIndex="id" key="id" align="center"/>
            <Column title="Título" dataIndex="title" key="title1" align="center"/>
            <Column title="Solicitante" dataIndex="user_id" key="asigned_id" align="center"/>
            <Column title="Prioridad" dataIndex="priority_id" key="priority_id" align="center" />
            <Column title="Estado" dataIndex="status_id" key="status_id" align="center"/>
            <Column title="Funciones" key="action" width={195} align="center"render={(text, row) => (
              <span>
                <Button type="primary" shape="circle" icon="edit" title="Editar" onClick={this.handleEditCreate.bind(null,row)}/>
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
      </div>
    );
  }
}

export default Create;
