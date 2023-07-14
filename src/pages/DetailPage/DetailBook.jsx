import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { fetchBookById, handleCreateComment, handleUploadFile } from "../../service/api";
import { Avatar, Breadcrumb, Button, Col, Divider, Input, Rate, Row, Skeleton, Space, Upload, message } from "antd";
import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import './detail.scss'
import { handleAddItem } from "../../redux/slice/cartSlice";

const DetailBook = () => {
    const baseURL = import.meta.env.VITE_URL_BACKEND
    const [searchParams, setSearchParams] = useSearchParams();
    const [bookContent, setBookContent] = useState({})
    const dataAccount = useSelector(state => state.account)
    const [listImageComment, setListImageComment] = useState([]);
    const [rateValue, setRateValue] = useState(5)
    const ref = useRef()
    const ref2 = useRef()
    const dispatch = useDispatch()
    var bookID = searchParams.get("id")
    const navigate = useNavigate()


    const getBookById = async () => {
        let res = await fetchBookById(bookID)
        console.log(res)
        if (res && res?.data) {
            setBookContent(res.data?.user)
        }
    }



    const handleUploadFileSlider = async ({ file, onSuccess, onError }) => {
        let res = await handleUploadFile(file)
        console.log(res)
        if (res && res.data) {
            let imgCommentUpload = {
                urlUpload: res.data?.imgUpload,
                url: `${baseURL}images/${res.data?.imgUpload}`,
            }
            setListImageComment(listImageComment => [...listImageComment, imgCommentUpload])
            onSuccess('Upload success !')
        } else {
            onError('Error !')
        }

    }
    const handleRemove = (file) => {
        let imgSlider = listImageComment.filter(item => {
            return item.url != file.url
        })
        setListImageComment(imgSlider)
    }

    const handleChangeRate = (value) => {
        setRateValue(value)
    }

    const formatter = new Intl.NumberFormat({
        style: 'currency',

    });


    const handleSubmitComment = async () => {
        let listImg = listImageComment.map(item => {
            return item.urlUpload
        })

        let res = await handleCreateComment(rateValue, ref.current.value, listImg, bookID)
        console.log(res)
        if (res && res.data) {
            message.success('Create comment success !')
            ref.current.value = ''
            setListImageComment([])
            getBookById()
        }
    }

    const handleNavigateBuyNow = () => {
        const dataBuild = {
            id: bookContent?._id,
            name: bookContent?.mainText,
            quantity: +ref2.current.value,
            thumbnail: bookContent?.thumbnail,
            price: bookContent?.price

        }
        dispatch(handleAddItem(dataBuild))
        navigate('/order/checkout')
    }

    //CART
    const handleUp = () => {
        if (ref2.current.value >= 100) {
            ref2.current.value = 100
            return
        }
        ref2.current.value = (+ref2.current.value) + 1
    }

    const handleDown = () => {
        if (ref2.current.value <= 1) {
            ref2.current.value = 1
            return
        }
        ref2.current.value -= 1
    }
    const handleAddCart = () => {
        const dataBuild = {
            id: bookContent?._id,
            name: bookContent?.mainText,
            quantity: +ref2.current.value,
            thumbnail: bookContent?.thumbnail,
            price: bookContent?.price

        }
        dispatch(handleAddItem(dataBuild))
        message.success('Thêm sản phẩm vào giỏ hàng thành công')


    }


    useEffect(() => {
        getBookById()
    }, [bookID])

    const cart = useSelector(state => state.cart.listItem)

    console.log(cart)
    return (
        <Row style={{ minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
            <Col span={24}>
                <Row style={{ marginBottom: 10 }}>
                    <Col span={24} style={{ maxHeight: 30 }}>
                        <Row style={{ maxWidth: 1230, margin: '0 auto', maxHeight: 30 }}>
                            <Breadcrumb
                                style={{
                                    margin: '16px 0',
                                }}
                            >
                                <Breadcrumb.Item>TRANG CHỦ</Breadcrumb.Item>
                                <Breadcrumb.Item>SÁCH TIẾNG VIỆT</Breadcrumb.Item>
                                <Breadcrumb.Item>{bookContent?.category}</Breadcrumb.Item>
                            </Breadcrumb>
                        </Row>

                    </Col>
                    {bookContent && bookContent?.thumbnail ? <Col span={24} style={{ marginTop: 10 }}>
                        <Row style={{ maxWidth: 1260, margin: '15px auto 0', backgroundColor: '#fff' }}>
                            <Col span={2} style={{ padding: 5 }}>
                                <Row gutter={[0, 10]} >
                                    <Col span={24} >
                                        <Avatar src={baseURL + 'images/' + bookContent?.thumbnail} shape="square" size={100} />

                                    </Col>
                                    {bookContent?.slider?.length > 0 ? bookContent?.slider?.map((img, index) => {
                                        return (
                                            <Col span={24} >
                                                <Avatar key={index} src={baseURL + 'images/' + img} shape="square" size={90} />
                                            </Col>
                                        )
                                    }) : <></>}
                                </Row>

                            </Col>
                            <Col span={8}>
                                <img width={400} height={400} src={baseURL + 'images/' + bookContent?.thumbnail} />
                            </Col>

                            <Col span={13} style={{ padding: 10 }}>
                                <div style={{ fontSize: 22 }}>{bookContent?.mainText}</div>
                                <Row style={{ marginTop: 20, display: 'flex', alignItems: 'center' }} >
                                    <Col span={12} style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ color: '#666666' }}>Nhà cung cấp:</span>
                                        <div style={{ color: '#2489f4', fontWeight: 700, fontSize: 15, marginLeft: 10 }}>Fahasa</div>
                                    </Col>
                                    <Col span={10} style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                                        <span style={{ color: '#666666' }}>Tác giả:</span>
                                        <div style={{ color: '#2489f4', fontWeight: 700, fontSize: 15, marginLeft: 10 }}>{bookContent?.author}</div>

                                    </Col>
                                </Row>
                                <div style={{ margin: '15px 0', display: 'flex', alignItems: 'center' }}>
                                    <Rate value={5} style={{ fontSize: 12 }} />
                                    <span style={{ marginLeft: 5, color: '#f6a500' }}>({bookContent?.comments?.length} đánh giá)</span>
                                </div>
                                <Row gutter={[10]} style={{ display: 'flex', alignItems: 'center', marginTop: 40 }}>
                                    <div style={{ fontSize: 32, color: '#c92127', fontWeight: 700 }}>
                                        {formatter.format((bookContent?.price))}đ
                                    </div>
                                    <div style={{ fontSize: 15, fontWeight: 400, textDecoration: 'line-through', margin: '0 15px' }}>
                                        {formatter.format(bookContent?.price * 2)}đ
                                    </div>
                                    <div style={{
                                        padding: '5px 5px', borderRadius: 5, fontWeight: 700, display: 'grid', placeItems: 'center',
                                        backgroundColor: '#C92127', fontSize: 15, color: '#fff'
                                    }}>
                                        -50%
                                    </div>
                                </Row>
                                <Row style={{ marginTop: 40, display: 'flex', alignItems: 'center' }}>
                                    <Col span={5} style={{ fontSize: 17, color: '#555555', fontWeight: 600 }}>
                                        Số lượng:
                                    </Col>
                                    <Col span={8}>
                                        <div style={{
                                            border: '1px solid #aaaaaa', display: 'flex', justifyContent: 'center', width: 170,
                                            alignItems: 'center', padding: '5px 15px', borderRadius: 5
                                        }}>
                                            <MinusOutlined onClick={handleDown} style={{ fontSize: 18, color: '#aaaaaa', cursor: 'pointer' }} />
                                            <input ref={ref2} defaultValue={1} type="number" style={{
                                                border: 'none', margin: '0 5px', fontSize: 17, fontWeight: 600,
                                                width: 70, textAlign: 'center', outline: 'none', height: 40
                                            }} />
                                            <PlusOutlined onClick={handleUp} style={{ fontSize: 18, color: '#aaaaaa', cursor: 'pointer' }} />
                                        </div>
                                    </Col>
                                </Row>

                                <Space style={{ marginTop: 50 }}>
                                    <Button onClick={handleAddCart} style={{
                                        border: '2px solid #c92127', color: '#c92127', height: 45, width: 220,
                                        fontSize: 15, fontWeight: 700
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <ShoppingCartOutlined style={{ fontSize: 25 }} />
                                            <span style={{ marginLeft: 10 }}>Thêm vào giỏ hàng</span>
                                        </div>
                                    </Button>
                                    <Button onClick={handleNavigateBuyNow}
                                        style={{ backgroundColor: '#c92127', height: 45, width: 220, color: '#fff', fontSize: 15, fontWeight: 700 }}> Mua ngay</Button>
                                </Space>
                            </Col>
                        </Row>
                    </Col> : <Row style={{ width: 1230, margin: '100px auto' }}><Skeleton active /> <Skeleton active style={{ marginTop: 30 }} /></Row>}
                </Row>

                <Row gutter={[0, 10]} style={{ maxWidth: 1260, margin: '0 auto ', backgroundColor: '#fff', padding: 20 }}>
                    <Col span={24} style={{ fontSize: 20, fontWeight: 300 }}>

                        BÌNH LUẬN ({bookContent?.comments?.length})
                    </Col>
                    <Divider />
                    <Col span={24} >
                        {dataAccount?.isAuthenticated == true ?
                            <Row gutter={10}>
                                <Col span={2}>
                                    <Avatar size={60} src={dataAccount?.info?.avatar.includes('google') ? dataAccount?.info?.avatar : baseURL + 'images/' + dataAccount?.info?.avatar} />

                                </Col>
                                <Col span={22}>
                                    <Row style={{ border: '1px solid #aaaaaa', borderRadius: 5, padding: '5px 10px' }}>
                                        <Col span={24} style={{ position: 'relative' }}>
                                            <Rate value={rateValue} onChange={(value) => handleChangeRate(value)} style={{ fontSize: 18, paddingLeft: 10 }} />
                                            <input ref={ref} className="input-comment" style={{ border: 'none', height: 50, width: '100%', paddingLeft: 10 }}
                                                placeholder="Add a comment" />

                                            <Upload
                                                customRequest={handleUploadFileSlider}
                                                listType="picture"
                                                maxCount={8}
                                                fileList={listImageComment}
                                                onRemove={(file) => handleRemove(file, "thumbnail")}

                                            >
                                                <Button style={{ position: 'absolute', top: 0, right: 0 }}><PlusOutlined /></Button>
                                            </Upload>
                                        </Col>
                                    </Row>
                                    <Row style={{ borderRadius: '0 0 5px 5px', padding: '5px 0px' }}>
                                        <Button onClick={handleSubmitComment} size="large" type="primary" style={{ marginLeft: 'auto', width: 100 }}>
                                            POST
                                        </Button>
                                    </Row>

                                </Col>
                            </Row> : <Link to='/auth'>Đăng nhập để sử dụng tính năng này ! Click here</Link>}
                        <Divider />

                        {bookContent?.comments?.length > 0 ? bookContent?.comments?.map((item, index) => {
                            console.log(item?.avatar.includes('google'))
                            return (
                                <>
                                    <Row gutter={20} key={index}>
                                        <Col span={1}>
                                            {/* <Avatar size={60} src={`${baseURL}images/${item.avatar}`} /> */}
                                            <Avatar size={60} src={item?.avatar.includes('google') ? item.avatar : baseURL + 'images/' + item.avatar} />


                                        </Col>
                                        <Col span={22} style={{ marginLeft: 10 }}>
                                            <Row gutter={[0, 10]} style={{ borderRadius: 5, padding: '5px 10px' }}>
                                                <Col span={24} style={{ color: '#666666', fontSize: 15 }} >
                                                    <span>{item?.email}</span>
                                                </Col>
                                                <Col span={24} >
                                                    <Rate value={item?.rate} style={{ fontSize: 18 }} />
                                                </Col>
                                                <Col span={24} style={{ color: '#aaaaaa' }} >
                                                    <span>{item?.updatedAt}</span>

                                                </Col>
                                                <Col span={24} style={{ fontSize: 17, fontWeight: 400 }}>
                                                    <span>{item?.description}</span>

                                                </Col>
                                                <Col span={24} >
                                                    <Space>
                                                        {item?.image?.map(imgUrl => {
                                                            return <Avatar src={baseURL + 'images/' + imgUrl} size={80} shape="square" />
                                                        })}
                                                    </Space>

                                                </Col>

                                            </Row>


                                        </Col>
                                    </Row>
                                    <Divider />
                                </>
                            )
                        }) : <></>}

                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default DetailBook