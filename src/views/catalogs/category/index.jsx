import React, { Component } from "react";
import { Card, 
  Button, 
  Table,
  message, 
  Divider} from "antd";
import { getCategories, deleteCategory, editCategory, addCategory } from "@/api/category";
import TypingCard from '@/components/TypingCard'
import EditCategoryForm from "./forms/edit-category-form"
import AddCategoryForm from "./forms/add-category-form"
const { Column } = Table;

class Category extends Component {
  _isMounted = false;
  state = {
    data: [],
    editCategoryModalVisible: false,
    editCategoryModalLoading: false,
    addCategoryModalVisible: false,
    addCategoryModalLoading: false,
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
      name: ""
    }
  };
  
  getCategories = async () => {
    const result = await getCategories()
    const { data } = result
    if (result.status === 200) {
      this.setState({
        data
      })
    }
  }

 
  
  handleEditCategory = (row) => {
    this.setState({
      currentRowData:Object.assign({}, row),
      editCategoryModalVisible: true,
    });
  };

  handleDeleteCategory = (row) => {
    const { id } = row
    deleteCategory(id).then(res => {
      message.success("Eliminado con éxito")
      this.getCategories();
    })
  }

  handleEditCategoryOk = _ => {
    const { form } = this.editCategoryFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ editModalLoading: true, });
      editCategory(values).then((response) => {
        form.resetFields();
        this.setState({ editCategoryModalVisible: false, editCategoryModalLoading: false });
        message.success("Editar con éxito!")
        this.getCategories()
      }).catch(e => {
        if (e.response.status === 403) {
          message.error("No cuenta con los permisos requeridos.")
        }else{
          message.error("No se pudo editar. Vuelve a intentarlo.")
        }
        this.setState({ addCategoryModalVisible: false, addCategoryModalLoading: false });
        this.getCategories()
      })
      
    });
  };

  handleCancel = _ => {
    this.setState({
      editCategoryModalVisible: false,
      addCategoryModalVisible: false,
    });
  };

  handleAddCategory = (row) => {
    this.setState({
      addCategoryModalVisible: true,
    });
  };

  handleAddCategoryOk = _ => {
    const { form } = this.addCategoryFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ addCategoryModalLoading: true, });
      addCategory(values).then((response) => {
        form.resetFields();
        this.setState({ addCategoryModalVisible: false, addCategoryModalLoading: false });
        message.success("Agregado exitosamente!")
        this.getCategories()
      }).catch(e => {
        if (e.response.status === 403) {
          message.error("No cuenta con los permisos requeridos.")
        }else{
          message.error("No se pudo agregar. Vuelve a intentarlo.")
        }
        this.setState({ addCategoryModalVisible: false, addCategoryModalLoading: false });
        this.getCategories()
      })
    });
  };
  componentDidMount() {
    this._isMounted = true;
    this.getCategories()
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { data } = this.state
    const title = (
      <span>
        <Button type='primary' onClick={this.handleAddCategory}>Agregar departamento</Button>
      </span>
    )
    const cardContent = `Aquí, puede administrar las categorias de la empresa, como agregar una nueva o modificar una categoria existente en el sistema.`
    return (
      <div className="app-container">
        <TypingCard title='Gestión de categorias' source={cardContent} />
        <br/>
        <Card title={title}>
          <Table bordered rowKey="id" dataSource={ data !== []?data:null} pagination={false}>
            <Column title="ID" dataIndex="id" key="id" align="center"/>
            <Column title="Nombre" dataIndex="name" key="name" align="center"/>
            <Column title="Funciones" key="action" width={195} align="center"render={(text, row) => (
              <span>
                <Button type="primary" shape="circle" icon="edit" title="Editar" onClick={this.handleEditCategory.bind(null,row)}/>
                <Divider type="vertical" />
                <Button type="primary" shape="circle" icon="delete" title="Eliminar" onClick={this.handleDeleteCategory.bind(null,row)}/>
              </span>
            )}/>
          </Table>
        </Card>
        <EditCategoryForm
          currentRowData={this.state.currentRowData}
          wrappedComponentRef={formRef => this.editCategoryFormRef = formRef}
          visible={this.state.editCategoryModalVisible}
          confirmLoading={this.state.editCategoryModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleEditCategoryOk}
        />  
        <AddCategoryForm
          wrappedComponentRef={formRef => this.addCategoryFormRef = formRef}
          visible={this.state.addCategoryModalVisible}
          confirmLoading={this.state.addCategoryModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleAddCategoryOk}
        />  
      </div>
    );
  }
}

export default Category;
