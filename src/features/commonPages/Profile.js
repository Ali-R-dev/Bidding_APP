import React, { useState, useEffect } from 'react'
import { Card, Form, Stack, Button, Table } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../Contexts/AuthContext'
import { getUserHistory } from '../../services/itemService'
import swal from 'sweetalert'


export default function Profile() {

    const { setAuth, isAuth, credentials, setPageTitle } = useAuth();

    const [itemHistory, setItemHistory] = useState([])

    const fetchData = async () => {
        await getUserHistory(credentials).then(
            res => setItemHistory(res),
            rej => console.log(rej)
        )
    }

    useEffect(() => {
        if (credentials.role === 'REG')
            fetchData()
    }, [])
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
            {credentials.role == 'REG' && <ItemBiddingHistory itemHistory={itemHistory} credentials={credentials} />}


        </>
    )
}

const ItemBiddingHistory = ({ itemHistory, credentials }) => {

    const getstatus = (item) => {
        if (item.isSoled && String(item.currentBid) == String(credentials.id)) return 'WON'
        if (item.isSoled && String(item.currentBid) != String(credentials.id)) return 'LOST'
        return 'IN PROGRESS'
    }

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
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemHistory?.map((item, index) => {
                                    return <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{getstatus(item)}</td>
                                    </tr>
                                })}

                            </tbody>
                        </Table>
                    </div>

                </Card.Body>
            </Card>
        </>
    )
}