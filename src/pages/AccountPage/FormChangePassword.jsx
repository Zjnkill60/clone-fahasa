import { Button, Checkbox, Col, Divider, Form, Input, Row, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect } from 'react';
import { fetchChangePassword, handleLogoutAccount } from '../../service/api';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleDispatchLogout } from '../../redux/slice/accountSlice';


const FormChangePassword = (props) => {
    const { dataAccount } = props
    const dispatch = useDispatch()
    const nagivate = useNavigate()
    const [form2] = useForm()


    const onFinish = async (values) => {
        const { currentPassword, newPassword } = values
        let res = await fetchChangePassword(currentPassword, newPassword)
        console.log(res)
        if (res && res.data) {
            message.success('Đổi mật khẩu thành công')
            await handleLogoutAccount()
            localStorage.removeItem('access_token')
            dispatch(handleDispatchLogout())
            nagivate('/auth')
        } else {
            message.error(res.message)
        }

    };

    useEffect(() => {
        form2.setFieldsValue({
            email: dataAccount.email,

        })
    }, [dataAccount])
    return (
        <>
            <Form
                name="basic"
                onFinish={onFinish}
                form={form2}
            >
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
                    <Input disabled size='large' className='input-auth' />
                </Form.Item>


                <Form.Item
                    label={<span style={{ fontSize: 15, color: '#a1a1a1' }}>Mật khẩu cũ</span>}
                    name="currentPassword"
                    labelCol={{ span: 24 }}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng điền trường này !',
                        },
                    ]}
                >
                    <Input size='large' placeholder='Nhập mật khẩu cũ' className='input-auth' />
                </Form.Item>


                <Form.Item
                    label={<span style={{ fontSize: 15, color: '#a1a1a1' }}>Mật khẩu mới</span>}

                    name="newPassword"
                    labelCol={{ span: 24 }}
                    style={{ position: 'relative' }}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng điền mật khẩu!',
                        },
                    ]}
                >
                    <Input.Password size='large' placeholder='Nhập mật khẩu mới' className='input-auth' />
                </Form.Item>





                <Form.Item

                >
                    <Row style={{ marginTop: 50 }}>
                        <Col span={17} style={{ margin: '0 auto' }}>
                            <Button className='btn-login' size='large' style={{ margin: '0 auto', width: '100%', height: 45, backgroundColor: '#C92127' }}
                                type="primary" htmlType="submit">
                                Cập Nhật
                            </Button>
                        </Col>

                    </Row>
                </Form.Item>
            </Form>
        </>
    )
}

export default FormChangePassword