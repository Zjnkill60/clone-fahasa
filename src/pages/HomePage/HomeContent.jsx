import { Avatar, Button, Card, Col, Pagination, Rate, Row, Skeleton, Space, Tabs } from 'antd'
import './home.scss'
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { fetchAllBook, fetchSortAllBookPaginate } from '../../service/api';
import { useNavigate } from 'react-router-dom';



const HomeContent = () => {
    const [listImageBanner, setListImageBanner] = useState([
        'https://cdn0.fahasa.com/media/magentothem/banner7/D.Day7.7T723_Banner_Slide_840x320.jpg',
        'https://cdn0.fahasa.com/media/magentothem/banner7/ThienLong_Platinum_BannerVer1_Slide_840x320.jpg',
        'https://cdn0.fahasa.com/media/magentothem/banner7/Zenbooks_Thang7_Gold_Banner_Slide_840x320.jpg',
        'https://cdn0.fahasa.com/media/magentothem/banner7/MoreProduction_Silver_BannerVer1_Slide_840x320_1.jpg',
        'https://cdn0.fahasa.com/media/magentothem/banner7/Stem_mainbanner_T7_Slide_840x320.jpg',
        'https://cdn0.fahasa.com/media/magentothem/banner7/Backtoschool_trangtong_mainbanner_T7_Slide_840x320.jpg',
        'https://cdn0.fahasa.com/media/magentothem/banner7/HoaCuQuy4_banner_840x320_T723_1.jpg',
        'https://cdn0.fahasa.com/media/magentothem/banner7/CTKMThang723_Banner_840x320.jpg'

    ])
    const [indexActive, setIndexActive] = useState(0)
    const [listBook, setListBook] = useState([])
    const [totalBook, setTotalBook] = useState(11)
    const [tab, setTab] = useState('all')
    const navigate = useNavigate()
    const baseURL = import.meta.env.VITE_URL_BACKEND
    let a


    const handleIncrementIndex = () => {
        if (indexActive >= listImageBanner.length - 1) {
            setIndexActive(0)
            clearTimeout(a)
        } else {
            setIndexActive(indexActive => indexActive + 1)
            clearTimeout(a)
        }
    }

    const handleDecrementIndex = () => {
        if (indexActive >= listImageBanner.length - 1) {
            setIndexActive(0)
            clearTimeout(a)
        } else {
            setIndexActive(indexActive + 1)
            clearTimeout(a)
        }
    }

    const getAllBooks = async (current, tab) => {
        let res = await fetchSortAllBookPaginate(current, 10, tab)
        console.log(res)
        if (res && res.data) {
            setListBook(res.data?.listproduct)
            setTotalBook(res.data?.totalItem)
        }
    }




    const onChange = async (key) => {
        setTab(key)
        console.log(key);
        if (key == 'all') {
            getAllBooks()
        } else {
            let res = await fetchSortAllBookPaginate(1, 10, key)
            console.log(res)
            if (res && res.data) {
                setListBook(res.data?.listproduct)
                setTotalBook(res.data?.totalItem)

            }
        }

    };

    const handleChangePaginate = (page, pageSize) => {
        getAllBooks(page, tab)
    }
    const items = [
        {
            key: '1',
            label: `Tất Cả`,

        },
        {
            key: '-sold',
            label: `Phổ Biến`,

        },
        {
            key: 'price',
            label: `Giá Thấp Đến Cao`,

        },
        {
            key: '-price',
            label: `Giá Cao Đến Thấp`,

        },
    ];

    const formatter = new Intl.NumberFormat({
        style: 'currency',

    });

    var slug = function (str) {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
        var to = "aaaaaeeeeeiiiiooooouuuunc------";
        for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes

        return str;
    };

    const handleNavigateBookDetail = (book) => {
        let path = slug(book?.mainText)
        navigate(`/book/${path}?id=${book._id}`)

    }

    useEffect(() => {
        a = setTimeout(() => {
            if (indexActive >= listImageBanner.length - 1) {
                setIndexActive(0)

            } else {
                setIndexActive(indexActive + 1)
            }
        }, 3000);

    }, [indexActive])

    useEffect(() => {
        getAllBooks(1, tab)
    }, [])

    console.log(tab)
    return (
        <Row className="home-container">
            <Col style={{ maxWidth: 1260, margin: '15px auto 0' }}>
                <Row gutter={8}>
                    <Col span={16} style={{ position: 'relative' }}  >
                        <div onClick={handleIncrementIndex} className='btn-control-right-header'><RightOutlined className='icon-btn' /></div>
                        <img width={'100%'}
                            style={{ borderRadius: 5, overflow: 'clip' }} src={listImageBanner[indexActive]} alt="" />
                        <div onClick={handleDecrementIndex} className='btn-control-left-header'><LeftOutlined className='icon-btn' /></div>

                        <Space className='btn-index' >
                            {listImageBanner.map((image, index) => {
                                return (
                                    <div key={index} style={{
                                        height: 8, width: 8, borderRadius: 999,
                                        backgroundColor: '#fff', zIndex: 100
                                    }} className={index == indexActive ? 'index-active' : null}>

                                    </div>
                                )
                            })}
                        </Space>

                    </Col>
                    <Col span={8} >
                        <Row gutter={[0, 4]}>
                            <Col span={24} >
                                <img style={{ borderRadius: 5, width: '100%', height: 156, objectFit: 'cover' }}
                                    src="https://cdn0.fahasa.com/media/wysiwyg/Thang-07-2023/Potico_T7.png" alt="" />
                            </Col>
                            <Col span={24}>
                                <img style={{ borderRadius: 5, width: '100%', height: 156, objectFit: 'cover' }} src="https://cdn0.fahasa.com/media/wysiwyg/Thang-07-2023/ZaloT7.jpg" alt="" />
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row style={{ marginTop: 20 }}>
                    <Col span={24}>
                        <Row style={{ padding: '15px 20px', backgroundColor: '#fcddef', maxHeight: 50 }}>
                            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                                <Avatar src="https://cdn0.fahasa.com/skin/frontend/base/default/images/ico_dealhot.png" size={25} />

                                <span style={{ marginLeft: 10, fontSize: 17, fontWeight: 700 }}>XU HƯỚNG MUA SẮM</span>
                            </div>
                        </Row>
                        <Row style={{ backgroundColor: '#fff' }}>
                            <Col span={24} style={{ padding: '0 20px' }}>
                                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                            </Col>

                            <Col span={24} style={{ marginTop: 15 }}>
                                <Row gutter={[10, 10]}>
                                    {listBook?.length > 0 ? listBook?.map((book, index) => {
                                        return (
                                            <Col onClick={() => handleNavigateBookDetail(book)} className='card-item' style={{ width: '20%' }}>
                                                <Card
                                                    key={index}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        border: 'none'
                                                    }}
                                                    cover={
                                                        <img
                                                            width={246}
                                                            height={246}
                                                            alt="example"
                                                            src={baseURL + 'images/' + book?.thumbnail}
                                                        />
                                                    }
                                                >
                                                    <Row>
                                                        <Col span={24} style={{ height: 40, overflow: 'hidden' }}>
                                                            {<span style={{ fontSize: 13 }}>{book?.mainText}</span>}
                                                        </Col>
                                                        <Col span={24} style={{ marginTop: 10 }}>
                                                            {<span style={{ color: '#C92127', fontWeight: 700, fontSize: 15 }}>{formatter.format(book?.price)}đ</span>}
                                                        </Col>
                                                        <Col span={24} style={{ display: 'flex', alignItems: 'center' }}>
                                                            <Rate style={{ fontSize: 13 }} value={5} />
                                                            <span style={{ color: '#f6a500', marginLeft: 5, marginTop: 2 }}>({book?.comments?.length})</span>
                                                        </Col>
                                                        <Col span={24} style={{ display: 'grid', marginTop: 2, placeItems: 'center', backgroundColor: '#f1b1af', borderRadius: 10, maxHeight: 17 }}>
                                                            <span style={{ fontSize: 11, color: '#fff' }}> Đã bán {book?.sold}</span>
                                                        </Col>
                                                    </Row>




                                                </Card>
                                            </Col>
                                        )
                                    }) : <>
                                        <Row gutter={[10, 10]} style={{ width: '100%', padding: '0 20px' }}>
                                            <Col style={{ width: '20%' }}>
                                                <Card
                                                    style={{
                                                        height: 300,


                                                    }}
                                                >
                                                    <Skeleton active />
                                                </Card>
                                            </Col>
                                            <Col style={{ width: '20%' }}>
                                                <Card
                                                    style={{
                                                        height: 300,


                                                    }}
                                                >
                                                    <Skeleton active />
                                                </Card>
                                            </Col>
                                            <Col style={{ width: '20%' }}>
                                                <Card
                                                    style={{
                                                        height: 300,


                                                    }}
                                                >
                                                    <Skeleton active />
                                                </Card>
                                            </Col>
                                            <Col style={{ width: '20%' }}>
                                                <Card
                                                    style={{
                                                        height: 300,


                                                    }}
                                                >
                                                    <Skeleton active />
                                                </Card>
                                            </Col>
                                            <Col style={{ width: '20%' }}>
                                                <Card
                                                    style={{
                                                        height: 300,


                                                    }}
                                                >
                                                    <Skeleton active />
                                                </Card>
                                            </Col>
                                            <Col style={{ width: '20%' }}>
                                                <Card
                                                    style={{
                                                        height: 300,


                                                    }}
                                                >
                                                    <Skeleton active />
                                                </Card>
                                            </Col>
                                            <Col style={{ width: '20%' }}>
                                                <Card
                                                    style={{
                                                        height: 300,


                                                    }}
                                                >
                                                    <Skeleton active />
                                                </Card>
                                            </Col>
                                            <Col style={{ width: '20%' }}>
                                                <Card
                                                    style={{
                                                        height: 300,


                                                    }}
                                                >
                                                    <Skeleton active />
                                                </Card>
                                            </Col>
                                            <Col style={{ width: '20%' }}>
                                                <Card
                                                    style={{
                                                        height: 300,


                                                    }}
                                                >
                                                    <Skeleton active />
                                                </Card>
                                            </Col>
                                            <Col style={{ width: '20%' }}>
                                                <Card
                                                    style={{
                                                        height: 300,


                                                    }}
                                                >
                                                    <Skeleton active />
                                                </Card>
                                            </Col>

                                        </Row>

                                    </>}
                                </Row>
                                <Row>
                                    <Pagination onChange={handleChangePaginate} defaultCurrent={1} total={totalBook} style={{ margin: '30px auto' }} />
                                </Row>

                            </Col>
                        </Row>

                    </Col>


                </Row>

            </Col>
        </Row>
    )
}

export default HomeContent