import React, { useEffect, useReducer } from "react";
import { Button, notification, Table } from "antd";
import { SERVER_URL } from "../../../constant";
import { tableReducer } from "../../../reducers";
import ReceiptDetail from "./ReceiptDetail";

export default function PendingReceipt() {
  const [receipts, dispatch] = useReducer(tableReducer, []);
  useEffect(() => {
    getPendingReceipts();
  }, []);

  const openNotification = (type, msg) => {
    notification[type]({
      message: msg,
      duration: 1,
    });
  };

  const getPendingReceipts = () => {
    fetch(SERVER_URL + `order/status=${0}`)
      .then((response) => response.json())
      .then((result) => {
        dispatch({
          type: "GET_DATA_TABLE",
          payload: result,
        });
      })
      .catch((err) => console.log(err));
  };


  const updateStatus = (id,status) => {
    fetch(SERVER_URL + `order/id=${id}/status=${status}`, {
      method: "PUT",
    })
      .then((response) => {
        getPendingReceipts();

        openNotification("success", "Cập nhật thành công");
      })
      .catch((err) => {
        console.log(err);
        openNotification("error", "Có lỗi xảy ra");
      });
  };

  const deleteReceipt = id => {
    if (window.confirm("Xác nhận huỷ đơn hàng này?")) {
      fetch(SERVER_URL + `order/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          getPendingReceipts();
          openNotification("success", "Xoá thành công");
        })
        .catch((err) => {
          console.log(err);
          openNotification("error", "Có lỗi xảy ra");
        });
    }
  }

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
      title: "Duyệt đơn hàng",
      key: "action2",
      render: (text, record) => (
        <Button onClick={() => updateStatus(record.id, 1)}>Duyệt</Button>
      ),
    },
    {
      title: "Huỷ đơn hàng",
      key: "action3",
      render: (text, record) => (
        <Button onClick={() => deleteReceipt(record.id)}>Huỷ</Button>
      ),
    },
  ];
  return (
    <div>
      <Table dataSource={receipts} columns={columns}></Table>
    </div>
  );
}
