import { Col, Row, Dropdown, Space, Button, message, Badge, Popover, Avatar, Divider } from "antd"
import { Input } from 'antd';
import { SearchOutlined, BellOutlined, ShoppingCartOutlined, UserOutlined, DownOutlined, SmileOutlined } from '@ant-design/icons';
import './header.scss'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import ModalAuth from "./ModalAuth";
import { GoogleLogin } from 'react-google-login';
import { fetchAllBook, handleLoginGoogle, handleLogoutAccount } from "../../service/api";
import { useDispatch, useSelector } from "react-redux";
import { handleDispatchLogin, handleDispatchLogout } from "../../redux/slice/accountSlice";



const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [indexActive, setIndexActive] = useState(1)
    const [dataSearch, setDataSearch] = useState([])
    const dataUser = useSelector(state => state.account)
    const dataCart = useSelector(state => state.cart.listItem)
    const baseURL = import.meta.env.VITE_URL_BACKEND

    const showModal = (number) => {
        setIndexActive(number)
        setIsModalOpen(true);
    };

    const handleLogout = async () => {
        let res = await handleLogoutAccount()
        console.log(res)
        localStorage.removeItem('access_token')
        message.success('Đăng xuất thành công')
        dispatch(handleDispatchLogout())
        if (window.location.pathname != '/') {
            navigate('/auth')
        }
    }

    const responseGoogle = async (response) => {
        if (response.profileObj) {
            const { email, name, imageUrl } = response.profileObj
            let res = await handleLoginGoogle(email, name, imageUrl)
            console.log(res)
            if (res && res.data) {

                dispatch(handleDispatchLogin(res.data.newPayload))
                localStorage.setItem('access_token', res.data.access_token)
                message.success(`Xin chào ${name} !`)
                if (window.location.pathname == '/auth') {
                    navigate('/')
                }
            } else {
                message.error(res.message)
            }
        }
    }


    let items = [
        {
            key: '1',
            label: (
                <Button onClick={() => showModal(1)}
                    size="large" style={{ width: '100%', height: 45, backgroundColor: '#C92127' }} type="primary">Đăng nhập</Button>
            ),
        },
        {
            key: '2',
            label: (
                <Button onClick={() => showModal(2)}
                    size="large" style={{ width: '100%', height: 45, backgroundColor: '#fff', border: '2px solid #C92127', color: '#C92127' }}
                    type="primary">Đăng ký</Button>
            ),

        },
        {
            key: '3',
            label: (
                <GoogleLogin
                    clientId="619086820314-ucbag8u8jr1bd9thfno9aib62i010tk7.apps.googleusercontent.com"
                    buttonText="Login"
                    render={renderProps => (
                        <Button onClick={renderProps.onClick} disabled={renderProps.disabled} size='large' style={{
                            border: '1px solid #aaaaaa ',
                            width: '100%', height: 45, backgroundColor: '#fff', color: '#333'
                        }}
                            type="primary" htmlType="submit">
                            <Row>
                                <Col span={24} style={{ display: 'flex', alignItems: 'center', margin: '0 auto', }}>
                                    <img src='	https://aristino.com/Content/pc/images/icon/google.svg' />
                                    <span style={{ marginLeft: 10, fontSize: 15, color: '#666666' }}>Đăng nhập bằng Google</span>
                                </Col>
                            </Row>
                        </Button>
                    )}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                // isSignedIn={true}
                />
            ),

        }

    ];

    const itemsHaveLogin = [
        {
            key: '1',
            label: (
                <Button onClick={() => navigate('/account')}
                    size="large" style={{ width: '100%', height: 45, backgroundColor: '#C92127', border: '2px solid #C92127' }} type="primary">Thông tin cá nhân</Button>
            ),
        },
        {
            key: '2',
            label: (
                <Button
                    onClick={() => navigate('/history')}
                    size="large" style={{ width: '100%', height: 45, backgroundColor: '#C92127', border: '2px solid #C92127' }}
                    type="primary">Lịch sử đơn hàng </Button>
            ),

        },


    ];

    if (dataUser.isAuthenticated == true) {
        items.splice(0, 3)
        items = [...itemsHaveLogin]
        if (dataUser.info?.role == "ADMIN") {
            items.unshift({
                key: '4',
                label: (
                    <Button onClick={() => navigate('/admin')}
                        size="large" style={{ width: '100%', height: 45, backgroundColor: '#C92127', border: '2px solid #C92127' }}
                        type="primary">Trang quản trị viên </Button>
                ),

            },)
        }
        items.push({
            key: '5',
            label: (
                <Button onClick={handleLogout}
                    size="large" style={{ width: '100%', height: 45, backgroundColor: '#fff', border: '2px solid #C92127', color: '#C92127' }}
                    type="primary">Đăng xuất </Button>
            ),

        },)
    }
    const formatter = new Intl.NumberFormat({
        style: 'currency',

    });

    var slug = function (str) {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
        var to = "aaaaaeeeeeiiiiooooouuuunc------";
        for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes

        return str;
    };

    const handleNavigateBook = (e, book) => {
        e.stopPropagation()
        const path = slug(book?.name)
        navigate(`/book/${path}?id=${book?.id}`)

    }

    const handleNavigateBook2 = (e, book) => {
        e.stopPropagation()
        const path = slug(book?.mainText)
        navigate(`/book/${path}?id=${book?._id}`)

    }

    const handleNavigateAuth = () => {
        if (dataUser.isAuthenticated == true) {
            navigate('/account')
        } else {
            navigate('/auth')
        }
    }

    const handleChangeInput = async (e) => {
        let res = await fetchAllBook()
        console.log(res)
        if (res && res.data) {
            let dataSerach = res.data?.listproduct?.filter(book => {
                return book?.mainText?.toLowerCase().includes(e.target.value)
            })
            setDataSearch(dataSerach)
        }
    }

    const contentCart = (
        <>
            {dataCart?.length > 0 ? dataCart?.map((item, index) => {
                return (
                    <>
                        <Row style={{ width: 550 }} key={index} onClick={(e) => handleNavigateBook(e, item)}>
                            <Col span={5}>
                                <Avatar src={baseURL + 'images/' + item?.thumbnail} size={70} shape="square" />
                            </Col>
                            <Col span={14}>
                                {item.name} x {item.quantity}
                            </Col>
                            <Col span={4} style={{ marginLeft: 'auto', fontSize: 15, fontWeight: 600 }}>
                                {formatter.format(item.price)}đ
                            </Col>
                        </Row>
                        <Divider />
                    </>

                )
            }) : <>Chưa có sản phẩm nào trong giỏ hàng</>}
            {dataCart?.length > 0 ? <Row>
                <Button onClick={() => navigate('/order')} size="large" type="primary" style={{ margin: '0px auto 0', width: '70%' }}>Xem giỏ hàng</Button>
            </Row> : <></>}
        </>


    );

    const contentInput = (
        <div style={{ maxHeight: 400, overflow: 'scroll' }}>
            {dataSearch?.length > 0 ? dataSearch?.map((item, index) => {
                return (
                    <>
                        <Row style={{ width: 550 }} key={index} onClick={(e) => handleNavigateBook2(e, item)}>
                            <Col span={5}>
                                <Avatar src={baseURL + 'images/' + item?.thumbnail} size={70} shape="square" />
                            </Col>
                            <Col span={14}>
                                {item.mainText}
                            </Col>
                            <Col span={4} style={{ marginLeft: 'auto', fontSize: 15, fontWeight: 600 }}>
                                {formatter.format(item.price)}đ
                            </Col>
                        </Row>
                        <Divider />
                    </>

                )
            }) : <>Không có sản phẩm nào , hãy nhập tên sản phẩm</>}

        </div>


    );

    return (
        <>
            <ModalAuth indexActive={indexActive} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} setIndexActive={setIndexActive} />
            <Row style={{ backgroundColor: '#FADDD5' }}>
                <Col style={{ maxWidth: 1260, margin: '0 auto' }}>
                    <img width={'100%'} src="https://cdn0.fahasa.com/media/wysiwyg/Thang-07-2023/FahasaSaleT3T723_W1_Banner_Header_1263x60.jpg" />
                </Col>
            </Row>
            <Row style={{ backgroundColor: '#FFF', maxHeight: 70, maxWidth: 1230, margin: '0 auto' }}>
                <Col span={24} style={{ height: 70, cursor: 'pointer' }}>
                    <Row style={{ display: 'flex', alignItems: 'center', margin: 'auto 0', height: '100%' }}  >
                        <Col onClick={() => navigate('/')} className="logo-header" span={6} >
                            <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/logo/fahasa_logo.png" />
                        </Col>
                        <Col span={11}>
                            <Popover placement="bottom" content={contentInput} trigger={'click'} style={{ width: '100%' }}>
                                <Input onChange={(e) => handleChangeInput(e)} size="large" addonAfter={<SearchOutlined />} />
                            </Popover>

                        </Col>

                        <Col span={2} style={{ marginLeft: 40, cursor: 'pointer' }}>
                            <Row style={{ textAlign: 'center' }} gutter={[0, 5]}>
                                <Col span={24} >
                                    <BellOutlined style={{ fontSize: 23 }} />
                                </Col>
                                <Col span={24} style={{ fontSize: 12, color: '#666666' }}>
                                    Thông Báo
                                </Col>
                            </Row>
                        </Col>

                        <Col span={2} style={{ cursor: 'pointer' }}>
                            <Row onClick={() => navigate('/order')} style={{ textAlign: 'center' }} gutter={[0, 5]}>

                                <Col span={24}>
                                    <Popover placement="bottom" content={contentCart} >
                                        <Badge count={dataCart?.length}>
                                            <ShoppingCartOutlined style={{ fontSize: 23 }} />
                                        </Badge>
                                    </Popover>

                                </Col>


                                <Col span={24} style={{ fontSize: 12, color: '#666666' }} >
                                    Giỏ Hàng
                                </Col>
                            </Row>
                        </Col>

                        <Col span={2} style={{ cursor: 'pointer' }}>
                            <Dropdown
                                menu={{
                                    items,
                                }}
                                placement="bottom"

                            >

                                <Row onClick={() => handleNavigateAuth()} style={{ textAlign: 'center' }} gutter={[0, 5]}>
                                    <Col span={24}>
                                        <UserOutlined style={{ fontSize: 23 }} />
                                    </Col>
                                    <Col span={24} style={{ fontSize: 12, color: '#666666' }}>
                                        Tài Khoản
                                    </Col>
                                    <DownOutlined style={{ position: 'absolute', right: 10, top: '30%', transform: 'translateY(-50%)' }} />
                                </Row>

                            </Dropdown>

                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default Header