import React, { useEffect, useState, useRef } from 'react'
import { Table, Button, Stack, InputGroup, FormControl } from 'react-bootstrap'
import { GetItems, DeleteItem } from '../../services/itemService'
import { useAuth } from '../../Contexts/AuthContext'

import { PaginationComp } from '../../components/Pagination'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'

import swal from 'sweetalert'

export default function AdminDashboard() {

    const [items, SetItems] = useState([]);
    const [pageInfo, setPageInfo] = useState({ current: 0, total: 0 })
    const { credentials, setPageTitle } = useAuth();

    const searchRef = useRef()

    const handleDelete = async (id) => {
        swal("Are you sure to delete this record?", {
            icon: "warning",
            buttons: {
                cancel: "Cancel",
                del: {
                    text: "Delete",
                    value: "del",
                }
            },
        }).then((value) => {
            switch (value) {
                case "del":
                    DeleteItem(id, credentials).then(res => {
                        swal("Success", "Deleted successfully", { icon: "success" });
                        fetchData()
                    }, rej => {
                        swal("error", "Cannot delete", { icon: "error" });
                    });
                    break;
                case "cancel":
                    break;
                default:
                    break;
            }
        });
    }

    const handleSearch = () => {
        fetchData()
    }


    const fetchData = async (page) => {

        const search = searchRef.current.value.trim();

        const res = await GetItems({ userId: credentials.userId, role: credentials.role }, { page, search }).then(
            res => {
                SetItems([...res[0]])
                setPageInfo({ ...res[1] })
            }
        );

    }

    useEffect(async () => {
        setPageTitle('Dashboard')
        await fetchData();
    }, [])

    return (
        <div className='col mt-5'>
            <Stack direction='horizontal' gap={2}>

                <div className='ms-4'>
                    <InputGroup className="mb-3">
                        <FormControl
                            ref={searchRef}
                            placeholder="Search By name or description"
                            aria-label="Search By name or description"
                            aria-describedby="basic-addon2"
                        />
                        <Button variant="primary" id="button-addon2" onClick={handleSearch}>
                            Button
                        </Button>
                    </InputGroup>
                </div>


                <div className='m-1 ms-auto'>
                    <Link
                        to={{
                            pathname: `/dashboard/new`,
                            state: {
                                isNew: true
                            }
                        }}
                    ><Button><FontAwesomeIcon icon={faPlus} /></Button></Link>
                </div>
            </Stack>


            <div>
                <Table bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Base Price</th>
                            <th>Current Bid</th>
                            <th>Auction Ends At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items?.map((item, index) => {
                            return <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item?.name || ""}</td>
                                <td>{item?.description || ""}</td>
                                <td>{item?.basePrice || ""}</td>
                                <td>{item?.currentBid || ""}</td>
                                <td>{new Date(item.auctionEndsAt).toLocaleString() || ""}</td>
                                <td>
                                    <Stack direction='horizontal' gap={1}>

                                        <Link
                                            to={{
                                                pathname: `/dashboard/${item._id}`
                                            }}
                                        >
                                            <Button>
                                                <FontAwesomeIcon icon={faAnglesRight} />
                                            </Button>
                                        </Link>

                                        <Button variant='danger' onClick={() => handleDelete(item._id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                    </Stack>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </div>
            <PaginationComp current={pageInfo.current} total={pageInfo.total} handlePagechange={fetchData} />
        </div>
    )
}