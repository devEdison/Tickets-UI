import React, { Component } from "react";
import { 
  Card, 
  Button, 
  Table, 
  message, 
  Divider, 
  Tag} from "antd";
import { getUsers, deleteUser, editUser, addUser } from "@/api/user";
import TypingCard from '@/components/TypingCard'
import EditUserForm from "./forms/edit-user-form"
import AddUserForm from "./forms/add-user-form"
const { Column } = Table;
class User extends Component {
  state = {
    data: [],
    editUserModalVisible: false,
    editUserModalLoading: false,
    currentRowData: {},
    addUserModalVisible: false,
    addUserModalLoading: false,
  };
  getUsers = async () => {
    const result = await getUsers()
    const { data } = result
    if (result.status === 200) {
      this.setState({
        data
      })
    }
  }
  handleEditUser = (row) => {
    this.setState({
      currentRowData:Object.assign({}, row),
      editUserModalVisible: true,
    });
  };

  handleDeleteUser = (row) => {
    const { id } = row
    if (id === "admin") {
      message.error("¡El usuario administrador no se puede eliminar!")
      return
    }
    deleteUser(id).then(res => {
      message.success("Eliminado con éxito")
      this.getUsers();
    })
  }
  
  handleEditUserOk = _ => {
    const { form } = this.editUserFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ editModalLoading: true, });
      editUser(values).then((response) => {
        form.resetFields();
        this.setState({ editUserModalVisible: false, editUserModalLoading: false });
        message.success("Editar con éxito!")
        this.getUsers()
      }).catch(e => {
        message.success("Error al editar, inténtalo de nuevo!")
      })
      
    });
  };

  handleCancel = _ => {
    this.setState({
      editUserModalVisible: false,
      addUserModalVisible: false,
    });
  };

  handleAddUser = (row) => {
    this.setState({
      addUserModalVisible: true,
    });
  };

  handleAddUserOk = _ => {
    const { form } = this.addUserFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ addUserModalLoading: true, });
      addUser(values).then((response) => {
        form.resetFields();
        this.setState({ addUserModalVisible: false, addUserModalLoading: false });
        message.success("Agregado exitosamente!")
        this.getUsers()
      }).catch(e => {
        message.success("No se pudo agregar. Vuelve a intentarlo.")
      })
    });
  };
  componentDidMount() {
    this.getUsers()
  }
  render() {
    const { data } = this.state
    const title = (
      <span>
        <Button type='primary' onClick={this.handleAddUser}>Agregar usuario</Button>
      </span>
    )
    const cardContent = `Aquí, puede administrar usuarios en el sistema, como agregar un nuevo usuario o modificar un usuario existente en el sistema.`
    return (
        
      <div className="app-container">
        <TypingCard title='Gestión de usuarios' source={cardContent} />
        <br/>
        <Card title={title}>
          <Table bordered rowKey="id" dataSource={data} pagination={false}>
            <Column title="ID" dataIndex="id" key="id" align="center"/>
            <Column title="Nombre" dataIndex="name" key="name" align="center"/>
            <Column title="Rol" dataIndex="roles[0].rolName" key="roles" align="center"/>
            <Column title="email" dataIndex="email" key="email" align="center" />
            <Column title="Activo" dataIndex="active" key="active" align="center" render={(active) => {
                let color =
                  active === true ? "green" : active === false ? "red" : "";
                return (
                  <Tag color={color} key={active}>
                    {active}
                  </Tag>
                );
              }}/>
            <Column title="Funciones" key="action" width={195} align="center"render={(text, row) => (
              <span>
                <Button type="primary" shape="circle" icon="edit" title="Editar" onClick={this.handleEditUser.bind(null,row)}/>
                <Divider type="vertical" />
                <Button type="primary" shape="circle" icon="delete" title="Eliminar" onClick={this.handleDeleteUser.bind(null,row)}/>
              </span>
            )}/>
          </Table>
        </Card>
        <EditUserForm
          currentRowData={this.state.currentRowData}
          wrappedComponentRef={formRef => this.editUserFormRef = formRef}
          visible={this.state.editUserModalVisible}
          confirmLoading={this.state.editUserModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleEditUserOk}
        />  
        <AddUserForm
          wrappedComponentRef={formRef => this.addUserFormRef = formRef}
          visible={this.state.addUserModalVisible}
          confirmLoading={this.state.addUserModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleAddUserOk}
        />  
      </div>
    );
  }
}

export default User;
