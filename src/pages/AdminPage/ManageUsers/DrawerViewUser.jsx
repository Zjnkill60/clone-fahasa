import { Avatar, Badge, Button, Descriptions, Drawer } from 'antd';


const DrawerViewUser = (props) => {
    const { open, setOpen, dataClick } = props
    const baseURL = import.meta.env.VITE_URL_BACKEND

    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Drawer width={'50%'} title={`Infomation of ${dataClick?.name} `} placement="right" onClose={onClose} open={open}>
                <Descriptions bordered>
                    <Descriptions.Item span={3} label="FullName">{dataClick?.name}</Descriptions.Item>
                    <Descriptions.Item span={3} label="Email">{dataClick?.email}</Descriptions.Item>
                    <Descriptions.Item span={3} label="Phone Number">{dataClick?.phoneNumber}</Descriptions.Item>

                    <Descriptions.Item label="Role" span={2}>
                        <Badge status="processing" text={dataClick?.role} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Order Number" span={1}>
                        {dataClick?.orderHistory?.length}
                    </Descriptions.Item>
                    <Descriptions.Item label="Created At" span={3}>
                        {new Date().toISOString(dataClick?.createdAt)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At" span={3}>
                        {new Date().toISOString(dataClick?.updatedAt)}
                    </Descriptions.Item>


                </Descriptions>
                <Avatar style={{ marginTop: 50 }} size={128} src={baseURL + 'images/' + dataClick?.avatar} />
            </Drawer>
        </>
    )
}

export default DrawerViewUser