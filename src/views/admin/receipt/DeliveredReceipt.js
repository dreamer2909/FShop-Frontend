import { Button, notification, Table } from "antd";
import React, { useEffect, useReducer } from "react";
import { SERVER_URL } from "../../../constant";
import { tableReducer } from "../../../reducers";
import ReceiptDetail from "./ReceiptDetail";

export default function DeliveredReceipt() {
  const [receipts, dispatch] = useReducer(tableReducer, []);
  useEffect(() => {
    getDeliveredReceipts();
  }, []);

  const openNotification = (type, msg) => {
    notification[type]({
      message: msg,
      duration: 1,
    });
  };

  const getDeliveredReceipts = () => {
     fetch(SERVER_URL + `order/status=${2}`)
      .then((response) => response.json())
      .then((result) => {
        dispatch({
          type: "GET_DATA_TABLE",
          payload: result,
        });
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    {
      title: "Mã hoá đơn",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Thời gian đặt",
      dataIndex: "createdAt",
      key: "email",
    },
    {
      title: "Thông tin người đặt",
      dataIndex: "user",
      key: "user",
      render: (text, record) => (
        <>
          <p>{record.name}</p>
          <p>{record.phone}</p>
          <p>{record.address}</p>
        </>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (text, record) => (
        <>
          {record.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ"}
        </>
      ),
    },
    {
      title: "Xem chi tiết",
      key: "action1",
      render: (text, record) => <ReceiptDetail order_id={record.id} />,
    },
  ];
  return (
    <div>
      <Table dataSource={receipts} columns={columns}></Table>
    </div>
  );
}
