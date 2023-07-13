import { Col, Row } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { fetchAccountByID } from "../../service/api"
import TableControl from "../../component/TableControl/TableControl";


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
        title: 'Status',
        dataIndex: 'status',

    },
    {
        title: 'Price',
        dataIndex: 'totalPrice',

    },
    {
        title: 'Time Created',
        dataIndex: 'createdAt',
        sorter: true

    },

];
const History = () => {
    const dataAccount = useSelector(state => state.account.info)
    const [data, setData] = useState({})
    const [totalPrice, setTotalPrice] = useState(0)
    console.log('data : ', data)

    useEffect(() => {
        fetchUserId()
    }, [dataAccount])

    const fetchUserId = async () => {
        let res = await fetchAccountByID(dataAccount?._id)
        console.log('res : ', res)
        let total = 0
        if (res && res.data) {
            res.data.user?.orderHistory?.map(order => {
                total += order.totalPrice
                setTotalPrice(total)
            })
            setData(res.data.user)
        }
    }

    const formatter = new Intl.NumberFormat({
        style: 'currency',

    });


    return (
        <Row style={{ minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
            <Col span={24}>
                <Row style={{ maxWidth: 1230, margin: '20px auto 0 ', }}>
                    <Col span={24} style={{ fontSize: 17 }}>
                        XIN CHÀO <span style={{ fontWeight: 700 }}>{data?.name}</span> ,
                        ĐÂY LÀ LỊCH SỬ ĐƠN HÀNG CỦA BẠN ({data?.orderHistory?.length}) --    <span style={{ fontWeight: 500 }}>{formatter.format(totalPrice)}đ</span>
                    </Col>

                    <Col span={24} style={{ fontSize: 17, marginTop: 50 }}>
                        <TableControl columns={columns} data={data?.orderHistory} />

                    </Col>
                </Row>
            </Col>
        </Row >
    )
}

export default History