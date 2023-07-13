import {
    MenuFoldOutlined,
    DashboardOutlined,
    UserOutlined,
    BookOutlined,
    MenuUnfoldOutlined,
    DownOutlined,
    AccountBookOutlined
} from '@ant-design/icons';
import { Avatar, Button, Col, Dropdown, Layout, Menu, Row, message, theme } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleLogoutAccount } from '../../service/api';
import { handleDispatchLogout } from '../../redux/slice/accountSlice';
import { useDispatch } from 'react-redux';
const { Header, Sider, Content } = Layout;

const LayoutAdmin = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { dataUser } = props
    const handleLogout = async () => {
        let res = await handleLogoutAccount()
        console.log(res)
        localStorage.setItem('access_token', null)
        message.success('Đăng xuất thành công')
        dispatch(handleDispatchLogout())
        navigate('/')
    }

    let items = [
        {
            key: '1',
            label: (
                <Button onClick={() => navigate('/')}
                    size="large" style={{ width: '100%', height: 45 }} type="primary">Về trang chủ</Button>
            ),
        },
        {
            key: '2',
            label: (
                <Button onClick={() => handleLogout()}
                    size="large" style={{ width: '100%', height: 45, backgroundColor: '#C92127' }} type="primary">Đăng xuất</Button>
            ),
        },



    ];

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    console.log('header admin : ', dataUser)
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Row style={{ padding: 10 }} gutter={[0, 10]}>
                    <Col span={24} style={{ textAlign: 'center' }}>
                        <Avatar src={dataUser?.info?.avatar} size={64} icon={<UserOutlined />} />

                    </Col>
                    <Col span={24} style={{ textAlign: 'center', color: '#fff' }}>
                        Xin chào {dataUser?.info?.name}
                    </Col>
                </Row>
                <Menu
                    style={{ marginTop: 50 }}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <DashboardOutlined />,
                            label: <Link to='/admin'>Dashboard</Link>,
                        },
                        {
                            key: '2',
                            icon: <UserOutlined />,
                            label: <Link to='manage-users'>Manage Users</Link>,
                        },
                        {
                            key: '3',
                            icon: <BookOutlined />,
                            label: <Link to='manage-books'>Manage Books</Link>,
                        },
                        {
                            key: '4',
                            icon: <AccountBookOutlined />,
                            label: <Link to='manage-orders'>Manage Orders</Link>,
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Row>
                        <Col>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                        </Col>
                        <Col span={3} style={{ marginLeft: 'auto' }}>
                            <Dropdown
                                menu={{
                                    items,
                                }}
                                placement="bottom"

                            >

                                <Row onClick={() => navigate('/auth')} style={{ textAlign: 'center' }} gutter={[0, 5]}>
                                    <Col span={24}>
                                        <UserOutlined style={{ fontSize: 18 }} />
                                        <DownOutlined style={{ marginLeft: 5 }} />

                                    </Col>


                                </Row>

                            </Dropdown>

                        </Col>
                    </Row>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >


                    {props.children}

                </Content>
            </Layout>
        </Layout>
    )
}

export default LayoutAdmin