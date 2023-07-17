import { Button, Modal, Checkbox, Form, Input, Row, Col, Select, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { handleCreateNewUser, handleUpdateRoleUser } from '../../../service/api';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';





const ModalUpdateUser = (props) => {
    const { isModalOpen, setIsModalOpen, getAllUser, dataClick } = props
    const emailAccount = useSelector(state => state.account?.info?.email)
    const [form2] = useForm()
    console.log('dataClick : ', dataClick)

    const handleOk = () => {
        form2.submit()
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = async (values) => {
        console.log('Success:', values);
        const { role } = values
        if (dataClick?.email == emailAccount) {
            message.error('Không thể tự cập nhật tài khoản của chính mình !')
            return
        }

        let res = await handleUpdateRoleUser(dataClick?.email, role)
        if (res && res.data) {
            message.success('Cập nhật user thành công !')
            setIsModalOpen(false);
            await getAllUser()


        } else {
            message.error(res.message)
        }
        console.log(res)
    };

    useEffect(() => {
        form2.setFieldsValue({
            role: dataClick?.role,
            email: dataClick?.email,
            name: dataClick?.name,
            phone: dataClick?.phoneNumber,
        })
    }, [dataClick])

    console.log(dataClick)
    return (
        <>
            <Modal width={'50%'} title="Update Role User" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    name="from-update"
                    style={{ marginTop: 50 }}
                    onFinish={onFinish}
                    form={form2}
                >
                    <Row gutter={20}>
                        <Col span={24}>
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
                                <Input disabled />
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
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={12}>

                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Phone Number"
                                name="phone"

                            >
                                <Input disabled addonAfter='SDT' type='number' />
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

export default ModalUpdateUser