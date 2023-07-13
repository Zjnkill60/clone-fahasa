import { Breadcrumb, Button, Col, Input, Popconfirm, Row, Space, message } from "antd"
import { SearchOutlined, UserOutlined, RedoOutlined, EditOutlined, DeleteOutlined, FolderViewOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import TableControl from "../../../component/TableControl/TableControl";
import { useEffect, useState } from "react";
import { fetchAllUser, fetchFindAllByEmail, handleDeleteUser } from "../../../service/api";
import ModalAddNewUser from "./ModalAddNewUser";
import ModalUpdateUser from "./ModalUpdateUser";
import DrawerViewUser from "./DrawerViewUser";





const ManageUsers = () => {
    const [dataTable, setDataTable] = useState([])
    const [dataClick, setDataClick] = useState({})
    const [isModalCreateOpen, setIsModaCreatelOpen] = useState(false);
    const [isModalUpdateOpen, setIsModaUpdatelOpen] = useState(false);
    const [openViewUser, setOpenViewUser] = useState(false);


    const getAllUser = async () => {
        let res = await fetchAllUser()
        console.log(res)
        if (res && res.data) {
            setDataTable(res.data?.listUser)
        }
    }

    const confirm = async (text) => {
        let res = await handleDeleteUser(text?._id)
        if (res && res.data) {
            message.success('Xoá người dùng thành công !')
            await getAllUser()
        } else {
            message.error(res.message)
        }
    };

    const showDrawer = (text) => {
        setDataClick(text)
        setOpenViewUser(true);
    };

    const showModalCreateUser = () => {
        setIsModaCreatelOpen(true);
    };

    const showModalUpdateUser = (text, record) => {
        setDataClick(text)
        setIsModaUpdatelOpen(true);
    };


    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',

        },
        {
            title: 'Name',
            dataIndex: 'name',

        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',

        },
        {
            title: 'Role',
            dataIndex: 'role',

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

                        <Button onClick={() => showModalUpdateUser(text, record)} key={1} type={"primary"} style={{ backgroundColor: 'orange', width: '100%' }}><EditOutlined /></Button>
                        <Popconfirm
                            title="Delete a user"
                            description="Bạn có chắc chắn muốn xoá user này ?"
                            icon={
                                <QuestionCircleOutlined
                                    style={{
                                        color: 'red',
                                    }}
                                />
                            }
                            onConfirm={() => confirm(text)}
                            okText="Yes"
                            okButtonProps={{ style: { backgroundColor: 'red', marginTop: 15 } }}
                            cancelText="No"
                        >
                            <Button key={2} type={"primary"} style={{ backgroundColor: 'red' }}><DeleteOutlined /></Button>
                        </Popconfirm>

                    </Space>
                )
            }

        },
    ];


    const handleFindByEmail = async (e) => {
        let res = await fetchAllUser()
        if (res && res.data) {
            let dataTableFindEmail = []
            res.data?.listUser.map(item => {
                if (item.email.includes(e.target.value)) {
                    dataTableFindEmail.push(item)
                }
            })
            setDataTable(dataTableFindEmail)
        }
    }





    useEffect(() => {
        getAllUser()
    }, [])

    return (
        <>
            <DrawerViewUser dataClick={dataClick} open={openViewUser} setOpen={setOpenViewUser} />
            <ModalAddNewUser getAllUser={getAllUser} isModalOpen={isModalCreateOpen} setIsModalOpen={setIsModaCreatelOpen} />
            <ModalUpdateUser dataClick={dataClick} getAllUser={getAllUser} isModalOpen={isModalUpdateOpen} setIsModalOpen={setIsModaUpdatelOpen} />

            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>Manage Users</Breadcrumb.Item>
            </Breadcrumb>

            <Row style={{ marginTop: 70 }}>
                <Col span={10}>
                    <Input onChange={(e) => handleFindByEmail(e)} size="large" addonAfter={<SearchOutlined />} addonBefore="Email" placeholder="Tìm user theo email" />
                </Col>

                <Col style={{ marginLeft: 'auto' }}>
                    <Button onClick={showModalCreateUser} size="large" type="primary" style={{ marginRight: 15 }}> <UserOutlined /> Add New User</Button>
                    <Button size="large" > <RedoOutlined /> </Button>

                </Col>
            </Row>

            <Row style={{ marginTop: 70 }}>
                <Col span={24}> <TableControl tool='manage-user' setDataTable={setDataTable} columns={columns} data={dataTable} /></Col>
            </Row>
        </>
    )
}

export default ManageUsers