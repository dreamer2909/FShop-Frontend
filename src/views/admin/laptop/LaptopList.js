import React, { useEffect, useReducer, useState } from "react";
import { SERVER_URL } from "../../../constant";
import { Table, notification, Button, Modal } from "antd";
import AddLaptop from "../../../components/admin/laptop/AddLaptop";
import { tableReducer } from "../../../reducers";
import { useNavigate } from "react-router-dom";
import Description from "../../../components/admin/Description";


export default function LaptopList () {
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hãng sản xuất",
      dataIndex: "brand",
      key: "brand",
      render: (text, record) => (
       <p>{record.brand.name}</p>
    )
    },
    {
      title: 'Phiên bản',
      dataIndex: 'entries',
      key: 'entries',
      render: (text, record) => (
        <Button onClick={() => 
          {navigate(`/admin/laptop_entries/laptop_id/${record.id}`,
            {state: {name: record.name}})}
          }>
            Xem chi tiết
        </Button>
      )
    },
    {
      title: 'Mô tả',
      dataIndex: 'desc',
      key: 'desc',
      render: (text, record) => (
        <Description product={record}/>
      )
    },
    {
      title: 'Xoá',
      dataIndex: 'delete',
      key: 'delete',
      render: (text, record) => (
        <Button onClick={() => deleteLaptop(record.id)}>
            Xoá
        </Button>
      )
    }
  ]

  const [laptops, dispatch] = useReducer(tableReducer, [])
  const [brands, setBrands] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getBrands()
    getLaptops()
  }, [])

  const getBrands = () => {
    fetch(SERVER_URL + 'brands')
    .then(response => response.json())
    .then(result => setBrands(result))
    .catch(err => console.log(err))
  }

  const getLaptops = () => {
    fetch(SERVER_URL + 'products/laptops')
      .then(response => response.json())
      .then(result => {
          dispatch({
              type: 'GET_DATA_TABLE',
              payload: result
          })
      })
      .catch(err => console.log(err))
  }

  const deleteLaptop = (id) => {
    if (window.confirm('Xác nhận xoá hãng laptop?')) {
      fetch(SERVER_URL + `products/product_id=${id}`, {
          method: 'DELETE'
      })
      .then(response => {
          getLaptops()
          openNotification("success", "Xoá thành công")
      })
      .catch(err => {
          console.log(err)
          openNotification("error", "Có lỗi xảy ra")
      })
    }
  }

  const openNotification = (type, msg) => {
    notification[type]({
      message: msg,
      duration: 1,
    })
  }

  const addLaptop = laptop => {
    fetch(SERVER_URL + "products", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(laptop)
    })
      .then(response => {
        getLaptops()
        openNotification("success", "Thêm thành công")
      })
      .catch(err => {
        console.log(err)
        openNotification("error", "Có lỗi xảy ra")
      })
  }

  return (
    <div>
        <AddLaptop
          addLaptop={addLaptop}
          laptops={laptops}
          brands = {brands}
        ></AddLaptop>
        <Table dataSource={laptops} columns={columns}></Table>
    </div>
  )
} 
