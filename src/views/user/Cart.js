import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  Empty,
  Modal,
} from "antd";
import { SERVER_URL } from "../../constant";
import { useGlobalState } from "../../context";
const { Option } = Select;

export default function Cart() {
  const getTotal = () => {
    if (JSON.parse(localStorage.getItem("items"))) {
      return JSON.parse(localStorage.getItem("items")).reduce(
        (total, item) =>
          total +
          item.price.replaceAll(".", "") *
            JSON.parse(localStorage.getItem("item_" + item.id)),
        0
      );
    }
    return 0;
  };
  const [globalState, dispatch] = useGlobalState();
  const [order, setOrder] = useState({});
  const [total, setTotal] = useState(getTotal());
  const address = require("../../data/provinces.json");
  const [city, setCity] = useState("Thành phố Hồ Chí Minh");
  const [district, setDistrict] = useState("Quận 1");
  const [ward, setWard] = useState("Phường Tân Định");

  const handleChangeOrder = (event) =>
    setOrder({ ...order, [event.target.name]: event.target.value });

  const handleChangeCity = (value) => {
    setCity(value);
  };

  const handleChangeDistrict = (value) => {
    setDistrict(value);
  };

  const handleChangeWard = (value) => {
    setWard(value);
  };

  const loading = () => {
    return (
      city && district && ward && JSON.parse(localStorage.getItem("items"))
    );
  };

  const bodyEmail = (order_id) => {
    let body = "CẢM ƠN BẠN ĐÃ MUA HÀNG TẠI FSHOP\n\n\n";
    body += `Tên khách hàng: ${order.name}\n`;
    body += `Số điện thoại: ${order.phone}\n`;
    body += `Địa chỉ: ${ward + ", " + district + ", " + city}\n\n`;
    body += `Mã đơn hàng của bạn: ${order_id}\n`;
    body += "Danh sách đơn hàng:\n";
    const items = JSON.parse(localStorage.getItem("items"));
    for (let i = 0; i < items.length; i++) {
      body += `Sản phẩm ${i + 1}:\n`;
      body += `\tTên sản phẩm: ${items[i].nameEntry}\n`;
      body += `\tĐơn giá: ${items[i].price}\n`;
      body += `\tSố lượng: ${localStorage.getItem("item_" + items[i].id)}\n`;
      body +=
        "\t****************************************************************************************************\n";
    }

    body += `\n\nTỔNG TIỀN: ${getTotal()
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ\n\n`;

    body += `Vui lòng chờ nhân viên liên lạc để xác nhận đơn hàng\n`;

    return body;
  };

  const addItem = async (order_id) => {
    const items = JSON.parse(localStorage.getItem("items"));
    console.log(items);
    for (const item of items) {
      await fetch(SERVER_URL + `item/${order_id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          quantity: JSON.parse(localStorage.getItem("item_" + item.id)),
          price: item.price.replaceAll(".", ""),
          entryId: item.id,
        }),
      });
    }
  };

  const updateQuantityEntry = async () => {
    const items = JSON.parse(localStorage.getItem("items"));
    for (const item of items) {
      await fetch(
        SERVER_URL +
          `product_entries/${item.id}/quantity=${localStorage.getItem(
            "item_" + item.id
          )}`,
        {
          method: "PUT",
        }
      );
    }
  };

  const sendEmail = async (order_id) => {
    await fetch(SERVER_URL + "order/send_email", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: order.email,
        subject: "Hoá đơn mua hàng FSHOP",
        body: bodyEmail(order_id),
      }),
    });
  };

  const handleSubmit = async () => {
    if (window.confirm("Xác nhận đặt hàng?")) {
      const paymentDTO = await (
        await fetch(SERVER_URL + "order", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            ...order,
            status: 0,
            time: new Date().getTime(),
            address: ward + ", " + district + ", " + city,
            total: total,
          }),
        })
      ).json();

      localStorage.clear();
      dispatch({ cartQuantity: 0 });
      window.location.replace(paymentDTO.url);

      // Modal.success({
      //   title: "Bạn đã đặt hàng thành công",
      //   content:
      //     "Vui lòng kiểm tra email để nhận hoá đơn. Nhân viên sẽ liên lạc với bạn sau vài phút!",
      // });

      await addItem(paymentDTO.orderId);
      await updateQuantityEntry();
      await sendEmail(paymentDTO.orderId);
      // localStorage.clear();
      // dispatch({ cartQuantity: 0 });
    }
  };

  if (JSON.parse(localStorage.getItem("items"))) {
    return (
      loading && (
        <Row>
          <Col span={12} offset={6}>
            <b style={{ fontSize: "30px" }}>Giỏ hàng</b>
            {JSON.parse(localStorage.getItem("items")).map((item, index) => (
              <Row key={index} style={{ margin: "20px 0" }}>
                <Col span={4}>
                  <Card
                    cover={
                      <img
                        alt=""
                        src={`/assets/images/laptops/${item.image}`}
                      />
                    }
                  >
                    <Button
                      type="danger"
                      size="small"
                      onClick={() => {
                        let items = JSON.parse(
                          localStorage.getItem("items")
                        )
                        items = items.filter((value) => value.id != item.id);
                        if (items.length > 0) {
                          localStorage.setItem("items", JSON.stringify(items));
                        } else {
                          localStorage.removeItem("items");
                        }
                        localStorage.removeItem("item_" + item.id);
                        setTotal(getTotal());
                        dispatch({
                          cartQuantity: globalState.cartQuantity - 1,
                        });
                      }}
                    >
                      Xoá
                    </Button>
                  </Card>
                </Col>
                <Col span={14}>
                  <b>{item.nameEntry}</b>
                  <p>Màu sắc: {item.color}</p>
                </Col>
                <Col span={6}>
                  <b>
                    {(
                      item.price.replaceAll(".", "") *
                      JSON.parse(localStorage.getItem("item_" + item.id))
                    )
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    đ
                  </b>
                  <InputNumber
                    min={1}
                    defaultValue={JSON.parse(
                      localStorage.getItem("item_" + item.id)
                    )}
                    max={Math.min(10, item.quantity)}
                    onChange={(value) => {
                      localStorage.setItem("item_" + item.id, value);
                      setTotal(getTotal());
                    }}
                  ></InputNumber>
                </Col>
              </Row>
            ))}

            <Row style={{ margin: "20px 0" }}>
              <Col span={20}>
                <b style={{ fontSize: "20px" }}>Tổng tiền</b>
              </Col>
              <Col span={4}>
                <b style={{ fontSize: "20px" }}>
                  {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ"}
                </b>
              </Col>
            </Row>

            <b>THÔNG TIN KHÁCH HÀNG</b>
            <Form name="basic" onFinish={handleSubmit}>
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
                wrapperCol={{ offset: 4, span: 16 }}
              >
                <Input
                  placeholder="Họ và tên"
                  name="name"
                  onChange={handleChangeOrder}
                />
              </Form.Item>

              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại",
                  },
                ]}
                wrapperCol={{ offset: 4, span: 16 }}
              >
                <Input
                  placeholder="Số điện thoại"
                  name="phone"
                  onChange={handleChangeOrder}
                />
              </Form.Item>

              <Form.Item name="email" wrapperCol={{ offset: 4, span: 16 }}>
                <Input
                  placeholder="Email"
                  name="email"
                  onChange={handleChangeOrder}
                />
              </Form.Item>

              <b>ĐỊA CHỈ NHẬN HÀNG</b>
              <Form.Item>
                <Select
                  defaultValue={city}
                  onChange={handleChangeCity}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >{address.map((add, index) => (
                    <Option key={index} value={add.name}>
                      {add.name}
                    </Option>
                  ))}</Select>
              </Form.Item>

              <Form.Item
                name="district"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại",
                  },
                ]}
              >
                <Select
                  defaultValue="Chọn Quận/ Huyện"
                  onChange={handleChangeDistrict}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {address
                    .filter((add) => add.name === city)[0]
                    .districts.map((add, index) => (
                      <Option key={index} value={add.name}>
                        {add.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="ward"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại",
                  },
                ]}
              >
                <Select
                  defaultValue="Chọn Phường/ Xã"
                  onChange={handleChangeWard}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {address
                    .filter((add) => add.name === city)[0]
                    .districts.filter((d) => d.name === district)[0] &&
                    address
                      .filter((add) => add.name === city)[0]
                      .districts.filter((d) => d.name === district)[0]
                      .wards.map(
                        (w, index) =>
                          ward && (
                            <Option key={index} value={w.name}>
                              {w.name}
                            </Option>
                          )
                      )}
                </Select>
              </Form.Item>

              <Form.Item>
                <Input placeholder="Yêu cầu khác (không bắt buộc)"></Input>
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ left: "calc(50% - 32px)" }}
                  type="danger"
                  htmlType="submit"
                >
                  Đặt hàng
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      )
    );
  }
  return <Empty description="Không có sản phẩm nào trong giỏ hàng" />;
}
