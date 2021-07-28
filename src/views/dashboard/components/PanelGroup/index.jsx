import React from "react";
import { Row, Col, Icon } from "antd";
import CountUp from "react-countup";
import "./index.less";

const chartList = [
  {
    type: "Visitas",
    icon: "user",
    num: 30,
    color: "#40c9c6",
  },
  {
    type: "Ticket´s Abiertos",
    icon: "message",
    num: 3,
    color: "#36a3f7",
  },
  {
    type: "Ticket´s Cerrados",
    icon: "pay-circle",
    num: 1,
    color: "#f4516c",
  },
  {
    type: "Ticke´s Asignados",
    icon: "shopping-cart",
    num: 2,
    color: "#f6ab40",
  },
];

const PanelGroup = (props) => {
  return (
    <div className="panel-group-container">
      <Row gutter={40} className="panel-group">
        {chartList.map((chart, i) => (
          <Col
            key={i}
            lg={6}
            sm={12}
            xs={12}
            className="card-panel-col"
          >
            <div className="card-panel">
              <div className="card-panel-icon-wrapper">
                <Icon
                  className={chart.type}
                  style={{ fontSize: 55, color: chart.color }}
                  type={chart.icon}
                />
              </div>
              <div className="card-panel-description">
                <p className="card-panel-text">{chart.type}</p>
                <CountUp end={chart.num} start={0} className="card-panel-num" />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PanelGroup;
