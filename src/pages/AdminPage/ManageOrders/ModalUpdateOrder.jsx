import { Button, Modal, Checkbox, Form, Input, Row, Col, Select, message, Upload } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { handleUpdateOrder } from '../../../service/api';
import { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';






const ModalUpdateOrder = (props) => {
    const { isModalOpen, setIsModalOpen, getAllOrders, dataClick, getAllLengthOrders, tab } = props
    const [loading, setLoading] = useState(false)


    console.log('dataClick', dataClick)
    const [form] = useForm()

    const handleOk = () => {
        form.submit()
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = async (values) => {
        console.log('values : ', values)

        const { name, address, phoneNumber, totalPrice, status } = values
        setLoading(true)
        let res = await handleUpdateOrder(dataClick?._id, name, address, phoneNumber, totalPrice, status)
        setLoading(false)
        console.log(res)
        if (res && res.data) {
            message.success('Update đơn hàng thành công !')
            await getAllOrders(tab)
            await getAllLengthOrders()
            setIsModalOpen(false)
        } else {
            message.error(res.message)
        }
    };

    useEffect(() => {
        form.setFieldsValue({
            status: dataClick?.status,
            name: dataClick?.name,
            address: dataClick?.address,
            phoneNumber: dataClick?.phoneNumber,
            totalPrice: dataClick?.totalPrice,

        })

    }, [dataClick])

    //UPLOAD



    return (
        <>
            <Modal width={'60%'} title={loading == false ? "Update Order" : null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {loading == false ?
                    <Form
                        name="from-update-order"
                        style={{ marginTop: 50 }}
                        onFinish={onFinish}
                        form={form}
                    >
                        <Row gutter={20}>
                            <Col span={12}>
                                <Form.Item
                                    label="Họ Tên"
                                    labelCol={{ span: 24 }}
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>

                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    label="Số Điện Thoại"
                                    name="phoneNumber"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập số điện thoại',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={20}>
                            <Col span={12}>
                                <Form.Item
                                    label="Tổng Tiền"
                                    labelCol={{ span: 24 }}
                                    name="totalPrice"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tổng tiền',
                                        },
                                    ]}
                                >
                                    <Input type='number' addonAfter="VND" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>

                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    label="Địa Chỉ"
                                    name="address"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập địa chỉ',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>

                        </Row>

                        <Row gutter={20}>
                            <Col span={24}>
                                <Form.Item
                                    label="Status"
                                    labelCol={{ span: 24 }}
                                    name="status"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn trạng thái'
                                        },
                                    ]}
                                >
                                    <Select
                                        style={{ textAlign: 'center' }}


                                        options={[
                                            {
                                                label: 'PENDING',
                                                value: 'PENDING'
                                            },
                                            {
                                                label: 'RUNNING',
                                                value: 'RUNNING'
                                            },
                                            {
                                                label: 'DONE',
                                                value: 'DONE'
                                            },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>


                        </Row>




                    </Form> : <Row>
                        <Col span={24} style={{ display: 'grid', placeItems: 'center' }}>
                            <LoadingOutlined style={{ fontSize: 40 }} />
                        </Col>
                    </Row>}
            </Modal>

        </>
    )
}

export default ModalUpdateOrder