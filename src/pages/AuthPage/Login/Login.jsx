import { Button, Checkbox, Col, Divider, Form, Input, Row, message } from 'antd';
import '../authpage.scss'
import { GoogleOutlined } from '@ant-design/icons';
import { handleLogin, handleLoginGoogle } from '../../../service/api';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleDispatchLogin } from '../../../redux/slice/accountSlice';
import { useLocation, useNavigate } from 'react-router-dom';







const Login = (props) => {
    const { span, setIsModalOpen } = props
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();




    const onFinish = async (values) => {

        const { username, password } = values
        let res = await handleLogin(username, password)
        console.log(res)
        if (res && res.data) {
            localStorage.setItem('access_token', res.data.access_token)
            message.success(`Xin chào ${res.data?.user?.name}`)
            dispatch(handleDispatchLogin(res.data.user))
            if (setIsModalOpen) {
                setIsModalOpen(false)
            }
            if (location?.state?.callback) {
                navigate(location?.state?.callback)
            } else {
                navigate('/')
            }


        } else {
            message.error(res.message)
        }
    };

    const responseGoogle = async (response) => {
        if (response.profileObj) {
            const { email, name, imageUrl } = response.profileObj
            let res = await handleLoginGoogle(email, name, imageUrl)
            console.log(res)
            if (res && res.data) {
                dispatch(handleDispatchLogin(res.data.newPayload))
                localStorage.setItem('access_token', res.data.access_token)
                message.success(`Xin chào ${name} !`)
                if (location?.state?.callback) {
                    navigate(location?.state?.callback)

                } else {
                    navigate('/')

                }
            } else {
                message.error(res.message)
            }
        }
    }

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: "619086820314-ucbag8u8jr1bd9thfno9aib62i010tk7.apps.googleusercontent.com",
                scope: ""
            })
        }

        gapi.load('client:auth2', start)
    }, [])


    return (
        <>
            <Form
                name="basic"
                onFinish={onFinish}

            >
                <Form.Item
                    label={<span style={{ fontSize: 15, color: '#a1a1a1' }}>Số điện thoại / Email</span>}
                    name="username"
                    labelCol={{ span: 24 }}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng điền trường này !',
                        },
                    ]}
                >
                    <Input size='large' placeholder='Nhập số điện thoại hoặc email' className='input-auth' />
                </Form.Item>

                <Form.Item
                    label={<span style={{ fontSize: 15, color: '#a1a1a1' }}>Mật khẩu</span>}

                    name="password"
                    labelCol={{ span: 24 }}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng điền mật khẩu !',
                        },
                    ]}
                >
                    <Input.Password size='large' placeholder='Nhập mật khẩu' className='input-auth' />
                </Form.Item>


                <Form.Item

                >
                    <Row style={{ marginTop: 50 }}>
                        <Col span={17} style={{ margin: '0 auto' }}>
                            <Button className='btn-login' size='large' style={{ margin: '0 auto', width: '100%', height: 45, backgroundColor: '#C92127' }}
                                type="primary" htmlType="submit">
                                Đăng nhập
                            </Button>
                        </Col>
                        <Divider plain><span style={{ fontSize: 13, color: '#a1a1a1' }}>Hoặc</span></Divider>
                        <Col span={17} style={{ margin: '0 auto' }}>


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
                                            <Col span={span} style={{ display: 'flex', alignItems: 'center', margin: '0 auto', }}>
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


                            {/* <GoogleLogout
                                clientId="619086820314-ucbag8u8jr1bd9thfno9aib62i010tk7.apps.googleusercontent.com"
                                buttonText="Logout"
                                onLogoutSuccess={onSuccess}
                            >
                            </GoogleLogout> */}
                        </Col>

                    </Row>
                </Form.Item>
            </Form>
        </>
    )
}

export default Login