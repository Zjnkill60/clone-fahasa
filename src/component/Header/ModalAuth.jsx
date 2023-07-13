import { Button, Col, Modal, Row } from 'antd';
import { useState } from 'react'
import Login from '../../pages/AuthPage/Login/Login';
import Register from '../../pages/AuthPage/Register/Register';



const ModalAuth = (props) => {
    const { setIsModalOpen, isModalOpen, indexActive, setIndexActive } = props


    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Modal width={'50%'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}>
                <Row>
                    <Col span={17} style={{ margin: '0 auto' }}>
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
                            <Col span={12} style={{ margin: '0 auto' }}>
                                {indexActive == 1 ? <Login setIsModalOpen={setIsModalOpen} span={24} /> : <Register setIndexActive={setIndexActive} />}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default ModalAuth