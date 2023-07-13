import { Table } from "antd";
import { useState } from "react";
import { fetchAllOrdersPaginate, fetchSortAllBookPaginate, fetchSortAllUserPaginate, fetchSortTabsAllOrders } from '../../service/api'

const TableControl = (props) => {
    const [current, setCurrent] = useState(1)
    const [order, setOrder] = useState('')
    const { columns, data, setDataTable, tool, tab } = props

    const onChange = async (pagination, filters, sorter, extra) => {
        setOrder(sorter?.order)
        setCurrent(pagination.current)
        if (order != sorter?.order) {
            if (tool == "manage-book") {
                if (sorter?.order == 'ascend') {
                    let res = await fetchSortAllBookPaginate(1, 100, `-${sorter?.field}`)

                    if (res && res.data) {
                        setDataTable(res.data?.listproduct)
                    }
                }

                if (sorter?.order == 'descend') {
                    let res = await fetchSortAllBookPaginate(1, 100, `${sorter?.field}`)

                    if (res && res.data) {
                        setDataTable(res.data?.listproduct)
                    }
                }
            } else if (tool == "manage-user") {
                if (sorter?.order == 'ascend') {
                    let res = await fetchSortAllUserPaginate(1, 100, `-${sorter?.field}`)

                    if (res && res.data) {
                        setDataTable(res.data?.listUser)
                    }
                }

                if (sorter?.order == 'descend') {
                    let res = await fetchSortAllUserPaginate(1, 100, `${sorter?.field}`)

                    if (res && res.data) {
                        setDataTable(res.data?.listUser)
                    }
                }
            } else {
                if (tab == 'all') {
                    if (sorter?.order == 'ascend') {
                        let res = await fetchSortTabsAllOrders(`-${sorter?.field}`)

                        if (res && res.data) {
                            setDataTable(res.data?.listOrder)
                        }
                    }

                    if (sorter?.order == 'descend') {
                        let res = await fetchSortTabsAllOrders(`${sorter?.field}`)

                        if (res && res.data) {
                            setDataTable(res.data?.listOrder)
                        }
                    }
                } else {
                    if (sorter?.order == 'ascend') {
                        let res = await fetchAllOrdersPaginate(`-${sorter?.field}`, tab)

                        if (res && res.data) {
                            setDataTable(res.data?.listOrder)
                        }
                    }

                    if (sorter?.order == 'descend') {
                        let res = await fetchAllOrdersPaginate(`${sorter?.field}`, tab)

                        if (res && res.data) {
                            setDataTable(res.data?.listOrder)
                        }
                    }
                }
            }
        }


    };




    return (
        <Table columns={columns} dataSource={data} onChange={onChange} pagination={{ pageSize: 6, current: current, position: ['bottomCenter'] }} />
    )
}

export default TableControl