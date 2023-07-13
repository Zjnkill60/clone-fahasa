import { Button, Col, Result, Row } from 'antd';


const Page403 = () => {
    return (
        <Row style={{ height: '100vh' }}>
            <Col span={18} style={{ margin: 'auto' }}>
                <Result
                    status="403"
                    title="403"
                    subTitle="Xin lỗi, bạn không được cấp quyền để truy cập trang này"
                    extra={<Button type="primary">Back Home</Button>}
                />
            </Col>
        </Row>
    )
}





export default Page403;