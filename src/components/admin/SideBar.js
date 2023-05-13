import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React from "react";
import { Link } from "react-router-dom";


function getItem(label, key, childen, type) {
    return {
        key, 
        childen,
        label,
        type
    }
}

const items = [
    getItem('Nhà sản xuất', 'sub1'),
    getItem('Quản lý nội bộ', 'sub2', null, [
        getItem('Sản phẩm', 'product', null, [getItem('Laptop', '1')], 'group')
    ])
]

const SideBar = () => {
    return (
        <>
            <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            >
                <Menu.Item key='1'>
                    <Link to="/admin/brand">Nhà sản xuất</Link>
                </Menu.Item>

                <SubMenu key='sub1' title='Quản lý nội bộ'>
                    <Menu.ItemGroup key='g1' title='Sản phẩm'>
                        <Menu.Item key='brand'>
                            <Link to='/admin/laptop'>Laptop</Link>
                        </Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.ItemGroup key='g2' title='Đơn hàng'>
                        <Menu.Item key='receipt1'>
                            <Link to='/admin/receipt/pending'>Đơn hàng chưa duyệt</Link>
                        </Menu.Item>
                        <Menu.Item key='receipt2'>
                            <Link to='/admin/receipt/verified'>Đơn hàng đang giao</Link>
                        </Menu.Item>
                        <Menu.Item key='receipt3'>
                            <Link to='/admin/receipt/delivered'>Đơn hàng đã giao</Link>
                        </Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.ItemGroup key='g3' title='Đánh giá'>
                        <Menu.Item key='review1'>
                            <Link to='/admin/review/pending'>
                                Đánh giá chưa duyệt
                            </Link>
                        </Menu.Item>
                        <Menu.Item key='review2'>
                            <Link to='/admin/review/verified'>
                                Đánh giá đã duyệt
                            </Link>
                        </Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>

                <Menu.Item key="customer">
                    <Link to="#">Khách hàng</Link>
                </Menu.Item>
            </Menu>
        </>
    );
}

export default SideBar;