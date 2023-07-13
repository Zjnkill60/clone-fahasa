import { Breadcrumb, Button, Col, Input, Popconfirm, Row, Space, message } from "antd"
import { SearchOutlined, UserOutlined, RedoOutlined, EditOutlined, DeleteOutlined, FolderViewOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import TableControl from "../../../component/TableControl/TableControl";
import { useEffect, useState } from "react";
import { fetchAllBook, fetchAllLengthOrders, fetchAllOrders, fetchAllOrdersPaginate, fetchAllUser, fetchFindAllByEmail, fetchGetCategory, handleDeleteBook, handleDeleteUser } from "../../../service/api";
import DrawerViewOrder from "./DrawerViewOrder";
import ModalUpdateOrder from "./ModalUpdateOrder";
import { Tabs } from 'antd';





const ManageOrders = () => {
    const [dataTable, setDataTable] = useState([])
    const [dataClick, setDataClick] = useState({})
    const [isModalUpdateOpen, setIsModaUpdatelOpen] = useState(false);
    const [openViewOrder, setopenViewOrder] = useState(false);
    const [tab, setTab] = useState("all")
    const [lengthAllOrders, setLengthAllOrders] = useState({})


    const onChangeTabs = (key) => {
        setTab(key)
        if (key == 'all') {
            getAllOrders(null)
        } else {
            getAllOrders(key)
        }

    };


    const getAllOrders = async (status) => {
        let res = await fetchAllOrders(status)
        console.log(res)
        if (res && res.data) {
            setDataTable(res.data?.listOrder)
        }
    }

    const getAllLengthOrders = async () => {
        let res = await fetchAllLengthOrders()
        console.log('length all : ', res)
        if (res && res.data) {
            setLengthAllOrders(res.data?.lengthOrder)
        }
    }



    const showDrawer = (text) => {
        setDataClick(text)
        setopenViewOrder(true);
    };



    const showModalUpdateBook = (text, record) => {
        setDataClick(text)
        setIsModaUpdatelOpen(true);
    };


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',

        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',

        },
        {
            title: 'Address',
            dataIndex: 'address',

        },
        {
            title: 'Total price',
            dataIndex: 'totalPrice',

        },
        {
            title: 'Status',
            dataIndex: 'status',

        },

        {
            title: 'Time Created',
            dataIndex: 'createdAt',
            sorter: true

        },
        {
            title: 'Action',
            render: (text, record) => {
                return (
                    <Space key={1}>
                        <Button onClick={() => showDrawer(text)} key={3} type="primary"><FolderViewOutlined /></Button>

                        <Button onClick={() => showModalUpdateBook(text, record)} key={1} type={"primary"} style={{ backgroundColor: 'orange', width: '100%' }}><EditOutlined /></Button>


                    </Space>
                )
            }

        },
    ];

    const items = [
        {
            key: 'all',
            label: `Tất Cả (${lengthAllOrders?.lengthAll})`,
        },
        {
            key: 'PENDING',
            label: `PENDING (${lengthAllOrders?.lengthPending})`,

        },
        {
            key: 'RUNNING',
            label: `RUNNING (${lengthAllOrders?.lengthRunning})`,

        },
        {
            key: 'DONE',
            label: `DONE (${lengthAllOrders?.lengthDone})`,

        },
    ];

    const handleFindByPhoneNumber = async (e) => {
        let res = await fetchAllOrders(null)
        console.log(res)
        if (res && res.data) {
            let dataTableFindName = res.data?.listOrder.filter(item => {

                return item.phoneNumber.toString().includes(e.target.value)
            }

            )
            setDataTable(dataTableFindName)
        }
    }



    useEffect(() => {
        getAllOrders()
        getAllLengthOrders()
    }, [])

    return (
        <>
            <DrawerViewOrder dataClick={dataClick} open={openViewOrder} setOpen={setopenViewOrder} />
            <ModalUpdateOrder tab={tab} getAllLengthOrders={getAllLengthOrders} dataClick={dataClick} getAllOrders={getAllOrders} isModalOpen={isModalUpdateOpen} setIsModalOpen={setIsModaUpdatelOpen} />

            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>Manage Orders</Breadcrumb.Item>
            </Breadcrumb>

            <Row style={{ marginTop: 50 }}>
                <Col span={10}>
                    <Input type="number" onChange={(e) => handleFindByPhoneNumber(e)} size="large" addonAfter={<SearchOutlined />} addonBefore="SDT" placeholder="Tìm theo số điện thoại" />
                </Col>

            </Row>

            <Tabs style={{ marginTop: 50 }} defaultActiveKey="1" items={items} onChange={onChangeTabs} />

            <Row style={{ marginTop: 10 }}>
                <Col span={24}> <TableControl tab={tab} tool="manage-order" setDataTable={setDataTable} columns={columns} data={dataTable} /></Col>
            </Row>
        </>
    )
}

export default ManageOrders
