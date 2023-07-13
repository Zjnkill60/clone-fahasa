import { Button, Modal, Checkbox, Form, Input, Row, Col, Select, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { handleCreateNewUser } from '../../../service/api';
import { useEffect } from 'react';





const ModalAddNewUser = (props) => {
    const { isModalOpen, setIsModalOpen, getAllUser } = props
    const [form] = useForm()

    const handleOk = () => {
        form.submit()
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = async (values) => {
        console.log('Success:', values);
        const { email, password, phone, name, role } = values
        let res = await handleCreateNewUser(name, phone, role, email, password)
        if (res && res.data) {
            message.success('Tạo mới user thành công !')
            setIsModalOpen(false);
            await getAllUser()
            form.setFieldsValue({
                email: '',
                name: '',
                phone: '',
                role: 'USER',
                password: ''
            })

        } else {
            message.error(res.message)
        }
        console.log(res)
    };

    useEffect(() => {
        form.setFieldsValue({
            role: "USER"
        })
    }, [])
    return (
        <>
            <Modal width={'50%'} title="Add new user" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    name="from-add-new"
                    style={{ marginTop: 50 }}
                    onFinish={onFinish}
                    form={form}
                >
                    <Row gutter={20}>
                        <Col span={12}>
                            <Form.Item
                                label="Email"
                                labelCol={{ span: 24 }}
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>

                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col span={12}>
                            <Form.Item
                                label="Full Name"
                                labelCol={{ span: 24 }}
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>

                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Phone Number"
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your phone number!',
                                    },
                                ]}
                            >
                                <Input addonAfter='SDT' type='number' />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: 50 }}>
                        <Col span={24}>
                            <Form.Item
                                labelCol={{ span: 24 }}

                                name="role"


                            >
                                <Select
                                    style={{ textAlign: 'center' }}
                                    size='large'

                                    options={[
                                        {
                                            value: 'USER',
                                            label: 'USER',
                                        },
                                        {
                                            value: 'ADMIN',
                                            label: 'ADMIN',
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            </Modal>
        </>
    )
}

export default ModalAddNewUser