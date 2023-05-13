import { Button, Form, Input, Progress, Steps, Modal, Row, Col } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../constant";

export default function ReceiptStatus() {
  const { Step } = Steps;
  const [order, setOrder] = useState(undefined);
  const [orderId, setOrderId] = useState(0);
  const [orderItems, setOrderItems] = useState([])
  const navigate = useNavigate();

  const handleSubmit = () => {
    fetch(SERVER_URL + `order/id=${orderId}`)
      .then((response) => {
        if (response.ok) return response.json()
        Modal.error({
          title: 'Mã hoá đơn không hợp lệ',
          content: 'Vui lòng nhập lại số hoá đơn',
        });
      })
      .then((result) => {
        setOrder(result);
        getOrderItems()
      })
      .catch(err => {
        console.log(err)
      })
  };

  const getOrderItems = () => {
    fetch(SERVER_URL + `item/${orderId}`)
    .then(response => response.json())
    .then(result => {
      setOrderItems(result)
      console.log(result)
    })
    .catch(err => console.log(err))
  }


  const handleChange = (event) => {
    setOrderId(event.target.value);
  };

  return (
    <div style={{ width: "60%", margin: "50px auto" }}>
      <Title level={3}>
        KIỂM TRA THÔNG TIN ĐƠN HÀNG & TÌNH TRẠNG VẬN CHUYỂN
      </Title>
      <Form>
        <Form.Item
          name="order_id"
          label="Mã đơn hàng"
          rules={[{ required: true, message: "Vui lòng nhập mã hoá đơn" }]}
        >
          <Input onChange={handleChange} name="order_id" />
        </Form.Item>
        <Form.Item>
          <Button
            style={{ left: "calc(50% - 26px)" }}
            type="danger"
            htmlType="submit"
            onClick={handleSubmit}
          >
            Kiểm tra
          </Button>
        </Form.Item>
      </Form>

      {order && (
        <>
          <Steps>
            <Step
              status={order.status == 0 ? 'process' : 'finish'}
              title="Chờ xác nhận"
            />
            <Step
              status={order.status >= 1 ? "finish" : "wait"}
              title="Đang giao"
            />
            <Step
              status={order.status >= 2 ? "finish" : "wait"}
              title="Đã giao"
            />
            <Step
              status={order.status == 3 ? "finish" : "wait"}
              title="Đánh giá"
            />
          </Steps>


          <div>
            <Progress
              style={{ marginLeft: "calc(50% - 40px)", marginTop: "50px" }}
              type="circle"
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
              percent={order.status == 0 ? 20 : order.status == 1 ? 50 : order.status == 2 ? 80 : order.status == 3 ? 100 : 80}
            />
          </div>

          {
            order.status >= 2 && (
              <>
                {orderItems.map((item, index) => (
                    <Row key={index} gutter={[8, 24]} style={{marginTop: '30px'}}>
                      <Col span={18}><Title level={5}>{item.productEntry.nameEntry}</Title></Col>
                      <Col span={6}>
                        {order.status == 3 && <Progress type="circle" percent={100} width={20} />}
                        {order.status == 2 && 
                        <Button type="primary"
                        onClick={() => {
                          let name = item.productEntry.nameEntry
                            .replaceAll("/", "-")
                            .replaceAll(" ", "-");
                          navigate(`/laptop/${name}`, {
                            state: {
                              entry: item.productEntry,
                              laptop: item.productEntry.product
                            },
                          });
                        }}
                        >Đánh giá</Button>
                        }
                      </Col>
                    </Row>
                ))}
              </>
            )
          }
        </>
      )}
    </div>
  );
}
