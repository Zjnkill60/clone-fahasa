import { Button, Checkbox, Col, Divider, Form, Input, Row, message } from 'antd';
import '../authpage.scss'
import { FacebookOutlined } from '@ant-design/icons';
import { handleRegister } from '../../../service/api';
import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';




const Register = (props) => {
    const { setIndexActive } = props
    const [isLoading, setIsLoading] = useState(false)

    const onFinish = async (values) => {
        const { name, email, password } = values
        setIsLoading(true)
        let res = await handleRegister(name, email, password)
        setIsLoading(false)
        console.log(res)
        if (res && res.data) {
            setIndexActive(1)
            message.success(`Tài khoản của ${res.data?.user?.name} đã được tạo thành công !`)

        } else {
            message.error(res.message)
        }

    };
    return (
        <>
            <Form
                name="basic"
                onFinish={onFinish}

            >
                <Form.Item
                    label={<span style={{ fontSize: 15, color: '#a1a1a1' }}>Họ tên</span>}
                    name="name"
                    labelCol={{ span: 24 }}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng điền trường này !',
                        },
                    ]}
                >
                    <Input size='large' placeholder='Nhập họ tên vào trường này' className='input-auth' />
                </Form.Item>

                <Form.Item
                    label={<span style={{ fontSize: 15, color: '#a1a1a1' }}>Email</span>}
                    name="email"
                    labelCol={{ span: 24 }}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng điền trường này !',
                        },
                    ]}
                >
                    <Input size='large' placeholder='Nhập  email vào trường này' className='input-auth' />
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
                    <Input.Password size='large' placeholder='Nhập mật khẩu vào trường này' className='input-auth' />
                </Form.Item>





                <Form.Item

                >
                    <Row style={{ marginTop: 50 }}>
                        <Col span={17} style={{ margin: '0 auto' }}>
                            <Button className='btn-login' size='large' style={{ margin: '0 auto', width: '100%', height: 45, backgroundColor: '#C92127' }}
                                type="primary" htmlType="submit">
                                {isLoading ? <LoadingOutlined spin /> : ' Đăng nhập'}
                            </Button>
                        </Col>

                    </Row>
                </Form.Item>
            </Form>
        </>
    )
}

export default Register