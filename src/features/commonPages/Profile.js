import React, { useState, useEffect } from 'react'
import { Card, Form, Stack, Button, Table } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../Contexts/AuthContext'
import swal from 'sweetalert'


export default function Profile() {

    const { setAuth, isAuth, credentials, setPageTitle } = useAuth();

    return (
        <>
            <Card className='col-sm m-auto mt-5'>
                <Card.Body>
                    <Card.Title className='align-items-baseline me-auto'>
                        <h5 className='text-center'>User Profile</h5>
                    </Card.Title>
                    <div>
                        <h6>User Id : <span className='text-muted'>{credentials.userId}</span></h6>
                        <h6>User Name : <span className='text-muted'>{credentials.userName}</span></h6>
                        <h6>User Role : <span className='text-muted'>{credentials.role}</span></h6>
                        <h6>User Email : <span className='text-muted'>{credentials.email || "N/A"}</span></h6>
                    </div>
                </Card.Body>
            </Card>
            {credentials.role == 'REG' && <ItemBiddingHistory />}


        </>
    )
}

const ItemBiddingHistory = () => {

    const [itemHistory, setItemHistory] = useState([])

    return (
        <>
            <Card className='col-sm m-auto mt-2'>
                <Card.Body>
                    <Card.Title className='align-items-baseline me-auto'>
                        <h5 className='text-center'>Biddings</h5>
                    </Card.Title>
                    <div>
                        <Table bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Current Bid</th>
                                    <th>Auction Ends At</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                </Card.Body>
            </Card>
        </>
    )
}