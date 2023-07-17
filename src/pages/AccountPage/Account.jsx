import { Avatar, Button, Col, Input, Row } from 'antd'
import './authpage.scss'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Form } from 'react-router-dom'
import FormAccount from './FormAccount'
import FormChangePassword from './FormChangePassword'


const Account = () => {
    const [indexActive, setIndexActive] = useState(1)
    const baseURL = import.meta.env.VITE_URL_BACKEND

    const dataAccount = useSelector(state => state.account.info)


    return (
        <Row className='auth-container'>
            <Col className='auth-content'>
                <Row>
                    <Col span={12} style={{ margin: '0 auto' }}>
                        <Row style={{ marginTop: 50 }}>
                            <Col onClick={() => setIndexActive(1)} className={indexActive == 1 ? 'active' : 'title-auth'} span={12}
                                style={{ textAlign: 'center', padding: 15, cursor: 'pointer', fontSize: 16 }}>
                                Thông Tin Tài Khoản
                            </Col>
                            <Col onClick={() => setIndexActive(2)} className={indexActive == 2 ? 'active' : 'title-auth'} span={12}
                                style={{ textAlign: 'center', padding: 15, cursor: 'pointer', fontSize: 16 }}>
                                Đổi Mật Khẩu
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} style={{ marginTop: 100 }} >

                        <Row gutter={100} style={{ width: '80%', margin: '0 auto', display: 'flex', alignItems: 'center' }}>
                            <Col span={10}>
                                <Avatar style={{ marginBottom: 120 }}
                                    src={dataAccount?.avatar?.includes('google') ? dataAccount?.avatar : baseURL + 'images/' + dataAccount?.avatar} size={250} />

                            </Col>
                            <Col span={14}>
                                {indexActive == 1 ? <FormAccount dataAccount={dataAccount} /> : <FormChangePassword dataAccount={dataAccount} />}
                            </Col>
                        </Row>



                    </Col>


                </Row>

            </Col >
        </Row >
    )
}

export default Account