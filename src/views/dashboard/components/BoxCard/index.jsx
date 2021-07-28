import React, { Component } from "react";
import { Card } from "antd";
import { connect } from "react-redux";
import PanThumb from '@/components/PanThumb'
import img from '@/assets/images/fondo.png'
import './index.less'
import avatar from '@/assets/images/profile.png'
class BoxCard extends Component {
  state = {};
  
  render() {
    //const {avatar} = this.props
    return (
      <div className="box-card-component">
        <Card
          cover={
            <img
              alt="example"
              src={img}
              style={{height:"480px"}}
            />
          }
        >
          <div style={{ position: 'relative' }}>
            <PanThumb image={avatar} className="panThumb" />
          </div>
        </Card>
      </div>
    );
  }
}

export default connect((state) => state.user)(BoxCard);