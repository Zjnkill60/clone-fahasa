import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Avatar, Breadcrumb, Button, Col, Divider, Empty, Input, Rate, Row, Space, Steps, Upload, message } from "antd";
import { MinusOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import '../DetailPage/detail.scss'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { handleAddItem, handleChangeQuantity, handleDeleteItem } from "../../redux/slice/cartSlice";

const Order = () => {
    const [totalPrice, setTotalPrice] = useState(0)
    const nagivate = useNavigate()
    const dispatch = useDispatch()
    const dataCart = useSelector(state => state.cart.listItem)
    const baseURL = import.meta.env.VITE_URL_BACKEND


    const formatter = new Intl.NumberFormat({
        style: 'currency',

    });

    const handleChangeInput = (e, item) => {
        if (e.target.value <= 1) {
            e.target.value = 1
        }
        const dataBuild = {
            quantity: e.target.value,
            name: item.name
        }

        dispatch(handleChangeQuantity(dataBuild))
    }

    useEffect(() => {
        let total = 0
        dataCart?.forEach(item => {
            total += (item.quantity * item.price)
        });
        setTotalPrice(total)
    }, [dataCart])
    return (
        <Row style={{ minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
            <Col span={24}>
                <Row style={{ marginBottom: 10 }}>
                    <Col span={24} style={{ maxHeight: 30 }}>
                        <Row style={{ maxWidth: 1230, margin: '0 auto', maxHeight: 30 }}>
                            <Breadcrumb
                                style={{
                                    margin: '16px 0',
                                }}
                            >
                                <Breadcrumb.Item>TRANG CHỦ</Breadcrumb.Item>
                                <Breadcrumb.Item>GIỎ HÀNG</Breadcrumb.Item>
                            </Breadcrumb>


                        </Row>

                    </Col>
                    <Col span={24} style={{ marginTop: 10 }}>
                        <Row style={{ maxWidth: 1260, margin: '15px auto 0', backgroundColor: '#fff', padding: 20 }}>
                            <Col span={24}>
                                <Steps
                                    size="small"
                                    current={1}
                                    items={[
                                        {
                                            title: 'Giỏ Hàng',
                                        },
                                        {
                                            title: 'Cập Nhật',
                                        },
                                        {
                                            title: 'Thanh Toán',
                                        },
                                        {
                                            title: 'Done',
                                        },
                                    ]}
                                />
                            </Col>


                            <Col span={24} style={{ marginTop: 60 }}>
                                <Row>
                                    <Col span={24}>
                                        {dataCart?.length > 0 ? dataCart?.map((item, index) => {
                                            return (
                                                <>
                                                    <Row key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                                        <Col span={3}>
                                                            <Avatar src={baseURL + 'images/' + item.thumbnail} size={120} shape="square" />

                                                        </Col>
                                                        <Col span={11} style={{ fontWeight: 400, fontSize: 16 }}>
                                                            {item.name}

                                                        </Col>
                                                        <Col span={3} style={{ fontSize: 18, color: '#1677ff' }}>
                                                            {formatter.format(item.price)}đ

                                                        </Col>
                                                        <Col span={2}>
                                                            <input onChange={(e) => handleChangeInput(e, item)} style={{ width: 50, height: 40, textAlign: 'center' }} defaultValue={item.quantity} />

                                                        </Col>
                                                        <Col span={3} style={{ fontWeight: 600 }}>
                                                            Tổng : {formatter.format(item.price * item.quantity)}đ

                                                        </Col>
                                                        <Col span={1} style={{ marginLeft: 'auto' }}>
                                                            <Button onClick={() => dispatch(handleDeleteItem({ name: item.name }))} type="primary"><DeleteOutlined /></Button>
                                                        </Col>
                                                    </Row>
                                                    <Divider />
                                                </>
                                            )
                                        }) : <><Empty /></>}
                                    </Col>
                                    <Col span={24} style={{ marginTop: 50, backgroundColor: '#fafafa', padding: '20px 0' }} >
                                        <Row style={{ width: '80%', margin: '0 auto' }}>
                                            <Col span={24}>
                                                <Row style={{ display: 'flex ', justifyContent: 'space-between', marginBottom: 20 }}>
                                                    <span style={{ fontSize: 17 }}>Tổng tiền : </span>
                                                    <span style={{ fontSize: 25, color: '#1677ff', fontWeight: 600 }}>{formatter.format(totalPrice)}đ </span>
                                                </Row>
                                                <Divider />
                                                <Row>
                                                    <Button onClick={() => nagivate('checkout')} disabled={dataCart?.length > 0 ? false : true} type="primary" size="large" style={{ width: '100%', height: 45 }}>
                                                        Mua hàng ({dataCart?.length})
                                                    </Button>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>

                        </Row>
                    </Col>
                </Row>


            </Col>
        </Row>
    )
}

export default Order