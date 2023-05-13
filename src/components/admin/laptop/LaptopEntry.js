import { Button, Card, Col, Row } from 'antd'
import React from 'react'
import EditLaptopEntry from './EditLaptopEntry'

const { Meta } = Card

export default function LaptopEntry(props) {
  const onDelClick = id => {
    props.deleteEntry(id)
  }
  
  return (
    <div>
        <Card 
        hoverable
        cover={<img alt='' src={'/assets/images/laptops/' + props.laptopEntry.image}></img>}
        >
            <Meta title={props.laptopEntry.name}></Meta>
            <p>Mã: {props.laptopEntry.sku}</p>
            <p>Màn hình: {props.laptopEntry.screen}</p>
            <p>Màu sắc: {props.laptopEntry.color}</p>
            <p>CPU: {props.laptopEntry.cpu}</p>
            <p>GPU: {props.laptopEntry.gpu}</p>
            <p>RAM: {props.laptopEntry.ram}</p>
            <p>ROM: {props.laptopEntry.rom}</p>
            <p>Cân nặng: {props.laptopEntry.weight}</p>
            <p>Kích thước: {props.laptopEntry.size}</p>
            <p>Xuất xứ: {props.laptopEntry.origin}</p>
            <p>Năm sản xuất: {props.laptopEntry.year}</p>
            <p>Giá: {props.laptopEntry.price}</p>
            <p>Số lượng: {props.laptopEntry.quantity}</p>
            <Row gutter={16}>
              <Col span={12}>
                <EditLaptopEntry id={props.laptopEntry.id} updateLaptopEntry={props.updateLaptopEntry}/>
              </Col>
              <Col span={12}>
                <Button type='primary' danger onClick={() => onDelClick(props.laptopEntry.id)}>Xoá</Button>
              </Col>
            </Row>
        </Card>
    </div>
  )
}
