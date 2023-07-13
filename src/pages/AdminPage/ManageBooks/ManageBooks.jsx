import { Breadcrumb, Button, Col, Input, Popconfirm, Row, Space, message } from "antd"
import { SearchOutlined, UserOutlined, RedoOutlined, EditOutlined, DeleteOutlined, FolderViewOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import TableControl from "../../../component/TableControl/TableControl";
import { useEffect, useState } from "react";
import { fetchAllBook, fetchAllUser, fetchFindAllByEmail, fetchGetCategory, handleDeleteBook, handleDeleteUser } from "../../../service/api";
import DrawerViewBook from "./DrawerViewBook";
import ModalCreateBook from "./ModalCreateBook";
import ModalUpdateBook from "./ModalUpdateBook";





const ManageBooks
    = () => {
        const [dataTable, setDataTable] = useState([])
        const [dataClick, setDataClick] = useState({})
        const [isModalCreateOpen, setIsModaCreatelOpen] = useState(false);
        const [isModalUpdateOpen, setIsModaUpdatelOpen] = useState(false);
        const [openViewBook, setopenViewBook] = useState(false);
        const [category, setCategory] = useState([])


        const getAllBook = async () => {
            let res = await fetchAllBook()
            console.log(res)
            if (res && res.data) {
                setDataTable(res.data?.listproduct)
            }
        }

        const getAllCategory = async () => {
            let res = await fetchGetCategory()
            console.log(res)
            if (res && res.data) {
                let listCategory = res.data?.category.map(item => {
                    return {
                        value: item,
                        label: item
                    }
                })
                setCategory(listCategory)
            }
        }

        const confirm = async (text) => {
            let res = await handleDeleteBook(text?._id)
            if (res && res.data) {
                message.success('Xoá sản phẩm thành công !')
                await getAllBook()
            } else {
                message.error(res.message)
            }
        };

        const showDrawer = (text) => {
            setDataClick(text)
            setopenViewBook(true);
        };

        const showModalCreateBook = () => {
            setIsModaCreatelOpen(true);
        };

        const showModalUpdateBook = (text, record) => {
            setDataClick(text)
            setIsModaUpdatelOpen(true);
        };


        const columns = [
            {
                title: 'Author',
                dataIndex: 'author',

            },
            {
                title: 'Name',
                dataIndex: 'mainText',

            },
            {
                title: 'Price',
                dataIndex: 'price',

            },
            {
                title: 'Sold',
                dataIndex: 'sold',

            },
            {
                title: 'Category',
                dataIndex: 'category',

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
                            <Popconfirm
                                title="Delete a user"
                                description="Bạn có chắc chắn muốn xoá  ?"
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


        const handleFindByName = async (e) => {
            let res = await fetchAllBook()
            console.log(res)
            if (res && res.data) {
                let dataTableFindName = res.data?.listproduct.filter(item => {

                    return item.mainText.toLowerCase().includes(e.target.value)
                }

                )
                setDataTable(dataTableFindName)
            }
        }



        useEffect(() => {
            getAllBook()
            getAllCategory()
        }, [])

        return (
            <>
                <DrawerViewBook dataClick={dataClick} open={openViewBook} setOpen={setopenViewBook} />
                <ModalCreateBook category={category} getAllBook={getAllBook} isModalOpen={isModalCreateOpen} setIsModalOpen={setIsModaCreatelOpen} />
                <ModalUpdateBook category={category} dataClick={dataClick} getAllBook={getAllBook} isModalOpen={isModalUpdateOpen} setIsModalOpen={setIsModaUpdatelOpen} />

                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>Manage Books</Breadcrumb.Item>
                </Breadcrumb>

                <Row style={{ marginTop: 70 }}>
                    <Col span={10}>
                        <Input onChange={(e) => handleFindByName(e)} size="large" addonAfter={<SearchOutlined />} addonBefore="Name" placeholder="Tìm tên sách" />
                    </Col>

                    <Col style={{ marginLeft: 'auto' }}>
                        <Button onClick={showModalCreateBook} size="large" type="primary" style={{ marginRight: 15 }}> <UserOutlined /> Add New Book</Button>
                        <Button size="large" > <RedoOutlined /> </Button>

                    </Col>
                </Row>

                <Row style={{ marginTop: 70 }}>
                    <Col span={24}> <TableControl tool="manage-book" setDataTable={setDataTable} columns={columns} data={dataTable} /></Col>
                </Row>
            </>
        )
    }

export default ManageBooks
