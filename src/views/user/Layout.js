import { Menu, Typography, Space, Badge, Row, Col, Grid } from "antd";
import { ProfileOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useGlobalState } from "../../context";

const { Title } = Typography;
const { useBreakpoint } = Grid;
const Layout = () => {
  const [current, setCurrent] = useState("Laptop");
  const [state, dispatch] = useGlobalState();
  const navigate = useNavigate();


  // responsive size
  const { lg } = useBreakpoint();
  const level = lg ? 2 : 5;
  const size = lg ? "large" : "small";

  const style = {
    display: "flex",
    alignItems: "center",
  };

  const onClickSearch = (item) => {
    navigate(
      `/laptop/${item.nameEntry
        .replaceAll("/", "-")
        .replaceAll(" ", "-")}`,
      {
        state: {
          entry: item,
          laptop: item.product
        },
      }
    );
  }

  return (
    <div style={{ margin: "auto", maxWidth: "95%"}}>
      <Row>
        <Col span={4} style={style}>
          <Title style={{ textAlign: "center" }} level={level}>
            <Link to="/">FSHOP</Link>
          </Title>
        </Col>

        <Col span={10} style={style}>
          <SearchBar placeholder={'Bạn tìm gì'} onClick={onClickSearch}/>
        </Col>

        <Col span={10} style={{ display: "flex", alignItems: 'center', justifyContent: 'flex-end' }}>
          <Space size={size}>
            <Link
              to="/cart"
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                color: "#333",
                lineHeight: "14px",
              }}
            >
              <Badge count={state.cartQuantity} showZero>
                <ShoppingCartOutlined style={{ fontSize: "160%" }} />
              </Badge>
              <b> Giỏ hàng</b>
            </Link>
            <Link
              to="/receipt-status"
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                color: "#333",
                lineHeight: "14px",
              }}
            >
              <ProfileOutlined style={{ fontSize: "160%" }}/>
              <b>Tra cứu đơn hàng</b>
            </Link>

            <Link
              to="http://localhost:8080/oauth2/callback/google"
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                color: "#333",
                lineHeight: "14px",
              }}
            >
              <UserOutlined style={{ fontSize: "160%" }}/>
              <b>Đăng nhập</b>
            </Link>
          </Space>
        </Col>
      </Row>

      <Menu
        mode="horizontal"
        onClick={(e) => setCurrent(e.key)}
        selectedKeys={[current]}
        style={{ marginBottom: "20px" }}
      >
        <Menu.Item key="laptop">
          <Link to="/laptop">Laptop</Link>
        </Menu.Item>
        <Menu.Item key="dien_thoai">Điện thoại</Menu.Item>
        <Menu.Item key="tablet">Tablet</Menu.Item>
        <Menu.Item key="phu_kien">Phụ kiện</Menu.Item>
        <Menu.Item key="smart_watch">Đồng hồ thông minh</Menu.Item>
        <Menu.Item key="may_cu">Máy cũ giá rẻ</Menu.Item>
      </Menu>

      <Outlet style={{backgroundColor: '#ECF0F4'}}/>
    </div>
  );
};

export default Layout;
