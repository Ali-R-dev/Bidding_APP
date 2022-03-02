import React, { useEffect, useState } from 'react'
import { Table, Button, Stack, Pagination } from 'react-bootstrap'
export const PaginationComp = ({ current, total, handlePagechange }) => {

    const [pages, setPages] = useState([])

    useEffect(() => {
        const arr = [...Array(total).keys()]
        setPages([...arr])
    }, [current, total])


    return (
        <>
            <Pagination>
                {pages.map((n, index) => {
                    return <Pagination.Item key={index} active={current === n} onClick={() => handlePagechange(n)}>{n}</Pagination.Item>
                })}
            </Pagination>
        </>
    )
}
