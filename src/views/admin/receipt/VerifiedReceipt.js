import { Button, notification, Table } from "antd";
import React, { useEffect, useReducer } from "react";
import { SERVER_URL } from "../../../constant";
import { tableReducer } from "../../../reducers";
import ReceiptDetail from "./ReceiptDetail";

export default function VerifiedReceipt() {
  const [receipts, dispatch] = useReducer(tableReducer, []);
  useEffect(() => {
    getVerifiedReceipts();
  }, []);

  const openNotification = (type, msg) => {
    notification[type]({
      message: msg,
      duration: 1,
    });
  };

  const getVerifiedReceipts = () => {
    fetch(SERVER_URL + `order/status=${1}`)
      .then((response) => response.json())
      .then((result) => {
        dispatch({
          type: "GET_DATA_TABLE",
          payload: result,
        });
      })
      .catch((err) => console.log(err));
  };

  const updateStatus = (id, status) => {
    fetch(SERVER_URL + `order/id=${id}/status=${status}`, {
      method: "PUT",
    })
      .then((response) => {
        getVerifiedReceipts();
        openNotification("success", "Cập nhật thành công");
      })
      .catch((err) => {
        console.log(err);
        openNotification("error", "Có lỗi xảy ra");
      });
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
    {
      title: "Huỷ duyệt đơn hàng",
      key: "action2",
      render: (text, record) => (
        <Button onClick={() => updateStatus(record.id, 0)}>Huỷ duyệt</Button>
      ),
    },
    {
      title: "Giao đơn hàng",
      key: "action3",
      render: (text, record) => <Button onClick={() => updateStatus(record.id, 2)}>Đã giao</Button>,
    },
  ];
  return (
    <div>
      <Table dataSource={receipts} columns={columns}></Table>
    </div>
  );
}
