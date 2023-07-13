import { Avatar, Col, Row } from 'antd'
import './authpage.scss'
import { useSelector } from 'react-redux'
import { useState } from 'react'


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
                    <Col span={24} style={{ display: 'grid', placeItems: 'center', marginTop: 100 }} >

                        <Avatar src={dataAccount?.avatar.includes('google') ? dataAccount?.avatar : baseURL + 'images/' + dataAccount?.avatar} size={250} />
                        <span style={{ fontSize: 30, marginTop: 10 }}>{dataAccount?.name} </span>
                        <span style={{ fontSize: 20, marginTop: 10, color: '#666666' }}>{dataAccount?.email} </span>
                        <span style={{ fontSize: 20 }}>{dataAccount?.phoneNumber} </span>


                    </Col>

                    <Col span={12}>

                    </Col>
                </Row>

            </Col >
        </Row >
    )
}

export default Account