import { Row, Steps, Col, Avatar, Button, Divider, Empty, Breadcrumb, Badge, message, Result } from "antd"
import './checkout.scss'
import { HomeOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux"
import { DeleteOutlined } from '@ant-design/icons'
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CheckCircleOutlined, RightOutlined, CreditCardOutlined, SlackSquareOutlined, ShoppingCartOutlined, DownOutlined } from '@ant-design/icons'
import { Checkbox, Form, Input } from 'antd';
import { handleCreateOrder } from "../../service/api";
import { doOrderSuccess } from "../../redux/slice/cartSlice";
import { LoadingOutlined } from '@ant-design/icons';

const { TextArea } = Input;




const CheckOutPage = () => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const itemCart = useSelector(state => state.cart.listItem)
    const dataUserLogin = useSelector(state => state.account)
    const baseURL = import.meta.env.VITE_URL_BACKEND

    const [totalPrice, setTotalPrice] = useState(0)
    const [currentStep, setCurrentStep] = useState(2)
    const [showInfo, setShowInfo] = useState(false)



    const formatter = new Intl.NumberFormat({
        style: 'currency',

    });


    const onFinish = async (values) => {
        console.log('values : ', values)
        let { username, email, phone, address } = values
        let detailOrder = itemCart?.map(item => {
            return {
                id: item.id,
                name: item.name,
                quantity: +item.quantity,
                price: +item.price,
                thumbnail: item.thumbnail
            }
        })
        console.log('detailOrder', detailOrder)

        setLoading(true)
        let res = await handleCreateOrder(username, email, address, phone, totalPrice, detailOrder)
        setLoading(false)
        console.log(res)
        if (res && res.data) {
            message.success("Đơn hàng đã được gửi đi")
            setCurrentStep(3)
            dispatch(doOrderSuccess())

        } else {
            message.error(res.message)
        }

    };



    useEffect(() => {
        let total = 0
        itemCart?.forEach(item => {
            total += (item.quantity * item.price)
        });
        setTotalPrice(total)
        form.setFieldsValue({
            username: dataUserLogin?.info?.name,
            email: dataUserLogin?.info?.email,
            phone: dataUserLogin?.info?.phoneNumber
        })

    }, [itemCart])


    return (
        <div className="order-container">
            <Row style={{ maxWidth: 1260, margin: '0 auto' }}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Breadcrumb
                        className="header-order"
                    >
                        <Breadcrumb.Item>TRANG CHỦ</Breadcrumb.Item>
                        <Breadcrumb.Item>GIỎ HÀNG</Breadcrumb.Item>
                        <Breadcrumb.Item>THANH TOÁN</Breadcrumb.Item>
                    </Breadcrumb>

                </Col>
            </Row>

            <Row style={{ maxWidth: 1260, margin: '0px auto' }}>
                <Col span={24}>
                    <Row className="sm-padding" style={{ padding: 10, backgroundColor: '#f5f5f5', margin: '0px 0 20px' }} >
                        <Col xs={0} sm={0} md={24} lg={24} xl={24} style={{ height: 80, display: 'flex', alignItems: 'center' }}>
                            <Steps
                                direction="horizontal"
                                className="sm-steps"
                                size="small"
                                current={currentStep}
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
                    </Row>

                    {currentStep == 3 ?
                        <>
                            <Result
                                status="success"
                                title="Chúc mừng bạn đã đặt hàng thành công !"
                                subTitle="Đơn hàng  đã được chuyển lên sever ! Cảm ơn quý khách đã mua hàng tại Fahasa"
                                extra={[
                                    <Button onClick={() => navigate('/history')} type="primary" key="console">
                                        Xem lịch sử mua hàng
                                    </Button>,
                                    <Button onClick={() => navigate('/')} key="buy">Về trang chủ</Button>,
                                ]}
                            />
                        </>
                        :


                        <Row className="checkout-page">
                            <Col className="checkout-left" xs={24} sm={24} md={24} lg={12} xl={13}>
                                <Row gutter={[0, 15]}>
                                    <Col span={24} className="title-checkout">
                                        <SlackSquareOutlined style={{ marginRight: 15 }} />BOOKSTORE.COM
                                    </Col>

                                    <Col xs={24} sm={24} md={24} lg={0} xl={0}>
                                        <div onClick={() => setShowInfo(!showInfo)} className="show-item-checkout" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 30 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', color: '#1677ff' }}>
                                                <ShoppingCartOutlined style={{ fontSize: 20 }} />
                                                <span className="sm-showhide" style={{ margin: '0 10px' }}>{showInfo !== true ?
                                                    'Hiển thị thông tin đơn hàng' : 'Ẩn thông tin đơn hàng'}</span>
                                                <DownOutlined />
                                            </div>
                                            <span className="sm-title-price" style={{ fontSize: 22 }}>{showInfo == true ? '' : formatter.format(totalPrice) + 'đ'}</span>
                                        </div>
                                        {itemCart?.length > 0 && showInfo == true ? itemCart?.map((item, index) => {
                                            return (
                                                <>
                                                    <Row key={index} className="item-checkout">
                                                        <Col xs={6} sm={5} md={5} lg={7} xl={5} xxl={6}>
                                                            <Badge count={item.total} color="#666666">
                                                                <Avatar className="sm-avatar" shape='square' size={80} src={`${baseURL}images/book/${item?.dataBook?.thumbnail}`} />
                                                            </Badge>
                                                        </Col>
                                                        <Col xs={12} sm={10} md={10} lg={12} xl={12} xxl={12}>
                                                            <span className="bookname-checkout-item">{item?.dataBook?.mainText}</span>
                                                        </Col>


                                                        <Col xs={4} sm={3} md={2} lg={3} xl={3} xxl={2} style={{ marginLeft: 'auto' }}>
                                                            <div className="sm-price" style={{ color: '#1677ff', fontSize: 16 }} > {formatter.format(item?.dataBook?.price * item?.total)}đ</div>
                                                        </Col>


                                                    </Row>
                                                    <Divider />

                                                </>
                                            )
                                        }) : <></>
                                        }

                                        {itemCart?.length > 0 && showInfo == true ?
                                            <>
                                                <Row gutter={[5, 10]}>


                                                    <Col span={24}>
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <span>Tạm tính</span>
                                                            <span>{formatter.format(totalPrice)}đ</span>
                                                        </div>
                                                    </Col>
                                                    <Col span={24}>
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <span>Phí vận chuyển</span>
                                                            <span>Miễn phí</span>
                                                        </div>
                                                    </Col>
                                                    <Divider />

                                                    <Col span={24}>
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <span style={{ fontSize: 17 }}>Tổng cộng : </span>
                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                <span style={{ marginRight: 13, color: '#aaaaaa', fontSize: 16 }}>VND</span>
                                                                <span className="title-price-total-sm" style={{ fontSize: 30 }}>{formatter.format(totalPrice)}₫</span>
                                                            </div>
                                                        </div>
                                                    </Col>

                                                </Row>
                                                <Divider />
                                            </> : <></>}
                                    </Col>


                                    <Col span={24}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Link to="/order">Giỏ hàng </Link>
                                            <RightOutlined style={{ margin: '0 5px' }} />
                                            <span >Thông tin giao hàng </span>
                                        </div>
                                    </Col>

                                    <Col span={24}>
                                        <div className="sub-title-checkout">
                                            Thông tin giao hàng
                                        </div>
                                    </Col>

                                    {dataUserLogin.isAuthenticated == true ?
                                        <Col span={24}>
                                            <div className="account-checkout">
                                                <span>Xin chào :  </span>
                                                <span style={{ color: '#1677ff' }}>{dataUserLogin?.info?.email}</span>
                                            </div>
                                        </Col> : <Col span={24}>
                                            <div className="account-checkout">
                                                <span style={{ color: '#aaaaaa' }}>Bạn đã có tài khoản ?   </span>
                                                <Link to='/auth' style={{ color: '#1677ff' }}>Đăng nhập</Link>
                                            </div>
                                        </Col>}

                                    <Col span={24} style={{ marginTop: 10 }}>
                                        <Form
                                            name="order"
                                            onFinish={onFinish}
                                            form={form}
                                        >
                                            <Row gutter={10}>
                                                <Col span={24}>
                                                    <Form.Item

                                                        name="username"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Vui lòng nhập họ tên !',
                                                            },
                                                        ]}
                                                    >
                                                        <Input className="input-form-checkout" size="large" placeholder="Họ và tên" />
                                                    </Form.Item>
                                                </Col>

                                                <Col span={17}>
                                                    <Form.Item
                                                        name="email"

                                                    >
                                                        <Input className="input-form-checkout" size="large" placeholder="Email" />
                                                    </Form.Item>
                                                </Col>

                                                <Col span={7}>
                                                    <Form.Item

                                                        name="phone"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Vui lòng nhập sdt!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input className="input-form-checkout" size="large" placeholder="Số điện thoại" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item

                                                        name="address"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Vui lòng nhập địa chỉ!',
                                                            },
                                                        ]}
                                                    >
                                                        <TextArea className="input-form-checkout" rows={5} placeholder="Địa chỉ " />
                                                    </Form.Item>
                                                </Col>
                                            </Row>





                                        </Form>
                                    </Col>

                                    <Col span={24}>
                                        <div className="sub-title-checkout">
                                            Phương thức vận chuyển
                                        </div>
                                    </Col>

                                    <Col span={24}>
                                        <Row className="box-method-shipping">
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <CheckCircleOutlined style={{ marginRight: 15, color: '#1677ff', fontSize: 20 }} />
                                                <span style={{ color: '#444444' }}>Giao hàng tận nơi</span>
                                            </div>
                                            <div style={{ textDecoration: 'underline' }}>
                                                0đ
                                            </div>
                                        </Row>
                                    </Col>

                                    <Col span={24} style={{ marginTop: 20 }}>
                                        <div className="sub-title-checkout">
                                            Phương thức thanh toán
                                        </div>
                                    </Col>

                                    <Col span={24}>
                                        <Row className="box-method-pay">
                                            <Col>
                                                <CheckCircleOutlined style={{ marginRight: 0, color: '#1677ff', fontSize: 20 }} />
                                            </Col>
                                            <Col>
                                                <Avatar shape="square" style={{ margin: '0 15px' }} size={40} icon={<CreditCardOutlined />} />
                                            </Col>
                                            <Col className="sm-method-shipping" >
                                                Thanh toán khi giao hàng (COD)
                                            </Col>
                                        </Row>
                                        <Row className="box-pay-subtitle ">
                                            Là phương thức khách hàng nhận hàng mới trả tiền. Áp dụng với tất cả các đơn hàng trên toàn quốc
                                        </Row>
                                    </Col>

                                    <Col span={24}>
                                        <div className="btn-control-checkout">
                                            <Link to='/order'>Giỏ hàng</Link>
                                            <Button onClick={() => form.submit()} type="primary" className="btn-submit" size="large">
                                                {loading == false ? 'Hoàn tất đơn hàng' : <><LoadingOutlined /></>}
                                            </Button>
                                        </div>
                                    </Col>

                                </Row>
                            </Col>

                            <Col className="checkout-right" xs={0} sm={0} md={0} lg={12} xl={11}>
                                {itemCart?.length > 0 ? itemCart?.map((item, index) => {
                                    return (
                                        <>
                                            <Row key={index} className="item-checkout">
                                                <Col xs={5} sm={5} md={4} lg={7} xl={5} xxl={6}>
                                                    <Badge count={item.total} color="#666666">
                                                        <Avatar className="sm-avatar" shape='square' size={80} src={`${baseURL}images/${item?.thumbnail}`} />
                                                    </Badge>
                                                </Col>
                                                <Col xs={13} sm={10} md={10} lg={12} xl={12} xxl={12}>
                                                    <span className="bookname-checkout-item">{item?.name}</span>
                                                </Col>


                                                <Col xs={0} sm={0} md={0} lg={3} xl={3} xxl={2} style={{ marginLeft: 'auto' }}>
                                                    <div style={{ color: '#1677ff', fontSize: 16 }} > {formatter.format(item?.price * item?.quantity)}đ</div>
                                                </Col>


                                            </Row>
                                            <Divider />

                                        </>
                                    )
                                }) : <Empty className="xxl-empty" style={{ fontSize: 20, height: 400 }} imageStyle={{ height: 250 }}
                                    description={<Button type="primary"><Link to='/'>Về trang chủ sắm đồ đê </Link></Button>} />
                                }

                                {itemCart?.length > 0 ?
                                    <Row gutter={[5, 10]}>


                                        <Col span={24}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <span>Tạm tính</span>
                                                <span>{formatter.format(totalPrice)}đ</span>
                                            </div>
                                        </Col>
                                        <Col span={24}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <span>Phí vận chuyển</span>
                                                <span>Miễn phí</span>
                                            </div>
                                        </Col>
                                        <Divider />

                                        <Col span={24}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <span style={{ fontSize: 17 }}>Tổng cộng : </span>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <span style={{ marginRight: 13, color: '#aaaaaa', fontSize: 16 }}>VND</span>
                                                    <span style={{ fontSize: 30 }}>{formatter.format(totalPrice)}₫</span>
                                                </div>
                                            </div>
                                        </Col>

                                    </Row> : <></>}
                            </Col>
                        </Row>
                    }
                </Col>
            </Row>

        </div>
    )
}

export default CheckOutPage