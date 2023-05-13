import { PlusOutlined } from "@ant-design/icons";
import { BackTop, Button, Col, Drawer, Row } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { notification } from "antd";
import Review from "../../../components/user/Review";
import { useGlobalState } from "../../../context";
import SearchBar from "../SearchBar";

export default function LaptopDetail() {
  const { state } = useLocation();
  const { entry, laptop } = state;
  const [globalState, dispatch] = useGlobalState();
  const [visible, setVisible] = useState(false);
  const [entryCompare, setEntryCompare] = useState(undefined);

  const onClose = () => {
    setVisible(false);
    setEntryCompare(undefined);
  };

  const onClickComparation = (item) => {
    setEntryCompare(item);
  };

  const DisplaySpecs = ({ entry }) => {
    return (
      <>
        <Row style={{ marginBottom: "20px" }}>
          <b style={{ fontSize: "20px", textAlign: "center" }}>
            Thông số kỹ thuật
          </b>
        </Row>
        <Row>
          <Col span={12}>
            <p style={{ backgroundColor: "#F3F4F7", height: '45px' }}>Màn hình</p>
          </Col>
          <Col span={12}>
            <p style={{ backgroundColor: "#F3F4F7", height: '45px' }}>{entry.screen}</p>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <p style={{height: '45px' }}>CPU</p>
          </Col>
          <Col span={12}>
            <p style={{height: '45px' }}>{entry.cpu}</p>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <p style={{ backgroundColor: "#F3F4F7", height: '45px' }}>GPU</p>
          </Col>
          <Col span={12}>
            <p style={{ backgroundColor: "#F3F4F7", height: '45px' }}>{entry.gpu}</p>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <p style={{height: '45px' }}>RAM</p>
          </Col>
          <Col span={12}>
            <p style={{height: '45px' }}>{entry.ram}</p>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <p style={{ backgroundColor: "#F3F4F7", height: '45px'  }}>Ổ cứng</p>
          </Col>
          <Col span={12}>
            <p style={{ backgroundColor: "#F3F4F7", height: '45px'  }}>{entry.rom}</p>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <p style={{height: '45px' }}>Trọng lượng</p>
          </Col>
          <Col span={12}>
            <p style={{height: '45px' }}>{entry.weight}</p>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <p style={{ backgroundColor: "#F3F4F7", height: '45px' }}>Kích thước</p>
          </Col>
          <Col span={12}>
            <p style={{ backgroundColor: "#F3F4F7", height: '45px' }}>{entry.size}</p>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <p style={{height: '45px' }}>Xuất xứ</p>
          </Col>
          <Col span={12}>
            <p style={{height: '45px' }}>{entry.origin}</p>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <p style={{ backgroundColor: "#F3F4F7", height: '45px' }}>Năm</p>
          </Col>
          <Col span={12}>
            <p style={{ backgroundColor: "#F3F4F7", height: '45px' }}>{entry.year}</p>
          </Col>
        </Row>
      </>
    );
  };

  const openNotification = (type, msg) => {
    notification[type]({
      message: msg,
      duration: 1,
    });
  };

  const addItem = () => {
    if (entry.quantity == 0) {
      openNotification("info", "Sản phẩm đang tạm hết hàng");
      return;
    }
    let entry_order = { ...entry };
    if (localStorage.getItem("items")) {
      let items = JSON.parse(localStorage.getItem("items"));
      let exist = false;

      for (let i = 0; i < items.length; i++) {
        if (items[i].id === entry_order.id) {
          exist = true;
          openNotification("info", "Sản phẩm đã được thêm trong giỏ hàng");
          break;
        }
      }
      if (!exist) {
        openNotification("success", "Thêm thành công");
        items.push(entry_order);
        localStorage.setItem("items", JSON.stringify(items));
        localStorage.setItem("item_" + entry_order.id, 1);
        dispatch({ cartQuantity: globalState.cartQuantity + 1 });
      }
    } else {
      let items = [];
      items.push(entry_order);
      localStorage.setItem("items", JSON.stringify(items));
      openNotification("success", "Thêm thành công");
      localStorage.setItem("item_" + entry_order.id, 1);
      dispatch({ cartQuantity: globalState.cartQuantity + 1 });
    }
  };

  return (
    <div>
      <Drawer
        title="So sánh sản phẩm"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Row>
          <Col style={{ marginTop: "32px" }} span={12}>
            <img
              style={{ width: "58%", height: '128.675px' }}
              alt=""
              src={`/assets/images/laptops/${entry.image}`}
            ></img>
            <Row style={{ height: "60px", marginBottom: '30px' }}>
              <Title level={4}>{entry.nameEntry}</Title>
            </Row>
            <DisplaySpecs entry={entry} />
          </Col>
          <Col span={12}>
            <SearchBar
              placeholder="Chọn sản phẩm để so sánh"
              onClick={onClickComparation}
            />
            {entryCompare && (
              <>
                <img
                  style={{ width: "58%", height: '128.675px' }}
                  alt=""
                  src={`/assets/images/laptops/${entryCompare.image}`}
                ></img>
                <Row style={{ height: "60px", marginBottom: '30px' }}>
                  <Title level={4}>{entryCompare.nameEntry}</Title>
                </Row>
                <DisplaySpecs entry={entryCompare} />
              </>
            )}
          </Col>
        </Row>
      </Drawer>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <img
            style={{ width: "100%" }}
            alt=""
            src={`/assets/images/laptops/${entry.image}`}
          ></img>
        </Col>
        <Col span={12}>
          <Title level={3}>{entry.nameEntry}</Title>
          <p>SKU: {entry.sku}</p>
          <p style={{ fontSize: "20px" }}>Màu sắc: {entry.color}</p>
          <b style={{ fontSize: "30px", color: "#D42A53" }}>{entry.price}đ</b>
          <Row gutter={[16, 16]} style={{ marginTop: "100px" }}>
            <Col span={12}>
              <Button
                type="danger"
                shape="round"
                size="large"
                onClick={() => addItem()}
              >
                {entry.quantity > 0 ? "Thêm vào giỏ hàng" : "Tạm hết hàng"}
              </Button>
            </Col>
            <Col span={12}>
              <Button
                shape="round"
                icon={<PlusOutlined />}
                size="large"
                onClick={() => setVisible(true)}
              >
                So sánh
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <b style={{ fontSize: "20px" }}>
            Đánh giá chi tiết {entry.nameEntry}
          </b>
          <div dangerouslySetInnerHTML={{ __html: laptop.description }} />
        </Col>
        <Col span={12}>
          <DisplaySpecs entry={entry} />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <b style={{ fontSize: "20px", marginBottom: "20px" }}>
          Đánh giá & Nhận xét {entry.nameEntry}
        </b>
      </Row>
      <Review entry_id={entry.id} />
      <BackTop style={{ right: "4px", borderRadius: "3" }} />
    </div>
  );
}
