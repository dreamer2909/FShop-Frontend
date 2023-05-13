import { Button, Result } from 'antd';

export default function PaymentSuccess () {
    return (
        <Result
            status="success"
            title="Bạn đã đặt hàng thành công!"
            subTitle="Vui lòng kiểm tra email để nhận hoá đơn. Nhân viên sẽ liên lạc với bạn sau vài phút!"
        />
    )
}