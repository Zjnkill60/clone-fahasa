import { Card, Col, Row, Statistic, message } from "antd"
import { useEffect, useState } from "react"
import { fetchDasboard } from "../../../service/api"
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';


const Dashboard = () => {
    let [dataDasboard, setDataDasboard] = useState({})
    useEffect(() => {
        fetchDataDashboard()
    }, [])

    const fetchDataDashboard = async () => {
        let res = await fetchDasboard()
        if (res && res.data) {
            setDataDasboard(res.data)
        } else {
            message.error(res.message)
        }



    }

    const formatter = new Intl.NumberFormat({
        style: 'currency',

    });
    return (
        <Row style={{ height: '100%' }} >
            <Col span={24}>
                <Row style={{ height: '50%' }} gutter={20}>
                    <Col span={12}  >
                        <Card title="TỔNG ĐƠN HÀNG" bordered={false} style={{ height: '100%', display: 'grid', placeItems: 'center', backgroundColor: '#fafafa' }}>
                            <Statistic

                                value={dataDasboard.totalOrder}
                                valueStyle={{
                                    color: '#3f8600',
                                    fontSize: 40,


                                }}
                                prefix={<ArrowUpOutlined />}

                            />
                        </Card>

                    </Col>
                    <Col span={12}  >
                        <Card title="TỔNG NGƯỜI DÙNG" bordered={false} style={{ height: '100%', display: 'grid', placeItems: 'center', backgroundColor: '#fafafa' }}>
                            <Statistic

                                value={dataDasboard.totalUser}
                                valueStyle={{
                                    color: '#3f8600',
                                    fontSize: 40,


                                }}
                                prefix={<ArrowUpOutlined />}

                            />
                        </Card>

                    </Col>
                </Row>

                <Row gutter={20} style={{ height: '50%', marginTop: 20 }}>
                    <Col span={12}  >
                        <Card title="TỔNG SẢN PHẨM" bordered={false} style={{ height: '100%', display: 'grid', placeItems: 'center', backgroundColor: '#fafafa' }}>
                            <Statistic

                                value={dataDasboard.totalProd}
                                valueStyle={{
                                    color: '#3f8600',
                                    fontSize: 40,


                                }}
                                prefix={<ArrowUpOutlined />}

                            />
                        </Card>

                    </Col>
                    <Col span={12}  >
                        <Card title="TỔNG DOANH THU" bordered={false} style={{ height: '100%', display: 'grid', placeItems: 'center', backgroundColor: '#fafafa' }}>
                            <Statistic

                                value={dataDasboard.totalPrice}
                                valueStyle={{
                                    color: '#3f8600',
                                    fontSize: 40,


                                }}
                                suffix='đ'
                                prefix={<ArrowUpOutlined />}

                            />
                        </Card>

                    </Col>
                </Row>



            </Col>
        </Row>
    )
}

export default Dashboard