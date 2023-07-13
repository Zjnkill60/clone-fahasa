import { Avatar, Badge, Button, Col, Descriptions, Divider, Drawer, Row, Space } from 'antd';
import { useEffect, useState } from 'react';


const DrawerViewOrder = (props) => {
    const { open, setOpen, dataClick } = props
    // const [imageBookDetail, setImageBookDetail] = useState([])
    const onClose = () => {
        setOpen(false);
    };

    const formatter = new Intl.NumberFormat({
        style: 'currency',

    });

    const baseURL = import.meta.env.VITE_URL_BACKEND


    console.log(dataClick)
    return (
        <>
            <Drawer width={'50%'} title={`Đơn hàng của ${dataClick?.name} `} placement="right" onClose={onClose} open={open}>
                <Descriptions bordered>
                    <Descriptions.Item span={3} label="Họ Tên">{dataClick?.name}</Descriptions.Item>
                    <Descriptions.Item span={3} label="Số Điện Thoại">{dataClick?.phoneNumber}</Descriptions.Item>
                    <Descriptions.Item span={3} label="Địa Chỉ">{dataClick?.address}</Descriptions.Item>

                    <Descriptions.Item label="Status" span={2}>
                        <Badge status="processing" text={dataClick?.status} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Số Tiền" span={1}>
                        {formatter.format(dataClick?.totalPrice)}
                    </Descriptions.Item>

                    <Descriptions.Item label="Created At" span={3}>
                        {new Date().toISOString(dataClick?.createdAt)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At" span={3}>
                        {new Date().toISOString(dataClick?.updatedAt)}
                    </Descriptions.Item>


                </Descriptions>

                <Row style={{ marginTop: 40 }}>
                    <Col span={24}>
                        {dataClick?.item?.map(order => {
                            return (
                                <>
                                    <Row style={{ display: 'flex', alignItems: 'center' }}>
                                        <Col span={4}>
                                            <Avatar size={80} shape='square' src={baseURL + 'images/' + order?.thumbnail} />
                                        </Col>
                                        <Col span={14}>
                                            {order.name}
                                        </Col>
                                        <Col span={2}>
                                            x{order.quantity}
                                        </Col>
                                        <Col style={{ marginLeft: 'auto', fontSize: 16, color: '#1677ff' }}>
                                            {formatter.format(order.price)} đ
                                        </Col>
                                    </Row>
                                    <Divider />
                                </>
                            )
                        })}
                    </Col>
                </Row>

            </Drawer>
        </>
    )
}

export default DrawerViewOrder