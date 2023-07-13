import { Avatar, Badge, Button, Descriptions, Drawer, Space } from 'antd';
import { useEffect, useState } from 'react';


const DrawerViewBook = (props) => {
    const { open, setOpen, dataClick } = props
    const baseURL = import.meta.env.VITE_URL_BACKEND
    const onClose = () => {
        setOpen(false);
    };


    return (
        <>
            <Drawer width={'50%'} title={`Infomation of ${dataClick?.mainText} `} placement="right" onClose={onClose} open={open}>
                <Descriptions bordered>
                    <Descriptions.Item span={3} label="Tác Giả">{dataClick?.author}</Descriptions.Item>
                    <Descriptions.Item span={3} label="Tên Sách">{dataClick?.mainText}</Descriptions.Item>
                    <Descriptions.Item span={3} label="Giá">{dataClick?.price}</Descriptions.Item>

                    <Descriptions.Item label="Số Lượng" span={2}>
                        <Badge status="processing" text={dataClick?.quantity} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Đã Bán" span={1}>
                        {dataClick?.sold}
                    </Descriptions.Item>
                    <Descriptions.Item label="Thể Loại" span={2}>
                        {dataClick?.category}
                    </Descriptions.Item>
                    <Descriptions.Item label="Số Đánh Giá" span={1}>
                        {dataClick?.comments?.length}
                    </Descriptions.Item>
                    <Descriptions.Item label="Created At" span={3}>
                        {new Date().toISOString(dataClick?.createdAt)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At" span={3}>
                        {new Date().toISOString(dataClick?.updatedAt)}
                    </Descriptions.Item>


                </Descriptions>

                <Space>
                    <Avatar shape='square' style={{ marginTop: 50 }} size={128} src={baseURL + 'images/' + dataClick?.thumbnail} />
                    {dataClick?.slider?.map(item => {
                        return <Avatar shape='square' style={{ marginTop: 50 }} size={128} src={baseURL + 'images/' + item} />

                    })}

                </Space>

            </Drawer>
        </>
    )
}

export default DrawerViewBook