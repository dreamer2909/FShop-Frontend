import React, { useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import { useState } from "react"
import AddLaptopEntry from "../../../components/admin/laptop/AddLaptopEntry"
import { SERVER_URL } from "../../../constant"
import { Col, notification, Row, Typography } from "antd"
import LaptopEntry from "../../../components/admin/laptop/LaptopEntry"

const { Title } = Typography

export default function LaptopEntryList() {
  const { laptop_id } = useParams()
  const { state } = useLocation()
  const { name } = state
  const [laptopEntries, setLaptopEntries] = useState([])

  const openNotification = (type, msg) => {
    notification[type]({
      message: msg,
      duration: 1,
    })
  }

  useEffect(() => {
    getEntries()
  }, [])

  const getEntries = () => {
    fetch(SERVER_URL + `product_entries/product_id=${laptop_id}`)
        .then(response => response.json())
        .then(data => {
            setLaptopEntries(data)
          })
        .catch(err => console.log(err))
  }

  const addLaptopEntry = (laptopEntry) => {
    const data = new FormData()
    data.append("sku", laptopEntry.sku)
    data.append("image", laptopEntry.image)
    data.append("name", laptopEntry.name)
    data.append("screen", laptopEntry.screen)
    data.append("color", laptopEntry.color)
    data.append("cpu", laptopEntry.cpu)
    data.append("gpu", laptopEntry.gpu)
    data.append("ram", laptopEntry.ram)
    data.append("rom", laptopEntry.rom)
    data.append("weight", laptopEntry.weight)
    data.append("size", laptopEntry.size)
    data.append("origin", laptopEntry.origin)
    data.append("year", laptopEntry.year)
    data.append("price", laptopEntry.price)
    data.append("quantity", laptopEntry.quantity)

    fetch(SERVER_URL + `product_entries/product_id=${laptop_id}`, {
      method: "POST",
      body: data,
    })
      .then(response => {
        getEntries()
        openNotification("success", "Thêm thành công")
      })
      .catch(err => {
        console.log(err)
        openNotification("error", "Có lỗi xảy ra")
      })
  }

  const updateLaptopEntry = (laptopEntry, id) => {
    const data = new FormData()
    data.append("sku", laptopEntry.sku)
    data.append("image", laptopEntry.image)
    data.append("name", laptopEntry.name)
    data.append("screen", laptopEntry.screen)
    data.append("color", laptopEntry.color)
    data.append("cpu", laptopEntry.cpu)
    data.append("gpu", laptopEntry.gpu)
    data.append("ram", laptopEntry.ram)
    data.append("rom", laptopEntry.rom)
    data.append("weight", laptopEntry.weight)
    data.append("size", laptopEntry.size)
    data.append("origin", laptopEntry.origin)
    data.append("year", laptopEntry.year)
    data.append("price", laptopEntry.price)
    data.append("quantity", laptopEntry.quantity)

    fetch(SERVER_URL + `product_entries/${id}`, {
        method: 'PUT',
        body: data
    })
    .then(response => {
      getEntries()
      openNotification('success', 'Cập nhật thành công')
    })
    .catch(err => {
      console.log(err)
      openNotification('error', 'Có lỗi xảy ra')
    })
  }

  const deleteEntry = id => {
    if (window.confirm('Xác nhận xoá hãng sản xuất?')) {
      fetch(SERVER_URL + `product_entries/${id}`, {
          method: 'DELETE'
      })
      .then(response => {
          getEntries()
          openNotification("success", "Xoá thành công")
      })
      .catch(err => {
          console.log(err)
          openNotification("error", "Có lỗi xảy ra")
      })
    }
  }

  return (
    <div>
      <AddLaptopEntry addLaptopEntry={addLaptopEntry}/>
      <Title level={3} style={{margin: 20}}>Các phiên bản {name}</Title>
      <Row style={{paddingTop: '20px'}} gutter={[16, 16]}>
        {
            laptopEntries.map((laptopEntry, index) => 
            <Col key={index} span={8}>
              <LaptopEntry deleteEntry={deleteEntry} laptopEntry={laptopEntry} updateLaptopEntry={updateLaptopEntry}/>
            </Col>)
        }
      </Row>
    </div>
  )
}
