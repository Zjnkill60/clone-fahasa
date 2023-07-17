import { Button, Checkbox, Col, Divider, Form, Input, Row, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect } from 'react';
import { handleLogoutAccount, handleUpdateInfoUser } from '../../service/api';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleDispatchLogout } from '../../redux/slice/accountSlice';


const FormAccount = (props) => {
    const { dataAccount } = props
    console.log('dataAccount : ', dataAccount)
    const [form] = useForm()
    const dispatch = useDispatch()
    const nagivate = useNavigate()

    const onFinish = async (values) => {
        const { phone, email } = values

        let res = await handleUpdateInfoUser(email, phone)
        if (res && res.data) {
            console.log(res)
            message.success("Cập nhật thông tin thành công , vui lòng đăng nhập lại !")
            await handleLogoutAccount()
            localStorage.removeItem('access_token')
            dispatch(handleDispatchLogout())
            nagivate('/auth')
        }


    };

    useEffect(() => {
        form.setFieldsValue({
            name: dataAccount.name,
            email: dataAccount.email,
            phone: +dataAccount.phoneNumber
        })
    }, [dataAccount])
    return (
        <>
            <Form
                name="basic"
                onFinish={onFinish}
                form={form}
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
                    <Input disabled size='large' placeholder='Nhập  email vào trường này' className='input-auth' />
                </Form.Item>


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
                    <Input disabled size='large' placeholder='Nhập họ tên vào trường này' className='input-auth' />
                </Form.Item>


                <Form.Item
                    label={<span style={{ fontSize: 15, color: '#a1a1a1' }}>Số Điện Thoại</span>}

                    name="phone"
                    labelCol={{ span: 24 }}
                    style={{ position: 'relative' }}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng điền số điện thoại!',
                        },
                    ]}
                >
                    <Input size='large' placeholder='Nhập số điện thoại vào trường này' className='input-auth' />
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

export default FormAccount