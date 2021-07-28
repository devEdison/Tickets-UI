import React, { useState } from "react";
import { connect } from "react-redux";
import { Drawer, Switch, Row, Col, Divider, Alert, Icon } from "antd";
import { toggleSettingPanel, changeSetting } from "@/store/actions";

const RightPanel = (props) => {
  const {
    settingPanelVisible,
    toggleSettingPanel,
    changeSetting,
    sidebarLogo: defaultSidebarLogo,
    fixedHeader: defaultFixedHeader,
    tagsView: defaultTagsView,
  } = props;

  const [sidebarLogo, setSidebarLogo] = useState(defaultSidebarLogo);
  const [fixedHeader, setFixedHeader] = useState(defaultFixedHeader);
  const [tagsView, setTagsView] = useState(defaultTagsView);

  const sidebarLogoChange = (checked) => {
    setSidebarLogo(checked);
    changeSetting({ key: "sidebarLogo", value: checked });
  };

  const fixedHeaderChange = (checked) => {
    setFixedHeader(checked);
    changeSetting({ key: "fixedHeader", value: checked });
  };

  const tagsViewChange = (checked) => {
    setTagsView(checked);
    changeSetting({ key: "tagsView", value: checked });
  };

  return (
    <div className="rightSettings">
      <Drawer
        title="Ajustes del sistema"
        placement="right"
        width={350}
        onClose={toggleSettingPanel}
        visible={settingPanelVisible}
      >
        <Row>
          <Col span={12}>
            <span>Barra lateral Logo</span>
          </Col>
          <Col span={12}>
            <Switch
              checkedChildren="Si"
              unCheckedChildren="No"
              defaultChecked={sidebarLogo}
              onChange={sidebarLogoChange}
            />
          </Col>
        </Row>
        <Divider dashed />
        <Row>
          <Col span={12}>
            <span>Header</span>
          </Col>
          <Col span={12}>
            <Switch
              checkedChildren="Si"
              unCheckedChildren="No"
              defaultChecked={fixedHeader}
              onChange={fixedHeaderChange}
            />
          </Col>
        </Row>
        <Divider dashed />
        <Row>
          <Col span={12}>
            <span>Activar Tags-View</span>
          </Col>
          <Col span={12}>
            <Switch
              checkedChildren="Si"
              unCheckedChildren="No"
              defaultChecked={tagsView}
              onChange={tagsViewChange}
            />
          </Col>
        </Row>
        <Divider dashed />
        <Row>
          <Col span={24}>
            <Alert
              message="Los desarrolladores deben tener en cuenta:"
              description="La barra de configuración solo se utiliza para la vista previa en el entorno de desarrollo y no se mostrará en el entorno de producción. Modifique manualmente el archivo de configuración /src/defaultSettings.js después de copiar"
              type="warning"
              showIcon
              icon={<Icon type="notification" />}
              style={{ marginBottom: "16px" }}
            />
          </Col>
        </Row>
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.app,
    ...state.settings,
  };
};

export default connect(mapStateToProps, { toggleSettingPanel, changeSetting })(
  RightPanel
);
