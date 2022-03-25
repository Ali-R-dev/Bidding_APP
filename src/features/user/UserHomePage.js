import React, { useEffect, useState, useRef } from 'react'
import ItemCard from '../../components/ItemCard'
import { Button, Stack, InputGroup, FormControl } from 'react-bootstrap'
import { PaginationComp } from '../../components/Pagination'

import { GetItems } from '../../services/itemService'
import { useAuth } from '../../Contexts/AuthContext'


export default function UserHomePage() {

    const [items, SetItems] = useState([]);
    const [pageInfo, setPageInfo] = useState({ current: 0, total: 0 })
    const { credentials, setPageTitle } = useAuth();

    const searchRef = useRef()

    const handleSearch = () => {
        fetchData()
    }

    const fetchData = async (page) => {
        const search = searchRef.current.value.trim();
        const res = await GetItems({ userId: credentials.userId, role: credentials.role }, { page, search })
            .then(
                res => {
                    SetItems([...res[0]]);
                    setPageInfo({ ...res[1] })
                }
            );
    }

    useEffect(async () => {
        setPageTitle('Home')
        await fetchData()
    }, [])

    return (
        <div>
            {false && <div className="alert alert-warning text-center m-1" role="alert">
                This is a warning alert—check it out!
            </div>}
            <div className='ms-auto me-auto mt-4 col-sm-8' >
                <InputGroup className="mb-3">
                    <FormControl
                        ref={searchRef}
                        placeholder="Search by name or description"
                        aria-label="Search by name or description"
                        aria-describedby="basic-addon2"
                    />
                    <Button variant="primary" id="button-addon2" onClick={handleSearch}>
                        Button
                    </Button>
                </InputGroup>
            </div>

            <div
            // style={{
            //     display: "grid",
            //     gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
            //     gap: "1rem",
            //     alignItems: "flex-start"
            // }}
            >
                {items?.map((item) => {
                    return <ItemCard key={item._id} {...item} />
                })}
            </div>
            <div className='col-sm-8 ms-auto me-auto mt-2'>
                <PaginationComp current={pageInfo.current} total={pageInfo.total} handlePagechange={fetchData} />
            </div>
        </div>
    )
}
