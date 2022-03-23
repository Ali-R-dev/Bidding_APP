import React, { useState, useEffect } from 'react'
import { Card, Form, Stack, Button, Table } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../Contexts/AuthContext'
import { getUserHistory, getBotByUserId, updateBot } from '../../services/itemService'
import swal from 'sweetalert'


export default function Profile() {

    const { isAuth, credentials, setPageTitle } = useAuth();

    const [itemHistory, setItemHistory] = useState([])
    const [bot, SetBot] = useState({
        maxBalance: '', notifyAt: ''

    })

    const fetchData = async () => {
        await getUserHistory(credentials).then(
            res => setItemHistory(res),
            rej => console.log(rej)
        )
        await getBotByUserId(credentials).then(
            res => SetBot({ maxBalance: res.maxBalance, notifyAt: res.notifyAt }),
            rej => console.log(rej)
        )
    }

    const setValue = (e) => {
        SetBot({ ...bot, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(bot);
        await updateBot(bot, credentials).then(
            res => swal("Success", "updated successfully", { icon: "success" }),
            rej => console.log(rej)
        )
    }

    const getStatus = (item) => {
        if (item.isSoled && String(item.currentBid.userId) == String(credentials.id)) return <td className='text-success fw-bold'>{'WON'}</td>
        if (item.isSoled && String(item.currentBid.userId) != String(credentials.id)) return <td className='text-danger fw-bold'>{'LOST'}</td>
        if (!item.isSoled && String(item.currentBid.userId) == String(credentials.id)) return <td className='text-primary fw-bold'>{'IN PROGRESS...You bid is highest'}</td>
        if (!item.isSoled && String(item.currentBid.userId) != String(credentials.id)) return <td className='text-alert fw-bold'>{'IN PROGRESS...other user has higher bid'}</td>
        // return <td className='text-secondary fw-bold'>{'IN PROGRESS...'}</td>
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
            {credentials.role == 'REG' &&

                <>
                    <Card className='mt-2'>
                        <Card.Body>
                            <Card.Title className='align-items-baseline me-auto'>
                                <h5 className='text-center'>bot configuration</h5>
                            </Card.Title>

                            <form onSubmit={handleSubmit}>

                                <div className="row g-3 align-items-baseline m-auto">
                                    <div className="col">

                                        <label htmlFor="max">Max Balance</label>
                                        <input
                                            className="form-control"
                                            required
                                            value={bot.maxBalance}
                                            onChange={(e) => setValue(e)}
                                            type="number"
                                            name='maxBalance'
                                            placeholder="Max balance"
                                            min={'0.0'}
                                            step={'0.1'} />

                                    </div>
                                    <div className="col">

                                        <label htmlFor="notify">Notify At</label>
                                        <input
                                            className="form-control"
                                            required
                                            value={bot.notifyAt}
                                            onChange={(e) => setValue(e)}
                                            type="number"
                                            name='notifyAt'
                                            placeholder="Notify At"
                                            min={'0'}
                                            max={'100'}
                                            step={'0.1'} />

                                    </div>
                                    <div className="col mt-auto">
                                        <button type="submit" className="btn btn-primary">Save</button>
                                    </div>
                                </div>

                            </form>

                        </Card.Body>
                    </Card>

                    <Card className='col-sm mt-2'>
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
                                                {getStatus(item)}
                                            </tr>
                                        })}

                                    </tbody>
                                </Table>
                            </div>

                        </Card.Body>
                    </Card>
                </>
            }
        </>
    )
}