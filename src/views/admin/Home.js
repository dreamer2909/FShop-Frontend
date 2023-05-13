import { Row, Col } from "antd";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/admin/SideBar";
import React from "react";

const AdminHome = () => {
  return (
    <>
      <Row>
        <Col span={4}>
          <SideBar />
        </Col>
        <Col span={20}>
          <Outlet />
        </Col>
      </Row>
    </>
  );
};

export default AdminHome;
