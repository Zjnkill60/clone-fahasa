import { Col, Row, Tabs } from 'antd'
import './authpage.scss'
import { useState } from 'react'
import Login from './Login/Login'
import Register from './Register/Register'

const AuthPage = () => {
    const [indexActive, setIndexActive] = useState(1)

    return (
        <Row className='auth-container'>
            <Col className='auth-content'>
                <Row>
                    <Col span={12} style={{ margin: '0 auto' }}>
                        <Row style={{ marginTop: 50 }}>
                            <Col onClick={() => setIndexActive(1)} className={indexActive == 1 ? 'active' : 'title-auth'} span={12}
                                style={{ textAlign: 'center', padding: 15, cursor: 'pointer', fontSize: 16 }}>
                                Đăng nhập
                            </Col>
                            <Col onClick={() => setIndexActive(2)} className={indexActive == 2 ? 'active' : 'title-auth'} span={12}
                                style={{ textAlign: 'center', padding: 15, cursor: 'pointer', fontSize: 16 }}>
                                Đăng ký
                            </Col>
                        </Row>
                    </Col>

                    <Col span={24}>
                        <Row style={{ marginTop: 40 }}>
                            <Col span={11} style={{ margin: '0 auto' }}>
                                {indexActive == 1 ? <Login span={12} /> : <Register setIndexActive={setIndexActive} />}
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </Col >
        </Row >
    )
}

export default AuthPage